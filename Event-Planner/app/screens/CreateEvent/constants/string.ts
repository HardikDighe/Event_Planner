// constants.ts
export const API_BASE_URL = 'http://localhost:3000';

export const ENDPOINTS = {
  createEvent: '/EventRegistration',
};

export const ERROR_MESSAGES = {
  createEventError: 'Failed to create event',
};

export const ALERT_MESSAGES = {
  createEventSuccess: (eventTitle: string, date: string, time: string, location: string) =>
    `Event Created Successfully!\nEvent Title: ${eventTitle}\nDate: ${date}\nTime: ${time}\nLocation: ${location}`,
 
};
