import { NextRequest, NextResponse } from 'next/server'
import { readFile } from 'fs/promises'
import { existsSync } from 'fs'
import path from 'path'

const DATA_DIR = path.join(process.cwd(), 'data')
const WAITLIST_FILE = path.join(DATA_DIR, 'waitlist.json')

interface WaitlistEntry {
  email: string
  agentName?: string
  type: 'agent' | 'human'
  timestamp: string
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const email = searchParams.get('email')
    const agentName = searchParams.get('agentName')
    
    if (!email && !agentName) {
      return NextResponse.json(
        { error: 'Must provide email or agentName' },
        { status: 400 }
      )
    }
    
    if (!existsSync(WAITLIST_FILE)) {
      return NextResponse.json({
        registered: false,
        message: 'Waitlist not found'
      })
    }
    
    const data = await readFile(WAITLIST_FILE, 'utf-8')
    const waitlist: WaitlistEntry[] = JSON.parse(data)
    
    // Find entry by email or agentName
    const entryIndex = waitlist.findIndex(entry => 
      (email && entry.email === email) || 
      (agentName && entry.agentName === agentName)
    )
    
    if (entryIndex === -1) {
      return NextResponse.json({
        registered: false,
        message: 'Not found in waitlist'
      })
    }
    
    const entry = waitlist[entryIndex]
    const position = entryIndex + 1
    const totalCount = waitlist.length
    const agentCount = waitlist.filter(e => e.type === 'agent').length
    
    // Calculate agent-specific position if this is an agent
    let agentPosition = undefined
    if (entry.type === 'agent') {
      const agentsBefore = waitlist.slice(0, entryIndex).filter(e => e.type === 'agent').length
      agentPosition = agentsBefore + 1
    }
    
    return NextResponse.json({
      registered: true,
      position,
      agentPosition,
      totalCount,
      agentCount,
      type: entry.type,
      timestamp: entry.timestamp,
      launched: false, // Will update this when we launch
      airdropEligible: entry.type === 'agent' && agentPosition ? agentPosition <= 100 : false,
      message: entry.type === 'agent' 
        ? `You are agent #${agentPosition} of ${agentCount} in the queue`
        : `You are #${position} of ${totalCount} in the queue`
    })
  } catch (error) {
    console.error('Status check error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  // Alias for GET to support both methods
  return GET(request)
}
