import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { toast } from "@/hooks/use-toast";
import {
  Truck, Boxes, Building2, Home, Sparkles, ShieldCheck,
  Phone, Mail, MapPin, Star, Clock, Award, CheckCircle2, ArrowRight, Menu, X,
} from "lucide-react";
import heroImg from "@/assets/hero-truck.jpg";

const PHONE = "702-714-7560";
const PHONE_TEL = "+17027147560";
const EMAIL = "info@graycollarmoving.com";

const services = [
  { icon: Truck, title: "Local Moves", desc: "Same-day and scheduled moves anywhere in Las Vegas." },
  { icon: Building2, title: "Apartment & Condo", desc: "High-rise specialists — elevator scheduling and tight turns handled." },
  { icon: Boxes, title: "Packing Services", desc: "Full or partial packing with quality materials and care." },
  { icon: Home, title: "Full Service Moves", desc: "Packing, moving, and unpacking — we handle everything from start to finish." },
  { icon: Sparkles, title: "Office Relocation", desc: "After-hours commercial moves to keep your business running." },
  { icon: ShieldCheck, title: "Long Distance", desc: "Licensed interstate moves with transparent flat-rate pricing." },
];

const areas = [
  "Summerlin", "Henderson", "Green Valley", "North Las Vegas", "The Lakes",
  "Spring Valley", "Anthem", "Centennial Hills", "Paradise", "Boulder City",
  "Mountain's Edge", "Enterprise",
];

const reviews = [
  { name: "Maria G.", area: "Summerlin", text: "On time, careful with our furniture, and finished an hour early. The team was professional from the quote to the last box." },
  { name: "Derek P.", area: "Henderson", text: "Moved a three-bedroom in 110° heat without a single complaint. Best moving experience I've ever had in Vegas." },
  { name: "Aisha R.", area: "Downtown", text: "Quote matched the final invoice to the dollar. No surprises, no nonsense. Highly recommend." },
  { name: "Jonathan K.", area: "Green Valley", text: "Packed our kitchen better than we ever could have. Zero broken items. Worth every penny." },
];

const faqs = [
  { q: "How quickly can you schedule my move?", a: "We can often accommodate next-day moves and even same-day in some cases. Weekends book out 1–2 weeks in advance." },
  { q: "Do you charge by the hour or flat-rate?", a: "Local moves are typically hourly with a two-hour minimum. Long-distance moves are quoted as transparent flat rates." },
  { q: "What's not included in a standard quote?", a: "Disconnecting appliances with gas lines, hoisting items over balconies, and specialty items like pianos or safes require an add-on quote." },
  { q: "Do you provide boxes and packing materials?", a: "Yes. Plastic wrap, blankets, paper, tape, wardrobe boxes are included in the hourly rate. We sell new boxes." },
];

