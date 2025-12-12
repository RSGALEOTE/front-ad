import React, { useEffect, useState } from 'react'
import './ResourceManager.css'
import { useAuth } from '../auth/useAuth'

// Generic manager for a REST resource exposed at /api/{resource}
// Props:
// - resource: string (e.g. 'materias')
// - fields: array of {name,label} to show in table
export default function ResourceManager({ resource, fields }) {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [newData, setNewData] = useState({})
  const [editingId, setEditingId] = useState(null)
  const [editData, setEditData] = useState({})
  const auth = useAuth()

  const baseUrl = 'http://127.0.0.1:8000/api/' + resource

  useEffect(() => {
    fetchItems()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resource])

  async function fetchItems() {
    setLoading(true)
    setError('')
    try {
      const headers = {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      }
      
      if (auth.token) {
        headers['Authorization'] = `Bearer ${auth.token}`
      }
      
      const res = await fetch(baseUrl, { headers })
      if (res.status === 401) {
        auth.logout()
        throw new Error('No autorizado')
      }
      if (!res.ok) throw new Error('Error al obtener datos')
      const data = await res.json()
      setItems(Array.isArray(data) ? data : data.data || [])
    } catch (err) {
      setError(err.message || 'Error')
    } finally {
      setLoading(false)
    }
  }

  async function handleDelete(id) {
    if (!confirm('¿Eliminar registro?')) return
    try {
      const headers = {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      }
      
      if (auth.token) {
        headers['Authorization'] = `Bearer ${auth.token}`
      }
      
      const res = await fetch(baseUrl + '/' + id, { method: 'DELETE', headers })
      if (res.status === 401) {
        auth.logout()
        throw new Error('No autorizado')
      }
      if (!res.ok) throw new Error('Error al eliminar')
      await fetchItems()
    } catch (err) {
      alert(err.message || 'Error')
    }
  }

  async function handleCreate(e) {
    e.preventDefault()
    try {
      const headers = {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      }
      
      if (auth.token) {
        headers['Authorization'] = `Bearer ${auth.token}`
      }
      
      const res = await fetch(baseUrl, {
        method: 'POST',
        headers,
        body: JSON.stringify(newData),
      })
      if (!res.ok) {
        const txt = await res.text()
        throw new Error(txt || 'Error al crear')
      }
      setNewData({})
      await fetchItems()
    } catch (err) {
      alert(err.message || 'Error')
    }
  }

  function handleChange(e, field) {
    setNewData((s) => ({ ...s, [field]: e.target.value }))
  }

  function handleEditChange(e, field) {
    setEditData((s) => ({ ...s, [field]: e.target.value }))
  }

  function startEdit(item) {
    setEditingId(item.id)
    const data = {}
    fields.forEach(f => {
      data[f.name] = item[f.name] || ''
    })
    setEditData(data)
  }

  function cancelEdit() {
    setEditingId(null)
    setEditData({})
  }

  async function handleUpdate(id) {
    try {
      const headers = {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      }
      
      if (auth.token) {
        headers['Authorization'] = `Bearer ${auth.token}`
      }
      
      const res = await fetch(baseUrl + '/' + id, {
        method: 'PUT',
        headers,
        body: JSON.stringify(editData),
      })
      if (res.status === 401) {
        auth.logout()
        throw new Error('No autorizado')
      }
      if (!res.ok) {
        const txt = await res.text()
        throw new Error(txt || 'Error al actualizar')
      }
      setEditingId(null)
      setEditData({})
      await fetchItems()
    } catch (err) {
      alert(err.message || 'Error')
    }
  }

  return (
    <div style={{ marginTop: 12 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h3 style={{ margin: 0, textTransform: 'capitalize' }}>{resource}</h3>
        <small style={{ color: '#6b7280' }}>{items.length} registros</small>
      </div>

      <div style={{ marginTop: 10 }}>
        <form onSubmit={handleCreate} style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {fields.map((f) => (
            <input
              key={f.name}
              placeholder={f.label}
              value={newData[f.name] || ''}
              onChange={(e) => handleChange(e, f.name)}
              style={{ padding: '8px 10px', borderRadius: 8, border: '1px solid #e6edf3' }}
            />
          ))}
          <button className="btn primary" type="submit">Crear</button>
        </form>
      </div>

      {loading ? (
        <p>Cargando...</p>
      ) : error ? (
        <p style={{ color: 'crimson' }}>{error}</p>
      ) : (
        <table style={{ width: '100%', marginTop: 12, borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={{ textAlign: 'left', padding: '8px 6px' }}>ID</th>
              {fields.map((f) => (
                <th key={f.name} style={{ textAlign: 'left', padding: '8px 6px' }}>{f.label}</th>
              ))}
              <th style={{ padding: 8 }}>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {items.map((it) => (
              <tr key={it.id} style={{ borderTop: '1px solid #eef2f6' }}>
                <td style={{ padding: '8px 6px' }}>{it.id}</td>
                {editingId === it.id ? (
                  <>
                    {fields.map((f) => (
                      <td key={f.name} style={{ padding: '8px 6px' }}>
                        <input
                          value={editData[f.name] || ''}
                          onChange={(e) => handleEditChange(e, f.name)}
                          style={{ padding: '6px 8px', borderRadius: 6, border: '1px solid #e6edf3', width: '100%' }}
                        />
                      </td>
                    ))}
                    <td style={{ padding: 8, display: 'flex', gap: 6 }}>
                      <button onClick={() => handleUpdate(it.id)} className="btn primary" style={{ fontSize: 13 }}>
                        Guardar
                      </button>
                      <button onClick={cancelEdit} className="btn" style={{ fontSize: 13, background: '#f3f4f6' }}>
                        Cancelar
                      </button>
                    </td>
                  </>
                ) : (
                  <>
                    {fields.map((f) => (
                      <td key={f.name} style={{ padding: '8px 6px' }}>{String(it[f.name] ?? '')}</td>
                    ))}
                    <td style={{ padding: 8, display: 'flex', gap: 6 }}>
                      <button onClick={() => startEdit(it)} className="btn" style={{ background: '#dbeafe', borderRadius: 8, fontSize: 13 }}>
                        Editar
                      </button>
                      <button onClick={() => handleDelete(it.id)} className="btn" style={{ background: '#fee2e2', borderRadius: 8, fontSize: 13 }}>
                        Eliminar
                      </button>
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}
