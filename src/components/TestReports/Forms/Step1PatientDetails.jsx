import React, { useContext, useEffect, useState, useRef } from "react";
import { TestReportContext } from "../../../Context/TestReportContext";

const Step1PatientDetails = () => {
  const { testData, updateTestReportData } = useContext(TestReportContext);

  // Ensure initial state is always an array
  const [personalDetails, setPersonalDetails] = useState(
    testData.personal_details || []
  );
  console.log(testData);
  console.log(personalDetails);

  // Track previous state for comparison
  const previousPersonalDetails = useRef(personalDetails);

  useEffect(() => {
    const debounceUpdate = setTimeout(() => {
      if (
        JSON.stringify(previousPersonalDetails.current) !==
        JSON.stringify(personalDetails)
      ) {
        updateTestReportData("personal_details", null, personalDetails);
        // Update the ref
        previousPersonalDetails.current = personalDetails;
      }
    }, 300);

    return () => clearTimeout(debounceUpdate);
  }, [personalDetails, updateTestReportData]);

  useEffect(() => {
    setPersonalDetails(testData.personal_details || []);
  }, [testData]);
  console.log(personalDetails.patient_id);
  return (
    <div className="flex flex-col gap-4 w-full">
      <div className="text-lg font-bold">Step 1 : Patient Details</div>

      {personalDetails.length > 0 ? (
        personalDetails.map((detail, index) => (
          <div>
            <div>
              <h2 className="text-lg font-bold">
                Test Name: {detail.test_name}{" "}
              </h2>
            </div>
            <div
              key={index}
              className="border rounded-lg shadow-md p-4 mb-4 bg-white"
            >
              <p className="text-gray-700">
                <strong>Patient Id:</strong> {detail.patient_id || "N/A"}
              </p>
              <p className="text-gray-700">
                <strong>Patient Name:</strong> {detail.patient_name || "N/A"}
              </p>
              <p className="text-gray-600">
                <strong>Test No:</strong> {index + 1 || "N/A"}
              </p>
              <p className="text-gray-600">
                <strong>Age:</strong> {detail.age || "N/A"}
              </p>
              <p className="text-gray-600">
                <strong>Gender:</strong> {detail.gender || "N/A"}
              </p>
              <p className="text-gray-600">
                <strong>Date:</strong> {detail.date || "N/A"}
              </p>
              <p className="text-gray-600">
                <strong>Test Done:</strong> {detail.test_done || "N/A"}
              </p>
              {/* <p className="text-gray-600">
                <strong>Test Name:</strong> {detail.test_name || "N/A"}
              </p> */}
            </div>
          </div>
        ))
      ) : (
        <p className="text-gray-500">No Patient details available.</p>
      )}
    </div>
  );
};

export default Step1PatientDetails;
