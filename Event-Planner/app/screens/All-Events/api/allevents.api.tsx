// api.js

// Define your API endpoint
const API_URL = 'http://localhost:3000/AllEvent';

// Fetch data from the API
export const fetchEvents = async () => {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return await response.json();
  } catch (error) {
    throw error;
  }
};
