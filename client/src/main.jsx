import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ClientProvider } from './context/ClientContext.jsx'
import testClient from './config/testClient.js'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ClientProvider client={testClient}>
      <App />
    </ClientProvider>
  </StrictMode>,
)
