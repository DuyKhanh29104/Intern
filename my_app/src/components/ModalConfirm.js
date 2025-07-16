import Button from './Button';
function ModalConfirm({ open, message, onConfirm, onCancel }) {
    if (!open) return null;
  
    return (
      <div style={{
        position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
        background: 'rgba(0,0,0,0.4)', display: 'flex', justifyContent: 'center', alignItems: 'center'
      }}>
        <div style={{ background: 'white', padding: '20px', borderRadius: '8px' }}>
          <p>{message}</p>
          <Button color="red" onClick={onConfirm}>Yes</Button>
          <Button color="gray" onClick={onCancel}>Cancel</Button>
        </div>
      </div>
    );
  }
  
  export default ModalConfirm;
  