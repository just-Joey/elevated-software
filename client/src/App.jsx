import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { useClient } from './context/ClientContext'

function App() {
  const client = useClient()

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold">
        {client.business.name}
      </h1>
      <p className="text-gray-500">{client.business.serviceArea}</p>
    </div>
  )
}

export default App