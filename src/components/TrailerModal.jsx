import React from 'react';
import '../styles/TrailerModal.css';

const TrailerModal = ({ trailerKey, closeModal }) => {
  return (
    <div className="trailer-modal-overlay" onClick={closeModal}>
      <div className="trailer-modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-button" onClick={closeModal}>×</button>
        <iframe
          width="100%"
          height="100%"
          src={`https://www.youtube.com/embed/${trailerKey}`}
          title="Trailer"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );
};

export default TrailerModal;
