import { useState, useEffect } from 'react';
import { queryOpenAI } from '../helpers';

function EfficiencyWindow({ pastData }) {
  const [prompt, setPrompt] = useState('');
  const [date, setDate] = useState('');
  const [period, setPeriod] = useState('daily');
  const [response, setResponse] = useState('');

  // Log changes to state
  useEffect(() => {
    console.log("Date:", date);
    console.log("Period:", period);
  }, [date, period]);
  
  const handleInputChange = (event) => {
    setPrompt(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const result = await queryOpenAI(prompt, pastData);
    setResponse(result);
  };

  return (
    <div className="container mt-4">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <h2 className="text-center mb-3">Efficiency Analysis</h2>
          <form onSubmit={handleSubmit} className="mb-4">
            <div className="form-group">
              <label htmlFor="dateInput" className="form-label">Select Date:</label>
              <input 
                type="date" 
                className="form-control"
                id="dateInput"
                value={date} 
                onChange={e => setDate(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="periodSelect" className="form-label">Select Period:</label>
              <select 
                className="form-select"
                id="periodSelect"
                value={period} 
                onChange={e => setPeriod(e.target.value)}
              >
                <option value="daily">Day</option>
                <option value="weekly">Week</option>
                <option value="monthly">Month</option>
              </select>
            </div>
            <div className="d-flex justify-content-center">
              <button type="submit" className="btn btn-primary mt-3">Analyze</button>
            </div>
            {/* Ask me anything */}
            <div className="form-group">
            <h2 className="text-center mb-3 mt-3">Analysis Via Prompt</h2>
              <input 
                  type="text" 
                  className="form-control"
                  value={prompt} 
                  onChange={handleInputChange} 
                  placeholder="Ask specific questions about your data!" 
              />
            </div>
            <div className="d-flex justify-content-center">
              <button type="submit" className="btn btn-primary mt-3">Send</button>
            </div>
          </form>
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Results:</h5>
              <p className="card-text">{response}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EfficiencyWindow;