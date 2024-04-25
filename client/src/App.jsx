import { useState, useEffect } from 'react';
// import './App.css';
import RadioButtonGroup from './components/RadioButtonGroup';
import { getLocalStorageValue, getHabitData, storeFormData, getTodayData, getPastData, getDate } from './helpers';
import questions from './questions';

function App() {
    // Form persistence behavior - local storage save data retrieval for radio button checked behavior.
    const [responses, setResponses] = useState({
        countCalories: getLocalStorageValue('countCalories', 'N/A'), 
        shower: getLocalStorageValue('shower', 'N/A'),
        pwDaily: getLocalStorageValue('pwDaily', 'N/A')
    });
    // Data from Pantry saved to states below.
    // eslint-disable-next-line
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
            <div key={date} className='text-center'>
                <strong>{date}</strong>: {JSON.stringify(pastData[date])}
            </div>
        ));
    };
    

  return (
      <div className="container my-5">
          <div className="row justify-content-center">
            <div className="col-md-8">
                <form onSubmit={handleSubmit} className="mb-4">
                    <h3 className="mb-3 text-center">Bits for {today}</h3>
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
                    <div className="d-flex justify-content-center">
                        <button type="submit" className="btn btn-primary">Save</button>
                    </div>
                </form>
            </div>
          </div>
          <div className="row">
            <div className="col-12">
                <h3 className="mb-3 text-center">Previous Bits</h3>
                <div>{renderPastData()}</div>
            </div>
          </div>
      </div>
  );
}

export default App;


