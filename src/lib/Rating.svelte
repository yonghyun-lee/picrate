<script lang="ts">
  import Star from './Star.svelte';

  export let disabled = false;
  export let value: number | null = null;

  const STAR_COUNT = 5;

  function handleClick(index: number) {
    value = index + 1;
  }
</script>

<div class="rating-container">
  {#each Array(STAR_COUNT) as _, index (`${index}-${value !== null ? index < value : false}`)}
    <Star
      value={value !== null ? index < Math.round(value) : false}
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
