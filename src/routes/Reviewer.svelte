<script lang="ts">
  import { params } from 'svelte-spa-router';
  import { api } from '../api';
  import Fields from '../lib/Fields.svelte';
  import Spinner from '../lib/Spinner.svelte';
  import {
    currentFields,
    currentReviewId,
    isOpenNameModal,
  } from '../store/store';
  import type { CardData } from '../types';

  let imageUrl: null | string = null;
  let fields;

  params.subscribe(async (value) => {
    if (!value) {
      return;
    }
    const { id } = value;
    const response = await api.get<CardData>(
      `${import.meta.env.VITE_API_URL}/card/${id}`
    );
    currentReviewId.set(id);
    currentFields.set(
      response.data.data.ratings.map((item) => {
        return {
          id: item.id,
          isOpen: false,
          isEdit: false,
          label: item.label,
          rate: item.rate,
          x: item.x,
          y: item.y,
        };
      })
    );
    imageUrl = `${import.meta.env.VITE_API_URL}/image/${
      response.data.data.image.id
    }`;
  });

  currentFields.subscribe((value) => {
    fields = value;
  });

  async function handleSubmit() {
    if (fields.some((field) => field.rate === undefined)) {
      alert('모든 필드를 평가해주세요.');
      return;
    }
    isOpenNameModal.set(true);
  }
</script>

<div class="init-page">
  {#if !imageUrl}
    <Spinner />
  {:else}
    <div class="image-container border border-gray-400 rounded">
      <!-- svelte-ignore a11y-img-redundant-alt -->
      <img src={imageUrl} alt="rate picture" />
      <Fields isEditMode={false} />
    </div>
    <button
      type="button"
      class="pink margin-auto text-white focus:ring-4 focus:ring-pink-300 font-medium rounded-lg text-xs px-5 py-2.5 mr-2 mb-2 focus:outline-none"
      on:click={handleSubmit}>제출하기</button
    >
  {/if}
</div>

<style>
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
</style>
