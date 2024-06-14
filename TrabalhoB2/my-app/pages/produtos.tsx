import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import '../app/globals.css';

const Products: React.FC = () => {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState('');
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
    } else {
      fetchProducts(token);
    }
  }, []);

  const fetchProducts = async (token: string) => {
    const res = await fetch('http://localhost:5000/products', {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    const data = await res.json();
    setProducts(data);
  };

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCategory(e.target.value);
  };

  const filteredProducts = category
    ? products.filter(product => product.category === category)
    : products;

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Produtos</h1>
      <select onChange={handleFilterChange} style={styles.select}>
        <option value="">Todas as Categorias</option>
        <option value="categoria1">Categoria 1</option>
        <option value="categoria2">Categoria 2</option>
      </select>
      <div style={styles.productList}>
        {filteredProducts.map((product) => (
          <div key={product.id} style={styles.product}>
            <h2 style={styles.productTitle}>{product.name}</h2>
            <p style={styles.productDescription}>{product.description}</p>
            <p style={styles.productCategory}>Categoria: {product.category}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: '40px 20px',
    minHeight: '100vh',
    textAlign: 'center' as 'center',
  },
  title: {
    fontSize: '2.5rem',
    color: '#fffff',
    marginBottom: '40px',
  },
  select: {
    marginBottom: '30px',
    padding: '10px 20px',
    fontSize: '1.2rem',
    borderRadius: '8px',
    border: '1px solid #ccc',
    backgroundColor: '#000',
    cursor: 'pointer',
  },
  productList: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
    gap: '20px',
  },
  product: {
    padding: '20px',
    backgroundColor: '#fff',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
    transition: 'transform 0.3s',
    ':hover': {
      transform: 'translateY(-10px)',
    },
  },
  productTitle: {
    fontSize: '1.5rem',
    color: '#0070f3',
    marginBottom: '10px',
  },
  productDescription: {
    fontSize: '1rem',
    color: '#666',
    marginBottom: '10px',
  },
  productCategory: {
    fontSize: '0.9rem',
    color: '#999',
  },
};

export default Products;
