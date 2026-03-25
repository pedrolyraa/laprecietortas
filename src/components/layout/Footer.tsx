import { Link } from 'react-router-dom'
import { Instagram, Phone, Mail, MapPin } from 'lucide-react'
import { WHATSAPP_URL } from '@/lib/utils'
import { trackEvent } from '@/lib/analytics'

export function Footer() {
  return (
    <footer className="bg-primary-DEFAULT" style={{ backgroundColor: '#1C2340' }}>
      <div className="container-custom section-padding !py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <img
                src="/images/logo_png.png"
                alt="L'Apreciê Tortas e Bolos"
                className="h-20 w-auto object-contain"
              />
            </div>
            <p className="text-white/60 text-sm leading-relaxed max-w-sm">
              Fornecimento B2B de tortas doces, salgadas e bolos artesanais premium.
              Produto padronizado, pronto para servir e revender.
            </p>
            <div className="flex gap-4 mt-6">
              <a
                href="https://www.instagram.com/lapreciee_tortas/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white/60 hocus:border-white/60 hocus:text-white transition-all duration-200"
                aria-label="Instagram L'Apreciê"
              >
                <Instagram size={18} />
              </a>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white/60 hocus:border-white/60 hocus:text-white transition-all duration-200"
                aria-label="WhatsApp L'Apreciê"
              >
                <Phone size={18} />
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-white font-semibold text-sm uppercase tracking-widest mb-5">
              Navegação
            </h3>
            <ul className="space-y-3">
              {[
                { href: '/', label: 'Início' },
                { href: '/sobre', label: 'Sobre nós' },
                { href: '/produtos', label: 'Produtos' },
                { href: '/parceiro', label: 'Seja Parceiro' },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-white/60 hocus:text-white text-sm transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold text-sm uppercase tracking-widest mb-5">
              Contato
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin size={16} className="text-brand-muted mt-0.5 shrink-0" />
                <span className="text-white/60 text-sm leading-relaxed">
                  Rua Apiaba, 147 — Parque Universitário de Viracopos<br />
                  Campinas • SP • CEP 13056-485
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={16} className="text-brand-muted shrink-0" />
                <a
                  href="mailto:laprecietortas@gmail.com"
                  className="text-white/60 hocus:text-white text-sm transition-colors"
                >
                  laprecietortas@gmail.com
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={16} className="text-brand-muted shrink-0" />
                <a
                  href={WHATSAPP_URL}
                  onClick={() => trackEvent('whatsapp_click')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/60 hocus:text-white text-sm transition-colors"
                >
                  (19) 99610-9814
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 mt-12 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/40 text-xs">
            © {new Date().getFullYear()} L'Apreciê Tortas e Bolos. Todos os direitos reservados.
          </p>
          <p className="text-white/30 text-xs">
            Desenvolvido por{' '}
            <a
              href="https://antigravity.agency"
              target="_blank"
              rel="noopener noreferrer"
              className="hocus:text-white/60 transition-colors"
            >
              Antigravity Agency
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}
