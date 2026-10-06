export interface TelemetryPoint {
  time: string;
  batteryCurrent: number;
  batteryTemp: number;
  voltage: number;
}

const generateTelemetry = (): TelemetryPoint[] => {
  const data: TelemetryPoint[] = [];
  // Generating from 14:00 to 15:00
  let current = 16.0;
  let temp = 20.0;
  
  for (let m = 0; m <= 60; m++) {
    const minStr = (m < 10 ? '0' : '') + m;
    const time = `14:${minStr}`;
    
    // Anomaly starts around 14:30
    if (m >= 30) {
      if (m <= 35) current += 0.5; // Starts rising rapidly
      else current = 18.7 + (Math.random() * 0.2 - 0.1); 
      
      if (m >= 32) temp += 0.7; // Temp follows shortly after
    } else {
      current = 15.8 + (Math.random() * 0.4 - 0.2); // Nominal range 15.6 - 16.2
      temp = 20.5 + (Math.random() * 0.2 - 0.1);    // Nominal 20.4 - 20.6
    }
    
    data.push({
      time,
      batteryCurrent: parseFloat(current.toFixed(2)),
      batteryTemp: parseFloat(temp.toFixed(2)),
      voltage: 28.5 + (Math.random() * 0.2 - 0.1)
    });
  }
  return data;
};

export const mockTelemetryData = generateTelemetry();
