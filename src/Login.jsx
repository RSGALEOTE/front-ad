import { useState } from 'react'
import './Login.css'
import AdminDashboard from './AdminDashboard'
import { useAuth } from './auth/useAuth'

export default function Login() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const auth = useAuth()

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    try {
      await auth.login(username, password)
    } catch (err) {
      setError(err.message || 'Error de login')
    }
  }

  function handleLogout() {
    auth.logout()
    setUsername('')
    setPassword('')
    setError('')
  }

  if (auth.loading) {
    return <div style={{ padding: 24 }}>Cargando...</div>
  }

  if (auth.user) {
    return <AdminDashboard onLogout={handleLogout} />
  }

  return (
    <div id="login-root">
      <div className="brand">
        <img src="/logo.png" className="logo" alt="Logo" />
        <h1 className="title">Panel de Administración</h1>
        <p className="subtitle">Ingresa con tu cuenta</p>
      </div>

      <div className="login-card card">
        <form onSubmit={handleSubmit} className="login-form">
          <div className="field">
            <label className="field-label">Email</label>
            <input
              className="field-input"
              type="email"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="admin@example.com"
              required
            />
          </div>

          <div className="field">
            <label className="field-label">Contraseña</label>
            <input
              className="field-input"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
            />
          </div>

          {error && <div className="field-error">{error}</div>}

          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 8 }}>
            <button type="submit" className="btn primary">Entrar</button>
          </div>
        </form>
      </div>
    </div>
  )
}
