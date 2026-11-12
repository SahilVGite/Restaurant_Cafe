import { useCallback, useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowLeft, ArrowRight, Pause, Play } from 'lucide-react'
import Stars from '../common/Stars'
import { testimonials } from '../../data/testimonials'
import { cn } from '../../utils/format'

const AUTOPLAY_MS = 7000

export default function TestimonialCarousel() {
  const [[index, direction], setState] = useState([0, 1])
  const [paused, setPaused] = useState(false)
  const [hovered, setHovered] = useState(false)
  const total = testimonials.length
  const current = testimonials[index]

  const go = useCallback(
    (step) => setState(([i]) => [(i + step + total) % total, step]),
    [total],
  )
  const goTo = (i) => setState(([prev]) => [i, i > prev ? 1 : -1])

  useEffect(() => {
    if (paused || hovered) return
    const timer = setInterval(() => go(1), AUTOPLAY_MS)
    return () => clearInterval(timer)
  }, [paused, hovered, go, index])

  return (
    <div
      className="relative"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setHovered(true)}
      onBlur={() => setHovered(false)}
      role="region"
      aria-roledescription="carousel"
      aria-label="Guest reviews"
    >
      <div className="relative min-h-[22rem] overflow-hidden xs:min-h-[19rem] sm:min-h-[17rem] lg:min-h-[15rem]">
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.figure
            key={current.id}
            custom={direction}
            initial={{ opacity: 0, x: direction * 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: direction * -40 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.4}
            onDragEnd={(_, info) => {
              if (info.offset.x < -60) go(1)
              else if (info.offset.x > 60) go(-1)
            }}
            className="cursor-grab text-center active:cursor-grabbing"
            aria-roledescription="slide"
            aria-label={`${index + 1} of ${total}`}
          >
            <Stars rating={current.rating} className="justify-center" />
            <blockquote className="mx-auto mt-7 max-w-4xl text-balance font-serif text-[1.35rem] leading-[1.5] text-espresso xs:text-[1.55rem] sm:text-[1.85rem] lg:text-[2.1rem]">
              “{current.quote}”
            </blockquote>
            <figcaption className="mt-8">
              <span className="block text-[0.8rem] font-semibold uppercase tracking-[0.2em] text-espresso">{current.name}</span>
              <span className="mt-1 block text-sm text-muted">{current.detail}</span>
            </figcaption>
          </motion.figure>
        </AnimatePresence>
      </div>

      <div className="mt-10 flex items-center justify-center gap-4 sm:gap-6">
        <button
          type="button"
          onClick={() => go(-1)}
          aria-label="Previous review"
          className="inline-flex h-12 w-12 items-center justify-center border border-line text-espresso transition-colors hover:border-espresso hover:bg-espresso hover:text-cream"
        >
          <ArrowLeft className="h-4 w-4" strokeWidth={1.75} />
        </button>
        <div className="flex items-center gap-2" role="tablist" aria-label="Choose review">
          {testimonials.map((t, i) => (
            <button
              key={t.id}
              type="button"
              role="tab"
              aria-selected={i === index}
              aria-label={`Show review ${i + 1}`}
              onClick={() => goTo(i)}
              className="group flex h-8 items-center px-1"
            >
              <span
                className={cn(
                  'block h-px transition-all duration-500',
                  i === index ? 'w-10 bg-terracotta' : 'w-4 bg-muted/40 group-hover:bg-muted',
                )}
              />
            </button>
          ))}
        </div>
        <button
          type="button"
          onClick={() => go(1)}
          aria-label="Next review"
          className="inline-flex h-12 w-12 items-center justify-center border border-line text-espresso transition-colors hover:border-espresso hover:bg-espresso hover:text-cream"
        >
          <ArrowRight className="h-4 w-4" strokeWidth={1.75} />
        </button>
        <button
          type="button"
          onClick={() => setPaused((p) => !p)}
          aria-label={paused ? 'Resume automatic rotation' : 'Pause automatic rotation'}
          className="hidden h-12 w-12 items-center justify-center text-muted transition-colors hover:text-espresso xs:inline-flex"
        >
          {paused ? <Play className="h-4 w-4" strokeWidth={1.75} /> : <Pause className="h-4 w-4" strokeWidth={1.75} />}
        </button>
      </div>
    </div>
  )
}
