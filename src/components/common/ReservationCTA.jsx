import { ArrowRight, Phone } from 'lucide-react'
import Button from './Button'
import Reveal from './Reveal'
import { site } from '../../data/site'

/** Full-bleed photographic call-to-action used at the end of Home and About. */
export default function ReservationCTA({
  eyebrow = 'Reservations',
  title = 'Your table is waiting.',
  text = 'Lunch, long dinners, birthdays or a quiet coffee for one — reserve ahead for dinner service and weekends. Walk-ins are always welcome at the café.',
  image = '/images/interior-dark.webp',
  secondary = { label: 'Explore the Menu', to: '/menu' },
}) {
  return (
    <section className="relative isolate overflow-hidden bg-espresso">
      <img
        src={image}
        alt=""
        aria-hidden="true"
        loading="lazy"
        decoding="async"
        className="absolute inset-0 -z-10 h-full w-full object-cover"
      />
      <div className="absolute inset-0 -z-10 bg-espresso-900/75" />
      <div className="container-site py-24 sm:py-32 lg:py-40">
        <Reveal className="mx-auto max-w-3xl text-center">
          <p className="eyebrow justify-center text-gold">{eyebrow}</p>
          <h2 className="display-xl mt-6 text-balance text-white">{title}</h2>
          <p className="mx-auto mt-6 max-w-xl text-pretty text-[1.05rem] leading-relaxed text-cream/75 sm:text-lg">{text}</p>
          <div className="mt-10 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center">
            <Button to="/contact#reserve" size="lg" icon={ArrowRight}>
              Book a Table
            </Button>
            {secondary && (
              <Button to={secondary.to} variant="light" size="lg">
                {secondary.label}
              </Button>
            )}
          </div>
          <a
            href={site.phoneHref}
            className="mt-8 inline-flex items-center gap-2 text-sm text-cream/70 transition-colors hover:text-gold"
          >
            <Phone className="h-4 w-4" strokeWidth={1.75} aria-hidden="true" />
            Prefer to call? {site.phone}
          </a>
        </Reveal>
      </div>
    </section>
  )
}
