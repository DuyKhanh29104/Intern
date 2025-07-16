import React, { useState } from 'react';
import Input from './Input';
import Button from './Button';

function ProductForm({ onAdd }) {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !price) return;
    onAdd({ name, price }); // gọi props
    setName('');
    setPrice('');
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: '1rem' }}>
      <Input
        placeholder="Product name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        style={{ marginRight: '10px' }}
      />
      <Input
        placeholder="Price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        style={{ marginRight: '10px' }}
      />
      <Button type="submit">Add Product</Button>
    </form>
  );
}

export default ProductForm;
