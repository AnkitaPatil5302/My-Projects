import React from "react";
import SpringModal from "./SpringModal";

const Modal = ({
  data,
  editingId,
  setData,
  setEditingId,
  editingField,
  setIsModalOpen,
}) => {
  return (
    <SpringModal
      data={data}
      editingId={editingId}
      setData={setData}
      setEditingId={setEditingId}
      editingField={editingField}
      isOpen={true}
      setIsOpen={setIsModalOpen} // Use the parent function
    />
  );
};

export default Modal;
