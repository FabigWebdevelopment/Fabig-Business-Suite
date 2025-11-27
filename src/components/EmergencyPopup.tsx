'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { AlertTriangle, Phone, MessageCircle, X, ChevronRight, Zap, Flame, HelpCircle, ArrowLeft, AlertCircle, Sparkles, Check, Loader2 } from 'lucide-react'

interface EmergencyPopupProps {
  phone: string
  whatsapp: string
  isDemo?: boolean // When true, shows "Want this for your business?" after funnel
  // Controlled mode props
  isOpen?: boolean
  onOpenChange?: (open: boolean) => void
  // Auto-show behavior (only used in uncontrolled mode)
  autoShowDelay?: number // Default 2000ms, set to 0 to disable auto-show
}

type Step = 'initial' | 'problem' | 'contact' | 'fire-warning' | 'demo-cta' | 'demo-form' | 'demo-success'

interface LeadData {
  problem: string
  address: string
  description: string
}

interface DemoLeadData {
  businessName: string
  businessType: string
  contactName: string
  phone: string
  email: string
}

// User-centric problem descriptions - what they're EXPERIENCING, not technical terms
const problems = [
  {
    id: 'kein-strom',
    label: 'Kein Strom',
    subtext: 'Teilweise oder komplett',
    emoji: '🔌',
    priority: 'high'
  },
  {
    id: 'funken',
    label: 'Funken / Knall',
    subtext: 'An Steckdose oder Gerät',
    emoji: '⚡',
    priority: 'urgent'
  },
  {
    id: 'brandgeruch',
    label: 'Brandgeruch / Rauch',
    subtext: 'Aus Steckdose oder Wand',
    emoji: '🔥',
    priority: 'critical'
  },
  {
    id: 'anderes',
    label: 'Anderes Problem',
    subtext: 'Beschreiben Sie es uns',
    emoji: '❓',
    priority: 'normal'
  },
]

const businessTypes = [
  'Handwerk (Elektriker, Sanitär, etc.)',
  'Gastronomie',
  'Einzelhandel',
  'Dienstleistung',
  'Sonstiges'
]

