import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Zap, 
  Brain, 
  Camera, 
  MessageSquare, 
  DollarSign,
  TrendingUp,
  Shield,
  Clock,
  Users,
  Star,
  Check,
  ArrowRight,
  Play,
  X
} from 'lucide-react'
import { pageTransition, cardHover, buttonPress } from '../utils/animations'

const Landing = () => {
  const [selectedPlan, setSelectedPlan] = useState('pro')
  const [showDemoModal, setShowDemoModal] = useState(false)
  const [demoForm, setDemoForm] = useState({
    name: '',
    email: '',
    phone: '',
    shopName: '',
    currentVolume: ''
  })

  const features = [
    {
      icon: Brain,
      title: 'AI Damage Analysis',
      description: 'Upload photos and get instant damage assessments with pricing estimates',
      gradient: 'from-purple-500 to-blue-600'
    },
    {
      icon: Camera,
      title: 'Smart Photo Management',
      description: 'Organize damage photos with automatic labeling and before/after tracking',
      gradient: 'from-blue-500 to-cyan-600'
    },
    {
      icon: MessageSquare,
      title: 'Lead Conversion Engine',
      description: 'Track leads from inquiry to completion with AI-powered follow-up suggestions',
      gradient: 'from-green-500 to-emerald-600'
    },
    {
      icon: DollarSign,
      title: 'Automated Invoicing',
      description: 'Generate professional invoices and track payments seamlessly',
      gradient: 'from-yellow-500 to-orange-600'
    },
    {
      icon: TrendingUp,
      title: 'Performance Analytics',
      description: 'Real-time insights into conversion rates, revenue trends, and shop efficiency',
      gradient: 'from-pink-500 to-red-600'
    },
    {
      icon: Shield,
      title: 'Enterprise Security',
      description: 'Bank-level encryption and compliance with industry standards',
      gradient: 'from-indigo-500 to-purple-600'
    }
  ]

  const testimonials = [
    {
      name: 'Mike Rodriguez',
      shop: 'Elite Auto Body',
      location: 'Miami, FL',
      quote: 'This platform increased our conversion rate by 40% in just 3 months. The AI damage analysis saves us hours every day.',
      rating: 5,
      avatar: '👨‍🔧'
    },
    {
      name: 'Sarah Chen',
      shop: 'Precision Collision',
      location: 'Seattle, WA',
      quote: 'The lead tracking system is incredible. We never lose a potential customer anymore, and the automated follow-ups are game-changing.',
      rating: 5,
      avatar: '👩‍💼'
    },
    {
      name: 'David Thompson',
      shop: 'Thompson Auto Repair',
      location: 'Austin, TX',
      quote: 'ROI was immediate. The time we save on estimates and invoicing alone pays for the software. Highly recommend!',
      rating: 5,
      avatar: '👨‍💻'
    }
  ]

  const pricingPlans = [
    {
      id: 'starter',
      name: 'Starter',
      price: 99,
      description: 'Perfect for small shops getting started',
      features: [
        'Up to 50 estimates per month',
        'Basic AI damage analysis',
        'Lead tracking for 100 leads',
        'Standard invoicing',
        'Email support',
        'Mobile app access'
      ],
      popular: false,
      gradient: 'from-blue-500 to-blue-600'
    },
    {
      id: 'pro',
      name: 'Pro',
      price: 199,
      description: 'Most popular for growing collision shops',
      features: [
        'Unlimited estimates',
        'Advanced AI with 95% accuracy',
        'Unlimited lead tracking',
        'Automated invoicing & payments',
        'Priority phone support',
        'Advanced analytics dashboard',
        'Custom branding',
        'API integrations'
      ],
      popular: true,
      gradient: 'from-purple-500 to-pink-600'
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      price: 399,
      description: 'For large operations and multi-location shops',
      features: [
        'Everything in Pro',
        'Multi-location management',
        'Custom AI model training',
        'White-label solution',
        'Dedicated account manager',
        'Custom integrations',
        'Advanced reporting suite',
        'SLA guarantee'
      ],
      popular: false,
      gradient: 'from-orange-500 to-red-600'
    }
  ]

  const handleDemoRequest = (e) => {
    e.preventDefault()
    // Mock demo request
    console.log('Demo requested:', demoForm)
    alert('Demo request submitted! We\'ll contact you within 24 hours.')
    setShowDemoModal(false)
    setDemoForm({ name: '', email: '', phone: '', shopName: '', currentVolume: '' })
  }

  return (
    <motion.div
      variants={pageTransition}
      initial="initial"
      animate="animate"
      exit="exit"
      className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900"
    >
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-6 py-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            {/* Logo/Brand */}
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-8 shadow-2xl"
            >
              <Zap className="text-white" size={40} />
            </motion.div>

            <h1 className="text-6xl md:text-7xl font-bold mb-6">
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                AI-Powered Command Center
              </span>
              <br />
              <span className="text-white">for Collision Shops</span>
            </h1>

            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
              Automate quoting, estimate with AI, track leads, manage photos, and send invoices — all in one place. 
              <span className="text-blue-400 font-semibold"> Increase revenue by 40%</span> while saving 10+ hours per week.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <motion.button
                {...buttonPress}
                onClick={() => setShowDemoModal(true)}
                className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-2xl flex items-center space-x-2"
              >
                <Play size={20} />
                <span>Request a Demo</span>
              </motion.button>

              <motion.button
                {...buttonPress}
                className="bg-white/10 backdrop-blur-xl border border-white/20 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-white/20 transition-colors flex items-center space-x-2"
              >
                <span>View Pricing</span>
                <ArrowRight size={20} />
              </motion.button>
            </div>

            {/* Social Proof */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="mt-12 flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-8 text-gray-400"
            >
              <div className="flex items-center space-x-2">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="text-yellow-400 fill-current" size={16} />
                  ))}
                </div>
                <span>4.9/5 from 200+ shops</span>
              </div>
              <div className="flex items-center space-x-2">
                <Users size={16} />
                <span>Trusted by 500+ collision centers</span>
              </div>
              <div className="flex items-center space-x-2">
                <TrendingUp size={16} />
                <span>$2M+ in additional revenue generated</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-white mb-4">
              Everything You Need to <span className="text-blue-400">Dominate</span> Your Market
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Our AI-powered platform handles every aspect of your collision business, from first contact to final payment.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon
              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  variants={cardHover}
                  whileHover="hover"
                  className="group"
                >
                  <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-8 h-full relative overflow-hidden">
                    <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-5 group-hover:opacity-10 transition-opacity duration-300`} />
                    
                    <div className="relative z-10">
                      <div className={`w-16 h-16 bg-gradient-to-r ${feature.gradient} rounded-xl flex items-center justify-center mb-6 shadow-lg`}>
                        <Icon className="text-white" size={32} />
                      </div>
                      
                      <h3 className="text-xl font-semibold text-white mb-4">{feature.title}</h3>
                      <p className="text-gray-400 leading-relaxed">{feature.description}</p>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-6 bg-white/5">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-white mb-4">
              Loved by <span className="text-green-400">Collision Professionals</span>
            </h2>
            <p className="text-xl text-gray-400">
              See what shop owners are saying about their results
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                variants={cardHover}
                whileHover="hover"
                className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-8"
              >
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="text-yellow-400 fill-current" size={16} />
                  ))}
                </div>
                
                <p className="text-gray-300 mb-6 italic leading-relaxed">
                  "{testimonial.quote}"
                </p>
                
                <div className="flex items-center space-x-3">
                  <div className="text-2xl">{testimonial.avatar}</div>
                  <div>
                    <p className="text-white font-semibold">{testimonial.name}</p>
                    <p className="text-gray-400 text-sm">{testimonial.shop}</p>
                    <p className="text-gray-500 text-xs">{testimonial.location}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-white mb-4">
              Simple, <span className="text-purple-400">Transparent</span> Pricing
            </h2>
            <p className="text-xl text-gray-400 mb-8">
              Choose the plan that fits your shop's size and needs
            </p>
            <div className="flex items-center justify-center space-x-4 text-gray-400">
              <Clock size={16} />
              <span>30-day free trial • No setup fees • Cancel anytime</span>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pricingPlans.map((plan, index) => (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                variants={cardHover}
                whileHover="hover"
                className={`relative group ${plan.popular ? 'scale-105' : ''}`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <div className="bg-gradient-to-r from-purple-500 to-pink-600 text-white px-4 py-1 rounded-full text-sm font-semibold">
                      Most Popular
                    </div>
                  </div>
                )}
                
                <div className={`bg-white/10 backdrop-blur-xl border ${plan.popular ? 'border-purple-500/50' : 'border-white/20'} rounded-2xl p-8 h-full relative overflow-hidden`}>
                  <div className={`absolute inset-0 bg-gradient-to-br ${plan.gradient} opacity-5 group-hover:opacity-10 transition-opacity duration-300`} />
                  
                  <div className="relative z-10">
                    <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                    <p className="text-gray-400 mb-6">{plan.description}</p>
                    
                    <div className="mb-8">
                      <span className="text-4xl font-bold text-white">${plan.price}</span>
                      <span className="text-gray-400">/month</span>
                    </div>
                    
                    <ul className="space-y-3 mb-8">
                      {plan.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-start space-x-3">
                          <Check className="text-green-400 mt-0.5 flex-shrink-0" size={16} />
                          <span className="text-gray-300 text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    
                    <motion.button
                      {...buttonPress}
                      onClick={() => setShowDemoModal(true)}
                      className={`w-full py-3 rounded-xl font-semibold transition-colors ${
                        plan.popular
                          ? 'bg-gradient-to-r from-purple-500 to-pink-600 text-white shadow-lg'
                          : 'bg-white/10 border border-white/20 text-white hover:bg-white/20'
                      }`}
                    >
                      Start Free Trial
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-gradient-to-r from-blue-500/10 to-purple-500/10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-white mb-6">
              Ready to Transform Your Collision Shop?
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Join hundreds of successful shops already using our platform to increase revenue and streamline operations.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                {...buttonPress}
                onClick={() => setShowDemoModal(true)}
                className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-2xl flex items-center justify-center space-x-2"
              >
                <Play size={20} />
                <span>Get Your Free Demo</span>
              </motion.button>
              
              <motion.button
                {...buttonPress}
                className="bg-white/10 backdrop-blur-xl border border-white/20 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-white/20 transition-colors"
              >
                Talk to Sales
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Demo Request Modal */}
      <AnimatePresence>
        {showDemoModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowDemoModal(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 50 }}
              className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-8 max-w-md w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-white">Request Demo</h3>
                <motion.button
                  {...buttonPress}
                  onClick={() => setShowDemoModal(false)}
                  className="text-gray-400 hover:text-white"
                >
                  <X size={24} />
                </motion.button>
              </div>
              
              <form onSubmit={handleDemoRequest} className="space-y-4">
                <input
                  type="text"
                  placeholder="Your Name"
                  value={demoForm.name}
                  onChange={(e) => setDemoForm({...demoForm, name: e.target.value})}
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-blue-400 focus:outline-none"
                  required
                />
                
                <input
                  type="email"
                  placeholder="Email Address"
                  value={demoForm.email}
                  onChange={(e) => setDemoForm({...demoForm, email: e.target.value})}
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-blue-400 focus:outline-none"
                  required
                />
                
                <input
                  type="tel"
                  placeholder="Phone Number"
                  value={demoForm.phone}
                  onChange={(e) => setDemoForm({...demoForm, phone: e.target.value})}
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-blue-400 focus:outline-none"
                  required
                />
                
                <input
                  type="text"
                  placeholder="Shop Name"
                  value={demoForm.shopName}
                  onChange={(e) => setDemoForm({...demoForm, shopName: e.target.value})}
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-blue-400 focus:outline-none"
                  required
                />
                
                <select
                  value={demoForm.currentVolume}
                  onChange={(e) => setDemoForm({...demoForm, currentVolume: e.target.value})}
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white focus:border-blue-400 focus:outline-none"
                  required
                >
                  <option value="" className="bg-gray-800">Monthly Job Volume</option>
                  <option value="1-25" className="bg-gray-800">1-25 jobs</option>
                  <option value="26-50" className="bg-gray-800">26-50 jobs</option>
                  <option value="51-100" className="bg-gray-800">51-100 jobs</option>
                  <option value="100+" className="bg-gray-800">100+ jobs</option>
                </select>
                
                <motion.button
                  {...buttonPress}
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 rounded-lg font-semibold shadow-lg"
                >
                  Schedule My Demo
                </motion.button>
              </form>
              
              <p className="text-gray-400 text-sm text-center mt-4">
                We'll contact you within 24 hours to schedule your personalized demo.
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default Landing
