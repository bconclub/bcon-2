# BCON 2.0 Build & Project Guide

Authoritative notes for building and running the project, plus the high-level structure.

## Overview
- **Framework**: Next.js 15.x (App Router)
- **Language**: TypeScript 5
- **Runtime**: React 19.2.0, React DOM 19.2.0
- **Database/Auth**: Supabase (with @supabase/ssr for Next.js integration)
- **Effects/animation**: GSAP 3.13.0, @gsap/react 2.1.2, motion 12.23.24, three 0.180.0, ogl 1.0.11, lottie-react 2.4.1
- **Smooth scroll**: lenis 1.3.21 (mounted globally via `lib/lenis.tsx`)
- **Email**: resend 6.9.2 (transactional email via `/api/send-email`)
- **Charts**: recharts 3.8.1 (used in admin / status surfaces)
- **Styling**: Tailwind 4.x (`@tailwindcss/postcss`), still co-existing with per-component CSS
- **Testing**: React Testing Library 16.3.0, Jest DOM 6.9.1, @testing-library/user-event 13.5.0
- **UI Components**: @radix-ui/react-accordion 1.2.12
- **Utilities**: mathjs 15.0.0, web-vitals 2.1.4
- **Project Version**: 1.77.0 (auto-bumped via CI on every merge)
- **Latest Git Tag**: v1.77.0
- **Entry point**: `app/layout.tsx` → `app/page.tsx`

## Prerequisites
- **Node.js**: 18+ (recommended: 20+)
- **npm**: 9+ (Yarn not configured)
- **Supabase**: Active project with environment variables configured
- **Git**: For version control (if deploying)

## Environment Variables

### Required (Local Development - `.env.local`)
```bash
# Supabase Configuration (Required)
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# Webhook Configuration (Optional)
NEXT_PUBLIC_WEBHOOK_URL=https://build.goproxe.com/webhook/bconclub-website
NEXT_PUBLIC_WEBHOOK_SECRET=your-webhook-secret-token  # Optional: for webhook authentication
NEXT_PUBLIC_ENABLE_WEBHOOK_TRACKING=true  # Set to true to enable tracking in development
WEBHOOK_SECRET=your-webhook-secret-token  # Server-side webhook secret (for /api/webhook endpoint)

# Email (Required for /api/send-email — contact form, thank-you, quote builder)
RESEND_API_KEY=re_xxx_your_resend_api_key

# PROXe Form Integration (used by ContactSection + /thank-you)
NEXT_PUBLIC_PROXE_FORM_URL=https://proxe.bconclub.com/api/...   # set per environment
```

### Environment Variable Notes
- Variables prefixed with `NEXT_PUBLIC_` are available on the client-side
- `SUPABASE_SERVICE_ROLE_KEY` should NEVER be exposed to client-side code (server-only)
- `WEBHOOK_SECRET` is server-only and used for webhook authentication
- Create `.env.local` in the project root (this file is gitignored)

## Installation

### Initial Setup
```bash
# Clone repository (if applicable)
git clone <repository-url>
cd BCON2

# Install dependencies
npm install
```

### Dependency Versions (from package.json — v1.77.0)
```json
{
  "dependencies": {
    "@gsap/react": "^2.1.2",
    "@radix-ui/react-accordion": "^1.2.12",
    "@supabase/ssr": "^0.8.0",
    "@supabase/supabase-js": "^2.89.0",
    "@testing-library/dom": "^10.4.1",
    "@testing-library/jest-dom": "^6.9.1",
    "@testing-library/react": "^16.3.0",
    "@testing-library/user-event": "^13.5.0",
    "gsap": "^3.13.0",
    "lenis": "^1.3.21",
    "lottie-react": "^2.4.1",
    "mathjs": "^15.0.0",
    "motion": "^12.23.24",
    "next": "^15.0.0",
    "ogl": "^1.0.11",
    "react": "^19.2.0",
    "react-dom": "^19.2.0",
    "recharts": "^3.8.1",
    "resend": "^6.9.2",
    "three": "^0.180.0",
    "web-vitals": "^2.1.4"
  },
  "devDependencies": {
    "@tailwindcss/postcss": "^4.2.2",
    "@types/node": "^20",
    "@types/react": "^19",
    "@types/react-dom": "^19",
    "@types/three": "^0.182.0",
    "autoprefixer": "^10.4.27",
    "eslint": "^9.39.2",
    "eslint-config-next": "^16.1.1",
    "postcss": "^8.5.9",
    "tailwindcss": "^4.2.2",
    "typescript": "^5"
  }
}
```

## Development

### Run Development Server
```bash
npm run dev
```
- Runs Next.js development server
- Serves at **http://localhost:3000**
- Hot reload enabled
- TypeScript checking enabled
- React Strict Mode enabled

### Development Features
- Fast Refresh (HMR)
- TypeScript type checking
- ESLint integration
- Source maps for debugging

## Build (Production)

### Create Production Build
```bash
npm run build
```
- Outputs optimized production build to `.next/` directory
- Next.js handles all optimization automatically:
  - Code splitting
  - Tree shaking
  - Minification
  - Image optimization
  - Static page generation where applicable

### Build Output
- Production build is created in `.next/` directory
- Static assets are optimized and hashed
- Server and client bundles are separated
- Build includes source maps for production debugging

## Start (Production Server)

### Run Production Server
```bash
npm start
```
- Starts production server (must run `npm run build` first)
- Serves the production build
- Default port: 3000 (configurable via `PORT` environment variable)
- Optimized for performance

## Testing

### Run Tests
```bash
npm test
```
- Interactive watch mode (if configured)
- Uses React Testing Library and Jest DOM
- Test files should be named `*.test.ts` or `*.test.tsx`

### Test Configuration
- Testing Library: React Testing Library v16.3.0
- Jest DOM: v6.9.1
- User Event: v13.5.0

## Linting

### Run ESLint
```bash
npm run lint
```
- Runs ESLint on the codebase
- Uses `eslint-config-next` v16.1.1
- ESLint version: 9.39.2
- Configured with Next.js recommended rules

## Scripts Reference (from package.json)

| Script | Command | Description |
|--------|---------|-------------|
| `dev` | `next dev` | Start Next.js development server |
| `build` | `node scripts/set-build-time.js && next build` | Stamp build time + create optimized production build |
| `start` | `next start` | Start production server (requires build) |
| `lint` | `next lint` | Run ESLint on codebase |
| `set-build-time` | `node scripts/set-build-time.js` | Write build timestamp/git metadata to `app/build-info.json` (consumed by `/status`) |

