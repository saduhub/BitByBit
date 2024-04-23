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

export const testEndPoint = async () => {
    try {
        const response = await fetch('/api'); 
        if (response.ok) {
            const data = await response.json();
            console.log("Data received from server:", data);
        } else {
            console.error("Failed to fetch data from server:", response.status);
        }
    } catch (error) {
        console.error("Error fetching data from server:", error);
    }
};
