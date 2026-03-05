import { useState } from 'react'
import { useClient } from '../../context/ClientContext'

function MessageInput({ onSend, isLoading }) {
  const client = useClient()
  const [text, setText] = useState('')

  const handleSend = () => {
    if (!text.trim() || isLoading) return
    onSend(text)
    setText('')
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <div className="p-3 border-t border-gray-100 flex gap-2">
      <input
        type="text"
        value={text}
        onChange={e => setText(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Type a message..."
        disabled={isLoading}
        className="flex-1 text-sm border border-gray-200 rounded-full px-4 py-2 outline-none focus:border-gray-400 disabled:opacity-50"
      />
      <button
        onClick={handleSend}
        disabled={isLoading || !text.trim()}
        className="w-9 h-9 rounded-full flex items-center justify-center text-white disabled:opacity-50 transition-opacity"
        style={{ backgroundColor: client.brand.primaryColor }}
      >
        ➤
      </button>
    </div>
  )
}

export default MessageInput