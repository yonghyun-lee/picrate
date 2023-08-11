<script lang="ts">
  import { onDestroy, onMount } from 'svelte';
  import { currentFields } from '../store/store';
  import type { Field } from '../types';
  import Rating from './Rating.svelte';

  export let isEditMode: boolean = false;
  export let isResult: boolean = false;
  let data: Field[] = [];

  const unsubscribe = currentFields.subscribe((value) => {
    data = value;
  });

  function handleClickClose(x: number, y: number) {
    if (isEditMode) {
      currentFields.set(
        data.filter((field) => !(field.x === x && field.y === y))
      );
      return;
    }
    currentFields.set(
      data.map((field) => {
        if (field.x === x && field.y === y) {
          field.isOpen = false;
        }
        return field;
      })
    );
  }

  function handleClickPoint(e: MouseEvent, index: number) {
    e.stopPropagation();
    currentFields.set(
      data.map((field, i) => {
        if (i === index) {
          field.isOpen = !field.isOpen;
        }
        return field;
      })
    );
  }

  function handleMouseDown(e: MouseEvent) {
    if (data.every((item) => !item.isEdit)) {
      return;
    }
    e.preventDefault();
    currentFields.set(
      data.map((field) => {
        if (field.isEdit) {
          field.isEdit = false;
        }
        return field;
      })
    );
  }

  onMount(() => {
    document.addEventListener('mousedown', handleMouseDown);
  });

  onDestroy(() => {
    unsubscribe();
    document.removeEventListener('mousedown', handleMouseDown);
  });
</script>

{#each data as field, index (index)}
  <div
    class="field"
    style={`position: absolute; left: ${field.x}px; top: ${field.y}px;`}
    on:mousedown={(e) => e.stopPropagation()}
  >
    <button
      class="pink field-button w-3.5 h-3.5 border-2 border-white rounded-full"
      on:click={(e) => handleClickPoint(e, index)}
    />
    {#if field.isOpen}
      <div
        data-popover
        id="popover-default"
        role="tooltip"
        style="top: -85px; width: auto;"
        class="absolute z-10 inline-block w-32 text-sm font-light text-gray-500 transition-opacity duration-300 bg-white border border-gray-200 rounded-lg shadow-sm dark:text-gray-400 dark:border-gray-600 dark:bg-gray-800"
      >
        <div
          class="relative flex items-center justify-center field-title px-2 py-1 bg-gray-100 border-b border-gray-200 rounded-t-lg dark:border-gray-600 dark:bg-gray-700"
        >
          {#if field.isEdit}
            <input
              type="text"
              id="small-input"
              class="font-semibold text-xs block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 xs:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              bind:value={field.label}
              on:keydown={(e) => {
                if (e.code === 'Enter') {
                  field.isEdit = false;
                }
              }}
            />
          {:else}
            <h4
              class="font-semibold text-xs text-gray-900 dark:text-white ellipsis"
              style="white-space: nowrap; overflow: hidden"
              on:mousedown={() => {
                if (!isEditMode || isResult) {
                  return;
                }
                currentFields.set(
                  data.map((field, i) => {
                    if (i === index) {
                      field.isEdit = !field.isEdit;
                    }
                    return field;
                  })
                );
              }}
            >
              {field.label}
            </h4>
          {/if}
          {#if isEditMode || isResult}
            <svg
              fill="none"
              stroke="currentColor"
              stroke-width="1.5"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
              width="15px"
              class="close"
              on:click={() => handleClickClose(field.x, field.y)}
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          {/if}
        </div>
        <div class="flex px-3 py-2">
          <Rating disabled={isEditMode} bind:value={field.rate} />
          {#if isResult}
            <span style="margin-left: 5px;">{field.rate}</span>
          {/if}
        </div>
      </div>
    {/if}
  </div>
{/each}

<style>
  .field {
    position: absolute;
    display: flex;
    justify-content: center;
  }
  .field-title {
    height: 43px;
  }
  .field-button {
    width: 15px;
    height: 15px;
  }
  .close {
    position: absolute;
    right: 10px;
    top: 12px;
    cursor: pointer;
  }
</style>
