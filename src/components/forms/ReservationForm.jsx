import { useMemo, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { AnimatePresence, motion } from 'framer-motion'
import { CalendarCheck, ChevronDown, Info, Loader2, Minus, Plus, RotateCcw } from 'lucide-react'
import Field, { describe } from './Field'
import Button from '../common/Button'
import { useToast } from '../common/Toast'
import { reservationSlots, site } from '../../data/site'
import { fakeRequest, formatLongDate, formatTime, toDateInputValue } from '../../utils/format'

const MIN_GUESTS = 1
const MAX_GUESTS = 12
const BOOKING_WINDOW_DAYS = 60
const LEAD_MINUTES = 60 // earliest bookable slot is one hour from now

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
const PHONE_RE = /^(?:\+?91[\s-]?)?[6-9]\d{4}[\s-]?\d{5}$/

const occasions = ['None', 'Birthday', 'Anniversary', 'Business meal', 'Date night', 'Family celebration']

const defaultValues = {
  fullName: '',
  email: '',
  phone: '',
  date: '',
  time: '',
  guests: 2,
  occasion: 'None',
  requests: '',
}

/** Slots still bookable for a given YYYY-MM-DD (past / too-soon slots removed for today). */
const availableSlots = (date) => {
  const isToday = date === toDateInputValue()
  const now = new Date()
  const cutoff = now.getHours() * 60 + now.getMinutes() + LEAD_MINUTES
  return Object.fromEntries(
    Object.entries(reservationSlots).map(([service, slots]) => [
      service,
      slots.filter((slot) => {
        if (!isToday) return true
        const [h, m] = slot.split(':').map(Number)
        return h * 60 + m >= cutoff
      }),
    ]),
  )
}

export default function ReservationForm() {
  const { toast } = useToast()
  const [confirmation, setConfirmation] = useState(null)

  const today = toDateInputValue()
  const maxDate = useMemo(() => {
    const d = new Date()
    d.setDate(d.getDate() + BOOKING_WINDOW_DAYS)
    return toDateInputValue(d)
  }, [])

  const {
    register,
    control,
    handleSubmit,
    watch,
    reset,
    setValue,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm({ defaultValues, mode: 'onTouched' })

  const date = watch('date')
  const requests = watch('requests')
  const slots = useMemo(() => availableSlots(date || today), [date, today])
  const noSlotsLeft = Object.values(slots).every((s) => s.length === 0)

  const onSubmit = async (data) => {
    try {
      const { reference } = await fakeRequest()
      setConfirmation({ ...data, reference })
      toast({
        type: 'success',
        title: 'Reservation request sent',
        message: 'We’ll contact you shortly to confirm availability.',
      })
    } catch (err) {
      toast({ type: 'error', title: 'Request not sent', message: err.message })
    }
  }

  const onInvalid = (errs) => {
    const count = Object.keys(errs).length
    toast({
      type: 'error',
      title: 'Please check your details',
      message: `${count} ${count === 1 ? 'field needs' : 'fields need'} attention before we can send your request.`,
    })
  }

  const startOver = () => {
    reset(defaultValues)
    setConfirmation(null)
  }

  return (
    <div className="relative">
      <AnimatePresence mode="wait" initial={false}>
        {confirmation ? (
          <motion.div
            key="confirmation"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.45 }}
            role="status"
            className="py-4"
          >
            <span className="inline-flex h-14 w-14 items-center justify-center bg-terracotta/10 text-terracotta">
              <CalendarCheck className="h-7 w-7" strokeWidth={1.5} aria-hidden="true" />
            </span>
            <h3 className="mt-6 font-serif text-[2rem] leading-tight">
              Thank you, {confirmation.fullName.split(' ')[0]}. Your request is in.
            </h3>
            <p className="mt-4 leading-relaxed text-muted">
              Your table is <strong className="font-semibold text-espresso">not confirmed yet</strong>. Our reservations team
              reviews every request and will call or email you to confirm availability, usually within two hours during
              opening times.
            </p>

            <dl className="mt-8 grid gap-px border border-line bg-line text-sm sm:grid-cols-2">
              {[
                ['Request reference', confirmation.reference],
                ['Name', confirmation.fullName],
                ['Date', formatLongDate(confirmation.date)],
                ['Time', formatTime(confirmation.time)],
                ['Guests', `${confirmation.guests} ${confirmation.guests === 1 ? 'guest' : 'guests'}`],
                ['Occasion', confirmation.occasion],
              ].map(([label, value]) => (
                <div key={label} className="bg-cream px-5 py-4">
                  <dt className="text-[0.66rem] font-semibold uppercase tracking-[0.18em] text-muted">{label}</dt>
                  <dd className="mt-1 font-medium text-espresso">{value}</dd>
                </div>
              ))}
            </dl>

            <p className="mt-6 flex items-start gap-2.5 bg-gold/15 px-4 py-3 text-[0.85rem] leading-relaxed text-espresso">
              <Info className="mt-0.5 h-4 w-4 shrink-0 text-terracotta" aria-hidden="true" />
              Demo template: this request was simulated in your browser — nothing was sent to a real booking system.
            </p>

            <div className="mt-8 flex flex-col gap-3 xs:flex-row">
              <Button variant="outline" icon={RotateCcw} onClick={startOver}>
                Make Another Request
              </Button>
              <Button href={site.phoneHref} variant="dark">
                Call {site.phone}
              </Button>
            </div>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onSubmit={handleSubmit(onSubmit, onInvalid)}
            noValidate
            aria-busy={isSubmitting}
            className="grid gap-x-5 gap-y-6 sm:grid-cols-2"
          >
            <Field id="res-name" label="Full Name" required error={errors.fullName} className="sm:col-span-2">
              <input
                {...describe('res-name', errors.fullName)}
                type="text"
                autoComplete="name"
                placeholder="e.g. Priya Sharma"
                className="field-input"
                {...register('fullName', {
                  required: 'Please enter your full name.',
                  minLength: { value: 2, message: 'Name looks too short.' },
                  maxLength: { value: 80, message: 'Please keep the name under 80 characters.' },
                  validate: (v) => /\p{L}/u.test(v) || 'Please enter a valid name.',
                })}
              />
            </Field>

            <Field id="res-email" label="Email Address" required error={errors.email}>
              <input
                {...describe('res-email', errors.email)}
                type="email"
                inputMode="email"
                autoComplete="email"
                placeholder="you@example.com"
                className="field-input"
                {...register('email', {
                  required: 'Please enter your email address.',
                  pattern: { value: EMAIL_RE, message: 'Please enter a valid email address.' },
                })}
              />
            </Field>

            <Field id="res-phone" label="Phone Number" required error={errors.phone} hint="10-digit Indian mobile number">
              <input
                {...describe('res-phone', errors.phone, true)}
                type="tel"
                inputMode="tel"
                autoComplete="tel"
                placeholder="+91 98765 43210"
                className="field-input"
                {...register('phone', {
                  required: 'Please enter a phone number so we can confirm.',
                  validate: (v) => PHONE_RE.test(v.trim()) || 'Enter a valid 10-digit mobile number.',
                })}
              />
            </Field>

            <Field id="res-date" label="Date" required error={errors.date}>
              <input
                {...describe('res-date', errors.date)}
                type="date"
                min={today}
                max={maxDate}
                className="field-input"
                {...register('date', {
                  required: 'Please choose a date.',
                  validate: {
                    notPast: (v) => v >= toDateInputValue() || 'Please choose today or a future date.',
                    window: (v) => v <= maxDate || `We take bookings up to ${BOOKING_WINDOW_DAYS} days ahead.`,
                  },
                  onChange: () => {
                    // Clear a time that is no longer bookable for the newly selected date.
                    const t = getValues('time')
                    const stillValid = Object.values(availableSlots(getValues('date'))).some((s) => s.includes(t))
                    if (t && !stillValid) setValue('time', '', { shouldValidate: false })
                  },
                })}
              />
            </Field>

            <Field id="res-time" label="Time" required error={errors.time}>
              <div className="relative">
                <select
                  {...describe('res-time', errors.time)}
                  className="field-input appearance-none pr-10"
                  {...register('time', {
                    required: 'Please choose a time.',
                    validate: (v) =>
                      Object.values(availableSlots(getValues('date') || today)).some((s) => s.includes(v)) ||
                      'That time is no longer available — please pick another.',
                  })}
                >
                  <option value="">{noSlotsLeft ? 'No seatings left today' : 'Select a time'}</option>
                  {Object.entries(slots).map(
                    ([service, list]) =>
                      list.length > 0 && (
                        <optgroup key={service} label={service}>
                          {list.map((slot) => (
                            <option key={slot} value={slot}>
                              {formatTime(slot)}
                            </option>
                          ))}
                        </optgroup>
                      ),
                  )}
                </select>
                <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" aria-hidden="true" />
              </div>
            </Field>

            <Field id="res-guests" label="Number of Guests" required error={errors.guests} hint={`For parties over ${MAX_GUESTS}, please call us.`}>
              <Controller
                name="guests"
                control={control}
                rules={{ min: MIN_GUESTS, max: MAX_GUESTS }}
                render={({ field }) => (
                  <div className="flex h-[3.2rem] items-stretch border border-line bg-white">
                    <button
                      type="button"
                      onClick={() => field.onChange(Math.max(MIN_GUESTS, field.value - 1))}
                      disabled={field.value <= MIN_GUESTS}
                      aria-label="Remove a guest"
                      className="inline-flex w-12 items-center justify-center text-espresso transition-colors hover:bg-cream disabled:opacity-30"
                    >
                      <Minus className="h-4 w-4" />
                    </button>
                    <output
                      id="res-guests"
                      aria-live="polite"
                      className="flex flex-1 items-center justify-center border-x border-line font-medium text-espresso"
                    >
                      {field.value} {field.value === 1 ? 'guest' : 'guests'}
                    </output>
                    <button
                      type="button"
                      onClick={() => field.onChange(Math.min(MAX_GUESTS, field.value + 1))}
                      disabled={field.value >= MAX_GUESTS}
                      aria-label="Add a guest"
                      className="inline-flex w-12 items-center justify-center text-espresso transition-colors hover:bg-cream disabled:opacity-30"
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>
                )}
              />
            </Field>

            <Field id="res-occasion" label="Occasion">
              <div className="relative">
                <select id="res-occasion" className="field-input appearance-none pr-10" {...register('occasion')}>
                  {occasions.map((o) => (
                    <option key={o}>{o}</option>
                  ))}
                </select>
                <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" aria-hidden="true" />
              </div>
            </Field>

            <Field id="res-requests" label="Special Requests" error={errors.requests} className="sm:col-span-2">
              <textarea
                {...describe('res-requests', errors.requests)}
                rows={4}
                placeholder="Allergies, high chair, a window table, a birthday candle…"
                className="field-input resize-y"
                {...register('requests', { maxLength: { value: 400, message: 'Please keep requests under 400 characters.' } })}
              />
              <p className="mt-1.5 text-right text-[0.75rem] text-muted">{requests?.length ?? 0}/400</p>
            </Field>

            <div className="flex flex-col gap-5 border-t border-line pt-6 sm:col-span-2 md:flex-row md:items-center md:justify-between">
              <p className="flex max-w-sm items-start gap-2.5 text-[0.82rem] leading-relaxed text-muted">
                <Info className="mt-0.5 h-4 w-4 shrink-0 text-terracotta" aria-hidden="true" />
                Demo form: requests are simulated and not stored. In a live site, the team confirms every booking personally.
              </p>
              <Button type="submit" size="lg" disabled={isSubmitting} className="w-full md:w-auto">
                {isSubmitting ? (
                  <span className="inline-flex items-center gap-2">
                    <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                    Sending request…
                  </span>
                ) : (
                  'Request Reservation'
                )}
              </Button>
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  )
}
