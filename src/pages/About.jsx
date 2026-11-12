import { Quote, Recycle, Sprout, Users, UtensilsCrossed } from 'lucide-react'
import PageHero from '../components/common/PageHero'
import Reveal from '../components/common/Reveal'
import SectionHeading from '../components/common/SectionHeading'
import ReservationCTA from '../components/common/ReservationCTA'
import { site } from '../data/site'
import useDocumentTitle from '../hooks/useDocumentTitle'

const milestones = [
  { year: '2014', text: 'A twenty-seat café opens on Rampart Row, serving chai, poha and three curries a day.' },
  { year: '2018', text: 'We move into the old textile warehouse next door and build a full open kitchen and tandoor.' },
  { year: '2023', text: 'The garden room opens, alongside a direct-trade partnership with a Chikmagalur coffee estate.' },
]

const approach = [
  {
    step: 'Source',
    title: 'Close to the farm',
    text: 'We buy from twenty-two small growers and fisherfolk, most within a day’s drive of Mumbai. The menu changes when the seasons do.',
    image: '/images/thali-flatlay.webp',
    alt: 'Overhead view of a steel thali surrounded by small bowls of spices and curries',
  },
  {
    step: 'Slow',
    title: 'Cooked with patience',
    text: 'Dal simmered overnight, biryani sealed in dough, masalas roasted and stone-ground every morning — shortcuts never make the cut.',
    image: '/images/chef-cooking.webp',
    alt: 'A chef plating dishes at the open kitchen pass',
  },
  {
    step: 'Share',
    title: 'Served to be passed around',
    text: 'Generous portions, family-style platters and a banana-leaf thali on weekends — food that brings the table together.',
    image: '/images/banana-leaf-meal.webp',
    alt: 'A traditional meal served on a banana leaf',
  },
]

const values = [
  { icon: Sprout, title: 'Seasonality', text: 'If it isn’t in season, it isn’t on the plate. Our menu is rewritten four times a year.' },
  { icon: UtensilsCrossed, title: 'Craft', text: 'Every chutney, pickle, paneer and bread is made in our kitchen, by hand, every day.' },
  { icon: Users, title: 'Generosity', text: 'Fair wages, shared tips and a family meal for the team before every service.' },
  { icon: Recycle, title: 'Responsibility', text: 'Zero single-use plastic, composted kitchen waste and leftovers donated nightly.' },
]

const spaces = [
  { src: '/images/interior-atrium.webp', alt: 'Double-height atrium dining room with tall steel windows', caption: 'The Atrium', className: 'md:col-span-7 aspect-[4/3]' },
  { src: '/images/interior-conservatory.webp', alt: 'Glass-roofed conservatory filled with plants and string lights', caption: 'The Garden Room', className: 'md:col-span-5 aspect-[4/3] md:aspect-auto' },
  { src: '/images/interior-cafe-plants.webp', alt: 'Bright café counter with a chalkboard menu and hanging plants', caption: 'The Café', className: 'md:col-span-5 aspect-[4/3]' },
  { src: '/images/interior-window.webp', alt: 'Private dining room with set tables beside large windows', caption: 'Private Dining', className: 'md:col-span-7 aspect-[4/3] md:aspect-auto' },
]

