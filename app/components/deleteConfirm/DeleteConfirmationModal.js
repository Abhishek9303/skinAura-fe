// components/DeleteConfirmationModal.js
import React from "react";

const DeleteConfirmationModal = ({ onConfirm, onCancel }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg p-4 shadow-lg">
        <h2 className="text-lg font-bold mb-4">Confirm Deletion</h2>
        <p>Are you sure you want to delete this product?</p>
        <div className="mt-4 flex justify-end">
          <button
            onClick={onCancel}
            className="mr-2 bg-gray-300 text-black p-2 rounded-md"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="bg-red-500 text-white p-2 rounded-md"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmationModal;
