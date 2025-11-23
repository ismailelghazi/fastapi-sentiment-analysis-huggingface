import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Login({ setIsAuthenticated }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append('username', username);
      formData.append('password', password);

      const response = await axios.post('http://127.0.0.1:8000/auth/login', formData);

      console.log('Login API Response:', response.data);
      console.log('Access Token:', response.data.access_token);

      localStorage.setItem('token', response.data.access_token);
      setIsAuthenticated(true);
      navigate('/sentiment');
    } catch (err) {
      console.error('Login Error:', err);
      console.error('Error Response:', err.response?.data);
      setError(err.response?.data?.detail || 'Erreur de connexion');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-4 bg-black">
      <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md border-2 border-gray-200">
        <h1 className="text-4xl font-bold text-center text-black mb-8">
          Connexion
        </h1>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">
              Username
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black outline-none transition-all"
              placeholder="Entrez votre username"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black outline-none transition-all"
              placeholder="Entrez votre password"
              required
            />
          </div>

          {error && (
            <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm border border-red-200">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-black text-white py-3 rounded-lg font-semibold hover:bg-gray-800 hover:scale-105 transition-all duration-200 disabled:bg-gray-400 disabled:hover:scale-100"
          >
            {loading ? ' Connexion...' : 'Se connecter'}
          </button>
        </form>

        <div className="mt-6 space-y-3">
          <p className="text-center text-sm text-gray-600">
            Compte test: <strong className="text-black">string / string</strong>
          </p>
          <p className="text-center text-sm text-gray-600">
            Pas de compte?{' '}
            <button
              onClick={() => navigate('/register')}
              className="text-black font-semibold hover:underline"
            >
              S'inscrire
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;