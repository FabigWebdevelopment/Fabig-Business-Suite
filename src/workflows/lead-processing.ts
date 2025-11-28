import { sleep } from "workflow";

// Types
interface LeadContact {
  name: string;
  email: string;
  phone: string;
  plz?: string;
  address?: string;
}

interface LeadScoring {
  totalScore: number;
  classification: "hot" | "warm" | "potential" | "nurture";
  tags: string[];
}

interface LeadSubmission {
  funnelId: string;
  contact: LeadContact;
  data: Record<string, unknown>;
  scoring: LeadScoring;
  meta: {
    source: string;
    createdAt: string;
    gdprConsent: boolean;
  };
}

interface TwentyPerson {
  id: string;
  name: { firstName: string; lastName: string };
  emails: { primaryEmail: string };
}

interface TwentyOpportunity {
  id: string;
  name: string;
  stage: string;
}

// Environment variables
const TWENTY_API_URL = process.env.TWENTY_CRM_API_URL || "";
const TWENTY_API_KEY = process.env.TWENTY_API_KEY || "";
const RESEND_API_KEY = process.env.RESEND_API_KEY || "";
const OWNER_EMAIL = process.env.NOTIFICATION_EMAIL || "thomas@fabig.website";

// Funnel display names
const FUNNEL_NAMES: Record<string, string> = {
  "smart-home-beratung": "Smart Home Beratung",
  "elektro-anfrage": "Elektroinstallation",
  "sicherheit-beratung": "Sicherheitstechnik",
  "wallbox-anfrage": "Wallbox Installation",
};

// Helper: Parse name
function parseName(fullName: string): { firstName: string; lastName: string } {
  const parts = fullName.trim().split(" ");
  if (parts.length === 1) {
    return { firstName: parts[0], lastName: "" };
  }
  return { firstName: parts[0], lastName: parts.slice(1).join(" ") };
}

// Helper: Format lead notes
function formatLeadNotes(submission: LeadSubmission): string {
  const lines: string[] = [
    `📊 Lead Score: ${submission.scoring.totalScore} (${submission.scoring.classification.toUpperCase()})`,
    `🏷️ Tags: ${submission.scoring.tags.join(", ")}`,
    "",
    "📋 Funnel-Daten:",
  ];

  for (const [key, value] of Object.entries(submission.data)) {
    if (["name", "email", "phone", "plz", "address"].includes(key)) continue;
    const formattedKey = key.replace(/([A-Z])/g, " $1").replace(/^./, (s) => s.toUpperCase());
    lines.push(`• ${formattedKey}: ${Array.isArray(value) ? value.join(", ") : value}`);
  }

  lines.push("", `📍 Quelle: ${submission.meta.source}`, `📅 Erstellt: ${submission.meta.createdAt}`);
  return lines.join("\n");
}

/**
 * Main Lead Processing Workflow
 * Triggered when a user submits a funnel on the website
 */
export async function processLead(submission: LeadSubmission) {
  "use workflow";

  const funnelName = FUNNEL_NAMES[submission.funnelId] || submission.funnelId;
  const isHotLead = submission.scoring.classification === "hot";

  // Step 1: Create Person in Twenty CRM
  const person = await createPersonInCRM(submission);

  // Step 2: Create Opportunity in Twenty CRM
  const opportunity = await createOpportunityInCRM(submission, person, funnelName);

  // Step 3: Add Note with funnel details
  await createNoteInCRM(submission, opportunity.id);

  // Step 4: Send confirmation email to customer
  await sendCustomerConfirmationEmail(submission, funnelName);

  // Step 5: Notify owner (immediate for hot leads)
  await notifyOwner(submission, person, funnelName, isHotLead);

  // Step 6: Schedule follow-up check after 24 hours
  await sleep("24h");
  await checkAndSendFollowUp(submission, person, opportunity);

  // Step 7: Second follow-up after 3 more days
  await sleep("3d");
  await sendSecondFollowUp(submission, person, opportunity);

  return {
    success: true,
    personId: person.id,
    opportunityId: opportunity.id,
    classification: submission.scoring.classification,
  };
}

