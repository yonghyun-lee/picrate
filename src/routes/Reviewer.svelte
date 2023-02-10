<script lang="ts">
  import Fields from '../lib/Fields.svelte';
  import Spinner from '../lib/Spinner.svelte';

  let imageUrl: null | string = null;
</script>

<div class="init-page">
  {#if !imageUrl}
    <Spinner />
  {:else}
    <div class="image-container border border-gray-400 rounded">
      <!-- svelte-ignore a11y-img-redundant-alt -->
      <img src={imageUrl} alt="rate picture" />
      <Fields />
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
    display: flex;
    justify-content: center;
    align-items: center;
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
    width: 400px;
    height: 400px;
  }
</style>
