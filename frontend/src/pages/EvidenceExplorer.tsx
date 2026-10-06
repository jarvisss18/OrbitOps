import { Search, CheckCircle, Activity, ChevronRight } from 'lucide-react';
import clsx from 'clsx';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';
import { mockTelemetryData } from '../data/telemetry';

const evidenceList = [
  { id: 'TEL-4821', type: 'Telemetry', time: '14:32:15', subsystem: 'POWER', relevance: 0.96 },
  { id: 'TEL-4830', type: 'Telemetry', time: '14:32:17', subsystem: 'POWER', relevance: 0.91 },
  { id: 'LOG-223', type: 'Log', time: '14:32:04', subsystem: 'THERMAL', relevance: 0.88 },
  { id: 'PWR-204', type: 'Procedure', time: '-', subsystem: 'POWER', relevance: 0.84 },
  { id: 'INC-102', type: 'Incident', time: '2023-11-14', subsystem: 'POWER', relevance: 0.78 },
  { id: 'LOG-220', type: 'Log', time: '14:30:12', subsystem: 'POWER', relevance: 0.72 },
];

export default function EvidenceExplorer() {
  return (
    <div className="p-6 h-full flex flex-col max-w-7xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-white">Evidence Explorer</h1>
        <p className="text-slate-400 text-sm mt-1">View detailed information about retrieved evidence</p>
      </div>

      <div className="glass-panel flex-1 flex overflow-hidden">
        
        {/* Left Column - List */}
        <div className="w-1/2 border-r border-slate-700/50 flex flex-col bg-dark-900/30">
          <div className="p-4 border-b border-slate-700/50 flex space-x-2 overflow-x-auto">
            {['All Types', 'Telemetry', 'Logs', 'Procedures', 'Incidents'].map((t, i) => (
              <button 
                key={t}
                className={clsx(
                  "px-3 py-1.5 rounded-md text-xs font-medium whitespace-nowrap transition-colors",
                  i === 0 ? "bg-primary-main/20 text-primary-400 border border-primary-500/30" : "bg-dark-800 text-slate-400 border border-slate-700 hover:bg-slate-700"
                )}
              >
                {t}
              </button>
            ))}
          </div>

          <div className="p-4 border-b border-slate-700/50 relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-7 top-6" />
            <input 
              type="text" 
              placeholder="Search evidence..." 
              className="w-full bg-dark-900 border border-slate-700 text-slate-300 text-sm rounded-md pl-9 pr-4 py-2 focus:outline-none focus:border-primary-main"
            />
          </div>

          <div className="flex-1 overflow-auto">
             <table className="w-full text-left text-[13px] whitespace-nowrap">
              <thead className="bg-dark-900/80 sticky top-0 border-b border-slate-700/50">
                <tr>
                  <th className="px-5 py-3 font-medium text-slate-400">ID</th>
                  <th className="px-5 py-3 font-medium text-slate-400">Type</th>
                  <th className="px-5 py-3 font-medium text-slate-400">Time (UTC)</th>
                  <th className="px-5 py-3 font-medium text-slate-400">Subsystem</th>
                  <th className="px-5 py-3 font-medium text-slate-400">Relevance</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-700/50">
                {evidenceList.map((ev, i) => (
                  <tr key={ev.id} className={clsx("hover:bg-slate-800/40 cursor-pointer", i === 0 && "bg-slate-800/30")}>
                    <td className={clsx("px-5 py-3 font-medium transition-colors", i === 0 ? "text-primary-400" : "text-slate-300")}>{ev.id}</td>
                    <td className="px-5 py-3 text-slate-300">{ev.type}</td>
                    <td className="px-5 py-3 text-slate-400">{ev.time}</td>
                    <td className="px-5 py-3 text-slate-300">{ev.subsystem}</td>
                    <td className="px-5 py-3">
                      <div className="flex items-center space-x-2">
                        <span className="text-emerald-400 font-medium">{ev.relevance}</span>
                        <div className="w-12 h-1.5 rounded-full bg-dark-900 overflow-hidden">
                          <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${ev.relevance * 100}%` }}></div>
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right Column - Details */}
        <div className="w-1/2 flex flex-col bg-[#080d17]">
          <div className="p-4 border-b border-slate-700/50 flex justify-between items-center text-sm">
            <span className="text-slate-400 font-medium">Evidence Details</span>
            <span className="px-2 py-0.5 rounded bg-emerald-900/30 text-emerald-400 text-xs border border-emerald-900/50 flex items-center">
              <CheckCircle className="w-3 h-3 mr-1" />
              Verified
            </span>
          </div>
          
          <div className="p-6 flex-1 overflow-auto">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-xl font-semibold text-white">TEL-4821</h2>
              <div className="px-2.5 py-1 rounded-md text-xs font-bold tracking-wider bg-indigo-900/30 text-indigo-400 border border-indigo-900/50 flex items-center">
                <Activity className="w-3 h-3 mr-1.5" />
                Telemetry
              </div>
            </div>

            <div className="grid grid-cols-2 gap-y-6 gap-x-4 mb-8 text-sm">
               <div>
                  <div className="text-slate-500 text-xs mb-1">Timestamp</div>
                  <div className="font-medium text-slate-300">14:32:15 UTC</div>
                </div>
                <div>
                  <div className="text-slate-500 text-xs mb-1">Subsystem</div>
                  <div className="font-medium text-slate-300">POWER</div>
                </div>
                <div>
                  <div className="text-slate-500 text-xs mb-1">Parameter</div>
                  <div className="font-medium text-slate-300 flex items-center">
                    battery_current
                  </div>
                </div>
                 <div>
                  <div className="text-slate-500 text-xs mb-1">Status</div>
                  <div className="font-medium text-red-500 flex items-center bg-red-900/20 px-2 py-0.5 rounded w-fit border border-red-900/30 text-xs uppercase">
                    Warning
                  </div>
                </div>
                 <div>
                  <div className="text-slate-500 text-xs mb-1">Value</div>
                  <div className="font-medium text-red-400 text-lg">18.7 A</div>
                </div>
                <div>
                  <div className="text-slate-500 text-xs mb-1">Expected Range</div>
                  <div className="font-medium text-emerald-400">15 – 17 A</div>
                </div>
            </div>

            {/* In-context Chart */}
            <div className="mb-6">
              <div className="text-xs text-slate-500 mb-3">Battery Current (A) - Last 30m</div>
              <div className="bg-dark-900 rounded-lg p-4 border border-slate-700/50 h-48 w-full relative">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={mockTelemetryData.slice(30)}>
                    <defs>
                      <linearGradient id="colorCur" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                    <XAxis dataKey="time" hide />
                    <YAxis domain={['dataMin - 1', 'dataMax + 1']} hide />
                    <Area type="monotone" dataKey="batteryCurrent" stroke="#ef4444" strokeWidth={2} fillOpacity={1} fill="url(#colorCur)" />
                  </AreaChart>
                </ResponsiveContainer>
                {/* Overlay annotation */}
                <div className="absolute right-4 top-4 bg-red-500 text-white text-[10px] px-1.5 py-0.5 rounded font-bold">18.7</div>
              </div>
            </div>

            <div className="pt-6 border-t border-slate-700/50 flex justify-end">
              <button className="px-4 py-2 bg-dark-800 hover:bg-slate-700 border border-slate-600 rounded-md text-sm text-white transition-colors flex items-center">
                 View Original Record <ChevronRight className="w-4 h-4 ml-1" />
              </button>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  );
}
