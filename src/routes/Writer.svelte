<script lang="ts">
  import { onDestroy } from 'svelte';
  import type { Unsubscriber } from 'svelte/store';
  import { api } from '../api';
  import Fields from '../lib/Fields.svelte';
  import UploadImage from '../lib/UploadImage.svelte';
  import { uploadedImage, currentFields, shareId } from '../store/store';

  let imageUrl: null | string = null;
  let fields = [];

  const subscribes: Unsubscriber[] = [
    uploadedImage.subscribe((value) => {
      if (!value) {
        return;
      }
      const reader = new FileReader();
      reader.onload = (event) => {
        imageUrl = event.target.result as string;
      };
      reader.readAsDataURL(value);
    }),
    currentFields.subscribe((value) => {
      fields = value;
    }),
  ];

  onDestroy(() => {
    subscribes.forEach((sub) => sub());
  });

  function handleClick(event: MouseEvent) {
    if (fields.length > 10) {
      return;
    }
    currentFields.set(
      fields.concat({
        label: '클릭 수정',
        x: event.offsetX - 8,
        y: event.offsetY - 8,
        isOpen: false,
      })
    );
  }

  async function handleSubmit() {
    if (!imageUrl) {
      alert('사진이 없습니다.');
      return;
    }

    console.log(`${import.meta.env.VITE_API_URL}/card`);
    const response = await api.post(
      `${import.meta.env.VITE_API_URL}/card`,
      {},
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    );
    shareId.set(response.data.data.id);
  }
</script>

<div class="init-page">
  {#if !imageUrl}
    <h1 class="guide">평가받고 싶은 사진을<br /> 올려주세요</h1>
    <UploadImage />
  {:else}
    <div
      class="image-container border border-gray-400 rounded"
      on:mousedown={handleClick}
    >
      <!-- svelte-ignore a11y-img-redundant-alt -->
      <img src={imageUrl} alt="rate picture" />
      <Fields />
    </div>
    <button
      type="button"
      class="margin-auto text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-xs px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
      on:click={handleSubmit}>저장하기</button
    >
  {/if}
</div>

<style>
  .init-page {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .guide {
    font-size: 20px;
    margin-bottom: 30px;
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
  .image-container {
    position: relative;
    display: inline-block;
    width: 400px;
    height: 400px;
    margin-bottom: 10px;
  }
</style>
