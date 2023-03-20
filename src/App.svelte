<script>
  import Router from 'svelte-spa-router';
  import NameModal from './lib/NameModal.svelte';
  import ShareModal from './lib/ShareModal.svelte';
  import NotFound from './routes/NotFound.svelte';
  import Reviewer from './routes/Reviewer.svelte';
  import Writer from './routes/Writer.svelte';
</script>

<Router
  routes={{
    '/review/:id': Reviewer,
    '/home': Writer,
    '*': NotFound,
  }}
/>

<ShareModal />
<NameModal />
