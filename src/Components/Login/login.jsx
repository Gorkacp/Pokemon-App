import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, googleProvider } from '../../config.js';
import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import './login.css'; // Importa el archivo CSS

function Login() {
  // Definimos los estados locales para email, password y error
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); // Hook para la navegación

  // Función que maneja el envío del formulario de inicio de sesión
  // La palabra clave 'async' se utiliza para declarar una función asíncrona.
  // Una función asíncrona es una función que opera de manera asíncrona 
  // utilizando el bucle de eventos, permitiendo el uso de la palabra clave 'await' 
  // dentro de ella para esperar la resolución de promesas.
  const handleSubmit = async (e) => {
    e.preventDefault(); // Previene el comportamiento por defecto del formulario
    try {
      // Intenta iniciar sesión con email y contraseña usando Firebase
      await signInWithEmailAndPassword(auth, email, password);
      console.log('Inicio de sesión exitoso');
      navigate('/'); // Redirige al inicio
    } catch (error) {
      // Si hay un error, actualiza el estado de error con el mensaje del error
      setError('Error al iniciar sesión: ' + error.message);
    }
  };

  // Función que maneja el inicio de sesión con Google
  // La palabra clave 'async' se utiliza para declarar una función asíncrona.
  // Una función asíncrona es una función que opera de manera asíncrona 
  // utilizando el bucle de eventos, permitiendo el uso de la palabra clave 'await' 
  // dentro de ella para esperar la resolución de promesas.
  const handleGoogleLogin = async () => {
    try {
      // Intenta iniciar sesión con Google usando Firebase
      await signInWithPopup(auth, googleProvider);
      console.log('Inicio de sesión con Google exitoso');
      navigate('/'); // Redirige al inicio
    } catch (error) {
      // Si hay un error, actualiza el estado de error con el mensaje del error
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