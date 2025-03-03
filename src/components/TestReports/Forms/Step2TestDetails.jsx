import React, { useContext, useEffect, useState, useRef } from "react";
import { TestReportContext } from "../../../Context/TestReportContext";

const Step2TestDetails = () => {
  const { testData, updateTestReportData } = useContext(TestReportContext);
  const [selectedTestDetail, setSelectedTestDetail] = useState(null);
  const previousTestDetail = useRef(null); // ✅ Store previous value to prevent redundant updates

  useEffect(() => {
    if (testData.personal_details && testData.test_details) {
      const patientTestName = testData.personal_details[0]?.test_name;

      const foundTestDetail = testData.test_details.find(
        (test) => test.test_name === patientTestName
      );

      if (foundTestDetail && previousTestDetail.current !== foundTestDetail) {
        setSelectedTestDetail(foundTestDetail);
        updateTestReportData("selected_test_detail", null, foundTestDetail);
        previousTestDetail.current = foundTestDetail; // ✅ Store previous value
      }
    }
  }, [testData.personal_details, testData.test_details]); // ✅ Use only necessary dependencies

  return (
    <div className="flex flex-col gap-4 w-full">
      <div className="text-lg font-bold">Step 2 : Test Details</div>
      {selectedTestDetail ? (
        <div className="border rounded-lg shadow-md p-4 mb-4 bg-white">
          <p className="text-gray-700">
            <strong>Test Id:</strong> {selectedTestDetail.test_id || "N/A"}
          </p>
          <p className="text-gray-700">
            <strong>Test Name:</strong> {selectedTestDetail.test_name}
          </p>
          <p className="text-gray-700">
            <strong>Indications:</strong>{" "}
            {selectedTestDetail.indications || "N/A"}
          </p>
          <p className="text-gray-600">
            <strong>Cost:</strong> ${selectedTestDetail.cost || "N/A"}
          </p>
          <p className="text-gray-600">
            <strong>Test Type:</strong> {selectedTestDetail.test_type || "N/A"}
          </p>
          <p className="text-gray-600">
            <strong>Technology:</strong>{" "}
            {selectedTestDetail.technology || "N/A"}
          </p>
          <p className="text-gray-600">
            <strong>Age Group:</strong>{" "}
            {selectedTestDetail.test_for_age_group || "N/A"}
          </p>
          <p className="text-gray-600">
            <strong>Category:</strong>{" "}
            {selectedTestDetail.test_category || "N/A"}
          </p>
          <p className="text-gray-600">
            <strong>Image:</strong> {selectedTestDetail.image_name || "N/A"}
          </p>
        </div>
      ) : (
        <p className="text-gray-500">No matching test details available.</p>
      )}
    </div>
  );
};

export default Step2TestDetails;
