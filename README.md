# Sentiment Analysis App

A modern web application for sentiment analysis using React and FastAPI. The app provides a clean black and white interface for analyzing text sentiment with real-time predictions powered by HuggingFace models.

## Features

- **User Authentication**: Secure login system with JWT tokens
- **Sentiment Analysis**: Real-time text sentiment analysis with confidence scores
- **Modern UI**: Clean black and white design with smooth animations
- **Responsive Design**: Works on desktop and mobile devices
- **Real-time Feedback**: Loading states and error handling

## Tech Stack

### Frontend
- **React** 19.2.0
- **React Router DOM** 7.9.6 - Client-side routing
- **Axios** 1.13.2 - HTTP client for API requests
- **Tailwind CSS** 4.1.17 - Utility-first CSS framework

### Backend
- **FastAPI** - Modern Python web framework
- **HuggingFace Transformers** - Sentiment analysis model

## Prerequisites

Before running this project, make sure you have:

- Node.js (v14 or higher)
- npm or yarn
- Python 3.8+
- FastAPI backend running on `http://127.0.0.1:8000`

## Installation

### 1. Clone the repository

```bash
git clone <your-repository-url>
cd apifast
```

### 2. Install dependencies

```bash
npm install
```

### 3. Start the development server

```bash
npm start
```

The app will open at `http://localhost:3000`

## Project Structure

```
apifast/
├── public/
│   └── index.html          # HTML template
├── src/
│   ├── pages/
│   │   ├── Login.js        # Login page component
│   │   └── Sentiment.js    # Sentiment analysis page
│   ├── App.js              # Main app component with routing
│   ├── index.js            # React entry point
│   └── index.css           # Global styles with Tailwind
├── tailwind.config.js      # Tailwind configuration
├── postcss.config.js       # PostCSS configuration
└── package.json            # Project dependencies
```

## Usage

### 1. Login

- Navigate to `http://localhost:3000/login`
- Enter your credentials
- Default test account: `string / string`
- Click "Se connecter" to login

### 2. Analyze Sentiment

- After login, you'll be redirected to the sentiment analysis page
- Enter any text in the textarea
- Click "Analyser" to get sentiment analysis
- View results showing:
  - **Score**: 1-5 star rating
  - **Sentiment**: POSITIVE, NEGATIVE, or NEUTRAL
  - **Confidence**: Model confidence percentage

### 3. Logout

- Click the "Déconnexion" button in the top right corner
- You'll be redirected back to the login page

## API Endpoints

The frontend expects the following backend endpoints:

### Authentication
- `POST /auth/login` - User login
  - Request: FormData with `username` and `password`
  - Response: `{ "access_token": "token_string" }`

### Sentiment Analysis
- `POST /predict/?text={text}` - Analyze sentiment
  - Headers: `Authorization: Bearer {token}`
  - Response:
    ```json
    {
      "user": "string",
      "text": "input text",
      "huggingface_raw": [
        [
          {
            "label": "4 stars",
            "score": 0.496
          }
        ]
      ]
    }
    ```

## Configuration

### Backend URL

The backend URL is currently hardcoded to `http://127.0.0.1:8000`. To change it, update the URLs in:
- `src/pages/Login.js` (line 22)
- `src/pages/Sentiment.js` (line 31)

### CORS Configuration

Make sure your FastAPI backend has CORS enabled:

```python
from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

## Available Scripts

### `npm start`
Runs the app in development mode at `http://localhost:3000`

### `npm build`
Builds the app for production to the `build` folder

### `npm test`
Launches the test runner

### `npm eject`
Ejects from Create React App (one-way operation)

## Features in Detail

### Authentication Flow
1. User enters credentials
2. Frontend sends FormData to `/auth/login`
3. Backend validates and returns JWT token
4. Token stored in localStorage
5. Token sent with all subsequent requests

### Sentiment Analysis
1. User enters text
2. Request sent to `/predict/` with Bearer token
3. Backend processes with HuggingFace model
4. Response transformed to user-friendly format
5. Results displayed with score, sentiment, and confidence

### UI/UX Features
- Black and white minimalist design
- Hover effects with scale animations
- Focus states with black rings
- Loading states during API calls
- Error messages with clear feedback
- Smooth transitions and animations

## Troubleshooting

### CORS Errors
If you see CORS errors in the console:
- Ensure FastAPI backend has CORS middleware configured
- Check that `allow_origins` includes `http://localhost:3000`

### Authentication Issues
- Clear localStorage: `localStorage.clear()`
- Check that backend is running on port 8000
- Verify credentials are correct

### Build Issues
- Delete `node_modules` and reinstall: `npm install`
- Clear cache: `npm cache clean --force`

## Console Logging

The app includes detailed console logging for debugging:

**Login:**
- Login API Response
- Access Token

**Sentiment Analysis:**
- Request details (text, token)
- API Response
- Transformed Result
- Score, Sentiment, Confidence

Open browser DevTools (F12) → Console tab to view logs.

## License

This project is licensed under the MIT License.

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Support

For issues or questions, please open an issue on GitHub.
