<script lang="ts">
  import { onDestroy } from 'svelte';
  import Rating from '../lib/Rating.svelte';
  import UploadImage from '../lib/UploadImage.svelte';
  import { uploadedImage } from '../store/store';

  let imageUrl: null | string = null;

  onDestroy(
    uploadedImage.subscribe((value) => {
      if (!value) {
        return;
      }
      const reader = new FileReader();
      reader.onload = (event) => {
        imageUrl = event.target.result as string;
      };
      reader.readAsDataURL(value);
    })
  );

  $: fields = [];
  function handleClickLabel(event: MouseEvent) {
    if (fields.length > 10) {
      return;
    }
    fields = fields.concat({
      label: '클릭 수정',
      x: event.offsetX - 8,
      y: event.offsetY - 8,
      isOpen: false,
    });
  }
  function handleClickClose(x: number, y: number) {
    fields = fields.filter((field) => {
      return !(field.x === x && field.y === y);
    });
  }
</script>

<div class="init-page">
  {#if !imageUrl}
    <h1 class="guide">평가받고 싶은 사진을<br /> 올려주세요</h1>
    <UploadImage />
  {:else}
    <div class="image-container">
      <!-- svelte-ignore a11y-img-redundant-alt -->
      <img src={imageUrl} alt="rate picture" on:mousedown={handleClickLabel} />
      {#each fields as field, index (index)}
        <div
          class="field"
          style={`position: absolute; left: ${field.x}px; top: ${field.y}px;`}
        >
          <button
            class="field-button w-3.5 h-3.5 bg-blue-400 border-2 border-white dark:border-gray-800 rounded-full"
          />
          <div
            data-popover
            id="popover-default"
            role="tooltip"
            style="top: -85px"
            class="absolute z-10 inline-block w-32 text-sm font-light text-gray-500 transition-opacity duration-300 bg-white border border-gray-200 rounded-lg shadow-sm dark:text-gray-400 dark:border-gray-600 dark:bg-gray-800"
          >
            <div
              class="relative flex items-center justify-center field-title px-2 py-1 bg-gray-100 border-b border-gray-200 rounded-t-lg dark:border-gray-600 dark:bg-gray-700"
            >
              {#if field.isOpen}
                <input
                  type="text"
                  id="small-input"
                  class="font-semibold text-xs block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 xs:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  bind:value={field.label}
                  on:keydown={(e) => {
                    if (e.code === 'Enter') {
                      field.isOpen = false;
                    }
                  }}
                />
              {:else}
                <h4
                  class="font-semibold text-xs text-gray-900 dark:text-white ellipsis"
                  style="white-space: nowrap; overflow: hidden"
                  on:mousedown={() => (field.isOpen = true)}
                >
                  {field.label}
                </h4>
              {/if}
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
            </div>
            <div class="px-3 py-2">
              <Rating disabled />
            </div>
          </div>
        </div>
      {/each}
    </div>
    <button
      type="button"
      class="margin-auto text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-xs px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
      >저장하기</button
    >
  {/if}
</div>

<style>
  .init-page {
    width: 100%;
    display: block;
  }

  .guide {
    font-size: 20px;
    margin: 150px 0 30px 0;
  }

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
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
  .image-container {
    position: relative;
    display: inline-block;
    margin-top: 50px;
    border: 1px solid black;
    width: 400px;
    height: 400px;
  }
</style>
