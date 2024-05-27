// ChatComponent.js

import React, { useState } from 'react';

const ChatComponent = () => {
  const [projectId, setProjectId] = useState('');
  const [question, setQuestion] = useState('');
  const [response, setResponse] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/api/chat/ask', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ projectId, question }),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch chat response');
      }

      const data = await response.json();
      setResponse(data);
    } catch (error) {
      console.error('Error fetching chat response:', error);
      setResponse('Error fetching chat response');
    }
  };

  return (
    <div>
      <h1>Chat with PDFs</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="projectId">Project ID:</label>
        <input name='id' type="text" id="projectId" value={projectId} onChange={(e) => setProjectId(e.target.value)} required />
        <br />
        <label htmlFor="question">Question:</label>
        <input name='question' type="text" id="question" value={question} onChange={(e) => setQuestion(e.target.value)} required />
        <br />
        <button type="submit">Submit</button>
      </form>
      <div>
        <h2>Response:</h2>
        <p>{response}</p>
      </div>
    </div>
  );
};

export default ChatComponent;
