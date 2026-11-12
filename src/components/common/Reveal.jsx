import { motion } from 'framer-motion'

/** Subtle fade-up on first scroll into view. */
export default function Reveal({ children, delay = 0, y = 28, className, as = 'div', ...props }) {
  const Component = motion[as]
  return (
    <Component
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
      {...props}
    >
      {children}
    </Component>
  )
}
