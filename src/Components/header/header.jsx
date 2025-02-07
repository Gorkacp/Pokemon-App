import './header.css';
import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Jugar from '../Jugar/Jugar.jsx'; 

import { auth } from '../../config.js';
import { onAuthStateChanged, signOut } from 'firebase/auth';

export function Header() {
  const [estaIniciado, setEstaIniciado] = useState(false);
  const [nombreUsuario, setNombreUsuario] = useState('');
  const [menuAbierto, setMenuAbierto] = useState(false);

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

  const toggleMenu = () => {
    setMenuAbierto(!menuAbierto);
  };

  return (
    <>
      <nav className="custom-navbar">
        <div className="navbar-container">  
          <button className="navbar-toggler" type="button" onClick={toggleMenu}>
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className={`navbar-links ${menuAbierto ? 'active' : ''}`}>
            <ul className="nav-list">
              <Link className="nav-link" to="/" onClick={toggleMenu}>
                <li className="nav-item">
                  <span className="nav-link-text">Inicio</span>
                </li>
              </Link>
              <Link className="nav-link" to="/pokemon" onClick={toggleMenu}>
                <li className="nav-item">
                  <span className="nav-link-text">Pokémons</span>
                </li>
              </Link> 

              {estaIniciado && (
                <Link className="nav-link" to="/jugar" onClick={toggleMenu}>
                  <li className="nav-item">
                    <span className="nav-link-text">Juegos</span>
                  </li>
                </Link>
              )}

              {estaIniciado && (
                <Link className="nav-link" to="/ranking" onClick={toggleMenu}>
                  <li className="nav-item">
                    <span className="nav-link-text">Ranking</span>
                  </li>
                </Link>
              )}

              {!estaIniciado && (
                <Link className="nav-link" to="/login" onClick={toggleMenu}>
                  <li className="nav-item">
                    <span className="nav-link-text">Iniciar Sesión</span>
                  </li>
                </Link>
              )}
            </ul>
            {estaIniciado && (
              <div className="user-container">
                <span className="usuario-nombre">{nombreUsuario}</span>
                <li className="nav-item nav-link-logout" onClick={() => { cerrarSesion(); toggleMenu(); }}>
                  <span className="nav-link-text">Cerrar Sesión</span>
                </li>
              </div>
            )}
          </div>
        </div>
      </nav>
    </>
  );
}