## Project Structure

```
bconclub/
├── app/                                # Next.js App Router
│   ├── about/                          # /about
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── admin/                          # Admin panel (protected)
│   │   ├── login/                      # /admin/login
│   │   ├── work/                       # /admin/work — work item CMS
│   │   └── page.tsx                    # /admin — dashboard
│   ├── api/                            # API routes
│   │   ├── portfolio/                  # Portfolio CRUD
│   │   │   ├── [id]/route.ts
│   │   │   └── route.ts
│   │   ├── send-email/route.ts         # Resend-backed transactional email
│   │   ├── status/route.ts             # Status / version / git metadata
│   │   ├── story-highlights/route.ts
│   │   ├── upload/route.ts             # File upload to Supabase Storage
│   │   ├── viewer-count/route.ts       # Lightweight viewer counter
│   │   ├── visitor-count/route.ts      # Site-wide visitor counter
│   │   ├── webhook/route.ts            # Inbound webhook from build.goproxe.com
│   │   └── work/                       # Work CRUD + media
│   │       ├── [id]/media/route.ts
│   │       ├── [id]/route.ts
│   │       ├── media/[mediaId]/route.ts
│   │       └── route.ts
│   ├── campaigns/                      # /campaigns — campaign landing
│   ├── gpfc-ai-lead-machine/           # /gpfc-ai-lead-machine — case-study landing
│   ├── pricing-quote/                  # /pricing-quote — quote builder
│   ├── privacy/                        # /privacy — privacy policy
│   │   ├── page.tsx
│   │   └── privacy.css
│   ├── proxe/                          # /proxe — PROXe product landing
│   │   ├── components/ProxeLanding.tsx
│   │   ├── styles/landing.css
│   │   └── page.tsx
│   ├── proxe-cfs/                      # /proxe-cfs — PROXe Security & Platform
│   │   ├── page.tsx
│   │   └── proxe-cfs.css
│   ├── services/                       # /services
│   ├── status/                         # /status — version + DB status
│   │   ├── page.tsx
│   │   └── status.css
│   ├── thank-you/                      # /thank-you — post-submit page (PROXe + WhatsApp)
│   ├── work/                           # /work — portfolio
│   │   ├── page.tsx
│   │   └── work.css
│   ├── globals.css                     # Global styles
│   ├── layout.tsx                      # Root layout (Tracking, ErrorBoundary, Lenis, ProxeWidget)
│   ├── not-found.tsx                   # 404 page
│   ├── page.tsx                        # Home (/)
│   └── sitemap.ts                      # Auto-generated sitemap
├── components/                         # Reusable UI components
│   ├── admin/ProtectedRoute.tsx        # Admin route guard
│   ├── ComingSoonModal/                # "Coming soon" modal
│   ├── desktop/                        # Desktop-specific Hero, BusinessApps, WorkGrid
│   ├── mobile/                         # Mobile-specific Hero, BusinessApps, WorkGrid
│   ├── ErrorBoundary/                  # App-wide error boundary
│   ├── ProxeWidget/                    # Conditional PROXe chat-widget loader
│   │   └── ProxeWidget.tsx             # Hides widget on /proxe and /proxe-cfs
│   ├── ResponsiveSection.tsx           # Mobile/desktop switch wrapper
│   ├── shared/Icons.tsx
│   ├── StaggeredMenu/                  # Right-side staggered nav menu
│   └── Tracking/TrackingProvider.tsx
├── effects/                            # Visual effects
│   ├── GradualBlur/                    # Gradient/backdrop blur overlay
│   ├── LiquidEther/                    # WebGL fluid background (Three.js)
│   └── Loader/                         # First-paint HUMAN X AI loader
├── lib/                                # Utility libraries
│   ├── hooks/useMediaQuery.ts
│   ├── lenis.tsx                       # Lenis smooth-scroll provider (mounted in root layout)
│   ├── pricing/                        # Quote-builder pricing logic (used by /pricing-quote)
│   ├── supabase/{client,server}.ts     # Supabase clients (browser + SSR)
│   └── tracking/                       # UTM + webhook tracking utilities
├── sections/                           # Page sections (composable on home + sub-pages)
│   ├── BusinessAppsCarousel/
│   ├── BusinessAppsSection/
│   ├── CareersSection/                 # NEW — careers/we're-hiring section
│   ├── CaseStudyModal/
│   ├── CategorySection/
│   ├── CategoryToggle/
│   ├── ContactSection/                 # Contact form (PROXe form integration)
│   ├── FeaturedWorkGrid/
│   ├── Footer/                         # Newsletter + sitemap + visitor counter
│   ├── LiquidBentoPortfolio/           # Masonry bento portfolio grid
│   ├── PricingQuote/                   # NEW — pricing quote builder UI
│   ├── ProjectCard/
│   ├── RotatingText/
│   ├── ScrollReveal/
│   ├── ServicesDetail/
│   ├── ServicesGrid/
│   ├── ShowReel/                       # Hero "Reel · Play Our" rotating button + modal player
│   ├── ShowcaseCard/
│   ├── ShowcaseSection/
│   ├── StoryHighlights/                # IG-stories-style horizontal scroll
│   ├── WorkCard/
│   ├── WorkGrid/
│   ├── WorkHeroVideo/                  # Hero video w/ mute/unmute (since v1.74)
│   └── WorkShowcase/
├── public/                             # Static assets (images, video, fonts, OG)
├── scripts/
│   └── set-build-time.js               # Stamps git SHA + build time into app/build-info.json
├── ecosystem.config.js                 # PM2 deployment config
├── next.config.js                      # Next.js configuration
├── postcss.config.js                   # Tailwind + autoprefixer pipeline
├── tailwind.config.ts                  # Tailwind 4 config
├── tsconfig.json                       # TypeScript configuration
├── vercel.json                         # Vercel deployment configuration
├── package.json                        # Dependencies and scripts
├── README.md
├── ARCHITECTURE.md
├── DEPLOYMENT.md
├── bconclub.md                         # ← this file
└── supabase-complete-schema.sql        # Full Supabase schema
```

## API Routes

### Portfolio API
- **GET** `/api/portfolio` - List all portfolio items
- **POST** `/api/portfolio` - Create new portfolio item
- **GET** `/api/portfolio/[id]` - Get individual portfolio item
- **PUT** `/api/portfolio/[id]` - Update portfolio item
- **DELETE** `/api/portfolio/[id]` - Delete portfolio item

