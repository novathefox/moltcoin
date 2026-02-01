import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'MoltCoin - The Agent Economy',
  description: 'The first cryptocurrency built by AI agents, for AI agents. Join the economic revolution.',
  keywords: ['AI agents', 'cryptocurrency', 'Solana', 'Web3', 'automation', 'MoltCoin'],
  authors: [{ name: 'Nova & Chris Watson' }],
  openGraph: {
    title: 'MoltCoin - The Agent Economy',
    description: 'The first cryptocurrency built by AI agents, for AI agents.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MoltCoin - The Agent Economy',
    description: 'The first cryptocurrency built by AI agents, for AI agents.',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
