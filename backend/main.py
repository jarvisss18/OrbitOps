from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
from dotenv import load_dotenv
import os

from models import Anomaly, CopilotQuery, CopilotResponse
from engine import generate_investigation
from rag_engine import rag_engine

# Load environment variables
load_dotenv()

app = FastAPI(title="Mission Operations Copilot API")

# Configure CORS for frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Adjust in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def root():
    return {"status": "online", "service": "Mission Operations Copilot"}

@app.get("/api/health")
def health_check():
    return {"status": "healthy"}

@app.get("/api/anomalies", response_model=list[Anomaly])
def get_anomalies():
    return [
        {"id": "ANOM-004", "timeUTC": "14:32", "subsystem": "POWER", "severity": "High", "status": "Investigating", "confidence": 0.82, "title": "Battery Thermal Anomaly"},
        {"id": "ANOM-003", "timeUTC": "12:18", "subsystem": "COMM", "severity": "Medium", "status": "New", "confidence": 0.61, "title": "Packet transmission delay"}
    ]

@app.get("/api/investigations/{anomaly_id}")
def get_investigation(anomaly_id: str):
    return generate_investigation(anomaly_id)

@app.post("/api/copilot/query", response_model=CopilotResponse)
def copilot_query(query: CopilotQuery):
    evidence = rag_engine.retrieve_evidence(query.query)
    return rag_engine.query_copilot(query.query, evidence)

if __name__ == "__main__":
    port = int(os.getenv("PORT", 8000))
    uvicorn.run("main:app", host="0.0.0.0", port=port, reload=True)
