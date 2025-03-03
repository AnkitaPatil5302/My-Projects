import { AnimatePresence, motion } from "framer-motion";
import { createPortal } from "react-dom";
import { FaXmark } from "react-icons/fa6";

import AdviceForm from "../components/Patients/Forms/AdviceForm";
import YogaForm from "../components/Patients/Forms/YogaForm";
import DiagnosisForm from "../components/Patients/Forms/DiagnosisForm";
import DietForm from "../components/Patients/Forms/DietForm";
import TestForm from "../components/Patients/Forms/TestForm";
import FollowUpForm from "../components/Patients/Forms/FollowUpForm";
import MedicineForm from "../components/Patients/Forms/MedicineForm";

const formComponents = {
  "Medicine Rx": MedicineForm,
  "Yoga Rx": YogaForm,
  Diagnosis: DiagnosisForm,
  Advice: AdviceForm,
  "Diet Rx": DietForm,
  "Test Rx": TestForm,
  "Follow Up": FollowUpForm,
};

const SpringModal = ({
  data,
  editingId,
  setData,
  setEditingId,
  editingField,
  isOpen,
  setIsOpen,
}) => {
  const renderForm = () => {
    const FormComponent = formComponents[editingField];
    return (
      FormComponent && (
        <FormComponent
          data={data}
          editingId={editingId}
          setData={setData}
          setEditingId={setEditingId}
          setIsOpen={setIsOpen}
        />
      )
    );
  };

  const modalContent = (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsOpen(false)} // Close modal on outside click
          className="bg-slate-900/20 z-[9999] backdrop-blur fixed inset-0 grid place-items-center overflow-y-auto"
          aria-labelledby="modal-title"
          role="dialog"
          aria-hidden={!isOpen}
        >
          <motion.div
            initial={{ scale: 0, rotate: "12.5deg" }}
            animate={{ scale: 1, rotate: "0deg" }}
            exit={{ scale: 0, rotate: "0deg" }}
            onClick={(e) => e.stopPropagation()} // Prevent closing on inside click
            className="bg-white lg:p-6 rounded-lg w-11/12 max-h-[90vh] max-w-max shadow-xl relative border overflow-y-auto"
          >
            <button
              onClick={() => setIsOpen(false)}
              className="absolute right-0 top-0 rounded-bl-xl p-2 text-xl text-white bg-zinc-500"
              aria-label="Close Modal"
            >
              <FaXmark />
            </button>
            {renderForm()}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return createPortal(modalContent, document.getElementById("modal-root"));
};

export default SpringModal;
