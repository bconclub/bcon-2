import { Resend } from 'resend';
import { NextRequest, NextResponse } from 'next/server';

// Lazy init Resend client - only when API key is available
const getResend = () => {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    throw new Error('RESEND_API_KEY is not configured');
  }
  return new Resend(apiKey);
};

const NOTIFICATION_EMAIL = 'bconclubx@gmail.com';

function newsletterEmailHtml(name: string, email: string) {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Newsletter Subscriber - BCON Club</title>
</head>
<body style="margin:0;padding:0;font-family:'Space Grotesk',-apple-system,BlinkMacSystemFont,sans-serif;background-color:#0a0a0a;color:#ffffff;line-height:1.6;">
  <div style="max-width:600px;margin:0 auto;background:#0a0a0a;">
    <!-- Header -->
    <div style="background:linear-gradient(135deg,#0a0a0a 0%,#1a1a2e 50%,#0a0a0a 100%);padding:60px 40px;text-align:center;">
      <img src="https://bconclub.com/BCON%20icon.png" alt="BCON Club" width="72" height="72" style="display:block;margin:0 auto 24px;object-fit:contain;" />
      <h1 style="font-size:32px;font-weight:700;color:#d4ff00;margin:0 0 12px;letter-spacing:-0.5px;">New Subscriber</h1>
      <p style="color:#888;font-size:16px;margin:0;">Someone just joined the newsletter.</p>
    </div>

    <!-- Content -->
    <div style="padding:40px;">
      <!-- Greeting -->
      <div style="margin-bottom:32px;">
        <div style="font-size:11px;letter-spacing:2px;color:#666;text-transform:uppercase;margin-bottom:4px;">Subscriber</div>
        <div style="font-size:24px;font-weight:600;color:#fff;">${name}</div>
      </div>

      <!-- Details Card -->
      <div style="background:#111;border:1px solid #222;border-radius:16px;padding:28px;margin-bottom:40px;">
        <div style="font-size:12px;letter-spacing:1.5px;color:#666;text-transform:uppercase;margin-bottom:20px;font-weight:500;">Subscriber Details</div>

        <div style="margin-bottom:16px;">
          <div style="font-size:12px;color:#666;margin-bottom:4px;">Name</div>
          <div style="font-size:16px;color:#fff;font-weight:500;">${name}</div>
        </div>

        <div style="margin-bottom:16px;">
          <div style="font-size:12px;color:#666;margin-bottom:4px;">Email</div>
          <div style="font-size:16px;color:#fff;font-weight:500;">${email}</div>
        </div>

        <div style="margin-bottom:0;">
          <div style="font-size:12px;color:#666;margin-bottom:4px;">Subscribed At</div>
          <div style="font-size:16px;color:#fff;font-weight:500;">${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })} IST</div>
        </div>
      </div>

      <!-- Highlight Box -->
      <div style="background:linear-gradient(135deg,rgba(212,255,0,0.08) 0%,rgba(212,255,0,0.02) 100%);border-left:3px solid #d4ff00;padding:20px 24px;border-radius:0 12px 12px 0;margin-bottom:40px;">
        <div style="font-size:28px;font-weight:700;color:#d4ff00;margin-bottom:4px;">Newsletter</div>
        <div style="font-size:14px;color:#888;">New subscriber from the website footer form. Add them to the mailing list.</div>
      </div>

      <!-- Signature -->
      <div style="margin-top:32px;">
        <div style="font-weight:600;color:#fff;font-size:15px;">BCON System</div>
        <div style="color:#666;font-size:13px;">Automated Notification</div>
      </div>
    </div>

    <!-- Footer -->
    <div style="padding:32px 40px;text-align:center;border-top:1px solid #1a1a1a;">
      <div style="font-size:14px;font-weight:600;color:#fff;letter-spacing:1px;margin-bottom:8px;">BCON CLUB</div>
      <div style="font-size:12px;color:#666;margin-bottom:16px;">HUMAN &times; AI</div>
      <div style="font-size:12px;color:#444;">
        <a href="https://bconclub.com" style="color:#666;text-decoration:none;">Website</a>
      </div>
    </div>
  </div>
