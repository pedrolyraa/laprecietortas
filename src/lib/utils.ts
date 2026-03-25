import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// WhatsApp L'Apreciê Tortas e Bolos
export const WHATSAPP_NUMBER = '5519996109814'
export const WHATSAPP_MESSAGE = encodeURIComponent(
  "Olá! Tenho interesse em revender os produtos da L'Apreciê. Poderia me enviar mais informações?"
)
export const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MESSAGE}`
