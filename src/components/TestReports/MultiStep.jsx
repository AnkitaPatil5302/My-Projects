import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Step1PatientDetails from "./Forms/Step1PatientDetails";
import Step2TestDetails from "./Forms/Step2TestDetails";
import Step3Instructions from "./Forms/Step3Instructions";
import Step4Consent from "./Forms/Step4Consent";
import Step5QuestionAndAnswers from "./Forms/Step5QuestionAndAnswers";

const MultiStep = () => (
  <div className="flex justify-center items-center p-12 w-full">
    <Form />
  </div>
);

const Form = () => {
  const [step, setStep] = useState(1);
  const [isBack, setIsBack] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [isStep5Submitted, setIsStep5Submitted] = useState(false); // Track Step 5 submission
  const [isCompleted, setIsCompleted] = useState(false); // Track test completion

  const handleCheckChange = (event) => {
    setIsChecked(event.target.checked);
  };

  const totalSteps = 5;

  const nextStep = () => {
    if (step === 4 && !isChecked) return; // Prevent moving forward if consent isn't checked
    setIsBack(false);
    if (step < totalSteps) {
      setStep((prev) => prev + 1);
    }
  };

  const back = () => {
    setIsBack(true);
    if (step > 1) setStep((prev) => prev - 1);
  };

  const handleStep5Submit = () => {
    setIsStep5Submitted(true); // Mark Step 5 as submitted
    setStep(totalSteps + 1); // Move to completion message
    setIsCompleted(true);
  };

  return (
    <div className="bg-white shadow-md border p-6 rounded-2xl w-max overflow-hidden">
      {isCompleted ? ( // Show success message if completed
        <div className="text-center text-green-600 font-semibold text-lg p-6">
          🎉 You have completed the test successfully! 🎉
        </div>
      ) : (
        <>
          <div className="flex w-full justify-center">
            <Step step={step} totalSteps={totalSteps} setStep={setStep} />
          </div>

          <div className="relative my-8 w-[50vw] max-h-max ">
            <AnimatePresence mode="wait">
              <motion.div
                key={step}
                initial={
                  isBack ? { x: -200, opacity: 0 } : { x: 200, opacity: 0 }
                }
                animate={{ x: 0, opacity: 1 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className="p-6 w-full h-full flex flex-col "
              >
                <StepContent
                  step={step}
                  handleCheckChange={handleCheckChange}
                  isChecked={isChecked}
                  onStep5Submit={handleStep5Submit} // Pass submission handler
                />
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="flex justify-between my-8">
            <button
              className={`text-gray-700 rounded-full px-6 py-2 border ${
                step === 1 ? "opacity-50" : ""
              }`}
              onClick={back}
              disabled={step === 1}
            >
              Back
            </button>

            {step === totalSteps ? (
              <button
                className="py-2 px-8 rounded-full bg-black text-white disabled:bg-gray-400"
                onClick={() => setIsCompleted(true)}
                disabled={!isStep5Submitted} // Disable Finish until Step 5 is submitted
              >
                Finish
              </button>
            ) : (
              <button
                onClick={nextStep}
                className={`py-2 px-8 rounded-full ${
                  step === 4 && !isChecked
                    ? "bg-gray-400 text-gray-200"
                    : "bg-black text-white"
                }`}
                disabled={step === 4 && !isChecked}
              >
                Next
              </button>
            )}
          </div>
        </>
      )}
    </div>
  );
};

const StepContent = ({ step, handleCheckChange, isChecked, onStep5Submit }) => {
  switch (step) {
    case 1:
      return <Step1PatientDetails />;
    case 2:
      return <Step2TestDetails />;
    case 3:
      return <Step3Instructions />;
    case 4:
      return (
        <Step4Consent handleChange={handleCheckChange} isChecked={isChecked} />
      );
    case 5:
      return <Step5QuestionAndAnswers onSubmit={onStep5Submit} />; // Pass submission handler
    default:
      return <p>No further steps</p>;
  }
};

const Step = ({ step, totalSteps }) => {
  return (
    <div className="relative flex items-center justify-center w-full">
      <motion.span className="px-4 py-2 border z-[2] text-green-600 grid place-items-center text-3xl capitalize font-bold">
        {`Step ${step} of ${totalSteps}`}
      </motion.span>
    </div>
  );
};

export default MultiStep;
