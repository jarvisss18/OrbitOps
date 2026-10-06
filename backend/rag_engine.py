import os
from typing import List, Dict

class RAGEngine:
    def __init__(self):
        self.api_key = os.getenv("OPENAI_API_KEY")
        self.use_mock = not self.api_key
        
        if not self.use_mock:
            # Initialize Chroma and LangChain in real mode
            pass

    def retrieve_evidence(self, query: str, top_k: int = 5) -> List[Dict]:
        if self.use_mock:
            # Return specific mock evidence for the hackathon demo scenario (Battery Thermal)
            if "battery" in query.lower() or "thermal" in query.lower() or "anom-004" in query.lower():
                return [
                    {
                        "id": "TEL-4821",
                        "source_type": "Telemetry",
                        "timestamp": "14:32:15 UTC",
                        "subsystem": "POWER",
                        "relevant_text": "Battery current was 18.7A (Expected 15-17A)",
                        "relevance_score": 0.96
                    },
                    {
                        "id": "TEL-4830",
                        "source_type": "Telemetry",
                        "timestamp": "14:32:17 UTC",
                        "subsystem": "POWER",
                        "relevant_text": "Battery temperature rose by 8°C above threshold",
                        "relevance_score": 0.91
                    },
                    {
                        "id": "LOG-223",
                        "source_type": "Log",
                        "timestamp": "14:32:04 UTC",
                        "subsystem": "THERMAL",
                        "relevant_text": "FDIR warning triggered for POWER subsystem",
                        "relevance_score": 0.88
                    },
                    {
                        "id": "PWR-204",
                        "source_type": "Procedure",
                        "timestamp": "N/A",
                        "subsystem": "POWER",
                        "relevant_text": "Battery Thermal Investigation procedure recommends checking current load",
                        "relevance_score": 0.84
                    }
                ]
            else:
                return []
        
        # Real retrieval logic would go here
        return []

    def query_copilot(self, query: str, context_evidence: List[Dict]) -> Dict:
        if self.use_mock:
            # Mock Copilot Response
            return {
                "text": "The anomaly was detected due to an increase in battery current (15.8A → 18.7A) followed by a rise in battery temperature (+8°C) and a subsequent FDIR warning. These parameters exceeded their expected ranges and were correlated within a 2-minute window.",
                "evidence": [
                    {"id": "TEL-4821", "desc": "Battery current 18.7A (expected 15-17A)"},
                    {"id": "TEL-4830", "desc": "Battery temperature +8°C"},
                    {"id": "LOG-223", "desc": "FDIR warning (power subsystem)"},
                    {"id": "PWR-204", "desc": "Relevant procedure"}
                ],
                "confidence": 0.82,
                "actions": ["Show evidence", "Show timeline", "Similar incidents", "Which procedure applies?"]
            }
        
        # Real LLM call would go here
        pass

rag_engine = RAGEngine()
