# Lost and Found AI - Coding Agent Instructions

## Project Overview
Lost and Found AI is an AI-powered campus platform for matching lost and found items. It integrates Google Gemini Vision API for intelligent image/text matching, Firebase (Auth, Firestore, Cloud Storage) for backend services, and a Flask Python backend with vanilla HTML/CSS/JavaScript frontend.

## Architecture

### Backend (Python/Flask)
- **Location**: `backend/app.py`
- **Purpose**: REST API server for item matching and storage operations
- **Framework**: Flask (minimal MVP, currently just a "hello world" server)
- **Key Integration**: Will expose endpoints for frontend to upload items and retrieve matches
- **Dependencies**: See `backend/requirements.txt` (Flask only in MVP)
- **Startup**: `python backend/app.py` (runs on `localhost:5000` by default with debug mode)

### Frontend (Vanilla JavaScript)
- **Location**: `frontend/` (index.html, script.js, style.css)
- **Purpose**: Campus-restricted UI for uploading lost/found items and viewing matches
- **Stack**: Vanilla HTML/CSS/JS (no frameworks)
- **Key Feature**: Image upload capability for AI matching
- **Note**: Currently minimal - expects expansion for authentication UI and item management

### Google Services Integration
- **Gemini Vision API**: For analyzing uploaded item images and descriptions
- **Firebase Authentication**: Campus-restricted login (configured for specific email domain)
- **Firebase Firestore**: Stores item records and match results
- **Firebase Cloud Storage**: Stores uploaded item images
- **Integration Point**: Flask backend should handle Gemini API calls; frontend authenticates via Firebase SDK

## Development Workflows

### Running the Backend
```bash
cd backend
pip install -r requirements.txt
python app.py
```
The Flask server starts in debug mode. Modify endpoints in `app.py` to add functionality.

### Running the Frontend
Open `frontend/index.html` in a browser or serve via a local HTTP server:
```bash
python -m http.server 8000  # then visit http://localhost:8000/frontend/
```

### Building/Testing
The workspace includes Maven tasks (legacy or reference), but this is a Python/JavaScript project. MVP testing is manual for now—no automated test suites present.

## Code Patterns & Conventions

### Flask Backend
- **Route Pattern**: Use `@app.route()` decorator with HTTP method arguments
- **Return Format**: Return strings or JSON for API responses
- **Config**: Google API credentials and Firebase config should be stored as environment variables (not in code)

### Frontend JavaScript
- **No Frameworks**: Keep code simple and direct (no React, Vue, etc.)
- **Style Approach**: Inline CSS in `style.css`; minimal styling in MVP
- **Console Logging**: Basic debugging via `console.log()` (e.g., `script.js` line 1)

## Critical Developer Notes

### Security & Auth
- Campus login is enforced via Firebase Authentication (configure allowed email domain in Firebase Console)
- API keys and credentials must never be hardcoded—use environment variables
- Firestore security rules must restrict access to authenticated campus users only

### Data Flow for Item Matching
1. User uploads image + description via frontend
2. Frontend sends to Flask backend with Firebase auth token
3. Backend calls Gemini Vision API to analyze image
4. Backend stores item record in Firestore + image in Cloud Storage
5. Backend queries Firestore for potential matches (text/image similarity)
6. Frontend receives matches and displays them to user

### Common Pitfalls to Avoid
- **No API endpoints yet**: The backend is a skeleton—all Gemini and Firestore integration is TODO
- **No error handling**: Plan to add try-catch blocks in Flask routes and frontend fetch calls
- **Firebase SDK not initialized**: Frontend will need Firebase SDK setup in `script.js` before auth/Firestore calls work
- **CORS issues**: Flask backend must enable CORS for frontend requests (use `flask-cors` package)

## File Reference
- **Backend**: `backend/app.py` (main Flask app), `backend/requirements.txt` (dependencies)
- **Frontend**: `frontend/index.html` (structure), `frontend/script.js` (logic), `frontend/style.css` (styling)
- **Docs**: `README.md` (problem statement and tech stack)

## Next Steps for Development
1. Expand Flask API with `/upload`, `/search`, `/match` endpoints
2. Initialize Firebase SDK in frontend `script.js`
3. Add form handling in `index.html` for item upload
4. Implement Gemini Vision API calls in backend
5. Set up Firestore database schema for items and matches
