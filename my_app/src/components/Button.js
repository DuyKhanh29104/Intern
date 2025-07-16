function Button({ children, onClick, color = 'blue' }) {
    return (
      <button
        onClick={onClick}
        style={{
          backgroundColor: color,
          color: '#fff',
          padding: '12px 18px',
          border: 'none',
          borderRadius: '4px',
          margin: '4px'
        }}
      >
        {children}
      </button>
    );
  }
  
  export default Button;
  