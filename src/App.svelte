<script>
  import Router from 'svelte-spa-router';
  import NameModal from './lib/NameModal.svelte';
  import ShareModal from './lib/ShareModal.svelte';
  import Complete from './routes/Complete.svelte';
  import NotFound from './routes/NotFound.svelte';
  import Result from './routes/Result.svelte';
  import Reviewer from './routes/Reviewer.svelte';
  import Writer from './routes/Writer.svelte';
</script>

<Router
  routes={{
    '/result/:id': Result,
    '/review/:id': Reviewer,
    '/home': Writer,
    '/complete': Complete,
    '*': NotFound,
  }}
/>

<ShareModal />
<NameModal />
