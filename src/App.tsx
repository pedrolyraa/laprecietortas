import { lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { LazyMotion, domAnimation } from 'framer-motion'
import { ScrollToTop } from '@/components/layout/ScrollToTop'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { WhatsAppButton } from '@/components/layout/WhatsAppButton'
import { Home } from '@/pages/Home'

const Sobre = lazy(() => import('@/pages/Sobre').then(m => ({ default: m.Sobre })))
const Produtos = lazy(() => import('@/pages/Produtos').then(m => ({ default: m.Produtos })))
const Parceiro = lazy(() => import('@/pages/Parceiro').then(m => ({ default: m.Parceiro })))
const NotFound = lazy(() => import('@/pages/NotFound').then(m => ({ default: m.NotFound })))

function App() {
  return (
    <LazyMotion features={domAnimation} strict>
      <BrowserRouter>
        <ScrollToTop />
        <div className="min-h-screen flex flex-col">
          <Header />
          <main className="flex-1">
            <Suspense fallback={<div className="min-h-screen bg-[#2B3A6B]" />}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/sobre" element={<Sobre />} />
                <Route path="/produtos" element={<Produtos />} />
                <Route path="/parceiro" element={<Parceiro />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </main>
          <Footer />
          <WhatsAppButton />
        </div>
      </BrowserRouter>
    </LazyMotion>
  )
}

export default App
