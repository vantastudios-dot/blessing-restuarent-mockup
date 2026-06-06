import { useState, useRef, useEffect } from "react";
import { trpc } from "@/providers/trpc";
import { Sparkles, X, Send, Loader2 } from "lucide-react";

type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

export default function AIChat() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: "assistant",
      content:
        "Welcome to Blessings! I'm your personal dining concierge. How can I assist you today? Ask me about our menu, reservations, events, or anything else!",
    },
  ]);
  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  const chatMutation = trpc.ai.chat.useMutation({
    onSuccess: (data) => {
      setMessages((prev) => [...prev, { role: "assistant", content: data.response }]);
    },
  });

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = () => {
    if (!input.trim() || chatMutation.isPending) return;

    const userMsg: ChatMessage = { role: "user", content: input.trim() };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInput("");

    chatMutation.mutate({ messages: newMessages });
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      {/* Floating Button */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-[#C7A878] text-[#0A0A0A] flex items-center justify-center shadow-lg hover:bg-[#E6D9C6] transition-colors"
        >
          <Sparkles size={24} />
        </button>
      )}

      {/* Chat Panel */}
      {open && (
        <div
          className="fixed bottom-6 right-6 z-50 w-[380px] max-w-[calc(100vw-48px)] glass-panel flex flex-col overflow-hidden"
          style={{ height: "520px" }}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-[#1A1A1A]">
            <div className="flex items-center gap-2">
              <Sparkles size={18} className="text-[#C7A878]" />
              <span className="font-display text-[16px] text-[#F6F2EB]">
                Blessings Concierge
              </span>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="text-[#8A8A8A] hover:text-[#F6F2EB] transition-colors"
            >
              <X size={18} />
            </button>
          </div>

          {/* Messages */}
          <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[85%] px-4 py-3 rounded-lg text-body-sm ${
                    msg.role === "user"
                      ? "bg-[#C7A878] text-[#0A0A0A]"
                      : "bg-[#1A1A1A] text-[#F6F2EB]"
                  }`}
                >
                  {msg.content}
                </div>
              </div>
            ))}
            {chatMutation.isPending && (
              <div className="flex justify-start">
                <div className="bg-[#1A1A1A] px-4 py-3 rounded-lg">
                  <Loader2 size={16} className="animate-spin text-[#C7A878]" />
                </div>
              </div>
            )}
          </div>

          {/* Input */}
          <div className="p-4 border-t border-[#1A1A1A]">
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask about our menu..."
                className="flex-1 bg-[#1A1A1A] text-[#F6F2EB] text-body-sm px-4 py-2.5 rounded-full outline-none focus:ring-1 focus:ring-[#C7A878]"
              />
              <button
                onClick={handleSend}
                disabled={!input.trim() || chatMutation.isPending}
                className="w-10 h-10 rounded-full bg-[#C7A878] text-[#0A0A0A] flex items-center justify-center hover:bg-[#E6D9C6] transition-colors disabled:opacity-30"
              >
                <Send size={16} />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
