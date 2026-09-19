import { useState, useEffect, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const USER_REGEX = /^[A-Za-z][A-Za-z0-9-_]{3,23}$/
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/

export default function Register() {
  const { register } = useAuth()
  const navigate = useNavigate()

  const userRef = useRef()
  const errRef = useRef()

  const [username, setUsername] = useState('')
  const [validName, setValidName] = useState(false)

  const [password, setPassword] = useState('')
  const [validPwd, setValidPwd] = useState(false)
  const [pwdFocus, setPwdFocus] = useState(false)

  const [email, setEmail] = useState('')

  const [errorMsg, setErrorMsg] = useState('')
  const [successMsg, setSuccessMsg] = useState('')
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    userRef.current.focus()
  }, [])

  useEffect(() => {
    setValidName(USER_REGEX.test(username))
  }, [username])

  useEffect(() => {
    setValidPwd(PWD_REGEX.test(password))
  }, [password])

  useEffect(() => {
    setErrorMsg('')
  }, [username, password, email])

  const handleSubmit = async (e) => {
    e.preventDefault()
    const v1 = USER_REGEX.test(username)
    const v2 = PWD_REGEX.test(password)
    if (!v1 || !v2) {
      setErrorMsg('Invalid Entry')
      return
    }

    setSubmitting(true)
    try {
      await register(username, email, password)
      setSuccessMsg('Account created! Redirecting to login...')
      setUsername('')
      setPassword('')
      setEmail('')
      setTimeout(() => navigate('/login'), 1500)
    } catch (err) {
      setErrorMsg(err.message || 'Registration Failed')
      errRef.current?.focus()
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <section className="min-h-[80vh] flex items-center justify-center px-6">
      <div className="w-full max-w-md">
        <h1 className="text-3xl font-bold text-black mb-2 text-center">Create Account</h1>
        <p className="text-gray-500 text-center mb-8">Sign up to get started</p>

        {successMsg && (
          <div className="mb-6 px-4 py-3 bg-blue-50 text-blue-600 rounded-lg text-sm">
            {successMsg}
          </div>
        )}

        {errorMsg && (
          <div className="mb-6 px-4 py-3 bg-red-50 text-red-600 rounded-lg text-sm" ref={errRef} aria-live="assertive">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6 border border-gray-200 rounded-xl p-8">
          <div>
            <label className="block text-sm font-medium text-black mb-2" htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              ref={userRef}
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600"
              placeholder="Choose a username"
              aria-describedby="uidnote"
            />
            <p id="uidnote" className={username && !validName ? 'text-xs text-red-500 mt-1' : 'hidden'}>
              4 to 24 characters. Must begin with a letter. Letters, numbers, underscores, hyphens allowed.
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-black mb-2" htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600"
              placeholder="you@example.com"
              autoComplete="off"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-black mb-2" htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              aria-describedby="pwdnote"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600"
              placeholder="••••••••"
              onFocus={() => setPwdFocus(true)}
              onBlur={() => setPwdFocus(false)}
            />
            <p id="pwdnote" className={pwdFocus && !validPwd ? 'text-xs text-red-500 mt-1' : 'hidden'}>
              8 to 24 characters. Must include uppercase and lowercase letters, a number, and a special character (! @ # $ %).
            </p>
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
          >
            {submitting ? 'Creating account...' : 'Sign Up'}
          </button>

          <p className="text-sm text-gray-500 text-center">
            Already have an account?{' '}
            <Link to="/login" className="text-blue-600 font-medium hover:underline">
              Log In
            </Link>
          </p>
        </form>
      </div>
    </section>
  )
}