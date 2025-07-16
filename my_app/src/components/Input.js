function Input({ label, value, onChange, placeholder }) {
    return (
      <div style={{ marginBottom: '10px' }}>
        <label>{label}</label>
        <input
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          style={{ padding: '10px', width: '250px' }}
        />
      </div>
    );
  }
  
  export default Input;
  