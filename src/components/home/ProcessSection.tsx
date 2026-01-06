import { motion } from 'framer-motion';
import { useState } from 'react';
import { processSteps } from '@/data/products';
import { Palette, PenTool, Layers, Play, RefreshCw, CheckCircle, X } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose } from '@/components/ui/dialog';

const iconMap: Record<string, React.ElementType> = {
  Palette,
  PenTool,
  Layers,
  Play,
  RefreshCw,
  CheckCircle,
};

export default function ProcessSection() {
  const [selectedStep, setSelectedStep] = useState<typeof processSteps[0] | null>(null);

  return (
    <section className="section-padding bg-background overflow-hidden">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl text-foreground mb-4">
            Our Creative Process
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            From concept to delivery, we follow a meticulous process to ensure your invitation is perfect.
          </p>
        </motion.div>

        {/* Horizontal scroll process */}
        <div className="relative">
          {/* Connection line */}
          <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-primary/30 to-transparent hidden md:block" />

          <div className="flex overflow-x-auto gap-6 pb-8 scrollbar-hide snap-x snap-mandatory">
            {processSteps.map((step, index) => {
              const IconComponent = iconMap[step.icon];
              
              return (
                <motion.div
                  key={step.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="flex-none w-[280px] md:w-[300px] snap-center"
                >
                  <button
                    onClick={() => setSelectedStep(step)}
                    className="w-full text-left group"
                  >
                    <div className="relative bg-card border border-border rounded-2xl p-6 h-full transition-all duration-300 hover:border-primary hover:shadow-lg hover:shadow-primary/10 glow-border">
                      {/* Step number */}
                      <div className="absolute -top-4 left-6 w-8 h-8 rounded-full bg-gradient-to-r from-primary to-primary-glow flex items-center justify-center text-primary-foreground text-sm font-bold">
                        {step.id}
                      </div>

                      {/* Icon */}
                      <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                        {IconComponent && <IconComponent className="w-7 h-7 text-primary" />}
                      </div>

                      {/* Content */}
                      <h3 className="font-semibold text-lg text-foreground mb-2 group-hover:text-primary transition-colors">
                        {step.title}
                      </h3>
                      <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                        {step.description}
                      </p>

                      {/* Turnaround */}
                      <div className="flex items-center gap-2 text-xs text-primary font-medium">
                        <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                        {step.turnaround}
                      </div>
                    </div>
                  </button>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Modal */}
        <Dialog open={!!selectedStep} onOpenChange={() => setSelectedStep(null)}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="font-heading text-2xl flex items-center gap-3">
                {selectedStep && iconMap[selectedStep.icon] && (
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    {(() => {
                      const Icon = iconMap[selectedStep.icon];
                      return <Icon className="w-5 h-5 text-primary" />;
                    })()}
                  </div>
                )}
                <span>{selectedStep?.title}</span>
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <p className="text-muted-foreground">
                {selectedStep?.description}
              </p>
              <div className="flex items-center gap-2 bg-primary/10 text-primary px-4 py-3 rounded-lg">
                <span className="font-semibold">Typical Turnaround:</span>
                <span>{selectedStep?.turnaround}</span>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
}
