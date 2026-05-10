import { useState } from 'react';
import { MessageSquare, X, Send } from 'lucide-react';
import clsx from 'clsx';

type Message = {
  id: string;
  sender: 'user' | 'ai';
  text: string;
};

export default function AiChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', sender: 'ai', text: 'Hi there! How can I help you explore EcomX today? Try asking "Suggest a product"' }
  ]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage: Message = { id: Date.now().toString(), sender: 'user', text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');

    // Simulate AI thinking and response
    setTimeout(() => {
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'ai',
        text: `You just said: "${userMessage.text}". As a mocked AI feature, I can guide you to explore items or help you navigate your dashboard!`
      };
      setMessages((prev) => [...prev, aiMessage]);
    }, 1000);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Chatbot Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 bg-primary text-primary-foreground rounded-full flex items-center justify-center shadow-lg hover:bg-primary/90 transition-transform active:scale-95"
        aria-label="Toggle AI Chat bot"
      >
        {isOpen ? <X size={28} /> : <MessageSquare size={28} />}
      </button>

      {/* Chatbot Window */}
      {isOpen && (
        <div className="absolute bottom-20 right-0 w-80 sm:w-96 h-[400px] bg-card rounded-xl border border-border shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-bottom-5">
          <div className="p-4 bg-primary text-primary-foreground flex flex-col">
            <span className="font-semibold text-lg">EcomX AI Assistant</span>
            <span className="text-xs opacity-90">Online 24/7</span>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-muted/30">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={clsx(
                  "max-w-[80%] rounded-lg p-3 text-sm",
                  msg.sender === 'user'
                    ? "bg-primary text-primary-foreground ml-auto rounded-tr-none"
                    : "bg-muted text-foreground border border-border mr-auto rounded-tl-none"
                )}
              >
                {msg.text}
              </div>
            ))}
          </div>

          <form onSubmit={handleSend} className="p-3 border-t border-border bg-card flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask anything..."
              className="input-field flex-1"
            />
            <button
              type="submit"
              disabled={!input.trim()}
              className="btn-primary w-10 px-0 rounded-md"
            >
              <Send size={18} />
            </button>
          </form>
        </div>
      )}
    </div>
  );
}