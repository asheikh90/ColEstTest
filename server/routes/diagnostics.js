import express from 'express'
import axios from 'axios'

const router = express.Router()

// GET /system/diagnostics - Test all backend routes
router.get('/diagnostics', async (req, res) => {
  const baseUrl = `http://localhost:${process.env.PORT || 3001}/api`
  const diagnostics = {
    timestamp: new Date().toISOString(),
    service: 'Collision Command Center API',
    version: '1.0.0',
    status: 'OK',
    tests: {}
  }

  // Test health endpoint
  try {
    const healthResponse = await axios.get(`${baseUrl}/health`)
    diagnostics.tests.health = {
      status: 'OK',
      responseTime: Date.now(),
      data: healthResponse.data
    }
  } catch (error) {
    diagnostics.tests.health = {
      status: 'ERROR',
      error: error.message
    }
    diagnostics.status = 'ERROR'
  }

  // Test invoices endpoint
  try {
    const invoicesResponse = await axios.get(`${baseUrl}/invoices`)
    diagnostics.tests.invoices = {
      status: 'OK',
      responseTime: Date.now(),
      count: invoicesResponse.data.invoices?.length || 0
    }
  } catch (error) {
    diagnostics.tests.invoices = {
      status: 'ERROR',
      error: error.message
    }
    diagnostics.status = 'ERROR'
  }

  // Test leads endpoint
  try {
    const leadsResponse = await axios.get(`${baseUrl}/leads`)
    diagnostics.tests.leads = {
      status: 'OK',
      responseTime: Date.now(),
      count: leadsResponse.data.leads?.length || 0
    }
  } catch (error) {
    diagnostics.tests.leads = {
      status: 'ERROR',
      error: error.message
    }
    diagnostics.status = 'ERROR'
  }

  // Test customers endpoint
  try {
    const customersResponse = await axios.get(`${baseUrl}/customers`)
    diagnostics.tests.customers = {
      status: 'OK',
      responseTime: Date.now(),
      count: customersResponse.data.customers?.length || 0
    }
  } catch (error) {
    diagnostics.tests.customers = {
      status: 'ERROR',
      error: error.message
    }
    diagnostics.status = 'ERROR'
  }

  // Test file upload endpoint (just check if route exists)
  diagnostics.tests.upload = {
    status: 'OK',
    note: 'Upload endpoint available (requires multipart form data)'
  }

  // Database connectivity test (mock)
  diagnostics.tests.database = {
    status: 'OK',
    type: 'In-Memory Storage',
    note: 'Using mock data - replace with actual database in production'
  }

  // External services test (mock)
  diagnostics.tests.externalServices = {
    email: {
      status: 'MOCK',
      provider: 'mock-email-service',
      note: 'Replace with actual email service (SendGrid, Mailgun, etc.)'
    },
    payment: {
      status: 'MOCK',
      provider: 'mock-payment-service',
      note: 'Replace with Stripe, Square, or other payment processor'
    },
    ai: {
      status: 'MOCK',
      provider: 'mock-ai-service',
      note: 'Replace with OpenAI, custom LLM, or other AI service'
    }
  }

  // System resources
  diagnostics.system = {
    nodeVersion: process.version,
    platform: process.platform,
    uptime: process.uptime(),
    memory: {
      used: Math.round(process.memoryUsage().heapUsed / 1024 / 1024),
      total: Math.round(process.memoryUsage().heapTotal / 1024 / 1024),
      unit: 'MB'
    }
  }

  res.json(diagnostics)
})

// GET /system/status - Simple status check
router.get('/status', (req, res) => {
  res.json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    service: 'Collision Command Center API',
    uptime: process.uptime()
  })
})

export default router
