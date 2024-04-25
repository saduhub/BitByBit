import { useState, useEffect } from 'react';
import './App.css';
import RadioButtonGroup from './components/RadioButtonGroup';
import { getLocalStorageValue, setLocalStorage, getHabitData, storeFormData, getTodayData, getPastData, getDate } from './helpers';
import questions from './questions';

function App() {
    const [todayData, setTodayData] = useState({});
    const [pastData, setPastData] = useState({});
    const today = getDate()

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

    const handleChange = (e) => {
        const { name, value } = e.target;
        console.log(name);
        console.log(value);

    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // await storeFormData(responses);
    };

    const renderPastData = () => {
        const sortedDates = Object.keys(pastData).sort((a, b) => new Date(b) - new Date(a)); // Sort dates in descending order
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
                        //   value={responses[question.name]}
                          value={todayData[question.name] || 'N/A'}
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


