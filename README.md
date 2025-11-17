# Fabig Business Suite

Enterprise multi-tenant SaaS platform for German local businesses. Built with Next.js 15, Payload CMS 3.0, and PostgreSQL.

## Quick Start

### Prerequisites

- **Node.js** 18.17.0 or higher
- **pnpm** 8.0.0 or higher
- **Docker** (for local PostgreSQL)
- **Git**

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/FabigWebdevelopment/Fabig-Business-Suite.git
   cd Fabig-Business-Suite
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Set up environment variables**
   ```bash
   # Copy the example file
   cp .env.local.example .env.local

   # Generate a secret key
   openssl rand -base64 32

   # Edit .env.local and add the generated secret to PAYLOAD_SECRET
   ```

4. **Start PostgreSQL with Docker**
   ```bash
   # Start PostgreSQL
   docker-compose up -d postgres

   # Check if it's running
   docker ps
   ```

5. **Run database migrations**
   ```bash
   pnpm db:push
   ```

6. **Start the development server**
   ```bash
   pnpm dev
   ```

7. **Access the application**
   - Frontend: http://localhost:3000
   - Admin Panel: http://localhost:3000/admin
   - Database UI (optional): http://localhost:5050 (pgAdmin)

### First Login

On first run, Payload will prompt you to create a super admin account. Use this account to:
1. Create your first tenant
2. Set up additional users
3. Configure settings

## Project Structure

```
fabig-suite/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── (app)/             # Public-facing app routes
│   │   ├── (payload)/         # Payload admin routes
│   │   └── api/               # API routes
│   ├── payload/               # Payload CMS configuration
│   │   ├── collections/       # Database collections
│   │   ├── blocks/            # Reusable content blocks
│   │   ├── fields/            # Custom field types
│   │   ├── access/            # Access control functions
│   │   └── payload.config.ts  # Main Payload config
│   ├── lib/                   # Shared utilities
│   │   ├── services/          # Business logic layer
│   │   ├── utils/             # Helper functions
│   │   └── types/             # TypeScript types
│   ├── components/            # React components
│   │   └── ui/                # shadcn/ui components
│   └── middleware.ts          # Next.js middleware
├── public/                    # Static files
├── .env.local                 # Local environment variables
├── docker-compose.yml         # Docker services
├── package.json               # Dependencies
└── README.md                  # This file
```

## Available Scripts

### Development

