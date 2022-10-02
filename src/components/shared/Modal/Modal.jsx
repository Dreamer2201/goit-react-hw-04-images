import './Modal.css';
import { useEffect } from "react";
import { createPortal } from "react-dom";

const modalRoot = document.getElementById("modal-root");

export default function Modal({ onClose, urlModalImg, dscModalImg }) {
  
  useEffect(() => {
    document.addEventListener('keydown', closeModal);
    return () => {
      document.removeEventListener('keydown', closeModal);
    }
  })

  const closeModal = (event) => {
    if (event.code === "Escape" || event.target === event.currentTarget) {
      onClose();
    }
  };

    return createPortal(
      <div className="overlay" onClick={closeModal}>
                <div className="modal">
            <img className="modalImg" src={urlModalImg} alt={dscModalImg} />
                </div>
      </div>,
      modalRoot
    )
  }

