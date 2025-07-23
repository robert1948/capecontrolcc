import React, { useState } from 'react';

const TermsPrompt = ({ onAccept }) => {
  const [accepted, setAccepted] = useState(false);

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg">
        <h2 className="text-xl font-bold">Accept Terms</h2>
        <p>Please review our <a href="/docs/Customer_Terms_and_Conditions.pdf" target="_blank" className="text-blue-500">Terms and Conditions</a>.</p>
        <input type="checkbox" checked={accepted} onChange={() => setAccepted(!accepted)} />
        <label>I agree to the Terms and Conditions</label>
        <button
          className="bg-blue-500 text-white py-2 px-4 rounded disabled:opacity-50"
          disabled={!accepted}
          onClick={onAccept}
        >
          Accept
        </button>
      </div>
    </div>
  );
};

export default TermsPrompt;
