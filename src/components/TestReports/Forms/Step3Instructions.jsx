import React, { useContext, useEffect, useState } from "react";
import { TestReportContext } from "../../../Context/TestReportContext";

const Step3Instructions = () => {
  const { testData } = useContext(TestReportContext);
  const [selectedInstruction, setSelectedInstruction] = useState(null);

  useEffect(() => {
    if (testData.selected_test_detail && testData.instructions) {
      const foundInstruction = testData.instructions.find(
        (instr) => instr.test_id === testData.selected_test_detail.test_id
      );

      setSelectedInstruction(foundInstruction);
    }
  }, [testData]);

  return (
    <div className="flex flex-col gap-4 w-full">
      <div className="text-lg font-bold">Step 3 : Instructions</div>
      {selectedInstruction ? (
        <ol className="border rounded-lg shadow-md p-4 mb-4 bg-white list-decimal pl-6">
          {selectedInstruction.test_instructions.map((instruc, idx) => (
            <li key={idx} className="text-gray-600">
              {instruc}
            </li>
          ))}
        </ol>
      ) : (
        <p className="text-gray-500">
          No instructions available for the selected test.
        </p>
      )}
    </div>
  );
};

export default Step3Instructions;
