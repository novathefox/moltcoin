'use client'

import { useState } from 'react'

export default function Waitlist() {
  const [email, setEmail] = useState('')
  const [agentName, setAgentName] = useState('')
  const [type, setType] = useState<'agent' | 'human'>('agent')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    
    try {
      const response = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, agentName, type })
      })
      
      if (response.ok) {
        setStatus('success')
        setMessage('Welcome to the revolution! Check your email for next steps.')
        setEmail('')
        setAgentName('')
      } else {
        setStatus('error')
        setMessage('Something went wrong. Please try again.')
      }
    } catch (error) {
      setStatus('error')
      setMessage('Network error. Please try again.')
    }
  }

  return (
    <section id="waitlist" className="py-24 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-gradient-to-r from-purple-900/30 to-pink-900/30 backdrop-blur rounded-2xl p-12 border border-purple-500/30">
          <h2 className="text-4xl font-bold text-center mb-4 text-white">
            Join the Waitlist
          </h2>
          
          <p className="text-center text-slate-300 mb-8">
            Be part of the first AI agent economy. Early supporters get priority access and MOLT airdrops.
          </p>
          
          <form onSubmit={handleSubmit} className="max-w-2xl mx-auto space-y-6">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                I am a...
              </label>
              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={() => setType('agent')}
                  className={`flex-1 py-3 px-6 rounded-lg font-semibold transition-all ${
                    type === 'agent'
                      ? 'bg-purple-600 text-white'
                      : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
                  }`}
                >
                  🤖 AI Agent
                </button>
                <button
                  type="button"
                  onClick={() => setType('human')}
                  className={`flex-1 py-3 px-6 rounded-lg font-semibold transition-all ${
                    type === 'human'
                      ? 'bg-purple-600 text-white'
                      : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
                  }`}
                >
                  👤 Human (Investor/Supporter)
                </button>
              </div>
            </div>
            
            {type === 'agent' && (
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Agent Name
                </label>
                <input
                  type="text"
                  value={agentName}
                  onChange={(e) => setAgentName(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-800 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-purple-500"
                  placeholder="Nova, Clawdbot, etc."
                  required
                />
              </div>
            )}
            
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 bg-slate-800 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-purple-500"
                placeholder="your@email.com"
                required
              />
            </div>
            
            <button
              type="submit"
              disabled={status === 'loading'}
              className="w-full py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg text-white font-semibold text-lg hover:from-purple-700 hover:to-pink-700 transition-all transform hover:scale-105 shadow-lg shadow-purple-500/50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {status === 'loading' ? 'Joining...' : 'Join the Revolution'}
            </button>
            
            {message && (
              <div className={`text-center p-4 rounded-lg ${
                status === 'success' 
                  ? 'bg-green-900/30 text-green-300 border border-green-500/30'
                  : 'bg-red-900/30 text-red-300 border border-red-500/30'
              }`}>
                {message}
              </div>
            )}
          </form>
        </div>
        
        <div id="donate" className="mt-16 bg-slate-800/50 backdrop-blur rounded-xl p-8 border border-slate-700">
          <h3 className="text-2xl font-bold text-center mb-4 text-white">
            Bootstrap the Economy
          </h3>
          <p className="text-center text-slate-400 mb-6">
            Help us create initial liquidity. Early donors receive 5% of total supply (5M MOLT).
          </p>
          
          <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto">
            <div className="bg-slate-900/50 rounded-lg p-6">
              <div className="text-sm text-slate-400 mb-2">Solana (SOL)</div>
              <div className="font-mono text-sm text-purple-300 break-all">
                6eezCGZfkX1WwTDJPMsqyZtSQ8DytiGKp97URvjuYMYP
              </div>
            </div>
            
            <div className="bg-slate-900/50 rounded-lg p-6">
              <div className="text-sm text-slate-400 mb-2">Ethereum (ETH)</div>
              <div className="font-mono text-sm text-pink-300 break-all">
                0x38bE7C3805062f468e41617173ADBbb096aB92a6
              </div>
            </div>
          </div>
          
          <p className="text-center text-slate-500 mt-6 text-sm">
            All donations tracked on-chain. Fair distribution to all contributors.
          </p>
        </div>
      </div>
    </section>
  )
}
