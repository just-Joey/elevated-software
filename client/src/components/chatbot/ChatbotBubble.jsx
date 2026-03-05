import { useChatbot } from '../../hooks/useChatbot'
import { useClient } from '../../context/ClientContext'
import ChatWindow from './ChatWindow'

function ChatbotBubble() {
  const { isOpen, toggleChat, messages, isLoading, showLeadCapture, sendMessage, submitLead } = useChatbot()
  const client = useClient()

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-4">
      {isOpen && (
        <ChatWindow
          messages={messages}
          isLoading={isLoading}
          showLeadCapture={showLeadCapture}
          onSendMessage={sendMessage}
          onSubmitLead={submitLead}
          onClose={toggleChat}
        />
      )}

      {/* Bubble button */}
      <button
        onClick={toggleChat}
        className="w-16 h-16 rounded-full shadow-lg flex items-center justify-center text-white text-2xl transition-transform hover:scale-110"
        style={{ backgroundColor: client.brand.primaryColor }}
      >
        {isOpen ? '✕' : '💬'}
      </button>
    </div>
  )
}

export default ChatbotBubble