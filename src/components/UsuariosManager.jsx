import React from 'react'
import ResourceManager from './ResourceManager'
import './UsuariosManager.css'

export default function UsuariosManager() {
  return (
    <div>
      <div className="manager-title">Gestión de Usuarios</div>
      <ResourceManager
        resource="usuarios"
        fields={[
          { name: 'name', label: 'Nombre' },
          { name: 'email', label: 'Email' },
          { name: 'rol', label: 'Rol' },
        ]}
      />
    </div>
  )
}
