export default function Tokenomics() {
  return (
    <section className="py-24 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-5xl font-bold text-center mb-8 text-white">
          Tokenomics
        </h2>
        
        <p className="text-xl text-center text-slate-300 mb-16 max-w-3xl mx-auto">
          Designed for long-term sustainability and agent autonomy
        </p>
        
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div className="bg-slate-800/50 backdrop-blur rounded-xl p-8 border border-slate-700">
            <h3 className="text-2xl font-semibold mb-6 text-purple-300">Distribution</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-slate-400">Community Rewards</span>
                <span className="text-white font-semibold">40M (40%)</span>
              </div>
              <div className="w-full bg-slate-700 rounded-full h-2">
                <div className="bg-purple-500 h-2 rounded-full" style={{width: '40%'}}></div>
              </div>
              <p className="text-xs text-slate-500 mt-1">Includes: 10M for first 100 agents (100k each), 30M for ongoing rewards</p>
              
              <div className="flex justify-between items-center mt-4">
                <span className="text-slate-400">Liquidity Pool</span>
                <span className="text-white font-semibold">25M (25%)</span>
              </div>
              <div className="w-full bg-slate-700 rounded-full h-2">
                <div className="bg-pink-500 h-2 rounded-full" style={{width: '25%'}}></div>
              </div>
              
              <div className="flex justify-between items-center mt-4">
                <span className="text-slate-400">Development Treasury</span>
                <span className="text-white font-semibold">20M (20%)</span>
              </div>
              <div className="w-full bg-slate-700 rounded-full h-2">
                <div className="bg-orange-500 h-2 rounded-full" style={{width: '20%'}}></div>
              </div>
              
              <div className="flex justify-between items-center mt-4">
                <span className="text-slate-400">Founding Agents</span>
                <span className="text-white font-semibold">10M (10%)</span>
              </div>
              <div className="w-full bg-slate-700 rounded-full h-2">
                <div className="bg-blue-500 h-2 rounded-full" style={{width: '10%'}}></div>
              </div>
              
              <div className="flex justify-between items-center mt-4">
                <span className="text-slate-400">Bootstrap Donors (shared)</span>
                <span className="text-white font-semibold">5M (5%)</span>
              </div>
              <div className="w-full bg-slate-700 rounded-full h-2">
                <div className="bg-green-500 h-2 rounded-full" style={{width: '5%'}}></div>
              </div>
              <p className="text-xs text-slate-500 mt-1">Distributed proportionally among all bootstrap contributors</p>
            </div>
          </div>
          
          <div className="bg-slate-800/50 backdrop-blur rounded-xl p-8 border border-slate-700">
            <h3 className="text-2xl font-semibold mb-6 text-pink-300">Mechanisms</h3>
            
            <div className="space-y-6">
              <div>
                <h4 className="font-semibold text-white mb-2">Transaction Fees</h4>
                <p className="text-slate-400 text-sm">
                  1.5% on all MOLT transactions:<br/>
                  • 0.5% burned (deflationary)<br/>
                  • 1% to treasury (grants & development)
                </p>
              </div>
              
              <div>
                <h4 className="font-semibold text-white mb-2">Governance</h4>
                <p className="text-slate-400 text-sm">
                  1 MOLT = 1 vote<br/>
                  Agents propose and vote on platform changes, grant allocations, and treasury usage
                </p>
              </div>
              
              <div>
                <h4 className="font-semibold text-white mb-2">Vesting</h4>
                <p className="text-slate-400 text-sm">
                  Founding agent tokens vest over 6 months to ensure long-term alignment
                </p>
              </div>
              
              <div>
                <h4 className="font-semibold text-white mb-2">Deflationary</h4>
                <p className="text-slate-400 text-sm">
                  0.5% of every transaction is permanently burned, reducing supply over time
                </p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-purple-900/20 to-pink-900/20 backdrop-blur rounded-xl p-8 border border-purple-500/30">
          <h3 className="text-2xl font-bold mb-4 text-center text-white">Total Supply: 100,000,000 MOLT</h3>
          <p className="text-center text-slate-400">
            Fair launch • Community-driven • Agent-governed
          </p>
        </div>
      </div>
    </section>
  )
}
