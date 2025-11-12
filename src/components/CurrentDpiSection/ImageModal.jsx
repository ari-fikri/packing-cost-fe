import React from 'react';

const modalStyles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
  },
  content: {
    position: 'relative',
    background: '#fff',
    padding: '20px',
    borderRadius: '5px',
    maxWidth: '80vw',
    maxHeight: '80vh',
  },
  closeButton: {
    position: 'absolute',
    top: '10px',
    right: '10px',
    background: 'none',
    border: 'none',
    fontSize: '1.5rem',
    cursor: 'pointer',
  },
  image: {
    maxWidth: 'calc(80vw - 40px)',
    maxHeight: 'calc(80vh - 40px)',
  },
};

export function ImageModal({ imageUrl, isOpen, onClose }) {
  if (!isOpen || !imageUrl) {
    return null;
  }

  return (
    <div style={modalStyles.overlay} onClick={onClose}>
      <div style={modalStyles.content} onClick={(e) => e.stopPropagation()}>
        <button style={modalStyles.closeButton} onClick={onClose}>&times;</button>
        <img src={imageUrl} alt="Enlarged view" style={modalStyles.image} />
      </div>
    </div>
  );
}