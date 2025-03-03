import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const MultiStepQA = ({ testData, onComplete }) => {
  if (!testData || testData.length === 0) {
    return <p className="text-gray-500">No questions available.</p>;
  }

  const [step, setStep] = useState(0);
  const [responses, setResponses] = useState(Array(testData.length).fill([]));
  const [submitted, setSubmitted] = useState(false);

  const handleAnswerSelect = (answerIndex) => {
    setResponses((prev) => {
      const updatedResponses = [...prev];
      const currentAnswers = updatedResponses[step];

      if (currentAnswers.includes(answerIndex)) {
        updatedResponses[step] = currentAnswers.filter(
          (i) => i !== answerIndex
        );
      } else {
        updatedResponses[step] = [...currentAnswers, answerIndex];
      }

      return updatedResponses;
    });
  };

  const nextStep = () => {
    if (step < testData.length - 1) setStep(step + 1);
  };

  const prevStep = () => {
    if (step > 0) setStep(step - 1);
  };

  const handleSubmit = () => {
    const formattedResponses = responses.map((stepResponses, stepIndex) => ({
      question_id: testData[stepIndex].question_id,
      selected_answers: stepResponses.map((index) => ({
        answer_id: testData[stepIndex].answers[index].answer_id,
        value: testData[stepIndex].answers[index].value,
      })),
    }));

    console.log(
      "Final Submitted Responses:",
      JSON.stringify(formattedResponses, null, 2)
    );

    setSubmitted(true);

    // Notify parent that Step 5 is completed
    if (onComplete) {
      onComplete();
    }
  };

  return (
    <div className="flex justify-center items-center p-12 w-full">
      <div className="bg-white shadow-md border p-6 rounded-2xl w-max">
        {submitted ? (
          <div className="text-center text-green-600 font-semibold text-lg">
            ✅ You have submitted the test successfully!
          </div>
        ) : (
          <>
            <AnimatePresence mode="wait">
              <motion.div
                key={step}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className="p-6"
              >
                <h2 className="text-lg font-semibold">
                  {testData[step].question}
                </h2>
                <div className="mt-4">
                  {testData[step].answers.map((answer, index) => (
                    <label
                      key={index}
                      className="block flex items-center gap-2 my-2"
                    >
                      <input
                        type="checkbox"
                        checked={responses[step].includes(index)}
                        onChange={() => handleAnswerSelect(index)}
                      />
                      {answer.text}
                    </label>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>

            <div className="flex justify-between my-8">
              <button
                className="text-gray-700 rounded-full px-6 py-2 border"
                onClick={prevStep}
                disabled={step === 0}
              >
                Back
              </button>

              {step < testData.length - 1 ? (
                <button
                  className={`py-2 px-8 rounded-full ${
                    responses[step].length === 0
                      ? "bg-gray-400 text-gray-200 cursor-not-allowed"
                      : "bg-black text-white"
                  }`}
                  onClick={nextStep}
                  disabled={responses[step].length === 0}
                >
                  Next
                </button>
              ) : (
                <button
                  className={`py-2 px-8 rounded-full ${
                    responses[step].length === 0
                      ? "bg-gray-400 text-gray-200 cursor-not-allowed"
                      : "bg-green-500 text-white"
                  }`}
                  onClick={handleSubmit}
                  disabled={responses[step].length === 0}
                >
                  Submit
                </button>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default MultiStepQA;
