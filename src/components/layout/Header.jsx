import { useEffect, useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowRight, Menu, Phone, X } from 'lucide-react'
import Logo from '../common/Logo'
import Button from '../common/Button'
import SocialIcon from '../common/SocialIcon'
import useScrolled from '../../hooks/useScrolled'
import useLockBodyScroll from '../../hooks/useLockBodyScroll'
import { hoursDisplay, navLinks, site } from '../../data/site'
import { cn } from '../../utils/format'

export default function Header() {
  const scrolled = useScrolled(40)
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()
  useLockBodyScroll(open)

  // Close the drawer on navigation and on Escape.
  useEffect(() => setOpen(false), [pathname])
  useEffect(() => {
    if (!open) return
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  const solid = scrolled && !open
  const light = !solid

  return (
    <>
      <a
        href="#main"
        className="sr-only z-[60] bg-espresso px-4 py-3 text-cream focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
      >
        Skip to content
      </a>
      <header
        className={cn(
          'fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,height] duration-500',
          solid ? 'border-b border-line bg-cream/95 backdrop-blur-md' : 'border-b border-transparent bg-transparent',
        )}
      >
        <div
          className={cn(
            'container-site flex items-center justify-between gap-6 transition-[height] duration-500',
            solid ? 'h-[4.5rem]' : 'h-20 sm:h-24',
          )}
        >
          <Logo light={light} />

          <nav aria-label="Primary" className="hidden lg:block">
            <ul className="flex items-center gap-9">
              {navLinks.map((link) => (
                <li key={link.to}>
                  <NavLink
                    to={link.to}
                    end={link.to === '/'}
                    className={({ isActive }) =>
                      cn(
                        'relative py-2 text-[0.78rem] font-semibold uppercase tracking-[0.18em] transition-colors duration-300',
                        light ? 'text-white/85 hover:text-gold' : 'text-espresso/80 hover:text-terracotta',
                        isActive && (light ? 'text-white' : 'text-espresso'),
                      )
                    }
                  >
                    {({ isActive }) => (
                      <>
                        {link.label}
                        {isActive && (
                          <motion.span
                            layoutId="nav-active"
                            className="absolute -bottom-1 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-gold"
                          />
                        )}
                      </>
                    )}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-5">
            <a
              href={site.phoneHref}
              className={cn(
                'hidden items-center gap-2 text-sm font-medium transition-colors xl:inline-flex',
                light ? 'text-white/85 hover:text-gold' : 'text-espresso hover:text-terracotta',
              )}
            >
              <Phone className="h-4 w-4" strokeWidth={1.75} aria-hidden="true" />
              {site.phone}
            </a>
            <Button to="/contact#reserve" size="sm" className="hidden sm:inline-flex">
              Book a Table
            </Button>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? 'Close menu' : 'Open menu'}
              className={cn(
                '-mr-2 inline-flex h-11 w-11 items-center justify-center transition-colors lg:hidden',
                light ? 'text-white' : 'text-espresso',
              )}
            >
              {open ? <X className="h-6 w-6" strokeWidth={1.5} /> : <Menu className="h-6 w-6" strokeWidth={1.5} />}
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Site navigation"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.3 } }}
            transition={{ duration: 0.35 }}
            className="fixed inset-0 z-40 flex flex-col overflow-y-auto bg-espresso px-5 pb-8 pt-28 sm:px-8 lg:hidden"
          >
            <nav aria-label="Mobile" className="flex-1">
              <ul className="space-y-1">
                {navLinks.map((link, i) => (
                  <motion.li
                    key={link.to}
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.08 + i * 0.06, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    className="border-b border-white/10"
                  >
                    <NavLink
                      to={link.to}
                      end={link.to === '/'}
                      onClick={() => setOpen(false)}
                      className={({ isActive }) =>
                        cn(
                          'flex items-baseline justify-between py-4 font-serif text-[2.1rem] leading-none transition-colors xs:text-[2.5rem]',
                          isActive ? 'italic text-gold' : 'text-cream hover:text-gold',
                        )
                      }
                    >
                      {link.label}
                      <span className="font-sans text-xs tracking-[0.2em] text-cream/40">0{i + 1}</span>
                    </NavLink>
                  </motion.li>
                ))}
              </ul>
            </nav>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="mt-10 space-y-6 text-cream/75"
            >
              <Button to="/contact#reserve" size="lg" icon={ArrowRight} className="w-full" onClick={() => setOpen(false)}>
                Book a Table
              </Button>
              <div className="grid gap-6 text-sm xs:grid-cols-2">
                <div>
                  <p className="mb-2 text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-gold">Contact</p>
                  <a href={site.phoneHref} className="block hover:text-gold">
                    {site.phone}
                  </a>
                  <a href={site.emailHref} className="block break-all hover:text-gold">
                    {site.email}
                  </a>
                </div>
                <div>
                  <p className="mb-2 text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-gold">Hours</p>
                  {hoursDisplay.map((h) => (
                    <p key={h.label}>
                      {h.label}: {h.value}
                    </p>
                  ))}
                </div>
              </div>
              <div className="flex gap-3">
                {site.socials.map((s) => (
                  <a
                    key={s.name}
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`${site.name} on ${s.name}`}
                    className="inline-flex h-10 w-10 items-center justify-center border border-white/15 transition-colors hover:border-gold hover:text-gold"
                  >
                    <SocialIcon name={s.name} />
                  </a>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
