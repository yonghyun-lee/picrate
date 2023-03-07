<script lang="ts">
  import { shareId } from '../store/store';
  import Modal from './Modal.svelte';

  let isOpen: boolean = false;
  let url: string = '';

  shareId.subscribe((value) => {
    if (!value) {
      return;
    }
    isOpen = !!value;
    url = `#/review/${value}`;
  });
</script>

<Modal {isOpen}>
  <div class="bg-gray-200 rounded p-2">
    {#if url}
      <a class="pink" href={url} target="_blank" rel="noreferrer">{url}</a>
    {/if}
  </div>
</Modal>
