import React, { useEffect } from "react";

interface ThankYouModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ThankYouModal: React.FC<ThankYouModalProps> = ({ isOpen, onClose }) => {
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        onClose(); // Automatically close the modal after 2 seconds
      }, 2000);

      return () => clearTimeout(timer); // Cleanup on component unmount
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full text-center">
        <h2 className="text-xl font-semibold text-green-500 mb-4">Thank You for Your Collaboration!</h2>
        <button
          onClick={onClose}
          className="btn w-full mt-4"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default ThankYouModal;
