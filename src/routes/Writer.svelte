<script lang="ts">
  import { onDestroy } from 'svelte';
  import type { Unsubscriber } from 'svelte/store';
  import { api } from '../api';
  import Fields from '../lib/Fields.svelte';
  import UploadImage from '../lib/UploadImage.svelte';
  import { uploadedImage, currentFields, shareId } from '../store/store';
  import type { Field } from '../types';

  let imageFile: null | File = null;
  let imageUrl: null | string = null;
  let fields: Field[] = [];

  const subscribes: Unsubscriber[] = [
    uploadedImage.subscribe((value) => {
      if (!value) {
        return;
      }
      imageFile = value;
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
    currentFields.set([
      ...fields,
      {
        label: '클릭 수정',
        x: event.offsetX - 8,
        y: event.offsetY - 8,
        isOpen: false,
        isEdit: false,
        rate: null,
      },
    ]);
  }

  async function handleSubmit() {
    if (!imageUrl) {
      alert('사진이 없습니다.');
      return;
    }

    const formData = new FormData();
    formData.set('image', imageFile);
    formData.set(
      'fields',
      JSON.stringify(
        fields.map((field) => ({
          label: field.label,
          x: field.x,
          y: field.y,
        }))
      )
    );

    const response = await api.post(
      `${import.meta.env.VITE_API_URL}/card`,
      formData,
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
    <img class="background" src="../public/background.jpg" alt="background" />
    <h1 class="guide">평가받고 싶은 사진을<br /> 올려주세요!</h1>
    <UploadImage />
  {:else}
    <p class="m-3">1. 평가 받을 부분을 찍어 필드를 생성하세요.</p>
    <p class="m-3">
      2. 생성된 점을 클릭한 후 필드 라벨을 클릭해 라벨명을 변경하세요.
    </p>
    <p class="m-3">3. 저장하기 후 링크 공유하면 완료.</p>
    <div
      class="image-container border border-gray-400 rounded"
      on:mousedown={handleClick}
    >
      <!-- svelte-ignore a11y-img-redundant-alt -->
      <img class="upload-image" src={imageUrl} alt="rate picture" />
      <Fields isEditMode={true} />
    </div>
    <button
      type="button"
      class="pink margin-auto text-white focus:ring-4 focus:ring-pink-300 font-medium rounded-lg text-xs px-5 py-2.5 mr-2 mb-2 focus:outline-none"
      on:click={handleSubmit}>저장하기</button
    >
  {/if}
</div>

<style>
  .background {
    position: absolute;
    width: 100%;
    height: 100%;
    object-fit: cover;
    z-index: 0;
    opacity: 0.8;
  }

  .guide {
    font-size: 30px;
    margin-bottom: 30px;
    z-index: 1;
  }
</style>
