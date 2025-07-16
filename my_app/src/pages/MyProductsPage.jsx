import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../AuthContext';
import ProductList from '../components/ProductList';

function MyProductsPage() {
  const { token } = useContext(AuthContext);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch('/api/my-products', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(data => {
        console.log('Fetched my products:', data);
        setProducts(data);
      })
      .catch(console.error);
  }, [token]);

  return (
    <div>
      <h2>My Products</h2>
      <ProductList products={products} setProducts={setProducts} />
    </div>
  );
}

export default MyProductsPage;
