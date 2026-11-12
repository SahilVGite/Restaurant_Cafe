import { motion } from 'framer-motion'
import { Award, Flame } from 'lucide-react'
import DietIndicator from '../common/DietIndicator'
import { formatPrice } from '../../utils/format'

const tagStyles = {
  bestseller: { label: 'Bestseller', icon: Flame, className: 'bg-terracotta/10 text-terracotta-dark' },
  chef: { label: 'Chef’s Special', icon: Award, className: 'bg-gold/20 text-espresso' },
}

export default function MenuItemCard({ item, index }) {
  return (
    <motion.article
      layout="position"
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10, transition: { duration: 0.15 } }}
      transition={{ duration: 0.45, delay: index * 0.04, ease: [0.22, 1, 0.36, 1] }}
      className="group flex gap-4 border-b border-line py-6 xs:gap-5 sm:gap-6"
    >
      <div className="relative h-24 w-24 shrink-0 overflow-hidden bg-line xs:h-28 xs:w-28 sm:h-32 sm:w-32">
        <img
          src={item.image}
          alt={item.alt}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex items-start justify-between gap-3">
          <h3 className="flex items-start gap-2.5 font-serif text-[1.15rem] leading-snug xs:text-[1.3rem]">
            <DietIndicator diet={item.diet} className="mt-1.5" />
            <span>{item.name}</span>
          </h3>
          <p className="shrink-0 pt-0.5 font-serif text-[1.1rem] text-terracotta xs:text-lg">{formatPrice(item.price)}</p>
        </div>
        <p className="mt-2 text-[0.9rem] leading-relaxed text-muted sm:text-[0.95rem]">{item.description}</p>
        {item.tags.length > 0 && (
          <ul className="mt-3 flex flex-wrap gap-2" aria-label="Highlights">
            {item.tags.map((tag) => {
              const { label, icon: Icon, className } = tagStyles[tag]
              return (
                <li
                  key={tag}
                  className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-[0.62rem] font-semibold uppercase tracking-[0.16em] ${className}`}
                >
                  <Icon className="h-3 w-3" strokeWidth={2} aria-hidden="true" />
                  {label}
                </li>
              )
            })}
          </ul>
        )}
      </div>
    </motion.article>
  )
}
