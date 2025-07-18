import React, { useState } from 'react';
import Button from './DynamicButton';
import { hasPermission } from './utils/hasPermission';

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

  return (
    <div>
      <table border="1" cellPadding="8" style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead style={{ background: '#000', color: '#fff' }}>
          <tr>
            {fields.map((f) => (
              <th key={f.name}>{f.label}</th>
            ))}
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {paginatedItems.map((item, idx) => (
            <tr key={item.id} style={{ background: idx % 2 === 0 ? '#f9f9f9' : '#e0e0e0', height: '50px' }}>
              {fields.map((f) => (
                <td key={f.name}>
                  {editId === item.id ? (
                    <input
                      type={f.type}
                      value={form[f.name] ?? item[f.name]}
                      onChange={(e) => setForm({ ...form, [f.name]: e.target.value })}
                    />
                  ) : (
                    item[f.name]
                  )}
                </td>
              ))}
              <td>
                {editId === item.id ? (
                  <>
                    <Button color="green" onClick={() => { onUpdate(item.id, form); setEditId(null); }}>Save</Button>{' '}
                    <Button color="gray" onClick={() => setEditId(null)}>Cancel</Button>
                  </>
                ) : (
                  <>
                    {hasPermission(localStorage.getItem('token'), permissionKeys.edit) && (
                      <Button color="blue" onClick={() => { setEditId(item.id); setForm(item); }}>Edit</Button>
                    )}{' '}
                    {hasPermission(localStorage.getItem('token'), permissionKeys.delete) && (
                      <Button color="red" onClick={() => onDelete(item.id)}>Delete</Button>
                    )}
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
