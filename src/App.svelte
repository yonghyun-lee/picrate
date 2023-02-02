<script>
	import { Alert } from 'flowbite-svelte';
  import Router from 'svelte-spa-router'
  import TouchContainer from './lib/TouchContainer.svelte';
</script>

<Router routes={{
}} />

<div class="image-container">
  <TouchContainer />
</div>

<style>
  .image-container {
    background-color: beige;
    display: flex;
    flex: 1;
  }
</style>
