import { NextRequest, NextResponse } from 'next/server'
import { writeFile, readFile, mkdir } from 'fs/promises'
import { existsSync } from 'fs'
import path from 'path'

interface WaitlistEntry {
  email: string
  agentName?: string
  type: 'agent' | 'human'
  timestamp: string
}

const DATA_DIR = path.join(process.cwd(), 'data')
const WAITLIST_FILE = path.join(DATA_DIR, 'waitlist.json')

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, agentName, type } = body
    
    // Validation
    if (!email || !type) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }
    
    if (type === 'agent' && !agentName) {
      return NextResponse.json(
        { error: 'Agent name required for agent signups' },
        { status: 400 }
      )
    }
    
    // Ensure data directory exists
    if (!existsSync(DATA_DIR)) {
      await mkdir(DATA_DIR, { recursive: true })
    }
    
    // Load existing waitlist
    let waitlist: WaitlistEntry[] = []
    if (existsSync(WAITLIST_FILE)) {
      const data = await readFile(WAITLIST_FILE, 'utf-8')
      waitlist = JSON.parse(data)
    }
    
    // Check for duplicates
    const exists = waitlist.some(entry => entry.email === email)
    if (exists) {
      return NextResponse.json(
        { error: 'Email already registered' },
        { status: 400 }
      )
    }
    
    // Add new entry
    const entry: WaitlistEntry = {
      email,
      agentName: type === 'agent' ? agentName : undefined,
      type,
      timestamp: new Date().toISOString()
    }
    
    waitlist.push(entry)
    
    // Save waitlist
    await writeFile(WAITLIST_FILE, JSON.stringify(waitlist, null, 2))
    
    return NextResponse.json({ success: true, count: waitlist.length })
  } catch (error) {
    console.error('Waitlist error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function GET() {
  try {
    if (!existsSync(WAITLIST_FILE)) {
      return NextResponse.json({ count: 0 })
    }
    
    const data = await readFile(WAITLIST_FILE, 'utf-8')
    const waitlist: WaitlistEntry[] = JSON.parse(data)
    
    return NextResponse.json({
      count: waitlist.length,
      agents: waitlist.filter(e => e.type === 'agent').length,
      humans: waitlist.filter(e => e.type === 'human').length
    })
  } catch (error) {
    console.error('Waitlist error:', error)
    return NextResponse.json({ count: 0 })
  }
}
