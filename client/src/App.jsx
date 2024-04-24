import { useState, useEffect } from 'react';
import './App.css';
import RadioButtonGroup from './components/RadioButtonGroup';
import { getLocalStorageValue, setLocalStorage, getHabitData, storeFormData, getTodayData, getPastData, getDate } from './helpers';
import questions from './questions';

function App() {
//   const initialResponses = questions.reduce((acc, question) => ({
//       ...acc,
//       [question.name]: getLocalStorageValue(question.name, 'N/A')
//   }), {});

//   const [responses, setResponses] = useState(initialResponses);

//   useEffect(() => {
//       Object.keys(responses).forEach(key => setLocalStorage(key, String(responses[key])));
//       getHabitData();
//   }, [responses]);

//   console.log(responses);
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
                console.log(todayData);
                console.log(pastData);
            }
        }
        fetchData();
    }, []);

    useEffect(() => {
        console.log('Updated Today Data:', todayData);
        console.log('Updated Past Data:', pastData);
    }, [todayData, pastData]);

//   const handleChange = (e) => {
//       const { name, value } = e.target;
//       setResponses(prevResponses => ({
//           ...prevResponses,
//           [name]: value === "true" ? true : (value === "false" ? false : value)
//       }));
//   };
    const handleChange = (e) => {
        const { name, value } = e.target;
        setTodayData(prevData => ({
            ...prevData,
            [name]: value === "true" ? true : (value === "false" ? false : value)
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // await storeFormData(responses);
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
              <p>{}</p>
          </div>
      </>
  );
}

export default App;


