import React from 'react';
import { useNavigate } from 'react-router-dom';

function Bienvenida() {
  const navigate = useNavigate();

  const irAlInventario = () => {
    navigate('/inventario');
  };

  return (
    <div style={styles.container}>
      <div style={styles.overlay}></div>
      <div style={styles.content}>
        <h1 style={styles.title}>¡Bienvenido a Tu Gestión de Inventario!</h1>
        <p style={styles.subtitle}>Controla, organiza y optimiza tu inventario de manera sencilla.</p>
        <button style={styles.btn} onClick={irAlInventario}>Ir al Inventario</button>
      </div>
    </div>
  );
}

const styles = {
  container: {
    position: 'relative',
    width: '100%',
    height: '100vh',
    backgroundImage: 'url(https://via.placeholder.com/1920x1080)', // Reemplaza con la URL de tu imagen de fondo
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Oscurece la imagen de fondo
  },
  content: {
    position: 'relative',
    zIndex: 2,
    textAlign: 'center',
    color: 'white',
    paddingTop: '20%',
  },
  title: {
    fontSize: '4em',
    fontWeight: 'bold',
    marginBottom: '20px',
    textShadow: '2px 2px 8px rgba(0, 0, 0, 0.7)',
  },
  subtitle: {
    fontSize: '1.5em',
    marginBottom: '40px',
    textShadow: '2px 2px 8px rgba(0, 0, 0, 0.7)',
  },
  btn: {
    padding: '15px 30px',
    fontSize: '1.5em',
    color: 'white',
    backgroundColor: '#ff5722',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
    boxShadow: '2px 2px 10px rgba(0, 0, 0, 0.5)',
  },
  btnHover: {
    backgroundColor: '#e64a19',
  },
};

export default Bienvenida;
