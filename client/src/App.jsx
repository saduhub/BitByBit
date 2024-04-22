import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const getLocalStorageValue = (key, defaultValue) => {
    const storedValue = localStorage.getItem(key);
    if (storedValue === "true") {
      return true;
    } else if (storedValue === "false") {
      return false;
    } else {
      return storedValue || defaultValue;
    }
  };

  const [responses, setResponses] = useState({
    countCalories: getLocalStorageValue('countCalories', 'N/A'), 
    shower: getLocalStorageValue('shower', 'N/A'),
    pwDaily: getLocalStorageValue('pwDaily', 'N/A')
  });

  useEffect(() => {
    for (const key in responses) {
      localStorage.setItem(key, String(responses[key]));
    }
  }, [responses]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setResponses(prevResponses => ({
      ...prevResponses,
      [name]: value === "true" ? true : (value === "false" ? false : "N/A")
    }));
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Final responses:', responses);
  }

  return (
    <>
      <div>
        <form onSubmit={handleSubmit} className="app-form">
          <h3>Survey Questions</h3>
          <div>
            <label>Do you count calories daily?</label>
            <label><input type="radio" name="countCalories" value="true" checked={responses.countCalories === true} onChange={handleChange} /> Yes</label>
            <label><input type="radio" name="countCalories" value="false" checked={responses.countCalories === false} onChange={handleChange} /> No</label>
            <label><input type="radio" name="countCalories" value="N/A" checked={responses.countCalories === 'N/A'} onChange={handleChange} /> N/A</label>
          </div>
          <div>
            <label>Did you shower today?</label>
            <label><input type="radio" name="shower" value="true" checked={responses.shower === true} onChange={handleChange} /> Yes</label>
            <label><input type="radio" name="shower" value="false" checked={responses.shower === false} onChange={handleChange} /> No</label>
            <label><input type="radio" name="shower" value="N/A" checked={responses.shower === 'N/A'} onChange={handleChange} /> N/A</label>
          </div>
          <div>
            <label>Do you practice password changes daily?</label>
            <label><input type="radio" name="pwDaily" value="true" checked={responses.pwDaily === true} onChange={handleChange} /> Yes</label>
            <label><input type="radio" name="pwDaily" value="false" checked={responses.pwDaily === false} onChange={handleChange} /> No</label>
            <label><input type="radio" name="pwDaily" value="N/A" checked={responses.pwDaily === 'N/A'} onChange={handleChange} /> N/A</label>
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>
    </>
  );
}

export default App;

