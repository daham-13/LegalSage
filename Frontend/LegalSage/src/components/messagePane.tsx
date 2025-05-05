import { useEffect, useState, useRef } from "react";

interface Message {
  role: "user" | "assistant";
  content: string;
  isTyping?: boolean;
}

interface Props {
  messages: Message[];
}

export function MessagePane({ messages }: Props) {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [displayMessages, setDisplayMessages] = useState<Message[]>([]);
  
  // Define animation keyframes as a string
  const pulseKeyframes = `
    @keyframes pulse {
      0%, 100% { transform: scale(1); opacity: 1; }
      50% { transform: scale(1.5); opacity: 0.5; }
    }
  `;
  
  // Dot styles with animation
  const dotBaseStyle = {
    margin: '0 1px',
    width: '4px',
    height: '4px',
    borderRadius: '50%',
    backgroundColor: 'white',
    display: 'inline-block',
    animation: 'pulse 1.5s infinite ease-in-out'
  };
  
  // Scroll to bottom whenever messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [displayMessages]);
  
  // Process messages to add typing animation
  useEffect(() => {
    // Check if there are any new messages
    if (messages.length === 0) {
      setDisplayMessages([]);
      return;
    }
    
    // Get the last message
    const lastMessage = messages[messages.length - 1];
    
    // For user messages, just display them immediately
    if (lastMessage.role === "user") {
      setDisplayMessages(messages);
      return;
    }
    
    // For assistant messages, show typing animation
    if (lastMessage.role === "assistant") {
      // Show all previous messages
      const prevMessages = messages.slice(0, -1);
      
      // Add typing indicator
      setDisplayMessages([
        ...prevMessages,
        { ...lastMessage, content: "", isTyping: true }
      ]);
      
      // Animate the typing of the last message
      let currentText = "";
      const fullText = lastMessage.content;
      let i = 0;
      
      const typingInterval = setInterval(() => {
        if (i < fullText.length) {
          currentText += fullText.charAt(i);
          i++;
          setDisplayMessages([
            ...prevMessages,
            { ...lastMessage, content: currentText, isTyping: i < fullText.length }
          ]);
        } else {
          clearInterval(typingInterval);
        }
      }, 15); // Speed of typing animation
      
      return () => clearInterval(typingInterval);
    }
  }, [messages]);
  
  // Insert keyframes animation into document head
  useEffect(() => {
    // Create a style element
    const styleElement = document.createElement('style');
    styleElement.innerHTML = pulseKeyframes;
    
    // Append to head
    document.head.appendChild(styleElement);
    
    // Clean up on unmount
    return () => {
      document.head.removeChild(styleElement);
    };
  }, []);
  
  return (
    <div className="flex flex-col gap-4 p-4 overflow-y-auto h-[500px] bg-zinc-900 dark:bg-zinc-950 rounded-lg">
      {displayMessages.map((msg, index) => (
        <div
          key={index}
          className={`p-3 max-w-[65%] shadow-lg ${
            msg.role === "user" 
              ? "bg-green-500 text-white self-end rounded-2xl rounded-br-none" 
              : "bg-zinc-800 dark:bg-zinc-700 text-white self-start rounded-2xl rounded-bl-none border-l-2 border-zinc-600"
          }`}
        >
          {msg.content}
          {msg.isTyping && (
            <span className="ml-1 inline-flex">
              <span style={dotBaseStyle}></span>
              <span style={{...dotBaseStyle, animationDelay: '0.2s'}}></span>
              <span style={{...dotBaseStyle, animationDelay: '0.4s'}}></span>
            </span>
          )}
        </div>
      ))}
      <div ref={messagesEndRef} />
    </div>
  );
}