import { Star } from 'lucide-react'
import { cn } from '../../utils/format'

export default function Stars({ rating = 5, className, size = 'h-4 w-4' }) {
  return (
    <span role="img" aria-label={`Rated ${rating} out of 5`} className={cn('inline-flex gap-1', className)}>
      {Array.from({ length: 5 }, (_, i) => (
        <Star
          key={i}
          aria-hidden="true"
          className={cn(size, i < rating ? 'fill-gold text-gold' : 'fill-transparent text-gold/40')}
          strokeWidth={1.5}
        />
      ))}
    </span>
  )
}
