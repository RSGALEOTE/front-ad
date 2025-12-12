import React from 'react'
import ResourceManager from './ResourceManager'
import './EjemplosManager.css'

export default function EjemplosManager() {
  return (
    <div>
      <div className="manager-title">Gestión de Ejemplos</div>
      <ResourceManager
        resource="ejemplos"
        fields={[
          { name: 'titulo', label: 'Título' },
          { name: 'contenido', label: 'Contenido' },
          { name: 'tipo', label: 'Tipo' },
          { name: 'subtema_id', label: 'Subtema ID' },
        ]}
      />
    </div>
  )
}
