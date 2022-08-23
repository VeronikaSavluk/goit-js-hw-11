import axios from 'axios';

export default async function getPromise(URL) {
  try {
    const { data } = await axios.get(URL);
    return data;
  } catch (error) {
    console.error(error);
  }
}