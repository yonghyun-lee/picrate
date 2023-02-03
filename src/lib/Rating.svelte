<script lang="ts">
  import Star from './Star.svelte';

  export let disabled = false;
</script>

<div class="rating-container">
  <Star {disabled} />
  <Star {disabled} />
  <Star {disabled} />
  <Star {disabled} />
  <Star {disabled} />
</div>

<style>
  .rating-container {
    display: flex;
    width: 100px;
  }
</style>
