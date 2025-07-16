import React, { useEffect, useState } from 'react';
import ProductList from '../components/ProductList';
import { data } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../AuthContext';

function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { token } = useContext(AuthContext);

  useEffect(() => {
    fetch('/api/products', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setProducts(data);
        } else {
          console.error('Invalid data:', data);
          setProducts([]);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching products:', err);
        setProducts([]);
        setLoading(false);
      });
  }, [token]);

  if (loading) return <p>Loading...</p>;


  return (
    <div>
      <h2>Product List</h2>
      <ProductList products={products} setProducts={setProducts} />
    </div>
  );
}

export default ProductsPage;
