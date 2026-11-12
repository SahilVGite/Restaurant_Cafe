export const formatPrice = (value) =>
  new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(value)

/** "19:30" -> "7:30 pm" */
export const formatTime = (hhmm) => {
  const [h, m] = hhmm.split(':').map(Number)
  const suffix = h >= 12 ? 'pm' : 'am'
  const hour = h % 12 === 0 ? 12 : h % 12
  return `${hour}:${String(m).padStart(2, '0')} ${suffix}`
}

/** Local YYYY-MM-DD (avoids the UTC shift of toISOString) */
export const toDateInputValue = (date = new Date()) => {
  const y = date.getFullYear()
  const m = String(date.getMonth() + 1).padStart(2, '0')
  const d = String(date.getDate()).padStart(2, '0')
  return `${y}-${m}-${d}`
}

export const formatLongDate = (yyyyMmDd) => {
  const [y, m, d] = yyyyMmDd.split('-').map(Number)
  return new Date(y, m - 1, d).toLocaleDateString('en-IN', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

export const cn = (...classes) => classes.filter(Boolean).join(' ')

/** Simulated network request for the frontend demo forms */
export const fakeRequest = (ms = 1400) =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      if (typeof navigator !== 'undefined' && navigator.onLine === false) {
        reject(new Error('You appear to be offline. Please check your connection and try again.'))
      } else {
        resolve({ reference: `AAN-${Math.random().toString(36).slice(2, 7).toUpperCase()}` })
      }
    }, ms)
  })
