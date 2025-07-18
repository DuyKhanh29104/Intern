export function hasPermission(token, permissionKey) {
    if (!token) return false;
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.permissions && payload.permissions.includes(permissionKey);
    } catch (e) {
      return false;
    }
  }
  
  export async function fetchWithAuth(url, token, method = 'GET', body = null) {
    const res = await fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: body ? JSON.stringify(body) : null,
    });
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    return res.json();
  }
  