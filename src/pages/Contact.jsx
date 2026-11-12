import { ArrowUpRight, Clock, Mail, MapPin, Phone } from 'lucide-react'
import PageHero from '../components/common/PageHero'
import Reveal from '../components/common/Reveal'
import SectionHeading from '../components/common/SectionHeading'
import ReservationForm from '../components/forms/ReservationForm'
import EnquiryForm from '../components/forms/EnquiryForm'
import { hoursDisplay, site } from '../data/site'
import { getOpenStatus } from '../utils/hours'
import useDocumentTitle from '../hooks/useDocumentTitle'

const goodToKnow = [
  'Tables are held for 15 minutes past the booking time.',
  'For parties of 13 or more, or the private dining room (up to 24), please call or email our events team.',
  'Walk-ins are always welcome in the café — breakfast, coffee and all-day small plates.',
  'Valet parking is available from 7 pm; the nearest public car park is at Rampart Row.',
]

export default function Contact() {
  useDocumentTitle('Contact & Reservations')
  const status = getOpenStatus()

  const cards = [
    {
      icon: MapPin,
      title: 'Visit Us',
      body: (
        <>
          {site.address.line1}
          <br />
          {site.address.line2}
        </>
      ),
      link: { label: 'Get directions', href: site.mapLink, external: true },
    },
    {
      icon: Phone,
      title: 'Call Us',
      body: <a href={site.phoneHref} className="hover:text-terracotta">{site.phone}</a>,
      link: { label: 'Tap to call', href: site.phoneHref },
    },
    {
      icon: Mail,
      title: 'Email Us',
      body: (
        <>
          <a href={site.emailHref} className="break-all hover:text-terracotta">{site.email}</a>
          <br />
          <a href={`mailto:${site.eventsEmail}`} className="break-all text-muted hover:text-terracotta">{site.eventsEmail}</a>
        </>
      ),
      link: { label: 'Write to us', href: site.emailHref },
    },
    {
      icon: Clock,
      title: 'Opening Hours',
      body: (
        <ul className="space-y-1">
          {hoursDisplay.map((h) => (
            <li key={h.label} className="flex justify-between gap-3">
              <span className="text-muted">{h.label}</span>
              <span>{h.value}</span>
            </li>
          ))}
        </ul>
      ),
      status,
    },
  ]

  return (
    <>
      <PageHero
        crumb="Contact"
        eyebrow="Contact & Reservations"
        title={
          <>
            Save us a seat? <em className="text-gold">We’d love to.</em>
          </>
        }
        intro="Request a table online, call the team, or drop by the café — we’re a short walk from Jehangir Art Gallery."
        image="/images/coffee-flight.webp"
        imageAlt="Coffee, espresso and sparkling water served on a wooden tray"
      />

      {/* ── Contact details ──────────────────────────── */}
      <section className="border-b border-line bg-white">
        <div className="container-site grid gap-px bg-line sm:grid-cols-2 lg:grid-cols-4">
          {cards.map(({ icon: Icon, title, body, link, status: st }, i) => (
            <Reveal
              key={title}
              delay={i * 0.06}
              className="bg-white py-10 sm:p-8 lg:p-10"
            >
              <Icon className="h-6 w-6 text-terracotta" strokeWidth={1.4} aria-hidden="true" />
              <h2 className="mt-5 font-sans text-[0.72rem] font-semibold uppercase tracking-[0.2em] text-espresso">{title}</h2>
              <div className="mt-3 text-[0.95rem] leading-relaxed text-charcoal">{body}</div>
              {link && (
                <a
                  href={link.href}
                  {...(link.external ? { target: '_blank', rel: 'noreferrer' } : {})}
                  className="link-underline mt-4 text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-terracotta"
                >
                  {link.label} <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                </a>
              )}
              {st && (
                <p className="mt-4 inline-flex items-center gap-2 text-[0.8rem] font-medium text-espresso">
                  <span className={`h-2 w-2 rounded-full ${st.isOpen ? 'bg-green-600' : 'bg-gold'}`} aria-hidden="true" />
                  {st.label}
                </p>
              )}
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── Reservation ─────────────────────────────── */}
      <section id="reserve" className="section scroll-mt-20">
        <div className="container-site grid gap-14 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <SectionHeading
              size="md"
              eyebrow="Table Reservation"
              title={
                <>
                  Request a table <em className="text-terracotta">in under a minute.</em>
                </>
              }
              intro="Lunch seatings run 12–3 pm and dinner 7–10 pm. Tell us when you’d like to come and we’ll take it from there."
            />
            <Reveal delay={0.1} className="mt-10 border border-line bg-white p-6 xs:p-8 sm:p-10">
              <ReservationForm />
            </Reveal>
          </div>

          <aside className="lg:col-span-5">
            <Reveal className="lg:sticky lg:top-28">
              <img
                src="/images/interior-window.webp"
                alt="Set tables beside tall windows in Aangan’s private dining room"
                loading="lazy"
                decoding="async"
                className="aspect-[4/3] w-full object-cover"
              />
              <div className="bg-espresso p-8 text-cream sm:p-10">
                <h3 className="font-serif text-2xl text-cream">Good to know</h3>
                <ul className="mt-6 space-y-4">
                  {goodToKnow.map((item) => (
                    <li key={item} className="flex gap-3 text-[0.95rem] leading-relaxed text-cream/75">
                      <span className="mt-2.5 h-1 w-4 shrink-0 bg-gold" aria-hidden="true" />
                      {item}
                    </li>
                  ))}
                </ul>
                <div className="mt-8 border-t border-white/15 pt-6 text-sm">
                  <p className="text-cream/60">Need it sooner? Call the restaurant directly:</p>
                  <a href={site.phoneHref} className="mt-1 inline-flex items-center gap-2 font-serif text-2xl text-gold hover:text-gold-light">
                    <Phone className="h-5 w-5" strokeWidth={1.5} aria-hidden="true" />
                    {site.phone}
                  </a>
                </div>
              </div>
            </Reveal>
          </aside>
        </div>
      </section>

      {/* ── Map + Enquiry ───────────────────────────── */}
      <section className="section border-t border-line bg-cream-deep">
        <div className="container-site grid gap-14 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <SectionHeading size="md" eyebrow="Find Us" title="In the heart of the Kala Ghoda art district." />
            <Reveal delay={0.1} className="mt-10 overflow-hidden border border-line bg-line">
              <iframe
                title={`Map showing ${site.name} at ${site.address.full}`}
                src={site.mapEmbed}
                className="h-[22rem] w-full grayscale-[35%] sm:h-[26rem] lg:h-[30rem]"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </Reveal>
            <Reveal delay={0.15} className="mt-5 flex flex-col gap-2 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
              <span className="inline-flex items-start gap-2">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-terracotta" strokeWidth={1.75} aria-hidden="true" />
                {site.address.full}
              </span>
              <a href={site.mapLink} target="_blank" rel="noreferrer" className="link-underline shrink-0 font-semibold text-espresso hover:text-terracotta">
                Open in Google Maps <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
              </a>
            </Reveal>
          </div>

          <div className="lg:col-span-5">
            <SectionHeading
              size="md"
              eyebrow="General Enquiries"
              title="Events, catering or just hello."
              intro="Not booking a table? Send us a note and the right person will get back to you."
            />
            <Reveal delay={0.1} className="mt-10">
              <EnquiryForm />
            </Reveal>
          </div>
        </div>
      </section>
    </>
  )
}
