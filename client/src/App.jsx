import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { useClient } from './context/ClientContext'
import ChatBotBubble from './components/chatbot/ChatBotBubble'
import LandingPage from './LandingPage'   

function App() {
  return <LandingPage />
}

export default App