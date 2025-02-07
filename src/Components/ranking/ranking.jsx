import React, { useState, useEffect } from 'react';
import { getFirestore, collection, query, orderBy, limit, getDocs } from 'firebase/firestore';
import './ranking.css'; // Importa el archivo CSS

function Ranking() {
  const [topUser, setTopUser] = useState(null);
  const db = getFirestore();

  useEffect(() => {
    const fetchTopUser = async () => {
      try {
        const rankingRef = collection(db, 'ranking');
        const q = query(rankingRef, orderBy('points', 'desc'), limit(1));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          const topUserData = querySnapshot.docs[0].data();
          setTopUser(topUserData);
        } else {
          console.log("No hay datos en la colección 'ranking'");
        }
      } catch (error) {
        console.error("Error al obtener los datos de Firestore: ", error);
      }
    };

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