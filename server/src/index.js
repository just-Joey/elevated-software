
const express = require('express')
const cors = require('cors')
require('dotenv').config()

const app = express()
const PORT = process.env.PORT || 5000

app.use(cors())
app.use(express.json())

const chatRoute = require('./routes/chat')
app.use('/api/chat', chatRoute)

app.get('/', (req, res) => {
  res.json({ message: 'Server is running' })
})

const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
  console.log('Server object:', server.listening)
})

server.on('error', (err) => {
  console.error('Server error:', err)
})

server.on('close', () => {
  console.log('Server closed!')
})

process.on('exit', (code) => {
  console.log('Process exiting with code:', code)
})

process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err)
})

process.on('unhandledRejection', (reason) => {
  console.error('Unhandled Rejection:', reason)
})
