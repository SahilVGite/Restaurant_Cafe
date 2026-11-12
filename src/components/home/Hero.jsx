import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowDown, ArrowRight, Clock, Star } from 'lucide-react'
import Button from '../common/Button'
import { site } from '../../data/site'
import { getOpenStatus } from '../../utils/hours'

const ease = [0.22, 1, 0.36, 1]
const lines = [
  { text: 'Good Food.', className: '' },
  { text: 'Great Moments.', className: 'italic text-gold' },
  { text: 'Unforgettable Experiences.', className: '' },
]

export default function Hero() {
  const { scrollY } = useScroll()
  const imageY = useTransform(scrollY, [0, 800], [0, 120])
  const status = getOpenStatus()

  return (
    <section className="relative isolate flex min-h-[100svh] flex-col overflow-hidden bg-espresso-900">
      <motion.div style={{ y: imageY }} className="absolute inset-0 -z-10">
        <motion.img
          src="/images/hero-dining.webp"
          alt="A beautifully plated dish being served at a candle-lit table at Aangan"
          initial={{ scale: 1.12 }}
          animate={{ scale: 1 }}
          transition={{ duration: 2.2, ease }}
          className="h-full w-full object-cover object-[60%_center]"
          fetchpriority="high"
        />
      </motion.div>
      {/* Legibility scrim: heavier on the left where the copy sits */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-espresso-900/90 via-espresso-900/60 to-espresso-900/20" />
      <div className="absolute inset-x-0 bottom-0 -z-10 h-1/3 bg-gradient-to-t from-espresso-900/70 to-transparent" />

      <div className="container-site relative flex flex-1 flex-col justify-center pb-10 pt-32 sm:pt-36">
        <div className="grid items-end gap-12 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease }}
              className="eyebrow text-gold"
            >
              Est. {site.established} · Kala Ghoda, Mumbai
            </motion.p>
            <h1 className="mt-6 font-serif text-[clamp(2.55rem,7.2vw,6.4rem)] font-medium leading-[1.02] tracking-[-0.02em] text-white">
              {lines.map((line, i) => (
                <span key={line.text} className="block overflow-hidden pb-[0.08em]">
                  <motion.span
                    className={`block ${line.className}`}
                    initial={{ y: '105%' }}
                    animate={{ y: 0 }}
                    transition={{ duration: 1.1, delay: 0.3 + i * 0.12, ease }}
                  >
                    {line.text}
                  </motion.span>
                </span>
              ))}
            </h1>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.8, ease }}
              className="mt-7 max-w-xl text-pretty text-[1.05rem] leading-relaxed text-cream/80 sm:text-lg"
            >
              Regional Indian cooking, single-estate coffee and a courtyard full of conversation. Come for lunch, stay for
              the chai — and let us take care of the rest.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.95, ease }}
              className="mt-10 flex flex-col gap-3 sm:flex-row"
            >
              <Button to="/menu" size="lg" icon={ArrowRight}>
                Explore Our Menu
              </Button>
              <Button to="/contact#reserve" variant="light" size="lg">
                Reserve a Table
              </Button>
            </motion.div>
          </div>

          {/* Editorial inset composition (desktop) */}
          <motion.figure
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, delay: 0.9, ease }}
            className="relative hidden lg:col-span-4 lg:block"
          >
            <div className="ml-auto w-[78%] border border-white/20 p-2">
              <img
                src="/images/paneer-makhani.webp"
                alt="Paneer lababdar in a copper bowl with papad and saffron rice"
                className="aspect-[3/4] w-full object-cover"
              />
            </div>
            <figcaption className="absolute -left-2 bottom-8 max-w-[13rem] bg-cream px-5 py-4">
              <span className="block text-[0.62rem] font-semibold uppercase tracking-[0.2em] text-terracotta">Today’s Special</span>
              <span className="mt-1 block font-serif text-lg italic leading-snug text-espresso">Paneer Lababdar</span>
            </figcaption>
          </motion.figure>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.2 }}
        className="relative border-t border-white/15"
      >
        <div className="container-site flex flex-wrap items-center justify-between gap-x-8 gap-y-3 py-5 text-[0.8rem] text-cream/75">
          <div className="flex flex-wrap items-center gap-x-8 gap-y-3">
            <span className="inline-flex items-center gap-2">
              <span className={`h-2 w-2 rounded-full ${status.isOpen ? 'bg-green-500' : 'bg-gold'}`} aria-hidden="true" />
              {status.label}
            </span>
            <span className="inline-flex items-center gap-2">
              <Star className="h-3.5 w-3.5 fill-gold text-gold" aria-hidden="true" />
              {site.rating.score} from {site.rating.count} guest reviews
            </span>
            <span className="hidden items-center gap-2 md:inline-flex">
              <Clock className="h-3.5 w-3.5 text-gold" strokeWidth={1.75} aria-hidden="true" />
              Breakfast · Lunch · Dinner
            </span>
          </div>
          <a
            href="#introduction"
            onClick={(e) => {
              e.preventDefault()
              document.getElementById('introduction')?.scrollIntoView({ behavior: 'smooth' })
            }}
            className="hidden items-center gap-2 uppercase tracking-[0.2em] transition-colors hover:text-gold sm:inline-flex"
          >
            Scroll
            <ArrowDown className="h-3.5 w-3.5 animate-bounce" aria-hidden="true" />
          </a>
        </div>
      </motion.div>
    </section>
  )
}
