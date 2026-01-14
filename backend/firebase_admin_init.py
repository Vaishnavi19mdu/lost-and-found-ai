import firebase_admin
from firebase_admin import credentials, firestore

# Load Firebase service account
cred = credentials.Certificate("serviceAccountKey.json")

# Initialize app only once
if not firebase_admin._apps:
    firebase_admin.initialize_app(cred)

# Firestore database reference
db = firestore.client()
