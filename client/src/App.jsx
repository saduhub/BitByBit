import { useState, useEffect } from 'react';
import './App.css';
import RadioButtonGroup from './components/RadioButtonGroup';
import { getLocalStorageValue, setLocalStorage, getHabitData, storeFormData, getTodayData, getPastData, getDate } from './helpers';
import questions from './questions';

function App() {
    // Form persistence behavior - local storage save data retrieval for radio button checked behavior.
    const [responses, setResponses] = useState({
        countCalories: getLocalStorageValue('countCalories', 'N/A'), 
        shower: getLocalStorageValue('shower', 'N/A'),
        pwDaily: getLocalStorageValue('pwDaily', 'N/A')
    });
    // Data from Pantry saved to states below.
    const [todayData, setTodayData] = useState({});
    const [pastData, setPastData] = useState({});
    // Determine date
    const today = getDate()
    // Form persistence behavior - Update local storage when selecting another option.
    useEffect(() => {
        for (const key in responses) {
          localStorage.setItem(key, String(responses[key]));
        }
    }, [responses]);
    // On load, fetch and set today's data as well as past data to corresponding states.
    useEffect(() => {
        async function fetchData() {
            const allData = await getHabitData();
            console.log('Data received by client:', allData)
            if (allData) {
                setTodayData(getTodayData(allData));
                setPastData(getPastData(allData));
                // console.log(todayData);
                // console.log(pastData);
            }
        }
        fetchData();
    }, []);

    // Testing response updating
    useEffect(() => {
        console.log('Updated responses:', responses);
    }, [responses]);
    // Attach event listeners to radio buttons. These trigger response update.
    const handleChange = (e) => {
        const { name, value } = e.target;
        setResponses(prevResponses => ({
            ...prevResponses,
            [name]: value === "true" ? true : (value === "false" ? false : "N/A")
        }));
    };
    // Allow user to submit today's data to db.
    const handleSubmit = async (e) => {
        e.preventDefault();
        await storeFormData(responses, today, pastData);
    };
    // Display past data for the user.
    const renderPastData = () => {
        // Sort dates in descending order
        const sortedDates = Object.keys(pastData).sort((a, b) => new Date(b) - new Date(a));
        return sortedDates.map(date => (
            <div key={date}>
                <strong>{date}</strong>: {JSON.stringify(pastData[date])}
            </div>
        ));
    };
    

  return (
      <>
          <div>
              <form onSubmit={handleSubmit}>
                  <h3>Survey Questions {today}</h3>
                  {questions.map(question => (
                      <RadioButtonGroup
                          key={question.name}
                          label={question.label}
                          name={question.name}
                          options={question.options}
                          value={responses[question.name]}
                        //   value={todayData[question.name] || 'N/A'}
                          onChange={handleChange}
                      />
                  ))}
                  <button type="submit">Submit</button>
              </form>
          </div>
          <div>
              <h3>Previous Days</h3>
              <div>{renderPastData()}</div>
          </div>
      </>
  );
}

export default App;


