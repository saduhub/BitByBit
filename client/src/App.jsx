import { useState, useEffect } from 'react';
import './App.css';
import RadioButtonGroup from './components/RadioButtonGroup';
import { getLocalStorageValue, setLocalStorage } from './storageHelpers';
import questions from './questions';

function App() {
  const initialResponses = questions.reduce((acc, question) => ({
      ...acc,
      [question.name]: getLocalStorageValue(question.name, 'N/A')
  }), {});

  const [responses, setResponses] = useState(initialResponses);

  useEffect(() => {
      Object.keys(responses).forEach(key => setLocalStorage(key, String(responses[key])));
  }, [responses]);

  console.log(responses);

  const handleChange = (e) => {
      const { name, value } = e.target;
      setResponses(prevResponses => ({
          ...prevResponses,
          [name]: value === "true" ? true : (value === "false" ? false : value)
      }));
  };

  return (
      <>
          <div>
              <form onSubmit={e => { e.preventDefault(); console.log(responses); }}>
                  <h3>Survey Questions</h3>
                  {questions.map(question => (
                      <RadioButtonGroup
                          key={question.name}
                          label={question.label}
                          name={question.name}
                          options={question.options}
                          value={responses[question.name]}
                          onChange={handleChange}
                      />
                  ))}
                  <button type="submit">Submit</button>
              </form>
          </div>
      </>
  );
}

export default App;


