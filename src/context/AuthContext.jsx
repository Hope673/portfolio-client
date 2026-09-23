import { createContext, useState, useEffect, useContext } from 'react'

const AuthContext = createContext()
// const API_URL = import.meta.env.VITE_API_URL
const API_URL = 'http://localhost:5000'

function decodeToken(token) {
  try {
    const payload = token.split('.')[1]
    return JSON.parse(atob(payload))
  } catch {
    return null
  }
}

export function AuthProvider({ children }) {
  const [accessToken, setAccessToken] = useState(localStorage.getItem('accessToken') || null)
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  // On app load, check if a token is saved and still valid (not expired)
  useEffect(() => {
    const token = localStorage.getItem('accessToken')
    if (token) {
      const decoded = decodeToken(token)
      const isExpired = decoded?.exp && decoded.exp * 1000 < Date.now()
      if (decoded && !isExpired) {
        setAccessToken(token)
        setUser(decoded)
      } else {
        localStorage.removeItem('accessToken')
      }
    }
    setLoading(false)
  }, [])

  const register = async (username, email, pwd) => {
    const res = await fetch(`${API_URL}/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ user: username, email, pwd }),
    })
    const data = await res.json()
    if (!res.ok) throw new Error(data.message || 'Registration failed')
    return data
  }

  const login = async (email, pwd) => {
    const res = await fetch(`${API_URL}/auth`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, pwd }),
    })
    const data = await res.json()
    if (!res.ok) throw new Error(data.message || 'Login failed')

    localStorage.setItem('accessToken', data.accessToken)
    setAccessToken(data.accessToken)
    setUser(decodeToken(data.accessToken))
    return data
  }

  const logout = () => {
    localStorage.removeItem('accessToken')
    setAccessToken(null)
    setUser(null)
  }

  // Wrapper for any future protected endpoint
  const authFetch = async (url, options = {}) => {
    return fetch(url, {
      ...options,
      headers: { ...options.headers, Authorization: `Bearer ${accessToken}` },
    })
  }

  return (
    <AuthContext.Provider value={{ user, accessToken, loading, register, login, logout, authFetch }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}