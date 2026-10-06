import { Rocket, AlertTriangle, CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Demo() {
  const navigate = useNavigate();

  return (
    <div className="p-6 h-full flex flex-col max-w-4xl mx-auto">
      <div className="mt-12 text-center mb-12">
        <div className="inline-block p-4 rounded-full bg-primary-main/10 text-primary-400 mb-4">
          <Rocket className="w-8 h-8" />
        </div>
        <h1 className="text-3xl font-semibold text-white mb-2">Demo Mode</h1>
        <p className="text-slate-400">Load a prepared incident with sample data and a complete investigation.</p>
      </div>

      <div className="glass-panel p-8 flex border border-primary-900/50 flex-col md:flex-row gap-8 items-center bg-[#0e1726]/80 relative overflow-hidden">
         <div className="absolute -top-32 -left-32 w-64 h-64 bg-red-500/10 rounded-full blur-3xl"></div>
         <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-r from-transparent to-primary-900/10 z-0 pointer-events-none"></div>

         <div className="flex-1 relative z-10 w-full">
            <h2 className="text-lg font-semibold text-white mb-6">Load Demo Incident</h2>
            
            <div className="bg-dark-900 border border-red-900/50 rounded-xl p-5 mb-6 text-left flex items-start space-x-4">
               <div className="p-3 bg-red-500/20 rounded-full text-red-500 shrink-0">
                  <AlertTriangle className="w-6 h-6" />
               </div>
               <div>
                 <h3 className="text-base font-semibold text-white">Battery Thermal Anomaly</h3>
                 <p className="text-slate-400 text-sm mt-1 leading-relaxed">Simulated anomaly with full data (telemetry, logs, procedures, incidents)</p>
               </div>
            </div>

            <button 
              onClick={() => navigate('/dashboard')}
              className="w-full bg-gradient-to-r from-primary-main to-indigo-600 hover:from-primary-dark hover:to-indigo-700 text-white font-medium px-6 py-3.5 rounded-lg flex items-center justify-center space-x-2 transition-all shadow-lg hover:shadow-primary-500/20"
            >
               <span>Load Demo Incident</span>
               <span>→</span>
            </button>
         </div>
         
         <div className="md:border-l border-slate-700/50 md:pl-8 flex-1 w-full text-left relative z-10 text-sm">
            <h3 className="font-semibold text-slate-300 mb-4">What will be loaded?</h3>
            <ul className="space-y-3">
              {[
                'Anomaly (ANOM-004)',
                'Telemetry data (last 2 hours)',
                'Mission logs',
                'Relevant procedures',
                'Historical incidents',
                'Pre-populated investigation',
                'Complete demo scenario'
              ].map((item, i) => (
                <li key={i} className="flex items-center text-slate-400">
                  <CheckCircle className="w-4 h-4 text-emerald-500 mr-2 shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
         </div>
      </div>
      
      <div className="mt-8 text-center text-xs text-slate-500 flex items-center justify-center">
        <div className="w-2 h-2 rounded-full bg-sky-500 mr-2 animate-pulse"></div>
        This will reset the current state and load the demo scenario.
      </div>
    </div>
  );
}
