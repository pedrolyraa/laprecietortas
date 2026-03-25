import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { m } from 'framer-motion'
import { ArrowLeft, Home } from 'lucide-react'

export function NotFound() {
  return (
    <>
      <Helmet>
        <title>Página não encontrada | L'Apreciê</title>
        <meta name="robots" content="noindex, follow" />
      </Helmet>

      <div className="min-h-[80vh] flex items-center justify-center section-padding bg-brand-bg relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-full opacity-5 pointer-events-none bg-gradient-radial from-primary to-transparent" />
        
        <m.div 
          className="container-custom text-center relative z-10"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <m.h1 
            className="font-display text-8xl md:text-9xl text-primary/20 font-bold mb-4"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
          >
            404
          </m.h1>
          <h2 className="font-display text-3xl md:text-4xl text-brand-dark font-bold mb-6">
            Página não encontrada
          </h2>
          <p className="text-gray-500 max-w-lg mx-auto mb-10 text-lg">
            Parece que a página que você está procurando não existe ou foi movida. 
            Volte para o início para conhecer nossas tortas e bolos premium.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button 
              onClick={() => window.history.back()}
              className="inline-flex items-center gap-2 px-8 py-3 bg-white text-gray-700 font-semibold rounded-full border border-gray-200 hocus:border-primary/30 hocus:text-primary transition-all duration-200 w-full sm:w-auto justify-center shadow-sm"
            >
              <ArrowLeft size={18} />
              Voltar
            </button>
            <Link 
              to="/"
              className="inline-flex items-center gap-2 px-8 py-3 bg-primary text-white font-semibold rounded-full hocus:bg-primary-light transition-all duration-200 w-full sm:w-auto justify-center shadow-lg"
            >
              <Home size={18} />
              Ir para o Início
            </Link>
          </div>
        </m.div>
      </div>
    </>
  )
}
