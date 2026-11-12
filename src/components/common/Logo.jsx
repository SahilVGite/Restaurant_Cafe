import { Link } from 'react-router-dom'
import { site } from '../../data/site'
import { cn } from '../../utils/format'

/** Arch mark = the "aangan" (courtyard) doorway. */
export function LogoMark({ className }) {
  return (
    <svg viewBox="0 0 40 40" aria-hidden="true" className={className} fill="none">
      <path d="M7 37V18.5a13 13 0 0 1 26 0V37" stroke="currentColor" strokeWidth="2.2" />
      <path d="M14.5 37V20.5a5.5 5.5 0 0 1 11 0V37" stroke="#B96848" strokeWidth="2.2" />
      <circle cx="20" cy="9.5" r="1.6" fill="#C5A36A" />
    </svg>
  )
}

export default function Logo({ light = false, className, onClick }) {
  return (
    <Link
      to="/"
      onClick={onClick}
      aria-label={`${site.name} ${site.tagline} — home`}
      className={cn('group inline-flex items-center gap-3', className)}
    >
      <LogoMark className={cn('h-9 w-9 shrink-0 transition-colors duration-500', light ? 'text-gold' : 'text-espresso')} />
      <span className="flex flex-col leading-none">
        <span
          className={cn(
            'font-serif text-[1.6rem] font-medium italic tracking-tight transition-colors duration-500',
            light ? 'text-white' : 'text-espresso',
          )}
        >
          {site.name}
        </span>
        <span
          className={cn(
            'mt-1 text-[0.58rem] font-semibold uppercase tracking-[0.32em] transition-colors duration-500',
            light ? 'text-gold' : 'text-terracotta',
          )}
        >
          {site.tagline}
        </span>
      </span>
    </Link>
  )
}
