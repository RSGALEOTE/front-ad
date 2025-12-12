import React from 'react'
import ResourceManager from './ResourceManager'
import './SubtemasManager.css'

export default function SubtemasManager() {
  return (
    <div>
      <div className="manager-title">Gestión de Subtemas</div>
      <ResourceManager
        resource="subtemas"
        fields={[
          { name: 'titulo', label: 'Título' },
          { name: 'tema_id', label: 'Tema ID' },
        ]}
      />
    </div>
  )
}
