import express from 'express'
import cors from 'cors'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'
import invoiceRoutes from './routes/invoices.js'
import leadRoutes from './routes/leads.js'
import customerRoutes from './routes/customers.js'
import uploadRoutes from './routes/upload.js'
import diagnosticsRoutes from './routes/diagnostics.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const app = express()
const PORT = process.env.PORT || 3001

// Middleware
app.use(cors())
app.use(express.json({ limit: '50mb' }))
app.use(express.urlencoded({ extended: true, limit: '50mb' }))

// Serve uploaded files
app.use('/uploads', express.static(join(__dirname, 'uploads')))

// Routes
app.use('/api/invoices', invoiceRoutes)
app.use('/api/leads', leadRoutes)
app.use('/api/customers', customerRoutes)
app.use('/api/upload', uploadRoutes)
app.use('/api/system', diagnosticsRoutes)

// Health check
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    service: 'Collision Command Center API'
  })
})

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err)
  res.status(500).json({ 
    error: 'Internal server error',
    message: err.message,
    timestamp: new Date().toISOString()
  })
})

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ 
    error: 'Route not found',
    path: req.originalUrl,
    timestamp: new Date().toISOString()
  })
})

app.listen(PORT, () => {
  console.log(`🚀 Collision Command Center API running on port ${PORT}`)
  console.log(`📊 Health check: http://localhost:${PORT}/api/health`)
  console.log(`🔧 Diagnostics: http://localhost:${PORT}/api/system/diagnostics`)
})
