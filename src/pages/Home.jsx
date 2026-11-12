import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, ChefHat, HeartHandshake, Leaf, Sparkles } from 'lucide-react'
import Hero from '../components/home/Hero'
import TestimonialCarousel from '../components/home/TestimonialCarousel'
import Button from '../components/common/Button'
import Reveal from '../components/common/Reveal'
import SectionHeading from '../components/common/SectionHeading'
import ReservationCTA from '../components/common/ReservationCTA'
import Stars from '../components/common/Stars'
import DishCard from '../components/menu/DishCard'
import GalleryTile from '../components/gallery/GalleryTile'
import Lightbox from '../components/gallery/Lightbox'
import { signatureDishes } from '../data/menuItems'
import { galleryPreview } from '../data/galleryImages'
import { site } from '../data/site'
import useDocumentTitle from '../hooks/useDocumentTitle'

const stats = [
  { value: '12', label: 'Years in Kala Ghoda' },
  { value: '60+', label: 'Dishes on the menu' },
  { value: '14', label: 'Regional cuisines' },
]

const experiences = [
  {
    no: '01',
    title: 'The Atmosphere',
    text: 'A restored 1920s warehouse with a skylit garden room, a long teak bar and corners made for slow conversation.',
  },
  {
    no: '02',
    title: 'The Hospitality',
    text: 'Our team learns your name, your usual and how you like your chai. Atithi devo bhava is not a slogan here — it is the job.',
  },
  {
    no: '03',
    title: 'The Ingredients',
    text: 'Konkan seafood each morning, heirloom rice from Wayanad, spices roasted and ground in-house daily. Nothing from a packet.',
  },
  {
    no: '04',
    title: 'The Table',
    text: 'Plates designed to be shared, poured and passed around — because the best Indian meals have always been communal.',
  },
]

const reasons = [
  {
    icon: Leaf,
    title: 'Fresh Ingredients',
    text: 'Seasonal produce from farms in Nashik and Alibaug, delivered daily and cooked the same day.',
  },
  {
    icon: ChefHat,
    title: 'Expert Chefs',
    text: 'A kitchen led by Chef Karan Mehra, with cooks trained in Awadhi, Chettinad and Malabar traditions.',
  },
  {
    icon: Sparkles,
    title: 'Unique Recipes',
    text: 'Family heirloom recipes, quietly reimagined — butter chicken without the sugar, tiramisu with filter coffee.',
  },
  {
    icon: HeartHandshake,
    title: 'Warm Hospitality',
    text: 'Unhurried service, thoughtful details and a team that treats every guest like family visiting home.',
  },
]

// Asymmetric grid placement for the six gallery preview images (lg+)
const previewLayout = [
  'row-span-2 lg:col-span-4',
  'lg:col-span-5',
  'lg:col-span-3 lg:row-span-2',
  'lg:col-span-5',
  'lg:col-span-7',
  'col-span-2 lg:col-span-5',
]

