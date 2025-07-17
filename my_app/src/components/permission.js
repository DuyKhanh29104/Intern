export function hasPermission(permission) {
    const permissions = JSON.parse(localStorage.getItem('permissions') || '[]');
    return permissions.includes(permission);
  }
  