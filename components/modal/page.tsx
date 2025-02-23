import React from "react";

interface ModalProps {
  visible: boolean;
  children: React.ReactNode;
  onClose: () => void; // Close function
}

const Modal: React.FC<ModalProps> = ({ visible, children, onClose }) => {
  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose(); // Close when clicking outside the modal content
    }
  };

  return (
    <>
      {visible && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black/50 z-50"
          onClick={handleBackdropClick} // Close modal when clicking outside
        >
          {children}
        </div>
      )}
    </>
  );
};

export default Modal;
