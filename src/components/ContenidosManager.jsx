import React from 'react'
import ResourceManager from './ResourceManager'
import './ContenidosManager.css'

export default function ContenidosManager() {
  return (
    <div>
      <div className="manager-title">Gestión de Contenidos</div>
      <ResourceManager
        resource="contenidos"
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
