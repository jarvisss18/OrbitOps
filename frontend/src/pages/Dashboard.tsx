import { Rocket, AlertTriangle, ShieldCheck, ChevronRight } from 'lucide-react';
import { mockAnomalies } from '../data/anomalies';
import clsx from 'clsx';

export default function Dashboard() {
  const alerts = [
    { id: 'PWR-204', desc: 'Battery temperature increase', time: '14:32', level: 'High' },
    { id: 'FDIR-001', desc: 'Power subsystem warning', time: '14:32', level: 'Medium' },
    { id: 'COMM-015', desc: 'Packet transmission delay', time: '14:33', level: 'Low' },
    { id: 'THERM-003', desc: 'Radiator temp nominal', time: '14:20', level: 'Info' },
  ];

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      <div className="flex items-center space-x-2 text-sm text-slate-400">
        <span>Spacecraft SC-01</span>
        <span>•</span>
        <span>Mission Day 142</span>
        <span>•</span>
        <span>2026-06-24 14:37:22</span>
      </div>

      <h1 className="text-2xl font-semibold text-white mb-6">Mission Dashboard</h1>

      {/* Top Stats Cards */}
      <div className="grid grid-cols-4 gap-6">
        <div className="glass-panel p-5 flex flex-col justify-between h-36">
          <div className="text-slate-400 text-sm font-medium mb-2">Spacecraft Status</div>
          <div className="flex items-center space-x-4">
            <div className="bg-blue-900/40 p-3 rounded-full text-blue-400">
              <Rocket className="w-6 h-6" />
            </div>
            <div>
              <div className="text-xl font-bold text-white">Nominal</div>
              <div className="text-xs text-slate-400 mt-1">All systems operating within expected range</div>
            </div>
          </div>
        </div>

        <div className="glass-panel p-5 flex flex-col justify-between h-36">
          <div className="text-slate-400 text-sm font-medium mb-2">Active Anomalies</div>
          <div className="flex items-center space-x-4">
            <div className="bg-amber-900/40 p-3 rounded-full text-amber-500">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <div>
              <div className="text-xl font-bold text-white">1</div>
              <div className="text-xs text-amber-500 mt-1">Requires Investigation</div>
            </div>
          </div>
        </div>

        <div className="glass-panel p-5 flex flex-col justify-between h-36">
          <div className="text-slate-400 text-sm font-medium mb-2">Subsystem Health</div>
          <div className="flex items-center space-x-4">
            <div className="bg-emerald-900/40 p-3 rounded-full text-emerald-400">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <div className="text-2xl font-bold text-white">8 / 10</div>
              <div className="text-xs text-emerald-400 mt-1">Healthy</div>
            </div>
          </div>
        </div>

        <div className="glass-panel p-5 flex flex-col items-center justify-center h-36 relative overflow-hidden">
           <div className="text-slate-400 text-sm font-medium absolute top-4 left-5">Mission Progress</div>
           <svg viewBox="0 0 36 36" className="w-20 h-20 mt-4">
            <path className="text-slate-700" strokeWidth="3" stroke="currentColor" fill="none"
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
            <path className="text-emerald-500" strokeDasharray="78, 100" strokeWidth="3" stroke="currentColor" fill="none" strokeLinecap="round"
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
            <text x="18" y="20.5" className="text-[10px] font-bold text-white" textAnchor="middle">78%</text>
          </svg>
          <div className="text-[10px] text-slate-400 absolute bottom-3">Day 142 / 180</div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6 mt-6">
        {/* Recent Alerts */}
        <div className="glass-panel p-5">
          <h3 className="text-base font-semibold text-white mb-4">Recent Alerts</h3>
          <div className="space-y-4">
            {alerts.map((a, i) => (
              <div key={i} className="flex items-start justify-between pb-4 border-b border-slate-700/50 last:border-0 last:pb-0">
                <div className="flex space-x-3">
                  <div className={clsx(
                    "w-2 h-2 rounded-full mt-1.5",
                    a.level === 'High' ? 'bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.6)]' :
                    a.level === 'Medium' ? 'bg-amber-500' :
                    a.level === 'Low' ? 'bg-blue-400' : 'bg-emerald-400'
                  )} />
                  <div>
                    <div className="text-sm font-medium text-slate-200">{a.id}</div>
                    <div className="text-xs text-slate-400 mt-0.5">{a.desc}</div>
                  </div>
                </div>
                <div className="flex items-center space-x-3 text-xs">
                  <span className="text-slate-400">{a.time}</span>
                  <span className={clsx(
                    "px-2 py-0.5 rounded text-[10px] font-bold tracking-wider",
                    a.level === 'High' ? 'bg-red-950/50 text-red-400 border border-red-900/50' :
                    a.level === 'Medium' ? 'bg-amber-950/50 text-amber-500 border border-amber-900/50' :
                    a.level === 'Low' ? 'bg-blue-950/50 text-blue-400 border border-blue-900/50' : 
                    'bg-emerald-950/50 text-emerald-400 border border-emerald-900/50'
                  )}>{a.level}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Investigation Queue */}
        <div className="glass-panel p-5 flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base font-semibold text-white">Investigation Queue</h3>
            <button className="text-xs font-medium text-primary-main hover:text-primary-main/80 flex items-center">
              View all <ChevronRight className="w-3 h-3 ml-1" />
            </button>
          </div>
          
          <div className="space-y-3">
            {mockAnomalies.slice(0, 2).map((anom, i) => (
              <div key={anom.id} className="bg-dark-900/50 border border-slate-700/50 rounded-lg p-4 hover:border-slate-600 transition-colors cursor-pointer">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-3">
                    <span className="text-sm font-semibold text-slate-300">{i + 1}</span>
                    <span className="text-sm font-medium text-white">{anom.id}</span>
                  </div>
                  <div className="flex items-center space-x-3 text-xs">
                    <span className={clsx(
                      "px-2 py-0.5 rounded text-[10px] font-bold tracking-wider",
                      anom.severity === 'High' ? 'bg-red-500/20 text-red-400 border border-red-500/30' :
                      anom.severity === 'Medium' ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' :
                      'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                    )}>{anom.severity}</span>
                     <span className="text-slate-400">{anom.timeUTC}</span>
                  </div>
                </div>
                <div className="pl-6 text-sm text-slate-400">{anom.title}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