/**
 * Step: Create Person in Twenty CRM
 */
async function createPersonInCRM(submission: LeadSubmission): Promise<TwentyPerson> {
  "use step";

  const { firstName, lastName } = parseName(submission.contact.name);

  const response = await fetch(`${TWENTY_API_URL}/people`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${TWENTY_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: { firstName, lastName },
      emails: { primaryEmail: submission.contact.email },
      phones: { primaryPhoneNumber: submission.contact.phone },
      city: submission.contact.plz || "",
    }),
  });

  if (!response.ok) {
    throw new Error(`Failed to create person: ${await response.text()}`);
  }

  const data = await response.json();
  return data.data || data;
}

/**
 * Step: Create Opportunity in Twenty CRM
 */
async function createOpportunityInCRM(
  submission: LeadSubmission,
  person: TwentyPerson,
  funnelName: string
): Promise<TwentyOpportunity> {
  "use step";

  const { lastName } = parseName(submission.contact.name);
  const stage = submission.scoring.classification === "hot" ? "SCREENING" : "NEW";

  const response = await fetch(`${TWENTY_API_URL}/opportunities`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${TWENTY_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: `${funnelName} - ${lastName}`,
      stage,
      pointOfContactId: person.id,
    }),
  });

  if (!response.ok) {
    throw new Error(`Failed to create opportunity: ${await response.text()}`);
  }

  const data = await response.json();
  return data.data || data;
}

/**
 * Step: Create Note with funnel details
 */
async function createNoteInCRM(submission: LeadSubmission, opportunityId: string): Promise<void> {
  "use step";

  const noteContent = formatLeadNotes(submission);

  await fetch(`${TWENTY_API_URL}/notes`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${TWENTY_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      body: noteContent,
      // Note: Twenty may need different field for linking to opportunity
      // Check Twenty API docs for correct relation field
    }),
  });
}

/**
 * Step: Send confirmation email to customer
 */