export default function Index() {
  const [open, setOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [size, setSize] = useState("");

  const handleQuote = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const form = e.currentTarget;
      const formData = new FormData(form);
      formData.set("size", size);
      await fetch("https://formsubmit.co/ajax/info@graycollarmoving.com", {
        method: "POST",
        body: formData,
      });
      form.reset();
      setSize("");
      toast({
        title: "Quote request received",
        description: "We'll call you within one business hour with your estimate.",
      });
    } catch {
      toast({
        title: "Something went wrong",
        description: "Please call us directly and we'll help you right away.",
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  const navLinks = [
    ["Services", "services"], ["Quote", "quote"], ["Areas", "areas"],
    ["Reviews", "reviews"], ["FAQ", "faq"], ["Contact", "contact"],
  ] as const;

  return (
    <div className="min-h-screen bg-background">
      {/* NAV */}
      <header className="sticky top-0 z-40 backdrop-blur-md bg-background/85 border-b border-border">
        <div className="container flex h-16 items-center justify-between">
          <a href="#top" className="flex items-center gap-2">
            <div className="h-9 w-9 rounded-md bg-gradient-sunset grid place-items-center shadow-glow">
              <Truck className="h-5 w-5 text-primary-foreground" />
            </div>
            <div className="leading-tight">
              <div className="font-display text-lg uppercase tracking-wide">GC Moving</div>
            </div>
          </a>
          <nav className="hidden md:flex items-center gap-7">
            {navLinks.map(([label, id]) => (
              <a key={id} href={`#${id}`} className="text-sm font-medium text-foreground/80 hover:text-accent transition-smooth">
                {label}
              </a>
            ))}
          </nav>
          <div className="hidden md:flex items-center gap-3">
            <a href={`tel:${PHONE_TEL}`} className="text-sm font-semibold hover:text-accent transition-smooth">{PHONE}</a>
            <Button asChild className="bg-gradient-sunset hover:opacity-90 text-primary-foreground font-semibold shadow-glow">
              <a href="#quote">Free Quote</a>
            </Button>
          </div>
          <button className="md:hidden p-2" onClick={() => setOpen(!open)} aria-label="Menu">
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
        {open && (
          <div className="md:hidden border-t border-border bg-background">
            <nav className="container py-4 flex flex-col gap-3">
              {navLinks.map(([label, id]) => (
                <a key={id} href={`#${id}`} onClick={() => setOpen(false)} className="py-2 text-sm font-medium">
                  {label}
                </a>
              ))}
              <a href={`tel:${PHONE_TEL}`} className="py-2 font-semibold text-accent">{PHONE}</a>
            </nav>
          </div>
        )}
      </header>

      <main id="top">
        {/* HERO */}
        <section className="relative min-h-[88vh] flex items-center overflow-hidden">
          <img
            src={heroImg}
            alt="Las Vegas Movers truck on the Las Vegas Strip at sunset"
            width={1920}
            height={1080}
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-hero" style={{ background: "linear-gradient(180deg, hsl(220 60% 8% / 0.35) 0%, hsl(220 60% 8% / 0.9) 100%)" }} />
          <div className="container relative z-10 py-24 md:py-32 max-w-3xl">
            <h1 className="font-display text-5xl sm:text-6xl md:text-7xl uppercase text-primary-foreground leading-[0.95] text-balance">
              Moving day,<br />
              <span>done right.</span>
            </h1>
            <p className="mt-6 text-lg md:text-xl text-primary-foreground/85 max-w-xl">
              Friendly movers, built for Las Vegas. Get an honest flat-rate quote in minutes — no upsells, no surprises.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <Button asChild size="lg" className="bg-gradient-sunset hover:opacity-90 text-primary-foreground font-semibold h-14 px-8 text-base shadow-glow">
                <a href="#quote">Get My Free Quote <ArrowRight className="ml-2 h-4 w-4" /></a>
              </Button>
              <Button asChild size="lg" variant="outline" className="h-14 px-8 text-base bg-transparent border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground hover:text-primary">
                <a href={`tel:${PHONE_TEL}`}><Phone className="mr-2 h-4 w-4" />{PHONE}</a>
              </Button>
            </div>
            <div className="mt-10 grid grid-cols-3 gap-6 max-w-md">
              {[
                [Award, "Licensed & Insured"],
                [Clock, "On-Time Promise"],
                [ShieldCheck, "No Hidden Fees"],
              ].map(([Icon, label], i) => (
                <div key={i} className="flex flex-col items-start gap-1.5 text-primary-foreground/90">
                  <Icon className="h-5 w-5 text-accent" />
                  <span className="text-xs font-medium">{label as string}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SERVICES */}
        <section id="services" className="py-20 md:py-28">
          <div className="container">
            <div className="max-w-2xl mb-14">
              <div className="text-xs uppercase tracking-[0.25em] text-accent font-semibold mb-3">What we do</div>
              <h2 className="font-display text-4xl md:text-5xl uppercase text-balance">Every kind of move, handled with care.</h2>
              <p className="mt-4 text-muted-foreground text-lg">From a studio in Spring Valley to a multi-floor office in Summerlin — our crews show up prepared, professional, and on time.</p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {services.map(({ icon: Icon, title, desc }) => (
                <div key={title} className="group p-7 rounded-xl bg-card border border-border shadow-card hover:shadow-elegant hover:-translate-y-1 transition-smooth">
                  <div className="h-12 w-12 rounded-lg bg-gradient-sunset grid place-items-center mb-5 shadow-glow group-hover:scale-110 transition-smooth">
                    <Icon className="h-6 w-6 text-primary-foreground" />
                  </div>
                  <h3 className="font-display text-xl uppercase mb-2">{title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* QUOTE */}
        <section id="quote" className="py-20 md:py-28 bg-gradient-night text-primary-foreground relative overflow-hidden">
          <div className="absolute -top-20 -right-20 h-80 w-80 rounded-full bg-accent/20 blur-3xl" />
          <div className="container relative grid lg:grid-cols-5 gap-12 items-start">
            <div className="lg:col-span-2">
              <div className="text-xs uppercase tracking-[0.25em] text-accent font-semibold mb-3">Free quote</div>
              <h2 className="font-display text-4xl md:text-5xl uppercase text-balance">Get an honest estimate in minutes.</h2>
              <p className="mt-4 text-primary-foreground/75 text-lg">Fill out the form and we'll call you within one business hour with a flat-rate quote — no obligation, no spam.</p>
              <ul className="mt-8 space-y-3">
                {["No-cost in-home or virtual walkthrough", "Transparent flat-rate pricing"].map(t => (
                  <li key={t} className="flex items-center gap-3 text-primary-foreground/90">
                    <CheckCircle2 className="h-5 w-5 text-accent flex-shrink-0" />
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
            </div>
            <form onSubmit={handleQuote} className="lg:col-span-3 bg-card text-card-foreground p-6 md:p-8 rounded-2xl shadow-elegant space-y-5">
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full name</Label>
                  <Input id="name" name="name" required placeholder="Jane Doe" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input id="phone" name="phone" type="tel" required placeholder="(702) 555-0123" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" name="email" type="email" required placeholder="you@email.com" />
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="from">Moving from</Label>
                  <Input id="from" name="from" required placeholder="ZIP or neighborhood" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="to">Moving to</Label>
                  <Input id="to" name="to" required placeholder="ZIP or neighborhood" />
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="size">Home size</Label>
                  <Select value={size} onValueChange={setSize}>
                    <SelectTrigger id="size"><SelectValue placeholder="Select size" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="studio">Studio</SelectItem>
                      <SelectItem value="1br">1 Bedroom</SelectItem>
                      <SelectItem value="2br">2 Bedroom</SelectItem>
                      <SelectItem value="3br">3 Bedroom</SelectItem>
                      <SelectItem value="4br+">4+ Bedroom</SelectItem>
                      <SelectItem value="office">Office / Commercial</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="date">Move date</Label>
                  <Input id="date" name="date" type="date" required />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="notes">Anything else?</Label>
                <Textarea id="notes" name="notes" rows={3} placeholder="Stairs, elevator, piano, etc." />
              </div>
              <Button type="submit" disabled={submitting} className="w-full h-12 bg-gradient-sunset hover:opacity-90 text-primary-foreground font-semibold text-base shadow-glow">
                {submitting ? "Sending…" : "Request My Quote"}
              </Button>
              <p className="text-xs text-muted-foreground text-center">By submitting you agree to be contacted about your move. We never share your info.</p>
            </form>
          </div>
        </section>

        {/* AREAS */}
        <section id="areas" className="py-20 md:py-28">
          <div className="container">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <div className="text-xs uppercase tracking-[0.25em] text-accent font-semibold mb-3">Service areas</div>
                <h2 className="font-display text-4xl md:text-5xl uppercase text-balance">We cover all of Las Vegas.</h2>
                <p className="mt-4 text-muted-foreground text-lg">Locally owned and operated since day one. If you're moving within Clark County, we've got you.</p>
                <Button asChild variant="outline" className="mt-6 border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                  <a href="#quote">Check My Address <ArrowRight className="ml-2 h-4 w-4" /></a>
                </Button>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {areas.map(a => (
                  <div key={a} className="px-4 py-3 rounded-lg bg-secondary border border-border text-sm font-medium flex items-center gap-2">
                    <MapPin className="h-3.5 w-3.5 text-accent flex-shrink-0" />
                    {a}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* REVIEWS */}
        <section id="reviews" className="py-20 md:py-28 bg-secondary/40">
          <div className="container">
            <div className="max-w-2xl mb-14">
              <div className="text-xs uppercase tracking-[0.25em] text-accent font-semibold mb-3">Reviews</div>
              <h2 className="font-display text-4xl md:text-5xl uppercase text-balance">Vegas locals trust us with their move.</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-5">
              {reviews.map(r => (
                <figure key={r.name} className="p-7 rounded-xl bg-card border border-border shadow-card">
                  <div className="flex gap-0.5 mb-4">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-accent text-accent" />
                    ))}
                  </div>
                  <blockquote className="text-foreground/90 leading-relaxed">"{r.text}"</blockquote>
                  <figcaption className="mt-5 text-sm">
                    <div className="font-semibold">{r.name}</div>
                    <div className="text-muted-foreground">{r.area}</div>
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="py-20 md:py-28">
          <div className="container max-w-3xl">
            <div className="text-xs uppercase tracking-[0.25em] text-accent font-semibold mb-3">FAQ</div>
            <h2 className="font-display text-4xl md:text-5xl uppercase text-balance mb-10">Questions, answered.</h2>
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((f, i) => (
                <AccordionItem key={i} value={`item-${i}`}>
                  <AccordionTrigger className="text-left font-semibold text-base hover:text-accent">{f.q}</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground text-base leading-relaxed">{f.a}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>

        {/* CONTACT */}
        <section id="contact" className="py-20 md:py-28 bg-gradient-night text-primary-foreground">
          <div className="container grid md:grid-cols-3 gap-8">
            <div className="md:col-span-1">
              <div className="text-xs uppercase tracking-[0.25em] text-accent font-semibold mb-3">Contact</div>
              <h2 className="font-display text-4xl uppercase text-balance">Talk to a real human.</h2>
              <p className="mt-4 text-primary-foreground/75">Office hours Mon–Sun, 9am–7pm PT. After-hours quotes by email.</p>
            </div>
            <div className="md:col-span-2 grid sm:grid-cols-2 gap-5">
              {[
                { icon: Phone, label: "Call", value: PHONE, href: `tel:${PHONE_TEL}` },
                { icon: Mail, label: "Email", value: EMAIL, href: `mailto:${EMAIL}` },
              ].map(({ icon: Icon, label, value, href }) => (
                <a key={label} href={href} className="p-6 rounded-xl bg-primary-foreground/5 border border-primary-foreground/10 hover:border-accent/50 transition-smooth block">
                  <Icon className="h-5 w-5 text-accent mb-4" />
                  <div className="text-xs uppercase tracking-wider text-primary-foreground/60 mb-1">{label}</div>
                  <div className="font-semibold whitespace-pre-line">{value}</div>
                </a>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-border py-8">
        <div className="container flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-muted-foreground">
          <div>© {new Date().getFullYear()} GC Moving · NV Lic. #00000000</div>
          <div>Built with care in Las Vegas, NV</div>
        </div>
      </footer>

      {/* Sticky mobile CTA */}
      <div className="fixed bottom-0 inset-x-0 z-40 md:hidden border-t border-border bg-background/95 backdrop-blur p-3 flex gap-2 shadow-elegant">
        <Button asChild variant="outline" className="flex-1 h-12 border-primary text-primary">
          <a href={`tel:${PHONE_TEL}`}><Phone className="mr-2 h-4 w-4" />Call</a>
        </Button>
        <Button asChild className="flex-1 h-12 bg-gradient-sunset text-primary-foreground font-semibold shadow-glow">
          <a href="#quote">Free Quote</a>
        </Button>
      </div>
      <div className="md:hidden h-20" aria-hidden />
    </div>
  );
}
