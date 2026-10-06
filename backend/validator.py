import re
from typing import List, Dict, Optional, Tuple

class EvidenceValidator:
    """
    Implements the 5-step Evidence-Grounded AI rules:
    1. Extract cited evidence IDs.
    2. Verify each ID exists.
    3. Verify the evidence was actually retrieved.
    4. Reject invalid citations.
    5. Prevent unsupported claims via strict filtering.
    """
    
    def __init__(self, valid_document_ids: List[str]):
        # Represents all valid IDs in the entire system database
        self.master_ids = set(valid_document_ids)

    def extract_citations(self, text: str) -> List[str]:
        """Extracts standard citations formatted like [ID]."""
        # Finds patterns like [TEL-4821] or [INC-102]
        pattern = r'\[([A-Z0-9-]+)\]'
        matches = re.findall(pattern, text)
        return list(set(matches))  # Unique IDs only

    def validate_response(self, 
                          generated_text: str, 
                          retrieved_evidence: List[Dict]) -> Tuple[bool, str, List[str]]:
        """
        Validates the LLM response against the retrieved evidence constraints.
        Returns: (is_valid, filtered_text, valid_cited_ids)
        """
        cited_ids = self.extract_citations(generated_text)
        retrieved_ids = {doc["id"] for doc in retrieved_evidence}
        
        filtered_text = generated_text
        valid_citations = []
        
        for cid in cited_ids:
            # Rule 2: Verify ID exists in the master database (we assume anything retrieved is master here, but could check DB directly)
            exists_in_world = cid in self.master_ids
            
            # Rule 3: Verify the evidence was ACTUALLY given in the retrieval context for this specific query
            retrieved_in_context = cid in retrieved_ids
            
            if not exists_in_world or not retrieved_in_context:
                # Rule 4: Reject invalid citation (stripping it out to prevent unsupported claim)
                print(f"[VALIDATION FAILED] Hallucinated or non-retrieved citation detected: {cid}")
                filtered_text = filtered_text.replace(f"[{cid}]", "[CITATION REMOVED]")
            else:
                valid_citations.append(cid)
                
        # Rule 5: If the text relies heavily on removed citations, we could reject it entirely
        if "[CITATION REMOVED]" in filtered_text:
            return False, "Error: The response contained hallucinated or unverified evidence citations.", []
            
        return True, filtered_text, valid_citations

# For the mock/hackathon scoped validation, we use the known IDs from data_loader
VALID_IDS = ["PWR-204", "INC-102", "LOG-223", "TEL-4821", "TEL-4830", "PROC-019"]
validator = EvidenceValidator(valid_document_ids=VALID_IDS)
