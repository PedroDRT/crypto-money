import { AuthProvider } from '@/components/providers/AuthProvider'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Toaster } from 'react-hot-toast'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'CryptoMoney - Plataforma de Criptomoedas',
  description: 'Compre, venda e gerencie suas criptomoedas com segurança e facilidade. A melhor plataforma para investir em Bitcoin, Ethereum e outras criptomoedas.',
  keywords: 'criptomoedas, bitcoin, ethereum, investimentos, trading, blockchain',
  authors: [{ name: 'Pedro Dutra & Guilherme Lopes' }],
  robots: 'index, follow',
  openGraph: {
    title: 'CryptoMoney - Plataforma de Criptomoedas',
    description: 'Compre, venda e gerencie suas criptomoedas com segurança e facilidade.',
    type: 'website',
    locale: 'pt_BR',
  },
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR" className="scroll-smooth" suppressHydrationWarning>
      <body className={inter.className}>
        <AuthProvider>
          {children}
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 4000,
              style: {
                background: '#363636',
                color: '#fff',
              },
              success: {
                duration: 3000,
                iconTheme: {
                  primary: '#10b981',
                  secondary: '#fff',
                },
              },
              error: {
                duration: 5000,
                iconTheme: {
                  primary: '#ef4444',
                  secondary: '#fff',
                },
              },
            }}
          />
        </AuthProvider>
      </body>
    </html>
  )
}
