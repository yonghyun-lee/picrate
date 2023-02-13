import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

const isMock = true;

if (isMock) {
  // eslint-disable-next-line no-console
  console.log('***********************API MOCK MODE***********************');
  const mock = new MockAdapter(axios, { delayResponse: 1000 });

  console.log(import.meta.env.VITE_API_URL);
  mock.onPost(`${import.meta.env.VITE_API_URL}/card`).reply(200, {
    data: {
      id: 1,
    },
    error: null,
  });
}

export const api = axios.create({
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
});
