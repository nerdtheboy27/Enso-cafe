import { motion, useReducedMotion } from "motion/react";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  CalendarDays,
  Check,
  ChefHat,
  Clock3,
  Facebook,
  Heart,
  Instagram,
  MapPin,
  Menu,
  Quote,
  ShoppingBag,
  Sparkles,
  Star,
  Users,
  UtensilsCrossed,
  X,
} from "lucide-react";
import { useEffect, useRef, useState, type FormEvent, type ReactNode } from "react";

import heroImage from "@/assets/herobanner.png";
import truffleImage from "@/assets/truffle pasta.png";
import lobsterImage from "@/assets/saffron lobster.png";
import fondantImage from "@/assets/PISTACHIO FONDANT.png";
import bannerImage from "@/assets/cta banner-clean.png";
import serverImage from "@/assets/enso-cafe-server.webp";
import chefJames from "@/assets/chef-james.webp";
import chefElena from "@/assets/chef-elena.webp";
import chefTakeshi from "@/assets/chef-takeshi.webp";
import reservationImage from "@/assets/reservation-table.webp";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const dishes = [
  { name: "Truffle Pasta", detail: "Black truffle · parmesan", price: "$65", rating: "5.0", image: truffleImage },
  { name: "Saffron Lobster", detail: "Lobster · saffron butter", price: "$90", rating: "4.9", image: lobsterImage },
  { name: "Pistachio Fondant", detail: "Pistachio · vanilla crémeux", price: "$35", rating: "5.0", image: fondantImage },
];

const chefs = [
  { name: "James Carlow", role: "Executive Chef", image: chefJames },
  { name: "Elena Morin", role: "Pastry Chef", image: chefElena },
  { name: "Takeshi Ito", role: "Chef de Cuisine", image: chefTakeshi },
];

const testimonials = [
  { name: "Sophia M.", role: "Local patron", quote: "A truly unforgettable experience. From the ambiance to the plating, everything was flawless. The tasting menu was a journey in itself." },
  { name: "Daniel L.", role: "Culinary enthusiast", quote: "Every bite was a masterpiece. You can taste the passion and precision in every dish. Absolutely worth it." },
  { name: "Ava R.", role: "Frequent guest", quote: "Exceptional service, world-class flavors, and a setting that makes you feel like royalty. My new favorite dining destination." },
];

const navItems = [
  ["Home", "home"],
  ["Menu", "menu"],
  ["About", "about"],
  ["Gallery", "gallery"],
  ["Contact", "contact"],
] as const;

const heroFeatures: Array<{ icon: typeof Sparkles; title: string; copy: string }> = [
  { icon: Sparkles, title: "Special Events", copy: "Celebrate your moments with us" },
  { icon: ChefHat, title: "Chef’s Experience", copy: "Crafted by our finest culinary team" },
  { icon: UtensilsCrossed, title: "Timely Wings", copy: "Crispy, savory, sesame finished" },
];

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

