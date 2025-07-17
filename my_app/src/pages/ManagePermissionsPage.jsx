import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../AuthContext';

const ALL_PERMISSIONS = [
  'view_product',
  'add_product',
  'edit_product',
  'delete_product',
  'view_user',
  'add_user_permission',
  'remove_user_permission'
];

function ManagePermissionsPage() {
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
        if (Array.isArray(data)) {
          const filteredUsers = data.filter(u => u.email !== 'admin@example.com');
          setUsers(filteredUsers);
        } else {
          console.error('API trả về không phải mảng:', data);
          setUsers([]);
        }
      })
      .catch(err => {
        console.error('Lỗi khi fetch users:', err);
        setUsers([]);
      });
  }, []);

  const togglePermission = async (userId, permission, hasPermission) => {
    const url = hasPermission
      ? '/api/users/remove-permission'
      : '/api/users/add-permission';

    try {
      const res = await fetch(url, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          id: userId,
          permissions: [permission]
        })
      });

      if (res.status === 403) {
        const error = await res.json();
        alert(error.message || 'Bạn không có quyền');
        return;
      }
    
      if (!res.ok) throw new Error('Lỗi khi cập nhật quyền');

      // Cập nhật giao diện
      setUsers(prevUsers =>
        prevUsers.map(u =>
          u.id === userId
            ? {
                ...u,
                permissions: hasPermission
                  ? u.permissions.filter(p => p !== permission)
                  : [...u.permissions, permission]
              }
            : u
        )
      );
    } catch (err) {
      console.error('Cập nhật permission thất bại:', err);
    }
  };

  return (
    <div>
      <h2>Quản lý quyền người dùng</h2>
      <table border="1" cellPadding="8">
        <thead>
          <tr>
            <th>Email</th>
            {ALL_PERMISSIONS.map(p => (
              <th key={p}>{p}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td>{user.email}</td>
              {ALL_PERMISSIONS.map(p => (
                <td key={p}>
                  <input
                    type="checkbox"
                    checked={user.permissions?.includes(p)}
                    onChange={() =>
                      togglePermission(user.id, p, user.permissions?.includes(p))
                    }
                  />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ManagePermissionsPage;
