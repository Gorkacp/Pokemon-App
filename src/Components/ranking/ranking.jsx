import React, { useState, useEffect } from 'react';
import { getFirestore, collection, query, orderBy, limit, getDocs } from 'firebase/firestore';
import './ranking.css'; // Importa el archivo CSS

function Ranking() {
  // Define un estado para almacenar el usuario con más puntos
  const [topUser, setTopUser] = useState(null);
  // Obtiene una instancia de Firestore
  const db = getFirestore();

  useEffect(() => {
    // Función asíncrona para obtener el usuario con más puntos
    const fetchTopUser = async () => {
      try {
        // Referencia a la colección 'ranking' en Firestore
        const rankingRef = collection(db, 'ranking');
        // Crea una consulta para ordenar por puntos en orden descendente y limitar a 1 resultado
        const q = query(rankingRef, orderBy('points', 'desc'), limit(1));
        // Ejecuta la consulta y obtiene los documentos
        const querySnapshot = await getDocs(q);

        // Si la consulta no está vacía, obtiene los datos del primer documento
        if (!querySnapshot.empty) {
          const topUserData = querySnapshot.docs[0].data();
          // Actualiza el estado con los datos del usuario
          setTopUser(topUserData);
        } else {
          console.log("No hay datos en la colección 'ranking'");
        }
      } catch (error) {
        console.error("Error al obtener los datos de Firestore: ", error);
      }
    };

    // Llama a la función para obtener el usuario con más puntos
    fetchTopUser();
  }, [db]);

  return (
    <div className="ranking-container">
      <h1>Ranking</h1>
      {topUser ? (
        <div className="top-user">
          <p>Usuario: {topUser.user}</p>
          <p>Puntos: {topUser.points}</p>
        </div>
      ) : (
        <p>Cargando...</p>
      )}
    </div>
  );
}

export default Ranking;