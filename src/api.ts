import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

const isMock = false;

if (isMock) {
  // eslint-disable-next-line no-console
  console.log('***********************API MOCK MODE***********************');
  const mock = new MockAdapter(axios, { delayResponse: 1000 });

  mock.onPost(`${import.meta.env.VITE_API_URL}/card`).reply(200, {
    data: {
      id: 1,
    },
    error: null,
  });
  mock.onGet(`${import.meta.env.VITE_API_URL}/card/1`).reply(200, {
    data: {
      id: 1,
      created_at: '2023-02-08T17:43:57.88564',
      modified_at: '2023-02-08T17:43:57.88564',
      image: {
        id: 1,
        org_name: 'me.jpg',
        hash_name: '0277c8a50afe87cc91ebff304e58f33bf7dcaf02',
        type: 'image/jpeg',
        size: 333540,
      },
      ratings: [
        {
          id: 1,
          x: 100,
          y: 150,
          rate: null,
          label: 'label1',
        },
        {
          id: 2,
          x: 130,
          y: 50,
          rate: null,
          label: 'label2',
        },
      ],
    },
    error: null,
  });
  const regex = new RegExp(`${import.meta.env.VITE_API_URL}/*`);
  mock.onGet(regex).reply(200, {});
}

export const api = axios.create({
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
});

api.interceptors.response.use(
  (response) => response,
  () => {
    alert('에러가 발생하였습니다. 잠시 후 다시 시도해주세요.');
  }
);
