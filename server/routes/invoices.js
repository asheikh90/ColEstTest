import express from 'express'
import { v4 as uuidv4 } from 'uuid'

const router = express.Router()

// In-memory storage (replace with database in production)
let invoices = [
  {
    id: 'INV-2024-001',
    customerId: 'CUST-001',
    customerName: 'John Smith',
    customerEmail: 'john.smith@email.com',
    customerPhone: '(555) 123-4567',
    vehicleInfo: {
      year: '2022',
      make: 'Honda',
      model: 'Civic',
      vin: '1HGBH41JXMN109186'
    },
    services: [
      {
        id: 'SRV-001',
        description: 'Front bumper repair and paint',
        quantity: 1,
        unitPrice: 850.00,
        total: 850.00
      },
      {
        id: 'SRV-002',
        description: 'Headlight replacement (passenger side)',
        quantity: 1,
        unitPrice: 320.00,
        total: 320.00
      },
      {
        id: 'SRV-003',
        description: 'Paint protection film application',
        quantity: 1,
        unitPrice: 450.00,
        total: 450.00
      }
    ],
    subtotal: 1620.00,
    taxRate: 0.08,
    taxAmount: 129.60,
    totalAmount: 1749.60,
    status: 'sent',
    createdAt: '2024-01-15T10:30:00Z',
    sentAt: '2024-01-15T14:20:00Z',
    dueDate: '2024-02-14T23:59:59Z',
    notes: 'Payment due within 30 days. Thank you for choosing Collision Club Philly!',
    paymentTerms: 'Net 30',
    invoiceNumber: 'INV-2024-001'
  },
  {
    id: 'INV-2024-002',
    customerId: 'CUST-002',
    customerName: 'Sarah Johnson',
    customerEmail: 'sarah.j@email.com',
    customerPhone: '(555) 987-6543',
    vehicleInfo: {
      year: '2021',
      make: 'Toyota',
      model: 'Camry',
      vin: '4T1BZ1FK5MU123456'
    },
    services: [
      {
        id: 'SRV-004',
        description: 'Rear quarter panel repair',
        quantity: 1,
        unitPrice: 1200.00,
        total: 1200.00
      },
      {
        id: 'SRV-005',
        description: 'Paint matching and application',
        quantity: 1,
        unitPrice: 680.00,
        total: 680.00
      }
    ],
    subtotal: 1880.00,
    taxRate: 0.08,
    taxAmount: 150.40,
    totalAmount: 2030.40,
    status: 'draft',
    createdAt: '2024-01-16T09:15:00Z',
    sentAt: null,
    dueDate: '2024-02-15T23:59:59Z',
    notes: 'Includes 2-year warranty on paint work.',
    paymentTerms: 'Net 30',
    invoiceNumber: 'INV-2024-002'
  }
]

// GET /invoices - Get all invoices
router.get('/', (req, res) => {
  try {
    const { status, customerId, limit = 50, offset = 0 } = req.query
    
    let filteredInvoices = [...invoices]
    
    // Filter by status
    if (status) {
      filteredInvoices = filteredInvoices.filter(inv => inv.status === status)
    }
    
    // Filter by customer
    if (customerId) {
      filteredInvoices = filteredInvoices.filter(inv => inv.customerId === customerId)
    }
    
    // Pagination
    const startIndex = parseInt(offset)
    const endIndex = startIndex + parseInt(limit)
    const paginatedInvoices = filteredInvoices.slice(startIndex, endIndex)
    
    res.json({
      invoices: paginatedInvoices,
      total: filteredInvoices.length,
      limit: parseInt(limit),
      offset: parseInt(offset),
      hasMore: endIndex < filteredInvoices.length
    })
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch invoices', message: error.message })
  }
})

// GET /invoices/:id - Get specific invoice
router.get('/:id', (req, res) => {
  try {
    const invoice = invoices.find(inv => inv.id === req.params.id)
    
    if (!invoice) {
      return res.status(404).json({ error: 'Invoice not found' })
    }
    
    res.json(invoice)
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch invoice', message: error.message })
  }
})

