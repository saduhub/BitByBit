// eslint-disable-next-line
import { useState } from 'react';
import { queryOpenAI } from '../helpers';

function EfficiencyWindow() {
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');

  const handleInputChange = (event) => {
    setPrompt(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const result = await queryOpenAI(prompt);
    setResponse(result);
  };

  return (
    <div>
      <h1>OpenAI API Test</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" value={prompt} onChange={handleInputChange} />
        <button type="submit">Send</button>
      </form>
      <p>Response: {response}</p>
    </div>
  );
}

export default EfficiencyWindow;