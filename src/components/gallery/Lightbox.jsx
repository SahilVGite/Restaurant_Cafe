import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import useLockBodyScroll from '../../hooks/useLockBodyScroll'

/**
 * Accessible image lightbox: Esc closes, ←/→ navigate, swipe on touch, focus is trapped
 * on the controls and restored to the trigger on close.
 */
export default function Lightbox({ images, index, onClose, onIndexChange }) {
  const open = index !== null && index >= 0
  const [direction, setDirection] = useState(0)
  const closeRef = useRef(null)
  const dialogRef = useRef(null)
  const lastFocused = useRef(null)
  useLockBodyScroll(open)

  const go = (step) => {
    setDirection(step)
    onIndexChange((index + step + images.length) % images.length)
  }

  useEffect(() => {
    if (!open) return
    lastFocused.current = document.activeElement
    closeRef.current?.focus()
    return () => lastFocused.current?.focus?.()
  }, [open])

  useEffect(() => {
    if (!open) return
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
      else if (e.key === 'ArrowRight') go(1)
      else if (e.key === 'ArrowLeft') go(-1)
      else if (e.key === 'Tab') {
        const focusables = dialogRef.current?.querySelectorAll('button')
        if (!focusables?.length) return
        const first = focusables[0]
        const last = focusables[focusables.length - 1]
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault()
          last.focus()
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault()
          first.focus()
        }
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, index, images.length])

  const image = open ? images[index] : null

  return createPortal(
    <AnimatePresence>
      {open && image && (
        <motion.div
          ref={dialogRef}
          role="dialog"
          aria-modal="true"
          aria-label={`Image viewer: ${image.caption}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[90] flex flex-col bg-espresso-900/[0.97] text-cream"
        >
          <div className="flex items-center justify-between gap-4 px-4 py-4 sm:px-8">
            <p className="text-[0.72rem] font-semibold uppercase tracking-[0.2em] text-cream/60" aria-live="polite">
              <span className="text-gold">{String(index + 1).padStart(2, '0')}</span> / {String(images.length).padStart(2, '0')}
            </p>
            <button
              ref={closeRef}
              type="button"
              onClick={onClose}
              aria-label="Close image viewer"
              className="inline-flex h-11 w-11 items-center justify-center border border-white/15 transition-colors hover:border-gold hover:text-gold"
            >
              <X className="h-5 w-5" strokeWidth={1.5} />
            </button>
          </div>

          <div className="relative flex min-h-0 flex-1 items-center justify-center px-4 sm:px-20" onClick={onClose}>
            <AnimatePresence initial={false} custom={direction} mode="popLayout">
              <motion.img
                key={image.id}
                src={image.src}
                alt={image.alt}
                width={image.w}
                height={image.h}
                custom={direction}
                initial={{ opacity: 0, x: direction * 60 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: direction * -60 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.6}
                onDragEnd={(_, info) => {
                  if (info.offset.x < -70) go(1)
                  else if (info.offset.x > 70) go(-1)
                }}
                onClick={(e) => e.stopPropagation()}
                className="max-h-[calc(100svh-11rem)] w-auto max-w-full cursor-grab select-none object-contain active:cursor-grabbing"
                draggable={false}
              />
            </AnimatePresence>

            {images.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation()
                    go(-1)
                  }}
                  aria-label="Previous image"
                  className="absolute left-2 top-1/2 hidden h-12 w-12 -translate-y-1/2 items-center justify-center border border-white/15 bg-espresso-900/40 transition-colors hover:border-gold hover:text-gold sm:left-6 sm:inline-flex"
                >
                  <ChevronLeft className="h-5 w-5" strokeWidth={1.5} />
                </button>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation()
                    go(1)
                  }}
                  aria-label="Next image"
                  className="absolute right-2 top-1/2 hidden h-12 w-12 -translate-y-1/2 items-center justify-center border border-white/15 bg-espresso-900/40 transition-colors hover:border-gold hover:text-gold sm:right-6 sm:inline-flex"
                >
                  <ChevronRight className="h-5 w-5" strokeWidth={1.5} />
                </button>
              </>
            )}
          </div>

          <div className="flex items-center justify-between gap-4 px-4 py-5 sm:justify-center sm:px-8">
            {images.length > 1 && (
              <button
                type="button"
                onClick={() => go(-1)}
                aria-label="Previous image"
                className="inline-flex h-11 w-11 shrink-0 items-center justify-center border border-white/15 sm:hidden"
              >
                <ChevronLeft className="h-5 w-5" strokeWidth={1.5} />
              </button>
            )}
            <div className="min-w-0 text-center">
              <p className="truncate font-serif text-lg italic text-cream sm:text-xl">{image.caption}</p>
              <p className="mt-1 text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-gold">{image.category}</p>
            </div>
            {images.length > 1 && (
              <button
                type="button"
                onClick={() => go(1)}
                aria-label="Next image"
                className="inline-flex h-11 w-11 shrink-0 items-center justify-center border border-white/15 sm:hidden"
              >
                <ChevronRight className="h-5 w-5" strokeWidth={1.5} />
              </button>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  )
}
