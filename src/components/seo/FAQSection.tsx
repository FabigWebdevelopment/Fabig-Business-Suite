'use client'

import { AnimatedDiv } from '@/components/animations/AnimatedDiv'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { FAQSchema } from './SchemaMarkup'

interface FAQItem {
  question: string
  answer: string
}

interface FAQSectionProps {
  title?: string
  items: FAQItem[]
}

export function FAQSection({ title = 'Häufig gestellte Fragen', items }: FAQSectionProps) {
  return (
    <>
      <FAQSchema items={items} />

      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <AnimatedDiv animation="slideUp" className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">{title}</h2>
          </AnimatedDiv>

          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible defaultValue="item-0" className="space-y-4">
              {items.map((item, index) => (
                <AnimatedDiv
                  key={index}
                  animation="slideUp"
                  delay={index * 0.05}
                >
                  <AccordionItem
                    value={`item-${index}`}
                    className="bg-card border border-border rounded-xl px-6 shadow-sm hover:shadow-md transition-shadow data-[state=open]:shadow-lg"
                  >
                    <AccordionTrigger className="text-left font-bold text-lg py-6 hover:no-underline">
                      {item.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground leading-relaxed pb-6">
                      {item.answer}
                    </AccordionContent>
                  </AccordionItem>
                </AnimatedDiv>
              ))}
            </Accordion>
          </div>
        </div>
      </section>
    </>
  )
}
