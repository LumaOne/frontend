# Supabase Setup Guide for LumaOne

This guide will help you set up Supabase for the LumaOne SaaS application.

## Prerequisites

- A Supabase account (sign up at [supabase.com](https://supabase.com))
- Node.js and bun installed
- Access to your LumaOne project

## Step 1: Create a New Supabase Project

1. Go to [supabase.com](https://supabase.com) and sign in
2. Click "New Project"
3. Choose your organization
4. Fill in project details:
   - **Name**: `lumaone-saas`
   - **Database Password**: Choose a strong password
   - **Region**: Choose closest to your users
5. Click "Create new project"
6. Wait for the project to be created (takes ~2 minutes)

## Step 2: Get Your Project Credentials

1. Go to **Settings** → **API** in your Supabase dashboard
2. Copy the following values:
   - **Project URL** (starts with `https://`)
   - **anon public** key
   - **service_role** key (keep this secret!)

## Step 3: Configure Environment Variables

1. In your LumaOne frontend directory, update `.env.local`:

```bash
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_project_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here
```

2. Replace the placeholder values with your actual Supabase credentials

## Step 4: Set Up the Database Schema

1. Go to **SQL Editor** in your Supabase dashboard
2. Copy the contents of `database/schema.sql` from this project
3. Paste it into the SQL editor
4. Click "Run" to execute the schema

This will create:
- Custom types (threat_level, threat_status, api_key_status)
- Tables (profiles, api_keys, email_logs, threat_patterns, system_metrics, notifications, audit_logs)
- Indexes for performance
- Row Level Security (RLS) policies
- Triggers for automatic profile creation

## Step 5: Configure Authentication

1. Go to **Authentication** → **Settings** in Supabase dashboard
2. Configure the following settings:

### Site URL
```
http://localhost:3001
```
(Update this to your production domain when deploying)

### Redirect URLs
```
http://localhost:3001/dashboard
https://your-domain.com/dashboard
```

### Email Templates (Optional)
You can customize the email templates for:
- Confirm signup
- Magic link
- Change email address
- Reset password

### Providers (Optional)
Enable additional auth providers if needed:
- Google OAuth
- GitHub OAuth
- Discord OAuth
- etc.

## Step 6: Test the Integration

1. Start your development server:
```bash
bun run dev
```

2. Navigate to `http://localhost:3001`
3. Click "Sign In" and try creating an account
4. Check if you can access the dashboard after signing in
5. Verify that the profile is created in the `profiles` table

## Step 7: Seed Sample Data (Optional)

If you want to test with sample data, uncomment and run the sample data section at the bottom of `schema.sql`:

```sql
-- Uncomment these lines in schema.sql
INSERT INTO profiles (id, email, full_name, company, plan) VALUES
    ('00000000-0000-0000-0000-000000000001', 'demo@lumaone.ai', 'Demo User', 'LumaOne Demo', 'professional');

INSERT INTO api_keys (user_id, name, key_hash, key_prefix) VALUES
    ('00000000-0000-0000-0000-000000000001', 'Production API', 'hashed_key_here', 'luma_123');

INSERT INTO system_metrics (user_id, metric_date, emails_processed, threats_detected, threats_blocked) VALUES
    ('00000000-0000-0000-0000-000000000001', CURRENT_DATE, 1250, 47, 45),
    ('00000000-0000-0000-0000-000000000001', CURRENT_DATE - 1, 1180, 52, 50);
```

## Database Structure Overview

### Core Tables

1. **profiles** - User profile information extending Supabase auth
2. **api_keys** - API key management for users
3. **email_logs** - Email processing logs and threat detection results
4. **threat_patterns** - Custom threat detection patterns
5. **system_metrics** - Daily analytics and metrics
6. **notifications** - In-app notifications
7. **audit_logs** - Security and audit trail

### Key Features

- **Row Level Security (RLS)**: Users can only access their own data
- **Real-time subscriptions**: Live updates for email logs and notifications
- **Automatic profile creation**: Profiles are created automatically on user signup
- **Comprehensive indexing**: Optimized for fast queries
- **JSONB support**: Flexible data storage for threat indicators and patterns

## Security Considerations

1. **Never expose service_role key** in client-side code
2. **RLS policies** ensure data isolation between users
3. **API keys are hashed** before storage (upgrade to proper hashing in production)
4. **Audit logging** tracks all important actions
5. **Input validation** should be implemented in your application layer

## Production Deployment

Before deploying to production:

1. Update environment variables with production Supabase URL
2. Configure proper redirect URLs in Supabase auth settings
3. Set up custom domain if needed
4. Enable database backups
5. Monitor usage and set up billing alerts
6. Implement proper API key hashing (replace btoa with bcrypt or similar)
7. Set up monitoring and alerting

## Troubleshooting

### Common Issues

1. **"Invalid JWT" errors**: Check that your environment variables are correct
2. **RLS policy errors**: Ensure user is authenticated before accessing data
3. **CORS errors**: Verify your site URL is configured in Supabase auth settings
4. **Connection issues**: Check your Supabase project status and credentials

### Useful Supabase CLI Commands

```bash
# Install Supabase CLI
npm install -g supabase

# Login to Supabase
supabase login

# Link to your project
supabase link --project-ref your-project-ref

# Generate types (optional)
supabase gen types typescript --project-id your-project-ref > types/supabase.ts
```

## Next Steps

After setting up Supabase:

1. Test all authentication flows
2. Verify database operations work correctly
3. Set up real-time subscriptions for live updates
4. Implement proper error handling
5. Add data validation and sanitization
6. Set up monitoring and analytics
7. Plan for scaling and performance optimization

## Support

- [Supabase Documentation](https://supabase.com/docs)
- [Supabase Discord Community](https://discord.supabase.com)
- [GitHub Issues](https://github.com/supabase/supabase/issues)

---

**Note**: This setup creates a fully functional authentication and database system for your LumaOne SaaS application. Make sure to test thoroughly before deploying to production. 