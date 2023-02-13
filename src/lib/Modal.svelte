<script lang="ts">
  import { Modal, type ModalInterface, type ModalOptions } from 'flowbite';
  import { beforeUpdate, onMount } from 'svelte';

  export let isOpen: boolean = false;
  export let title: string | undefined = undefined;
  export let isEnableConfirm: boolean = false;

  let element;
  let modal: ModalInterface | undefined;

  const options: ModalOptions = {
    placement: 'center',
    backdrop: 'dynamic',
    closable: false,
    backdropClasses:
      'bg-gray-900 bg-opacity-50 dark:bg-opacity-80 fixed inset-0 z-40',
  };

  onMount(() => {
    modal = new Modal(element, options);
  });
  beforeUpdate(() => {
    if (!modal) {
      return;
    }
    if (isOpen) {
      modal.show();
    } else {
      modal.hide();
    }
  });
</script>

<div
  id="modalEl"
  tabindex="-1"
  aria-hidden="true"
  class="fixed top-0 left-0 right-0 z-50 hidden w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-modal md:h-full"
  bind:this={element}
>
  <div class="relative w-full max-w-2xl md:h-auto">
    <!-- Modal content -->
    <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
      <!-- Modal header -->
      {#if title}
        <div
          class="flex items-start justify-between p-5 border-b rounded-t dark:border-gray-600"
        >
          <h3
            class="text-xl font-semibold text-gray-900 lg:text-2xl dark:text-white"
          >
            {title}
          </h3>
          <button
            type="button"
            class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
          >
            <svg
              class="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
              ><path
                fill-rule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clip-rule="evenodd"
              /></svg
            >
          </button>
        </div>
      {/if}
      <!-- Modal body -->
      <div class="p-6 space-y-6">
        <slot />
      </div>
      <!-- Modal footer -->
      {#if isEnableConfirm}
        <div
          class="flex justify-center items-center p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600"
        >
          <button
            type="button"
            class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >I accept</button
          >
        </div>
      {/if}
    </div>
  </div>
</div>
