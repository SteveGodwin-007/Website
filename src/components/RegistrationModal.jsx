import React from "react";

const RegistrationModal = ({ isOpen, onClose, eventTitle, formLink }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-center">{eventTitle}</h2>
        <p className="mb-6 text-gray-700 text-center">
          Click the button below to register for this event.
        </p>

        <div className="flex justify-center gap-4">
          <a
            href={formLink}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-pink-600 hover:bg-pink-700 text-white px-6 py-2 rounded-lg shadow-lg transition duration-300"
          >
            Register Now
          </a>
          <button
            onClick={onClose}
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-6 py-2 rounded-lg transition duration-300"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default RegistrationModal;
