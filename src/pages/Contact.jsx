import { useState } from 'react'

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const [error, setError] = useState('')
const [submitting, setSubmitting] = useState(false)

const handleSubmit = async (e) => {
  e.preventDefault()
  setError('')
  setSubmitting(true)
  try {
    const res = await fetch('http://localhost:5000/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    })
    const data = await res.json()
    if (!res.ok) throw new Error(data.message || 'Failed to send message')

    setSubmitted(true)
    setFormData({ name: '', email: '', message: '' })
  } catch (err) {
    setError(err.message)
  } finally {
    setSubmitting(false)
  }
}

  return (
    <section className="max-w-3xl mx-auto px-6 py-20">
      <h1 className="text-4xl font-bold text-black mb-2">Contact</h1>
      <div className="w-16 h-1 bg-blue-600 mb-8"></div>

      <p className="text-gray-600 mb-10">
        Have a question or want to work together? Fill out the form below and
        I'll get back to you as soon as possible.
      </p>

      {submitted && (
        <div className="mb-6 px-4 py-3 bg-blue-50 text-blue-600 rounded-lg text-sm">
          Thanks for reaching out! I'll get back to you soon.
        </div>
      )}

      {error && (
      <div className="mb-6 px-4 py-3 bg-red-50 text-red-600 rounded-lg text-sm">
      {error}
      </div>
      )}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-black mb-2">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600"
            placeholder="Your name"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-black mb-2">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600"
            placeholder="you@example.com"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-black mb-2">Message</label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            rows={5}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600 resize-none"
            placeholder="Your message..."
          />
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="px-6 py-3 bg-[#324580] text-white rounded-lg hover:bg-blue-500 transition disabled:opacity-50"
        >
          {submitting ? 'Sending...' : 'Send Message'}
        </button>
      </form>
    </section>
  )
}