- `pnpm dev` - Start development server (http://localhost:3000)
- `pnpm type-check` - Run TypeScript type checking
- `pnpm lint` - Run ESLint
- `pnpm format` - Format code with Prettier
- `pnpm format:check` - Check code formatting

### Database

- `pnpm db:push` - Push schema changes to database
- `pnpm db:studio` - Open Drizzle Studio (database UI)
- `pnpm generate:types` - Generate TypeScript types from Payload schema

### Production

- `pnpm build` - Build for production
- `pnpm start` - Start production server

### Docker

```bash
# Start all services
docker-compose up -d

# Start with pgAdmin (database UI)
docker-compose --profile dev-tools up -d

# Stop all services
docker-compose down

# View logs
docker-compose logs -f postgres

# Restart database
docker-compose restart postgres

# Remove all data (DANGER!)
docker-compose down -v
```

## Environment Variables

See `.env.example` for all available environment variables.

### Required for Local Development

```bash
DATABASE_URI=postgresql://postgres:postgres@localhost:5432/fabig_suite_dev
PAYLOAD_SECRET=your-super-secret-key-minimum-32-characters-long
NEXT_PUBLIC_SERVER_URL=http://localhost:3000
```

### Optional for Full Features

- **OpenAI** - WhatsApp AI conversations
- **WhatsApp Business API** - WhatsApp messaging
- **Resend** - Email notifications
- **Twilio** - SMS notifications
- **Stripe** - Payment processing
- **Sentry** - Error tracking

## Tech Stack

### Core

- **Next.js 15+** - React framework with App Router
- **Payload CMS 3.0+** - Headless CMS with admin UI
- **PostgreSQL** - Primary database
- **Drizzle ORM** - Type-safe database queries
- **TypeScript** - Type safety

### UI

- **shadcn/ui** - Component library
- **Tailwind CSS** - Utility-first CSS
- **Radix UI** - Accessible primitives
- **Lucide Icons** - Icon library

### Features

- **OpenAI GPT-4o-mini** - AI conversations
- **Meta WhatsApp Business API** - Messaging
- **Resend** - Email delivery
- **Twilio** - SMS delivery
- **Stripe** - Payment processing

### Infrastructure

- **Vercel** - Hosting platform
- **Neon** - Serverless PostgreSQL
- **Sentry** - Error tracking
- **GitHub Actions** - CI/CD

## Development Workflow

### Creating a New Feature

1. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes**
   - Add collections in `src/payload/collections/`
   - Add business logic in `src/lib/services/`
   - Add UI components in `src/components/`
   - Add routes in `src/app/`

3. **Test your changes**
   ```bash
   pnpm type-check
   pnpm lint
   pnpm build
   ```

4. **Commit and push**
   ```bash
   git add .
   git commit -m "Add feature: your feature description"
   git push origin feature/your-feature-name
   ```

5. **Create a Pull Request**
   - Go to GitHub
   - Create PR from your branch to `develop`
   - Wait for CI checks to pass
   - Request review

### Database Changes

When modifying Payload collections:

1. Edit the collection file in `src/payload/collections/`
2. Run `pnpm db:push` to sync schema
3. Run `pnpm generate:types` to update TypeScript types
4. Commit both the collection file and generated types

### Adding a New Collection

1. Create the collection file:
   ```typescript
   // src/payload/collections/YourCollection.ts
   import type { CollectionConfig } from 'payload'

   export const YourCollection: CollectionConfig = {
     slug: 'your-collection',
     // ... configuration
   }
   ```

2. Add to `payload.config.ts`:
   ```typescript
   import { YourCollection } from './collections/YourCollection'

   collections: [
     // ... existing collections
     YourCollection,
   ]
   ```

3. Push schema changes:
   ```bash
   pnpm db:push
   pnpm generate:types
   ```

## Deployment

### Staging

Automatically deploys when you push to `develop` branch.

- **URL**: https://staging.fabig-suite.de
- **Database**: Neon preview branch
- **Purpose**: Testing and QA

### Production

Automatically deploys when you push to `main` branch.

- **URL**: https://fabig-suite.de
- **Database**: Neon production branch
- **Purpose**: Live customer traffic

See [DEV_TO_PROD_WORKFLOW.md](./DEV_TO_PROD_WORKFLOW.md) for detailed deployment documentation.

## Documentation

### Setup & Configuration
- **[Setup Checklist](./SETUP_CHECKLIST.md)** - Complete step-by-step setup guide ⭐ START HERE
- **[Environment Variables Guide](./ENVIRONMENT_SETUP.md)** - Comprehensive env setup (all services)
- **[Quick Reference](./ENV_QUICK_REFERENCE.md)** - Copy-paste environment templates
- **[Development Workflow](./DEV_TO_PROD_WORKFLOW.md)** - Git workflow and deployment

### Architecture & Planning
- **[Main Development Guide](./claude.md)** - Complete project documentation
- **[Automated Provisioning](./AUTOMATED_PROVISIONING.md)** - Auto-setup architecture
- **[WhatsApp AI Architecture](./WHATSAPP_AI_ARCHITECTURE.md)** - AI implementation guide
- **[GoHighLevel Research](./GOHIGHLEVEL_RESEARCH.md)** - Competitor analysis

## Quick Start (First Time Setup)

1. **Follow the setup checklist**: [SETUP_CHECKLIST.md](./SETUP_CHECKLIST.md)
2. **Configure environment variables**: [ENV_QUICK_REFERENCE.md](./ENV_QUICK_REFERENCE.md)
3. **Run local development**:
   ```bash
   pnpm install
   pnpm db:push
   pnpm dev
   ```

## Support

- **Issues**: https://github.com/FabigWebdevelopment/Fabig-Business-Suite/issues
- **Email**: thomas@fabig-webdevelopment.de

## License

Proprietary - Fabig Webdevelopment © 2025
