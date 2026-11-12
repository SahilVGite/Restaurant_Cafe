import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ChevronRight } from 'lucide-react'

/** Inner-page hero: full-bleed photograph, breadcrumb and editorial title. */
export default function PageHero({ eyebrow, title, intro, image, imageAlt, position = 'center', crumb }) {
  return (
    <section className="relative isolate flex min-h-[30rem] items-end overflow-hidden bg-espresso pb-14 pt-36 sm:min-h-[34rem] sm:pb-20 lg:min-h-[38rem]">
      <motion.img
        src={image}
        alt={imageAlt}
        initial={{ scale: 1.08 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
        className="absolute inset-0 -z-10 h-full w-full object-cover"
        style={{ objectPosition: position }}
        fetchpriority="high"
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-espresso-900/90 via-espresso-900/50 to-espresso-900/40" />
      <div className="container-site">
        <nav
          aria-label="Breadcrumb"
          className="mb-6 flex items-center gap-2 text-[0.72rem] font-medium uppercase tracking-[0.18em] text-cream/70"
        >
          <Link to="/" className="transition-colors hover:text-gold">
            Home
          </Link>
          <ChevronRight className="h-3.5 w-3.5" aria-hidden="true" />
          <span aria-current="page" className="text-gold">
            {crumb}
          </span>
        </nav>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-4xl"
        >
          {eyebrow && <p className="eyebrow text-gold">{eyebrow}</p>}
          <h1 className="display-xl mt-5 text-balance text-white">{title}</h1>
          {intro && (
            <p className="mt-6 max-w-2xl text-pretty text-[1.05rem] leading-relaxed text-cream/80 sm:text-lg">{intro}</p>
          )}
        </motion.div>
      </div>
    </section>
  )
}