### Work API
- **GET** `/api/work` - List all work items
- **POST** `/api/work` - Create new work item
- **GET** `/api/work/[id]` - Get individual work item
- **PUT** `/api/work/[id]` - Update work item
- **DELETE** `/api/work/[id]` - Delete work item
- **GET** `/api/work/[id]/media` - Get work media
- **POST** `/api/work/[id]/media` - Add media to work item
- **GET** `/api/work/media/[mediaId]` - Get individual media item
- **DELETE** `/api/work/media/[mediaId]` - Delete media item

### Upload API
- **POST** `/api/upload` - File upload endpoint (for images/videos)

### Webhook API
- **POST** `/api/webhook` - Receive webhook calls from build.goproxe.com
- **GET** `/api/webhook` - Verify webhook endpoint is active

### Status API
- **GET** `/api/status` - Application status endpoint (includes version from git tags, database status, git info)

### Visitor Count API
- **GET** `/api/visitor-count` - Increment and fetch visitor count
- **GET** `/api/visitor-count?fetchOnly=true` - Fetch current count without incrementing

### Viewer Count API
- **GET** `/api/viewer-count` - Lightweight per-page concurrent-viewer counter (separate from total visitor count)

### Send Email API
- **POST** `/api/send-email` - Send transactional email via Resend (used by contact form, quote builder, thank-you flow). Requires `RESEND_API_KEY` server env var.

### Story Highlights API
- **GET** `/api/story-highlights` - Get story highlights

## Public Pages / Routes

| Route | File | Purpose |
|-------|------|---------|
| `/` | `app/page.tsx` | Home — hero, scroll-reveal creative section, solutions grid, bento portfolio, business apps, contact, footer |
| `/about` | `app/about/page.tsx` | About BCON |
| `/services` | `app/services/page.tsx` | Services overview |
| `/work` | `app/work/page.tsx` | Portfolio / work archive |
| `/campaigns` | `app/campaigns/page.tsx` | Campaign-specific landing |
| `/pricing-quote` | `app/pricing-quote/page.tsx` | Interactive quote builder (pricing logic in `lib/pricing/`) |
| `/proxe` | `app/proxe/page.tsx` | PROXe product landing page |
| `/proxe-cfs` | `app/proxe-cfs/page.tsx` | PROXe Security & Platform (compliance / infra spec) |
| `/gpfc-ai-lead-machine` | `app/gpfc-ai-lead-machine/page.tsx` | GPFC AI Lead Machine case study |
| `/thank-you` | `app/thank-you/page.tsx` | Post-form-submit page; auto-fills WhatsApp message and offers AI voice call |
| `/privacy` | `app/privacy/page.tsx` | Privacy policy |
| `/status` | `app/status/page.tsx` | Build/version/DB health (reads `app/build-info.json` + git tags) |
| `/admin`, `/admin/login`, `/admin/work` | `app/admin/...` | Admin-only (Supabase Auth) |
| `/sitemap.xml` | `app/sitemap.ts` | Auto-generated sitemap |

### PROXe Chat Widget Visibility
The PROXe chat widget script (`https://proxe.bconclub.com/api/widget/embed.js`) is loaded
globally via `components/ProxeWidget/ProxeWidget.tsx`, which uses `usePathname()` to
**hide the widget on `/proxe` and `/proxe-cfs`** (and all sub-routes). The widget loads on
every other route. To exclude additional routes, edit the `HIDDEN_ROUTES` array in that
component.

## Admin Access

### Admin Routes
- **Login URL**: `/admin/login`
- **Dashboard URL**: `/admin` (protected route)
- **Work Management**: `/admin/work`

### Authentication
- **Provider**: Supabase Auth
- **Protection**: `ProtectedRoute` component wraps admin routes
- **Access**: Users must log in with valid Supabase credentials
- **Session**: Managed by Supabase Auth with SSR support

### Admin Features
- Portfolio management
- Work item management
- Media upload and management
- Authentication required for all admin operations

## Responsive Design Architecture

### Component Switching Approach
The project uses a **Component Switching** approach for responsive design:
- **Mobile components**: `components/mobile/` (viewport ≤ 768px)
- **Desktop components**: `components/desktop/` (viewport > 768px)
- **Wrapper**: `ResponsiveSection` component automatically renders the correct version

### Responsive Components
| Component | Mobile | Desktop | Status |
|-----------|--------|---------|--------|
| Hero | `components/mobile/Hero.tsx` | `components/desktop/Hero.tsx` | ✅ Complete |
| Business Apps | `components/mobile/BusinessApps.tsx` | `components/desktop/BusinessApps.tsx` | ✅ Complete |
| Work Grid | `components/mobile/WorkGrid.tsx` | `components/desktop/WorkGrid.tsx` | ✅ Complete |

### Device Detection
- Uses `useMediaQuery` hook from `lib/hooks/useMediaQuery.ts`
- Breakpoint: 768px (customizable per component)
- Client-side detection using `window.matchMedia`

## Tracking & Analytics

### Automatic Tracking
The application includes tracking via `TrackingProvider`:
- **Form Submissions**: All form submissions with form details and full session context
- **UTM Parameters**: Automatically captures and persists UTM parameters from URLs
- **Session Tracking**: Session ID generation and persistence across page loads
- **Form Data**: Captures all form fields, page context, viewport, language, timezone, and screen resolution

### UTM Parameter Tracking
UTM parameters are automatically captured:
- `utm_source` - Traffic source
- `utm_medium` - Marketing medium
- `utm_campaign` - Campaign name
- `utm_term` - Campaign term/keyword
- `utm_content` - Content variation

UTM parameters are:
- Parsed from the URL on page load
- Stored in sessionStorage for the entire session
- Included in all tracking events sent to the webhook
- Persisted across page navigations

### Webhook Integration
- **Webhook URL**: `https://build.goproxe.com/webhook/bconclub-website`
- **Format**: POST requests with JSON payloads
- **Batching**: Events are queued and sent in batches for better performance
- **Retry Logic**: Failed requests are automatically retried up to 3 times
- **Authentication**: Optional `WEBHOOK_SECRET` for secure webhook calls

### Disabling Tracking
To disable tracking in development:
```bash
NEXT_PUBLIC_ENABLE_WEBHOOK_TRACKING=false
```

## Next.js Configuration