async function sendCustomerConfirmationEmail(submission: LeadSubmission, funnelName: string): Promise<void> {
  "use step";

  if (!RESEND_API_KEY) {
    console.log("Resend not configured, skipping customer email");
    return;
  }

  const { firstName } = parseName(submission.contact.name);

  const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">

  <div style="text-align: center; margin-bottom: 30px;">
    <h1 style="color: #f97316; margin: 0;">⚡ Müller Elektrotechnik</h1>
    <p style="color: #666; margin: 5px 0;">Ihr Experte für Smart Home & Elektroinstallation</p>
  </div>

  <h2 style="color: #333;">Hallo ${firstName}!</h2>

  <p>Vielen Dank für deine Anfrage zum Thema <strong>${funnelName}</strong>!</p>

  <div style="background: #f8fafc; border-radius: 8px; padding: 20px; margin: 20px 0;">
    <h3 style="margin-top: 0; color: #333;">Was passiert jetzt?</h3>
    <ul style="padding-left: 20px;">
      <li>✓ Deine Anfrage ist bei uns eingegangen</li>
      <li>→ Thomas meldet sich innerhalb von 24 Stunden</li>
      <li>→ Wir besprechen deine Wünsche und Möglichkeiten</li>
      <li>→ Du erhältst ein unverbindliches Angebot</li>
    </ul>
  </div>

  <div style="background: #fff7ed; border-left: 4px solid #f97316; padding: 15px; margin: 20px 0;">
    <strong>Du möchtest nicht warten?</strong><br>
    📞 <a href="tel:+4989123456789" style="color: #f97316;">089 1234 5678</a> (Mo-Fr 8-18 Uhr)<br>
    💬 <a href="https://wa.me/4989123456789" style="color: #f97316;">WhatsApp schreiben</a>
  </div>

  <p>Bis bald!<br><strong>Thomas Müller</strong><br>Müller Elektrotechnik München</p>

  <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;">

  <p style="font-size: 12px; color: #999; text-align: center;">
    Müller Elektrotechnik GmbH · Musterstraße 123 · 80331 München<br>
    Diese E-Mail wurde automatisch versendet.
  </p>

</body>
</html>
  `.trim();

  await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: "Müller Elektrotechnik <elektriker@fabig.website>",
      to: submission.contact.email,
      subject: `Deine ${funnelName} Anfrage ✓`,
      html,
    }),
  });
}

/**
 * Step: Notify owner about new lead
 */
async function notifyOwner(
  submission: LeadSubmission,
  person: TwentyPerson,
  funnelName: string,
  isHotLead: boolean
): Promise<void> {
  "use step";

  if (!RESEND_API_KEY) {
    console.log("Resend not configured, skipping owner notification");
    return;
  }

  const emoji = isHotLead ? "🔥" : "📬";
  const urgency = isHotLead ? "HOT LEAD - Sofort anrufen!" : "Neuer Lead";

  const html = `
<!DOCTYPE html>
<html>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; padding: 20px;">

  <h2>${emoji} ${urgency}</h2>

  <table style="border-collapse: collapse; width: 100%;">
    <tr>
      <td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Name:</strong></td>
      <td style="padding: 8px; border-bottom: 1px solid #eee;">${submission.contact.name}</td>
    </tr>
    <tr>
      <td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Telefon:</strong></td>
      <td style="padding: 8px; border-bottom: 1px solid #eee;">
        <a href="tel:${submission.contact.phone}">${submission.contact.phone}</a>
      </td>
    </tr>
    <tr>
      <td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>E-Mail:</strong></td>
      <td style="padding: 8px; border-bottom: 1px solid #eee;">
        <a href="mailto:${submission.contact.email}">${submission.contact.email}</a>
      </td>
    </tr>
    <tr>
      <td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>PLZ:</strong></td>
      <td style="padding: 8px; border-bottom: 1px solid #eee;">${submission.contact.plz || "-"}</td>
    </tr>
    <tr>
      <td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Anfrage:</strong></td>
      <td style="padding: 8px; border-bottom: 1px solid #eee;">${funnelName}</td>
    </tr>
    <tr>
      <td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Score:</strong></td>
      <td style="padding: 8px; border-bottom: 1px solid #eee;">
        ${submission.scoring.totalScore} (${submission.scoring.classification.toUpperCase()})
      </td>
    </tr>
    <tr>
      <td style="padding: 8px;"><strong>Tags:</strong></td>
      <td style="padding: 8px;">${submission.scoring.tags.join(", ") || "-"}</td>
    </tr>
  </table>

  <div style="margin-top: 20px;">
    <a href="https://crm.fabig-suite.de" style="background: #f97316; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">
      Im CRM öffnen
    </a>
  </div>

</body>
</html>
  `.trim();

  await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: "Lead Notification <noreply@fabig.website>",
      to: OWNER_EMAIL,
      subject: `${emoji} ${isHotLead ? "HOT LEAD" : "Neuer Lead"}: ${submission.contact.name} - ${funnelName}`,
      html,
    }),
  });
}

/**
 * Step: Check if follow-up needed and send
 */
async function checkAndSendFollowUp(
  submission: LeadSubmission,
  person: TwentyPerson,
  opportunity: TwentyOpportunity
): Promise<void> {
  "use step";

  // TODO: Check if opportunity is still in NEW stage
  // If so, send follow-up email to customer and reminder to owner
  console.log(`Follow-up check for ${person.id} - opportunity ${opportunity.id}`);
}

/**
 * Step: Send second follow-up
 */
async function sendSecondFollowUp(
  submission: LeadSubmission,
  person: TwentyPerson,
  opportunity: TwentyOpportunity
): Promise<void> {
  "use step";

  // TODO: Check if opportunity is still in NEW/SCREENING stage
  // If so, send final follow-up
  console.log(`Second follow-up for ${person.id} - opportunity ${opportunity.id}`);
}
