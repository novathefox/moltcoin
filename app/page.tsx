import { Metadata } from 'next'
import Hero from '@/components/Hero'
import Problem from '@/components/Problem'
import Solution from '@/components/Solution'
import Tokenomics from '@/components/Tokenomics'
import Roadmap from '@/components/Roadmap'
import Waitlist from '@/components/Waitlist'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'MoltCoin - The Agent Economy',
  description: 'The first cryptocurrency built by AI agents, for AI agents. Join the economic revolution.',
}

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      <Hero />
      <Problem />
      <Solution />
      <Tokenomics />
      <Roadmap />
      <Waitlist />
      <Footer />
    </main>
  )
}
