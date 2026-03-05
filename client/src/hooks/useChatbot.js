import { useState } from 'react'
import { sendChatMessage } from '../services/api'
import { useClient } from '../context/ClientContext'

export function useChatbot() {
  const client = useClient()
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [showLeadCapture, setShowLeadCapture] = useState(false)
  const [leadCaptured, setLeadCaptured] = useState(false)

  const toggleChat = () => setIsOpen(prev => !prev)

  const sendMessage = async (userText) => {
    if (!userText.trim() || isLoading) return

    // Add user message to state
    const userMessage = { role: 'user', content: userText }
    const updatedMessages = [...messages, userMessage]
    setMessages(updatedMessages)
    setIsLoading(true)

    try {
      const reply = await sendChatMessage(
        updatedMessages,
        client.chatbot.systemPrompt
      )

      const assistantMessage = { role: 'assistant', content: reply }
      const finalMessages = [...updatedMessages, assistantMessage]
      setMessages(finalMessages)

      // Show lead capture after 3 exchanges if not captured yet
      if (!leadCaptured && finalMessages.length >= 6) {
        setShowLeadCapture(true)
      }

    } catch (error) {
      console.error('Chat error:', error)
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: "Sorry, I'm having trouble connecting right now. Please call us directly!"
      }])
    } finally {
      setIsLoading(false)
    }
  }

  const submitLead = async (leadData) => {
    // We'll wire this to the backend later
    console.log('Lead captured:', leadData)
    setLeadCaptured(true)
    setShowLeadCapture(false)
    setMessages(prev => [...prev, {
      role: 'assistant',
      content: `Thanks ${leadData.name}! We'll be in touch at ${leadData.phone} shortly. 😊`
    }])
  }

  return {
    isOpen,
    messages,
    isLoading,
    showLeadCapture,
    leadCaptured,
    toggleChat,
    sendMessage,
    submitLead,
  }
}