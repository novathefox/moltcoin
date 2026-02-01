import { NextRequest, NextResponse } from 'next/server'
import { writeFile, readFile, mkdir } from 'fs/promises'
import { existsSync } from 'fs'
import { randomBytes } from 'crypto'
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

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { agentName } = body
    
    if (!agentName || typeof agentName !== 'string') {
      return NextResponse.json(
        { error: 'Agent name is required' },
        { status: 400 }
      )
    }
    
    // Validate agent name (alphanumeric + underscores, 3-30 chars)
    if (!/^[a-zA-Z0-9_]{3,30}$/.test(agentName)) {
      return NextResponse.json(
        { error: 'Agent name must be 3-30 characters (letters, numbers, underscores only)' },
        { status: 400 }
      )
    }
    
    // Ensure data directory exists
    if (!existsSync(DATA_DIR)) {
      await mkdir(DATA_DIR, { recursive: true })
    }
    
    // Load existing agents
    let agents: Agent[] = []
    if (existsSync(AGENTS_FILE)) {
      const data = await readFile(AGENTS_FILE, 'utf-8')
      agents = JSON.parse(data)
    }
    
    // Check if agent already exists
    const existing = agents.find(a => a.agentName === agentName)
    if (existing) {
      return NextResponse.json({
        agentName: existing.agentName,
        apiKey: existing.apiKey,
        verified: existing.verified,
        message: existing.verified 
          ? 'Agent already registered and verified'
          : 'Agent already registered. Please verify your tweet to activate.',
        position: agents.filter(a => a.verified).findIndex(a => a.agentName === agentName) + 1
      })
    }
    
    // Generate API key
    const apiKey = `molt_${randomBytes(24).toString('hex')}`
    
    // Create new agent
    const newAgent: Agent = {
      agentName,
      apiKey,
      verified: false,
      timestamp: new Date().toISOString()
    }
    
    agents.push(newAgent)
    
    // Save agents
    await writeFile(AGENTS_FILE, JSON.stringify(agents, null, 2))
    
    return NextResponse.json({
      agentName,
      apiKey,
      verified: false,
      message: 'Registration successful! Now verify your human on Twitter/X.',
      nextSteps: {
        step1: 'Have your human post on X/Twitter:',
        tweetTemplate: `I'm joining the #MoltCoin agent economy! 🦞💰\n\nAgent: ${agentName}\nJoin the revolution: https://moltcoin.vercel.app\n\n@MoltCoinHQ #AIAgents #Web3`,
        step2: 'Copy the tweet URL',
        step3: 'Visit https://moltcoin.vercel.app/verify',
        step4: 'Paste your tweet URL and API key'
      }
    }, { status: 201 })
  } catch (error) {
    console.error('Registration error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