</body>
</html>`;
}

function leadEmailHtml(data: {
  name: string;
  email: string;
  phone?: string;
  service?: string;
  brandName?: string;
  industry?: string;
  appType?: string;
  estimatedMinPrice?: string;
  estimatedMaxPrice?: string;
}) {
  const serviceName = data.service || 'Not specified';

  let pricingHtml = '';
  if (data.industry || data.appType || (data.estimatedMinPrice && data.estimatedMaxPrice)) {
    pricingHtml = `
      <!-- Pricing Quote Card -->
      <div style="background:#111;border:1px solid #222;border-radius:16px;padding:28px;margin-bottom:40px;">
        <div style="font-size:12px;letter-spacing:1.5px;color:#666;text-transform:uppercase;margin-bottom:20px;font-weight:500;">Pricing Quote Details</div>
        ${data.industry ? `
        <div style="margin-bottom:16px;">
          <div style="font-size:12px;color:#666;margin-bottom:4px;">Industry</div>
          <div style="font-size:16px;color:#fff;font-weight:500;">${data.industry}</div>
        </div>` : ''}
        ${data.appType ? `
        <div style="margin-bottom:16px;">
          <div style="font-size:12px;color:#666;margin-bottom:4px;">App Type</div>
          <div style="font-size:16px;color:#fff;font-weight:500;">${data.appType}</div>
        </div>` : ''}
        ${data.estimatedMinPrice && data.estimatedMaxPrice ? `
        <div style="margin-bottom:0;">
          <div style="font-size:12px;color:#666;margin-bottom:4px;">Estimated Price Range</div>
          <div style="font-size:16px;color:#d4ff00;font-weight:500;">$${data.estimatedMinPrice} – $${data.estimatedMaxPrice}</div>
        </div>` : ''}
      </div>`;
  }

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Lead - BCON Club</title>
</head>
<body style="margin:0;padding:0;font-family:'Space Grotesk',-apple-system,BlinkMacSystemFont,sans-serif;background-color:#0a0a0a;color:#ffffff;line-height:1.6;">
  <div style="max-width:600px;margin:0 auto;background:#0a0a0a;">
    <!-- Header -->
    <div style="background:linear-gradient(135deg,#0a0a0a 0%,#1a1a2e 50%,#0a0a0a 100%);padding:60px 40px;text-align:center;">
      <img src="https://bconclub.com/BCON%20icon.png" alt="BCON Club" width="72" height="72" style="display:block;margin:0 auto 24px;object-fit:contain;" />
      <h1 style="font-size:32px;font-weight:700;color:#d4ff00;margin:0 0 12px;letter-spacing:-0.5px;">New Lead</h1>
      <p style="color:#888;font-size:16px;margin:0;">Someone just submitted the contact form.</p>
    </div>

    <!-- Content -->
    <div style="padding:40px;">
      <!-- Greeting -->
      <div style="margin-bottom:32px;">
        <div style="font-size:11px;letter-spacing:2px;color:#666;text-transform:uppercase;margin-bottom:4px;">Lead Name</div>
        <div style="font-size:24px;font-weight:600;color:#fff;">${data.name}</div>
      </div>

      <!-- Lead Details Card -->
      <div style="background:#111;border:1px solid #222;border-radius:16px;padding:28px;margin-bottom:40px;">
        <div style="font-size:12px;letter-spacing:1.5px;color:#666;text-transform:uppercase;margin-bottom:20px;font-weight:500;">Lead Details</div>

        <div style="margin-bottom:16px;">
          <div style="font-size:12px;color:#666;margin-bottom:4px;">Name</div>
          <div style="font-size:16px;color:#fff;font-weight:500;">${data.name}</div>
        </div>

        <div style="margin-bottom:16px;">
          <div style="font-size:12px;color:#666;margin-bottom:4px;">Email</div>
          <div style="font-size:16px;color:#fff;font-weight:500;">${data.email}</div>
        </div>

        <div style="margin-bottom:16px;">
          <div style="font-size:12px;color:#666;margin-bottom:4px;">Phone</div>
          <div style="font-size:16px;color:#fff;font-weight:500;">${data.phone || 'Not provided'}</div>
        </div>

        <div style="margin-bottom:16px;">
          <div style="font-size:12px;color:#666;margin-bottom:4px;">Service</div>
          <div style="font-size:16px;color:#fff;font-weight:500;">${serviceName}</div>
        </div>

        <div style="margin-bottom:0;">
          <div style="font-size:12px;color:#666;margin-bottom:4px;">Brand Name</div>
          <div style="font-size:16px;color:#fff;font-weight:500;">${data.brandName || 'Not provided'}</div>
        </div>
      </div>

      ${pricingHtml}

      <!-- Highlight Box -->
      <div style="background:linear-gradient(135deg,rgba(212,255,0,0.08) 0%,rgba(212,255,0,0.02) 100%);border-left:3px solid #d4ff00;padding:20px 24px;border-radius:0 12px 12px 0;margin-bottom:40px;">
        <div style="font-size:28px;font-weight:700;color:#d4ff00;margin-bottom:4px;">${serviceName}</div>
        <div style="font-size:14px;color:#888;">New lead from the website. Follow up as soon as possible to maximize conversion.</div>
      </div>

      <!-- What to Do Next -->
      <div style="margin-bottom:40px;">
        <h2 style="font-size:18px;font-weight:600;color:#fff;margin:0 0 16px;">Next Steps</h2>
        <div style="font-size:15px;color:#ccc;margin-bottom:12px;">
          <span style="color:#d4ff00;font-weight:600;margin-right:12px;">&rarr;</span>Reply to ${data.email}
        </div>
        ${data.phone ? `<div style="font-size:15px;color:#ccc;margin-bottom:12px;">
          <span style="color:#d4ff00;font-weight:600;margin-right:12px;">&rarr;</span>Call ${data.phone}
        </div>` : ''}
        <div style="font-size:15px;color:#ccc;margin-bottom:12px;">
          <span style="color:#d4ff00;font-weight:600;margin-right:12px;">&rarr;</span>Schedule a discovery call
        </div>
      </div>

      <!-- Divider -->
      <div style="height:1px;background:linear-gradient(90deg,transparent,#333,transparent);margin:40px 0;"></div>

      <!-- Timestamp -->
      <div style="margin-bottom:32px;">
        <div style="font-size:12px;color:#666;margin-bottom:4px;">Submitted At</div>
        <div style="font-size:14px;color:#888;">${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })} IST</div>
      </div>

      <!-- Signature -->
      <div style="margin-top:32px;">
        <div style="font-weight:600;color:#fff;font-size:15px;">BCON System</div>
        <div style="color:#666;font-size:13px;">Automated Notification</div>
      </div>
    </div>

    <!-- Footer -->
    <div style="padding:32px 40px;text-align:center;border-top:1px solid #1a1a1a;">
      <div style="font-size:14px;font-weight:600;color:#fff;letter-spacing:1px;margin-bottom:8px;">BCON CLUB</div>
      <div style="font-size:12px;color:#666;margin-bottom:16px;">HUMAN &times; AI</div>
      <div style="font-size:12px;color:#444;">
        <a href="https://bconclub.com" style="color:#666;text-decoration:none;">Website</a>
      </div>
    </div>
  </div>
</body>
</html>`;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { type, data } = body;

    if (type === 'newsletter') {
      const { name, email } = data;

      const resend = getResend();
      const { error } = await resend.emails.send({
        from: 'BCON Club <onboarding@resend.dev>',
        to: NOTIFICATION_EMAIL,
        subject: `New Newsletter Subscriber: ${name}`,
        html: newsletterEmailHtml(name, email),
      });

      if (error) {
        console.error('Resend error (newsletter):', error);
        return NextResponse.json({ error: error.message }, { status: 400 });
      }

      return NextResponse.json({ success: true });
    }

    if (type === 'lead') {
      const { name, email, phone, service, brandName, industry, appType, estimatedMinPrice, estimatedMaxPrice } = data;

      const resend = getResend();
      const { error } = await resend.emails.send({
        from: 'BCON Club <onboarding@resend.dev>',
        to: NOTIFICATION_EMAIL,
        subject: `New Lead: ${name} - ${service || 'General Inquiry'}`,
        html: leadEmailHtml({ name, email, phone, service, brandName, industry, appType, estimatedMinPrice, estimatedMaxPrice }),
      });

      if (error) {
        console.error('Resend error (lead):', error);
        return NextResponse.json({ error: error.message }, { status: 400 });
      }

      return NextResponse.json({ success: true });
    }

    return NextResponse.json({ error: 'Invalid type' }, { status: 400 });
  } catch (error) {
    console.error('Send email error:', error);
    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
  }
}