function Reveal({ children, className = "", delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      initial={reduced ? false : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.18 }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function ArrowButton({ direction, onClick, label }: { direction: "left" | "right"; onClick: () => void; label: string }) {
  return (
    <Button variant="ghost" size="icon" onClick={onClick} aria-label={label} className="text-muted-foreground hover:text-primary">
      {direction === "left" ? <ArrowLeft size={16} /> : <ArrowRight size={16} />}
    </Button>
  );
}

function SectionIntro({ eyebrow, title, copy, align = "left" }: { eyebrow: string; title: ReactNode; copy: string; align?: "left" | "right" }) {
  return (
    <div className={cn("mb-12 grid items-end gap-6 md:grid-cols-2", align === "right" && "md:text-right")}>
      <Reveal>
        <p className="mb-4 text-label text-primary">{eyebrow}</p>
        <h2 className="font-display text-section leading-[0.94] text-foreground">{title}</h2>
      </Reveal>
      <Reveal delay={0.08} className={cn("max-w-sm md:justify-self-end", align === "right" && "md:justify-self-start")}>
        <p className="text-sm leading-6 text-muted-foreground">{copy}</p>
      </Reveal>
    </div>
  );
}

function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className={cn("fixed inset-x-0 top-0 z-50 transition-all duration-500", scrolled && "border-b border-border bg-background/85 backdrop-blur-xl")}>
      <nav className="site-shell grid h-16 grid-cols-[minmax(0,1fr)_auto] items-center gap-4 md:grid-cols-[1fr_auto_1fr]" aria-label="Main navigation">
        <button onClick={() => scrollTo("home")} className="w-fit font-display text-xl text-foreground" aria-label="Enso cafe home">Enso cafe</button>
        <div className="hidden items-center gap-8 md:flex">
          {navItems.map(([label, id]) => <button key={id} onClick={() => scrollTo(id)} className="text-label text-muted-foreground transition-colors hover:text-foreground">{label}</button>)}
        </div>
        <div className="flex items-center justify-end gap-2">
          <Button size="sm" onClick={() => scrollTo("menu")} className="hidden md:inline-flex">Order Now <ArrowUpRight size={13} /></Button>
          <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setOpen(!open)} aria-label={open ? "Close menu" : "Open menu"}>{open ? <X size={19} /> : <Menu size={19} />}</Button>
        </div>
      </nav>
      {open && (
        <div className="border-t border-border bg-background px-5 py-5 md:hidden">
          <div className="flex flex-col gap-1">
            {navItems.map(([label, id]) => <button key={id} onClick={() => { scrollTo(id); setOpen(false); }} className="rounded-md px-3 py-3 text-left font-display text-2xl text-foreground hover:bg-card">{label}</button>)}
            <Button className="mt-3" onClick={() => { scrollTo("menu"); setOpen(false); }}>Order Now <ArrowUpRight size={14} /></Button>
          </div>
        </div>
      )}
    </motion.header>
  );
}