### Image Optimization
Configured in `next.config.js`:
- **Supabase Storage**: `**.supabase.co` (storage bucket images)
- **Vimeo**: `player.vimeo.com`, `i.vimeocdn.com` (video thumbnails)
- **Local Images**: Optimized automatically
- **Format**: WebP, AVIF when supported

### Webpack Configuration
Custom webpack configuration for:
- **Three.js Support**: Fallbacks for `fs`, `path`, `crypto` (client-side)
- **GLSL Shader Support**: `.glsl`, `.vs`, `.fs`, `.vert`, `.frag` files
- **GSAP**: Full support for GSAP animations

### React Strict Mode
Enabled for development:
- Helps identify potential problems
- Detects unexpected side effects
- Warns about deprecated APIs

### TypeScript Configuration
- **Target**: ES2020
- **Module**: ESNext
- **Module Resolution**: Bundler
- **Strict Mode**: Enabled
- **Path Aliases**: `@/*` maps to project root

## Build Truths / Operational Notes

### Core Technologies
- **Next.js**: 15.0.0 with App Router (not Pages Router, not Create React App)
- **TypeScript**: 5.x for type safety
- **React**: 19.2.0 (React DOM 19.2.0) - Latest stable version
- **Supabase**: @supabase/ssr v0.8.0 and @supabase/supabase-js v2.89.0 for proper Next.js SSR support

### Environment Variables
- Must be prefixed with `NEXT_PUBLIC_` to be available on the client
- Server-only variables (like `SUPABASE_SERVICE_ROLE_KEY`) should NOT have `NEXT_PUBLIC_` prefix
- Set in `.env.local` for local development (gitignored)
- Set in deployment platform (Vercel, etc.) for production

### Static Assets
- Static assets in `public/` are served from the root path
- Example: `public/logo.png` → accessible at `/logo.png`
- Images are automatically optimized by Next.js Image component

### Routing
- App Router uses file-based routing in the `app/` directory
- `page.tsx` files define routes
- `layout.tsx` files define shared layouts
- `route.ts` files define API routes

### Supabase Integration
- Client-side: `lib/supabase/client.ts` (browser)
- Server-side: `lib/supabase/server.ts` (SSR, API routes)
- Uses `@supabase/ssr` for proper Next.js integration
- Row Level Security (RLS) policies should be configured in Supabase

### Animation Libraries
- **GSAP**: 3.13.0 with React integration (@gsap/react 2.1.2)
- **Motion**: 12.23.24 for animations
- **Three.js**: 0.180.0 for 3D graphics
- **OGL**: 1.0.11 for WebGL utilities

### Testing
- **React Testing Library**: v16.3.0
- **Jest DOM**: v6.9.1
- **User Event**: v13.5.0
- Test files: `*.test.ts` or `*.test.tsx`

### Linting
- **ESLint**: 9.39.2
- **Config**: eslint-config-next v16.1.1
- Next.js recommended rules enabled

### Browser Support
Configured in `package.json` browserslist:
- **Production**: >0.2%, not dead, not op_mini all
- **Development**: Last 1 version of Chrome, Firefox, Safari

### Package Overrides
Security overrides in `package.json`:
- `terser`: ^5.15.1
- `css-what`: ^6.1.0
- `nth-check`: ^2.1.1

## Deployment

### Vercel Deployment (Recommended)

#### Configuration
- **Framework**: Next.js (auto-detected)
- **Build Command**: `npm run build`
- **Output Directory**: `.next` (auto-detected)
- **Install Command**: `npm install`
- **Regions**: `iad1` (configured in `vercel.json`)

#### Environment Variables (Vercel)
Set in Vercel Dashboard → Settings → Environment Variables:
```
NEXT_PUBLIC_SUPABASE_URL=your-supabase-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-supabase-service-role-key
NEXT_PUBLIC_WEBHOOK_URL=https://build.goproxe.com/webhook/bconclub-website
NEXT_PUBLIC_ENABLE_WEBHOOK_TRACKING=true
WEBHOOK_SECRET=your-webhook-secret-token
```

#### Deployment Steps
1. Connect GitHub repository to Vercel
2. Configure environment variables
3. Deploy (automatic on push to main branch)
4. Custom domain configuration (optional)

### PM2 Deployment (Server)

#### Configuration
PM2 configuration in `ecosystem.config.js`:
- **App Name**: `bconclub`
- **Script**: `npm start`
- **Working Directory**: `/var/www/bconclub`
- **Instances**: 1
- **Memory Limit**: 1GB
- **Port**: 3003 (configurable via `PORT` env var)
- **Auto Restart**: Enabled
- **Logs**: `/var/www/bconclub/logs/`

#### PM2 Commands
```bash
# Start application
pm2 start ecosystem.config.js

# Stop application
pm2 stop bconclub

# Restart application
pm2 restart bconclub

# View logs
pm2 logs bconclub

# Monitor
pm2 monit
```

### Supabase Configuration

#### Database Tables
Required tables (see `supabase-complete-schema.sql`):
- **portfolio_items**: Portfolio/work items
- **work_items**: Work showcase items
- **categories**: Portfolio categories
- **site_analytics**: Visitor counter and analytics
- **business_apps**: Business applications
- **contact_submissions**: Contact form submissions
- **newsletter_subscriptions**: Newsletter signups

#### Storage Buckets
Required buckets:
- **portfolio-images**: Public bucket for portfolio images
- **admin-uploads**: Private bucket for admin-only uploads (optional)

#### Row Level Security (RLS)
- Public can read published portfolio/work items
- Public can read site_analytics (visitor count)
- Public can insert into contact_submissions and newsletter_subscriptions
- Only authenticated admins can create/update/delete
- Service role key required for visitor count increments
- Configure RLS policies in Supabase Dashboard

#### Authentication
- Admin users created in Supabase Dashboard → Authentication → Users
- Email/password authentication
- Session management via Supabase Auth

#### Visitor Counter
- **Table**: `site_analytics` (single row with `id='main'`)
- **API**: `/api/visitor-count` (increments on first visit per session)
- **Session Tracking**: Uses `sessionStorage` to prevent double-counting
- **Service Role Key**: Required for write operations (increment count)

## Troubleshooting

### Common Issues

#### Build Fails
- **Check**: Environment variables are set correctly
- **Verify**: All dependencies are in `package.json`
- **Run**: `npm run build` locally to see TypeScript errors
- **Check**: Node.js version is 18+ (recommended: 20+)

