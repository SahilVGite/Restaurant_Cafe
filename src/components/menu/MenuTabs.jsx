import { useRef } from 'react'
import { motion } from 'framer-motion'
import { cn } from '../../utils/format'

/** Accessible tablist (arrow keys / Home / End) with an animated underline. */
export default function MenuTabs({ categories, active, onChange }) {
  const refs = useRef({})

  const onKeyDown = (e, index) => {
    const keys = { ArrowRight: 1, ArrowLeft: -1 }
    let next = null
    if (e.key in keys) next = (index + keys[e.key] + categories.length) % categories.length
    if (e.key === 'Home') next = 0
    if (e.key === 'End') next = categories.length - 1
    if (next === null) return
    e.preventDefault()
    const id = categories[next].id
    onChange(id)
    refs.current[id]?.focus()
  }

  return (
    <div role="tablist" aria-label="Menu categories" className="no-scrollbar -mx-5 flex overflow-x-auto px-5 sm:mx-0 sm:px-0">
      {categories.map((cat, i) => {
        const selected = cat.id === active
        return (
          <button
            key={cat.id}
            ref={(el) => (refs.current[cat.id] = el)}
            type="button"
            role="tab"
            id={`tab-${cat.id}`}
            aria-selected={selected}
            aria-controls={`panel-${cat.id}`}
            tabIndex={selected ? 0 : -1}
            onClick={() => onChange(cat.id)}
            onKeyDown={(e) => onKeyDown(e, i)}
            className={cn(
              'shrink-0 whitespace-nowrap px-4 text-[0.75rem] font-semibold uppercase tracking-[0.18em] transition-colors first:pl-0 sm:px-6',
              selected ? 'text-espresso' : 'text-muted hover:text-espresso',
            )}
          >
            <span className="relative block py-5">
              {cat.label}
              {selected && (
                <motion.span
                  layoutId="menu-tab-underline"
                  className="absolute inset-x-0 bottom-0 h-[2px] bg-terracotta"
                  transition={{ type: 'spring', stiffness: 420, damping: 36 }}
                />
              )}
            </span>
          </button>
        )
      })}
    </div>
  )
}
