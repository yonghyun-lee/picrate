<script lang="ts">
  import Star from './Star.svelte';

  export let disabled = false;

  const STAR_COUNT = 5;
  let activeValue = -1;

  function handleClick(index: number) {
    activeValue = index;
  }
</script>

<div class="rating-container">
  {#each Array(STAR_COUNT) as _, index (`${index}-${index <= activeValue}`)}
    <Star
      value={index <= activeValue}
      {disabled}
      on:click={() => handleClick(index)}
    />
  {/each}
</div>

<style>
  .rating-container {
    display: flex;
    width: 100px;
  }
</style>
