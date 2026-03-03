import { createContext, useContext } from 'react'

const ClientContext = createContext(null)

export function ClientProvider({ client, children }) {
  return (
    <ClientContext.Provider value={client}>
      {children}
    </ClientContext.Provider>
  )
}

export function useClient() {
  const context = useContext(ClientContext)
  if (!context) throw new Error('useClient must be used within a ClientProvider')
  return context
}