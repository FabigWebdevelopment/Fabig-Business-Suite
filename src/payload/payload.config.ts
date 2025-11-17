import path from 'path'
import { fileURLToPath } from 'url'

import { postgresAdapter } from '@payloadcms/db-postgres'
// import { multiTenantPlugin } from '@payloadcms/plugin-multi-tenant'
// import { seoPlugin } from '@payloadcms/plugin-seo'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { buildConfig } from 'payload'
import sharp from 'sharp'

import { Media } from './collections/Media'
import { Tenants } from './collections/Tenants'
import { Users } from './collections/Users'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  // Secret key for JWT signing (required)
  secret: process.env.PAYLOAD_SECRET || '',

  // Admin panel configuration
  admin: {
    user: Users.slug,
    meta: {
      titleSuffix: '- Fabig Business Suite',
    },
    components: {},
  },

  // Collections
  collections: [
    Tenants,
    Users,
    Media,
    // Additional collections will be added here:
    // Leads, Pages, Posts, Services, Bookings, etc.
  ],

  // Global settings
  globals: [
    // Global settings will be added here
  ],

  // Editor
  editor: lexicalEditor({}),

  // Database
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI || '',
      ssl:
        process.env.NODE_ENV === 'production'
          ? {
              rejectUnauthorized: false, // Required for Neon
            }
          : false,
    },
    // Push mode (Payload best practice):
    // - Development: Enabled (auto-syncs schema changes via Drizzle)
    // - Production: Disabled (uses migrations instead)
    //
    // Workflow:
    // 1. Work locally with push: true (schema auto-updates)
    // 2. When ready: `pnpm migrate:create` (generates migration)
    // 3. Commit migration to git
    // 4. Deploy: `payload migrate && next build` runs in CI
    //
    // WARNING: Don't run migrations against local dev database when using push!
    push: process.env.NODE_ENV === 'development',
  }),

  // Sharp for image processing
  sharp,

  // Plugins
  plugins: [
    // Multi-tenant plugin - Temporarily disabled to resolve field conflict
    // Will properly configure in Week 2 when implementing full multi-tenancy
    // multiTenantPlugin({
    //   tenantsSlug: 'tenants',
    //   collections: {
    //     media: {
    //       useTenantAccess: true,
    //       useBaseFilter: true,
    //     },
    //   },
    // }),

    // SEO plugin - Temporarily disabled until Pages collection is created (Week 2-3)
    // seoPlugin({
    //   collections: ['pages', 'posts'],
    //   uploadsCollection: 'media',
    //   generateTitle: ({ doc }) => `${doc?.title} | Fabig Business Suite`,
    //   generateDescription: ({ doc }) => doc?.excerpt || doc?.description,
    // }),
  ],

  // TypeScript
  typescript: {
    outputFile: path.resolve(dirname, '../lib/types/payload-types.ts'),
  },

  // CORS
  cors: [
    process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000',
    // Add custom domains here
  ].filter(Boolean),

  // CSRF
  csrf: [
    process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000',
    // Add custom domains here
  ].filter(Boolean),

  // Server URL
  serverURL: process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000',

  // GraphQL
  graphQL: {
    schemaOutputFile: path.resolve(dirname, '../lib/types/generated-schema.graphql'),
  },

  // Upload configuration
  upload: {
    limits: {
      fileSize: 10000000, // 10MB
    },
  },
})
