import { useForm } from 'react-hook-form'
import { ChevronDown, Loader2, Send } from 'lucide-react'
import Field, { describe } from './Field'
import Button from '../common/Button'
import { useToast } from '../common/Toast'
import { fakeRequest } from '../../utils/format'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
const topics = ['General enquiry', 'Private dining & events', 'Catering', 'Careers', 'Press', 'Feedback']

export default function EnquiryForm() {
  const { toast } = useToast()
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({ defaultValues: { name: '', email: '', topic: topics[0], message: '' }, mode: 'onTouched' })

  const onSubmit = async (data) => {
    try {
      await fakeRequest(1100)
      toast({
        type: 'success',
        title: 'Message sent',
        message: `Thanks, ${data.name.split(' ')[0]} — we usually reply within one working day. (Demo: nothing was actually sent.)`,
      })
      reset()
    } catch (err) {
      toast({ type: 'error', title: 'Message not sent', message: err.message })
    }
  }

  const onInvalid = () =>
    toast({ type: 'error', title: 'Almost there', message: 'Please complete the highlighted fields.' })

  return (
    <form onSubmit={handleSubmit(onSubmit, onInvalid)} noValidate aria-busy={isSubmitting} className="grid gap-5">
      <Field id="enq-name" label="Name" required error={errors.name}>
        <input
          {...describe('enq-name', errors.name)}
          type="text"
          autoComplete="name"
          className="field-input"
          {...register('name', { required: 'Please enter your name.', minLength: { value: 2, message: 'Name looks too short.' } })}
        />
      </Field>
      <Field id="enq-email" label="Email" required error={errors.email}>
        <input
          {...describe('enq-email', errors.email)}
          type="email"
          autoComplete="email"
          className="field-input"
          {...register('email', {
            required: 'Please enter your email address.',
            pattern: { value: EMAIL_RE, message: 'Please enter a valid email address.' },
          })}
        />
      </Field>
      <Field id="enq-topic" label="Topic" required>
        <div className="relative">
          <select id="enq-topic" className="field-input appearance-none pr-10" {...register('topic')}>
            {topics.map((t) => (
              <option key={t}>{t}</option>
            ))}
          </select>
          <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" aria-hidden="true" />
        </div>
      </Field>
      <Field id="enq-message" label="Message" required error={errors.message}>
        <textarea
          {...describe('enq-message', errors.message)}
          rows={5}
          className="field-input resize-y"
          placeholder="How can we help?"
          {...register('message', {
            required: 'Please write a short message.',
            minLength: { value: 15, message: 'Please add a little more detail (15+ characters).' },
            maxLength: { value: 1000, message: 'Please keep it under 1000 characters.' },
          })}
        />
      </Field>
      <Button type="submit" variant="dark" size="lg" disabled={isSubmitting} className="w-full">
        {isSubmitting ? (
          <span className="inline-flex items-center gap-2">
            <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" /> Sending…
          </span>
        ) : (
          <span className="inline-flex items-center gap-2">
            Send Message <Send className="h-4 w-4" strokeWidth={1.75} aria-hidden="true" />
          </span>
        )}
      </Button>
    </form>
  )
}
