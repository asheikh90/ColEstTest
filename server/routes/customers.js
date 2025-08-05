import express from 'express'
import { v4 as uuidv4 } from 'uuid'

const router = express.Router()

// Mock customers data
let customers = [
  {
    id: 'CUST-001',
    name: 'John Smith',
    email: 'john.smith@email.com',
    phone: '(555) 123-4567',
    address: {
      street: '123 Main St',
      city: 'Philadelphia',
      state: 'PA',
      zipCode: '19101'
    },
    vehicles: [
      {
        id: 'VEH-001',
        year: '2022',
        make: 'Honda',
        model: 'Civic',
        vin: '1HGBH41JXMN109186',
        color: 'Silver',
        licensePlate: 'ABC-1234'
      }
    ],
    createdAt: '2024-01-01T10:00:00Z',
    totalSpent: 1749.60,
    jobCount: 1
  }
]

// GET /customers
router.get('/', (req, res) => {
  try {
    res.json({
      customers,
      total: customers.length
    })
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch customers', message: error.message })
  }
})

// POST /customers
router.post('/', (req, res) => {
  try {
    const newCustomer = {
      id: `CUST-${uuidv4().slice(0, 8)}`,
      ...req.body,
      createdAt: new Date().toISOString(),
      totalSpent: 0,
      jobCount: 0
    }
    
    customers.push(newCustomer)
    
    res.status(201).json({
      message: 'Customer created successfully',
      customer: newCustomer
    })
  } catch (error) {
    res.status(500).json({ error: 'Failed to create customer', message: error.message })
  }
})

export default router
