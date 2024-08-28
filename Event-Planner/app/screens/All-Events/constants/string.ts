export const STRINGS = {
  noName: 'No Name',
  noPhone: 'No Phone',
  eventTitle: 'Event Title',
  eventDate: 'Event Date',
  eventDay: 'Event Day',
  eventLocation: 'Event Location',
  eventDescription: 'Event Description',
  eventList: 'eventList',
  registerButton: 'Register',
  allEventsTitle: 'All Events',
  searchPlaceholder: 'Search events...',
  sortBy: 'Sort By',
  registerEventButtonText: '+ Register Event', 
  sortByName: 'By Name',
  sortByDate: 'By Date',
  EVENTS_LIST: "Events List",
};

export const API_BASE_URL = 'http://localhost:3000';

export const ENDPOINTS = {
  fetchEvents: '/EventRegistration',
};

// Define error messages
export const ERROR_MESSAGES = {
  fetchError: 'Failed to fetch events.',
  sharingError: 'Sharing not available',
  pdfCreationError: 'An error occurred while creating the PDF',
  printingError: 'An error occurred while printing',
};
