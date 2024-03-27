/**
 * Opens the IndexedDB database 'YourCandidatesDB' and creates an object store named 'formDataStore'.
 * @returns {Promise<IDBDatabase>} Promise that resolves with the opened database.
 */
const openDB = () => {
    return new Promise((resolve, reject) => {
        const request = window.indexedDB.open('YourCandidatesDB', 1);

        request.onupgradeneeded = (event) => {
            const db = event.target.result;
            db.createObjectStore('formDataStore', { keyPath: 'id', autoIncrement: true });
        };

        request.onsuccess = (event) => {
            resolve(event.target.result);
        };

        request.onerror = (event) => {
            reject(`Error opening database: ${event.target.error}`);
        };
    });
};

const dbPromise = openDB();
/**
 * Deletes data from the 'formDataStore' object store in IndexedDB based on the provided key.
 * @param {*} key Key of the data to be deleted.
 * @returns {Promise<string>} Promise that resolves with a success message or rejects with an error message.
 */const deleteState = async (key) => {
    const db = await dbPromise;

    return new Promise((resolve, reject) => {
        const transaction = db.transaction(['formDataStore'], 'readwrite');
        const objectStore = transaction.objectStore('formDataStore');

        const request = objectStore.delete(key);

        request.oncomplete = () => {
            resolve('Data deleted successfully');

        };
        
        request.onerror = (event) => {
            reject(`Transaction error: ${event.target.error}`);
        };
    });
};

const subscribers = [];

/**
 * Subscribes a callback function to changes in the IndexedDB data.
 * @param {Function} callback Callback function to be called on changes.
 */
const subscribeToChanges = (callback) => {
    subscribers.push(callback);
};
/**
 * Notifies all subscribed callback functions about the changes in IndexedDB data.
 */
const notifySubscribers = () => {
    subscribers.forEach(callback => callback());
};

/**
 * Saves data to the 'formDataStore' object store in IndexedDB.
 * @param {*} value Data to be saved.
 * @returns {Promise<string>} Promise that resolves with a success message or rejects with an error message.
 */
const saveState = async (value) => {
    const db = await dbPromise;

    return new Promise((resolve, reject) => {
        const transaction = db.transaction(['formDataStore'], 'readwrite');
        const objectStore = transaction.objectStore('formDataStore');

        const request = objectStore.add(value);

        request.onsuccess = () => {
            notifySubscribers();
            resolve('Data saved successfully');
        };

        request.onerror = (event) => {
            reject(`Error saving data: ${event.target.error}`);
        };
    });
};

/**
 * Loads all data from the 'formDataStore' object store in IndexedDB.
 * @returns {Promise<any[]>} Promise that resolves with the loaded data or rejects with an error message.
 */
const loadState = async () => {
    const db = await dbPromise;

    return new Promise((resolve, reject) => {
        const transaction = db.transaction(['formDataStore'], 'readonly');
        const objectStore = transaction.objectStore('formDataStore');
        const request = objectStore.getAll();

        request.onsuccess = (event) => {
            resolve(event.target.result);
        };

        request.onerror = (event) => {
            reject(`Error loading data: ${event.target.error}`);
        };
    });
};

export { openDB, saveState, loadState, deleteState, subscribeToChanges, subscribers };