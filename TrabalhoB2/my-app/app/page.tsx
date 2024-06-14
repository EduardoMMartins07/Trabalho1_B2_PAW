import Link from 'next/link';
import React from 'react';

const Home: React.FC = () => {
  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Trabalho 1 do 2° Bimestre</h1>
      <p style={styles.description}>Neste módulo, vocês irão desenvolver a interface de usuário (front-end) utilizando Next.js para interagir com os serviços que foram implementados no backend.</p>
      <Link href="/login">
        <button style={styles.button}>Ir para a página de Login</button>
      </Link>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column' as 'column',
    alignItems: 'center' as 'center',
    justifyContent: 'center' as 'center',
    height: '100vh',
    textAlign: 'center' as 'center',
    padding: '0 20px',
  },
  title: {
    fontSize: '3.5rem',
    marginBottom: '20px',
    textShadow: '-3px -3px 10px rgba(255, 255, 255, 0.9)', // Sombra branca
  },
  description: {
    fontSize: '1.2rem',
    marginBottom: '40px',
    maxWidth: '600px',
  },
  button: {
    display: 'inline-block',
    padding: '10px 20px',
    fontSize: '16px',
    cursor: 'pointer',
    backgroundColor: '#0070f3',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    transition: 'background-color 0.3s',
    textDecoration: 'none',
  },
};

export default Home;