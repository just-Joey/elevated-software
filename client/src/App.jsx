import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { useClient } from './context/ClientContext'
import ChatBotBubble from './components/chatbot/ChatBotBubble'

function App() {
  const client = useClient()

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-3xl font-bold">{client.business.name}</h1>
      <p className="mt-2 text-gray-600">{client.business.serviceArea}</p>
      <ChatBotBubble />

    </div>
  )
}

export default App