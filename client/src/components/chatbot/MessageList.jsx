import { useEffect, useRef } from 'react'
import { useClient } from '../../context/ClientContext'

function MessageList({ messages, isLoading, welcomeMessage }) {
  const client = useClient()
  const bottomRef = useRef(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isLoading])

  return (
    <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-3">
      {/* Welcome message */}
      <div className="flex items-start gap-2">
        <div
          className="rounded-2xl rounded-tl-none p-3 text-white text-sm max-w-[80%]"
          style={{ backgroundColor: client.brand.primaryColor }}
        >
          {welcomeMessage}
        </div>
      </div>

      {/* Conversation */}
      {messages.map((msg, i) => (
        <div
          key={i}
          className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
        >
          <div
            className={`rounded-2xl p-3 text-sm max-w-[80%] ${
              msg.role === 'user'
                ? 'bg-gray-100 text-gray-800 rounded-tr-none'
                : 'text-white rounded-tl-none'
            }`}
            style={msg.role === 'assistant' ? { backgroundColor: client.brand.primaryColor } : {}}
          >
            {msg.content}
          </div>
        </div>
      ))}

      {/* Loading indicator */}
      {isLoading && (
        <div className="flex justify-start">
          <div
            className="rounded-2xl rounded-tl-none p-3 text-white text-sm"
            style={{ backgroundColor: client.brand.primaryColor }}
          >
            <span className="animate-pulse">Typing...</span>
          </div>
        </div>
      )}

      <div ref={bottomRef} />
    </div>
  )
}

export default MessageList