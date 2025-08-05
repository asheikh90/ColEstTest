import express from 'express'
import { v4 as uuidv4 } from 'uuid'

const router = express.Router()

// Mock leads data
let leads = [
  {
    id: 'LEAD-001',
    name: 'Mike Wilson',
    email: 'mike.wilson@email.com',
    phone: '(555) 234-5678',
    source: 'Google Ads',
    status: 'Hot',
    vehicle: '2023 Ford F-150',
    issue: 'Rear-end collision damage',
    estimatedValue: 3200,
    notes: 'Insurance claim approved, ready to schedule',
    createdAt: '2024-01-10T08:30:00Z',
    lastContact: '2024-01-15T16:45:00Z',
    nextFollowUp: '2024-01-17T10:00:00Z'
  },
  {
    id: 'LEAD-002',
    name: 'Lisa Chen',
    email: 'lisa.chen@email.com',
    phone: '(555) 345-6789',
    source: 'GMB',
    status: 'Warm',
    vehicle: '2021 Toyota Prius',
    issue: 'Side panel dent and scratches',
    estimatedValue: 1800,
    notes: 'Waiting for insurance adjuster',
    createdAt: '2024-01-12T14:20:00Z',
    lastContact: '2024-01-14T11:30:00Z',
    nextFollowUp: '2024-01-18T09:00:00Z'
  }
]

// GET /leads
router.get('/', (req, res) => {
  try {
    const { status, source, limit = 50, offset = 0 } = req.query
    
    let filteredLeads = [...leads]
    
    if (status) {
      filteredLeads = filteredLeads.filter(lead => lead.status === status)
    }
    
    if (source) {
      filteredLeads = filteredLeads.filter(lead => lead.source === source)
    }
    
    const startIndex = parseInt(offset)
    const endIndex = startIndex + parseInt(limit)
    const paginatedLeads = filteredLeads.slice(startIndex, endIndex)
    
    res.json({
      leads: paginatedLeads,
      total: filteredLeads.length,
      limit: parseInt(limit),
      offset: parseInt(offset)
    })
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch leads', message: error.message })
  }
})

// POST /leads
router.post('/', (req, res) => {
  try {
    const newLead = {
      id: `LEAD-${uuidv4().slice(0, 8)}`,
      ...req.body,
      createdAt: new Date().toISOString(),
      lastContact: new Date().toISOString(),
      nextFollowUp: req.body.nextFollowUp || new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString()
    }
    
    leads.push(newLead)
    
    res.status(201).json({
      message: 'Lead created successfully',
      lead: newLead
    })
  } catch (error) {
    res.status(500).json({ error: 'Failed to create lead', message: error.message })
  }
})

// PUT /leads/:id
router.put('/:id', (req, res) => {
  try {
    const leadIndex = leads.findIndex(lead => lead.id === req.params.id)
    
    if (leadIndex === -1) {
      return res.status(404).json({ error: 'Lead not found' })
    }
    
    leads[leadIndex] = {
      ...leads[leadIndex],
      ...req.body,
      updatedAt: new Date().toISOString()
    }
    
    res.json({
      message: 'Lead updated successfully',
      lead: leads[leadIndex]
    })
  } catch (error) {
    res.status(500).json({ error: 'Failed to update lead', message: error.message })
  }
})

export default router