export default function About() {
  useDocumentTitle('About Us')

  return (
    <>
      <PageHero
        crumb="About"
        eyebrow="Our Story"
        title={
          <>
            A courtyard in the <em className="text-gold">heart of the city.</em>
          </>
        }
        intro="Aangan began as a small café with a big idea: that the warmth of an Indian home kitchen belongs in the middle of Mumbai."
        image="/images/interior-loft.webp"
        imageAlt="The Aangan dining room with leather banquettes and warm lighting"
      />

      {/* ── Our Story ───────────────────────────────── */}
      <section className="section overflow-hidden">
        <div className="container-site grid gap-16 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-6">
            <SectionHeading
              eyebrow="Since 2014"
              title={
                <>
                  It started with a pot of chai and <em className="text-terracotta">three curries.</em>
                </>
              }
            />
            <Reveal delay={0.1} className="mt-8 space-y-5 text-[1.02rem] leading-relaxed text-muted">
              <p>
                Founders Karan and Naina Mehra grew up in kitchens that never closed — Karan in his nani’s home in Srinagar,
                Naina in her family’s Udupi restaurant in Matunga. When they opened Aangan in {site.established}, the plan was
                modest: cook the food they missed, and make strangers feel like guests.
              </p>
              <p>
                Twelve years later, the tables have multiplied but the plan hasn’t changed. Recipes still come from family
                notebooks, the chai is still brewed by the same hand, and regulars still have their names on the back wall.
              </p>
            </Reveal>
            <Reveal delay={0.15}>
              <ol className="mt-12 space-y-0 border-l border-line">
                {milestones.map((m) => (
                  <li key={m.year} className="relative pb-8 pl-8 last:pb-0">
                    <span className="absolute -left-[5px] top-2 h-[9px] w-[9px] rounded-full bg-terracotta" aria-hidden="true" />
                    <p className="font-serif text-2xl italic text-espresso">{m.year}</p>
                    <p className="mt-1 leading-relaxed text-muted">{m.text}</p>
                  </li>
                ))}
              </ol>
            </Reveal>
          </div>

          <Reveal className="relative lg:col-span-6 lg:pl-6">
            <img
              src="/images/interior-industrial.webp"
              alt="Aangan’s warehouse dining room with exposed beams and hanging lamps"
              loading="lazy"
              decoding="async"
              className="aspect-[4/5] w-full object-cover sm:ml-auto sm:w-[85%]"
            />
            <div className="-mt-24 w-[62%] border-[6px] border-cream sm:-mt-40 sm:w-[52%]">
              <img
                src="/images/interior-cafe-sign.webp"
                alt="The illuminated café sign above Aangan’s coffee counter"
                loading="lazy"
                decoding="async"
                className="aspect-square w-full object-cover"
              />
            </div>
            <p className="absolute bottom-6 right-0 hidden font-serif text-[7rem] italic leading-none text-gold/30 sm:block">
              {site.established}
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── Philosophy ──────────────────────────────── */}
      <section className="section bg-cream-deep">
        <div className="container-site">
          <Reveal className="mx-auto max-w-5xl text-center">
            <p className="eyebrow justify-center">Our Philosophy</p>
            <Quote className="mx-auto mt-10 h-10 w-10 text-gold" strokeWidth={1.2} aria-hidden="true" />
            <blockquote className="mt-6 text-balance font-serif text-[clamp(1.6rem,3.6vw,3rem)] leading-[1.3] text-espresso">
              We cook the way our grandmothers did — <em className="text-terracotta">slowly, generously,</em> and never for
              show. Good food doesn’t need to shout; it needs to be shared.
            </blockquote>
            <p className="mt-8 text-[0.78rem] font-semibold uppercase tracking-[0.2em] text-muted">Naina Mehra · Co-founder</p>
          </Reveal>
        </div>
      </section>

      {/* ── Culinary Approach ───────────────────────── */}
      <section className="section">
        <div className="container-site">
          <SectionHeading
            eyebrow="Our Culinary Approach"
            title="Three words we cook by."
            intro="Regional technique, seasonal produce and a deep respect for the cooks who came before us."
          />
          <div className="mt-16 grid gap-14 md:grid-cols-3 md:gap-8 lg:gap-12">
            {approach.map((item, i) => (
              <Reveal key={item.step} delay={i * 0.1} className={i === 1 ? 'md:mt-16' : ''}>
                <div className="group overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.alt}
                    loading="lazy"
                    decoding="async"
                    className="aspect-[4/5] w-full object-cover transition-transform duration-[1.2s] group-hover:scale-105"
                  />
                </div>
                <p className="mt-7 font-serif text-[2.6rem] italic leading-none text-terracotta">
                  {String(i + 1).padStart(2, '0')}. {item.step}
                </p>
                <h3 className="mt-4 font-sans text-[0.78rem] font-semibold uppercase tracking-[0.18em] text-espresso">{item.title}</h3>
                <p className="mt-3 leading-relaxed text-muted">{item.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Chef ────────────────────────────────────── */}
      <section className="section bg-espresso text-cream">
        <div className="container-site grid items-center gap-14 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-5">
            <div className="relative isolate mx-auto max-w-md lg:max-w-none">
              <img
                src="/images/chef-portrait.webp"
                alt="Executive Chef Karan Mehra smiling in his chef whites"
                loading="lazy"
                decoding="async"
                className="aspect-[4/5] w-full object-cover object-top"
              />
              <span className="absolute -bottom-4 -right-4 -z-10 hidden h-full w-full border border-gold/50 sm:block" aria-hidden="true" />
            </div>
          </Reveal>
          <div className="lg:col-span-7">
            <SectionHeading light eyebrow="Meet the Chef" title={<>Karan Mehra</>} />
            <Reveal delay={0.05}>
              <p className="mt-3 text-[0.78rem] font-semibold uppercase tracking-[0.2em] text-gold">Executive Chef &amp; Co-founder</p>
            </Reveal>
            <Reveal delay={0.1} className="mt-8 space-y-5 text-[1.02rem] leading-relaxed text-cream/70">
              <p>
                Trained at IHM Mumbai and seasoned in the kitchens of Delhi, Chennai and London, Karan came home with one
                conviction: India’s regional cooking deserves the same care as any fine-dining cuisine in the world.
              </p>
              <p>
                At Aangan he leads a team of eighteen cooks from nine states, each bringing a dish from home. His own
                contribution is the Kashmiri rogan josh — his grandmother’s recipe, unchanged except for the plate.
              </p>
            </Reveal>
            <Reveal delay={0.15} className="mt-10 border-l-2 border-gold pl-6">
              <p className="font-serif text-xl italic leading-relaxed text-cream sm:text-2xl">
                “A recipe is a memory you can taste. My job is simply not to get in its way.”
              </p>
            </Reveal>
            <Reveal delay={0.2}>
              <dl className="mt-10 grid grid-cols-3 gap-4 border-t border-white/15 pt-8">
                {[
                  ['20+', 'Years cooking'],
                  ['9', 'States in the kitchen'],
                  ['3', 'Family recipe books'],
                ].map(([value, label]) => (
                  <div key={label}>
                    <dt className="sr-only">{label}</dt>
                    <dd className="font-serif text-3xl text-gold sm:text-4xl">{value}</dd>
                    <dd className="mt-2 text-[0.68rem] font-semibold uppercase leading-snug tracking-[0.14em] text-cream/55">{label}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── Values ──────────────────────────────────── */}
      <section className="section">
        <div className="container-site grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <SectionHeading
              size="md"
              eyebrow="What We Value"
              title="The quiet principles behind every plate."
              className="lg:sticky lg:top-32"
            />
          </div>
          <div className="grid gap-px border border-line bg-line sm:grid-cols-2 lg:col-span-8">
            {values.map(({ icon: Icon, title, text }, i) => (
              <Reveal key={title} delay={(i % 2) * 0.08} className="bg-cream p-8 sm:p-10">
                <Icon className="h-8 w-8 text-terracotta" strokeWidth={1.3} aria-hidden="true" />
                <h3 className="mt-6 font-serif text-[1.6rem]">{title}</h3>
                <p className="mt-3 leading-relaxed text-muted">{text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Interiors ───────────────────────────────── */}
      <section className="section border-t border-line bg-white">
        <div className="container-site">
          <SectionHeading
            eyebrow="The Space"
            title="Four rooms, one courtyard spirit."
            intro="From sunlit breakfasts in the café to candle-lit dinners in the atrium — and a private room for up to twenty-four guests."
          />
          <div className="mt-14 grid gap-4 md:grid-cols-12">
            {spaces.map((space, i) => (
              <Reveal key={space.caption} delay={(i % 2) * 0.08} className={`group relative overflow-hidden bg-line ${space.className}`}>
                <img
                  src={space.src}
                  alt={space.alt}
                  loading="lazy"
                  decoding="async"
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1.2s] group-hover:scale-105"
                />
                <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-espresso-900/70 to-transparent p-5 pt-16">
                  <span className="font-serif text-xl italic text-white">{space.caption}</span>
                </span>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <ReservationCTA
        eyebrow="Come Visit"
        title="Pull up a chair in our courtyard."
        text="Whether it’s a quick filter coffee or a long weekend thali, we’d love to cook for you."
        image="/images/brunch-table.webp"
      />
    </>
  )
}
