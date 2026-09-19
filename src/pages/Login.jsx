import { useState, useEffect, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Login() {
  const { login } = useAuth()
  const navigate = useNavigate()

  const userRef = useRef()
  const errRef = useRef()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    userRef.current.focus()
  }, [])

  useEffect(() => {
    setError('')
  }, [password, email])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setSubmitting(true)
    try {
      await login(email, password) // context sends { email, pwd } and updates user/accessToken
      setEmail('')
      setPassword('')
      navigate('/dashboard')
    } catch (err) {
      setError(err.message || 'Login Failed')
      errRef.current?.focus()
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <section className="min-h-[80vh] flex items-center justify-center px-6">
      <div className="w-full max-w-md">
        <h1 className="text-3xl font-bold text-black mb-2 text-center">Welcome Back</h1>
        <p className="text-gray-500 text-center mb-8">Log in to your account</p>

        {error && (
          <div className="mb-6 px-4 py-3 bg-red-50 text-red-600 rounded-lg text-sm" ref={errRef} aria-live="assertive">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6 border border-gray-200 rounded-xl p-8">
          <div>
            <label className="block text-sm font-medium text-black mb-2" htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              ref={userRef}
              autoComplete="off"
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-black mb-2" htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
          >
            {submitting ? 'Logging in...' : 'Log In'}
          </button>

          <p className="text-sm text-gray-500 text-center">
            Don't have an account?{' '}
            <Link to="/register" className="text-blue-600 font-medium hover:underline">
              Sign Up
            </Link>
          </p>
        </form>
      </div>
    </section>
  )
}