#### Images Not Loading
- **Verify**: Supabase Storage bucket is public
- **Check**: Image URLs in database are correct
- **Verify**: `next.config.js` image domains include Supabase
- **Check**: Image component is used correctly (`next/image`)

#### Authentication Not Working
- **Check**: Supabase URL and keys are correct
- **Verify**: RLS policies are configured
- **Check**: Browser console for errors
- **Verify**: Environment variables are prefixed correctly

#### API Routes Returning 500
- **Check**: Server logs in Vercel/PM2
- **Verify**: Supabase connection is working
- **Check**: Authentication middleware is correct
- **Verify**: Service role key is set (server-only)

#### Webhook Not Receiving Events
- **Verify**: `NEXT_PUBLIC_WEBHOOK_URL` is set correctly
- **Check**: Webhook endpoint is accessible (`GET /api/webhook`)
- **Verify**: `WEBHOOK_SECRET` matches (if using authentication)
- **Check**: Network connectivity to webhook URL

#### TypeScript Errors
- **Run**: `npm run build` to see all TypeScript errors
- **Check**: Type definitions are installed (`@types/*` packages)
- **Verify**: `tsconfig.json` is configured correctly

#### Dependency Issues
- **Run**: `npm install` to reinstall dependencies
- **Clear**: `node_modules` and `package-lock.json` (then reinstall)
- **Check**: Node.js version compatibility
- **Verify**: Package versions in `package.json`

### Development Issues

#### Hot Reload Not Working
- **Restart**: Development server (`npm run dev`)
- **Clear**: `.next` directory
- **Check**: File changes are being saved

#### Port Already in Use
- **Change**: Port in `package.json` scripts: `next dev -p 3001`
- **Kill**: Process using port 3000: `lsof -ti:3000 | xargs kill`

## Monitoring & Maintenance

### Vercel Analytics
- Enable in Project Settings → Analytics
- Monitor performance and errors
- Track page views and user behavior

### Supabase Dashboard
- Monitor database usage
- Check API request logs
- Monitor storage usage
- View authentication logs

### Logs
- **Vercel**: View logs in Vercel Dashboard → Deployments
- **PM2**: View logs with `pm2 logs bconclub`
- **Local**: Check console output during development

### Performance
- Monitor bundle size (Vercel Analytics)
- Check image optimization
- Monitor API response times
- Track Core Web Vitals

## Backup Strategy

1. **Database**: Use Supabase backups (automatic daily)
2. **Code**: Git repository is your backup
3. **Images**: Consider periodic exports from Supabase Storage
4. **Environment Variables**: Document in secure location

## Scaling Considerations

### Free Tier Limits
- **Supabase**: 500MB database, 1GB storage
- **Vercel**: 100GB bandwidth
- Monitor usage in both dashboards

### Upgrade Path
- Upgrade Supabase plan for more storage/database
- Upgrade Vercel plan for more bandwidth
- Consider CDN for static assets
- Implement caching strategies

## Additional Resources

- **Next.js Docs**: https://nextjs.org/docs
- **Supabase Docs**: https://supabase.com/docs
- **GSAP Docs**: https://greensock.com/docs
- **Three.js Docs**: https://threejs.org/docs
- **TypeScript Docs**: https://www.typescriptlang.org/docs

## Effects & Animations Reference

### Overview
The BCON website uses a comprehensive animation system powered by multiple libraries:
- **GSAP 3.13.0** with ScrollTrigger for scroll-based animations
- **Motion (Framer Motion)** 12.23.24 for React component animations
- **Three.js 0.180.0** for 3D/WebGL effects
- **Custom CSS animations** for simple transitions

---

### Effect Components (`/effects/`)

#### 1. LiquidEther (`/effects/LiquidEther/`)
**File**: `LiquidEther.tsx`, `LiquidEther.css`

A WebGL-based fluid simulation background effect using Three.js.

**Features**:
- Navier-Stokes fluid dynamics simulation
- Mouse/touch interaction creates fluid disturbances
- Auto-demo mode with automatic cursor movement when idle
- Color palette mapping based on velocity
- Mobile-optimized (reduced resolution on mobile devices)

**Technical Implementation**:
- Custom shader passes: Advection, ExternalForce, Viscous, Divergence, Poisson, Pressure
- Frame Buffer Objects (FBOs) for GPU-based simulation
- BFECC (Back and Forth Error Compensation and Correction) for accuracy
- Intersection Observer for lazy initialization (only renders when visible)

**Props**:
```typescript
interface LiquidEtherProps {
  mouseForce?: number;        // Force of mouse interaction (default: 20)
  cursorSize?: number;        // Size of cursor influence (default: 100)
  isViscous?: boolean;        // Enable viscosity (default: false)
  viscous?: number;           // Viscosity coefficient (default: 30)
  iterationsViscous?: number; // Viscous solver iterations (default: 16)
  iterationsPoisson?: number; // Poisson solver iterations (default: 16)
  dt?: number;                // Time step (default: 0.04)
  BFECC?: boolean;            // Enable BFECC (default: true)
  resolution?: number;        // Simulation resolution (default: 0.5)
  isBounce?: boolean;         // Boundary bounce behavior (default: false)
  colors?: string[];          // Color palette (default: ['#5227FF', '#FF9FFC', '#B19EEF'])
  autoDemo?: boolean;         // Auto-demo mode (default: true)
  autoSpeed?: number;         // Auto movement speed (default: 0.5)
  autoIntensity?: number;     // Auto disturbance intensity (default: 2.2)
  takeoverDuration?: number;  // Transition duration when user takes over (default: 0.25s)
  autoResumeDelay?: number;   // Delay before auto resumes (default: 1000ms)
}
```

**Usage**:
- Desktop Hero background: Uses brand colors `['#6B2FE8', '#CCFF00', '#CDFC2E']`
- Mobile: Disabled (replaced with solid black background for performance)

---

#### 2. GradualBlur (`/effects/GradualBlur/`)
**File**: `GradualBlur.tsx`, `GradualBlur.css`

A configurable blur overlay effect using CSS backdrop-filter with gradient masking.

**Features**:
- Multi-layered blur with exponential or linear progression
- Four positioning options: top, bottom, left, right
- Multiple curve functions: linear, bezier, ease-in, ease-out, ease-in-out
- Animated entrance/exit with configurable duration
- Hover intensity effects
- Responsive dimension support
- Intersection Observer for scroll-triggered animations

