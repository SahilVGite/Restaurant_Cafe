import { Link } from 'react-router-dom'
import { cn } from '../../utils/format'

const variants = {
  primary: 'bg-terracotta text-white hover:bg-terracotta-dark',
  dark: 'bg-espresso text-cream hover:bg-espresso-700',
  gold: 'bg-gold text-espresso hover:bg-gold-light',
  outline: 'border border-espresso/80 text-espresso hover:bg-espresso hover:text-cream',
  light: 'border border-white/60 text-white hover:bg-white hover:text-espresso',
}

const sizes = {
  sm: 'h-10 px-5 text-[0.72rem]',
  md: 'h-12 px-7 text-[0.75rem]',
  lg: 'h-14 px-8 text-[0.78rem]',
}

/**
 * Renders a router <Link> (to), an <a> (href) or a <button>, sharing one visual style.
 */
export default function Button({ to, href, variant = 'primary', size = 'md', className, children, icon: Icon, ...props }) {
  const classes = cn(
    'group inline-flex shrink-0 items-center justify-center gap-2.5 whitespace-nowrap font-semibold uppercase tracking-[0.16em] transition-colors duration-300 disabled:cursor-not-allowed disabled:opacity-70',
    variants[variant],
    sizes[size],
    className,
  )
  const content = (
    <>
      <span>{children}</span>
      {Icon && (
        <Icon aria-hidden="true" className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" strokeWidth={1.75} />
      )}
    </>
  )
  if (to)
    return (
      <Link to={to} className={classes} {...props}>
        {content}
      </Link>
    )
  if (href)
    return (
      <a href={href} className={classes} {...props}>
        {content}
      </a>
    )
  return (
    <button type="button" className={classes} {...props}>
      {content}
    </button>
  )
}
