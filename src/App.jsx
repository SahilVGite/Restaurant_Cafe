import { Route, Routes, useLocation } from 'react-router-dom'
import { AnimatePresence, MotionConfig, motion } from 'framer-motion'
import Header from './components/layout/Header'
import Footer from './components/layout/Footer'
import ScrollManager from './components/layout/ScrollManager'
import { ToastProvider } from './components/common/Toast'
import Home from './pages/Home'
import About from './pages/About'
import Menu from './pages/Menu'
import Gallery from './pages/Gallery'
import Contact from './pages/Contact'
import NotFound from './pages/NotFound'

function PageTransition({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 0.45, ease: 'easeOut' } }}
      exit={{ opacity: 0, transition: { duration: 0.25, ease: 'easeIn' } }}
    >
      {children}
    </motion.div>
  )
}

export default function App() {
  const location = useLocation()

  return (
    <MotionConfig reducedMotion="user">
      <ToastProvider>
        <ScrollManager />
        <Header />
        <main id="main">
          <AnimatePresence mode="wait" initial={false}>
            <Routes location={location} key={location.pathname}>
              <Route path="/" element={<PageTransition><Home /></PageTransition>} />
              <Route path="/about" element={<PageTransition><About /></PageTransition>} />
              <Route path="/menu" element={<PageTransition><Menu /></PageTransition>} />
              <Route path="/gallery" element={<PageTransition><Gallery /></PageTransition>} />
              <Route path="/contact" element={<PageTransition><Contact /></PageTransition>} />
              <Route path="*" element={<PageTransition><NotFound /></PageTransition>} />
            </Routes>
          </AnimatePresence>
        </main>
        <Footer />
      </ToastProvider>
    </MotionConfig>
  )
}
