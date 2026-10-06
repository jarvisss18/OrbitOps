import { useState } from 'react';
import { Send, Database, FileText, Activity, AlertTriangle, Search } from 'lucide-react';
import clsx from 'clsx';

export default function Copilot() {
  const [messages] = useState([
    {
      type: 'user',
      text: 'Why was this anomaly detected?',
      time: '14:30'
    },
    {
      type: 'agent',
      text: 'The anomaly was detected due to an increase in battery current (15.8A → 18.7A) followed by a rise in battery temperature (+8°C) and a subsequent FDIR warning. These parameters exceeded their expected ranges and were correlated within a 2-minute window.',
      confidence: 0.82,
      sourcesCount: 4,
      evidence: [
        { id: 'TEL-4821', desc: 'Battery current 18.7A (expected 15-17A)', icon: Activity },
        { id: 'TEL-4830', desc: 'Battery temperature +8°C', icon: Activity },
        { id: 'LOG-223', desc: 'FDIR warning (power subsystem)', icon: AlertTriangle },
        { id: 'PWR-204', desc: 'Relevant procedure', icon: FileText }
      ],
      actions: ['Show evidence', 'Show timeline', 'Similar incidents', 'Which procedure applies?']
    }
  ]);

  return (
    <div className="p-6 h-full flex flex-col max-w-5xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-white">AI Copilot</h1>
        <p className="text-slate-400 text-sm mt-1">Ask questions about this investigation</p>
      </div>

      <div className="glass-panel flex-1 flex flex-col overflow-hidden relative">
        <div className="flex-1 overflow-auto p-6 space-y-8">
          {messages.map((msg, idx) => (
            <div key={idx} className={clsx("flex flex-col max-w-[85%]", msg.type === 'user' ? "ml-auto" : "")}>
              
              <div className={clsx(
                "rounded-2xl p-5 shadow-sm text-sm group",
                msg.type === 'user' 
                  ? "bg-slate-800 text-slate-200 self-end rounded-tr-sm border border-slate-700/50" 
                  : "bg-dark-900 border border-primary-900/50 text-slate-200 self-start rounded-tl-sm relative"
              )}>
                {msg.type === 'agent' && (
                  <div className="absolute -left-3 -top-3 w-8 h-8 rounded-lg bg-primary-main flex items-center justify-center shadow-lg border-2 border-dark-900">
                    <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4 text-white stroke-current stroke-2">
                       <path d="M12 2L2 7L12 12L22 7L12 2Z" />
                       <path d="M2 17L12 22L22 17" />
                       <path d="M2 12L12 17L22 12" />
                    </svg>
                  </div>
                )}
                
                <p className="leading-relaxed whitespace-pre-wrap">{msg.text}</p>
                
                {msg.type === 'agent' && msg.evidence && (
                  <div className="mt-5 pt-4 border-t border-slate-700/50">
                    <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">Supporting Evidence:</div>
                    <ul className="space-y-2">
                      {msg.evidence.map((ev, eIdx) => (
                        <li key={eIdx} className="flex items-center space-x-2 text-slate-300">
                          <ev.icon className="w-3.5 h-3.5 text-slate-500" />
                          <span className="font-medium text-white">{ev.id}</span>
                          <span className="text-slate-500">-</span>
                          <span>{ev.desc}</span>
                        </li>
                      ))}
                    </ul>
                    
                    <div className="flex items-center space-x-3 mt-4 text-xs font-medium text-slate-500">
                       <span className="text-emerald-400">Confidence: {msg.confidence}</span>
                       <span>|</span>
                       <span>Sources: {msg.sourcesCount}</span>
                    </div>
                  </div>
                )}
              </div>
              
              {msg.type === 'agent' && msg.actions && (
                <div className="flex flex-wrap gap-2 mt-3 ml-2">
                  {msg.actions.map((action, aIdx) => (
                    <button key={aIdx} className="px-3 py-1.5 rounded-full bg-dark-800 border border-slate-700 text-xs text-primary-400 hover:bg-slate-700 hover:border-slate-500 transition-colors flex items-center">
                       {action.includes('evidence') && <Database className="w-3 h-3 mr-1.5" />}
                       {action.includes('timeline') && <Activity className="w-3 h-3 mr-1.5" />}
                       {action.includes('procedure') && <FileText className="w-3 h-3 mr-1.5" />}
                       {action.includes('Similar') && <Search className="w-3 h-3 mr-1.5" />}
                       {action}
                    </button>
                  ))}
                </div>
              )}
               
              {msg.type === 'user' && (
                <div className="text-[10px] text-slate-500 self-end mt-1.5 mr-1">{msg.time}</div>
              )}
            </div>
          ))}
        </div>
        
        <div className="p-4 border-t border-slate-700/50 bg-dark-900/50">
          <div className="relative flex items-center">
            <input 
              type="text"
              placeholder="Ask a question about this investigation..."
              className="w-full bg-dark-900 border border-slate-700 text-slate-200 text-sm rounded-xl pl-4 pr-12 py-3.5 focus:outline-none focus:border-primary-main focus:ring-1 focus:ring-primary-main shadow-inner"
            />
            <button className="absolute right-2 top-1.5 bottom-1.5 w-10 bg-primary-main/10 hover:bg-primary-main/20 text-primary-400 rounded-lg flex items-center justify-center transition-colors">
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
