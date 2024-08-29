import axios from 'axios';
import { ERROR_MESSAGE, API_URL, ENDPOINT } from '../constants/string';

export const fetchUsers = async () => {
  try {
    const response = await axios.get(`${API_URL}${ENDPOINT}`);
    return response.data;
  } catch (error) {
    throw new Error(ERROR_MESSAGE.fetchingError);
  }
};
