'use client'

import { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog'
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
} from '@/components/ui/drawer'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  AlertTriangle,
  Phone,
  ArrowLeft,
  ArrowRight,
  Check,
  Loader2,
  Zap,
  Flame,
  HelpCircle,
  Clock,
  PhoneCall,
  AlertCircle,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { useMediaQuery } from '@/hooks/use-media-query'

interface EmergencyFunnelModalProps {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  phone: string
  whatsapp: string
}

type Step = 'problem' | 'contact' | 'fire-warning' | 'action' | 'success'

interface EmergencyLeadData {
  problem: string
  problemLabel: string
  name: string
  phone: string
  address: string
  description: string
  preferCallback: boolean
}

const problems = [
  {
    id: 'kein-strom',
    label: 'Kein Strom',
    subtext: 'Teilweise oder komplett',
    icon: Zap,
    priority: 'high',
  },
  {
    id: 'funken',
    label: 'Funken / Knall',
    subtext: 'An Steckdose oder Gerät',
    icon: AlertTriangle,
    priority: 'urgent',
  },
  {
    id: 'brandgeruch',
    label: 'Brandgeruch / Rauch',
    subtext: 'Aus Steckdose oder Wand',
    icon: Flame,
    priority: 'critical',
  },
  {
    id: 'anderes',
    label: 'Anderes Problem',
    subtext: 'Beschreiben Sie es uns',
    icon: HelpCircle,
    priority: 'normal',
  },
]

