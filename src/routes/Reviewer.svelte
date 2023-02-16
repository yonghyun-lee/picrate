<script lang="ts">
  import { params } from 'svelte-spa-router';
  import { api } from '../api';
  import Fields from '../lib/Fields.svelte';
  import Spinner from '../lib/Spinner.svelte';
  import { currentFields } from '../store/store';
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
    currentFields.set(
      response.data.data.ratings.map((item) => {
        return {
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
      response.data.data.image.hash_name
    }`;
  });

  currentFields.subscribe((value) => {
    fields = value;
  });

  function handleSubmit() {
    console.log('제출하기', fields);
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
