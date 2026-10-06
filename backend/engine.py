from models import InvestigationResult
from rag_engine import rag_engine

def generate_investigation(anomaly_id: str) -> InvestigationResult:
    # 1. Retrieve initial context based on anomaly ID
    evidence = rag_engine.retrieve_evidence(f"anomaly {anomaly_id}")
    
    evidence_ids = [e["id"] for e in evidence]
    
    # 2. Return structured format (Mocked for demo scenario)
    return InvestigationResult(
        anomaly_id=anomaly_id,
        observed_facts=[
            "Battery current increased from 15.8A to 18.7A.",
            "Battery temperature increased by 8°C.",
            "FDIR generated a power subsystem warning.",
            "Packet transmission was delayed."
        ],
        evidence_ids=evidence_ids,
        inferences=[
            "Elevated power consumption may be contributing to the observed battery temperature increase.",
            "The communication delay is likely a secondary effect of processing overhead or minor voltage drop during the surge."
        ],
        recommendations=[
            "Check battery load and compare current draw against the expected operating range.",
            "Review procedure PWR-204 for Battery Thermal Investigation.",
            "Review historical incident INC-102 for similar battery load issues."
        ],
        confidence=0.82,
        limitations=[
            "Available data does not establish definitive root cause.",
            "Need payload telemetry to rule out unintended load."
        ]
    )
