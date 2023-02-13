<script>
  import Router from 'svelte-spa-router';
  import ShareModal from './lib/ShareModal.svelte';
  import NotFound from './routes/NotFound.svelte';
  import Reviewer from './routes/Reviewer.svelte';
  import Writer from './routes/Writer.svelte';
</script>

<Router
  routes={{
    '/review': Reviewer,
    '/home': Writer,
    '*': NotFound,
  }}
/>

<ShareModal />
