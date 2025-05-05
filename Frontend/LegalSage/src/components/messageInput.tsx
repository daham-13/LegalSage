import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Send } from "lucide-react"

interface Props {
  onSend: (message: string) => void;
}

export function MessageInput({ onSend }: Props) {
  const [message, setMessage] = useState("")

  const handleSend = () => {
    if (message.trim()) {
      onSend(message)
      setMessage("")
    }
  }

  return (
    <div className="flex gap-2 mt-4">
      <Input
        placeholder="Type your question..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleSend()}
      />
      <Button onClick={handleSend} className="bg-green-400 hover:bg-green-500 text-white">
        <Send className="w-4 h-4" />
      </Button>
    </div>
  )
}
