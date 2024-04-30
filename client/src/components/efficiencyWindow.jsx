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
    <div className="container mt-4">
      <div className="row justify-content-center">
        <div className="col-md-8">
            <h1 className="text-center mb-3">OpenAI API Test</h1>
            <form onSubmit={handleSubmit} className="mb-4">
              <div className="form-group">
                  <input 
                      type="text" 
                      className="form-control"
                      value={prompt} 
                      onChange={handleInputChange} 
                      placeholder="Enter your prompt" 
                  />
              </div>
              <div className="d-flex justify-content-center">
                <button type="submit" className="btn btn-primary mt-3">Send</button>
              </div>
              <div className="d-flex justify-content-center">
                <button type="submit" className="btn btn-primary mt-3">Efficiancy - Day</button>
              </div>
              <div className="d-flex justify-content-center">
                <button type="submit" className="btn btn-primary mt-3">Efficiancy - Week</button>
              </div>
              <div className="d-flex justify-content-center">
                <button type="submit" className="btn btn-primary mt-3">Efficiancy - Month</button>
              </div>
            </form>
            <div className="card">
              <div className="card-body">
                  <p className="card-text">Response: {response}</p>
              </div>
            </div>
          </div>
      </div>
    </div>
  );
}

export default EfficiencyWindow;