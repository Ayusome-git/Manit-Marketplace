import { Search, MessageCircle, Handshake, CheckCircle } from "lucide-react";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";

export function HowItWorks() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  const steps = [
    {
      num: "01",
      title: "Discover",
      desc: "Browse listings from students around campus. Find exactly what you need.",
      icon: Search,
    },
    {
      num: "02",
      title: "Connect",
      desc: "Ask questions and negotiate prices securely through built-in chat.",
      icon: MessageCircle,
    },
    {
      num: "03",
      title: "Meet",
      desc: "Agree on a public place on campus to meet and inspect the item.",
      icon: Handshake,
    },
    {
      num: "04",
      title: "Exchange",
      desc: "Complete the transaction safely. No shipping fees or delays.",
      icon: CheckCircle,
    },
  ];

  return (
    <section className="py-32 bg-muted/20 border-y border-border/50 font-sans relative overflow-hidden" ref={containerRef}>
      <div className="container mx-auto px-4 sm:px-8 md:px-12 lg:px-32 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-24">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-6">How it works</h2>
          <p className="text-muted-foreground text-lg md:text-xl font-light">Your campus marketplace designed for safety and simplicity. Four easy steps.</p>
        </div>

        <div className="relative max-w-3xl mx-auto">
          {/* Timeline Background Line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-border/80 -translate-x-1/2" />
          
          {/* Timeline Animated Line */}
          <motion.div 
            className="absolute left-8 md:left-1/2 top-0 w-px bg-primary -translate-x-1/2 origin-top"
            style={{ height: lineHeight }}
          />

          <div className="space-y-24">
            {steps.map((step, idx) => (
              <TimelineStep key={step.num} step={step} idx={idx} scrollYProgress={scrollYProgress} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function TimelineStep({ step, idx, scrollYProgress }: { step: any, idx: number, scrollYProgress: any }) {
  const stepStart = idx * 0.25;
  const stepActive = stepStart + 0.1;
  
  const opacity = useTransform(scrollYProgress, [stepStart - 0.2, stepStart], [0.3, 1]);
  const scale = useTransform(scrollYProgress, [stepStart - 0.2, stepStart], [0.8, 1]);
  const iconBg = useTransform(scrollYProgress, [stepStart, stepActive], ["var(--muted)", "var(--primary)"]);
  const iconColor = useTransform(scrollYProgress, [stepStart, stepActive], ["var(--muted-foreground)", "var(--primary-foreground)"]);

  const isEven = idx % 2 === 0;

  return (
    <motion.div 
      className={`relative flex flex-col md:flex-row items-center gap-8 md:gap-0 ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'}`}
      style={{ opacity }}
    >
      {/* Icon Center */}
      <div className="absolute left-8 md:left-1/2 top-0 -translate-x-1/2 md:translate-y-4 z-10">
        <motion.div 
          className="size-16 rounded-full border-4 border-background flex items-center justify-center shadow-sm"
          style={{ backgroundColor: iconBg as any, scale }}
        >
          <motion.div style={{ color: iconColor as any }}>
            <step.icon className="size-6" />
          </motion.div>
        </motion.div>
      </div>

      {/* Content */}
      <div className={`w-full md:w-1/2 pl-24 md:pl-0 ${isEven ? 'md:pr-20 md:text-right' : 'md:pl-20 md:text-left'}`}>
        <div className="bg-card p-8 rounded-3xl border border-border/50 shadow-sm hover:shadow-md transition-shadow">
          <div className="text-sm font-bold text-primary mb-2 tracking-widest">{step.num}</div>
          <h3 className="text-2xl font-bold mb-3">{step.title}</h3>
          <p className="text-muted-foreground text-lg leading-relaxed font-light">{step.desc}</p>
        </div>
      </div>
    </motion.div>
  );
}
