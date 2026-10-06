import { AlertTriangle, CheckCircle, Database, FileText, ChevronRight } from 'lucide-react';
import clsx from 'clsx';

export default function Investigations() {
  const nextSteps = [
    'Check battery current and load',
    'Compare with expected range',
    'Review procedure PWR-204',
    'Check similar historical incidents'
  ];

  return (
    <div className="p-6 h-full flex flex-col max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-white">Investigation Workspace</h1>
          <p className="text-slate-400 text-sm mt-1">ANOM-004 • Battery Thermal Anomaly</p>
        </div>
        
        <div className="flex items-center space-x-4 text-sm">
          <div className="flex items-center bg-blue-500/10 border border-blue-500/30 text-blue-400 px-3 py-1.5 rounded-md font-medium">
            <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse mr-2"></span>
            Status: INVESTIGATING
          </div>
          <div className="text-slate-300 font-medium">
            Confidence: <span className="text-emerald-400 font-semibold ml-1">0.82</span>
          </div>
          <button className="flex items-center space-x-1.5 px-4 py-1.5 bg-dark-800 hover:bg-slate-700 border border-slate-600 rounded-md text-white transition-colors">
            <CheckCircle className="w-4 h-4" />
            <span>Mark as Reviewed</span>
          </button>
        </div>
      </div>

      <div className="glass-panel flex-1 flex flex-col overflow-hidden">
        {/* Tabs */}
        <div className="border-b border-slate-700/50 flex overflow-x-auto bg-dark-800/40">
          {['Overview', 'Telemetry', 'Logs', 'Procedures', 'Historical Incidents', 'Timeline', 'Audit Trail'].map((tab, i) => (
            <button 
              key={tab}
              className={clsx(
                "px-6 py-3.5 text-sm font-medium whitespace-nowrap border-b-2 transition-colors",
                i === 0 
                  ? "border-primary-main text-primary-400 bg-primary-main/5" 
                  : "border-transparent text-slate-400 hover:text-slate-200 hover:bg-slate-800/50"
              )}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="flex-1 p-6 grid grid-cols-2 gap-6 overflow-auto">
          {/* Anomaly Card */}
          <div className="bg-dark-900 border border-red-900/50 rounded-xl p-5 shadow-lg relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/5 rounded-bl-full z-0"></div>
            <div className="relative z-10">
              <div className="flex items-start space-x-3 mb-4">
                <AlertTriangle className="w-5 h-5 text-red-500 mt-1" />
                <div>
                  <h2 className="text-base font-semibold text-white">Battery thermal anomaly detected</h2>
                  <p className="text-xs text-slate-400 mt-0.5">Detected at 14:32:15 UTC</p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 mt-6 text-sm">
                <div>
                  <div className="text-slate-500 text-xs mb-1">Subsystem</div>
                  <div className="font-medium text-slate-300">POWER</div>
                </div>
                <div>
                  <div className="text-slate-500 text-xs mb-1">Severity</div>
                  <div className="font-medium flex items-center space-x-1.5">
                    <span className="w-2 h-2 rounded-full bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.6)]"></span>
                    <span className="text-red-400">High</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* AI Copilot Card */}
          <div className="bg-[#0e2142] border border-primary-900 rounded-xl p-5 shadow-lg relative overflow-hidden flex flex-col justify-between">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary-main/10 rounded-bl-full z-0"></div>
            <div className="relative z-10 flex-1">
              <div className="flex items-center space-x-2 mb-4">
                <div className="p-1 rounded bg-primary-ma text-primary-400 bg-primary-main/20">
                  <Database className="w-4 h-4" />
                </div>
                <h2 className="text-sm font-semibold text-primary-300">AI Copilot</h2>
              </div>
              
              <p className="text-sm text-slate-300 leading-relaxed">
                The battery temperature increase appears to be related to an elevated battery current, which preceded the temperature rise by 2 minutes. The current increase corresponds with telemetry parameters going out of expected ranges.
              </p>
            </div>

            <div className="flex items-center space-x-4 mt-4 relative z-10 text-xs text-primary-400 font-medium pt-3 border-t border-primary-900/50">
              <button className="hover:text-primary-300">View Source Evidence</button>
              <button className="hover:text-primary-300">Show Timeline</button>
              <button className="hover:text-primary-300">What should we investigate next?</button>
            </div>
          </div>

          {/* Key Findings */}
          <div className="bg-dark-900 border border-slate-700/50 rounded-xl p-5 flex flex-col h-full">
            <h2 className="text-sm font-semibold text-slate-200 mb-4">Key Findings</h2>
            
            <div className="grid grid-cols-4 gap-4 flex-1 items-center justify-center text-center">
              <div className="flex flex-col items-center">
                <div className="w-10 h-10 rounded-full bg-blue-900/30 text-blue-400 flex items-center justify-center mb-2">
                  <FileText className="w-4 h-4" />
                </div>
                <div className="text-xs text-slate-400">Observed Facts</div>
                <div className="text-lg font-bold text-white mt-1">5</div>
              </div>
              
               <div className="flex flex-col items-center">
                <div className="w-10 h-10 rounded-full bg-amber-900/30 text-amber-400 flex items-center justify-center mb-2">
                  <ChevronRight className="w-4 h-4" />
                </div>
                <div className="text-xs text-slate-400">Inferences</div>
                <div className="text-lg font-bold text-white mt-1">2</div>
              </div>

               <div className="flex flex-col items-center">
                <div className="w-10 h-10 rounded-full bg-emerald-900/30 text-emerald-400 flex items-center justify-center mb-2">
                  <CheckCircle className="w-4 h-4" />
                </div>
                <div className="text-xs text-slate-400">Recommendations</div>
                <div className="text-lg font-bold text-white mt-1">3</div>
              </div>

              <div className="flex flex-col items-center">
                <div className="w-10 h-10 rounded-full bg-indigo-900/30 text-indigo-400 flex items-center justify-center mb-2">
                  <Database className="w-4 h-4" />
                </div>
                <div className="text-xs text-slate-400">Evidence</div>
                <div className="text-lg font-bold text-white mt-1">8</div>
              </div>
            </div>
          </div>

          {/* Next Steps */}
          <div className="bg-dark-900 border border-slate-700/50 rounded-xl p-5">
             <h2 className="text-sm font-semibold text-slate-200 mb-4">Next Steps</h2>
             <div className="space-y-3">
               {nextSteps.map((step, i) => (
                 <div key={i} className="flex items-start justify-between p-3 rounded-lg bg-dark-800/50 border border-slate-700/30 text-sm text-slate-300">
                    <div className="flex items-start space-x-3">
                      <span className="text-primary-500 font-medium">{i + 1}</span>
                      <span>{step}</span>
                    </div>
                 </div>
               ))}
             </div>
          </div>

        </div>
      </div>
    </div>
  );
}
