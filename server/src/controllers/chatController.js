const { getChatResponse } = require('../services/claudeService')

async function handleChat(req, res) {
  console.log('Chat request received:', req.body)
  try {
    const { messages, systemPrompt } = req.body

    if (!messages || !systemPrompt) {
      return res.status(400).json({ error: 'Missing messages or systemPrompt' })
    }

    const reply = await getChatResponse(messages, systemPrompt)
    res.json({ reply })

  } catch (error) {
    console.error('Chat error:', error)
    res.status(500).json({ error: 'Something went wrong' })
  }
}

module.exports = { handleChat }