# 🎨 LumaOne Frontend

**Next.js 14 + Mantine UI** - Modern React frontend for the LumaOne email intelligence platform

## Features

- 🎨 **Modern UI**: Clean, responsive design with Mantine components
- 🔐 **Authentication**: Supabase Auth integration
- 📧 **Email Management**: Intuitive email classification and management
- 📊 **Analytics Dashboard**: Email insights and statistics
- ⚙️ **Automation Rules**: Visual rule builder for email automation
- 🌓 **Dark/Light Mode**: System preference support
- 📱 **Responsive**: Mobile-first design approach
- ♿ **Accessible**: WCAG 2.1 AA compliant components

## Quick Start

### Prerequisites

- Node.js 18+
- Bun (preferred) or npm/yarn
- Supabase project configured

### Installation

```bash
# Install dependencies (using bun - preferred)
bun install

# Or with npm
npm install
```

### Configuration

1. Copy environment variables:
```bash
cp .env.example .env.local
```

2. Edit `.env.local` with your configuration:
```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# App API Configuration  
NEXT_PUBLIC_APP_API_URL=http://localhost:3001

# Optional: Enable development features
NODE_ENV=development
```

### Running the Development Server

```bash
# Development server (preferred with bun)
bun dev

# Or with npm
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## Tech Stack

### Core Technologies
- **[Next.js 14](https://nextjs.org/)** - React framework with App Router
- **[React 18](https://react.dev/)** - Component library with hooks
- **[Mantine 7](https://mantine.dev/)** - Modern React components library
- **[Supabase](https://supabase.com/)** - Authentication and real-time features

### Additional Libraries
- **[@tabler/icons-react](https://tabler-icons.io/)** - Beautiful SVG icons
- **[React Hook Form](https://react-hook-form.com/)** - Form validation
- **[Recharts](https://recharts.org/)** - Data visualization
- **[Date-fns](https://date-fns.org/)** - Date manipulation utilities

## Project Structure

```
frontend/
├── app/                    # Next.js App Router
│   ├── globals.css         # Global styles
│   ├── layout.js           # Root layout component
│   ├── page.js             # Home page
│   ├── auth/               # Authentication pages
│   ├── dashboard/          # Main dashboard
│   ├── emails/             # Email management
│   └── settings/           # User settings
├── components/             # Reusable React components
│   ├── ui/                 # Basic UI components
│   ├── email/              # Email-specific components
│   ├── auth/               # Authentication components
│   └── layout/             # Layout components
├── hooks/                  # Custom React hooks
├── lib/                    # Utility functions
│   ├── supabase.js         # Supabase client
│   ├── api.js              # App API client
│   └── utils.js            # General utilities
├── styles/                 # CSS/SCSS files
└── public/                 # Static assets
```

## Key Features

### 🔐 **Authentication**
- Supabase Auth integration
- Email/password and OAuth providers
- Protected routes with middleware
- Automatic token refresh

### 📧 **Email Management**
- **Email List View**: Paginated email display with filters
- **Email Detail**: Full email content with AI analysis
- **Bulk Actions**: Mass operations on selected emails
- **Smart Categorization**: Visual category badges

### 📊 **Analytics Dashboard**
- **Email Statistics**: Counts, categories, trends
- **Sender Analysis**: Top senders and engagement
- **Spam Detection**: Threat analysis and patterns
- **Time-based Insights**: Daily/weekly/monthly views

### ⚙️ **Automation**
- **Rule Builder**: Visual interface for creating rules
- **Block/Allow Lists**: Domain and sender management
- **Auto-Actions**: Unsubscribe, archive, categorize
- **Rule Templates**: Pre-built common rules

## UI Components

### Layout Components
- **AppShell**: Main application wrapper
- **Navbar**: Primary navigation
- **Header**: Top bar with user menu
- **Sidebar**: Collapsible side navigation

### Email Components
- **EmailCard**: Email preview card
- **EmailViewer**: Full email display
- **CategoryBadge**: Visual category indicators
- **SpamScore**: Threat level indicator

### Form Components
- **LoginForm**: User authentication
- **RuleBuilder**: Automation rule creation
- **EmailFilters**: Search and filter controls
- **BulkActions**: Mass operation toolbar

## Styling

### Mantine Theme
```javascript
// Custom theme configuration
const theme = {
  primaryColor: 'blue',
  fontFamily: 'Inter, sans-serif',
  headings: { fontFamily: 'Inter, sans-serif' },
  colorScheme: 'auto', // System preference
  components: {
    Button: { defaultProps: { variant: 'filled' } },
    Card: { defaultProps: { shadow: 'sm', radius: 'md' } }
  }
}
```

### CSS Organization
- **globals.css**: Global styles and CSS variables
- **components/**: Component-specific styles
- **Mantine CSS**: Utility classes and theme overrides

## API Integration

### App API Client
```javascript
// lib/api.js - Centralized API calls
export const emailAPI = {
  getEmails: (page, filters) => api.get('/emails', { params: { page, ...filters } }),
  processEmail: (emailId) => api.post('/process-email', { email_id: emailId }),
  createRule: (rule) => api.post('/automation-rules', rule)
}
```

### Supabase Integration
```javascript
// Real-time email updates
useEffect(() => {
  const subscription = supabase
    .channel('emails')
    .on('postgres_changes', 
        { event: 'INSERT', schema: 'public', table: 'emails' },
        (payload) => {
          // Update local state
        }
    )
    .subscribe()

  return () => subscription.unsubscribe()
}, [])
```

## Development

### Available Scripts

```bash
# Development server
bun dev