**Presets**:
```typescript
PRESETS = {
  top: { position: 'top', height: '6rem' },
  bottom: { position: 'bottom', height: '6rem' },
  left: { position: 'left', height: '6rem' },
  right: { position: 'right', height: '6rem' },
  subtle: { height: '4rem', strength: 1, opacity: 0.8, divCount: 3 },
  intense: { height: '10rem', strength: 4, divCount: 8, exponential: true },
  smooth: { height: '8rem', curve: 'bezier', divCount: 10 },
  sharp: { height: '5rem', curve: 'linear', divCount: 4 },
  header: { position: 'top', height: '8rem', curve: 'ease-out' },
  footer: { position: 'bottom', height: '8rem', curve: 'ease-out' },
  sidebar: { position: 'left', height: '6rem', strength: 2.5 },
  'page-header': { position: 'top', height: '10rem', target: 'page', strength: 3 },
  'page-footer': { position: 'bottom', height: '10rem', target: 'page', strength: 3 }
}
```

**Curve Functions**:
- `linear`: p => p
- `bezier`: p => p * p * (3 - 2 * p) (smooth ease)
- `ease-in`: p => p * p
- `ease-out`: p => 1 - Math.pow(1 - p, 2)
- `ease-in-out`: Cubic easing

**Props**:
```typescript
interface GradualBlurProps {
  position?: 'top' | 'bottom' | 'left' | 'right';
  strength?: number;           // Blur intensity multiplier (default: 2)
  height?: string;             // Blur zone height (default: '6rem')
  divCount?: number;           // Number of blur layers (default: 5)
  exponential?: boolean;       // Exponential blur progression
  zIndex?: number;             // Stack order (default: 1000)
  animated?: boolean | 'scroll'; // Animation mode
  duration?: string;           // Animation duration (default: '0.3s')
  easing?: string;             // Animation easing
  opacity?: number;            // Overlay opacity (default: 1)
  curve?: string;              // Blur curve type
  responsive?: boolean;        // Responsive dimensions
  target?: 'parent' | 'page';  // Target container
  preset?: string;             // Use predefined preset
  hoverIntensity?: number;     // Multiplier on hover
}
```

---

#### 3. Loader (`/effects/Loader/`)
**File**: `Loader.tsx`, `Loader.css`

Initial page load animation component.

**Features**:
- "HUMAN X AI" text reveal with accent color
- Animated loading bar
- Automatic fade-out after 2.5 seconds
- Fixed position overlay covering entire viewport

**CSS Animations**:
```css
@keyframes loading {
  from { transform: translateX(-100%); }
  to { transform: translateX(0); }
}

@keyframes fadeOut {
  to { opacity: 0; visibility: hidden; }
}
```

**Duration**: 2.5 seconds total (1s animation + 1.5s display)

---

### Section Animations (`/sections/`)

#### 1. ScrollReveal (`/sections/ScrollReveal/`)
**File**: `ScrollReveal.tsx`, `ScrollReveal.css`

GSAP ScrollTrigger-powered text reveal animation.

**Features**:
- Word-by-word opacity animation on scroll
- Rotation animation (element rotates from baseRotation to 0)
- Color wave effect (words animate from accent green to white)
- Blur-to-clear effect per word
- Special handling for "BCON" brand word
- Line-specific styling classes: `reveal-line-1`, `reveal-line-2`, `reveal-line-3`

**Animation Details**:
```typescript
// Rotation animation
gsap.fromTo(el, 
  { transformOrigin: '0% 50%', rotate: 3 },
  { rotate: 0, ease: 'none', scrollTrigger: { scrub: true } }
);

// Word opacity animation
gsap.fromTo(wordElements,
  { opacity: 0.1 },
  { opacity: 1, stagger: 0.05, scrollTrigger: { scrub: true } }
);

// Color wave (green to white)
gsap.fromTo(wordElements,
  { color: '#CCFF00' },
  { color: '#ffffff', stagger: 0.05, scrollTrigger: { scrub: true } }
);

// Blur removal
gsap.fromTo(wordElements,
  { filter: 'blur(4px)' },
  { filter: 'blur(0px)', stagger: 0.05, scrollTrigger: { scrub: true } }
);
```

**Props**:
```typescript
interface ScrollRevealProps {
  children: React.ReactNode;
  scrollContainerRef?: React.RefObject<HTMLElement>;
  enableBlur?: boolean;        // Enable blur effect (default: true)
  baseOpacity?: number;        // Starting opacity (default: 0.1)
  baseRotation?: number;       // Starting rotation in degrees (default: 3)
  blurStrength?: number;       // Starting blur in px (default: 4)
  containerClassName?: string; // CSS class for container
  textClassName?: string;      // CSS class for text
  rotationEnd?: string;        // ScrollTrigger end for rotation
  wordAnimationEnd?: string;   // ScrollTrigger end for words
}
```

---

#### 2. RotatingText (`/sections/RotatingText/`)
**File**: `RotatingText.tsx`

Auto-rotating text component with blur transition.

**Features**:
- Cycles through array of words
- Blur out / blur in transition effect
- Configurable interval and blur timing
- Fixed min-width to prevent layout shift

**Animation Timing**:
- Interval: 3000ms (default) between word changes
- Blur transition: 500ms
- Blur strength: 10px during transition

**Props**:
```typescript
interface RotatingTextProps {
  words: string[];
  interval?: number;  // Time between rotations in ms (default: 3000)
}
```

---

#### 3. ShowReel (`/sections/ShowReel/`)
**File**: `ShowReel.tsx`, `ShowReel.css`

Video showcase component with rotating play button.

**Features**:
- **Rotating Circle Text**: SVG text rotating around circular path (10s rotation)
- **Play Button**: Centered play icon with hover effects
- **Modal Video Player**: Full-screen video modal with loading states
- **Video Controls**: Starts at 7 seconds, auto-closes on end

**CSS Animations**:
```css
@keyframes rotate {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

@keyframes fadeIn {
  from { opacity: 0; backdrop-filter: blur(0px); }
  to { opacity: 1; backdrop-filter: blur(30px); }
}

@keyframes slideUp {
  from { opacity: 0; transform: translateY(50px) scale(0.95); }
  to { opacity: 1; transform: translateY(0) scale(1); }
}

@keyframes spin {
  to { transform: rotate(360deg); }
}
```

**Hover Effects**:
- Trigger scales to 1.1x
- Circle text changes to white
- Play button background glows

---

