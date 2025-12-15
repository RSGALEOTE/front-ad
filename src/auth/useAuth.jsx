import React, { createContext, useContext, useEffect, useState } from 'react'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [token, setToken] = useState(localStorage.getItem('auth_token'))

  async function fetchMe() {
    try {
      if (!token) {
        setUser(null)
        return null
      }
      
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/me`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        }
      })
      if (!res.ok) {
        setUser(null)
        setToken(null)
        localStorage.removeItem('auth_token')
        return null
      }
      const data = await res.json()
      setUser(data)
      return data
    } catch (e) {
      setUser(null)
      setToken(null)
      localStorage.removeItem('auth_token')
      return null
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchMe()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token])

  async function login(email, password) {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/login`, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    })
    if (!res.ok) {
      const data = await res.json().catch(() => null)
      throw new Error((data && (data.message || data.error)) || 'Login failed')
    }
    const data = await res.json()
    const accessToken = data.access_token || data.token
    
    if (!accessToken) {
      throw new Error('No se recibió token del servidor')
    }
    
    localStorage.setItem('auth_token', accessToken)
    setToken(accessToken)
    
    return true
  }

  async function logout() {
    try {
      if (token) {
        await fetch(`${import.meta.env.VITE_API_URL}/api/logout`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          }
        })
      }
    } catch (e) {
      // ignore
    }
    setUser(null)
    setToken(null)
    localStorage.removeItem('auth_token')
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, token }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}