export function EmergencyFunnelModal({
  isOpen,
  onOpenChange,
  phone,
  whatsapp,
}: EmergencyFunnelModalProps) {
  const [step, setStep] = useState<Step>('problem')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [leadData, setLeadData] = useState<EmergencyLeadData>({
    problem: '',
    problemLabel: '',
    name: '',
    phone: '',
    address: '',
    description: '',
    preferCallback: false,
  })
  const isDesktop = useMediaQuery('(min-width: 768px)')

  const selectedProblem = problems.find((p) => p.id === leadData.problem)

  const resetAndClose = () => {
    setStep('problem')
    setLeadData({
      problem: '',
      problemLabel: '',
      name: '',
      phone: '',
      address: '',
      description: '',
      preferCallback: false,
    })
    onOpenChange(false)
  }

  const handleProblemSelect = (problemId: string) => {
    const problem = problems.find((p) => p.id === problemId)
    setLeadData((prev) => ({
      ...prev,
      problem: problemId,
      problemLabel: problem?.label || '',
    }))

    if (problem?.priority === 'critical') {
      setStep('fire-warning')
    } else {
      setStep('contact')
    }
  }

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!leadData.name || !leadData.phone || !leadData.address) return
    setStep('action')
  }

  const handleActionChoice = async (preferCallback: boolean) => {
    setLeadData((prev) => ({ ...prev, preferCallback }))
    setIsSubmitting(true)

    try {
      const response = await fetch('/api/emergency-lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...leadData,
          preferCallback,
          source: 'Emergency Funnel',
        }),
      })

      if (response.ok) {
        setStep('success')

        // If user chose to call directly, open phone after short delay
        if (!preferCallback) {
          setTimeout(() => {
            window.location.href = `tel:${phone.replace(/\s/g, '')}`
          }, 500)
        }
      }
    } catch (error) {
      console.error('Failed to submit emergency lead:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const goBack = () => {
    if (step === 'contact') setStep('problem')
    else if (step === 'fire-warning') setStep('problem')
    else if (step === 'action') setStep('contact')
  }

  // Progress indicator
  const getProgress = () => {
    switch (step) {
      case 'problem':
        return 25
      case 'fire-warning':
        return 25
      case 'contact':
        return 50
      case 'action':
        return 75
      case 'success':
        return 100
      default:
        return 0
    }
  }

  // Shared header content
  const headerContent = (
    <div className="flex items-center gap-3">
      <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center">
        <AlertTriangle className="h-6 w-6 text-red-500" />
      </div>
      <div className="text-left">
        <div className="text-xl font-bold">Notfall melden</div>
        <div className="text-sm text-muted-foreground">Wir sind in 60 Min. bei Ihnen</div>
      </div>
    </div>
  )

  // Progress bar
  const progressBar = (
    <div className="h-1 bg-muted rounded-full overflow-hidden mt-4">
      <div
        className="h-full bg-primary transition-all duration-300"
        style={{ width: `${getProgress()}%` }}
      />
    </div>
  )

  // Shared funnel content
  const funnelContent = (
    <>
      {/* Step: Problem Selection */}
      {step === 'problem' && (
        <div className="space-y-4">
          <div>
            <h3 className="font-semibold text-lg">Was ist passiert?</h3>
            <p className="text-muted-foreground text-sm">
              Wählen Sie das zutreffende Problem
            </p>
          </div>

          <div className="space-y-2">
            {problems.map((problem) => {
              const Icon = problem.icon
              return (
                <button
                  key={problem.id}
                  onClick={() => handleProblemSelect(problem.id)}
                  className={cn(
                    'w-full flex items-center gap-4 p-4 rounded-xl border transition-all text-left',
                    'hover:border-primary hover:shadow-md',
                    'border-border bg-background'
                  )}
                >
                  <div className="w-12 h-12 rounded-xl bg-muted flex items-center justify-center flex-shrink-0">
                    <Icon
                      className={cn(
                        'h-6 w-6',
                        problem.priority === 'critical'
                          ? 'text-red-500'
                          : problem.priority === 'urgent'
                          ? 'text-orange-500'
                          : 'text-muted-foreground'
                      )}
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="font-medium block">{problem.label}</span>
                    <span className="text-sm text-muted-foreground">{problem.subtext}</span>
                  </div>
                  <ArrowRight className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                </button>
              )
            })}
          </div>
        </div>
      )}

      {/* Step: Fire Warning */}
      {step === 'fire-warning' && (
        <div className="space-y-4">
          <div className="rounded-xl border p-4 shadow-sm">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center flex-shrink-0">
                <AlertCircle className="h-5 w-5 text-red-500" />
              </div>
              <div>
                <p className="font-bold">Wichtiger Hinweis!</p>
                <p className="text-muted-foreground text-sm mt-1">
                  Bei akutem Brandgeruch oder sichtbarem Rauch: Verlassen Sie sofort den Raum
                  und rufen Sie die <strong className="text-foreground">Feuerwehr 112</strong> an.
                </p>
              </div>
            </div>
          </div>

          <p className="text-muted-foreground text-sm">
            Kein akuter Brand, aber Sie brauchen trotzdem Hilfe? Wir sind für Sie da.
          </p>

          <div className="flex gap-3">
            <Button variant="outline" onClick={goBack} className="flex-1">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Zurück
            </Button>
            <Button onClick={() => setStep('contact')} className="flex-1">
              Weiter
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      )}

      {/* Step: Contact Info */}
      {step === 'contact' && (
        <form onSubmit={handleContactSubmit} className="space-y-4">
          <button
            type="button"
            onClick={goBack}
            className="flex items-center text-muted-foreground text-sm hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4 mr-1" /> Zurück
          </button>

          {/* Selected problem badge */}
          <div className="flex items-center gap-2 p-3 bg-muted/50 rounded-lg border">
            {selectedProblem && (
              <selectedProblem.icon className={cn(
                'h-4 w-4',
                selectedProblem.priority === 'critical' ? 'text-red-500' :
                selectedProblem.priority === 'urgent' ? 'text-orange-500' : 'text-muted-foreground'
              )} />
            )}
            <span className="text-sm font-medium">{selectedProblem?.label}</span>
          </div>

          <div>
            <h3 className="font-semibold text-lg">Ihre Kontaktdaten</h3>
            <p className="text-muted-foreground text-sm">
              Damit wir Sie schnellstmöglich erreichen können
            </p>
          </div>

          <div className="space-y-3">
            <div>
              <Label htmlFor="name">Ihr Name *</Label>
              <Input
                id="name"
                placeholder="Max Mustermann"
                value={leadData.name}
                onChange={(e) => setLeadData((prev) => ({ ...prev, name: e.target.value }))}
                required
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="phone">Telefonnummer *</Label>
              <Input
                id="phone"
                type="tel"
                placeholder="+49 170 1234567"
                value={leadData.phone}
                onChange={(e) => setLeadData((prev) => ({ ...prev, phone: e.target.value }))}
                required
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="address">Adresse in München *</Label>
              <Input
                id="address"
                placeholder="Musterstraße 123, 80331 München"
                value={leadData.address}
                onChange={(e) => setLeadData((prev) => ({ ...prev, address: e.target.value }))}
                required
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="description">Was genau ist passiert? (optional)</Label>
              <textarea
                id="description"
                placeholder="Beschreiben Sie kurz die Situation..."
                value={leadData.description}
                onChange={(e) =>
                  setLeadData((prev) => ({ ...prev, description: e.target.value }))
                }
                rows={2}
                className="mt-1 w-full px-3 py-2 border border-input rounded-md text-sm resize-none bg-background focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
          </div>

          <Button
            type="submit"
            className="w-full"
            disabled={!leadData.name || !leadData.phone || !leadData.address}
          >
            Weiter
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </form>
      )}

      {/* Step: Action Choice */}
      {step === 'action' && (
        <div className="space-y-4">
          <button
            type="button"
            onClick={goBack}
            className="flex items-center text-muted-foreground text-sm hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4 mr-1" /> Zurück
          </button>

          <div>
            <h3 className="font-semibold text-lg">Wie möchten Sie kontaktiert werden?</h3>
            <p className="text-muted-foreground text-sm">
              Wählen Sie die für Sie passende Option
            </p>
          </div>

          <div className="space-y-3">
            {/* Option 1: Call directly */}
            <button
              onClick={() => handleActionChoice(false)}
              disabled={isSubmitting}
              className={cn(
                'w-full flex items-center gap-4 p-4 rounded-xl border transition-all text-left',
                'hover:border-primary hover:shadow-md',
                'border-border bg-background',
                isSubmitting && 'opacity-50 cursor-not-allowed'
              )}
            >
              <div className="w-12 h-12 rounded-xl bg-muted flex items-center justify-center flex-shrink-0">
                <Phone className="h-6 w-6 text-red-500" />
              </div>
              <div className="flex-1">
                <span className="font-semibold block">Ich rufe jetzt an</span>
                <span className="text-sm text-muted-foreground">
                  Direkt mit unserem Notdienst sprechen
                </span>
              </div>
              {isSubmitting ? (
                <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
              ) : (
                <ArrowRight className="h-5 w-5 text-muted-foreground" />
              )}
            </button>

            {/* Option 2: Request callback */}
            <button
              onClick={() => handleActionChoice(true)}
              disabled={isSubmitting}
              className={cn(
                'w-full flex items-center gap-4 p-4 rounded-xl border transition-all text-left',
                'hover:border-primary hover:shadow-md',
                'border-border bg-background',
                isSubmitting && 'opacity-50 cursor-not-allowed'
              )}
            >
              <div className="w-12 h-12 rounded-xl bg-muted flex items-center justify-center flex-shrink-0">
                <PhoneCall className="h-6 w-6 text-primary" />
              </div>
              <div className="flex-1">
                <span className="font-semibold block">Bitte rufen Sie mich an</span>
                <span className="text-sm text-muted-foreground">
                  Wir melden uns innerhalb von 5 Minuten
                </span>
              </div>
              {isSubmitting ? (
                <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
              ) : (
                <ArrowRight className="h-5 w-5 text-muted-foreground" />
              )}
            </button>
          </div>

          <p className="text-center text-muted-foreground text-xs flex items-center justify-center gap-1">
            <Clock className="h-3 w-3" />
            24/7 erreichbar · Festpreise · Keine versteckten Kosten
          </p>
        </div>
      )}

      {/* Step: Success */}
      {step === 'success' && (
        <div className="text-center space-y-4 py-2">
          <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mx-auto">
            <Check className="h-8 w-8 text-green-500" />
          </div>

          <div>
            <h3 className="font-semibold text-lg">
              {leadData.preferCallback ? 'Wir rufen Sie gleich an!' : 'Anfrage eingegangen!'}
            </h3>
            <p className="text-muted-foreground text-sm mt-1">
              {leadData.preferCallback
                ? 'Ein Mitarbeiter meldet sich innerhalb von 5 Minuten bei Ihnen.'
                : 'Ihr Notfall wurde registriert. Rufen Sie uns jetzt an:'}
            </p>
          </div>

          {!leadData.preferCallback && (
            <Button asChild size="lg">
              <a href={`tel:${phone.replace(/\s/g, '')}`}>
                <Phone className="mr-2 h-4 w-4" />
                {phone}
              </a>
            </Button>
          )}

          <Button variant="outline" onClick={resetAndClose} className="w-full mt-2">
            Schließen
          </Button>
        </div>
      )}
    </>
  )

  // Desktop: Dialog
  if (isDesktop) {
    return (
      <Dialog open={isOpen} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            {headerContent}
            <DialogTitle className="sr-only">Notfall melden</DialogTitle>
            <DialogDescription className="sr-only">
              Melden Sie Ihren elektrischen Notfall
            </DialogDescription>
          </DialogHeader>
          {progressBar}
          <div className="pt-4">
            {funnelContent}
          </div>
        </DialogContent>
      </Dialog>
    )
  }

  // Mobile: Drawer
  return (
    <Drawer open={isOpen} onOpenChange={onOpenChange}>
      <DrawerContent className="max-h-[90vh]">
        <DrawerHeader className="pb-2">
          {headerContent}
          <DrawerTitle className="sr-only">Notfall melden</DrawerTitle>
          <DrawerDescription className="sr-only">
            Melden Sie Ihren elektrischen Notfall
          </DrawerDescription>
          {progressBar}
        </DrawerHeader>
        <div className="px-4 pb-6 overflow-y-auto">
          {funnelContent}
        </div>
      </DrawerContent>
    </Drawer>
  )
}
