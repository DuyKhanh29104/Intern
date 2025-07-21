import React, { useState } from 'react';
import Button from './DynamicButton';

export default function DynamicTable({ items, fields, onUpdate, onDelete, permissionKeys }) {
  const [editId, setEditId] = useState(null);
  const [form, setForm] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const totalPages = Math.ceil(items.length / itemsPerPage);
  const paginatedItems = items.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handleChangePage = (direction) => {
    if (direction === 'prev' && currentPage > 1) setCurrentPage(currentPage - 1);
    else if (direction === 'next' && currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handleInputChange = (e, type, name) => {
    const value = type === 'checkbox' ? e.target.checked : e.target.value;
    setForm({ ...form, [name]: value });
  };

  const renderEditField = (f, item) => {
    const value = form[f.name] ?? item[f.name];
    const commonProps = {
      name: f.name,
      value: f.type === 'checkbox' ? undefined : value,
      checked: f.type === 'checkbox' ? value : undefined,
      onChange: (e) => handleInputChange(e, f.type, f.name),
    };

    switch (f.type) {
      case 'textarea':
        return <textarea {...commonProps} rows={2} style={{ width: '100%' }} />;
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

  const renderDisplayField = (f, item) => {
    const value = item[f.name];
    if (f.type === 'checkbox') return value ? '✅' : '❌';
    if (f.type === 'select') {
      const match = f.options?.find((opt) => opt.value === value);
      return match ? match.label : value;
    }
    return value;
  };

  const getColumnWidth = (type) => {
    switch (type) {
      case 'checkbox': return '10px';
      case 'number': return '100px';
      case 'textarea': return '250px';
      case 'select': return '150px';
      case 'text':
      default: return '250px';
    }
  };
  

  return (
    <div>
      <table border="1" cellPadding="8" style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead style={{ background: '#000', color: '#fff' }}>
          <tr>
            {fields.map((f) => (
              <th
                key={f.name}
                style={{
                  width: getColumnWidth(f.type),
                  padding: '10px',
                  borderBottom: '1px solid #ddd',
                  textAlign: 'center',
                }}
              >
                {f.label}
              </th>
            ))}
            <th style={{ width: '150px', padding: '10px' }}>Action</th>
          </tr>
        </thead>
        <tbody>
          {paginatedItems.map((item, idx) => (
            <tr key={item.id} style={{ background: idx % 2 === 0 ? '#f9f9f9' : '#e0e0e0', height: '50px' }}>
              {fields.map((f) => (
                <td key={f.name}>
                  {editId === item.id
                    ? renderEditField(f, item)
                    : renderDisplayField(f, item)}
                </td>
              ))}
              <td style={{ width: '150px', padding: '10px' }}>
                {editId === item.id ? (
                  <>
                    <Button color="green" onClick={() => { onUpdate(item.id, form); setEditId(null); }}>Save</Button>{' '}
                    <Button color="gray" onClick={() => setEditId(null)}>Cancel</Button>
                  </>
                ) : (
                  <>
                    <Button color="blue" onClick={() => { setEditId(item.id); setForm(item); }}>Edit</Button>{' '}
                    <Button color="red" onClick={() => onDelete(item.id)}>Delete</Button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination controls */}
      <div style={{ marginTop: '10px', textAlign: 'center' }}>
        <Button color="gray" onClick={() => handleChangePage('prev')} disabled={currentPage === 1}>
          Previous
        </Button>{' '}
        <span style={{ padding: '0 10px' }}>
          Page {currentPage} of {totalPages}
        </span>
        <Button color="gray" onClick={() => handleChangePage('next')} disabled={currentPage === totalPages}>
          Next
        </Button>
      </div>
    </div>
  );
}
