import { useState, useEffect } from 'react';
import { getFirestore, collection, addDoc, query, where, getDocs, updateDoc, doc } from 'firebase/firestore';
import { auth } from '../../config'; // Asegúrate de que auth esté configurado en config.js
import './Jugar.css'; // Importa el archivo CSS

function Jugar() {
  const [answer, setAnswer] = useState('');
  const [pokemon, setPokemon] = useState('');
  const [message, setMessage] = useState('');
  const [points, setPoints] = useState(0);
  const [imageUrl, setImageUrl] = useState('');
  const [attempts, setAttempts] = useState(0); // Contador de intentos fallidos
  const db = getFirestore();

  useEffect(() => {
    getRandomPokemon();
  }, []);

  const getRandomPokemon = () => {
    const randomId = Math.floor(Math.random() * 898) + 1; // Hay 898 Pokémon en la API
    fetch(`https://pokeapi.co/api/v2/pokemon/${randomId}`)
      .then(response => response.json())
      .then(data => {
        setPokemon(data.name);
        setImageUrl(data.sprites.front_default);
        setAttempts(0); // Restablecer el contador de intentos fallidos
      });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (answer.toLowerCase() === pokemon) {
      setMessage('¡Correcto!');
      setPoints(points + 1);
      // Guardar los puntos en Firebase
      try {
        const user = auth.currentUser.email;
        const rankingRef = collection(db, 'ranking');
        const q = query(rankingRef, where('user', '==', user));
        const querySnapshot = await getDocs(q);

        if (querySnapshot.empty) {
          // Si el usuario no existe en la colección, agregar un nuevo documento
          await addDoc(rankingRef, {
            user: user,
            points: points + 1
          });
        } else {
          // Si el usuario ya existe, actualizar sus puntos
          const userDoc = querySnapshot.docs[0];
          const userRef = doc(db, 'ranking', userDoc.id);
          await updateDoc(userRef, {
            points: points + 1
          });
        }
      } catch (error) {
        console.error('Error al guardar los puntos: ', error);
      }
      getRandomPokemon(); // Obtener un nuevo Pokémon aleatorio
    } else {
      setMessage('Intenta de nuevo');
      setAttempts(attempts + 1);
      if (attempts + 1 >= 3) {
        getRandomPokemon(); // Cambiar de Pokémon después de 3 intentos fallidos
      }
    }
    setAnswer(''); // Limpiar el campo de respuesta
  };

  return (
    <div className="jugar-container">
      <h1>Juego de Adivina el Pokemon</h1>
      <p>Adivina el nombre del Pokemon</p>
      {imageUrl && <img className="pokemon-image" src={imageUrl} alt={pokemon} />}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          placeholder="Escribe el nombre del Pokemon"
        />
        <button type="submit">Adivinar</button>
      </form>
      <p>{message}</p>
      <p>Puntos: {points}</p>
      <p>Intentos fallidos: {attempts}</p>
    </div>
  );
}

export default Jugar;