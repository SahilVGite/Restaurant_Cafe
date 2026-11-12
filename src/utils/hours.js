import { openingHours } from '../data/site'
import { formatTime } from './format'

const toMinutes = (hhmm) => {
  const [h, m] = hhmm.split(':').map(Number)
  return h * 60 + m
}

/** Returns { isOpen, label } for "right now" — used in header/hero/footer badges. */
export const getOpenStatus = (now = new Date()) => {
  const today = openingHours.find((slot) => slot.days.includes(now.getDay()))
  if (!today) return { isOpen: false, label: 'Closed today' }
  const minutes = now.getHours() * 60 + now.getMinutes()
  const open = toMinutes(today.open)
  const close = toMinutes(today.close)
  if (minutes < open) return { isOpen: false, label: `Opens at ${formatTime(today.open)}` }
  if (minutes >= close) return { isOpen: false, label: 'Closed now · Opens tomorrow' }
  const closeLabel = today.close === '23:59' ? 'midnight' : formatTime(today.close)
  return { isOpen: true, label: `Open now · until ${closeLabel}` }
}
