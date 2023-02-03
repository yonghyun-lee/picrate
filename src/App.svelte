<script>
  import Router from 'svelte-spa-router';
  import Writer from './routes/Writer.svelte';
</script>

<Router
  routes={{
    '/': Writer,
  }}
/>
