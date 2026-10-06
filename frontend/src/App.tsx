import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';

import Dashboard from './pages/Dashboard';
import Anomalies from './pages/Anomalies';
import Timeline from './pages/Timeline';
import Investigations from './pages/Investigations';
import EvidenceExplorer from './pages/EvidenceExplorer';
import Copilot from './pages/Copilot';

import Telemetry from './pages/Telemetry';
import AuditTrail from './pages/Audit';
import Demo from './pages/Demo';

// Placeholder Pages
const Procedures = () => <div className="p-6">Procedures - Mock</div>;
const HistoricalIncidents = () => <div className="p-6">Historical Incidents - Mock</div>;
const Settings = () => <div className="p-6">Settings - Mock</div>;

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Navigate to="/dashboard" replace />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="anomalies" element={<Anomalies />} />
        <Route path="investigations" element={<Investigations />} />
        <Route path="evidence" element={<EvidenceExplorer />} />
        <Route path="copilot" element={<Copilot />} />
        <Route path="telemetry" element={<Telemetry />} />
        <Route path="timeline" element={<Timeline />} />
        <Route path="audit" element={<AuditTrail />} />
        <Route path="demo" element={<Demo />} />
        <Route path="procedures" element={<Procedures />} />
        <Route path="incidents" element={<HistoricalIncidents />} />
        <Route path="settings" element={<Settings />} />
      </Route>
    </Routes>
  );
}
