from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime

class Evidence(BaseModel):
    id: str
    source_type: str
    timestamp: Optional[str] = None
    subsystem: str
    relevant_text: str
    relevance_score: float

class AnomalyObservation(BaseModel):
    observation: str

class DiagnosticStep(BaseModel):
    step: str

class InvestigationResult(BaseModel):
    anomaly_id: str
    observed_facts: List[str]
    evidence_ids: List[str]
    inferences: List[str]
    recommendations: List[str]
    confidence: float
    limitations: List[str]

class Anomaly(BaseModel):
    id: str
    timeUTC: str
    subsystem: str
    severity: str
    status: str
    confidence: float
    title: str

class CopilotQuery(BaseModel):
    query: str
    anomaly_id: Optional[str] = None

class CopilotResponse(BaseModel):
    text: str
    evidence: List[dict]
    confidence: float
    actions: List[str]
