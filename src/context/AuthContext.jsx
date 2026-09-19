import { createContext, useState, useEffect, useContext } from 'react'

const AuthContext = createContext()
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
  const [accessToken, setAccessToken] = useState(null)
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)


  useEffect(() => {
    const tryRefresh = async () => {
      try {
        const res = await fetch(`${API_URL}/refresh`, {
          credentials: 'include',
        })
        if (res.ok) {
          const data = await res.json()
          setAccessToken(data.accessToken)
          setUser(decodeToken(data.accessToken))
        }
      } catch {
        //catch
      } finally {
        setLoading(false)
      }
    }
    tryRefresh()
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
      credentials: 'include', 
      body: JSON.stringify({ email, pwd }),
    })
    const data = await res.json()
    if (!res.ok) throw new Error(data.message || 'Login failed')
    setAccessToken(data.accessToken)
    setUser(decodeToken(data.accessToken))
    return data
  }

  const logout = async () => {
    try {
      await fetch(`${API_URL}/logout`, { credentials: 'include' })
    } catch {
     //catch 
    }
    setAccessToken(null)
    setUser(null)
  }

  const authFetch = async (url, options = {}) => {
    let res = await fetch(url, {
      ...options,
      headers: { ...options.headers, Authorization: `Bearer ${accessToken}` },
      credentials: 'include',
    })

    if (res.status === 401 || res.status === 403) {
      const refreshRes = await fetch(`${API_URL}/refresh`, { credentials: 'include' })
      if (refreshRes.ok) {
        const data = await refreshRes.json()
        setAccessToken(data.accessToken)
        setUser(decodeToken(data.accessToken))
        res = await fetch(url, {
          ...options,
          headers: { ...options.headers, Authorization: `Bearer ${data.accessToken}` },
          credentials: 'include',
        })
      }
    }
    return res
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