# Production build
bun build

# Start production server
bun start

# Lint code
bun lint

# Type checking (if using TypeScript)
bun type-check
```

### Code Quality

- **ESLint**: Code linting with Next.js rules
- **Prettier**: Code formatting (configured in VSCode)
- **Import Organization**: Automatic import sorting

### Development Workflow

1. **Feature Development**: Create feature branches
2. **Component Testing**: Test components in isolation
3. **Integration Testing**: Test with backend APIs
4. **Performance Testing**: Check bundle size and rendering
5. **Accessibility Testing**: Verify WCAG compliance

## Deployment

### Vercel (Recommended)

```bash
# Deploy to Vercel
vercel --prod

# Or connect GitHub repository for automatic deployments
```

### Environment Configuration

```env
# Production environment variables
NEXT_PUBLIC_SUPABASE_URL=your_production_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_production_anon_key
NEXT_PUBLIC_APP_API_URL=https://your-app-api.com
```

### Build Optimization

- **Image Optimization**: Next.js automatic image optimization
- **Bundle Analysis**: Use `@next/bundle-analyzer`
- **Performance Monitoring**: Vercel Web Analytics
- **Error Tracking**: Sentry integration (optional)

## Deployment to Cloudflare Pages

### Option 1: Cloudflare Pages Dashboard (Recommended)

1. Connect your GitHub repository to Cloudflare Pages
2. Set the build command to: `bun run build`
3. Set the build output directory to: `out`
4. Deploy

### Option 2: Using Wrangler CLI

1. Install Wrangler globally:
```bash
npm install -g wrangler
```

2. Build the project:
```bash
bun run build
```

3. Deploy to Cloudflare Pages:
```bash
wrangler pages deploy out
```

### Build Commands

- `bun run build` - Build for production (creates static export in `out/` directory)
- `bun run dev` - Start development server
- `bun run start` - Start production server (for testing locally)
- `bun run lint` - Run ESLint

## Configuration

The project is configured with:
- Next.js 15 with static export (`output: 'export'`)
- Mantine UI components for dashboard
- React Icons for landing page
- Optimized for Cloudflare Pages static hosting

## Project Structure

- `/app/page.js` - Landing page
- `/app/dashboard/` - Dashboard pages
- `/app/globals.css` - Global styles
- `wrangler.toml` - Cloudflare Pages configuration
- `out/` - Static build output (created after `bun run build`)

## Notes

- The application uses static export, so server-side features like API routes are not available
- All pages are pre-rendered at build time for optimal performance
- Images are unoptimized for compatibility with static hosting

## Contributing

### Component Guidelines

1. **Mantine First**: Use Mantine components when possible
2. **Accessibility**: Include proper ARIA labels
3. **Responsive**: Mobile-first design approach
4. **Performance**: Lazy load heavy components
5. **Testing**: Include component tests

### File Naming

- **Components**: PascalCase (`EmailCard.jsx`)
- **Hooks**: camelCase with 'use' prefix (`useEmailFilters.js`)
- **Utilities**: camelCase (`emailUtils.js`)
- **Pages**: lowercase (`dashboard/page.js`)

## Troubleshooting

### Common Issues

**Build Errors:**
```bash
# Clear Next.js cache
rm -rf .next
bun dev
```

**Supabase Connection:**
```bash
# Verify environment variables
echo $NEXT_PUBLIC_SUPABASE_URL
```

**Mantine Styling:**
```bash
# Ensure proper CSS imports in layout.js
import '@mantine/core/styles.css'
```

## Support

- 📖 **Next.js Docs**: [nextjs.org/docs](https://nextjs.org/docs)
- 🎨 **Mantine Docs**: [mantine.dev](https://mantine.dev)
- 🔐 **Supabase Docs**: [supabase.com/docs](https://supabase.com/docs)
- 🐛 **Issues**: Create GitHub issues for bugs

---

**Built with ❤️ using Next.js and Mantine**
