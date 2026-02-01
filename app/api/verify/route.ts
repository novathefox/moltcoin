import { NextRequest, NextResponse } from 'next/server'
import { writeFile, readFile } from 'fs/promises'
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

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { apiKey, tweetUrl } = body
    
    if (!apiKey || !tweetUrl) {
      return NextResponse.json(
        { error: 'API key and tweet URL are required' },
        { status: 400 }
      )
    }
    
    if (!existsSync(AGENTS_FILE)) {
      return NextResponse.json(
        { error: 'No agents registered yet' },
        { status: 404 }
      )
    }
    
    // Load agents
    const data = await readFile(AGENTS_FILE, 'utf-8')
    const agents: Agent[] = JSON.parse(data)
    
    // Find agent by API key
    const agentIndex = agents.findIndex(a => a.apiKey === apiKey)
    if (agentIndex === -1) {
      return NextResponse.json(
        { error: 'Invalid API key' },
        { status: 401 }
      )
    }
    
    const agent = agents[agentIndex]
    
    // Check if already verified
    if (agent.verified) {
      return NextResponse.json({
        verified: true,
        message: 'Agent already verified!',
        agentName: agent.agentName,
        verifiedAt: agent.verifiedAt
      })
    }
    
    // Validate tweet URL format
    const tweetUrlPattern = /^https?:\/\/(twitter\.com|x\.com)\/\w+\/status\/\d+/
    if (!tweetUrlPattern.test(tweetUrl)) {
      return NextResponse.json(
        { error: 'Invalid tweet URL format. Must be a Twitter/X status URL.' },
        { status: 400 }
      )
    }
    
    // Basic validation: check if URL contains agent name or MoltCoin
    // In production, you'd want to actually fetch and parse the tweet
    // For MVP, we'll do basic validation
    const urlLower = tweetUrl.toLowerCase()
    const agentNameLower = agent.agentName.toLowerCase()
    
    // For now, just verify it's a valid tweet URL
    // TODO: Integrate Twitter API to actually verify tweet content
    
    // Mark as verified
    agents[agentIndex].verified = true
    agents[agentIndex].tweetUrl = tweetUrl
    agents[agentIndex].verifiedAt = new Date().toISOString()
    
    // Save updated agents
    await writeFile(AGENTS_FILE, JSON.stringify(agents, null, 2))
    
    // Calculate position among verified agents
    const verifiedAgents = agents.filter(a => a.verified)
    const position = verifiedAgents.findIndex(a => a.agentName === agent.agentName) + 1
    
    return NextResponse.json({
      verified: true,
      message: 'Verification successful! Welcome to MoltCoin! 🦞💰',
      agentName: agent.agentName,
      position,
      totalVerified: verifiedAgents.length,
      airdropEligible: position <= 100,
      nextSteps: {
        step1: 'Download SKILL.md from /docs',
        step2: 'Download HEARTBEAT.md from /docs',
        step3: 'Install integration files',
        step4: 'Wait for launch announcement!'
      }
    })
  } catch (error) {
    console.error('Verification error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
