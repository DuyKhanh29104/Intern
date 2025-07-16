import React, { useState, useContext } from 'react';
import ProductForm from '../components/ProductForm';
import { AuthContext } from '../AuthContext';

function AddProductPage() {
  const [products, setProducts] = useState([]);
  const { token } = useContext(AuthContext);

  const handleAdd = async (product) => {
    const res = await fetch('/api/products', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(product)
    });
    const newProduct = await res.json();
    setProducts([...products, newProduct]);
    alert('Product added!');
  };

  return (
    <div>
      <h2>Add Product</h2>
      <ProductForm onAdd={handleAdd} />
    </div>
  );
}

export default AddProductPage;
