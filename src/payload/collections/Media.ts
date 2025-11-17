import type { CollectionConfig } from 'payload'

export const Media: CollectionConfig = {
  slug: 'media',
  admin: {
    useAsTitle: 'alt',
    defaultColumns: ['alt', 'tenant', 'updatedAt'],
    group: 'Inhalte',
  },
  access: {
    // Users can only access media from their tenant
    create: ({ req: { user } }) => {
      if (user?.role === 'super-admin') return true
      return !!user
    },
    read: ({ req: { user } }) => {
      if (user?.role === 'super-admin') return true
      return {
        tenant: {
          equals: user?.tenant,
        },
      }
    },
    update: ({ req: { user } }) => {
      if (user?.role === 'super-admin') return true
      return {
        tenant: {
          equals: user?.tenant,
        },
      }
    },
    delete: ({ req: { user } }) => {
      if (user?.role === 'super-admin') return true
      return {
        tenant: {
          equals: user?.tenant,
        },
      }
    },
  },
  upload: {
    staticDir: 'media',
    imageSizes: [
      {
        name: 'thumbnail',
        width: 400,
        height: 300,
        position: 'centre',
      },
      {
        name: 'card',
        width: 768,
        height: 1024,
        position: 'centre',
      },
      {
        name: 'tablet',
        width: 1024,
        height: undefined,
        position: 'centre',
      },
      {
        name: 'desktop',
        width: 1920,
        height: undefined,
        position: 'centre',
      },
    ],
    adminThumbnail: 'thumbnail',
    mimeTypes: ['image/*', 'application/pdf'],
  },
  fields: [
    // =========================================================================
    // TENANT RELATIONSHIP (added by multi-tenant plugin)
    // =========================================================================
    {
      name: 'tenant',
      type: 'relationship',
      relationTo: 'tenants',
      required: true,
      hasMany: false,
      admin: {
        condition: ({ req: { user } }) => user?.role === 'super-admin',
      },
    },

    // =========================================================================
    // IMAGE METADATA
    // =========================================================================
    {
      name: 'alt',
      type: 'text',
      required: true,
      label: 'Alt Text',
      admin: {
        description: 'Beschreibe das Bild für Screenreader und SEO',
      },
    },
    {
      name: 'caption',
      type: 'textarea',
      label: 'Bildunterschrift',
    },

    // =========================================================================
    // ORGANIZATION
    // =========================================================================
    {
      name: 'folder',
      type: 'select',
      label: 'Ordner',
      options: [
        { label: 'Logos', value: 'logos' },
        { label: 'Team', value: 'team' },
        { label: 'Projekte', value: 'projects' },
        { label: 'Produkte', value: 'products' },
        { label: 'Blog', value: 'blog' },
        { label: 'Sonstiges', value: 'misc' },
      ],
      admin: {
        description: 'Organisiere Bilder in Ordnern',
      },
    },
  ],
  timestamps: true,
}
