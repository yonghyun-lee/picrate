<script lang="ts">
  import { push } from 'svelte-spa-router';
  import { api } from '../api';
  import { currentFields, currentId, isOpenNameModal } from '../store/store';
  import Modal from './Modal.svelte';

  let isOpen: boolean = false;
  let name: string = '';
  let fields;
  let id;

  currentFields.subscribe((value) => {
    fields = value;
  });

  isOpenNameModal.subscribe((value) => {
    isOpen = value;
  });

  currentId.subscribe((value) => {
    id = value;
  });

  async function handleSubmit() {
    if (name.trim() === '') {
      alert('평가자의 이름을 입력해주세요.');
      return;
    }
    try {
      await api.post(`${import.meta.env.VITE_API_URL}/ratings/card/${id}`, {
        name,
        fields: fields.map((field) => {
          return {
            id: field.id,
            rate: field.rate,
          };
        }),
      });
      isOpenNameModal.set(false);
      alert('평가 완료');
      push('/complete');
    } catch (e) {
      console.log(e);
    }
  }
</script>

<Modal {isOpen}>
  <label
    for="name"
    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
    >평가자 이름</label
  >
  <input
    type="text"
    id="name"
    class="font-semibold text-xs block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 xs:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
    bind:value={name}
  />
  <button
    type="button"
    class="pink margin-auto text-white focus:ring-4 focus:ring-pink-300 font-medium rounded-lg text-xs px-5 py-2.5 mr-2 mb-2 focus:outline-none"
    on:click={handleSubmit}>완료</button
  >
</Modal>
