import React from 'react'
import ResourceManager from './ResourceManager'
import './MateriasManager.css'

export default function MateriasManager() {
  return (
    <div>
      <div className="manager-title">Gestión de Materias</div>
      <ResourceManager
        resource="materias"
        fields={[
          { name: 'nombre', label: 'Nombre' },
          { name: 'descripcion', label: 'Descripción' },
        ]}
      />
    </div>
  )
}
