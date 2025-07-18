import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../AuthContext';
import DynamicTable from './DynamicTable';
import DynamicForm from './DynamicForm';
import { fetchWithAuth } from './utils/hasPermission';

export default function PageRenderer({ config }) {
  const { token } = useContext(AuthContext);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    setLoading(true);
    try {
      const data = await fetchWithAuth(config.api.fetch, token);
      setItems(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Failed to fetch data", err);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleCreate = async (formData) => {
    await fetchWithAuth(config.api.create, token, 'POST', formData);
    loadData();
  };

  const handleUpdate = async (id, formData) => {
    await fetchWithAuth(config.api.update(id), token, 'PUT', formData);
    loadData();
  };

  const handleDelete = async (id) => {
    await fetchWithAuth(config.api.delete(id), token, 'DELETE');
    loadData();
  };

  return (
    <div>
        <DynamicTable
          items={items}
          fields={config.fields}
          onUpdate={handleUpdate}
          onDelete={handleDelete}
          permissionKeys={config.permissions}
        />
      <hr />
        <DynamicForm
          fields={config.fields}
          onSubmit={handleCreate}
        />
    </div>
  );
}