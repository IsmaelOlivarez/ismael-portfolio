'use client'

import { useState } from 'react'
import { Send, CheckCircle, AlertCircle } from 'lucide-react'

interface FormData {
  name: string
  email: string
  message: string
}

interface FormStatus {
  type: 'idle' | 'loading' | 'success' | 'error'
  message: string
}

export function ContactForm() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    message: '',
  })
  
  const [status, setStatus] = useState<FormStatus>({
    type: 'idle',
    message: '',
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus({ type: 'loading', message: 'Sending message...' })

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const result = await response.json()

      if (result.ok) {
        setStatus({
          type: 'success',
          message: 'Message sent successfully! I\'ll get back to you soon.',
        })
        setFormData({ name: '', email: '', message: '' })
      } else {
        setStatus({
          type: 'error',
          message: result.error || 'Failed to send message. Please try again.',
        })
      }
    } catch (error) {
      setStatus({
        type: 'error',
        message: 'Network error. Please check your connection and try again.',
      })
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const isSubmitting = status.type === 'loading'

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Status Message */}
      {status.type !== 'idle' && (
        <div className={`p-4 rounded-lg flex items-center space-x-3 ${
          status.type === 'success' 
            ? 'bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800' 
            : status.type === 'error'
            ? 'bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800'
            : 'bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800'
        }`}>
          {status.type === 'success' ? (
            <CheckCircle className="h-5 w-5 text-green-600" />
          ) : status.type === 'error' ? (
            <AlertCircle className="h-5 w-5 text-red-600" />
          ) : (
            <div className="h-5 w-5 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          )}
          <span className={`text-sm ${
            status.type === 'success' 
              ? 'text-green-800 dark:text-green-200' 
              : status.type === 'error'
              ? 'text-red-800 dark:text-red-200'
              : 'text-blue-800 dark:text-blue-200'
          }`}>
            {status.message}
          </span>
        </div>
      )}

      {/* Name Field */}
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-primary mb-2">
          Name *
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          minLength={2}
          maxLength={80}
          className="w-full px-4 py-3 border border-primary/20 rounded-2xl bg-white dark:bg-primary/5 text-primary placeholder-primary/40 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-colors"
          placeholder="Your name"
          disabled={isSubmitting}
        />
      </div>

      {/* Email Field */}
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-primary mb-2">
          Email *
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full px-4 py-3 border border-primary/20 rounded-2xl bg-white dark:bg-primary/5 text-primary placeholder-primary/40 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-colors"
          placeholder="your.email@example.com"
          disabled={isSubmitting}
        />
      </div>

      {/* Message Field */}
      <div>
        <label htmlFor="message" className="block text-sm font-medium text-primary mb-2">
          Message *
        </label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          required
          minLength={10}
          maxLength={2000}
          rows={6}
          className="w-full px-4 py-3 border border-primary/20 rounded-2xl bg-white dark:bg-primary/5 text-primary placeholder-primary/40 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-colors resize-vertical"
          placeholder="Tell me about your project, opportunity, or just say hello..."
          disabled={isSubmitting}
        />
        <div className="mt-2 text-right">
          <span className="text-xs text-primary/60">
            {formData.message.length}/2000
          </span>
        </div>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
      >
        {isSubmitting ? (
          <>
            <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
            Sending...
          </>
        ) : (
          <>
            <Send className="mr-2 h-5 w-5" />
            Send Message
          </>
        )}
      </button>
    </form>
  )
}
