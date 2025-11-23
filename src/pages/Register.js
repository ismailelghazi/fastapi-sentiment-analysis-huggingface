import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Register({ setIsAuthenticated }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    // Validate passwords match
    if (password !== confirmPassword) {
      setError('Les mots de passe ne correspondent pas');
      setLoading(false);
      return;
    }

    // Validate password length
    if (password.length < 6) {
      setError('Le mot de passe doit contenir au moins 6 caractères');
      setLoading(false);
      return;
    }

    try {
      // Send as JSON instead of FormData
      const response = await axios.post('http://127.0.0.1:8000/auth/register', {
        username: username,
        password: password
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      console.log('Register API Response:', response.data);

      setSuccess('Inscription réussie! Redirection vers la page de connexion...');

      // Redirect to login after 2 seconds
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (err) {
      console.error('Register Error:', err);
      console.error('Error Response:', err.response?.data);

      // Handle different error formats
      let errorMessage = 'Erreur lors de l\'inscription';

      if (err.response?.data) {
        const errorData = err.response.data;

        // If detail is a string
        if (typeof errorData.detail === 'string') {
          errorMessage = errorData.detail;
        }
        // If detail is an array of validation errors
        else if (Array.isArray(errorData.detail)) {
          errorMessage = errorData.detail.map(e => e.msg || e).join(', ');
        }
        // If there's a message field
        else if (errorData.message) {
          errorMessage = errorData.message;
        }
      }

      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-4 bg-black">
      <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md border-2 border-gray-200">
        <h1 className="text-4xl font-bold text-center text-black mb-8">
          Inscription
        </h1>

        <form onSubmit={handleRegister} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">
              Username
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black outline-none transition-all"
              placeholder="Choisissez un nom d'utilisateur"
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
              placeholder="Minimum 6 caractères"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">
              Confirmez le mot de passe
            </label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black outline-none transition-all"
              placeholder="Confirmez votre mot de passe"
              required
            />
          </div>

          {error && (
            <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm border border-red-200">
              {error}
            </div>
          )}

          {success && (
            <div className="bg-green-50 text-green-600 p-3 rounded-lg text-sm border border-green-200">
              {success}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-black text-white py-3 rounded-lg font-semibold hover:bg-gray-800 hover:scale-105 transition-all duration-200 disabled:bg-gray-400 disabled:hover:scale-100"
          >
            {loading ? 'Inscription...' : 'S\'inscrire'}
          </button>
        </form>

        <p className="text-center text-sm text-gray-600 mt-6">
          Vous avez déjà un compte?{' '}
          <button
            onClick={() => navigate('/login')}
            className="text-black font-semibold hover:underline"
          >
            Se connecter
          </button>
        </p>
      </div>
    </div>
  );
}

export default Register;
