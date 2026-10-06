import os
import chromadb
from typing import List, Dict
from validator import validator

class RAGEngine:
    def __init__(self):
        self.api_key = os.getenv("OPENAI_API_KEY")
        self.use_mock_llm = not self.api_key
        
        # Connect to ChromaDB for real local semantic search
        try:
            self.chroma_client = chromadb.PersistentClient(path="./chroma_db")
            self.collection = self.chroma_client.get_collection("mission_data")
        except Exception as e:
            print(f"Warning: Chroma DB not initialized. {e}")
            self.collection = None

    def retrieve_evidence(self, query: str, top_k: int = 4) -> List[Dict]:
        if not self.collection:
            return []
            
        print(f"Retrieving from Chroma for query: {query}")
        results = self.collection.query(
            query_texts=[query],
            n_results=top_k
        )
        
        # Format Chroma results into Evidence dict expected by engine
        evidence_list = []
        if results['ids'] and len(results['ids']) > 0:
            for i in range(len(results['ids'][0])):
                evidence_list.append({
                    "id": results['ids'][0][i],
                    "relevant_text": results['documents'][0][i],
                    "source_type": results['metadatas'][0][i].get("source_type", "Unknown"),
                    "subsystem": results['metadatas'][0][i].get("subsystem", "Unknown"),
                    "timestamp": results['metadatas'][0][i].get("timestamp", "N/A"),
                    "relevance_score": 1.0 - (results['distances'][0][i] if 'distances' in results else 0) # Rough estimate from cosine distance
                })
        
        return evidence_list


    def query_copilot(self, query: str, context_evidence: List[Dict]) -> Dict:
        # 1. Synthesize Prompt (In real life, we would send this to OpenAI)
        context_str = "\n".join([f"[{e['id']}] {e['relevant_text']}" for e in context_evidence])
        
        if self.use_mock_llm:
            # Mock generating an LLM response containing citations
            # We intentionally insert a hallucinated citation [INC-999] sometimes to trigger validation, 
            # but for demo stability we'll use valid ones.
            generated_text = "The anomaly was detected due to an increase in battery current based on [TEL-4821]. This was accompanied by a temperature rise [TEL-4830] triggering a warning [LOG-223]. Please review [PWR-204]."
        else:
            # Code to call real LLM with `context_str` goes here
            generated_text = "..."

        # 2. Strict Evidence Validation (Rule 1-5 Implementation)
        is_valid, filtered_text, valid_ids = validator.validate_response(generated_text, context_evidence)
        
        if not is_valid:
            return {
                "text": filtered_text,
                "evidence": [],
                "confidence": 0.0,
                "actions": ["Reset Investigation"]
            }

        # Filter the returned evidence down to only what was ACTUALLY CITED
        cited_evidence_objs = [e for e in context_evidence if e["id"] in valid_ids]
        
        return {
            "text": filtered_text,
            "evidence": [{"id": e["id"], "desc": e["relevant_text"]} for e in cited_evidence_objs],
            "confidence": 0.89 if is_valid else 0.0,
            "actions": ["Show evidence", "Show timeline", "Similar incidents", "Which procedure applies?"]
        }

rag_engine = RAGEngine()
