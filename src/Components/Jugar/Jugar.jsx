import { useState, useEffect } from 'react';
import { getFirestore, collection, addDoc, query, where, getDocs, updateDoc, doc } from 'firebase/firestore';
import { auth } from '../../config'; // Asegúrate de que auth esté configurado en config.js
import './Jugar.css'; 

function Jugar() {
  // Definición de estados para manejar diferentes variables
  const [answer, setAnswer] = useState(''); // Estado para la respuesta del usuario
  const [pokemon, setPokemon] = useState(''); // Estado para el nombre del Pokémon
  const [message, setMessage] = useState(''); // Estado para el mensaje de retroalimentación
  const [points, setPoints] = useState(0); // Estado para los puntos del usuario
  const [imageUrl, setImageUrl] = useState(''); // Estado para la URL de la imagen del Pokémon
  const [attempts, setAttempts] = useState(0); // Estado para el contador de intentos fallidos
  const db = getFirestore(); // Inicializa Firestore

  // useEffect para obtener un Pokémon aleatorio cuando el componente se monta
  useEffect(() => {
    getRandomPokemon();
  }, []);

  // Función para obtener un Pokémon aleatorio de la API
  const getRandomPokemon = () => {
    const randomId = Math.floor(Math.random() * 898) + 1; // Todos los pokemon
    fetch(`https://pokeapi.co/api/v2/pokemon/${randomId}`)
      .then(response => response.json())
      .then(data => {
        setPokemon(data.name); //  nombre del Pokémon
        setImageUrl(data.sprites.front_default); // a URL de la imagen del Pokémon
        setAttempts(0); //  contador de intentos fallidos
      });
  };

  // Función para manejar el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault(); // Previene el comportamiento por defecto del formulario
    if (answer.toLowerCase() === pokemon) { // Verifica si la respuesta es correcta y pasa a minuscula
      setMessage('¡Correcto!'); // Establece el mensaje de éxito
      setPoints(points + 1); // Incrementa los puntos
      // Guardar los puntos en Firebase
      try {
        const user = auth.currentUser.email; // Obtiene el email del usuario actual
        const rankingRef = collection(db, 'ranking'); // Referencia a la colección 'ranking'
        const q = query(rankingRef, where('user', '==', user)); // Consulta para verificar si el usuario ya existe en la colección
        const querySnapshot = await getDocs(q);
        // El await se utiliza aquí para esperar a que la promesa devuelta por getDocs(q) se resuelva.
        // Esto significa que el código se detendrá en esta línea hasta que los datos se hayan recuperado completamente.
        // Una vez que la promesa se resuelve, querySnapshot contendrá los datos obtenidos.

        if (querySnapshot.empty) { //Comprueba si la consulta  a la bd esta vacia
          // La función `addDoc` se utiliza para agregar un nuevo documento a la colección referenciada por `rankingRef`.
          // `rankingRef` es una referencia a una colección en Firestore.
          // El objeto que se pasa como segundo argumento contiene los datos que se almacenarán en el nuevo documento para sumar los puntos
          await addDoc(rankingRef, {
            user: user,
            points: points + 1
          });
        } else {
          // Si el usuario ya existe, actualizar sus puntos
          const userDoc = querySnapshot.docs[0];
          const userRef = doc(db, 'ranking', userDoc.id);
          await updateDoc(userRef, { // Actualiza el documento referenciado por 'userRef' con los nuevos datos proporcionados
            points: points + 1
          });
        }
      } catch (error) {
        console.error('Error al guardar los puntos: ', error);
      }
      getRandomPokemon(); // Obtener un nuevo Pokémon aleatorio
    } else {
      setMessage('Intenta de nuevo'); // Establece el mensaje de error
      setAttempts(attempts + 1); // Incrementa el contador de intentos fallidos
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
      {imageUrl && <img className="pokemon-image" src={imageUrl} alt={pokemon} />} {/* Muestra la imagen del Pokémon si está disponible */}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          placeholder="Escribe el nombre del Pokemon"
        />
        <button type="submit">Adivinar</button>
      </form>
      <p>{message}</p> {/* Muestra el mensaje de retroalimentación */}
      <p>Puntos: {points}</p> {/* Muestra los puntos del usuario */}
      <p>Intentos fallidos: {attempts}</p> {/* Muestra el contador de intentos fallidos */}
    </div>
  );
}

export default Jugar;