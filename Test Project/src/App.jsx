import React from "react";
import TestReportProvider from "./Context/TestReportContext";
import TestReports from "./components/TestReports/TestReports";

const App = () => {
  return (
    <>
      <TestReportProvider>
        <TestReports />
      </TestReportProvider>
    </>
  );
};

export default App;
