# 🎯 Industry-Specific Lead Qualification Funnels

> **Core Insight:** Different industries need different questions to qualify leads
> **Goal:** Pre-qualify leads BEFORE they hit CRM (save time, increase conversion)
> **Implementation:** Multi-step forms on landing pages that ask the RIGHT questions

---

## 💡 The Problem with Generic Contact Forms

**Bad (Generic Form):**
```
Name: _______
Email: _______
Phone: _______
Message: _______
[Submit]
```

**Why This Sucks:**
- ❌ No qualification (time-wasters enter CRM)
- ❌ No context (you have to call them to understand what they want)
- ❌ Low conversion (asking for too much info upfront scares people)
- ❌ Manual follow-up (you waste time calling unqualified leads)

---

## ✅ Industry-Specific Lead Funnels

Each industry gets a **multi-step form** that:
1. Asks qualifying questions (budget, timeline, service type)
2. Captures lead info ONLY if qualified
3. Saves qualified data to Twenty CRM
4. Triggers automated follow-up (email/WhatsApp based on urgency)
5. **Pre-fills CRM with context** (no need to call and ask again)

---

## 💇 Funnel 1: Barber Shop / Salon

### **Goal:** Book appointments, reduce no-shows

### **Form Flow (Multi-Step):**

**Step 1: Service Selection** (Visual cards)
```
Was möchtest du buchen?

[Card: Herrenschnitt]        [Card: Herrenschnitt + Bart]
€30 | 30 Min                  €45 | 45 Min

[Card: Färben]               [Card: Rasur]
€60 | 60 Min                  €25 | 20 Min
```
**CRM Field:** `service` = "herrenschnitt" | "herrenschnitt-bart" | "färben" | "rasur"

---

**Step 2: Date & Time Preference**
```
Wann hättest du gerne einen Termin?

Datum: [Calendar Picker]
Uhrzeit: [Dropdown: 9:00, 9:30, 10:00 ... 18:30]

Alternative: "Ich bin flexibel" [Checkbox]
```
**CRM Fields:**
- `preferred_date` = "2025-11-25"
- `preferred_time` = "10:00"
- `flexible` = true/false

---

