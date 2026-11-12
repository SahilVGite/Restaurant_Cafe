import Reveal from './Reveal'
import { cn } from '../../utils/format'

export default function SectionHeading({ eyebrow, title, intro, align = 'left', light = false, className, size = 'lg' }) {
  return (
    <Reveal className={cn('max-w-3xl', align === 'center' && 'mx-auto text-center', className)}>
      {eyebrow && <p className={cn('eyebrow', light && 'text-gold', align === 'center' && 'justify-center')}>{eyebrow}</p>}
      <h2 className={cn('mt-5 text-balance', size === 'lg' ? 'display-lg' : 'display-md', light && 'text-cream')}>{title}</h2>
      {intro && (
        <p className={cn('lead mt-6 text-pretty', light && 'text-cream/70', align === 'center' && 'mx-auto max-w-2xl')}>{intro}</p>
      )}
    </Reveal>
  )
}
