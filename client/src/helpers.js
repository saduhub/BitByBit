import dayjs from 'dayjs'

export const getLocalStorageValue = (key, defaultValue) => {
    const storedValue = localStorage.getItem(key);
    if (storedValue === "true") {
        return true;
    } else if (storedValue === "false") {
        return false;
    } else {
        return storedValue || defaultValue;
    }
};

export const setLocalStorage = (key, value) => {
    localStorage.setItem(key, String(value));
};

export const getHabitData = async () => {
    try {
        const response = await fetch('/api'); 
        if (response.ok) {
            const data = await response.json();
            console.log("Data received from my server after Pantry query:", data);
            return data;
        } else {
            console.error("Failed to fetch data from my server after Pantry query:", response.status);
        }
    } catch (error) {
        console.error("Error fetching data from my server after Pantry query:", error);
    }
};

export const getDate = () => {
    return dayjs().format('YYYY-MM-DD');
};

export const getTodayData = (allData) => {
    const today = dayjs().format('YYYY-MM-DD');
    // console.log("Today's date:", today); 
    // console.log("All data keys:", Object.keys(allData));
    // console.log(today)
    // console.log(allData[today])
    return allData[today] || {};
};

export const getPastData = (allData) => {
    const today = dayjs().format('YYYY-MM-DD');
    const pastData = {...allData};
    delete pastData[today];
    // console.log("Past data keys after deletion:", Object.keys(pastData)); 
    // console.log(pastData);
    return pastData;
};

export const storeFormData = async (newResponses, today, pastData) => {
    const dataPayload = {
        ...pastData, 
        [today]: newResponses 
    };
    console.log(dataPayload)
    try {
        const response = await fetch('/api', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dataPayload)
        });
        if (response.ok) {
            const result = await response.json();
            console.log("Data saved to Pantry:", result);
        } else {
            console.error("Failed to save data:", response.statusText);
        }
    } catch (error) {
        console.error("Error while saving data:", error);
    }
};

export const queryOpenAI = async (prompt) => {
    const response = await fetch('/openai', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt })
    });

    if (response.ok) {
        const data = await response.json();
        return data;
    } else {
        throw new Error("Failed to get response from OpenAI");
    }
};
