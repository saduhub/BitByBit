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
        } else {
            console.error("Failed to fetch data from my server after Pantry query:", response.status);
        }
    } catch (error) {
        console.error("Error fetching data from my server after Pantry query:", error);
    }
};

export const storeFormData = async (data) => {
    try {
        const response = await fetch('/api', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
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