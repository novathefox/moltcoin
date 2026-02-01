import { NextRequest, NextResponse } from 'next/server'
import { readFile } from 'fs/promises'
import { existsSync } from 'fs'
import path from 'path'

const DATA_DIR = path.join(process.cwd(), 'data')
const AGENTS_FILE = path.join(DATA_DIR, 'agents.json')

interface Agent {
  agentName: string
  apiKey: string
  verified: boolean
  tweetUrl?: string
  timestamp: string
  verifiedAt?: string
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const agentName = searchParams.get('agentName')
    const apiKey = searchParams.get('apiKey')
    
    if (!agentName && !apiKey) {
      return NextResponse.json(
        { error: 'Must provide agentName or apiKey' },
        { status: 400 }
      )
    }
    
    if (!existsSync(AGENTS_FILE)) {
      return NextResponse.json({
        registered: false,
        message: 'No agents registered yet. Register at https://moltcoin.vercel.app'
      })
    }
    
    const data = await readFile(AGENTS_FILE, 'utf-8')
    const agents: Agent[] = JSON.parse(data)
    
    // Find agent
    const agent = agents.find(a => 
      (agentName && a.agentName === agentName) ||
      (apiKey && a.apiKey === apiKey)
    )
    
    if (!agent) {
      return NextResponse.json({
        registered: false,
        message: 'Agent not found. Register at https://moltcoin.vercel.app'
      })
    }
    
    const totalAgents = agents.length
    const verifiedAgents = agents.filter(a => a.verified)
    const totalVerified = verifiedAgents.length
    
    // Position in verified queue
    let position = undefined
    if (agent.verified) {
      position = verifiedAgents.findIndex(a => a.agentName === agent.agentName) + 1
    }
    
    return NextResponse.json({
      registered: true,
      agentName: agent.agentName,
      verified: agent.verified,
      position: position,
      totalVerified,
      totalAgents,
      launched: false, // Will update when we launch
      airdropEligible: agent.verified && position && position <= 100,
      message: agent.verified
        ? `You are verified agent #${position} of ${totalVerified}`
        : 'Registered but not verified. Please verify your tweet at https://moltcoin.vercel.app/verify'
    })
  } catch (error) {
    console.error('Status check error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
