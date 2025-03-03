import React, { createContext, useEffect, useState, useCallback } from "react";
import { testReportServices } from "../services/services";

export const TestReportContext = createContext();

export const TestReportProvider = ({ children }) => {
  const [testData, setTestData] = useState({
    personal_details: {
      patient_id: "",
      patient_name: "",
      booking_id: "",
      test_noId: "",
      age: "",
      gender: "",
      date: "",
      test_done: "",
      test_name: "",
    },
    test_details: [
      {
        test_id: "",
        test_name: "",
        indications: "",
        cost: "",
        test_type: "",
        technology: "",
        test_for_age_group: "",
        test_category: "",
        image_name: "",
      },
    ],
    instructions: [
      {
        test_id: "",
        test_instructions: [],
      },
    ],
    question_and_answers: [
      {
        question: "",
        answers: [
          {
            question: "",
            options: [],
          },
        ],
      },
    ],
  });

  const [fetchedData, setFetchedData] = useState(null);

  // Fetch test reports data
  const fetchTestReports = useCallback(async () => {
    try {
      const data = await testReportServices.fetchAll();
      if (data && data.length > 0) {
        setTestData(data[0]); // Update testData state with fetched data
        setFetchedData(data); // Store first report separately if needed
        console.log(data);
      }
    } catch (error) {
      console.error("Error fetching test reports:", error);
    }
  }, []);

  useEffect(() => {
    fetchTestReports();
  }, [fetchTestReports]);

  // Function to update test reports data
  const updateTestReportData = (section, field, value) => {
    setTestData((prevState) => {
      if (field === null) {
        // Replace the entire section
        return { ...prevState, [section]: value };
      } else if (
        typeof prevState[section] === "object" &&
        !Array.isArray(prevState[section])
      ) {
        // Update a specific field in a nested object
        return {
          ...prevState,
          [section]: { ...prevState[section], [field]: value },
        };
      } else {
        // Directly update arrays or strings
        return { ...prevState, [section]: value };
      }
    });
  };

  return (
    <TestReportContext.Provider
      value={{ testData, updateTestReportData, fetchedData }}
    >
      {children}
    </TestReportContext.Provider>
  );
};

export default TestReportProvider;
