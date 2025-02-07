import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, googleProvider } from '../../config.js';
import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import './login.css'; // Importa el archivo CSS

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log('Inicio de sesión exitoso');
      navigate('/'); // Redirige al inicio
    } catch (error) {
      setError('Error al iniciar sesión: ' + error.message);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      console.log('Inicio de sesión con Google exitoso');
      navigate('/'); // Redirige al inicio
    } catch (error) {
      setError('Error al iniciar sesión con Google: ' + error.message);
    }
  };

  return (
    <div className="login-container">
      <h1>Iniciar Sesión</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Contraseña:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Iniciar Sesión</button>
      </form>
      <button className="google-login" onClick={handleGoogleLogin}>Iniciar Sesión con Google</button>
      {error && <p>{error}</p>}
    </div>
  );
}

export default Login;