export default function Home() {
  useDocumentTitle()
  const [lightboxIndex, setLightboxIndex] = useState(null)

  return (
    <>
      <Hero />

      {/* ── Introduction ─────────────────────────────── */}
      <section id="introduction" className="section overflow-hidden">
        <div className="container-site grid items-center gap-16 lg:grid-cols-12 lg:gap-12">
          <Reveal className="relative lg:col-span-6">
            <div className="relative isolate mr-10 sm:mr-24 lg:mr-16">
              <img
                src="/images/chef-copper.webp"
                alt="Chef Karan Mehra garnishing a plate under copper lamps"
                loading="lazy"
                decoding="async"
                width="1100"
                height="1693"
                className="aspect-[4/5] w-full object-cover"
              />
              <span className="absolute -left-3 -top-3 -z-10 hidden h-full w-full border border-gold sm:block" aria-hidden="true" />
            </div>
            <div className="absolute -bottom-10 right-0 w-[46%] border-[6px] border-cream sm:w-[42%]">
              <img
                src="/images/kitchen-flame.webp"
                alt="A cook tossing a pan over high flame in the Aangan kitchen"
                loading="lazy"
                decoding="async"
                className="aspect-square w-full object-cover"
              />
            </div>
          </Reveal>

          <div className="pt-6 lg:col-span-6 lg:pl-8 lg:pt-0">
            <SectionHeading
              eyebrow="Welcome to Aangan"
              title={
                <>
                  A modern Indian kitchen, rooted in <em className="text-terracotta">family recipes.</em>
                </>
              }
            />
            <Reveal delay={0.1} className="mt-6 space-y-5 text-[1.02rem] leading-relaxed text-muted">
              <p>
                In Hindi, <em className="font-serif text-espresso">aangan</em> is the open courtyard at the heart of an
                Indian home — the place where meals are shared, stories are told and everyone is welcome.
              </p>
              <p>
                Since {site.established}, we have tried to recreate that feeling in the middle of Mumbai: honest regional
                food cooked with patience, coffee roasted by friends in Chikmagalur, and a room that feels like it has
                always been here.
              </p>
            </Reveal>
            <Reveal delay={0.15}>
              <dl className="mt-10 grid grid-cols-3 gap-4 border-y border-line py-7">
                {stats.map((s) => (
                  <div key={s.label}>
                    <dt className="sr-only">{s.label}</dt>
                    <dd className="font-serif text-[2rem] leading-none text-espresso sm:text-[2.6rem]">{s.value}</dd>
                    <dd className="mt-2 text-[0.7rem] font-semibold uppercase leading-snug tracking-[0.14em] text-muted">{s.label}</dd>
                  </div>
                ))}
              </dl>
              <Button to="/about" variant="outline" icon={ArrowRight} className="mt-10">
                Discover Our Story
              </Button>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── Signature Dishes ─────────────────────────── */}
      <section className="section border-t border-line bg-white">
        <div className="container-site">
          <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
            <SectionHeading
              eyebrow="Signature Dishes"
              title="Plates our guests come back for."
              intro="Six dishes that tell the story of our kitchen — from the coal-fired tandoor to the coastal kitchens of Kerala."
            />
            <Reveal className="shrink-0">
              <Link to="/menu" className="link-underline text-[0.78rem] font-semibold uppercase tracking-[0.18em] text-espresso hover:text-terracotta">
                View Full Menu <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </Reveal>
          </div>
          <div className="mt-16 grid gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-10">
            {signatureDishes.map((dish, i) => (
              <Reveal key={dish.id} delay={(i % 3) * 0.08}>
                <DishCard dish={dish} index={i} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Our Experience ──────────────────────────── */}
      <section className="section bg-espresso text-cream">
        <div className="container-site">
          <SectionHeading
            light
            eyebrow="The Aangan Experience"
            title={
              <>
                More than a meal — <em className="text-gold">an afternoon</em> you will want to repeat.
              </>
            }
          />

          <div className="mt-16 grid gap-12 lg:mt-20 lg:grid-cols-12 lg:gap-16">
            <Reveal className="lg:col-span-7">
              <img
                src="/images/interior-bar.webp"
                alt="The long teak bar at Aangan glowing under pendant lights in the evening"
                loading="lazy"
                decoding="async"
                className="aspect-[4/3] w-full object-cover"
              />
            </Reveal>
            <div className="flex flex-col justify-center gap-10 lg:col-span-5">
              {experiences.slice(0, 2).map((item, i) => (
                <Reveal key={item.no} delay={i * 0.1} className="border-t border-white/15 pt-8">
                  <p className="font-serif text-sm italic text-gold">{item.no}</p>
                  <h3 className="mt-3 font-serif text-[1.75rem] text-cream">{item.title}</h3>
                  <p className="mt-3 leading-relaxed text-cream/65">{item.text}</p>
                </Reveal>
              ))}
            </div>
          </div>

          <div className="mt-16 grid gap-12 lg:mt-24 lg:grid-cols-12 lg:gap-16">
            <div className="order-2 flex flex-col justify-center gap-10 lg:order-1 lg:col-span-5">
              {experiences.slice(2).map((item, i) => (
                <Reveal key={item.no} delay={i * 0.1} className="border-t border-white/15 pt-8">
                  <p className="font-serif text-sm italic text-gold">{item.no}</p>
                  <h3 className="mt-3 font-serif text-[1.75rem] text-cream">{item.title}</h3>
                  <p className="mt-3 leading-relaxed text-cream/65">{item.text}</p>
                </Reveal>
              ))}
            </div>
            <Reveal className="order-1 grid grid-cols-5 gap-4 lg:order-2 lg:col-span-7">
              <img
                src="/images/masala-chai.webp"
                alt="Masala chai surrounded by whole spices — cardamom, cinnamon and star anise"
                loading="lazy"
                decoding="async"
                className="col-span-3 aspect-[3/4] h-full w-full object-cover"
              />
              <img
                src="/images/guests-dining.webp"
                alt="Guests laughing and sharing plates over dinner"
                loading="lazy"
                decoding="async"
                className="col-span-2 mt-12 aspect-[2/3] h-full w-full object-cover object-[30%_center] lg:mt-20"
              />
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── Why Choose Us ───────────────────────────── */}
      <section className="section">
        <div className="container-site">
          <SectionHeading
            align="center"
            eyebrow="Why Choose Us"
            title="Four promises we keep, every service."
          />
          <div className="mt-16 grid border-l border-t border-line sm:grid-cols-2 lg:grid-cols-4">
            {reasons.map(({ icon: Icon, title, text }, i) => (
              <Reveal
                key={title}
                delay={i * 0.08}
                className="group border-b border-r border-line bg-cream p-8 transition-colors duration-500 hover:bg-white lg:p-10"
              >
                <div className="flex items-center justify-between">
                  <span className="inline-flex h-14 w-14 items-center justify-center border border-gold/60 text-terracotta transition-colors duration-500 group-hover:bg-terracotta group-hover:text-white">
                    <Icon className="h-6 w-6" strokeWidth={1.4} aria-hidden="true" />
                  </span>
                  <span className="font-serif text-sm italic text-muted">0{i + 1}</span>
                </div>
                <h3 className="mt-8 font-serif text-[1.5rem]">{title}</h3>
                <p className="mt-3 leading-relaxed text-muted">{text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Gallery Preview ─────────────────────────── */}
      <section className="section border-t border-line bg-white">
        <div className="container-site">
          <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
            <SectionHeading eyebrow="Gallery" title="A glimpse inside the courtyard." />
            <Reveal className="shrink-0">
              <Link to="/gallery" className="link-underline text-[0.78rem] font-semibold uppercase tracking-[0.18em] text-espresso hover:text-terracotta">
                View Full Gallery <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </Reveal>
          </div>
          <Reveal className="mt-14 grid auto-rows-[11rem] grid-cols-2 gap-3 xs:auto-rows-[13rem] sm:gap-4 md:auto-rows-[15rem] lg:auto-rows-[16rem] lg:grid-cols-12">
            {galleryPreview.map((image, i) => (
              <GalleryTile
                key={image.id}
                image={image}
                fill
                onOpen={() => setLightboxIndex(i)}
                className={`h-full ${previewLayout[i]}`}
              />
            ))}
          </Reveal>
        </div>
        <Lightbox images={galleryPreview} index={lightboxIndex} onClose={() => setLightboxIndex(null)} onIndexChange={setLightboxIndex} />
      </section>

      {/* ── Testimonials ────────────────────────────── */}
      <section className="section bg-cream-deep">
        <div className="container-site">
          <Reveal className="flex flex-col items-center text-center">
            <p className="eyebrow justify-center">Guest Reviews</p>
            <p className="mt-5 inline-flex flex-wrap items-center justify-center gap-3 text-sm text-muted">
              <Stars rating={5} size="h-3.5 w-3.5" />
              {site.rating.score} average from {site.rating.count} reviews
            </p>
          </Reveal>
          <Reveal delay={0.1} className="mt-10">
            <TestimonialCarousel />
          </Reveal>
        </div>
      </section>

      {/* ── Reservation CTA ─────────────────────────── */}
      <ReservationCTA />
    </>
  )
}
