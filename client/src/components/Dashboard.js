import React, { useState } from 'react';

const Dashboard = () => {
  const [query, setQuery] = useState('');
  const [response, setResponse] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    // TODO: Implement AI query submission
    setResponse('AI response will appear here');
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">AI Dashboard</h2>
      <form onSubmit={handleSubmit} className="mb-4">
        <textarea
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Enter your AI query here..."
          className="w-full p-2 border border-gray-300 rounded mb-2"
          rows="4"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        >
          Submit Query
        </button>
      </form>
      {response && (
        <div className="bg-gray-100 p-4 rounded">
          <h3 className="font-bold mb-2">Response:</h3>
          <p>{response}</p>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
