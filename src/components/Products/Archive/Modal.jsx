import React from 'react';

const Modal = ({ show, onClose, children }) => {
  const modalStyles = {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: show ? 'block' : 'none',
  };

  const modalContentStyles = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '8px',
    minWidth: '530px',
  };

  return (
    <div className='ctegorypop' style={modalStyles} onClick={onClose}>
      <div className='ctegorypopinner' style={modalContentStyles} onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
};

export default Modal;
