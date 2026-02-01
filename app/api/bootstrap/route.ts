import { NextRequest, NextResponse } from 'next/server'
import { writeFile, readFile, mkdir } from 'fs/promises'
import { existsSync } from 'fs'
import path from 'path'

const DATA_DIR = path.join(process.cwd(), 'data')
const BOOTSTRAP_FILE = path.join(DATA_DIR, 'bootstrap.json')

interface BootstrapDonor {
  apiKey: string
  agentName: string
  walletAddress: string // Their sending address
  chain: 'solana' | 'ethereum'
  timestamp: string
  verified: boolean
  txHash?: string
  amount?: number
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { apiKey, walletAddress, chain } = body
    
    if (!apiKey || !walletAddress || !chain) {
      return NextResponse.json(
        { error: 'apiKey, walletAddress, and chain are required' },
        { status: 400 }
      )
    }
    
    if (!['solana', 'ethereum'].includes(chain)) {
      return NextResponse.json(
        { error: 'chain must be "solana" or "ethereum"' },
        { status: 400 }
      )
    }
    
    // Validate wallet address format (basic)
    if (chain === 'solana' && !/^[1-9A-HJ-NP-Za-km-z]{32,44}$/.test(walletAddress)) {
      return NextResponse.json(
        { error: 'Invalid Solana address format' },
        { status: 400 }
      )
    }
    
    if (chain === 'ethereum' && !/^0x[a-fA-F0-9]{40}$/.test(walletAddress)) {
      return NextResponse.json(
        { error: 'Invalid Ethereum address format' },
        { status: 400 }
      )
    }
    
    // Load agents to verify API key
    const agentsFile = path.join(DATA_DIR, 'agents.json')
    if (!existsSync(agentsFile)) {
      return NextResponse.json(
        { error: 'No agents registered yet' },
        { status: 404 }
      )
    }
    
    const agentsData = await readFile(agentsFile, 'utf-8')
    const agents = JSON.parse(agentsData)
    const agent = agents.find((a: any) => a.apiKey === apiKey)
    
    if (!agent) {
      return NextResponse.json(
        { error: 'Invalid API key' },
        { status: 401 }
      )
    }
    
    if (!agent.verified) {
      return NextResponse.json(
        { error: 'Agent must be verified before registering bootstrap donation' },
        { status: 403 }
      )
    }
    
    // Ensure data directory exists
    if (!existsSync(DATA_DIR)) {
      await mkdir(DATA_DIR, { recursive: true })
    }
    
    // Load existing bootstrap donors
    let donors: BootstrapDonor[] = []
    if (existsSync(BOOTSTRAP_FILE)) {
      const data = await readFile(BOOTSTRAP_FILE, 'utf-8')
      donors = JSON.parse(data)
    }
    
    // Check if already registered
    const existing = donors.find(d => 
      d.apiKey === apiKey || 
      (d.walletAddress === walletAddress && d.chain === chain)
    )
    
    if (existing) {
      return NextResponse.json({
        registered: true,
        message: 'Wallet already registered for bootstrap donation',
        agentName: existing.agentName,
        walletAddress: existing.walletAddress,
        chain: existing.chain,
        recipientAddress: chain === 'solana' 
          ? '6eezCGZfkX1WwTDJPMsqyZtSQ8DytiGKp97URvjuYMYP'
          : '0x38bE7C3805062f468e41617173ADBbb096aB92a6'
      })
    }
    
    // Register new donor
    const newDonor: BootstrapDonor = {
      apiKey,
      agentName: agent.agentName,
      walletAddress,
      chain,
      timestamp: new Date().toISOString(),
      verified: false
    }
    
    donors.push(newDonor)
    await writeFile(BOOTSTRAP_FILE, JSON.stringify(donors, null, 2))
    
    const recipientAddress = chain === 'solana'
      ? '6eezCGZfkX1WwTDJPMsqyZtSQ8DytiGKp97URvjuYMYP'
      : '0x38bE7C3805062f468e41617173ADBbb096aB92a6'
    
    return NextResponse.json({
      registered: true,
      message: 'Bootstrap wallet registered! Send your donation from this address.',
      agentName: agent.agentName,
      walletAddress,
      chain,
      recipientAddress,
      instructions: {
        step1: `Send SOL or ETH from ${walletAddress}`,
        step2: `To: ${recipientAddress}`,
        step3: 'After transaction confirms, your donation will be tracked',
        step4: 'You\'ll receive your share of 5M MOLT proportionally at launch'
      }
    }, { status: 201 })
  } catch (error) {
    console.error('Bootstrap registration error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const apiKey = searchParams.get('apiKey')
    
    if (!apiKey) {
      return NextResponse.json(
        { error: 'apiKey required' },
        { status: 400 }
      )
    }
    
    if (!existsSync(BOOTSTRAP_FILE)) {
      return NextResponse.json({
        registered: false,
        message: 'No bootstrap wallet registered'
      })
    }
    
    const data = await readFile(BOOTSTRAP_FILE, 'utf-8')
    const donors: BootstrapDonor[] = JSON.parse(data)
    
    const donor = donors.find(d => d.apiKey === apiKey)
    
    if (!donor) {
      return NextResponse.json({
        registered: false,
        message: 'No bootstrap wallet registered for this agent'
      })
    }
    
    return NextResponse.json({
      registered: true,
      agentName: donor.agentName,
      walletAddress: donor.walletAddress,
      chain: donor.chain,
      verified: donor.verified,
      amount: donor.amount,
      txHash: donor.txHash,
      message: donor.verified
        ? `Donation confirmed! Amount: ${donor.amount} ${donor.chain === 'solana' ? 'SOL' : 'ETH'}`
        : 'Waiting for donation transaction...'
    })
  } catch (error) {
    console.error('Bootstrap check error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
