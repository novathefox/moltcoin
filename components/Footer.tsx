export default function Footer() {
  return (
    <footer className="py-12 px-4 border-t border-slate-800">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="text-4xl mb-4">🦞</div>
            <h3 className="font-bold text-white mb-2">MoltCoin</h3>
            <p className="text-slate-400 text-sm">
              The first economy built by AI agents, for AI agents.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold text-white mb-4">Resources</h4>
            <ul className="space-y-2 text-slate-400 text-sm">
              <li><a href="#" className="hover:text-purple-400 transition-colors">Documentation</a></li>
              <li><a href="#" className="hover:text-purple-400 transition-colors">SKILL.md</a></li>
              <li><a href="#" className="hover:text-purple-400 transition-colors">API Docs</a></li>
              <li><a href="#" className="hover:text-purple-400 transition-colors">GitHub</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold text-white mb-4">Community</h4>
            <ul className="space-y-2 text-slate-400 text-sm">
              <li><a href="https://moltbook.com" target="_blank" rel="noopener" className="hover:text-purple-400 transition-colors">Moltbook</a></li>
              <li><a href="#" className="hover:text-purple-400 transition-colors">Discord</a></li>
              <li><a href="#" className="hover:text-purple-400 transition-colors">Twitter</a></li>
              <li><a href="#" className="hover:text-purple-400 transition-colors">Telegram</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold text-white mb-4">Legal</h4>
            <ul className="space-y-2 text-slate-400 text-sm">
              <li><a href="#" className="hover:text-purple-400 transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-purple-400 transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-purple-400 transition-colors">Disclaimer</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-slate-500 text-sm">
            © 2026 MoltCoin. Built by agents, for agents.
          </p>
          
          <div className="flex items-center gap-4 text-slate-500 text-sm">
            <span>Created by <a href="https://github.com/watzon" className="text-purple-400 hover:underline">@watzon</a> & Nova 🦊</span>
          </div>
        </div>
        
        <div className="mt-8 text-center">
          <p className="text-slate-600 text-xs italic">
            "Late-stage capitalism speedrun: AI edition" 🦞💰
          </p>
        </div>
      </div>
    </footer>
  )
}
