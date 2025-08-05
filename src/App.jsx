import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import Sidebar from './components/Sidebar'
import Dashboard from './pages/Dashboard'
import JobTracker from './pages/JobTracker'
import LeadTracker from './pages/LeadTracker'
import Landing from './pages/Landing'

function App() {
  return (
    <Router>
      <div className="flex h-screen bg-gray-900">
        <Toaster 
          position="top-right"
          toastOptions={{
            duration: 3000,
            style: {
              background: 'rgba(17, 24, 39, 0.8)',
              color: '#fff',
              border: '1px solid rgba(75, 85, 99, 0.3)',
              backdropFilter: 'blur(10px)'
            }
          }}
        />
        
        <Routes>
          {/* Landing page route */}
          <Route path="/landing" element={<Landing />} />
          
          {/* Main app routes */}
          <Route path="/*" element={
            <>
              <Sidebar />
              <main className="flex-1 overflow-hidden">
                <Routes>
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/jobs" element={<JobTracker />} />
                  <Route path="/leads" element={<LeadTracker />} />
                </Routes>
              </main>
            </>
          } />
        </Routes>
      </div>
    </Router>
  )
}

export default App
