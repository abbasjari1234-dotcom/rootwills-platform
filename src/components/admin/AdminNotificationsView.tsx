'use client';

import React, { useState } from 'react';
import { 
  Bell, 
  Send, 
  Clock, 
  Truck, 
  MessageSquare, 
  Smartphone, 
  CheckCircle2, 
  Sparkles, 
  Users, 
  AlertCircle,
  Radio,
  Thermometer,
  ShieldCheck
} from 'lucide-react';
import { useDemoStore } from '@/lib/store/demo-store';

interface BroadcastLog {
  id: string;
  type: 'sms' | 'whatsapp';
  target: string;
  time: string;
  message: string;
  status: 'delivered' | 'sent';
}

export function AdminNotificationsView() {
  const { organizations } = useDemoStore();
  const [selectedCampaign, setSelectedCampaign] = useState<'cutoff' | 'dispatch' | 'promo'>('cutoff');
  const [targetSector, setTargetSector] = useState<'all' | 'fine_dining' | 'hotel' | 'care_home'>('all');
  const [customMsg, setCustomMsg] = useState('');
  const [sentCount, setSentCount] = useState(0);

  const [logs, setLogs] = useState<BroadcastLog[]>([
    {
      id: 'log-1',
      type: 'whatsapp',
      target: 'Executive Chef Marco Rossi (San Carlo)',
      time: '22:30:12 PM',
      message: '🚨 Rootwills Notice: 30 minutes remaining until 23:00 order cut-off for tomorrow morning 06:15 drop. Reorder link: https://rootwills.co.uk/quick-order',
      status: 'delivered',
    },
    {
      id: 'log-2',
      type: 'sms',
      target: 'Purchasing Director (The Grand Hotel)',
      time: '05:45:00 AM',
      message: '🚚 Rootwills Morning Dispatch: Mercedes Sprinter #04 departed Digbeth Hub. Cold chamber logged at +2.4°C. ETA: 06:20 AM. Track: https://rootwills.co.uk/driver',
      status: 'delivered',
    },
  ]);

  const handleSendBroadcast = (e: React.FormEvent) => {
    e.preventDefault();
    const newLog: BroadcastLog = {
      id: `log-${Date.now()}`,
      type: selectedCampaign === 'cutoff' ? 'whatsapp' : 'sms',
      target: `All Verified Kitchen Contacts (${organizations.length} Accounts)`,
      time: new Date().toLocaleTimeString(),
      message: customMsg || (selectedCampaign === 'cutoff' 
        ? '🚨 Rootwills Notice: 30 mins to 23:00 cut-off. Tap to submit morning kitchen order.'
        : '🚚 Morning Dispatch: Vans loaded, cold room chamber verified at +2.2°C. Drivers on route.'),
      status: 'delivered',
    };

    setLogs([newLog, ...logs]);
    setSentCount(sentCount + organizations.length);
    alert(`Successfully broadcast ${selectedCampaign.toUpperCase()} notification to ${organizations.length} kitchen accounts!`);
    setCustomMsg('');
  };

  return (
    <div className="p-6 sm:p-8 space-y-8 min-h-screen bg-obsidian-950">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-6 border-b border-cream/10">
        <div>
          <div className="inline-flex items-center gap-1.5 text-[11px] font-mono text-champagne uppercase font-bold">
            <Bell className="w-3.5 h-3.5" />
            <span>Kitchen Communications & Dispatch Engine</span>
          </div>
          <h1 className="font-display text-2xl sm:text-3xl font-bold text-cream mt-1">
            Automated Communications & Alerts
          </h1>
          <p className="text-xs text-cream/60">
            Trigger automated late-night 10:30 PM ordering reminders and 05:45 AM cold-chain morning dispatch notifications.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono bg-zinc-900 border border-zinc-700 px-3 py-1.5 rounded-xl">
          <Radio className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
          <span className="text-emerald-400 font-bold">Twilio & WhatsApp Business API Live</span>
        </div>
      </div>

      {/* Trigger Quick Actions Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Card 1: 10:30 PM Reminder */}
        <div className={`p-6 rounded-3xl border transition-all cursor-pointer space-y-3 ${
          selectedCampaign === 'cutoff'
            ? 'border-amber-500 bg-amber-500/10 shadow-gold-glow'
            : 'glass-panel border-zinc-800 hover:border-zinc-700'
        }`}
        onClick={() => setSelectedCampaign('cutoff')}
        >
          <div className="flex justify-between items-start">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold">
              <Clock className="w-5 h-5" />
            </div>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-amber-500/20 text-amber-300">
              22:30 PM Nightly
            </span>
          </div>
          <h3 className="font-display text-lg font-bold text-cream">10:30 PM Cut-off WhatsApp Reminder</h3>
          <p className="text-xs text-cream/65 leading-relaxed">
            Auto-alerts head chefs who have items sitting in their basket but haven't checked out before the 23:00 PM warehouse pick locks.
          </p>
        </div>

        {/* Card 2: 05:45 AM Dispatch Alert */}
        <div className={`p-6 rounded-3xl border transition-all cursor-pointer space-y-3 ${
          selectedCampaign === 'dispatch'
            ? 'border-emerald-500 bg-emerald-500/10 shadow-emerald-glow'
            : 'glass-panel border-zinc-800 hover:border-zinc-700'
        }`}
        onClick={() => setSelectedCampaign('dispatch')}
        >
          <div className="flex justify-between items-start">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">
              <Truck className="w-5 h-5" />
            </div>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-emerald-500/20 text-emerald-300">
              05:45 AM Morning
            </span>
          </div>
          <h3 className="font-display text-lg font-bold text-cream">05:45 AM Cold-Chain Dispatch SMS</h3>
          <p className="text-xs text-cream/65 leading-relaxed">
            Sends driver name, van license plate, live chamber temperature (+2.4°C verified), and estimated morning kitchen arrival time.
          </p>
        </div>

        {/* Card 3: Seasonal Produce Notice */}
        <div className={`p-6 rounded-3xl border transition-all cursor-pointer space-y-3 ${
          selectedCampaign === 'promo'
            ? 'border-purple-500 bg-purple-500/10 shadow-purple-500/20'
            : 'glass-panel border-zinc-800 hover:border-zinc-700'
        }`}
        onClick={() => setSelectedCampaign('promo')}
        >
          <div className="flex justify-between items-start">
            <div className="w-10 h-10 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center font-bold">
              <Sparkles className="w-5 h-5" />
            </div>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-purple-500/20 text-purple-300">
              Seasonal Flash
            </span>
          </div>
          <h3 className="font-display text-lg font-bold text-cream">Farm Intake Flash Alert</h3>
          <p className="text-xs text-cream/65 leading-relaxed">
            Notify head chefs of limited daily seasonal arrivals (e.g. Isle of Wight heritage tomatoes, white asparagus, fresh truffles).
          </p>
        </div>
      </div>

      {/* Broadcast Composer Form */}
      <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-zinc-800 space-y-6">
        <div className="space-y-1">
          <div className="text-xs font-mono uppercase text-champagne font-bold">Notification Composer</div>
          <h2 className="font-display text-xl sm:text-2xl font-bold text-cream">
            Dispatch Broadcast to Active Trade Accounts
          </h2>
        </div>

        <form onSubmit={handleSendBroadcast} className="space-y-4 text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="target-group-select" className="block text-[11px] font-mono uppercase text-cream/80 mb-1 font-bold">Target Kitchen Group</label>
              <select
                id="target-group-select"
                aria-label="Target Kitchen Group"
                value={targetSector}
                onChange={(e) => setTargetSector(e.target.value as any)}
                className="w-full bg-zinc-900 border border-zinc-700 text-zinc-100 rounded-xl px-3.5 py-2.5 focus:outline-none focus:border-champagne cursor-pointer"
              >
                <option value="all">All Verified Accounts ({organizations.length} Kitchens)</option>
                <option value="fine_dining">Fine Dining & Restaurants Only</option>
                <option value="hotel">Hotels & Banqueting</option>
                <option value="care_home">Care Homes & Healthcare</option>
              </select>
            </div>

            <div>
              <span className="block text-[11px] font-mono uppercase text-cream/80 mb-1 font-bold">Channel Delivery</span>
              <div className="flex gap-2">
                <span className="flex-1 px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-700 text-cream flex items-center gap-2">
                  <Smartphone className="w-4 h-4 text-champagne" />
                  <span>WhatsApp Verified</span>
                </span>
                <span className="flex-1 px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-700 text-cream flex items-center gap-2">
                  <MessageSquare className="w-4 h-4 text-emerald-400" />
                  <span>SMS Fallback</span>
                </span>
              </div>
            </div>
          </div>

          <div>
            <label htmlFor="broadcast-msg" className="block text-[11px] font-mono uppercase text-cream/80 mb-1 font-bold">
              Message Content (or leave blank to use intelligent system preset)
            </label>
            <textarea
              id="broadcast-msg"
              aria-label="Broadcast message content"
              rows={3}
              value={customMsg}
              onChange={(e) => setCustomMsg(e.target.value)}
              placeholder={
                selectedCampaign === 'cutoff'
                  ? '🚨 Rootwills Reminder: 30 mins to 23:00 order cut-off for tomorrow morning 06:15 drop. Reorder link: https://rootwills.co.uk/quick-order'
                  : '🚚 Rootwills Dispatch: Mercedes Sprinter #04 loaded. Chilled chamber logged at +2.4°C. ETA 06:20 AM.'
              }
              className="w-full bg-zinc-900 border border-zinc-700 text-zinc-100 placeholder:text-zinc-400 rounded-xl p-3.5 font-mono text-xs focus:outline-none focus:border-champagne"
            />
          </div>

          <div className="pt-2 flex justify-between items-center">
            <div className="text-[11px] text-cream/50 font-mono flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Compliant with B2B direct operational messaging standards</span>
            </div>

            <button
              type="submit"
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-champagne-soft via-champagne to-champagne-dim text-obsidian-950 font-bold text-xs shadow-gold-glow hover:brightness-110 flex items-center gap-2 transition-all"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Trigger Broadcast Now</span>
            </button>
          </div>
        </form>
      </div>

      {/* Live Broadcast Logs Feed */}
      <div className="glass-panel rounded-3xl p-6 border border-zinc-800 space-y-4">
        <div className="flex justify-between items-center border-b border-zinc-800 pb-3">
          <h3 className="font-display text-lg font-bold text-cream">Recent Communications Logs</h3>
          <span className="text-xs font-mono text-cream/40">{logs.length} logged dispatches</span>
        </div>

        <div className="space-y-3">
          {logs.map((l) => (
            <div key={l.id} className="p-4 bg-zinc-950/80 rounded-2xl border border-zinc-800 space-y-2 text-xs">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <span className={`px-2 py-0.5 rounded font-mono text-[10px] uppercase font-bold ${
                    l.type === 'whatsapp' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                  }`}>
                    {l.type}
                  </span>
                  <strong className="text-cream">{l.target}</strong>
                </div>
                <span className="font-mono text-cream/40 text-[11px]">{l.time}</span>
              </div>
              <p className="font-mono text-cream/80 text-[11px] bg-zinc-900/60 p-2.5 rounded-xl border border-zinc-800/80">
                "{l.message}"
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
