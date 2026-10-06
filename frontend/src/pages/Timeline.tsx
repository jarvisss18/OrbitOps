import { Database, FileText, Cpu, PlaySquare, Activity } from 'lucide-react';
import clsx from 'clsx';

const events = [
  { time: '14:30:12', desc: 'Battery current increased from 15.8A to 18.7A', source: 'Telemetry', subsystem: 'POWER', type: 'telemetry' },
  { time: '14:32:04', desc: 'Battery temperature exceeded threshold', source: 'Log', subsystem: 'THERMAL', type: 'log' },
  { time: '14:32:15', desc: 'FDIR warning - power subsystem', source: 'Log', subsystem: 'FDIR', type: 'alert', highlight: true },
  { time: '14:32:16', desc: 'Packet transmission delayed by 1.2s', source: 'Log', subsystem: 'COMM', type: 'log' },
  { time: '14:33:02', desc: 'Similar incident INC-102 found', source: 'RAG', subsystem: '-', type: 'system' },
  { time: '14:33:15', desc: 'Correlation analysis completed', source: 'System', subsystem: '-', type: 'system' },
  { time: '14:33:42', desc: 'Investigation generated', source: 'AI Copilot', subsystem: '-', type: 'copilot' },
];

export default function Timeline() {
  return (
    <div className="p-6 h-full flex flex-col max-w-5xl mx-auto">
      <div className="mb-6 flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-semibold text-white">Incident Timeline</h1>
          <p className="text-slate-400 text-sm mt-1">Chronological view of related events</p>
        </div>
        <div>
          <select className="appearance-none bg-dark-900 border border-slate-700 text-slate-300 text-sm rounded-md pl-3 pr-8 py-1.5 focus:outline-none focus:border-primary-main cursor-pointer">
            <option>All Sources</option>
            <option>Telemetry</option>
            <option>Logs</option>
            <option>AI Copilot</option>
          </select>
        </div>
      </div>

      <div className="glass-panel flex-1 overflow-hidden flex flex-col relative">
        {/* Table Header */}
        <div className="grid grid-cols-12 gap-4 px-6 py-4 border-b border-slate-700/50 bg-dark-900/80 sticky top-0 text-sm font-medium text-slate-400 z-10">
          <div className="col-span-2">Time (UTC)</div>
          <div className="col-span-6">Event</div>
          <div className="col-span-2">Source</div>
          <div className="col-span-2">Subsystem</div>
        </div>
        
        {/* Timeline Events */}
        <div className="flex-1 overflow-auto p-2">
          {events.map((ev, i) => (
            <div 
              key={i} 
              className={clsx(
                "grid grid-cols-12 gap-4 px-4 py-3 mx-2 my-1.5 rounded-lg items-center text-sm transition-colors",
                ev.highlight ? "bg-red-500/10 border border-red-500/30" : "hover:bg-slate-800/40 border border-transparent"
              )}
            >
              <div className="col-span-2 flex items-center space-x-3">
                 <div className={clsx(
                   "w-2.5 h-2.5 rounded-full outline outline-2 outline-offset-2",
                   ev.type === 'alert' ? "bg-red-500 outline-red-500/30" :
                   ev.type === 'telemetry' ? "bg-amber-500 outline-amber-500/30" :
                   ev.type === 'log' ? "bg-emerald-500 outline-emerald-500/30" :
                   ev.type === 'system' ? "bg-slate-500 outline-slate-500/30" :
                   "bg-primary-main outline-primary-main/30"
                 )} />
                 <span className={clsx("font-medium", ev.highlight ? "text-red-300" : "text-slate-300")}>{ev.time}</span>
              </div>
              
              <div className={clsx("col-span-6", ev.highlight ? "text-red-200" : "text-slate-200")}>
                {ev.desc}
              </div>

              <div className="col-span-2 flex items-center space-x-2 text-slate-400">
                {ev.source === 'Telemetry' && <Activity className="w-3.5 h-3.5" />}
                {ev.source === 'Log' && <FileText className="w-3.5 h-3.5" />}
                {ev.source === 'System' && <Cpu className="w-3.5 h-3.5" />}
                {ev.source === 'RAG' && <Database className="w-3.5 h-3.5" />}
                {ev.source === 'AI Copilot' && <PlaySquare className="w-3.5 h-3.5 text-primary-400" />}
                <span>{ev.source}</span>
              </div>

              <div className="col-span-2 text-slate-400 font-medium">
                {ev.subsystem}
              </div>
            </div>
          ))}
          
          {/* Vertical connecting line in background */}
          <div className="absolute left-[39px] top-12 bottom-6 w-px bg-slate-700/50 -z-10 shadow-[0_0_8px_rgba(255,255,255,0.05)]" />
        </div>
      </div>
    </div>
  );
}
