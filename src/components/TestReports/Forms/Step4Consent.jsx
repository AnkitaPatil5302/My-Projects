import React from "react";

const Step4Consent = ({ handleChange, isChecked }) => {
  return (
    <div className="flex flex-col gap-4">
      <div>
        <h2 className="text-xl font-bold">Consent Agreement</h2>
        <p className="text-gray-600 mt-2">
          Please read the agreement below and tick the box if you agree to the
          terms and conditions.
        </p>
      </div>

      {/* Scrollable Consent Agreement */}
      <div className="border p-4 h-48 overflow-y-scroll bg-gray-100 rounded-md">
        <p className="text-sm text-gray-800">
          <strong>Medical Virtual Test Consent Agreement</strong> <br />
          <br />I hereby give my consent to participate in a virtual medical
          test conducted by <strong>organiztion</strong>. I understand that the
          virtual test is conducted remotely and that all necessary precautions
          will be taken to ensure my privacy and data security.
          <br />
          <br />
          I acknowledge that the virtual test does not replace an in-person
          consultation and that I am responsible for providing accurate
          information. I understand that misrepresentation of symptoms or test
          results may impact my medical assessment.
          <br />
          <br />
          By agreeing to this consent, I acknowledge that{" "}
          <strong>organiztion</strong> is not liable for any unforeseen issues
          arising from technical difficulties, misinterpretation of data, or
          lack of physical examination.
        </p>
      </div>

      {/* Checkbox for Agreement */}
      <label
        htmlFor="helper-checkbox"
        className="flex cursor-pointer select-none items-center mt-4"
      >
        <div className="relative">
          <input
            id="helper-checkbox"
            aria-describedby="helper-checkbox-text"
            type="checkbox"
            name="agree"
            value="agree"
            checked={isChecked}
            onChange={handleChange}
            className="sr-only"
          />
          <div
            className={`box border mr-4 flex h-5 w-5 items-center justify-center rounded-full border-black ${
              isChecked && "bg-green-500 border-0"
            }`}
          >
            <span className="h-[10px] w-[10px] rounded-full bg-white " />
          </div>
        </div>
        <span className="text-sm">
          I confirm that I have read and understood the terms outlined above. I
          voluntarily agree to proceed with the virtual medical test.
        </span>
      </label>
    </div>
  );
};

export default Step4Consent;
