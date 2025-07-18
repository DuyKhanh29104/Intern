import React from 'react';

export default function Button({ color, children, ...props }) {
  const styles = {
    blue: { backgroundColor: '#007BFF', color: 'white', padding: '6px 12px', border: 'none', marginRight: '4px' },
    red: { backgroundColor: '#DC3545', color: 'white', padding: '6px 12px', border: 'none', marginRight: '4px' },
    green: { backgroundColor: '#28A745', color: 'white', padding: '6px 12px', border: 'none', marginRight: '4px' },
    gray: { backgroundColor: '#6C757D', color: 'white', padding: '6px 12px', border: 'none', marginRight: '4px' },
  };

  return (
    <button {...props} style={styles[color] || styles.gray}>
      {children}
    </button>
  );
}