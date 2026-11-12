import { cn } from '../../utils/format'

/** FSSAI-style veg / non-veg mark. */
export default function DietIndicator({ diet, className }) {
  const veg = diet === 'veg'
  return (
    <span
      role="img"
      aria-label={veg ? 'Vegetarian' : 'Non-vegetarian'}
      title={veg ? 'Vegetarian' : 'Non-vegetarian'}
      className={cn(
        'inline-flex h-4 w-4 shrink-0 items-center justify-center border-[1.5px] bg-white',
        veg ? 'border-green-700' : 'border-red-800',
        className,
      )}
    >
      {veg ? (
        <span className="h-2 w-2 rounded-full bg-green-700" />
      ) : (
        <span className="h-0 w-0 border-x-[4.5px] border-b-[7px] border-x-transparent border-b-red-800" />
      )}
    </span>
  )
}