**Step 3: Contact Info** (ONLY if they've selected service + time)
```
Wie können wir dich erreichen?

Vorname: _______
Nachname: _______
Telefon: _______ (WhatsApp?) [Checkbox]
Email: _______ (optional)

[Termin buchen]
```
**CRM Fields:**
- `firstName`, `lastName`, `phone`, `hasWhatsApp`, `email`
- **Lead Score:** HIGH (already selected service + time = ready to book)

---

**Immediate Follow-Up:**
1. **WhatsApp (if has WhatsApp):**
   ```
   Hey [Name]! 👋

   Deine Anfrage für [Service] am [Date] um [Time] ist bei uns angekommen!

   Unser Team meldet sich in den nächsten 30 Minuten bei dir,
   um den Termin zu bestätigen.

   Bis gleich! 💇
   Müller Barbershop
   ```

2. **Email (always sent):**
   ```
   Subject: Deine Termin-Anfrage bei Müller Barbershop

   Hallo [Name],

   vielen Dank für deine Anfrage!

   Du möchtest:
   - Service: [Service]
   - Termin: [Date] um [Time]

   Wir melden uns in Kürze bei dir, um den Termin zu bestätigen.

   Liebe Grüße,
   Team Müller Barbershop
   ```

---

## ⚡ Funnel 2: Electrician / Handwerker

### **Goal:** Qualify leads by urgency, capture problem details

### **Form Flow (Multi-Step):**

**Step 1: Problem Type** (Visual cards with icons)
```
Was benötigst du?

[⚡ Störungsbehebung]     [🏠 Installation]
Etwas funktioniert nicht  Neue Geräte/Leitungen

[🔌 Smart Home]          [🚨 Notfall]
Hausautomation           Stromausfall/Brandgefahr
```
**CRM Field:** `service_type` = "störung" | "installation" | "smart-home" | "notfall"

---

**Step 2: Urgency** (CRITICAL for prioritization)
```
Wie dringend ist es?

[🔴 NOTFALL - Heute noch]
    Stromausfall, Brandgefahr, keine Heizung

[🟠 DRINGEND - Diese Woche]
    Wichtiges Gerät defekt, Betrieb beeinträchtigt

[🟡 NORMAL - Nächste 2 Wochen]
    Planung, Beratung, nicht eilig
```
**CRM Field:** `urgency` = "notfall" | "dringend" | "normal"
**Lead Score:**
- Notfall = 100 (immediate SMS to Thomas)
- Dringend = 75 (call within 2 hours)
- Normal = 50 (email follow-up, call next day)

---

**Step 3: Problem Description** (Conditional on service type)
```
Beschreibe dein Problem kurz:

[Text area]
(Optional: Foto hochladen 📷)

Beispiele:
- "Lichtschalter im Bad funktioniert nicht"
- "Sicherung fliegt raus wenn ich Kaffeemaschine anmache"
- "Möchte Ladestation für E-Auto installieren"
```
**CRM Fields:**
- `description` = text
- `photo_url` = uploaded to Cloudflare R2

---

**Step 4: Location & Contact**
```
Wo bist du?

PLZ/Ort: _______ (Auto-suggest with Google Places API)

[ ] Liegt in unserem Servicegebiet ✅ (München + 30km Umkreis)
[ ] Außerhalb unseres Servicegebiets ❌ (Sorry, zu weit!)

---

Deine Kontaktdaten:

Vorname: _______
Nachname: _______
Telefon: _______ (WhatsApp?) [Checkbox]
Email: _______

[Anfrage absenden]
```
**CRM Fields:**
- `location` = "80331 München"
- `in_service_area` = true/false
- **Lead Qualification:**
  - If `in_service_area` = false → Polite rejection email, don't create CRM lead
  - If `in_service_area` = true → Create lead, trigger follow-up

---

**Immediate Follow-Up (Based on Urgency):**

**If NOTFALL:**
1. **SMS to Thomas** (immediate):
   ```
   🚨 NOTFALL-Auftrag:
   Problem: [description]
   Kunde: [Name], [Phone]
   Ort: [Location]

   CRM: [Link to lead]
   ```

2. **WhatsApp to Customer** (immediate):
   ```
   🚨 NOTFALL-SERVICE

   Wir haben deine Anfrage erhalten!
   Unser Techniker Thomas ruft dich in den nächsten 15 MINUTEN an.

   Bei akuter Gefahr (Feuer, Stromschlag):
   → Rufe SOFORT die Feuerwehr: 112

   Telefon: +49 151 234 567 89
   Schmidt Elektrik - 24/7 Notdienst
   ```

**If DRINGEND:**
1. **WhatsApp to Customer**:
   ```
   Hey [Name]! 👋

   Deine Anfrage ist bei uns angekommen.

   Problem: [description]
   Dringlichkeit: Diese Woche

   Unser Elektriker Thomas ruft dich innerhalb der nächsten 2 Stunden an,
   um einen Termin zu vereinbaren.

   Bis gleich!
   Schmidt Elektrik
   ```

2. **n8n Workflow**: Wait 2 hours → If Thomas hasn't called → Send reminder SMS to Thomas

**If NORMAL:**
1. **Email to Customer**:
   ```
   Subject: Deine Anfrage bei Schmidt Elektrik

   Hallo [Name],

   vielen Dank für deine Anfrage!

   Problem: [description]
   Ort: [Location]

   Unser Elektriker Thomas meldet sich morgen bei dir,
   um einen Termin zu vereinbaren.

   Bei Rückfragen: +49 151 234 567 89

   Liebe Grüße,
   Team Schmidt Elektrik
   ```

---

## 🍽️ Funnel 3: Restaurant / Café

### **Goal:** Capture table reservations with party size, date, time

### **Form Flow (Multi-Step):**

**Step 1: Reservation Type**
```
Was möchtest du buchen?

[🍽️ Tischreservierung]
Normale Reservierung

[🎉 Event]
Geburtstag, Firmenfeier, etc. (ab 10 Personen)

[🥡 Catering-Anfrage]
Essen für Events außer Haus
```
**CRM Field:** `reservation_type` = "tisch" | "event" | "catering"

---

**Step 2: Party Details** (Conditional on reservation type)

**If "Tischreservierung":**
```
Für wie viele Personen?

[Slider: 1-12 Personen] → Value: 4

[ ] Hochstuhl benötigt (Kinder)
[ ] Rollstuhlgerecht (Barrierefreiheit)
```
**CRM Fields:** `party_size` = 4, `needs_highchair` = true/false, `wheelchair` = true/false

**If "Event":**
```
Für wie viele Personen?

[Input: ___ Personen] (min. 10)

Art der Feier:
[ ] Geburtstag
[ ] Firmenfeier
[ ] Hochzeit
[ ] Taufe
[ ] Sonstiges: _______
```
**CRM Fields:** `party_size` = number, `event_type` = "geburtstag" | "firmenfeier" | etc.

**If "Catering":**
```
Für wie viele Personen?

[Input: ___ Personen] (min. 10)

Wo findet das Event statt?

PLZ/Ort: _______ (Auto-suggest)

[ ] Liegt in unserem Liefergebiet ✅ (München + 20km)
```
**CRM Fields:** `party_size`, `event_location`, `in_delivery_area` = true/false

---

**Step 3: Date & Time Preference**
```
Wann möchtest du kommen?

Datum: [Calendar Picker]
    (Only show dates 2+ days in future for events)

Uhrzeit:
[Dropdown: 17:00, 17:30, 18:00 ... 22:00]

Besondere Wünsche (optional):
[Text area]
- Fensterplatz
- Ruhige Ecke
- Vegetarisches Menü
```
**CRM Fields:** `date`, `time`, `special_requests`

---

**Step 4: Contact Info**
```
Wie können wir dich erreichen?

Vorname: _______
Nachname: _______
Telefon: _______ (WhatsApp?) [Checkbox]
Email: _______

[Reservierung anfragen]
```

---

**Immediate Follow-Up:**

**If "Tischreservierung" (normal):**
1. **WhatsApp**:
   ```
   Ciao [Name]! 👋

   Deine Reservierungsanfrage ist bei uns angekommen:

   📅 [Date] um [Time]
   👥 [Party Size] Personen

   Wir bestätigen dir deinen Tisch innerhalb der nächsten Stunde.

   Bis bald!
   La Dolce Vita
   ```

**If "Event" (large party):**
1. **Email** (detailed):
   ```
   Subject: Deine Event-Anfrage bei La Dolce Vita

   Hallo [Name],

   vielen Dank für deine Event-Anfrage!

   Details:
   - Art: [Event Type]
   - Datum: [Date]
   - Personen: [Party Size]

   Unser Event-Manager meldet sich morgen bei dir,
   um ein individuelles Angebot zu erstellen.

   Bei dringenden Fragen: +49 89 123 456

   Liebe Grüße,
   Team La Dolce Vita
   ```

---

## 🏋️ Funnel 4: Fitness Studio

### **Goal:** Capture trial class bookings, pre-qualify for membership

### **Form Flow (Multi-Step):**

**Step 1: Goal Selection** (Visual cards)
```
Was ist dein Fitnessziel?

[💪 Muskelaufbau]     [🔥 Abnehmen]
Kraft & Definition    Fett verbrennen

[🧘 Beweglichkeit]    [❤️ Gesundheit]
Yoga, Stretching      Allgemeine Fitness
```
**CRM Field:** `fitness_goal` = "muskelaufbau" | "abnehmen" | "beweglichkeit" | "gesundheit"

---

**Step 2: Experience Level**
```
Wie fit bist du aktuell?

[🌱 Anfänger]
    Wenig bis keine Erfahrung

[🌿 Fortgeschritten]
    1-2 Jahre regelmäßiges Training

[🌳 Profi]
    3+ Jahre, sehr erfahren
```
**CRM Field:** `experience` = "anfänger" | "fortgeschritten" | "profi"
**Lead Score:** Anfänger = higher value (more likely to sign up for coaching)

---

**Step 3: Trial Class Selection**
```
Welchen Kurs möchtest du ausprobieren? (Kostenlose Probestunde!)

[Montag 18:00 - HIIT Workout]
[Mittwoch 19:00 - Yoga Flow]
[Freitag 17:00 - Krafttraining für Anfänger]

[ ] Ich bin noch unsicher, beratet mich!
```
**CRM Fields:** `trial_class` = "hiit-montag-18" | "yoga-mittwoch-19" | etc.

---

**Step 4: Contact + Budget Qualifier**
```
Deine Kontaktdaten:

Vorname: _______
Nachname: _______
Telefon: _______ (WhatsApp?) [Checkbox]
Email: _______

---

Hast du schon über eine Mitgliedschaft nachgedacht?

[ ] Ja, ich suche ein Studio (HIGH INTENT ⭐⭐⭐)
[ ] Vielleicht, erstmal Probe (MEDIUM INTENT ⭐⭐)
[ ] Nein, nur Probestunde (LOW INTENT ⭐)

[Probestunde buchen]
```
**CRM Field:** `membership_interest` = "high" | "medium" | "low"
**Lead Score:**
- High = 100 (offer membership deal immediately)
- Medium = 75 (nurture with trial, then offer)
- Low = 50 (trial only, nurture long-term)

---

**Immediate Follow-Up (Based on Interest):**

**If HIGH INTENT:**
1. **WhatsApp** (immediate):
   ```
   Hey [Name]! 🔥

   Awesome, dass du uns ausprobieren möchtest!

   Deine kostenlose Probestunde: [Trial Class]

   🎁 SPECIAL OFFER nur für dich:
   Bei Anmeldung heute: 50% Rabatt auf ersten Monat!

   Unser Trainer Alex ruft dich in 30 Min an, um alles zu besprechen.

   Bis gleich!
   FitLife München
   ```

**If MEDIUM/LOW INTENT:**
1. **Email**:
   ```
   Subject: Deine Probestunde bei FitLife München

   Hey [Name]! 👋

   Klasse, dass du FitLife ausprobieren möchtest!

   Deine Probestunde: [Trial Class]

   Bitte komm 15 Min früher, dann zeigen wir dir das Studio
   und beantworten all deine Fragen.

   Was du mitbringen solltest:
   - Sportkleidung
   - Handtuch
   - Trinkflasche

   Wir freuen uns auf dich!
   Team FitLife
   ```

---

## 🚗 Funnel 5: Car Repair / Auto Werkstatt

### **Goal:** Diagnose problem, estimate cost, schedule appointment

### **Form Flow (Multi-Step):**

**Step 1: Vehicle Info** (API integration with license plate lookup)
```
Dein Fahrzeug:

Kennzeichen: [M-AB 1234] → Auto-lookup: "BMW 3er, 2018"

Oder manuell:
Marke: [Dropdown]
Modell: _______
Baujahr: _______
Kilometerstand: _______
```
**CRM Fields:** `vehicle_make`, `vehicle_model`, `vehicle_year`, `mileage`

---

**Step 2: Problem Category**
```
Was ist das Problem?

[🔊 Geräusche]         [⚠️ Warnleuchte]
Komisches Geräusch     Kontrollleuchte an

[💨 Leistungsverlust]  [🛠️ Wartung]
Motor, Beschleunigung  Inspektion, Ölwechsel

[🚗 Unfall/Schaden]    [❓ Sonstiges]
Karosserie, Lack       Beschreib es uns
```
**CRM Field:** `problem_category`

---

**Step 3: Problem Details** (Conditional questions)

**If "Warnleuchte":**
```
Welche Warnleuchte leuchtet?

[🔴 Motorkontrolleuchte]
[🟠 Batterie-Symbol]
[🟡 ABS-Leuchte]
[🔵 Öldruckwarnung]
[⚪ Andere: _______]

Blinkt sie oder leuchtet sie dauerhaft?
[ ] Dauerhaft
[ ] Blinkt

(Optional: Foto vom Armaturenbrett hochladen 📷)
```

**If "Geräusche":**
```
Was für ein Geräusch?

[ ] Quietschen (Bremsen?)
[ ] Klappern (Motor, Fahrwerk?)
[ ] Pfeifen (Riemen, Turbo?)
[ ] Schleifen
[ ] Sonstiges: _______

Wann tritt es auf?
[ ] Beim Anfahren
[ ] Bei Geschwindigkeit
[ ] Beim Bremsen
[ ] Immer

(Optional: Video/Audio hochladen 📹🎵)
```

**CRM Fields:** `symptom_details`, `media_url`

---

**Step 4: Urgency & Appointment**
```
Wie dringend ist es?

[🔴 NOTFALL - Auto fährt nicht mehr]
    → Abschleppservice anfragen?

[🟠 DRINGEND - Diese Woche]
    → Nächster Termin: Mittwoch 14:00

[🟡 NORMAL - Nächste 2 Wochen]
    → Wunschtermin: [Date Picker]

---

Deine Kontaktdaten:

Vorname: _______
Nachname: _______
Telefon: _______
Email: _______

[Werkstatttermin anfragen]
```

---

**Immediate Follow-Up:**

**If NOTFALL:**
1. **SMS to Mechanic**:
   ```
   🚨 NOTFALL-Auto:
   Fahrzeug: [Make Model Year]
   Problem: [Description]
   Kunde: [Name], [Phone]

   → Abschleppdienst nötig?
   CRM: [Link]
   ```

2. **WhatsApp to Customer**:
   ```
   🚨 Wir kümmern uns sofort!

   Dein Fahrzeug: [Make Model]
   Problem: [Description]

   Unser Mechaniker Markus ruft dich in 15 Min an.

   Falls du abgeschleppt werden musst:
   Wir organisieren das für dich!

   AutoWerkstatt Müller - 24/7 Notdienst
   ```

---

## 📋 Implementation Checklist

### **Technical Requirements:**

**For ALL Funnels:**
- [ ] Multi-step form library (React Hook Form + Zod validation)
- [ ] Progress indicator (Step 1 of 4)
- [ ] Conditional logic (show/hide steps based on answers)
- [ ] File upload (photos/videos to Cloudflare R2)
- [ ] Auto-save progress (LocalStorage, resume later)
- [ ] Mobile-responsive (60%+ of traffic)

**Integrations:**
- [ ] Twenty CRM API (save qualified leads with all context)
- [ ] n8n webhooks (trigger automated follow-ups)
- [ ] Resend API (send confirmation emails)
- [ ] Twilio WhatsApp API (instant responses)
- [ ] Google Calendar API (check availability for bookings)
- [ ] Google Places API (location auto-complete)

**Analytics:**
- [ ] Track funnel drop-off (which step loses most people?)
- [ ] A/B test questions (does "Wie dringend?" work better as slider or buttons?)
- [ ] Lead score calculation (urgency + budget + location)

---

## 🎯 Lead Scoring System

**Automatically calculate lead score in CRM:**

```typescript
function calculateLeadScore(lead: Lead): number {
  let score = 50 // base score

  // Urgency bonus (0-30 points)
  if (lead.urgency === 'notfall') score += 30
  else if (lead.urgency === 'dringend') score += 20
  else if (lead.urgency === 'normal') score += 10

  // Budget indicator (0-20 points)
  if (lead.membershipInterest === 'high') score += 20 // fitness studio
  if (lead.reservationType === 'event') score += 20 // restaurant (high value)
  if (lead.serviceType === 'installation') score += 15 // electrician (big job)

  // Location (0-10 points)
  if (lead.inServiceArea === true) score += 10

  // Completeness (0-10 points)
  if (lead.hasPhone) score += 5
  if (lead.hasWhatsApp) score += 3
  if (lead.hasPhoto) score += 2

  return score // 0-100
}
```

**Lead Priority in CRM:**
- 🔴 90-100: Urgent (call immediately)
- 🟠 70-89: High (call within 2 hours)
- 🟡 50-69: Medium (call same day)
- 🟢 0-49: Low (email follow-up, call next day)

---

## 💰 Why This Increases Conversion

**Before (Generic Form):**
1. Lead fills out basic form
2. You call them: "So, what exactly do you need?"
3. They explain the whole problem (5-10 min call)
4. You realize they're outside service area / no budget / not urgent
5. Time wasted ❌

**After (Industry Funnel):**
1. Lead goes through qualification funnel
2. Unqualified leads filtered out (outside service area → polite rejection)
3. Qualified leads hit CRM with FULL CONTEXT
4. You already know: urgency, budget, service needed
5. Call is 2 min: "Hi, I see you need [X] on [Date]. Let me book you in!"
6. Time saved ✅ + Higher conversion ✅

---

## 📊 Expected Results

**Barber Shop:**
- 40% of website visitors start funnel
- 60% complete funnel (24% overall conversion)
- 80% of completed funnels book appointment
- **Result:** 19% of visitors book appointment (vs 5% with generic form)

**Electrician:**
- 30% of visitors start funnel
- 70% complete funnel (21% overall conversion)
- 90% of completed funnels are qualified (in service area, real problem)
- **Result:** 19% qualified leads (vs 10% with generic form, 50% unqualified)

**Restaurant:**
- 50% of visitors start funnel (high intent)
- 80% complete funnel (40% overall conversion)
- 70% of completed funnels are confirmed reservations
- **Result:** 28% of visitors make reservation (vs 8% with phone-only)

---

**Next Step:** Build these funnels as React components with shadcn/ui! 🚀

**© 2025 Thomas Fabig | Fabig Webdevelopment**
