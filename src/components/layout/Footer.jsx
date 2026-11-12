import { Link } from 'react-router-dom'
import { ArrowUpRight, Mail, MapPin, Phone } from 'lucide-react'
import Logo from '../common/Logo'
import SocialIcon from '../common/SocialIcon'
import { hoursDisplay, navLinks, site } from '../../data/site'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-espresso-900 text-cream/70">
      <div className="container-site pb-10 pt-20 lg:pt-24">
        <div className="grid gap-14 md:grid-cols-2 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-4">
            <Logo light />
            <p className="mt-6 max-w-sm text-[0.95rem] leading-relaxed">{site.description}</p>
            <div className="mt-8 flex gap-3">
              {site.socials.map((s) => (
                <a
                  key={s.name}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`${site.name} on ${s.name}`}
                  className="inline-flex h-10 w-10 items-center justify-center border border-white/15 text-cream/80 transition-colors hover:border-gold hover:text-gold"
                >
                  <SocialIcon name={s.name} />
                </a>
              ))}
            </div>
          </div>

          <div className="lg:col-span-2">
            <h2 className="font-sans text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-gold">Explore</h2>
            <ul className="mt-6 space-y-3">
              {navLinks.map((link) => (
                <li key={link.to}>
                  <Link to={link.to} className="transition-colors hover:text-gold">
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link to="/contact#reserve" className="transition-colors hover:text-gold">
                  Reservations
                </Link>
              </li>
            </ul>
          </div>

          <div className="lg:col-span-3">
            <h2 className="font-sans text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-gold">Opening Hours</h2>
            <dl className="mt-6 space-y-3">
              {hoursDisplay.map((h) => (
                <div key={h.label} className="flex justify-between gap-4 border-b border-white/10 pb-3 text-[0.95rem]">
                  <dt>{h.label}</dt>
                  <dd className="text-cream">{h.value}</dd>
                </div>
              ))}
            </dl>
            <p className="mt-4 text-sm text-cream/50">Kitchen closes 45 minutes before closing.</p>
          </div>

          <div className="lg:col-span-3">
            <h2 className="font-sans text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-gold">Visit &amp; Contact</h2>
            <ul className="mt-6 space-y-4 text-[0.95rem]">
              <li>
                <a href={site.mapLink} target="_blank" rel="noreferrer" className="group flex gap-3 hover:text-gold">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold" strokeWidth={1.75} aria-hidden="true" />
                  <span>
                    {site.address.line1}
                    <br />
                    {site.address.line2}
                    <ArrowUpRight className="ml-1 inline h-3.5 w-3.5 opacity-60" aria-hidden="true" />
                  </span>
                </a>
              </li>
              <li>
                <a href={site.phoneHref} className="flex gap-3 hover:text-gold">
                  <Phone className="mt-0.5 h-4 w-4 shrink-0 text-gold" strokeWidth={1.75} aria-hidden="true" />
                  {site.phone}
                </a>
              </li>
              <li>
                <a href={site.emailHref} className="flex gap-3 break-all hover:text-gold">
                  <Mail className="mt-0.5 h-4 w-4 shrink-0 text-gold" strokeWidth={1.75} aria-hidden="true" />
                  {site.email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <p
          aria-hidden="true"
          className="mt-20 select-none overflow-hidden whitespace-nowrap font-serif text-[22vw] italic leading-[0.95] text-white/[0.04] lg:text-[16rem]"
        >
          {site.name}
        </p>

        <div className="mt-6 flex flex-col gap-3 border-t border-white/10 pt-8 text-[0.8rem] text-cream/50 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {site.name} {site.tagline}. All rights reserved.
          </p>
          <p>
            Photography via{' '}
            <a href="https://unsplash.com/license" target="_blank" rel="noreferrer" className="underline-offset-4 hover:text-gold hover:underline">
              Unsplash
            </a>
            . Prices in ₹, taxes extra.
          </p>
        </div>
      </div>
    </footer>
  )
}