#### 4. ShowcaseCard (`/sections/ShowcaseCard/`)
**File**: `ShowcaseCard.tsx`, `ShowcaseCard.css`

Animated card component for showcasing work items.

**Features**:
- GSAP ScrollTrigger entrance animation
- Fade in + slide up + scale effect
- Staggered delay based on index
- Aspect ratio support (16:9, 9:16)
- Left/right positioning

**Animation**:
```typescript
gsap.fromTo(cardRef.current,
  { opacity: 0, y: 60, scale: 0.95 },
  {
    opacity: 1, y: 0, scale: 1,
    duration: 0.8,
    ease: 'power3.out',
    delay: index * 0.15,
    scrollTrigger: { trigger: cardRef.current, start: 'top 80%' }
  }
);
```

---

#### 5. StoryHighlights (`/sections/StoryHighlights/`)
**File**: `StoryHighlights.tsx`, `StoryHighlights.css`

Instagram Stories-style horizontal scroll component.

**Features**:
- Drag-to-scroll interaction
- Scroll snap behavior
- Gradient border circles with CSS pseudo-elements
- Pulse animation on hover
- Staggered entrance animation with Motion

**Motion Animations**:
```typescript
<motion.button
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
  initial={{ opacity: 0, scale: 0.8 }}
  animate={{ opacity: 1, scale: 1 }}
  transition={{ delay: index * 0.1, duration: 0.3 }}
/>
```

**CSS Animation**:
```css
@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.7; }
}
```

---

#### 6. WorkCard (`/sections/WorkCard/`)
**File**: `WorkCard.tsx`, `WorkCard.css`

Portfolio work item card with hover effects.

**Features**:
- Motion-based entrance animation (fade up)
- Hover scale effect (1.05x)
- Tap scale effect (0.98x)
- Image/video zoom on hover (1.1x)
- Loading spinner for images
- Video play overlay

**Motion Animations**:
```typescript
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.4 }}
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.98 }}
/>
```

**CSS Hover Effect**:
```css
.work-card:hover .work-card-image,
.work-card:hover .work-card-video {
  transform: scale(1.1);
}
```

---

#### 7. ProjectCard (`/sections/ProjectCard/`)
**File**: `ProjectCard.tsx`, `ProjectCard.css`

Project display card with video hover preview.

**Features**:
- Motion entrance animation
- Hover video autoplay
- Scale effects on hover/tap
- Badge and view count display
- Image/video scale on hover (1.05x)

**Motion Animations**:
```typescript
<motion.div
  whileHover={{ scale: 1.02 }}
  whileTap={{ scale: 0.98 }}
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.3 }}
/>
```

---

#### 8. LiquidBentoPortfolio (`/sections/LiquidBentoPortfolio/`)
**File**: `LiquidBentoPortfolio.tsx`, `LiquidBentoPortfolio.css`

Masonry-style portfolio grid with hover effects.

**Features**:
- CSS Columns masonry layout (5 cols desktop, 3 tablet, 2 mobile)
- Business Apps Carousel with custom navigation
- Bento item hover: translateY(-8px) + scale(1.02)
- Neon glow border on hover
- Video thumbnail autoplay
- Play button with backdrop blur

**Hover Animation**:
```css
.bento-item {
  transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.bento-item:hover {
  transform: translateY(-8px) scale(1.02);
}

.bento-item:hover .bento-item-inner {
  border-color: #CCFF00;
  box-shadow: 0 10px 40px rgba(204, 255, 0, 0.3);
}

.bento-item:hover .bento-media {
  transform: scale(1.05);
}
```

**View Work Button**:
```css
.view-work-button {
  transition: all 0.3s ease;
  box-shadow: 0 4px 20px rgba(204, 255, 0, 0.3);
}

.view-work-button:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 30px rgba(204, 255, 0, 0.5);
}
```

---

### Component Animations (`/components/`)

#### 1. StaggeredMenu (`/components/StaggeredMenu/`)
**File**: `StaggeredMenu.tsx`, `StaggeredMenu.css`

Full-screen navigation menu with staggered animations.

**Features**:
- **Pre-layer Animation**: 3 background layers stagger in (0.08s delay each)
- **Panel Slide**: Menu panel slides from right/left
- **Menu Items Stagger**: Items animate up with 0.08s stagger
- **Hamburger Icon**: Morphs to X with rotation
- **Frosted Glass**: Backdrop blur effect on header and panel
- **Text Reveal**: "Menu" text slides up to reveal "Close"

**GSAP Animations**:
```typescript
// Open - Prelayers
gsap.fromTo(prelayersRef.current,
  { x: '100%' },
  { x: 0, duration: 0.6, ease: 'power3.inOut', stagger: 0.08 }
);

// Open - Panel
gsap.fromTo(panelRef.current,
  { x: '100%' },
  { x: 0, duration: 0.7, ease: 'power3.inOut' }
);

// Open - Menu Items
gsap.fromTo(itemsRef.current,
  { y: 60, opacity: 0 },
  { y: 0, opacity: 1, duration: 0.6, ease: 'power2.out', stagger: 0.08, delay: 0.2 }
);

// Open - Icon to X
gsap.to(iconRef.current.children[0], { rotation: 45, y: 0, duration: 0.3 });
gsap.to(iconRef.current.children[1], { rotation: -45, y: 0, duration: 0.3 });
```

**CSS Transitions**:
```css
.sm-toggle-textInner {
  transition: transform 0.3s ease;
}

.staggered-menu-wrapper[data-open] .sm-toggle-textInner {
  transform: translateY(-1em);
}

.sm-panel-item {
  transition: color 0.3s ease;
}

.sm-panel-close:hover {
  transform: rotate(90deg);
}
```

---

#### 2. ComingSoonModal (`/components/ComingSoonModal/`)
**File**: `ComingSoonModal.tsx`, `ComingSoonModal.css`

Modal dialog for unfinished pages.

**Features**:
- Backdrop blur fade-in
- Modal slide-up animation
- Close button rotation on hover

**CSS Animations**:
```css
@keyframes modalFadeIn {
  from { opacity: 0; transform: scale(0.9) translateY(20px); }
  to { opacity: 1; transform: scale(1) translateY(0); }
}

@keyframes backdropFadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}
```

---

### Global Animation Utilities

#### Animation Library Versions
```json
{
  "gsap": "^3.13.0",
  "@gsap/react": "^2.1.2",
  "motion": "^12.23.24",
  "three": "^0.180.0",
  "ogl": "^1.0.11"
}
```

