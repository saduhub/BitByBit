import { useState, useEffect } from 'react';
// import './App.css';
import RadioButtonGroup from './components/RadioButtonGroup';
import EfficiencyWindow from './components/EfficiencyWindow';
import { getLocalStorageValue, getHabitData, storeFormData, getTodayData, getPastData, getDate } from './helpers';
import questions from './ask';

function App() {
    // Form persistence behavior - local storage save data retrieval for radio button checked behavior.
    const [responses, setResponses] = useState({
        countCaloriesBreakfast: getLocalStorageValue('countCaloriesBreakfast', 'N/A'), 
        countCaloriesLunch: getLocalStorageValue('countCaloriesLunch', 'N/A'), 
        countCaloriesDinner: getLocalStorageValue('countCaloriesDinner', 'N/A'), 
        shower: getLocalStorageValue('shower', 'N/A'),
        pwDaily: getLocalStorageValue('pwDaily', 'N/A'),
        haircut: getLocalStorageValue('haircut', 'N/A'),
        stylingHair: getLocalStorageValue('stylingHair', 'N/A'),
        brushTeethMorning: getLocalStorageValue('brushTeethMorning', 'N/A'),
        brushTeethNight: getLocalStorageValue('brushTeethNight', 'N/A'),
        drinkWater: getLocalStorageValue('drinkWater', 'N/A'),
        noJunkFood: getLocalStorageValue('noJunkFood', 'N/A'),
        workOut: getLocalStorageValue('workOut', 'N/A'),
        physicalTherapy: getLocalStorageValue('physicalTherapy', 'N/A'),
        laundry: getLocalStorageValue('laundry', 'N/A'),
        tortugoCare: getLocalStorageValue('tortugoCare', 'N/A'),
        filterChange: getLocalStorageValue('filterChange', 'N/A'),
        floss: getLocalStorageValue('floss', 'N/A'),
        crypto: getLocalStorageValue('crypto', 'N/A'),
        cleanArea: getLocalStorageValue('cleanArea', 'N/A'),
        roomba: getLocalStorageValue('roomba', 'N/A'),
        medicineMorning: getLocalStorageValue('medicineMorning', 'N/A'),
        medicineAfternoon: getLocalStorageValue('medicineAfternoon', 'N/A'),
        medicineNight: getLocalStorageValue('medicineNight', 'N/A'),
        trash: getLocalStorageValue('trash', 'N/A'),
        pillowCover: getLocalStorageValue('pillowCover', 'N/A'),
        cases: getLocalStorageValue('cases', 'N/A'),
        textMom: getLocalStorageValue('textMom', 'N/A'),
        textDad: getLocalStorageValue('textDad', 'N/A'),
        tenCommits: getLocalStorageValue('tenCommits', 'N/A'),
        cleanOffice: getLocalStorageValue('cleanOffice', 'N/A'),
        niceGesture: getLocalStorageValue('niceGesture', 'N/A'),
        charging: getLocalStorageValue('charging', 'N/A'),
        homeImprovement: getLocalStorageValue('homeImprovement', 'N/A'),
        ...Object.fromEntries(new Array(15).fill(null).map((_, i) => [
            `pomodoro${i + 1}`, getLocalStorageValue(`pomodoro${i + 1}`, 'N/A')
        ]))
    });
    // Reset entries every day.
    useEffect(() => {
        const resetChoicesDaily = () => {
            const currentDate = getDate();
            const storedDate = localStorage.getItem('storedDate');
            if (!storedDate || storedDate !== currentDate) {
                // Construct a new state with 'N/A' for all options.
                const newResponses = {};
                Object.keys(responses).forEach(key => {
                    newResponses[key] = 'N/A';
                });
                // Update state of responsed to undo previous state set by user and store new access date.
                setResponses(newResponses);
                localStorage.setItem('storedDate', currentDate); 
                // Also update localStorage for all items.
                for (const key in newResponses) {
                    localStorage.setItem(key, 'N/A');
                }
            }
        };
        resetChoicesDaily();
    });
    // Data from Pantry saved to states below.
    // eslint-disable-next-line
    const [todayData, setTodayData] = useState({});
    const [pastData, setPastData] = useState({});
    // Determine date
    const today = getDate();
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
        return (
            <div className="row justify-content-center"> 
                {sortedDates.map(date => (
                    <div key={date} className="col-8 col-sm-6 col-md-4 col-lg-3 mb-3">
                        <div className="card h-100">
                            <div className="card-header text-center">
                                <strong>Date: {date}</strong>
                            </div>
                            <div className="card-body text-center">
                                {Object.entries(pastData[date]).map(([task, status]) => (
                                    <p className="card-text" key={task}>
                                        <strong>{task.replace(/([A-Z])/g, ' $1').trim()}:</strong> {status.toString()}
                                    </p>
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        );
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
          <EfficiencyWindow/>
      </div>
  );
}

export default App;


