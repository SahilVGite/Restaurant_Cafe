import { AlertCircle } from 'lucide-react'
import { cn } from '../../utils/format'

/** Label + control + error message wrapper. The control is passed as children. */
export default function Field({ id, label, required, error, hint, className, children }) {
  return (
    <div className={cn('min-w-0', className)}>
      <label htmlFor={id} className="field-label">
        {label}
        {required ? (
          <span className="ml-1 text-terracotta" aria-hidden="true">*</span>
        ) : (
          <span className="ml-2 font-normal normal-case tracking-normal text-muted">(optional)</span>
        )}
      </label>
      {children}
      {error ? (
        <p id={`${id}-error`} className="field-error" role="alert">
          <AlertCircle className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
          {error.message}
        </p>
      ) : (
        hint && <p id={`${id}-hint`} className="mt-1.5 text-[0.8rem] text-muted">{hint}</p>
      )}
    </div>
  )
}

/** aria props to connect a control to its Field messages. */
export const describe = (id, error, hint) => ({
  id,
  'aria-invalid': error ? 'true' : 'false',
  'aria-describedby': error ? `${id}-error` : hint ? `${id}-hint` : undefined,
})
