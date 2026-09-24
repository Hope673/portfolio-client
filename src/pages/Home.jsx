import { Link } from 'react-router-dom'
import profile from '../assets/profile.jpg'
import { useState } from 'react'

export default function Home() {

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
      const res = await fetch(`${import.meta.env.VITE_API_URL}/contact`, {
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
  const skills = [
    "React", "JavaScript", "Tailwind CSS", "Express.js",
    "Node.js", "MongoDB", "Git & GitHub", "REST APIs"
  ]

  return (
    <>
    <section className="min-h-[85vh] flex flex-col md:flex-row items-center justify-between max-w-6xl mx-auto px-6 gap-12  bg-[#ebebf2]">
      

      <div className="flex-1 text-center md:text-left mt-5">
        <p className="text-blue-600 font-medium mb-2">Hi, my name is</p>
        <h1 className="text-5xl font-bold text-black mb-2">Adeyemi</h1>
        <h2 className="text-2xl font-semibold text-gray-600 mb-6">
          Full-Stack Developer
        </h2>
        <p className="max-w-md text-gray-500 mb-8 mx-auto md:mx-0">
          I build clean, functional web applications using React, Express, and MongoDB <abbr title='MERN stack developer'>(MERN)</abbr>.
          Passionate about crafting user-friendly interfaces and solid backend systems.
        </p>
        <div className="flex gap-4 justify-center md:justify-start">
          <Link
            to="/projects"
            className="px-6 py-3 bg-[#324580] text-white rounded-lg hover:bg-[#3439c8] transition"
          >
            View Projects
          </Link>
          <Link
            to="/contact"
            className="px-6 py-3 border border-black text-black rounded-lg hover:bg-[#332e2e] hover:text-white transition"
          >
            Contact Me
          </Link>
        </div>
      </div>


      <div className="flex-1 flex justify-center">
        <div className="w-82 h-82 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-blue-600 shadow-lg">
          <img
            src={profile}
            alt="Adeyemi's Image"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

    </section>
    <section className="max-w-4xl mx-auto px-6 py-20  bg-red" id='about'>
      <h1 className="text-4xl font-bold text-black mb-2">About Me</h1>
      <div className="w-16 h-1 bg-blue-600 mb-8"></div>

      <p className="text-gray-600 leading-relaxed mb-6">
        I'm a full-stack developer focused on building clean, functional, and
        user-friendly web applications. I enjoy working across the stack —
        from designing intuitive interfaces to building solid backend systems
        that power them.
      </p>

      <p className="text-gray-600 leading-relaxed mb-12">
        I'm currently sharpening my skills in the MERN stack (MongoDB, Express,
        React, Node.js), with a strong focus on writing clean code and creating
        smooth, well-structured user experiences.
      </p>

      <h2 className="text-2xl font-semibold text-black mb-6">Skills</h2>
      <div className="flex flex-wrap gap-3">
        {skills.map((skill) => (
          <span
            key={skill}
            className="px-4 py-2 border border-black rounded-lg text-sm font-medium text-black hover:bg-[#324580] hover:text-white hover:border-[#324580] transition"
          >
            {skill}
          </span>
        ))}
      </div>
    </section>

    <section className="max-w-3xl mx-auto px-6 py-20" id='contact'>
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
    </>
  )
}
