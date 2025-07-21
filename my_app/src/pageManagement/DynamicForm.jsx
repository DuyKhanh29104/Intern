import React, { useState } from 'react';
import Button from './DynamicButton';

export default function DynamicForm({ fields, onSubmit }) {
  const [form, setForm] = useState({});

  const handleChange = (e) => {
    const { name, type, value, checked } = e.target;
    setForm({
      ...form,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
    setForm({});
  };

  const renderInput = (f) => {
    const commonProps = {
      name: f.name,
      value: f.type === 'checkbox' ? undefined : form[f.name] || '',
      checked: f.type === 'checkbox' ? form[f.name] || false : undefined,
      onChange: handleChange,
      style: { marginLeft: '10px', padding: '5px' },
    };

    switch (f.type) {
      case 'textarea':
        return <textarea {...commonProps} rows={4} cols={30} />;
      case 'select':
        return (
          <select {...commonProps}>
            {f.options?.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        );
      case 'checkbox':
        return <input type="checkbox" {...commonProps} />;
      default:
        return <input type={f.type || 'text'} {...commonProps} />;
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        marginTop: '20px',
        padding: '20px',
        border: '1px solid #ccc',
        borderRadius: '8px',
        backgroundColor: '#f9f9f9',
        maxWidth: '500px',
      }}
    >
      {fields.map((f) => (
        <div
          key={f.name}
          style={{
            marginBottom: '15px',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <label style={{ fontWeight: 'bold', marginBottom: '5px' }}>
            {f.label}
          </label>
          {renderInput(f)}
        </div>
      ))}
      <div style={{ textAlign: 'right' }}>
        <Button color="green" type="submit">Add</Button>
      </div>
    </form>
  );
  
}
