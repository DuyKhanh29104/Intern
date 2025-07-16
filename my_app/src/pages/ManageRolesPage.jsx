import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../AuthContext';

function ManageRolesPage() {
  const { token } = useContext(AuthContext);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch('/api/users', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(res => res.json())
      .then(data => {
        console.log("Fetched users:", data);
        if (Array.isArray(data)) {
          setUsers(data);
        } else {
          console.error('API trả về không phải mảng:', data);
          setUsers([]);
        }
      })
      .catch((err) => {
        console.error('Lỗi khi fetch users:', err);
        setUsers([]);
      });
  }, []);

  const handleRoleChange = async (userId, newRole) => {
    try {
      await fetch('/api/users/role', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ id: userId, role: newRole })
      });
      setUsers(prev =>
        prev.map(u => (u.id === userId ? { ...u, role: newRole } : u))
      );
    } catch (err) {
      console.error('Lỗi khi cập nhật role:', err);
    }
  };

  return (
    <div>
      <h2>Quản lý quyền người dùng</h2>
      <table border="1" cellPadding="8">
        <thead>
          <tr>
            <th>Email</th>
            <th>Role</th>
            <th>Thay đổi</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(users) && users.map(user => (
            <tr key={user.id}>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>
                <select
                  value={user.role}
                  onChange={(e) => handleRoleChange(user.id, e.target.value)}
                >
                  <option value="admin">admin</option>
                  <option value="editor">editor</option>
                  <option value="viewer">viewer</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ManageRolesPage;
