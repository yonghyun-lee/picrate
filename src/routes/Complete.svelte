<script lang="ts">
  import { params } from 'svelte-spa-router';

  let reviewUrl: string = '';
  let resultUrl: string = '';

  params.subscribe((value) => {
    if (!value) {
      return;
    }
    const { id } = value;
    reviewUrl = `${import.meta.env.VITE_BASE_URL}/#/review/${id}`;
    resultUrl = `${import.meta.env.VITE_BASE_URL}/#/result/${id}`;
  });
</script>

<div
  style="width: 100%; height: 100%"
  class="flex flex-col justify-center items-center"
>
  <span class="text-lg">평가 완료.</span>
  <p>
    평가 결과 페이지: <a
      class="pink"
      href={resultUrl}
      target="_blank"
      rel="noreferrer">{resultUrl}</a
    >
  </p>
</div>
