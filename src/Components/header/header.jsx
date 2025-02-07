import './Header.css';
import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Jugar from '../Jugar/Jugar.jsx'; 

import { auth } from '../../config.js';
import { onAuthStateChanged, signOut } from 'firebase/auth';

export function Header() {
  const [estaIniciado, setEstaIniciado] = useState(false);
  const [nombreUsuario, setNombreUsuario] = useState('');

  useEffect(() => {
    // Escuchamos el cambio en el estado de autenticación
    const comprobarInicioSesion = onAuthStateChanged(auth, (user) => {
      if (user) {
        setEstaIniciado(true);
        setNombreUsuario(user.displayName || user.email);
      } else {
        setEstaIniciado(false); 
        setNombreUsuario('');
      }
    });

    return () => comprobarInicioSesion(); 
  }, []);

  const cerrarSesion = async () => {
    try {
      await signOut(auth); 
      console.log("Sesión cerrada");
    } 
    catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  return (
    <>
      <nav className="custom-navbar">
        <div className="navbar-container"> 
          <button className="navbar-toggler" type="button">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="navbar-links">
            <ul className="nav-list">
              <Link className="nav-link" to="/">
                <li className="nav-item">
                  <span className="nav-link-text">Inicio</span>
                </li>
              </Link>
              <Link className="nav-link" to="/pokemon">
                <li className="nav-item">
                  <span className="nav-link-text">Pokémons</span>
                </li>
              </Link> 

              {estaIniciado && (
                <Link className="nav-link" to="/juego">
                  <li className="nav-item">
                    <span className="nav-link-text">Juegos</span>
                  </li>
                </Link>
              )}

              {estaIniciado && (
                <Link className="nav-link" to="/ranking">
                  <li className="nav-item">
                    <span className="nav-link-text">Ranking</span>
                  </li>
                </Link>
              )}

              {!estaIniciado && (
                <Link className="nav-link" to="/login">
                  <li className="nav-item">
                    <span className="nav-link-text">Iniciar Sesión</span>
                  </li>
                </Link>
              )}

              {estaIniciado && (
                <li className="nav-item nav-link-logout" onClick={cerrarSesion}>
                  <span className="nav-link-text">Cerrar Sesión</span>
                </li>
              )}

              {estaIniciado && (
                <li className="nav-item">
                  <span className="usuario-nombre">{nombreUsuario}</span>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}