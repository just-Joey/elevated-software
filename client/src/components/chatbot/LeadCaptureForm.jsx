import { useState } from 'react'
import { useClient } from '../../context/ClientContext'

function LeadCaptureForm({ onSubmit }) {
  const client = useClient()
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')

  const handleSubmit = () => {
    if (!name.trim() || !phone.trim()) return
    onSubmit({ name, phone })
  }

  return (
    <div className="flex-1 p-4 flex flex-col justify-center gap-4">
      <p className="text-sm text-gray-600 text-center">
        Want us to follow up with you directly?
      </p>

      <input
        type="text"
        placeholder="Your name"
        value={name}
        onChange={e => setName(e.target.value)}
        className="text-sm border border-gray-200 rounded-lg px-4 py-2 outline-none focus:border-gray-400"
      />
      <input
        type="tel"
        placeholder="Your phone number"
        value={phone}
        onChange={e => setPhone(e.target.value)}
        className="text-sm border border-gray-200 rounded-lg px-4 py-2 outline-none focus:border-gray-400"
      />

      <button
        onClick={handleSubmit}
        disabled={!name.trim() || !phone.trim()}
        className="w-full py-2 rounded-lg text-white text-sm font-medium disabled:opacity-50"
        style={{ backgroundColor: client.brand.primaryColor }}
      >
        Send my info
      </button>

      <p className="text-xs text-gray-400 text-center">
        We'll never spam you. Promise.
      </p>
    </div>
  )
}

export default LeadCaptureForm