function Hero() {
  const reduced = useReducedMotion();
  return (
    <section id="home" className="relative overflow-hidden pb-20 pt-24 lg:min-h-[760px]">
      <div className="site-shell relative grid items-center gap-10 lg:grid-cols-[0.9fr_1.1fr]">
        <motion.div initial={reduced ? false : { opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.85, delay: 0.1 }} className="relative z-10 pt-6 lg:pt-16">
          <p className="mb-5 text-label text-primary">Fine dining · New York</p>
          <h1 className="max-w-2xl font-display text-hero leading-[0.88] text-foreground">Savor Every<br />Moment with<br /><span className="text-primary">Every Bite</span></h1>
          <p className="mt-6 max-w-md text-sm leading-6 text-secondary-foreground">Experience carefully crafted cuisine with passion, fresh ingredients, and unforgettable flavors.</p>
          <Button className="mt-7" onClick={() => scrollTo("reservation")}>Reserve Your Table <ArrowUpRight size={14} /></Button>
          <svg aria-hidden="true" viewBox="0 0 180 100" className="absolute -right-2 top-20 hidden w-36 text-muted-foreground/60 lg:block" fill="none">
            <path d="M4 55C56 15 112 26 153 68" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeDasharray="4 5" />
            <path d="m143 64 12 5-6-13" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </motion.div>
        <motion.div initial={reduced ? false : { opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1, delay: 0.18 }} className="relative mx-auto w-full max-w-3xl">
          <div className="absolute inset-16 rounded-full bg-primary/5 blur-3xl" />
          <img src={heroImage} alt="Sesame glazed wings on a black ceramic plate" width={1536} height={768} className="relative aspect-[2/1] w-full rounded-xl object-cover shadow-hero lg:aspect-[1.45/1] lg:object-[63%_center]" />
          <div className="absolute -bottom-12 left-2 right-2 grid gap-3 rounded-lg border border-border bg-card/95 p-4 shadow-card backdrop-blur-md sm:left-auto sm:right-6 sm:w-[310px]">
            {heroFeatures.map(({ icon: Icon, title, copy }) => <div key={title} className="grid grid-cols-[auto_1fr] items-center gap-3"><span className="grid size-7 place-items-center rounded-full bg-primary text-primary-foreground"><Icon size={13} /></span><div><p className="text-xs font-medium text-foreground">{title}</p><p className="text-[10px] text-muted-foreground">{copy}</p></div></div>)}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function MenuSection() {
  const row = useRef<HTMLDivElement>(null);
  const [favorites, setFavorites] = useState<string[]>([]);
  const slide = (direction: number) => row.current?.scrollBy({ left: direction * 360, behavior: "smooth" });
  return (
    <section id="menu" className="section-space bg-secondary">
      <div className="site-shell">
        <SectionIntro eyebrow="The collection" title={<>Indulge in<br />Culinary Artistry</>} copy="Explore our finest selections, crafted to perfection by world-class chefs." />
        <div ref={row} className="scrollbar-hide -mx-5 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 md:mx-0 md:grid md:grid-cols-3 md:px-0">
          {dishes.map((dish, index) => {
            const liked = favorites.includes(dish.name);
            return <Reveal key={dish.name} delay={index * 0.08} className="min-w-[84vw] snap-center sm:min-w-[360px] md:min-w-0">
              <article className="group overflow-hidden rounded-lg border border-border bg-card p-3 transition-transform duration-500 hover:-translate-y-1">
                <div className="relative overflow-hidden rounded-md bg-image">
                  <img src={dish.image} alt={dish.name} loading="lazy" width={768} height={768} className="aspect-square w-full object-cover transition-transform duration-700 group-hover:scale-[1.035]" />
                  <Button variant="ghost" size="icon" className="absolute right-3 top-3 bg-background/65 text-foreground backdrop-blur" onClick={() => setFavorites((current) => liked ? current.filter((item) => item !== dish.name) : [...current, dish.name])} aria-label={`${liked ? "Remove" : "Add"} ${dish.name} ${liked ? "from" : "to"} favorites`}><Heart size={16} className={liked ? "fill-primary text-primary" : ""} /></Button>
                </div>
                <div className="px-2 pb-2 pt-5">
                  <div className="grid grid-cols-[minmax(0,1fr)_auto] gap-4"><div className="min-w-0"><h3 className="truncate font-display text-2xl text-foreground">{dish.name}</h3><p className="mt-1 text-[11px] text-muted-foreground">{dish.detail}</p></div><p className="font-display text-xl text-primary">{dish.price}</p></div>
                  <div className="mt-5 flex items-center justify-between"><Button size="sm" onClick={() => scrollTo("reservation")}>Order Now <ArrowUpRight size={13} /></Button><span className="flex items-center gap-1 text-xs text-muted-foreground"><Star size={12} className="fill-primary text-primary" /> {dish.rating}</span></div>
                </div>
              </article>
            </Reveal>;
          })}
        </div>
        <div className="mt-5 flex justify-between md:hidden"><ArrowButton direction="left" onClick={() => slide(-1)} label="Previous dish" /><ArrowButton direction="right" onClick={() => slide(1)} label="Next dish" /></div>
      </div>
    </section>
  );
}

function ServiceSection() {
  const services = ["Online Orders", "Specials Kitchen", "Table Reservations", "World-Class Chefs", "24/7 Availability", "Organized Dining Spaces"];
  return (
    <section id="about" className="section-space overflow-hidden">
      <div className="site-shell grid items-center gap-16 lg:grid-cols-[0.9fr_1.1fr]">
        <Reveal>
          <p className="mb-4 text-label text-primary">Made around you</p>
          <h2 className="font-display text-section leading-[0.94]">Serving You<br />Better</h2>
          <p className="mt-6 max-w-md text-sm leading-6 text-muted-foreground">We offer more than great food. From online orders to world-class chefs, we ensure every part of your experience is exceptional.</p>
          <div className="mt-7 grid grid-cols-2 gap-x-5 gap-y-4">
            {services.map((item) => <div key={item} className="flex items-center gap-2 text-xs text-secondary-foreground"><span className="grid size-5 shrink-0 place-items-center rounded-full bg-primary text-primary-foreground"><Check size={11} /></span>{item}</div>)}
          </div>
          <Button className="mt-8" onClick={() => scrollTo("reservation")}>Book a Table <ArrowUpRight size={14} /></Button>
        </Reveal>
        <Reveal delay={0.08} className="relative mx-auto h-[520px] w-full max-w-[620px]">
          <div className="absolute bottom-0 right-[8%] h-[88%] w-[54%] overflow-hidden rounded-lg bg-card shadow-card"><img src={serverImage} alt="Enso cafe dining room server" loading="lazy" width={1024} height={1280} className="h-full w-full object-cover object-top" /></div>
          <div className="absolute left-[4%] top-[8%] w-[40%] overflow-hidden rounded-lg border-4 border-background shadow-card"><img src={truffleImage} alt="Truffle pasta presentation" loading="lazy" width={768} height={768} className="aspect-square w-full object-cover" /></div>
          <div className="absolute bottom-[8%] left-[15%] w-[32%] overflow-hidden rounded-lg border-4 border-background shadow-card"><img src={fondantImage} alt="Pistachio fondant presentation" loading="lazy" width={768} height={768} className="aspect-square w-full object-cover" /></div>
        </Reveal>
      </div>
    </section>
  );
}

function LuxurySection() {
  return (
    <section id="gallery" className="section-space bg-secondary">
      <div className="site-shell grid items-center gap-16 lg:grid-cols-2">
        <Reveal className="relative order-2 mx-auto h-[470px] w-full max-w-[620px] lg:order-1">
          <div className="absolute left-[10%] top-[8%] w-[64%] overflow-hidden rounded-lg shadow-card"><img src={lobsterImage} alt="Saffron lobster pasta" loading="lazy" width={768} height={768} className="aspect-square w-full object-cover" /></div>
          <div className="absolute bottom-[4%] right-[3%] w-[43%] overflow-hidden rounded-lg border-4 border-secondary shadow-card"><img src={truffleImage} alt="Black truffle pasta" loading="lazy" width={768} height={768} className="aspect-square w-full object-cover" /></div>
          <div className="absolute left-0 top-[53%] w-[31%] overflow-hidden rounded-lg border-4 border-secondary shadow-card"><img src={heroImage} alt="Glazed wings" loading="lazy" width={1536} height={768} className="aspect-square w-full object-cover object-right" /></div>
        </Reveal>
        <Reveal className="order-1 lg:order-2">
          <p className="mb-4 text-label text-primary">An occasion, elevated</p>
          <h2 className="font-display text-section leading-[0.94]">Luxury dining<br />starts here</h2>
          <p className="mt-6 max-w-sm text-sm leading-6 text-muted-foreground">Whether it’s an intimate dinner or a grand celebration, we’re here to make it special.</p>
          <Button className="mt-8" onClick={() => scrollTo("reservation")}>Book a Table <ArrowUpRight size={14} /></Button>
        </Reveal>
      </div>
    </section>
  );
}

function ChefsSection() {
  const row = useRef<HTMLDivElement>(null);
  const slide = (direction: number) => row.current?.scrollBy({ left: direction * 330, behavior: "smooth" });
  return (
    <section className="section-space">
      <div className="site-shell">
        <SectionIntro eyebrow="The hands behind every plate" title={<>Crafted by<br />Experts</>} copy="Each dish begins with vision, skill, and passion. Meet the culinary artists who turn fresh ingredients into unforgettable flavors." />
        <div ref={row} className="scrollbar-hide -mx-5 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 md:mx-0 md:grid md:grid-cols-3 md:px-0">
          {chefs.map((chef, index) => <Reveal key={chef.name} delay={index * 0.08} className="min-w-[78vw] snap-center sm:min-w-[330px] md:min-w-0"><article className="group"><div className="overflow-hidden rounded-lg bg-card"><img src={chef.image} alt={`${chef.name}, ${chef.role}`} loading="lazy" width={912} height={1104} className="aspect-[4/4.6] w-full object-cover transition-transform duration-700 group-hover:scale-[1.025]" /></div><div className="mt-4 text-center"><h3 className="font-display text-2xl">{chef.name}</h3><p className="mt-1 text-label text-muted-foreground">{chef.role}</p></div></article></Reveal>)}
        </div>
        <div className="mt-5 flex justify-between md:hidden"><ArrowButton direction="left" onClick={() => slide(-1)} label="Previous chef" /><ArrowButton direction="right" onClick={() => slide(1)} label="Next chef" /></div>
      </div>
    </section>
  );
}

function Testimonials() {
  const row = useRef<HTMLDivElement>(null);
  const slide = (direction: number) => row.current?.scrollBy({ left: direction * 360, behavior: "smooth" });
  return (
    <section className="section-space bg-secondary">
      <div className="site-shell">
        <SectionIntro eyebrow="Kind words" title={<>Praise from<br />Our Patrons</>} copy="Real voices. Honest praise. Unforgettable moments shared at our table." />
        <div ref={row} className="scrollbar-hide -mx-5 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 md:mx-0 md:grid md:grid-cols-3 md:px-0">
          {testimonials.map((item, index) => <Reveal key={item.name} delay={index * 0.08} className="min-w-[84vw] snap-center sm:min-w-[360px] md:min-w-0"><article className="flex h-full min-h-64 flex-col rounded-lg border border-border bg-card p-6"><Quote size={20} className="text-primary" /><p className="mt-5 flex-1 font-display text-xl leading-7 text-foreground">“{item.quote}”</p><div className="mt-6 flex items-center justify-between border-t border-border pt-4"><div><p className="text-xs font-semibold">{item.name}</p><p className="text-[10px] text-muted-foreground">{item.role}</p></div><div className="flex gap-0.5">{Array.from({ length: 5 }).map((_, i) => <Star key={i} size={10} className="fill-primary text-primary" />)}</div></div></article></Reveal>)}
        </div>
        <div className="mt-5 flex justify-between md:hidden"><ArrowButton direction="left" onClick={() => slide(-1)} label="Previous testimonial" /><ArrowButton direction="right" onClick={() => slide(1)} label="Next testimonial" /></div>
      </div>
    </section>
  );
}

function ReservationSection() {
  const [message, setMessage] = useState("");
  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.checkValidity()) { form.reportValidity(); return; }
    setMessage("Your table request is confirmed. We’ll see you soon.");
    form.reset();
  };
  return (
    <section id="reservation" className="section-space">
      <div className="site-shell">
        <Reveal className="relative overflow-hidden rounded-xl bg-image lg:min-h-[500px]">
          <img src={reservationImage} alt="Chef finishing a pasta dish at the table" loading="lazy" width={1920} height={912} className="h-72 w-full object-cover lg:absolute lg:inset-0 lg:h-full" />
          <div className="pointer-events-none absolute inset-0 hidden bg-banner-shade lg:block" />
          <form onSubmit={submit} className="relative z-10 m-3 rounded-lg bg-form p-6 text-form-foreground shadow-card sm:p-8 lg:ml-auto lg:mr-8 lg:mt-8 lg:w-[430px]">
            <p className="text-label text-form-muted">Reservations</p>
            <h2 className="mt-2 font-display text-4xl">Reserve Your Table</h2>
            <p className="mt-2 text-xs leading-5 text-form-muted">Join us for an evening shaped around remarkable food and thoughtful hospitality.</p>
            <div className="mt-6 grid gap-4">
              <label className="grid gap-1.5 text-[10px] font-semibold uppercase text-form-muted">Choose Location<select required defaultValue="" className="form-control"><option value="" disabled>Select a dining room</option><option>Manhattan · Culinary Avenue</option><option>Brooklyn · Dumbo</option></select></label>
              <label className="grid gap-1.5 text-[10px] font-semibold uppercase text-form-muted">Guests<select required defaultValue="" className="form-control"><option value="" disabled>Number of guests</option>{[1,2,3,4,5,6,7,8].map((n) => <option key={n}>{n} {n === 1 ? "guest" : "guests"}</option>)}</select></label>
              <div className="grid grid-cols-2 gap-3">
                <label className="grid gap-1.5 text-[10px] font-semibold uppercase text-form-muted">Date<input required type="date" className="form-control" /></label>
                <label className="grid gap-1.5 text-[10px] font-semibold uppercase text-form-muted">Time<select required defaultValue="" className="form-control"><option value="" disabled>Select time</option><option>5:30 PM</option><option>7:00 PM</option><option>8:30 PM</option><option>10:00 PM</option></select></label>
              </div>
            </div>
            <Button className="mt-6 w-full" type="submit">Confirm Reservation <ArrowUpRight size={14} /></Button>
            {message && <p role="status" className="mt-4 flex items-center gap-2 text-xs font-medium text-success"><Check size={14} />{message}</p>}
          </form>
        </Reveal>
      </div>
    </section>
  );
}

