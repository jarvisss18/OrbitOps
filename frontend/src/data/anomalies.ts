export interface Anomaly {
  id: string;
  timeUTC: string;
  subsystem: string;
  severity: 'High' | 'Medium' | 'Low';
  status: 'New' | 'Investigating' | 'Evidence Collected' | 'Closed' | 'Not Started' | 'In Progress';
  confidence: number;
  title: string;
}

export const mockAnomalies: Anomaly[] = [
  { id: 'ANOM-004', timeUTC: '14:32', subsystem: 'POWER', severity: 'High', status: 'Investigating', confidence: 0.82, title: 'Battery Thermal Anomaly' },
  { id: 'ANOM-003', timeUTC: '12:18', subsystem: 'COMM', severity: 'Medium', status: 'New', confidence: 0.61, title: 'Packet transmission delay' },
  { id: 'ANOM-002', timeUTC: '09:14', subsystem: 'THERMAL', severity: 'Low', status: 'Evidence Collected', confidence: 0.74, title: 'Radiator temp fluctuation' },
  { id: 'ANOM-001', timeUTC: '06:47', subsystem: 'ATTITUDE', severity: 'Medium', status: 'Closed', confidence: 0.92, title: 'Gyroscope drift' },
  { id: 'ANOM-000', timeUTC: '02:31', subsystem: 'PAYLOAD', severity: 'Low', status: 'Closed', confidence: 0.88, title: 'Sensor recalibration' },
];
