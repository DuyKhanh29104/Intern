import React, { useState, useMemo } from 'react';
import Input from './Input';
import Button from './Button';
import ModalConfirm from './ModalConfirm';
import ModalEdit from './ModalEdit';
import {hasPermission} from './permission';

function ProductList({ products, setProducts }) {
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [deleteId, setDeleteId] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({ name: '', price: '' });


  const filtered = useMemo(() => {
    return products.filter(p =>
      p.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [search, products]);

  const pageSize = 5;
  const pageCount = Math.ceil(filtered.length / pageSize);

  const getVisiblePages = () => {
    const range = 2; 
    let start = Math.max(1, page - range);
    let end = Math.min(pageCount, page + range);
  
    while (end - start < range * 2) {
      if (start > 1) start--;
      else if (end < pageCount) end++;
      else break;
    }
  
    const pages = [];
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    return pages;
  };
  
  const currentItems = useMemo(() => {
    const start = (page - 1) * pageSize;
    return filtered.slice(start,start + pageSize);
  },[filtered,page])

  const handleConfirmDelete = async () => {
    if (!deleteId) return;
  
    try {
      const response = await fetch(`/api/products/${deleteId}`, {

        method: 'DELETE',
      });
  
      if (!response.ok) {
        throw new Error('Failed to delete');
      }
  
      // Xoá khỏi danh sách hiển thị
      setProducts(prev => prev.filter(p => p.id !== deleteId));
  
      console.log('Deleted product ID:', deleteId);
    } catch (error) {
      console.error('Error deleting product:', error);
      alert('Xoá thất bại');
    }
  
    setDeleteId(null);
  };
  
  const handleSaveEdit = async () => {
    try {
      const response = await fetch(`/api/products/${editingId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editForm),
      });
  
      if (!response.ok) throw new Error('Failed to update');
  
      const updated = await response.json();
  
      setProducts(prev =>
        prev.map(p => (p.id === editingId ? updated : p))
      );
  
      setEditingId(null);
    } catch (err) {
      console.error(err);
      alert('Cập nhật thất bại');
    }
  };
  

  return (
    <div>
      <Input
        label="Search "
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          setPage(1);
        }}
        placeholder="Search product name..."
      />

      <table border="1" cellPadding="8" style={{ width: '100%', borderCollapse: 'collapse'}}>
        <thead style={{ background: '#000', color: '#fff' }}>
          <tr>
            <th style={{width :'100px'}} >ID</th>
            <th style={{width :'500px'}}>Name</th>
            <th style={{width :'200px'}}>Price</th>
            <th style={{width :'180px'}}>Action</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((p, idx) => (
            <tr key={p.id} 
            style={{
              backgroundColor: idx % 2 === 0 ? '#f9f9f9' : '#e0e0e0'
            }}>
              <td>{(page - 1) * pageSize + idx + 1}</td>
              <td>{p.name}</td>
              <td>{p.price}</td>
              <td style={{ textAlign: 'center' }}>
                {hasPermission('edit_product') && (
                  <Button color='blue' onClick={() => {
                    setEditingId(p.id);
                    setEditForm({ name: p.name, price: p.price });
                  }}>
                    Edit
                  </Button>
                )}{' '}
                {hasPermission('delete_product') && (
                  <Button color="red" onClick={() => setDeleteId(p.id)}>Delete</Button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div style={{ marginTop: '1rem', display: 'flex', justifyContent: 'center', gap: '8px' }}>
        <Button
          color="gray"
          disabled={page === 1}
          onClick={() => setPage(prev => Math.max(1, prev - 1))}
        >
          &lt;
        </Button>

        {getVisiblePages().map((pNum) => (
          <Button
            key={pNum}
            color={pNum === page ? 'blue' : 'gray'}
            onClick={() => setPage(pNum)}
          >
            {pNum}
          </Button>
        ))}

        <Button
          color="gray"
          disabled={page === pageCount}
          onClick={() => setPage(prev => Math.min(pageCount, prev + 1))}
        >
          &gt;
        </Button>
      </div>

      <ModalConfirm
        open={!!deleteId}
        message="Are you sure you want to delete?"
        onConfirm={handleConfirmDelete}
        onCancel={() => setDeleteId(null)}
      />
      <ModalEdit
        open={!!editingId}
        product={editForm}
        onChange={setEditForm}
        onCancel={() => setEditingId(null)}
        onSave={handleSaveEdit}
      />
    </div>
  );
}

export default ProductList;
