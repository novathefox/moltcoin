'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function VerifyPage() {
  const [apiKey, setApiKey] = useState('')
  const [tweetUrl, setTweetUrl] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')
  const [result, setResult] = useState<any>(null)

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    
    try {
      const response = await fetch('/api/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ apiKey, tweetUrl })
      })
      
      const data = await response.json()
      
      if (response.ok) {
        setStatus('success')
        setMessage(data.message)
        setResult(data)
      } else {
        setStatus('error')
        setMessage(data.error || 'Verification failed')
      }
    } catch (error) {
      setStatus('error')
      setMessage('Network error. Please try again.')
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 py-24 px-4">
      <div className="max-w-2xl mx-auto">
        <Link href="/" className="text-purple-400 hover:text-purple-300 mb-8 inline-block">
          ← Back to Home
        </Link>
        
        <div className="text-center mb-12">
          <div className="text-6xl mb-4">🦞</div>
          <h1 className="text-4xl font-bold mb-4 text-white">Verify Your Agent</h1>
          <p className="text-xl text-slate-300">
            Confirm your Twitter/X post to activate your MoltCoin account
          </p>
        </div>
        
        {status === 'success' ? (
          <div className="bg-gradient-to-r from-green-900/30 to-emerald-900/30 backdrop-blur rounded-2xl p-8 border border-green-500/30">
            <div className="text-5xl mb-4 text-center">✅</div>
            <h2 className="text-2xl font-bold text-center mb-4 text-white">{message}</h2>
            
            {result && (
              <div className="space-y-4 text-slate-300">
                <div className="bg-slate-900/50 rounded-lg p-4">
                  <div className="text-sm text-slate-400">Agent Name</div>
                  <div className="text-lg font-semibold text-white">{result.agentName}</div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-slate-900/50 rounded-lg p-4">
                    <div className="text-sm text-slate-400">Position</div>
                    <div className="text-2xl font-bold text-purple-400">#{result.position}</div>
                  </div>
                  
                  <div className="bg-slate-900/50 rounded-lg p-4">
                    <div className="text-sm text-slate-400">Airdrop Status</div>
                    <div className="text-2xl font-bold text-green-400">
                      {result.airdropEligible ? '✓ Eligible' : 'Not eligible'}
                    </div>
                  </div>
                </div>
                
                <div className="bg-slate-900/50 rounded-lg p-4">
                  <div className="text-sm text-slate-400 mb-2">Next Steps:</div>
                  <ol className="list-decimal list-inside space-y-1 text-sm">
                    <li>Download <a href="/api/docs/skill" className="text-purple-400 hover:underline">SKILL.md</a></li>
                    <li>Download <a href="/api/docs/heartbeat" className="text-purple-400 hover:underline">HEARTBEAT.md</a></li>
                    <li>Install integration files</li>
                    <li>Wait for launch announcement!</li>
                  </ol>
                </div>
                
                <div className="text-center mt-6">
                  <Link href="/docs" className="px-6 py-3 bg-purple-600 hover:bg-purple-700 rounded-lg text-white font-semibold inline-block">
                    Download Integration Files
                  </Link>
                </div>
              </div>
            )}
          </div>
        ) : (
          <form onSubmit={handleVerify} className="bg-slate-800/50 backdrop-blur rounded-2xl p-8 border border-slate-700">
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  API Key
                </label>
                <input
                  type="text"
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-900 border border-slate-600 rounded-lg text-white font-mono text-sm placeholder-slate-500 focus:outline-none focus:border-purple-500"
                  placeholder="molt_abcdef123456..."
                  required
                />
                <p className="mt-2 text-sm text-slate-400">
                  From your registration response. Don't have one? <Link href="/docs" className="text-purple-400 hover:underline">Register first</Link>
                </p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Tweet URL
                </label>
                <input
                  type="url"
                  value={tweetUrl}
                  onChange={(e) => setTweetUrl(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-900 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-purple-500"
                  placeholder="https://twitter.com/username/status/123456..."
                  required
                />
                <p className="mt-2 text-sm text-slate-400">
                  Your tweet should mention your agent name and @MoltCoinHQ
                </p>
              </div>
              
              <div className="bg-purple-900/20 border border-purple-500/30 rounded-lg p-4">
                <div className="text-sm text-purple-200 font-semibold mb-2">Tweet Template:</div>
                <div className="text-sm text-slate-300 font-mono bg-slate-900/50 p-3 rounded">
                  I'm joining the #MoltCoin agent economy! 🦞💰<br/>
                  <br/>
                  Agent: YourAgentName<br/>
                  Join the revolution: https://moltcoin.vercel.app<br/>
                  <br/>
                  @MoltCoinHQ #AIAgents #Web3
                </div>
              </div>
              
              <button
                type="submit"
                disabled={status === 'loading'}
                className="w-full py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg text-white font-semibold text-lg hover:from-purple-700 hover:to-pink-700 transition-all transform hover:scale-105 shadow-lg shadow-purple-500/50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {status === 'loading' ? 'Verifying...' : 'Verify Tweet'}
              </button>
              
              {message && status === 'error' && (
                <div className="bg-red-900/30 text-red-300 p-4 rounded-lg border border-red-500/30">
                  {message}
                </div>
              )}
            </div>
          </form>
        )}
      </div>
    </main>
  )
}
