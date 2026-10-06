import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Legend, ReferenceLine } from 'recharts';
import { mockTelemetryData } from '../data/telemetry';

export default function Telemetry() {
  return (
    <div className="p-6 h-full flex flex-col max-w-7xl mx-auto">
      <div className="flex justify-between items-end mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-white">Telemetry Explorer</h1>
          <p className="text-slate-400 text-sm mt-1">Real-time and historical telemetry data</p>
        </div>
        <div className="flex space-x-4">
          <select className="bg-dark-900 border border-slate-700 text-slate-300 text-sm rounded-md px-3 py-1.5 focus:outline-none focus:border-primary-main">
            <option>Last 2 Hours</option>
            <option>Last 24 Hours</option>
          </select>
          <select className="bg-dark-900 border border-slate-700 text-slate-300 text-sm rounded-md px-3 py-1.5 focus:outline-none focus:border-primary-main">
            <option>SC-01</option>
          </select>
          <button className="px-4 py-1.5 bg-dark-800 hover:bg-slate-700 border border-slate-600 rounded-md text-sm text-white transition-colors">
            Compare Parameters
          </button>
        </div>
      </div>

      <div className="glass-panel flex-1 flex overflow-hidden">
        {/* Sidebar Parameters */}
        <div className="w-64 border-r border-slate-700/50 flex flex-col bg-dark-900/40">
          <div className="p-4 border-b border-slate-700/50 bg-dark-900/60">
            <h3 className="text-sm font-semibold text-white">Parameters</h3>
          </div>
          <div className="flex-1 overflow-auto p-4 space-y-3">
             {[
               { id: 'bat-cur', name: 'Battery Current', checked: true },
               { id: 'bat-tmp', name: 'Battery Temperature', checked: true },
               { id: 'bat-vol', name: 'Voltage', checked: true },
               { id: 'soc', name: 'State of Charge', checked: false },
               { id: 'sol-cur', name: 'Solar Array Current', checked: false },
             ].map(param => (
               <label key={param.id} className="flex items-center space-x-3 cursor-pointer group">
                 <div className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${param.checked ? 'bg-primary-main border-primary-main' : 'border-slate-500 group-hover:border-slate-400'}`}>
                    {param.checked && <svg viewBox="0 0 14 14" fill="none" className="w-3 h-3 text-white"><path d="M3 7.5L5.5 10L11 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>}
                 </div>
                 <span className={`text-sm ${param.checked ? 'text-slate-200' : 'text-slate-400 group-hover:text-slate-300'}`}>{param.name}</span>
               </label>
             ))}

            <div className="my-4 border-t border-slate-800"></div>

            {[
               { id: 'comp-tmp', name: 'Component Temperature', checked: false },
               { id: 'rad-tmp', name: 'Radiator Temperature', checked: false },
            ].map(param => (
              <label key={param.id} className="flex items-center space-x-3 cursor-pointer group mb-3">
                <div className={`w-4 h-4 rounded border border-slate-500 group-hover:border-slate-400 flex items-center justify-center transition-colors`} />
                <span className="text-sm text-slate-400 group-hover:text-slate-300">{param.name}</span>
              </label>
             ))}
          </div>
        </div>

        {/* Chart Area */}
        <div className="flex-1 flex flex-col p-6 bg-dark-900/20 relative">
          <h2 className="text-base font-semibold text-white mb-4">Power Subsystem Telemetry</h2>
          
          <div className="flex-1 min-h-0 bg-dark-950 border border-slate-800 rounded-lg p-4 relative pt-10">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={mockTelemetryData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                <XAxis dataKey="time" stroke="#475569" fontSize={12} tickMargin={10} minTickGap={30} />
                <YAxis yAxisId="left" stroke="#3b82f6" fontSize={12} domain={['dataMin - 1', 'dataMax + 1']} />
                <YAxis yAxisId="right" orientation="right" stroke="#eab308" fontSize={12} domain={[19, 23]} />
                <YAxis yAxisId="right2" orientation="right" stroke="#10b981" fontSize={12} hide domain={[28, 29]} />
                
                <Legend verticalAlign="top" height={36} wrapperStyle={{ top: -30 }} iconType="circle" />
                <Line yAxisId="left" type="monotone" dataKey="batteryCurrent" name="Battery Current (A)" stroke="#3b82f6" strokeWidth={2} dot={false} activeDot={{ r: 4 }} />
                <Line yAxisId="right" type="monotone" dataKey="batteryTemp" name="Battery Temperature (°C)" stroke="#eab308" strokeWidth={2} dot={false} activeDot={{ r: 4 }} />
                <Line yAxisId="right2" type="monotone" dataKey="voltage" name="Voltage (V)" stroke="#10b981" strokeWidth={2} dot={false} activeDot={{ r: 4 }} />
                
                <ReferenceLine x="14:32" stroke="#ef4444" strokeDasharray="3 3">
                  {/* @ts-ignore label prop */}
                  <text x="50%" y="10%" fill="#ef4444" fontSize={12} dy={-10} dx={-10}>Anomaly Detected</text>
                </ReferenceLine>
              </LineChart>
            </ResponsiveContainer>
             <div className="absolute top-[20px] left-[50%] bg-red-950 border border-red-500 px-2 py-0.5 rounded text-xs text-red-500 font-bold ml-12">Anomaly Detected</div>
          </div>
        </div>
      </div>
    </div>
  );
}
