import React from 'react';
import { ServiceWorkflowStep } from '@/types';
import { CheckCircle2, Sparkles } from 'lucide-react';

interface WorkflowTimelineProps {
  steps: ServiceWorkflowStep[];
}

export default function WorkflowTimeline({ steps }: WorkflowTimelineProps) {
  return (
    <div className="relative">
      {/* Desktop Connecting Line */}
      <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-sage/40 -translate-y-12 z-0" />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 relative z-10">
        {steps.map((step, idx) => (
          <div
            key={idx}
            className="flex flex-col bg-softwhite rounded-xl p-6 border border-sage/40 shadow-sm hover:shadow-md transition-shadow relative"
          >
            {/* Step Number Badge */}
            <div className="flex items-center justify-between mb-4">
              <span className="w-10 h-10 rounded-full bg-forest text-cream font-serif text-sm font-semibold flex items-center justify-center border-2 border-sage/40 shadow-sm">
                {step.stepNumber}
              </span>
              <span className="text-[10px] uppercase tracking-widest font-semibold text-garden bg-cream px-2 py-0.5 rounded">
                Fase {idx + 1}
              </span>
            </div>

            {/* Title & Subtitle */}
            <h4 className="font-serif text-lg font-medium text-charcoal mb-1 leading-snug">
              {step.title}
            </h4>
            <p className="text-xs text-garden font-medium mb-3">
              {step.subtitle}
            </p>

            {/* Description */}
            <p className="text-xs text-charcoal/70 leading-relaxed mb-4 flex-grow">
              {step.description}
            </p>

            {/* Deliverable Badge */}
            <div className="pt-3 border-t border-sage/30 mt-auto">
              <div className="flex items-start gap-1.5 text-[11px] text-charcoal font-medium">
                <CheckCircle2 className="w-3.5 h-3.5 text-garden flex-shrink-0 mt-0.5" />
                <span className="leading-tight">{step.keyDeliverable}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
