<script>
	import { Alert } from 'flowbite-svelte';
  import Router from 'svelte-spa-router'
  import TouchContainer from './lib/TouchContainer.svelte';
    import UploadImage from './lib/UploadImage.svelte';
    import Writer from './routes/Writer.svelte';
</script>

<Router routes={{
  '/': Writer
}} />

<style>
  .image-container {
    background-color: white;
    display: flex;
    flex: 1;
    margin: 10px;
  }
</style>
