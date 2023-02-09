<script>
  import Router from 'svelte-spa-router';
  import Reviewer from './routes/Reviewer.svelte';
  import Writer from './routes/Writer.svelte';
</script>

<Router
  routes={{
    '/review': Reviewer,
    '/': Writer,
  }}
/>
