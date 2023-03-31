<script lang="ts">
  import { params } from 'svelte-spa-router';
  import { api } from '../api';
  import Fields from '../lib/Fields.svelte';
  import Spinner from '../lib/Spinner.svelte';
  import { currentFields, currentId } from '../store/store';
  import type { CardResponse, RatingResponse } from '../types';

  let imageUrl: null | string = null;
  let fields;

  params.subscribe(async (value) => {
    if (!value) {
      return;
    }
    const { id } = value;
    const cardResponse = await api.get<CardResponse>(
      `${import.meta.env.VITE_API_URL}/card/${id}`
    );
    const response = await api.get<RatingResponse>(
      `${import.meta.env.VITE_API_URL}/ratings/card/${id}`
    );
    currentId.set(id);
    currentFields.set(
      response.data.data.map((item) => {
        const card = cardResponse.data.data.ratings.find(
          (rating) => rating.id === item.rating_id
        );
        return {
          id: item.rating_id,
          isOpen: true,
          isEdit: false,
          label: item.label,
          rate: item.rating_average,
          x: card.x,
          y: card.y,
        };
      })
    );
    imageUrl = `${import.meta.env.VITE_API_URL}/image/${
      cardResponse.data.data.image.id
    }`;
    console.log(response);
  });

  currentFields.subscribe((value) => {
    fields = value;
  });
</script>

<div class="init-page">
  {#if !imageUrl}
    <Spinner />
  {:else}
    <div class="image-container border border-gray-400 rounded">
      <!-- svelte-ignore a11y-img-redundant-alt -->
      <img src={imageUrl} alt="rate picture" />
      <Fields isEditMode={false} isResult />
    </div>
  {/if}
</div>

<style>
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
</style>
