<script lang="ts">
  import { Button } from 'flowbite-svelte';

  const MAX_COUNT = 10;
  let id = 1;
  $: fields = [];
  function handleClick(event: MouseEvent) {
    if (id > MAX_COUNT) {
      alert('max');
      return;
    }
    fields = fields.concat({ id: ++id, x: event.clientX, y: event.clientY });
  }
</script>

<div class="touchable-field" on:mousedown={handleClick} />
{#each fields as field (field.id)}
  <Button style={`position: absolute; left: ${field.x}px; top: ${field.y}px;`}
    >{field.x}</Button
  >
{/each}

<style>
  .touchable-field {
    flex: 1;
    position: relative;
  }
</style>
