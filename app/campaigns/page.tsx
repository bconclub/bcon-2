import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'BCON | Marketing Campaigns',
  description: 'Explore BCON\'s AI-powered marketing campaigns and creative work.',
};

export default function CampaignsPage() {
  return (
    <main
      style={{
        minHeight: '100vh',
        background: '#000',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '500px',
          position: 'relative',
        }}
      >
        {/* 9:16 Aspect Ratio Container */}
        <div
          style={{
            position: 'relative',
            width: '100%',
            paddingTop: '177.7778%', // 9:16 aspect ratio
          }}
        >
          <iframe
            src="https://www.canva.com/design/DAGoRJBw7Y4/yFtT8ESEdnpf0S7UZoWv9Q/view?embed"
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              border: 'none',
              borderRadius: '8px',
            }}
            allow="fullscreen"
            title="BCON Marketing Campaigns"
          />
        </div>
      </div>
    </main>
  );
}
