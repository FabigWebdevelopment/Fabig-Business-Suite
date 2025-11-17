import type { CollectionConfig } from 'payload'

export const Users: CollectionConfig = {
  slug: 'users',
  auth: {
    // Email verification
    verify: {
      generateEmailHTML: ({ token, user }) => {
        const url = `${process.env.NEXT_PUBLIC_SERVER_URL}/verify-email?token=${token}`
        return `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2>Hallo ${user.firstName || 'dort'},</h2>
            <p>Willkommen bei Fabig Business Suite!</p>
            <p>Bitte bestätige deine E-Mail-Adresse:</p>
            <a href="${url}" style="display: inline-block; padding: 12px 24px; background: #2563eb; color: white; text-decoration: none; border-radius: 6px;">
              E-Mail bestätigen
            </a>
            <p style="color: #666; font-size: 14px; margin-top: 20px;">
              Falls Du diesen Account nicht erstellt hast, ignoriere diese E-Mail bitte.
            </p>
          </div>
        `
      },
      generateEmailSubject: () => 'Bestätige deine E-Mail-Adresse',
    },
    // Forgot password
    forgotPassword: {
      generateEmailHTML: ({ token, user }) => {
        const url = `${process.env.NEXT_PUBLIC_SERVER_URL}/reset-password?token=${token}`
        return `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2>Hallo ${user.firstName || 'dort'},</h2>
            <p>Du hast eine Passwort-Zurücksetzung angefordert.</p>
            <a href="${url}" style="display: inline-block; padding: 12px 24px; background: #2563eb; color: white; text-decoration: none; border-radius: 6px;">
              Passwort zurücksetzen
            </a>
            <p style="color: #666; font-size: 14px; margin-top: 20px;">
              Dieser Link ist 1 Stunde gültig. Falls Du keine Zurücksetzung angefordert hast, ignoriere diese E-Mail.
            </p>
          </div>
        `
      },
      generateEmailSubject: () => 'Passwort zurücksetzen',
    },
    // Token expiration
    tokenExpiration: 7200, // 2 hours
    maxLoginAttempts: 5,
    lockTime: 600 * 1000, // 10 minutes
  },
  admin: {
    useAsTitle: 'email',
    defaultColumns: ['firstName', 'lastName', 'email', 'role', 'tenant'],
    group: 'System',
  },
  access: {
    create: ({ req: { user } }) => {
      // Super admins can create any user
      if (user?.role === 'super-admin') return true
      // Tenant admins can only create users for their tenant
      if (user?.role === 'admin') {
        return {
          tenant: {
            equals: user.tenant,
          },
        }
      }
      return false
    },
    read: ({ req: { user } }) => {
      // Super admins can read all users
      if (user?.role === 'super-admin') return true
      // Users can only read users from their tenant
      return {
        tenant: {
          equals: user?.tenant,
        },
      }
    },
    update: ({ req: { user } }) => {
      // Super admins can update any user
      if (user?.role === 'super-admin') return true
      // Users can update themselves
      if (user) {
        return {
          id: {
            equals: user.id,
          },
        }
      }
      return false
    },
    delete: ({ req: { user } }) => {
      // Only super admins can delete users
      return user?.role === 'super-admin'
    },
  },
  fields: [
    // =========================================================================
    // TENANT RELATIONSHIP
    // =========================================================================
    {
      name: 'tenant',
      type: 'relationship',
      relationTo: 'tenants',
      required: true,
      hasMany: false,
      admin: {
        condition: ({ req: { user } }) => user?.role === 'super-admin',
        description: 'Die Firma, zu der dieser Benutzer gehört',
      },
    },

    // =========================================================================
    // BASIC INFORMATION
    // =========================================================================
    {
      type: 'row',
      fields: [
        {
          name: 'firstName',
          type: 'text',
          required: true,
          label: 'Vorname',
        },
        {
          name: 'lastName',
          type: 'text',
          required: true,
          label: 'Nachname',
        },
      ],
    },
    {
      name: 'phone',
      type: 'text',
      label: 'Telefon',
    },
    {
      name: 'avatar',
      type: 'upload',
      relationTo: 'media',
      label: 'Profilbild',
    },

    // =========================================================================
    // ROLE & PERMISSIONS
    // =========================================================================
    {
      name: 'role',
      type: 'select',
      required: true,
      defaultValue: 'user',
      label: 'Rolle',
      options: [
        {
          label: 'Super Admin',
          value: 'super-admin',
        },
        {
          label: 'Admin',
          value: 'admin',
        },
        {
          label: 'Manager',
          value: 'manager',
        },
        {
          label: 'User',
          value: 'user',
        },
      ],
      access: {
        // Only super admins can set super-admin role
        update: ({ req: { user } }) => user?.role === 'super-admin',
      },
    },

    // =========================================================================
    // PREFERENCES
    // =========================================================================
    {
      name: 'preferences',
      type: 'group',
      label: 'Einstellungen',
      fields: [
        {
          name: 'language',
          type: 'select',
          defaultValue: 'de',
          label: 'Sprache',
          options: [
            { label: 'Deutsch', value: 'de' },
            { label: 'English', value: 'en' },
          ],
        },
        {
          name: 'emailNotifications',
          type: 'checkbox',
          defaultValue: true,
          label: 'E-Mail-Benachrichtigungen',
        },
        {
          name: 'smsNotifications',
          type: 'checkbox',
          defaultValue: false,
          label: 'SMS-Benachrichtigungen',
        },
      ],
    },

    // =========================================================================
    // METADATA
    // =========================================================================
    {
      name: 'lastLoginAt',
      type: 'date',
      label: 'Letzter Login',
      admin: {
        readOnly: true,
        position: 'sidebar',
      },
    },
  ],
  timestamps: true,
}
