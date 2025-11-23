import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Sentiment({ setIsAuthenticated }) {
  const [text, setText] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    navigate('/login');
  };

  const analyzeSentiment = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    setResult(null);

    try {
      const token = localStorage.getItem('token');
      console.log('Sending request to API...');
      console.log('Text:', text);
      console.log('Token:', token);

      const response = await axios.post(
        `http://127.0.0.1:8000/predict/?text=${encodeURIComponent(text)}`,
        {},
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );

      console.log('Sentiment API Response:', response.data);

      // Transform the HuggingFace response to our expected format
      const predictions = response.data.huggingface_raw[0];
      const topPrediction = predictions[0];

      // Extract star rating (e.g., "4 stars" -> 4)
      const scoreMatch = topPrediction.label.match(/(\d+)/);
      const score = scoreMatch ? parseInt(scoreMatch[1]) : 0;

      // Determine sentiment based on score
      let sentiment;
      if (score >= 4) sentiment = 'positive';
      else if (score <= 2) sentiment = 'negative';
      else sentiment = 'neutral';

      const transformedResult = {
        text: response.data.text,
        score: score,
        sentiment: sentiment,
        confidence: topPrediction.score,
        raw: response.data.huggingface_raw
      };

      console.log('Transformed Result:', transformedResult);
      console.log('Score:', score);
      console.log('Sentiment:', sentiment);
      console.log('Confidence:', topPrediction.score);

      setResult(transformedResult);
    } catch (err) {
      console.error('Sentiment Analysis Error:', err);
      console.error('Error Response:', err.response?.data);
      console.error('Status Code:', err.response?.status);

      if (err.response?.status === 401) {
        setError('Session expirée');
        setTimeout(handleLogout, 2000);
      } else {
        setError(err.response?.data?.detail || 'Erreur');
      }
    } finally {
      setLoading(false);
    }
  };

  const getSentimentColor = (sentiment) => {
    if (sentiment === 'positive') return 'bg-green-100 text-green-800';
    if (sentiment === 'negative') return 'bg-red-100 text-red-800';
    return 'bg-yellow-100 text-yellow-800';
  };

  return (
    <div className="min-h-screen p-8 bg-black">
      <div className="max-w-3xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-white">
            Analyse de Sentiment
          </h1>
          <button
            onClick={handleLogout}
            className="bg-white text-black px-6 py-2 rounded-lg hover:bg-gray-200 hover:scale-105 transition-all duration-200 font-semibold"
          >
            Déconnexion
          </button>
        </div>

        <div className="bg-white p-8 rounded-2xl shadow-2xl border-2 border-gray-200">
          <form onSubmit={analyzeSentiment} className="space-y-6">
            <div>
              <label className="block text-lg font-medium mb-3 text-gray-900">
                Entrez votre texte
              </label>
              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black outline-none transition-all"
                placeholder="Écrivez quelque chose..."
                rows="5"
                required
              />
            </div>

            {error && (
              <div className="bg-red-50 text-red-600 p-4 rounded-lg border border-red-200">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-black text-white py-4 rounded-lg font-semibold hover:bg-gray-800 hover:scale-105 transition-all duration-200 disabled:bg-gray-400 disabled:hover:scale-100"
            >
              {loading ? 'Analyse...' : 'Analyser'}
            </button>
          </form>

          {result && (
            <div className="mt-8 p-6 bg-gray-50 rounded-xl border-2 border-gray-200">
              <h2 className="text-2xl font-bold mb-4 text-black">Résultat</h2>
              <div className="space-y-4">
                <p className="italic text-gray-700">"{result.text}"</p>
                <div className="grid grid-cols-3 gap-4">
                  <div className="bg-white p-4 rounded-lg text-center border-2 border-gray-200">
                    <p className="text-sm text-gray-600 font-medium">Score</p>
                    <p className="text-3xl font-bold text-black">{result.score}/5</p>
                  </div>
                  <div className="bg-white p-4 rounded-lg text-center border-2 border-gray-200">
                    <p className="text-sm text-gray-600 mb-2 font-medium">Sentiment</p>
                    <span className={`px-4 py-2 rounded-full font-bold ${getSentimentColor(result.sentiment)}`}>
                      {result.sentiment?.toUpperCase() || 'N/A'}
                    </span>
                  </div>
                  <div className="bg-white p-4 rounded-lg text-center border-2 border-gray-200">
                    <p className="text-sm text-gray-600 font-medium">Confiance</p>
                    <p className="text-3xl font-bold text-black">
                      {result.confidence ? `${(result.confidence * 100).toFixed(1)}%` : 'N/A'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Sentiment;