import axios from 'axios';

export default async function getPromise(URL) {
  try {
    const response = await axios.get(URL);
    return response;
  } catch (error) {
    console.error(error);
  }
}