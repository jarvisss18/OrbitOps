import { useEffect, useState } from 'react';
import { Search, ChevronDown } from 'lucide-react';
import clsx from 'clsx';
import { useNavigate } from 'react-router-dom';
import { Anomaly } from '../data/anomalies'; // assuming interface exported

export default function Anomalies() {
  const navigate = useNavigate();
  const [anomalies, setAnomalies] = useState<Anomaly[]>([]);
  
  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/anomalies')
      .then(res => res.json())
      .then(data => setAnomalies(data))
      .catch(err => console.error("Failed to load anomalies", err));
  }, []);

  return (
    <div className="p-6 h-full flex flex-col max-w-7xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-white">Anomaly Center</h1>
        <p className="text-slate-400 text-sm mt-1">View and manage all mission anomalies</p>
      </div>

      <div className="glass-panel flex-1 flex flex-col overflow-hidden">
        {/* Filters Bar */}
        <div className="p-4 border-b border-slate-700/50 flex items-center space-x-4 bg-dark-800/50">
          <div className="relative">
            <select className="appearance-none bg-dark-900 border border-slate-700 text-slate-300 text-sm rounded-md pl-3 pr-8 py-1.5 focus:outline-none focus:border-primary-main cursor-pointer">
              <option>All Severities</option>
              <option>High</option>
              <option>Medium</option>
              <option>Low</option>
            </select>
            <ChevronDown className="w-4 h-4 text-slate-400 absolute right-2.5 top-2 pointer-events-none" />
          </div>

          <div className="relative">
            <select className="appearance-none bg-dark-900 border border-slate-700 text-slate-300 text-sm rounded-md pl-3 pr-8 py-1.5 focus:outline-none focus:border-primary-main cursor-pointer">
              <option>All Subsystems</option>
              <option>POWER</option>
              <option>COMM</option>
              <option>THERMAL</option>
            </select>
            <ChevronDown className="w-4 h-4 text-slate-400 absolute right-2.5 top-2 pointer-events-none" />
          </div>

          <div className="relative">
            <select className="appearance-none bg-dark-900 border border-slate-700 text-slate-300 text-sm rounded-md pl-3 pr-8 py-1.5 focus:outline-none focus:border-primary-main cursor-pointer">
              <option>Last 24 Hours</option>
              <option>Last 7 Days</option>
              <option>All Time</option>
            </select>
            <ChevronDown className="w-4 h-4 text-slate-400 absolute right-2.5 top-2 pointer-events-none" />
          </div>
          
          <div className="relative">
             <select className="appearance-none bg-dark-900 border border-slate-700 text-slate-300 text-sm rounded-md pl-3 pr-8 py-1.5 focus:outline-none focus:border-primary-main cursor-pointer">
              <option>All Statuses</option>
              <option>Investigating</option>
              <option>Closed</option>
            </select>
            <ChevronDown className="w-4 h-4 text-slate-400 absolute right-2.5 top-2 pointer-events-none" />
          </div>

          <div className="flex-1"></div>

          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2" />
            <input 
              type="text" 
              placeholder="Search anomalies..." 
              className="bg-dark-900 border border-slate-700 text-slate-300 text-sm rounded-md pl-9 pr-4 py-1.5 focus:outline-none focus:border-primary-main w-64"
            />
          </div>
        </div>

        {/* Table */}
        <div className="flex-1 overflow-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-dark-900/80 sticky top-0 border-b border-slate-700/50">
              <tr>
                <th className="px-6 py-3 font-medium text-slate-400">ID</th>
                <th className="px-6 py-3 font-medium text-slate-400">Time (UTC)</th>
                <th className="px-6 py-3 font-medium text-slate-400">Subsystem</th>
                <th className="px-6 py-3 font-medium text-slate-400">Severity</th>
                <th className="px-6 py-3 font-medium text-slate-400">Status</th>
                <th className="px-6 py-3 font-medium text-slate-400">Confidence</th>
                <th className="px-6 py-3 font-medium text-slate-400">Investigation</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700/50">
              {anomalies.map((anom) => (
                <tr 
                  key={anom.id} 
                  onClick={() => navigate('/investigations')}
                  className="hover:bg-slate-800/30 transition-colors cursor-pointer group"
                >
                  <td className="px-6 py-4 font-medium text-white group-hover:text-primary-main transition-colors">{anom.id}</td>
                  <td className="px-6 py-4 text-slate-300">{anom.timeUTC}</td>
                  <td className="px-6 py-4 text-slate-300">{anom.subsystem}</td>
                  <td className="px-6 py-4">
                     <span className={clsx(
                      "px-2.5 py-1 rounded-md text-[11px] font-bold tracking-wider flex w-fit items-center",
                      anom.severity === 'High' ? 'bg-red-500/10 text-red-400 border border-red-500/20' :
                      anom.severity === 'Medium' ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' :
                      'bg-blue-500/10 text-blue-400 border border-blue-500/20'
                    )}>
                      {anom.severity === 'High' && <span className="w-1.5 h-1.5 rounded-full bg-red-500 mr-2 animate-pulse"></span>}
                      {anom.severity === 'Medium' && <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mr-2"></span>}
                      {anom.severity === 'Low' && <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mr-2"></span>}
                      {anom.severity.toUpperCase()}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-slate-300">{anom.status}</td>
                  <td className="px-6 py-4 text-slate-300">{anom.confidence.toFixed(2)}</td>
                  <td className="px-6 py-4">
                    <span className={clsx(
                      "px-2.5 py-1 rounded text-xs",
                      anom.status === 'Investigating' ? 'text-blue-400 bg-blue-500/10' :
                      anom.status === 'Closed' ? 'text-slate-400 bg-slate-800' :
                      anom.status === 'Not Started' ? 'text-slate-400' :
                      'text-emerald-400 bg-emerald-500/10'
                    )}>
                      {anom.status === 'Closed' ? 'Closed' : anom.status === 'Investigating' ? 'In Progress' : anom.status === 'Not Started' ? 'Not Started' : 'In Progress'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="p-4 border-t border-slate-700/50 flex items-center justify-between text-sm text-slate-400 bg-dark-900/50">
          <span>Showing 1-5 of 12 anomalies</span>
          <div className="flex space-x-1">
            <button className="px-2 py-1 rounded bg-dark-800 hover:bg-slate-700 text-slate-400">&lt;</button>
            <button className="px-3 py-1 rounded bg-primary-main/20 text-primary-400 border border-primary-main/50">1</button>
            <button className="px-3 py-1 rounded bg-dark-800 hover:bg-slate-700 text-slate-300">2</button>
            <button className="px-3 py-1 rounded bg-dark-800 hover:bg-slate-700 text-slate-300">3</button>
            <button className="px-2 py-1 rounded bg-dark-800 hover:bg-slate-700 text-slate-300">&gt;</button>
          </div>
        </div>

      </div>
    </div>
  );
}