export function EmergencyPopup({
  phone,
  whatsapp,
  isDemo = true,
  isOpen: controlledIsOpen,
  onOpenChange,
  autoShowDelay = 2000
}: EmergencyPopupProps) {
  // Determine if we're in controlled mode
  const isControlled = controlledIsOpen !== undefined

  const [internalIsVisible, setInternalIsVisible] = useState(false)
  const [isDismissed, setIsDismissed] = useState(false)
  const [step, setStep] = useState<Step>('initial')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [leadData, setLeadData] = useState<LeadData>({
    problem: '',
    address: '',
    description: '',
  })
  const [demoLead, setDemoLead] = useState<DemoLeadData>({
    businessName: '',
    businessType: '',
    contactName: '',
    phone: '',
    email: '',
  })

  // Auto-show behavior (only in uncontrolled mode)
  useEffect(() => {
    if (isControlled || autoShowDelay === 0) return

    const timer = setTimeout(() => {
      setInternalIsVisible(true)
    }, autoShowDelay)
    return () => clearTimeout(timer)
  }, [isControlled, autoShowDelay])

  // Reset step when opened externally
  useEffect(() => {
    if (isControlled && controlledIsOpen) {
      setStep('initial')
      setIsDismissed(false)
    }
  }, [isControlled, controlledIsOpen])

  // Determine visibility based on mode
  const isVisible = isControlled ? controlledIsOpen : internalIsVisible

  // Handle close/dismiss
  const handleDismiss = () => {
    setIsDismissed(true)
    if (onOpenChange) {
      onOpenChange(false)
    }
  }

  const selectedProblem = problems.find(p => p.id === leadData.problem)

  const generateWhatsAppMessage = () => {
    const problemLabel = selectedProblem?.label || leadData.problem

    let message = `🚨 NOTFALL-ANFRAGE\n\n`
    message += `Problem: ${problemLabel}\n`
    if (leadData.address) {
      message += `Adresse: ${leadData.address}\n`
    }
    if (leadData.description) {
      message += `Details: ${leadData.description}\n`
    }
    message += `\nBitte melden Sie sich schnellstmöglich!`

    return encodeURIComponent(message)
  }

  const handleProblemSelect = (problemId: string) => {
    const problem = problems.find(p => p.id === problemId)
    setLeadData(prev => ({ ...prev, problem: problemId }))

    if (problem?.priority === 'critical') {
      setStep('fire-warning')
    } else {
      setStep('contact')
    }
  }

  const handleContactAction = (action: 'call' | 'whatsapp') => {
    // In demo mode, show the demo CTA after they try to contact
    if (isDemo) {
      setStep('demo-cta')
    }
    // In production, the links would just work normally
  }

  const handleDemoSubmit = async () => {
    if (!demoLead.businessName || !demoLead.contactName || (!demoLead.phone && !demoLead.email)) {
      return
    }

    setIsSubmitting(true)

    try {
      const response = await fetch('/api/demo-lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...demoLead,
          source: 'Electrician Demo - Emergency Funnel',
          funnelData: {
            problem: selectedProblem?.label,
            completedSteps: ['problem', 'contact'],
          }
        }),
      })

      if (response.ok) {
        setStep('demo-success')
      }
    } catch (error) {
      console.error('Failed to submit demo lead:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const goBack = () => {
    if (step === 'contact') setStep('problem')
    else if (step === 'fire-warning') setStep('problem')
    else if (step === 'problem') setStep('initial')
    else if (step === 'demo-form') setStep('demo-cta')
  }

  // In controlled mode, only check isVisible (controlled by parent)
  // In uncontrolled mode, check both isDismissed and isVisible
  if (isControlled) {
    if (!isVisible) return null
  } else {
    if (isDismissed || !isVisible) return null
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 animate-in slide-in-from-bottom-5 fade-in duration-500">
      <div className="bg-white text-foreground rounded-2xl shadow-2xl overflow-hidden max-w-[320px] border border-gray-200 relative">
        {/* Accent bar - red for emergency steps, primary for demo steps */}
        <div className={`h-1 w-full ${step.startsWith('demo') ? 'bg-primary' : 'bg-red-500'}`} />

        {/* Close button */}
        <button
          onClick={handleDismiss}
          className="absolute top-4 right-3 w-6 h-6 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors z-10"
          aria-label="Schließen"
        >
          <X className="h-4 w-4 text-gray-500" />
        </button>

        {/* Pulsing indicator - only on initial step */}
        {step === 'initial' && (
          <div className="absolute top-4 left-4">
            <span className="flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
            </span>
          </div>
        )}

        {/* Initial State */}
        {step === 'initial' && (
          <div className="p-4 pt-5">
            <div className="flex items-start gap-3 mb-4 pr-6">
              <div className="w-10 h-10 rounded-xl bg-red-100 flex items-center justify-center flex-shrink-0">
                <AlertTriangle className="h-5 w-5 text-red-600" />
              </div>
              <div>
                <p className="font-bold text-gray-900">Elektrischer Notfall?</p>
                <p className="text-gray-500 text-sm">Wir sind in 60 Min. bei Ihnen</p>
              </div>
            </div>

            <Button
              onClick={() => setStep('problem')}
              className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold"
            >
              Ja, ich brauche Hilfe
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>

            <p className="text-center text-gray-400 text-xs mt-3">
              24/7 erreichbar · Festpreise · München
            </p>
          </div>
        )}

        {/* Step 1: Problem Selection */}
        {step === 'problem' && (
          <div className="p-4 pt-5">
            <button onClick={goBack} className="flex items-center text-gray-400 text-sm mb-3 hover:text-gray-600">
              <ArrowLeft className="h-4 w-4 mr-1" /> Zurück
            </button>

            <p className="font-bold text-gray-900 mb-1">Was ist passiert?</p>
            <p className="text-gray-500 text-xs mb-3">Wir melden uns sofort bei Ihnen</p>

            <div className="space-y-2">
              {problems.map((problem) => (
                <button
                  key={problem.id}
                  onClick={() => handleProblemSelect(problem.id)}
                  className="w-full bg-gray-50 hover:bg-red-50 hover:border-red-200 border border-gray-200 rounded-xl p-3 text-left transition-colors flex items-center gap-3"
                >
                  <span className="text-xl">{problem.emoji}</span>
                  <div className="flex-1">
                    <span className="text-sm font-medium text-gray-900 block">{problem.label}</span>
                    <span className="text-xs text-gray-500">{problem.subtext}</span>
                  </div>
                  <ChevronRight className="h-4 w-4 text-gray-300" />
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Fire Warning - Critical Priority */}
        {step === 'fire-warning' && (
          <div className="p-4 pt-5">
            <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-4">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-red-600 flex items-center justify-center flex-shrink-0">
                  <AlertCircle className="h-5 w-5 text-white" />
                </div>
                <div>
                  <p className="font-bold text-red-800 text-sm">Wichtig!</p>
                  <p className="text-red-700 text-xs mt-1">
                    Bei akutem Brandgeruch oder sichtbarem Rauch: Verlassen Sie den Raum und rufen Sie die <strong>Feuerwehr 112</strong> an.
                  </p>
                </div>
              </div>
            </div>

            <p className="text-gray-600 text-sm mb-3">
              Kein akuter Brand? Dann helfen wir Ihnen sofort:
            </p>

            <div className="space-y-2">
              <Button
                className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold"
                onClick={() => handleContactAction('call')}
              >
                <Phone className="mr-2 h-4 w-4" />
                Jetzt anrufen
              </Button>

              <Button
                variant="outline"
                className="w-full border-gray-200 text-gray-700 hover:bg-gray-50"
                onClick={() => setStep('contact')}
              >
                Weiter zur Kontaktaufnahme
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        )}

        {/* Step 2: Contact */}
        {step === 'contact' && (
          <div className="p-4 pt-5">
            <button onClick={goBack} className="flex items-center text-gray-400 text-sm mb-3 hover:text-gray-600">
              <ArrowLeft className="h-4 w-4 mr-1" /> Zurück
            </button>

            <div className="flex items-center gap-2 mb-3 pb-3 border-b border-gray-100">
              <span className="text-lg">{selectedProblem?.emoji}</span>
              <span className="text-sm font-medium text-gray-700">{selectedProblem?.label}</span>
            </div>

            <p className="font-bold text-gray-900 mb-1">Wo sind Sie?</p>
            <p className="text-gray-500 text-xs mb-3">Damit wir schnell bei Ihnen sind</p>

            <input
              type="text"
              placeholder="Adresse in München"
              value={leadData.address}
              onChange={(e) => setLeadData(prev => ({ ...prev, address: e.target.value }))}
              className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-gray-900 placeholder:text-gray-400 text-sm mb-2 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
            />

            <textarea
              placeholder="Was genau ist passiert? (optional)"
              value={leadData.description}
              onChange={(e) => setLeadData(prev => ({ ...prev, description: e.target.value }))}
              rows={2}
              className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-gray-900 placeholder:text-gray-400 text-sm mb-3 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent resize-none"
            />

            <div className="space-y-2">
              <Button
                className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold"
                onClick={() => handleContactAction('call')}
              >
                <Phone className="mr-2 h-4 w-4" />
                Direkt anrufen
              </Button>

              <Button
                variant="outline"
                className="w-full border-gray-200 text-gray-700 hover:bg-gray-50 hover:text-red-600 hover:border-red-200"
                onClick={() => handleContactAction('whatsapp')}
              >
                <MessageCircle className="mr-2 h-4 w-4" />
                Per WhatsApp senden
              </Button>
            </div>

            <p className="text-center text-gray-400 text-xs mt-3">
              Wir melden uns innerhalb von 5 Minuten
            </p>
          </div>
        )}

        {/* Demo CTA - After funnel completion */}
        {step === 'demo-cta' && (
          <div className="p-4 pt-5">
            <div className="text-center mb-4">
              <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-3">
                <Sparkles className="h-7 w-7 text-primary" />
              </div>
              <p className="font-bold text-gray-900 text-lg">Beeindruckt?</p>
              <p className="text-gray-500 text-sm mt-1">
                Das war eine Demo. So könnte ein Notfall-Funnel für <strong>Ihr</strong> Unternehmen aussehen.
              </p>
            </div>

            <div className="bg-primary/5 rounded-xl p-3 mb-4">
              <p className="text-xs text-gray-600">
                ✓ Qualifizierte Leads direkt ins CRM<br/>
                ✓ WhatsApp & Anruf Integration<br/>
                ✓ Automatische Priorisierung
              </p>
            </div>

            <Button
              onClick={() => setStep('demo-form')}
              className="w-full bg-primary hover:bg-primary/90 text-white font-semibold"
            >
              Das will ich auch!
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>

            <button
              onClick={handleDismiss}
              className="w-full text-gray-400 text-sm mt-3 hover:text-gray-600"
            >
              Nein danke, nur schauen
            </button>
          </div>
        )}

        {/* Demo Form - Capture business info */}
        {step === 'demo-form' && (
          <div className="p-4 pt-5">
            <button onClick={goBack} className="flex items-center text-gray-400 text-sm mb-3 hover:text-gray-600">
              <ArrowLeft className="h-4 w-4 mr-1" /> Zurück
            </button>

            <p className="font-bold text-gray-900 mb-1">Erzählen Sie uns von Ihrem Business</p>
            <p className="text-gray-500 text-xs mb-3">Wir melden uns für ein unverbindliches Gespräch</p>

            <div className="space-y-2">
              <input
                type="text"
                placeholder="Firmenname *"
                value={demoLead.businessName}
                onChange={(e) => setDemoLead(prev => ({ ...prev, businessName: e.target.value }))}
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-gray-900 placeholder:text-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />

              <select
                value={demoLead.businessType}
                onChange={(e) => setDemoLead(prev => ({ ...prev, businessType: e.target.value }))}
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              >
                <option value="">Branche wählen</option>
                {businessTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>

              <input
                type="text"
                placeholder="Ihr Name *"
                value={demoLead.contactName}
                onChange={(e) => setDemoLead(prev => ({ ...prev, contactName: e.target.value }))}
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-gray-900 placeholder:text-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />

              <input
                type="tel"
                placeholder="Telefon *"
                value={demoLead.phone}
                onChange={(e) => setDemoLead(prev => ({ ...prev, phone: e.target.value }))}
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-gray-900 placeholder:text-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />

              <input
                type="email"
                placeholder="E-Mail (optional)"
                value={demoLead.email}
                onChange={(e) => setDemoLead(prev => ({ ...prev, email: e.target.value }))}
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-gray-900 placeholder:text-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>

            <Button
              onClick={handleDemoSubmit}
              disabled={isSubmitting || !demoLead.businessName || !demoLead.contactName || !demoLead.phone}
              className="w-full bg-primary hover:bg-primary/90 text-white font-semibold mt-3"
            >
              {isSubmitting ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <>
                  Absenden
                  <ChevronRight className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>

            <p className="text-center text-gray-400 text-xs mt-3">
              Keine Werbung, nur ein persönliches Gespräch
            </p>
          </div>
        )}

        {/* Demo Success */}
        {step === 'demo-success' && (
          <div className="p-4 pt-5 text-center">
            <div className="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-3">
              <Check className="h-7 w-7 text-green-600" />
            </div>
            <p className="font-bold text-gray-900 text-lg">Vielen Dank!</p>
            <p className="text-gray-500 text-sm mt-1 mb-4">
              Wir melden uns innerhalb von 24 Stunden bei Ihnen.
            </p>

            <Button
              onClick={handleDismiss}
              variant="outline"
              className="w-full"
            >
              Schließen
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
