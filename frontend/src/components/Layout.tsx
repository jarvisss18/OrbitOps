import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { 
  Rocket, AlertTriangle, Search, Database, 
  Activity, Clock, FileText, BookOpen, 
  History, Settings, User 
} from 'lucide-react';
import clsx from 'clsx';

const NAV_ITEMS = [
  { name: 'Dashboard', path: '/dashboard', icon: Rocket },
  { name: 'Anomalies', path: '/anomalies', icon: AlertTriangle },
  { name: 'Investigations', path: '/investigations', icon: Search },
  { name: 'Evidence Explorer', path: '/evidence', icon: Database },
  { name: 'Telemetry', path: '/telemetry', icon: Activity },
  { name: 'Timeline', path: '/timeline', icon: Clock },
  { name: 'Audit Trail', path: '/audit', icon: FileText },
  { name: 'Procedures', path: '/procedures', icon: BookOpen },
  { name: 'Historical Incidents', path: '/incidents', icon: History },
  { name: 'Settings', path: '/settings', icon: Settings },
];

export default function Layout() {
  return (
    <div className="flex h-screen bg-[#060b13] text-slate-300 font-sans">
      
      {/* Sidebar */}
      <div className="w-64 bg-[#0a101b] border-r border-[#1e293b] flex flex-col pt-4 pb-4 shadow-xl z-10 flex-shrink-0">
        <div className="flex items-center px-6 mb-8 mt-2 space-x-3">
          <div className="bg-primary-main p-1.5 rounded-md">
            <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5 text-white stroke-current stroke-2">
              <path d="M12 2L2 7L12 12L22 7L12 2Z" />
              <path d="M2 17L12 22L22 17" />
              <path d="M2 12L12 17L22 12" />
            </svg>
          </div>
          <span className="text-white font-semibold tracking-wide text-[15px]">ANTIGRAVITY</span>
        </div>

        <nav className="flex-1 px-3 space-y-1 overflow-y-auto">
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) => clsx(
                "flex items-center space-x-3 px-3 py-2 rounded-md text-sm transition-colors",
                isActive 
                  ? "bg-[#182845] text-primary-main font-medium border-l-[3px] border-primary-main rounded-l-sm" 
                  : "text-slate-400 hover:text-slate-200 hover:bg-[#121c2c]"
              )}
            >
              <item.icon className={clsx("w-4 h-4")} />
              <span>{item.name}</span>
            </NavLink>
          ))}
        </nav>

        <div className="px-6 mt-auto">
          <div className="flex items-center space-x-2 text-xs mb-2">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
            <span className="text-emerald-500">System Online</span>
          </div>
          <div className="flex items-center space-x-2 text-xs text-slate-500">
            <span>+ Simulation Mode</span>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
        <header className="h-[60px] bg-[#0a101b] border-b border-[#1e293b] flex items-center px-6 flex-shrink-0 z-10">
          <h2 className="text-[17px] text-white font-medium tracking-tight">Mission Operations Copilot</h2>
          
          <div className="ml-auto flex items-center space-x-5">
            <div className="text-xs font-semibold px-2.5 py-1 bg-emerald-950 text-emerald-400 border border-emerald-800 rounded flex items-center space-x-1 uppercase tracking-wider">
              <Database className="w-3.5 h-3.5" />
              <span>SIMULATION ONLY</span>
            </div>
            
            <div className="flex items-center space-x-2 border-l border-slate-700 pl-5 cursor-pointer">
              <div className="w-7 h-7 rounded-full bg-slate-700 flex items-center justify-center">
                <User className="w-4 h-4 text-slate-300" />
              </div>
              <span className="text-sm font-medium text-slate-300">Operator</span>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-auto bg-[#070d19]">
          <Outlet />
        </main>
      </div>

    </div>
  );
}
