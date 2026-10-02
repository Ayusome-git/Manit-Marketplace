import { ShieldCheck, Users, MapPin, Zap } from "lucide-react";

export function CampusTrust() {
  return (
    <section className="py-24 font-sans">
      <div className="container mx-auto px-4 sm:px-8 md:px-12 lg:px-32">
        <div className="bg-primary/5 rounded-[2.5rem] p-8 md:p-16 border border-primary/10 overflow-hidden relative">
          
          <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
            <ShieldCheck className="size-64" />
          </div>

          <div className="relative z-10 max-w-2xl">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground mb-4">
              Built for the MANIT community.
            </h2>
            <p className="text-lg text-muted-foreground mb-10 leading-relaxed">
              Buy and sell with students you can actually meet on campus. No shipping fees, no waiting times, just a local community.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6">
              <div className="flex items-start gap-3">
                <div className="size-6 rounded-full bg-primary/20 flex items-center justify-center shrink-0 mt-0.5">
                  <Users className="size-3.5 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground text-sm mb-1">MANIT student access</h4>
                  <p className="text-muted-foreground text-sm">Exclusive to verified students.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="size-6 rounded-full bg-primary/20 flex items-center justify-center shrink-0 mt-0.5">
                  <MapPin className="size-3.5 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground text-sm mb-1">Campus-focused</h4>
                  <p className="text-muted-foreground text-sm">Exchange items near your hostel.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="size-6 rounded-full bg-primary/20 flex items-center justify-center shrink-0 mt-0.5">
                  <Zap className="size-3.5 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground text-sm mb-1">Direct communication</h4>
                  <p className="text-muted-foreground text-sm">Real-time chat with buyers/sellers.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="size-6 rounded-full bg-primary/20 flex items-center justify-center shrink-0 mt-0.5">
                  <ShieldCheck className="size-3.5 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground text-sm mb-1">Safe transactions</h4>
                  <p className="text-muted-foreground text-sm">Meet in public campus areas.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
