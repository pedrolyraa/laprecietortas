import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import { m, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'

const navLinks = [
  { href: '/', label: 'Início' },
  { href: '/sobre', label: 'Nossa História' },
  { href: '/produtos', label: 'Produtos' },
]

export function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setIsOpen(false)
  }, [location.pathname])

  return (
    <>
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-40 transition-all duration-500',
          scrolled
            ? 'bg-primary/95 backdrop-blur-md shadow-2xl py-3'
            : 'bg-transparent py-4 md:py-5'
        )}
      >
        <div className="container-custom px-4 md:px-6 w-full flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <img
              src="/images/logo_laprecie_teste.png"
              alt="L'apreciê Tortas e Bolos"
              className="h-16 md:h-20 w-auto object-contain transition-all duration-300 drop-shadow-md"
            />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={cn(
                  'text-base font-medium transition-colors duration-200 relative group',
                  location.pathname === link.href
                    ? 'text-white'
                    : 'text-white/75 hocus:text-white'
                )}
              >
                {link.label}
                <span
                  className={cn(
                    'absolute -bottom-1 left-0 h-0.5 bg-white transition-all duration-300',
                    location.pathname === link.href ? 'w-full' : 'w-0 group-hocus:w-full'
                  )}
                />
              </Link>
            ))}
            <div className="flex items-center gap-3 ml-2">
              <Link
                to="/parceiro"
                className="px-5 py-2 bg-white text-primary font-semibold text-sm rounded-full hocus:bg-white/90 transition-all duration-200 shadow-lg hocus:shadow-xl hocus:-translate-y-0.5"
              >
                Seja Parceiro
              </Link>
            </div>
          </nav>

          {/* Mobile hamburger */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-white min-w-[44px] min-h-[44px] flex items-center justify-center rounded-lg hocus:bg-white/10 transition-colors"
            aria-label="Abrir menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <>
            <m.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/60 z-40 md:hidden"
            />
            <m.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="fixed right-0 top-0 h-full w-72 bg-primary z-50 md:hidden flex flex-col"
            >
              <div className="flex items-center justify-between p-6 border-b border-white/10">
                <span className="font-display text-white text-xl font-semibold">L'apreciê</span>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-white/70 hocus:text-white min-w-[44px] min-h-[44px] flex items-center justify-center rounded-lg"
                  aria-label="Fechar menu"
                >
                  <X size={22} />
                </button>
              </div>
              <nav className="flex flex-col p-6 gap-2">
                {navLinks.map((link, i) => (
                  <m.div
                    key={link.href}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.07 }}
                  >
                    <Link
                      to={link.href}
                      className={cn(
                        'block py-3 px-4 rounded-xl text-base font-medium transition-colors',
                        location.pathname === link.href
                          ? 'bg-white/15 text-white'
                          : 'text-white/75 hocus:bg-white/10 hocus:text-white'
                      )}
                    >
                      {link.label}
                    </Link>
                  </m.div>
                ))}
                <div className="pt-4 mt-2 border-t border-white/10">
                  <Link
                    to="/parceiro"
                    className="block text-center px-5 py-3 bg-white text-primary font-semibold rounded-full hocus:bg-white/90 transition-colors"
                  >
                    Seja Parceiro
                  </Link>
                </div>
              </nav>
            </m.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
