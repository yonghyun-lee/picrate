<script lang="ts">
  import { shareId } from '../store/store';
  import Modal from './Modal.svelte';

  let isOpen: boolean = false;
  let url: string = '';

  shareId.subscribe((value) => {
    isOpen = !!value;
    url = `http://localhost:5173/review/${value}`;
  });
</script>

<Modal {isOpen}>
  <input
    type="text"
    id="small-input"
    class="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
    bind:value={url}
    readonly
  />
</Modal>
