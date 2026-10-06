import chromadb
from typing import List, Dict

# Synthetic data grounded in our Battery Thermal Anomaly scenario
DOCUMENTS = [
    {
        "id": "PWR-204",
        "text": "Battery Thermal Investigation Procedure: If battery current exceeds 18A and temperature rises >5°C within 3 minutes, operator must cross-reference FDIR logs. If FDIR isolated power subsystem, suspect physical short or sensor fault. Recommendation is to isolate battery string.",
        "metadata": {"source_type": "Procedure", "subsystem": "POWER", "timestamp": "N/A"}
    },
    {
        "id": "INC-102",
        "text": "Historical Incident 102: Communication lag accompanied by unexpected battery drain. Root cause determined to be background processing error causing CPU spike. Solved by restarting the processing module.",
        "metadata": {"source_type": "Historical Incident", "subsystem": "POWER_COMM", "timestamp": "2024-03-12"}
    },
    {
        "id": "LOG-223",
        "text": "FDIR warning generated for POWER subsystem. Isolation algorithms flagged battery string B.",
        "metadata": {"source_type": "Log", "subsystem": "THERMAL", "timestamp": "14:32:04"}
    },
    {
        "id": "TEL-4821",
        "text": "Telemetry Summary: Battery current peaked at 18.7A. Expected range is 15-17A. Minor voltage droop detected.",
        "metadata": {"source_type": "Telemetry", "subsystem": "POWER", "timestamp": "14:32:15"}
    },
    {
        "id": "TEL-4830",
        "text": "Telemetry Summary: Battery temperature increased by 8°C above nominal baseline. Rapid slope detected.",
        "metadata": {"source_type": "Telemetry", "subsystem": "POWER", "timestamp": "14:32:17"}
    },
    {
        "id": "PROC-019",
        "text": "Reaction Wheel Standard Operating Procedure. To desaturate wheels, fire thrusters for 3 seconds according to attitude error.",
        "metadata": {"source_type": "Procedure", "subsystem": "AOCS", "timestamp": "N/A"}
    }
]

def load_data():
    print("Initializing ChromaDB...")
    client = chromadb.PersistentClient(path="./chroma_db")
    
    # Reset collection if exists to allow fresh re-indexing
    try:
        client.delete_collection("mission_data")
    except:
        pass
        
    collection = client.create_collection(
        name="mission_data",
        metadata={"hnsw:space": "cosine"}
    )
    
    print("Indexing documents...")
    ids = [doc["id"] for doc in DOCUMENTS]
    documents = [doc["text"] for doc in DOCUMENTS]
    metadatas = [doc["metadata"] for doc in DOCUMENTS]
    
    collection.add(
        ids=ids,
        documents=documents,
        metadatas=metadatas
    )
    print(f"Successfully indexed {len(DOCUMENTS)} mission documents!")

if __name__ == "__main__":
    load_data()
