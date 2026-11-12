import DietIndicator from '../common/DietIndicator'
import { formatPrice } from '../../utils/format'

/** Editorial signature-dish card (homepage). */
export default function DishCard({ dish, index }) {
  return (
    <article className="group">
      <div className="relative aspect-[4/5] overflow-hidden bg-line">
        <img
          src={dish.image}
          alt={dish.alt}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover transition-transform duration-[1.2s] ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-105"
        />
        <span className="absolute left-4 top-4 bg-cream/95 px-3 py-1.5 text-[0.62rem] font-semibold uppercase tracking-[0.2em] text-espresso">
          {dish.signatureLabel}
        </span>
        <span className="absolute bottom-4 right-4 font-serif text-5xl italic leading-none text-white/90 drop-shadow-sm">
          {String(index + 1).padStart(2, '0')}
        </span>
      </div>
      <div className="mt-6">
        <div className="flex items-baseline gap-3">
          <DietIndicator diet={dish.diet} className="translate-y-0.5" />
          <h3 className="font-serif text-[1.45rem] leading-tight transition-colors duration-300 group-hover:text-terracotta">
            {dish.name}
          </h3>
          <span aria-hidden="true" className="mb-1.5 hidden min-w-[1.5rem] flex-1 border-b border-dotted border-muted/50 xs:block" />
          <p className="ml-auto shrink-0 font-serif text-lg text-terracotta xs:ml-0">{formatPrice(dish.price)}</p>
        </div>
        <p className="mt-3 text-[0.95rem] leading-relaxed text-muted">{dish.description}</p>
      </div>
    </article>
  )
}
