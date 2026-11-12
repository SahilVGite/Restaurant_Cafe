import { useMemo, useRef } from 'react'
import { useSearchParams } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowRight, Info, Leaf } from 'lucide-react'
import PageHero from '../components/common/PageHero'
import Button from '../components/common/Button'
import DietIndicator from '../components/common/DietIndicator'
import Reveal from '../components/common/Reveal'
import MenuTabs from '../components/menu/MenuTabs'
import MenuItemCard from '../components/menu/MenuItemCard'
import { menuCategories, menuItems } from '../data/menuItems'
import { site } from '../data/site'
import useDocumentTitle from '../hooks/useDocumentTitle'
import { cn } from '../utils/format'

const dietFilters = [
  { id: 'all', label: 'All' },
  { id: 'veg', label: 'Veg' },
  { id: 'non-veg', label: 'Non-Veg' },
]

export default function Menu() {
  useDocumentTitle('Menu')
  const [params, setParams] = useSearchParams()
  const sectionRef = useRef(null)

  const activeId = menuCategories.some((c) => c.id === params.get('category')) ? params.get('category') : menuCategories[0].id
  const diet = dietFilters.some((d) => d.id === params.get('diet')) ? params.get('diet') : 'all'
  const category = menuCategories.find((c) => c.id === activeId)

  const items = useMemo(
    () => menuItems.filter((item) => item.category === activeId && (diet === 'all' || item.diet === diet)),
    [activeId, diet],
  )

  const update = (next) => {
    const merged = { category: activeId, diet, ...next }
    const search = new URLSearchParams()
    if (merged.category !== menuCategories[0].id) search.set('category', merged.category)
    if (merged.diet !== 'all') search.set('diet', merged.diet)
    setParams(search, { replace: true, preventScrollReset: true })
    // Bring the list back into view if the visitor had scrolled deep into a long category.
    const top = sectionRef.current?.getBoundingClientRect().top ?? 0
    if (top < -40) {
      window.scrollTo({ top: window.scrollY + top - 8, behavior: 'smooth' })
    }
  }

  return (
    <>
      <PageHero
        crumb="Menu"
        eyebrow="Seasonal Menu · Autumn"
        title={
          <>
            Regional India, <em className="text-gold">one plate at a time.</em>
          </>
        }
        intro="Nearly thirty dishes from fourteen regional kitchens — starters for sharing, slow-cooked mains, house desserts and our café bar."
        image="/images/thali-steel.webp"
        imageAlt="A steel thali with roti, curries and chaas on a wooden table"
      />

      <section ref={sectionRef} className="scroll-mt-20 pb-24 sm:pb-32">
        {/* Sticky category bar */}
        <div className="sticky top-[4.5rem] z-30 border-b border-line bg-cream/95 backdrop-blur-md">
          <div className="container-site flex flex-col gap-0 lg:flex-row lg:items-center lg:justify-between lg:gap-8">
            <MenuTabs categories={menuCategories} active={activeId} onChange={(id) => update({ category: id })} />
            <div
              role="radiogroup"
              aria-label="Filter by diet"
              className="flex items-center gap-1 border-t border-line py-3 lg:border-t-0 lg:py-0"
            >
              {dietFilters.map((f) => (
                <button
                  key={f.id}
                  type="button"
                  role="radio"
                  aria-checked={diet === f.id}
                  onClick={() => update({ diet: f.id })}
                  className={cn(
                    'inline-flex h-9 items-center gap-2 border px-3.5 text-[0.7rem] font-semibold uppercase tracking-[0.14em] transition-colors',
                    diet === f.id ? 'border-espresso bg-espresso text-cream' : 'border-line bg-white text-muted hover:border-espresso/50 hover:text-espresso',
                  )}
                >
                  {f.id !== 'all' && <DietIndicator diet={f.id} className="h-3.5 w-3.5" />}
                  {f.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="container-site mt-12 grid gap-12 lg:mt-16 lg:grid-cols-12 lg:gap-16">
          {/* Category intro with photograph */}
          <aside className="lg:col-span-4">
            <div className="lg:sticky lg:top-44">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeId}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.35 }}
                  className="grid gap-6 sm:grid-cols-[1fr_1.2fr] sm:items-center lg:grid-cols-1"
                >
                  <div className="overflow-hidden bg-line">
                    <img
                      src={category.image}
                      alt={category.imageAlt}
                      className="aspect-[4/3] w-full object-cover lg:aspect-[4/5]"
                    />
                  </div>
                  <div>
                    <p className="eyebrow">
                      {String(menuCategories.indexOf(category) + 1).padStart(2, '0')} / {String(menuCategories.length).padStart(2, '0')}
                    </p>
                    <h2 className="display-md mt-4">{category.label}</h2>
                    <p className="mt-4 leading-relaxed text-muted">{category.blurb}</p>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </aside>

          {/* Items */}
          <div
            className="lg:col-span-8"
            role="tabpanel"
            id={`panel-${activeId}`}
            aria-labelledby={`tab-${activeId}`}
            tabIndex={0}
          >
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-espresso pb-4 text-[0.75rem] font-semibold uppercase tracking-[0.16em] text-muted">
              <span aria-live="polite">
                {items.length} {items.length === 1 ? 'dish' : 'dishes'}
                {diet !== 'all' && ` · ${diet === 'veg' ? 'Vegetarian' : 'Non-vegetarian'}`}
              </span>
              <span className="flex items-center gap-4 normal-case tracking-normal">
                <span className="inline-flex items-center gap-1.5">
                  <DietIndicator diet="veg" className="h-3.5 w-3.5" /> Veg
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <DietIndicator diet="non-veg" className="h-3.5 w-3.5" /> Non-veg
                </span>
              </span>
            </div>

            <AnimatePresence mode="wait">
              <motion.div key={`${activeId}-${diet}`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>
                {items.length > 0 ? (
                  items.map((item, i) => <MenuItemCard key={item.id} item={item} index={i} />)
                ) : (
                  <div className="flex flex-col items-center py-20 text-center">
                    <Leaf className="h-8 w-8 text-gold" strokeWidth={1.3} aria-hidden="true" />
                    <p className="mt-5 font-serif text-2xl text-espresso">
                      No {diet === 'veg' ? 'vegetarian' : 'non-vegetarian'} dishes in {category.label.toLowerCase()}.
                    </p>
                    <p className="mt-2 text-muted">Everything here suits the other side of the table.</p>
                    <Button variant="outline" size="sm" className="mt-8" onClick={() => update({ diet: 'all' })}>
                      Show all dishes
                    </Button>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>

            <p className="mt-10 flex items-start gap-3 text-sm leading-relaxed text-muted">
              <Info className="mt-0.5 h-4 w-4 shrink-0 text-terracotta" strokeWidth={1.75} aria-hidden="true" />
              All prices are in Indian Rupees and exclusive of 5% GST. Please tell your server about any allergies — most dishes
              can be made Jain, gluten-free or less spicy on request.
            </p>
          </div>
        </div>
      </section>

      {/* Closing CTA strip */}
      <section className="bg-espresso">
        <Reveal className="container-site flex flex-col items-start justify-between gap-8 py-16 md:flex-row md:items-center lg:py-20">
          <div>
            <p className="eyebrow text-gold">Hungry yet?</p>
            <h2 className="display-md mt-4 text-cream">
              Book a table and let the <em className="text-gold">kitchen take over.</em>
            </h2>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button to="/contact#reserve" size="lg" icon={ArrowRight}>
              Book a Table
            </Button>
            <Button href={site.phoneHref} variant="light" size="lg">
              Call to Order
            </Button>
          </div>
        </Reveal>
      </section>
    </>
  )
}
