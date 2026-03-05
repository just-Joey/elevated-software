import { useClient } from '../../context/ClientContext'
import MessageList from './MessageList'
import MessageInput from './MessageInput'
import LeadCaptureForm from './LeadCaptureForm'

function ChatWindow({ messages, isLoading, showLeadCapture, onSendMessage, onSubmitLead, onClose }) {
  const client = useClient()

  return (
    <div className="w-80 h-96 bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden">
      {/* Header */}
      <div
        className="p-4 flex items-center justify-between"
        style={{ backgroundColor: client.brand.primaryColor }}
      >
        <div>
          <p className="text-white font-semibold text-sm">{client.business.name}</p>
          <p className="text-white text-xs opacity-80">We typically reply instantly</p>
        </div>
        <button
          onClick={onClose}
          className="text-white opacity-70 hover:opacity-100 text-lg"
        >
          ✕
        </button>
      </div>

      {/* Messages or Lead Capture */}
      <div className="flex-1 overflow-hidden flex flex-col">
        {showLeadCapture ? (
          <LeadCaptureForm onSubmit={onSubmitLead} />
        ) : (
          <>
            <MessageList
              messages={messages}
              isLoading={isLoading}
              welcomeMessage={client.chatbot.welcomeMessage}
            />
            <MessageInput onSend={onSendMessage} isLoading={isLoading} />
          </>
        )}
      </div>
    </div>
  )
}

export default ChatWindow