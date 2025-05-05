import { useState } from "react"
import { MessagePane } from "@/components/messagePane"
import { MessageInput } from "@/components/messageInput"

export function MessagePage() {
  const [messages, setMessages] = useState<{ role: "user" | "assistant"; content: string }[]>([])

  const handleSend = async (message: string) => {
    setMessages([...messages, { role: "user", content: message }])
  
    try {
      const res = await fetch("http://localhost:8000/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: message }),
      })
      const data = await res.json()
  
      setMessages(prev => [...prev, { role: "assistant", content: data.answer }])
    } catch (err) {
      console.error("Error fetching answer:", err)
      setMessages(prev => [...prev, { role: "assistant", content: "⚠️ Error getting answer." }])
    }
  }

  return (
    <div className="flex flex-col h-full">
      <MessagePane messages={messages} />
      <MessageInput onSend={handleSend} />
    </div>
  )
}
