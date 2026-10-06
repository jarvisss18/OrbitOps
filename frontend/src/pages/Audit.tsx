const auditLogs = [
  { time: '08:42:10', actor: 'Operator', action: 'Opened investigation', object: 'ANOM-004', evidence: '-', result: 'Success' },
  { time: '08:42:14', actor: 'System', action: 'RAG retrieval executed', object: '-', evidence: '8 sources', result: 'Success' },
  { time: '08:42:15', actor: 'System', action: 'Retrieved telemetry', object: 'TEL-4821', evidence: '-', result: 'Success' },
  { time: '08:42:16', actor: 'System', action: 'Retrieved procedure', object: 'PWR-204', evidence: '-', result: 'Success' },
  { time: '08:42:19', actor: 'AI Copilot', action: 'Investigation generated', object: 'ANOM-004', evidence: '8 evidence', result: 'Success' },
  { time: '08:42:21', actor: 'Operator', action: 'Viewed recommendation', object: 'ANOM-004', evidence: '-', result: 'Success' },
];

export default function AuditTrail() {
  return (
    <div className="p-6 h-full flex flex-col max-w-7xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-white">Audit Trail</h1>
        <p className="text-slate-400 text-sm mt-1">Complete record of investigation activities</p>
      </div>

      <div className="glass-panel flex-1 flex flex-col overflow-hidden">
        <div className="p-4 border-b border-slate-700/50 flex items-center space-x-4 bg-dark-800/50">
          <select className="bg-dark-900 border border-slate-700 text-slate-300 text-sm rounded-md pl-3 pr-8 py-1.5 outline-none focus:border-primary-main">
            <option>All Actors</option>
            <option>Operator</option>
            <option>System</option>
            <option>AI Copilot</option>
          </select>
          <select className="bg-dark-900 border border-slate-700 text-slate-300 text-sm rounded-md pl-3 pr-8 py-1.5 outline-none focus:border-primary-main">
            <option>All Actions</option>
          </select>
          <select className="bg-dark-900 border border-slate-700 text-slate-300 text-sm rounded-md pl-3 pr-8 py-1.5 outline-none focus:border-primary-main">
            <option>Last 24 Hours</option>
          </select>
          <div className="flex-1"></div>
          <input type="text" placeholder="Search audit events..." className="w-64 bg-dark-900 border border-slate-700 text-slate-300 text-sm rounded-md px-3 py-1.5 outline-none focus:border-primary-main" />
        </div>

        <div className="flex-1 overflow-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-dark-900/80 sticky top-0 border-b border-slate-700/50">
              <tr>
                <th className="px-6 py-3 font-medium text-slate-400">Time (UTC)</th>
                <th className="px-6 py-3 font-medium text-slate-400">Actor</th>
                <th className="px-6 py-3 font-medium text-slate-400">Action</th>
                <th className="px-6 py-3 font-medium text-slate-400">Object</th>
                <th className="px-6 py-3 font-medium text-slate-400">Evidence</th>
                <th className="px-6 py-3 font-medium text-slate-400">Result</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700/50 text-slate-300">
              {auditLogs.map((log, i) => (
                <tr key={i} className="hover:bg-slate-800/30 transition-colors">
                  <td className="px-6 py-3 text-slate-400">{log.time}</td>
                  <td className="px-6 py-3">{log.actor}</td>
                  <td className="px-6 py-3">{log.action}</td>
                  <td className="px-6 py-3 text-slate-400">{log.object}</td>
                  <td className="px-6 py-3 text-slate-400">{log.evidence}</td>
                  <td className="px-6 py-3 text-emerald-400">{log.result}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
