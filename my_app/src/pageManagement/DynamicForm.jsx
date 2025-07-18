import React, { useState } from 'react';
import Button from './DynamicButton';

export default function DynamicForm({ fields, onSubmit }) {
  const [form, setForm] = useState({});

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
    setForm({});
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginTop: '20px' }}>
      {fields.map((f) => (
        <div key={f.name} style={{ marginBottom: '10px' }}>
          <label>{f.label}</label>
          <input
            type={f.type}
            name={f.name}
            value={form[f.name] || ''}
            onChange={handleChange}
            style={{ marginLeft: '10px', padding: '5px' }}
          />
        </div>
      ))}
      <Button color="green" type="submit">Add</Button>
    </form>
  );
}