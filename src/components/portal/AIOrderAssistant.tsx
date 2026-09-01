'use client';

import React, { useState } from 'react';
import { useDemoStore } from '@/lib/store/demo-store';
import { useCartStore } from '@/store/cart-store';
import { 
  Sparkles, 
  Send, 
  Bot, 
  User, 
  ShoppingBag, 
  Check, 
  X, 
  Plus, 
  MessageSquare,
  UtensilsCrossed,
  ShieldCheck
} from 'lucide-react';
import { queryAIAssistant } from '@/actions/ai';

interface AIMessage {
  sender: 'ai' | 'user';
  text: string;
  suggestedItems?: { productId: string; name: string; qty: number; packSize: string; customerPrice: number }[];
  actionLabel?: string;
  isError?: boolean;
}

export function AIOrderAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const { currentOrgId, organizations, getCustomerProducts } = useDemoStore();
  const { addItem, openCart } = useCartStore();

  const currentOrg = organizations.find((o) => o.id === currentOrgId) || organizations[0];
  const products = getCustomerProducts();

  const [messages, setMessages] = useState<AIMessage[]>([
    {
      sender: 'ai',
      text: `Hello Chef! I'm your Rootwills AI Kitchen Assistant for ${currentOrg.name}. You can tell me what you need for service prep (e.g. "Prepare my usual weekend steak service" or "I need garnishes for a new fish special"), and I will prepare your basket with your contract pricing.`,
    },
  ]);

  const handleSend = async (textToSend?: string) => {
    const query = textToSend || input;
    if (!query.trim()) return;

    // Append user message
    const userMsg: AIMessage = { sender: 'user', text: query };
    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInput('');
    setIsTyping(true);

    try {
      const result = await queryAIAssistant({
        prompt: query,
        organizationId: currentOrgId,
      });

      if (!result.ok) {
        setMessages((prev) => [
          ...prev,
          {
            sender: 'ai',
            text: result.message || 'Unable to process AI prep request.',
            isError: true,
          },
        ]);
      } else {
        setMessages((prev) => [
          ...prev,
          {
            sender: 'ai',
            text: result.message,
            suggestedItems: result.suggestions,
            actionLabel: result.actionLabel,
          },
        ]);
      }
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          sender: 'ai',
          text: 'Temporary network issue contacting kitchen AI engine. Please retry shortly.',
          isError: true,
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleAddItems = (items: NonNullable<AIMessage['suggestedItems']>) => {
    items.forEach((item) => {
      const prod = products.find((p) => p.id === item.productId);
      if (prod) {
        addItem(prod, item.qty);
      }
    });
    openCart();
  };

  return (
    <>
      {/* Floating Trigger Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-40 px-4 py-3 rounded-full bg-gradient-to-r from-champagne-soft via-champagne to-champagne-dim text-obsidian-950 font-bold text-xs shadow-gold-glow hover:brightness-110 flex items-center gap-2 border border-white/20 transition-all hover:scale-105"
      >
        <Sparkles className="w-4 h-4" />
        <span className="hidden sm:inline">AI Order Assistant</span>
        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
      </button>

      {/* AI Assistant Modal / Drawer */}
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden flex justify-end bg-obsidian-950/70 backdrop-blur-sm">
          <div className="w-full max-w-md bg-obsidian-900 border-l border-cream/15 text-cream flex flex-col h-full shadow-2xl">
            {/* Header */}
            <div className="p-4 border-b border-cream/10 bg-obsidian-950 flex justify-between items-center">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-champagne text-obsidian-950 flex items-center justify-center font-bold">
                  <Bot className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-cream flex items-center gap-1.5">
                    <span>Rootwills AI Kitchen Concierge</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  </div>
                  <div className="text-[10px] text-cream/50">Personalised to {currentOrg.name}</div>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                aria-label="Close AI kitchen concierge"
                className="p-1 rounded-lg text-cream/70 hover:text-cream hover:bg-obsidian-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Quick Prompt Chips */}
            <div className="p-3 bg-obsidian-950/60 border-b border-cream/5 flex gap-2 overflow-x-auto text-[11px]">
              <button
                onClick={() => handleSend('Prepare my usual weekend steak service')}
                className="px-2.5 py-1 rounded-full bg-obsidian-900 hover:bg-obsidian-800 border border-cream/15 text-cream/80 whitespace-nowrap"
              >
                🥩 Weekend Steak Service
              </button>
              <button
                onClick={() => handleSend('I need fresh salad and microgreens')}
                className="px-2.5 py-1 rounded-full bg-obsidian-900 hover:bg-obsidian-800 border border-cream/15 text-cream/80 whitespace-nowrap"
              >
                🥗 Fresh Salads & Microgreens
              </button>
              <button
                onClick={() => handleSend('Pastry chocolate and double cream')}
                className="px-2.5 py-1 rounded-full bg-obsidian-900 hover:bg-obsidian-800 border border-cream/15 text-cream/80 whitespace-nowrap"
              >
                🍫 Pastry & Cream
              </button>
            </div>

            {/* Messages Scroll Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 text-xs">
              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex gap-3 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {msg.sender === 'ai' && (
                    <div className="w-7 h-7 rounded-lg bg-champagne/10 text-champagne border border-champagne/25 flex items-center justify-center shrink-0">
                      <Bot className="w-3.5 h-3.5" />
                    </div>
                  )}

                  <div
                    className={`max-w-[85%] rounded-2xl p-3.5 space-y-2.5 leading-relaxed ${
                      msg.sender === 'user'
                        ? 'bg-champagne text-obsidian-950 font-medium rounded-tr-none'
                        : 'bg-obsidian-950 border border-cream/10 text-cream rounded-tl-none'
                    }`}
                  >
                    <p>{msg.text}</p>

                    {/* AI Item Suggestions */}
                    {msg.suggestedItems && msg.suggestedItems.length > 0 && (
                      <div className="pt-2 border-t border-cream/10 space-y-2">
                        <div className="space-y-1.5">
                          {msg.suggestedItems.map((item, i) => (
                            <div
                              key={i}
                              className="p-2 bg-obsidian-900 rounded-lg border border-cream/10 flex justify-between items-center text-[11px]"
                            >
                              <div>
                                <span className="font-bold text-cream block">{item.qty}x {item.name}</span>
                                <span className="text-cream/50 text-[10px]">{item.packSize}</span>
                              </div>
                              <span className="font-mono text-champagne font-bold">
                                £{(item.customerPrice * item.qty).toFixed(2)}
                              </span>
                            </div>
                          ))}
                        </div>

                        <button
                          onClick={() => handleAddItems(msg.suggestedItems!)}
                          className="w-full py-2 bg-gradient-to-r from-champagne to-champagne-soft text-obsidian-950 font-bold text-xs rounded-lg shadow-gold-glow hover:brightness-110 flex items-center justify-center gap-1.5"
                        >
                          <ShoppingBag className="w-3.5 h-3.5" />
                          <span>{msg.actionLabel || 'Add All Items to Basket'}</span>
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex gap-2 items-center text-xs text-cream/50 font-mono">
                  <Bot className="w-4 h-4 text-champagne animate-spin" />
                  <span>AI assistant is analyzing your ordering history...</span>
                </div>
              )}
            </div>

            {/* Input Bar */}
            <div className="p-3 border-t border-cream/10 bg-obsidian-950">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSend();
                }}
                className="flex gap-2"
              >
                <input
                  type="text"
                  aria-label="Ask AI assistant for recipes, orders, or stock"
                  placeholder="Ask AI for your usual prep, ingredients, or advice..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  className="flex-1 bg-obsidian-900 border border-cream/20 rounded-xl px-3.5 py-2 text-xs text-cream focus:outline-none focus:border-champagne"
                />
                <button
                  type="submit"
                  aria-label="Send message to AI kitchen concierge"
                  disabled={!input.trim()}
                  className="p-2.5 rounded-xl bg-champagne text-obsidian-950 font-bold disabled:opacity-40 hover:brightness-110"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
