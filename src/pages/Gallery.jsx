import { useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Camera } from 'lucide-react'
import PageHero from '../components/common/PageHero'
import ReservationCTA from '../components/common/ReservationCTA'
import GalleryTile from '../components/gallery/GalleryTile'
import Lightbox from '../components/gallery/Lightbox'
import { galleryCategories, galleryImages } from '../data/galleryImages'
import useDocumentTitle from '../hooks/useDocumentTitle'
import { cn } from '../utils/format'

export default function Gallery() {
  useDocumentTitle('Gallery')
  const [filter, setFilter] = useState('All')
  const [lightboxIndex, setLightboxIndex] = useState(null)

  const images = useMemo(
    () => (filter === 'All' ? galleryImages : galleryImages.filter((img) => img.category === filter)),
    [filter],
  )
  const counts = useMemo(
    () =>
      Object.fromEntries(
        galleryCategories.map((c) => [c, c === 'All' ? galleryImages.length : galleryImages.filter((i) => i.category === c).length]),
      ),
    [],
  )

  return (
    <>
      <PageHero
        crumb="Gallery"
        eyebrow="Gallery"
        title={
          <>
            Moments from the <em className="text-gold">courtyard.</em>
          </>
        }
        intro="Plates from the pass, the glow of the bar after dark, Sunday tables that ran long — a look inside Aangan."
        image="/images/latte-cheers.webp"
        imageAlt="Friends raising cups of coffee with latte art in a toast"
      />

      <section className="pb-24 pt-14 sm:pb-32 sm:pt-20">
        <div className="container-site">
          <div className="flex flex-col justify-between gap-6 border-b border-line pb-6 md:flex-row md:items-center">
            <div role="radiogroup" aria-label="Filter photographs by category" className="flex flex-wrap gap-2">
              {galleryCategories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  role="radio"
                  aria-checked={filter === cat}
                  onClick={() => setFilter(cat)}
                  className={cn(
                    'inline-flex h-10 items-center gap-2 border px-4 text-[0.72rem] font-semibold uppercase tracking-[0.16em] transition-colors',
                    filter === cat ? 'border-espresso bg-espresso text-cream' : 'border-line bg-white text-muted hover:border-espresso/40 hover:text-espresso',
                  )}
                >
                  {cat}
                  <span className={cn('text-[0.65rem]', filter === cat ? 'text-gold' : 'text-muted/70')}>{counts[cat]}</span>
                </button>
              ))}
            </div>
            <p className="inline-flex items-center gap-2 text-sm text-muted" aria-live="polite">
              <Camera className="h-4 w-4 text-terracotta" strokeWidth={1.75} aria-hidden="true" />
              Showing {images.length} photographs · tap any image to enlarge
            </p>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={filter}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="mt-10 columns-1 gap-4 xs:columns-2 lg:columns-3 2xl:columns-4"
            >
              {images.map((image, i) => (
                <div key={image.id} className="mb-4 break-inside-avoid">
                  <GalleryTile
                    image={image}
                    onOpen={() => setLightboxIndex(i)}
                    sizes="(min-width: 1536px) 25vw, (min-width: 1024px) 33vw, (min-width: 430px) 50vw, 100vw"
                  />
                </div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      <Lightbox images={images} index={lightboxIndex} onClose={() => setLightboxIndex(null)} onIndexChange={setLightboxIndex} />

      <ReservationCTA
        eyebrow="See It For Yourself"
        title="Photos only tell half the story."
        text="The other half is the smell of the tandoor and the sound of a full room. Come and taste it."
        image="/images/kitchen-pass.webp"
        secondary={{ label: 'View the Menu', to: '/menu' }}
      />
    </>
  )
}
