import React from 'react';
import Input from './Input';
import Button from './Button';

function ModalEdit({ open, product, onChange, onCancel, onSave }) {
  if (!open) return null;

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h3>Edit Product</h3>
        <Input
          label="Name"
          value={product.name}
          onChange={(e) => onChange({ ...product, name: e.target.value })}
        />
        <Input
          label="Price"
          type="number"
          value={product.price}
          onChange={(e) => onChange({ ...product, price: e.target.value })}
        />
        <div style={{ marginTop: '1rem' }}>
          <Button color="blue" onClick={onSave}>Save</Button>{' '}
          <Button color="gray" onClick={onCancel}>Cancel</Button>
        </div>
      </div>
    </div>
  );
}

export default ModalEdit;