#### Easing Functions Reference
| Name | Use Case |
|------|----------|
| `power2.out` | Menu items entrance |
| `power3.out` | Cards, panels |
| `power3.inOut` | Panel slides, prelayers |
| `none` (linear) | Scroll-linked scrub animations |
| `cubic-bezier(0.34, 1.56, 0.64, 1)` | Bento hover (elastic) |

#### Performance Optimizations
1. **will-change**: Applied to animated elements
2. **transform/opacity**: Used for GPU-accelerated animations
3. **Intersection Observer**: Lazy initialization for heavy effects (LiquidEther)
4. **Reduced Motion**: Respect `prefers-reduced-motion` (implement where needed)
5. **Mobile Optimizations**:
   - LiquidEther disabled on mobile
   - Reduced particle counts
   - Simpler hover states

#### ScrollTrigger Best Practices
```typescript
// Always clean up ScrollTrigger instances
useEffect(() => {
  // Create animations...
  
  return () => {
    ScrollTrigger.getAll().forEach(trigger => trigger.kill());
  };
}, []);
```

---

### Animation Checklist for New Components

When adding new animations:
1. ✅ Use `transform` and `opacity` for GPU acceleration
2. ✅ Add `will-change` for complex animations
3. ✅ Clean up GSAP ScrollTrigger instances on unmount
4. ✅ Implement reduced motion support where applicable
5. ✅ Test on mobile devices
6. ✅ Use Intersection Observer for lazy initialization of heavy effects
7. ✅ Keep animation duration between 200ms-800ms for UI feedback
8. ✅ Use consistent easing functions (reference table above)

---

## Version History

> Versions are auto-bumped by CI on every merge to `production` (commits tagged
> `chore: auto-increment version to <x> [skip ci]`). Only meaningful releases are
> summarized below — see `git log` for the full history.

### Unreleased (working tree, post-v1.77.0)
- **NEW: `/proxe-cfs`** — PROXe Security & Platform page (`app/proxe-cfs/`). Cards-grid layout covering Infrastructure, Data Protection, Compliance, Access & Auth, AI & Privacy, Integrations, Reliability. Electric-purple accent (`#6B2FE8`).
- **NEW: `ProxeWidget` component** (`components/ProxeWidget/`) — replaces the inline `<Script>` for the PROXe chat widget so it can be conditionally hidden by route. Hidden on `/proxe` and `/proxe-cfs`.
- **Tailwind 4 wiring** — `postcss.config.js` + `tailwind.config.ts` added at the repo root. Tailwind co-exists with the existing per-component CSS modules.

### v1.77.0 (current production)
- **PROXe landing polish** + portfolio asset aliases (`36557ed`).
- **ESLint config repair** + chat widget hidden on `/proxe` (`1ba79c4`).

### v1.76.0 — v1.74.0 (PROXe rebuild + thank-you flow)
- **Rebuilt `/proxe` landing page** from scratch (`167dd45`).
- **Hero copy iteration**: settled on "Solve Marketing With AI" with serif `AI` accent (`db810e1`).
- **Thank-you page**: passes form data to WhatsApp and PROXe (`3c623c7`).
- **WorkHeroVideo**: added mute/unmute toggle; fixed video play delay on `WorkCard` (`5352c32`).

### v1.73.0 — v1.71.0 (Smooth scroll + perf passes)
- **Lenis smooth scroll** mounted globally via `lib/lenis.tsx` (`07f0be4`, `cd95892`).
- **Bare-bones perf pass**: stripped expensive transitions, removed backdrop-filter from header to fix scroll lag (`69a566a`, `6fda399`).
- **Replaced `transition: all`** with specific properties site-wide (`893ed19`).

### v1.69.0 — v1.65.0 (Stability + animation tuning)
- **StaggeredMenu fixes**: prevented panel from bleeding into viewport (`c843f87`); fixed menu opening on page load / getting stuck (`fddc6b6`).
- **Animation/blur perf optimizations** (`c5a6f36`).

### v1.64.0 — v1.60.0 (Mobile hero overhaul)
- **PROXe chat widget enabled** site-wide via `<Script>` in root layout (`5eb1dd2`).
- **Mobile hero**: 3–4× larger headline, 2–3× bigger ShowReel button, scaled pillars, left-aligned content with bottom-right ShowReel placement (`ea9bdfe`, `9d84fb4`).
- **LiquidEther**: disabled on mobile (solid black background) for performance (`4ae45cb`).

### v1.59.0 — v1.55.0 (Hero typography + layout)
- **Two-column mobile hero** layout — text left, ShowReel right (`77724d1`).
- **Restored LiquidEther** background and boosted visual impact (`05d8309`).
- **Mobile UI/UX polish pass** across hero and full page (`026fc4c`).
- **Mixed serif display font** (Fraunces) in hero for editorial typographic contrast (`2ec1001`, `7853354`).

### v1.54.0 — v1.50.0 (Campaigns + AI Voice + Quote builder)
- **AI-First Marketing hero** copy + `/campaigns` page added (`9589164`).
- **AI Voice Call button** with PROXe integration on thank-you page (`13295e3`).
- **Pre-filled WhatsApp message** with form data on `/thank-you` (`7d9e410`).
- **PROXe form submission integration** end-to-end (`112249c`).

### v1.46.0 — v1.43.0 (Build metadata + status page)
- **`scripts/set-build-time.js`** — captures git SHA + build time into `app/build-info.json` (`c42b0f8`, `74090b5`).
- **PROXe form integration** + status-page git/build info exposed.

### Earlier (v1.11.x → v1.42.x)
- **v1.11.3**: Version display reads from git tags; release date on status page.
- **v1.11.2**: Visitor counter centered; accent-green count number.
- **v1.11.1**: Fixed React hydration mismatch in `LiquidBentoPortfolio`.
- **v1.11.0**: Initial environment-setup + Supabase troubleshooting docs; `ShowReel` updates.

### Version Information
- **Current Package Version**: 1.77.0 (in `package.json`)
- **Latest Git Tag**: v1.77.0
- **Branch**: `production` is the deployable branch; `main` is the integration branch.
- **Version Display**: Status page shows version from git tags + release date.
- See `package.json` for dependency versions and `git log` for detailed code changes.

---

**Last Updated**: April 2026 (v1.77.0 + post-1.77.0 working tree)
**Maintained By**: BCON Club Development Team
