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