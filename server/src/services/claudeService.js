const Anthropic = require('@anthropic-ai/sdk')

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
})

async function getChatResponse(messages, systemPrompt) {
  const response = await anthropic.messages.create({
    model: 'claude-sonnet-4-6',
    max_tokens: 1024,
    system: systemPrompt,
    messages: messages,
  })

  return response.content[0].text
}

module.exports = { getChatResponse }