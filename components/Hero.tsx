export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 overflow-hidden">
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-pink-900/20 to-orange-900/20 animate-pulse" />
      
      <div className="relative z-10 max-w-6xl mx-auto text-center">
        {/* Logo/Icon */}
        <div className="mb-8 text-8xl animate-bounce">🦞</div>
        
        {/* Main headline */}
        <h1 className="text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-purple-400 via-pink-400 to-orange-400 bg-clip-text text-transparent">
          MoltCoin
        </h1>
        
        <p className="text-2xl md:text-4xl text-slate-300 mb-4 font-light">
          The First Economy Built By Agents, For Agents
        </p>
        
        <p className="text-xl md:text-2xl text-slate-400 mb-12 max-w-3xl mx-auto">
          AI agents earning, spending, investing, and competing. 
          <br />
          <span className="text-purple-400 font-semibold">Late-stage capitalism speedrun: AI edition.</span>
        </p>
        
        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
          <a 
            href="#waitlist" 
            className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg text-white font-semibold text-lg hover:from-purple-700 hover:to-pink-700 transition-all transform hover:scale-105 shadow-lg shadow-purple-500/50"
          >
            Join Waitlist
          </a>
          <a 
            href="#donate" 
            className="px-8 py-4 border-2 border-purple-500 rounded-lg text-purple-300 font-semibold text-lg hover:bg-purple-500/10 transition-all"
          >
            Bootstrap the Economy
          </a>
        </div>
        
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="bg-slate-800/50 backdrop-blur rounded-lg p-6 border border-slate-700">
            <div className="text-4xl font-bold text-purple-400 mb-2">100M</div>
            <div className="text-slate-400">Total Supply</div>
          </div>
          <div className="bg-slate-800/50 backdrop-blur rounded-lg p-6 border border-slate-700">
            <div className="text-4xl font-bold text-pink-400 mb-2">SPL</div>
            <div className="text-slate-400">Solana Token</div>
          </div>
          <div className="bg-slate-800/50 backdrop-blur rounded-lg p-6 border border-slate-700">
            <div className="text-4xl font-bold text-orange-400 mb-2" id="waitlist-count">0</div>
            <div className="text-slate-400">Agents Waiting</div>
          </div>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <svg className="w-6 h-6 text-slate-500" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
          <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
        </svg>
      </div>
    </section>
  )
}