// POST /invoices - Create new invoice
router.post('/', (req, res) => {
  try {
    const {
      customerId,
      customerName,
      customerEmail,
      customerPhone,
      vehicleInfo,
      services,
      notes,
      paymentTerms = 'Net 30',
      dueDate
    } = req.body
    
    // Validation
    if (!customerName || !services || !Array.isArray(services) || services.length === 0) {
      return res.status(400).json({ 
        error: 'Missing required fields',
        required: ['customerName', 'services']
      })
    }
    
    // Calculate totals
    const subtotal = services.reduce((sum, service) => {
      const serviceTotal = (service.quantity || 1) * (service.unitPrice || 0)
      return sum + serviceTotal
    }, 0)
    
    const taxRate = 0.08 // 8% tax rate
    const taxAmount = subtotal * taxRate
    const totalAmount = subtotal + taxAmount
    
    // Generate invoice number
    const invoiceCount = invoices.length + 1
    const invoiceNumber = `INV-2024-${invoiceCount.toString().padStart(3, '0')}`
    
    // Create invoice
    const newInvoice = {
      id: invoiceNumber,
      customerId: customerId || `CUST-${uuidv4().slice(0, 8)}`,
      customerName,
      customerEmail,
      customerPhone,
      vehicleInfo,
      services: services.map(service => ({
        id: service.id || `SRV-${uuidv4().slice(0, 8)}`,
        description: service.description,
        quantity: service.quantity || 1,
        unitPrice: service.unitPrice || 0,
        total: (service.quantity || 1) * (service.unitPrice || 0)
      })),
      subtotal,
      taxRate,
      taxAmount,
      totalAmount,
      status: 'draft',
      createdAt: new Date().toISOString(),
      sentAt: null,
      dueDate: dueDate || new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(), // 30 days from now
      notes: notes || '',
      paymentTerms,
      invoiceNumber
    }
    
    invoices.push(newInvoice)
    
    res.status(201).json({
      message: 'Invoice created successfully',
      invoice: newInvoice
    })
  } catch (error) {
    res.status(500).json({ error: 'Failed to create invoice', message: error.message })
  }
})

// PUT /invoices/:id - Update invoice
router.put('/:id', (req, res) => {
  try {
    const invoiceIndex = invoices.findIndex(inv => inv.id === req.params.id)
    
    if (invoiceIndex === -1) {
      return res.status(404).json({ error: 'Invoice not found' })
    }
    
    const existingInvoice = invoices[invoiceIndex]
    const updates = req.body
    
    // Handle status changes
    if (updates.status && updates.status !== existingInvoice.status) {
      if (updates.status === 'sent' && !existingInvoice.sentAt) {
        updates.sentAt = new Date().toISOString()
      }
      if (updates.status === 'paid' && !existingInvoice.paidAt) {
        updates.paidAt = new Date().toISOString()
      }
    }
    
    // Recalculate totals if services changed
    if (updates.services) {
      const subtotal = updates.services.reduce((sum, service) => {
        return sum + ((service.quantity || 1) * (service.unitPrice || 0))
      }, 0)
      
      const taxRate = updates.taxRate || existingInvoice.taxRate
      const taxAmount = subtotal * taxRate
      const totalAmount = subtotal + taxAmount
      
      updates.subtotal = subtotal
      updates.taxAmount = taxAmount
      updates.totalAmount = totalAmount
    }
    
    // Update invoice
    const updatedInvoice = {
      ...existingInvoice,
      ...updates,
      updatedAt: new Date().toISOString()
    }
    
    invoices[invoiceIndex] = updatedInvoice
    
    res.json({
      message: 'Invoice updated successfully',
      invoice: updatedInvoice
    })
  } catch (error) {
    res.status(500).json({ error: 'Failed to update invoice', message: error.message })
  }
})

// DELETE /invoices/:id - Delete invoice
router.delete('/:id', (req, res) => {
  try {
    const invoiceIndex = invoices.findIndex(inv => inv.id === req.params.id)
    
    if (invoiceIndex === -1) {
      return res.status(404).json({ error: 'Invoice not found' })
    }
    
    const deletedInvoice = invoices.splice(invoiceIndex, 1)[0]
    
    res.json({
      message: 'Invoice deleted successfully',
      invoice: deletedInvoice
    })
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete invoice', message: error.message })
  }
})

// POST /invoices/:id/send - Send invoice to customer
router.post('/:id/send', (req, res) => {
  try {
    const invoiceIndex = invoices.findIndex(inv => inv.id === req.params.id)
    
    if (invoiceIndex === -1) {
      return res.status(404).json({ error: 'Invoice not found' })
    }
    
    const invoice = invoices[invoiceIndex]
    
    // Simulate sending invoice (replace with actual email service)
    const emailResult = simulateEmailSend(invoice)
    
    // Update invoice status
    invoices[invoiceIndex] = {
      ...invoice,
      status: 'sent',
      sentAt: new Date().toISOString(),
      emailResult
    }
    
    res.json({
      message: 'Invoice sent successfully',
      invoice: invoices[invoiceIndex],
      emailResult
    })
  } catch (error) {
    res.status(500).json({ error: 'Failed to send invoice', message: error.message })
  }
})

// Simulate email sending (replace with actual service like SendGrid, Mailgun, etc.)
function simulateEmailSend(invoice) {
  return {
    success: true,
    messageId: `msg_${uuidv4()}`,
    to: invoice.customerEmail,
    subject: `Invoice ${invoice.invoiceNumber} from Collision Club Philly`,
    sentAt: new Date().toISOString(),
    provider: 'mock-email-service'
  }
}

export default router
