import React from 'react'
import ResourceManager from './ResourceManager'
import './EjerciciosManager.css'

export default function EjerciciosManager() {
  return (
    <div>
      <div className="manager-title">Gestión de Ejercicios</div>
      <ResourceManager
        resource="ejercicios"
        fields={[
          { name: 'enunciado', label: 'Enunciado' },
          { name: 'tipo', label: 'Tipo' },
          { name: 'dificultad', label: 'Dificultad' },
          { name: 'subtema_id', label: 'Subtema ID' },
        ]}
      />
    </div>
  )
}
