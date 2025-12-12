import React from 'react'
import ResourceManager from './ResourceManager'
import './TemasManager.css'

export default function TemasManager() {
  return (
    <div>
      <div className="manager-title">Gestión de Temas</div>
      <ResourceManager
        resource="temas"
        fields={[
          { name: 'titulo', label: 'Título' },
          { name: 'materia_id', label: 'Materia ID' },
        ]}
      />
    </div>
  )
}
