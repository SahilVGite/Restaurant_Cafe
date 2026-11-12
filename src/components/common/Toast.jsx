import { createContext, useCallback, useContext, useMemo, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { AlertCircle, CheckCircle2, Info, X } from 'lucide-react'
import { cn } from '../../utils/format'

const ToastContext = createContext(null)

const styles = {
  success: { icon: CheckCircle2, accent: 'text-green-700', bar: 'bg-green-700' },
  error: { icon: AlertCircle, accent: 'text-red-800', bar: 'bg-red-800' },
  info: { icon: Info, accent: 'text-terracotta', bar: 'bg-terracotta' },
}

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([])
  const idRef = useRef(0)

  const dismiss = useCallback((id) => setToasts((list) => list.filter((t) => t.id !== id)), [])

  const toast = useCallback(
    ({ type = 'info', title, message, duration = 5500 }) => {
      const id = ++idRef.current
      setToasts((list) => [...list.slice(-2), { id, type, title, message }])
      if (duration) setTimeout(() => dismiss(id), duration)
      return id
    },
    [dismiss],
  )

  const value = useMemo(() => ({ toast, dismiss }), [toast, dismiss])

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div
        aria-live="polite"
        aria-atomic="false"
        className="pointer-events-none fixed inset-x-0 bottom-0 z-[100] flex flex-col items-center gap-3 p-4 sm:bottom-4 sm:right-4 sm:left-auto sm:items-end"
      >
        <AnimatePresence initial={false}>
          {toasts.map((t) => {
            const { icon: Icon, accent, bar } = styles[t.type] ?? styles.info
            return (
              <motion.div
                key={t.id}
                layout
                role={t.type === 'error' ? 'alert' : 'status'}
                initial={{ opacity: 0, y: 24, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, x: 40, transition: { duration: 0.25 } }}
                transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                className="pointer-events-auto relative flex w-full max-w-sm overflow-hidden border border-line bg-white shadow-[0_18px_40px_-20px_rgba(48,35,31,0.45)]"
              >
                <span className={cn('w-1 shrink-0', bar)} aria-hidden="true" />
                <div className="flex flex-1 items-start gap-3 p-4 pr-2">
                  <Icon className={cn('mt-0.5 h-5 w-5 shrink-0', accent)} strokeWidth={1.75} aria-hidden="true" />
                  <div className="min-w-0 flex-1">
                    <p className="font-semibold text-espresso">{t.title}</p>
                    {t.message && <p className="mt-1 text-sm leading-relaxed text-muted">{t.message}</p>}
                  </div>
                  <button
                    type="button"
                    onClick={() => dismiss(t.id)}
                    className="-mt-1 p-1.5 text-muted transition-colors hover:text-espresso"
                    aria-label="Dismiss notification"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              </motion.div>
            )
          })}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  )
}

export function useToast() {
  const ctx = useContext(ToastContext)
  if (!ctx) throw new Error('useToast must be used inside <ToastProvider>')
  return ctx
}