function CtaBanner() {
  return (
    <section className="pb-24">
      <div className="site-shell">
        <Reveal className="relative min-h-[430px] overflow-hidden rounded-xl bg-image">
          <img src={bannerImage} alt="Mushroom pasta in a black bowl" loading="lazy" width={1810} height={768} className="absolute inset-0 h-full w-full object-cover object-[65%_center]" />
          <div className="absolute inset-0 bg-cta-shade" />
          <div className="relative z-10 flex min-h-[430px] max-w-xl flex-col items-start justify-center px-7 py-12 sm:px-14">
            <p className="mb-4 text-label text-primary">Your table awaits</p>
            <h2 className="font-display text-section leading-[0.94]">Let Flavor<br />Lead the Way</h2>
            <p className="mt-5 max-w-sm text-sm leading-6 text-secondary-foreground">Experience exceptional flavors and moments that linger long after the last bite.</p>
            <Button className="mt-7" onClick={() => scrollTo("reservation")}>Book a Table <ArrowUpRight size={14} /></Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer id="contact" className="border-t border-border bg-secondary pb-8 pt-16">
      <div className="site-shell">
        <div className="grid gap-12 border-b border-border pb-14 sm:grid-cols-2 lg:grid-cols-[1.5fr_0.7fr_0.7fr_1.2fr]">
          <div><p className="font-display text-4xl">Enso cafe</p><p className="mt-2 text-xs text-muted-foreground">Where Taste Meets Elegance</p><div className="mt-7 flex gap-2">{[Instagram, Facebook, X].map((Icon, index) => <Button key={index} variant="outline" size="icon" aria-label={["Instagram", "Facebook", "X"][index]}><Icon size={14} /></Button>)}</div></div>
          <div><p className="text-label text-foreground">Enso cafe</p><div className="mt-5 grid gap-3 text-xs text-muted-foreground">{["Home", "Our Menu", "About Us", "Gallery", "Book a Table"].map((item) => <button key={item} className="w-fit hover:text-primary" onClick={() => scrollTo(item === "Home" ? "home" : item === "Our Menu" ? "menu" : item === "Book a Table" ? "reservation" : item === "Gallery" ? "gallery" : "about")}>{item}</button>)}</div></div>
          <div><p className="text-label text-foreground">Explore</p><div className="mt-5 grid gap-3 text-xs text-muted-foreground">{["Private Dining", "Events", "Tasting Menu", "Gift Cards"].map((item) => <span key={item}>{item}</span>)}</div></div>
          <div><p className="text-label text-foreground">Connect With Us</p><div className="mt-5 grid gap-4 text-xs leading-5 text-muted-foreground"><p className="flex gap-2"><MapPin size={14} className="mt-0.5 shrink-0 text-primary" />123 Culinary Avenue,<br />New York, NY 10001</p><p className="flex gap-2"><Clock3 size={14} className="shrink-0 text-primary" />Tue–Sun · 5:30 PM–11:00 PM</p><a href="mailto:hello@Enso cafe.com" className="hover:text-primary">hello@Enso cafe.com</a><a href="tel:+12125551234" className="hover:text-primary">+1 (212) 555-1234</a></div></div>
        </div>
        <div className="flex flex-col gap-4 pt-7 text-[10px] text-muted-foreground sm:flex-row sm:items-center sm:justify-between"><p>© 2026 Enso cafe Restaurant. All rights reserved.</p><div className="flex gap-5"><span>Privacy Policy</span><span>Terms &amp; Conditions</span><span>Accessibility</span></div></div>
      </div>
    </footer>
  );
}

export function EnsoCafeLanding() {
  return (
    <main className="overflow-hidden bg-background text-foreground">
      <Navbar />
      <Hero />
      <MenuSection />
      <ServiceSection />
      <LuxurySection />
      <ChefsSection />
      <Testimonials />
      <ReservationSection />
      <CtaBanner />
      <Footer />
    </main>
  );
}
