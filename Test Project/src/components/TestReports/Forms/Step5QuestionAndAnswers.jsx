import React, { useContext, useEffect, useState } from "react";
import MultiStepQA from "../QuestionsMultiStep";
import { TestReportContext } from "../../../Context/TestReportContext";

const Step5QuestionAndAnswers = ({ onSubmit }) => {
  const { testData } = useContext(TestReportContext);
  const [selectedQuestions, setSelectedQuestions] = useState(null);

  useEffect(() => {
    if (testData.selected_test_detail && testData.question_and_answers) {
      const foundQuestions = testData.question_and_answers.find(
        (qa) => qa.test_id === testData.selected_test_detail.test_id
      );

      if (foundQuestions) {
        // Assign unique question and answer IDs dynamically
        const testId = foundQuestions.test_id;
        const formattedQuestions = foundQuestions.questions.map(
          (question, qIndex) => ({
            ...question,
            question_id: `${testId}.q${qIndex + 1}`,
            answer_ids: question.answers.map(
              (_, aIndex) => `${testId}.q${qIndex + 1}.a${aIndex + 1}`
            ),
          })
        );

        setSelectedQuestions({
          ...foundQuestions,
          questions: formattedQuestions,
        });
      }
    }
  }, [testData]);

  const handleTestCompletion = () => {
    if (onSubmit) {
      onSubmit(); // Notify parent (MultiStep Form) that Step 5 is completed
    }
  };

  return (
    <div className="flex flex-col gap-4 w-full">
      <div className="text-lg font-bold">Step 5 : Test</div>
      {selectedQuestions ? (
        <MultiStepQA
          testData={selectedQuestions.questions}
          onComplete={handleTestCompletion}
        />
      ) : (
        <p className="text-gray-500">No questions available.</p>
      )}
    </div>
  );
};

export default Step5QuestionAndAnswers;
