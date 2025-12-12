import React from 'react'
import ResourceManager from './ResourceManager'
import './AvanceUsuariosManager.css'

export default function AvanceUsuariosManager() {
  return (
    <div>
      <div className="manager-title">Avance de Usuarios</div>
      <ResourceManager
        resource="avance-usuarios"
        fields={[
          { name: 'usuario_id', label: 'Usuario ID' },
          { name: 'subtema_id', label: 'Subtema ID' },
          { name: 'progreso', label: 'Progreso (%)' },
          { name: 'completado', label: 'Completado' },
        ]}
      />
    </div>
  )
}
