import { Expand } from 'lucide-react'
import { cn } from '../../utils/format'

/** Clickable photo tile with a quiet hover caption; opens the lightbox. */
export default function GalleryTile({ image, onOpen, className, fill = false, sizes }) {
  return (
    <button
      type="button"
      onClick={onOpen}
      aria-label={`View larger: ${image.caption}`}
      className={cn('group relative block w-full overflow-hidden bg-line text-left', className)}
    >
      <img
        src={image.src}
        alt={image.alt}
        width={image.w}
        height={image.h}
        sizes={sizes}
        loading="lazy"
        decoding="async"
        className={cn(
          'w-full transition-transform duration-[1.2s] ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-[1.04]',
          fill ? 'absolute inset-0 h-full object-cover' : 'h-auto',
        )}
      />
      <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-espresso-900/70 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100 group-focus-visible:opacity-100" />
      <span className="pointer-events-none absolute inset-x-0 bottom-0 flex translate-y-2 items-end justify-between gap-3 p-4 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100 sm:p-5">
        <span>
          <span className="block text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-gold">{image.category}</span>
          <span className="mt-1 block font-serif text-lg italic leading-tight text-white">{image.caption}</span>
        </span>
        <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center border border-white/40 text-white">
          <Expand className="h-4 w-4" strokeWidth={1.5} aria-hidden="true" />
        </span>
      </span>
    </button>
  )
}
