import { ArrowRight } from 'lucide-react'
import Button from '../components/common/Button'
import useDocumentTitle from '../hooks/useDocumentTitle'

export default function NotFound() {
  useDocumentTitle('Page not found')
  return (
    <section className="flex min-h-[80vh] items-center bg-espresso pb-20 pt-40 text-center">
      <div className="container-site">
        <p className="eyebrow justify-center text-gold">404</p>
        <h1 className="display-xl mt-6 text-white">
          This table <em className="text-gold">isn’t set.</em>
        </h1>
        <p className="mx-auto mt-6 max-w-md text-cream/70">The page you were looking for has moved or never existed.</p>
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <Button to="/" icon={ArrowRight}>Back to Home</Button>
          <Button to="/menu" variant="light">View the Menu</Button>
        </div>
      </div>
    </section>
  )
}
