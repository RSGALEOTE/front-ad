import React, { useState } from 'react'
import './Login.css'
import './AdminDashboard.css'
import { useAuth } from './auth/useAuth'
import MateriasManager from './components/MateriasManager'
import TemasManager from './components/TemasManager'
import SubtemasManager from './components/SubtemasManager'
import ContenidosManager from './components/ContenidosManager'
import EjemplosManager from './components/EjemplosManager'
import EjerciciosManager from './components/EjerciciosManager'
import UsuariosManager from './components/UsuariosManager'
import AvanceUsuariosManager from './components/AvanceUsuariosManager'

const RESOURCES = [
  { key: 'materias', label: 'Materias', Component: MateriasManager },
  { key: 'temas', label: 'Temas', Component: TemasManager },
  { key: 'subtemas', label: 'Subtemas', Component: SubtemasManager },
  { key: 'contenidos', label: 'Contenidos', Component: ContenidosManager },
  { key: 'ejemplos', label: 'Ejemplos', Component: EjemplosManager },
  { key: 'ejercicios', label: 'Ejercicios', Component: EjerciciosManager },
  { key: 'usuarios', label: 'Usuarios', Component: UsuariosManager },
  { key: 'avance-usuarios', label: 'Avance Usuarios', Component: AvanceUsuariosManager },
]

export default function AdminDashboard({ onLogout }) {
  const auth = useAuth()
  const [active, setActive] = useState(RESOURCES[0].key)
  const [collapsed, setCollapsed] = useState(false)

  function toggleSidebar() {
    setCollapsed((c) => !c)
  }

  return (
    <div className="app-shell">
      <aside className={`sidebar ${collapsed ? 'collapsed' : ''}`}>
        <div className="brand">
          <div className="logo-mini">CL</div>
          {!collapsed && <div style={{ fontWeight: 700 }}>CodeLearn Admin</div>}
        </div>

        <div className="nav">
          {RESOURCES.map((r) => (
            <div
              key={r.key}
              className={`nav-item ${active === r.key ? 'active' : ''}`}
              onClick={() => setActive(r.key)}
            >
              <span className="icon" aria-hidden>
                {getIconFor(r.key)}
              </span>
              {!collapsed && <span className="label">{r.label}</span>}
            </div>
          ))}
        </div>

        <div style={{ marginTop: 'auto' }}>
          <button className="nav-item" onClick={() => { if (auth.user) auth.logout(); else onLogout(); }}>
            <span className="icon">{logoutIcon()}</span>
            {!collapsed && <span className="label">Cerrar sesión</span>}
          </button>
          <div style={{ height: 8 }} />
          <button className="toggle-btn" onClick={toggleSidebar} title="Contraer barra">
            {collapsed ? '▶' : '◀'}
          </button>
        </div>
      </aside>

      <main className="main-area">
        <div className="header">
          <h1 style={{ margin: 0 }}>Administrador — Dashboard</h1>
          <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
            {auth.user && <div style={{ color: '#374151' }}>Hola, {auth.user.name}</div>}
            <button onClick={() => { if (auth.user) auth.logout(); else onLogout(); }} className="btn">Salir</button>
          </div>
        </div>

        <div style={{ display: 'flex', gap: 12 }}>
          <div style={{ flex: 1 }}>
            {RESOURCES.map((r) => {
              const Comp = r.Component
              return (
                <div key={r.key} style={{ display: active === r.key ? 'block' : 'none' }} className="content-card">
                  <Comp />
                </div>
              )
            })}
          </div>
        </div>
      </main>
    </div>
  )
}

function getIconFor(key) {
  // simple inline SVG icons
  switch (key) {
    case 'materias':
      return (
        <svg viewBox="0 0 24 24" fill="none" width="20" height="20" xmlns="http://www.w3.org/2000/svg"><path d="M3 5h18v14H3z" stroke="#ffffff" strokeWidth="1.2" fill="none"/></svg>
      )
    case 'temas':
      return (
        <svg viewBox="0 0 24 24" width="20" height="20" xmlns="http://www.w3.org/2000/svg"><path d="M4 6h16M4 12h16M4 18h16" stroke="#ffffff" strokeWidth="1.6" strokeLinecap="round"/></svg>
      )
    case 'subtemas':
      return (
        <svg viewBox="0 0 24 24" width="20" height="20" xmlns="http://www.w3.org/2000/svg"><circle cx="6" cy="6" r="2" fill="#fff"/><circle cx="12" cy="12" r="2" fill="#fff"/><circle cx="18" cy="18" r="2" fill="#fff"/></svg>
      )
    case 'contenidos':
      return (
        <svg viewBox="0 0 24 24" width="20" height="20" xmlns="http://www.w3.org/2000/svg"><path d="M4 6h16v12H4z" stroke="#fff" strokeWidth="1.2" fill="none"/></svg>
      )
    case 'ejemplos':
      return (
        <svg viewBox="0 0 24 24" width="20" height="20" xmlns="http://www.w3.org/2000/svg"><path d="M12 2l7 7-7 7-7-7 7-7z" stroke="#fff" strokeWidth="1" fill="none"/></svg>
      )
    case 'ejercicios':
      return (
        <svg viewBox="0 0 24 24" width="20" height="20" xmlns="http://www.w3.org/2000/svg"><path d="M12 2v20M2 12h20" stroke="#fff" strokeWidth="1.2"/></svg>
      )
    case 'usuarios':
      return (
        <svg viewBox="0 0 24 24" width="20" height="20" xmlns="http://www.w3.org/2000/svg"><path d="M12 12a4 4 0 100-8 4 4 0 000 8zM4 20a8 8 0 0116 0" stroke="#fff" strokeWidth="1.2" fill="none"/></svg>
      )
    case 'avance-usuarios':
      return (
        <svg viewBox="0 0 24 24" width="20" height="20" xmlns="http://www.w3.org/2000/svg"><path d="M4 12h4l2 6 6-12 2 6" stroke="#fff" strokeWidth="1.2" fill="none"/></svg>
      )
    default:
      return (
        <svg viewBox="0 0 24 24" width="20" height="20" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="10" stroke="#fff" strokeWidth="1" fill="none"/></svg>
      )
  }
}

function logoutIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M16 17l5-5-5-5" stroke="#fff" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/><path d="M21 12H9" stroke="#fff" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>
  )
}
