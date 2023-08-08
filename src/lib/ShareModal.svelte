<script lang="ts">
  import { shareId } from '../store/store';
  import Modal from './Modal.svelte';

  let isOpen: boolean = false;
  let reviewUrl: string = '';
  let resultUrl: string = '';

  shareId.subscribe((value) => {
    if (!value) {
      return;
    }
    isOpen = !!value;
    reviewUrl = `${import.meta.env.VITE_BASE_URL}/#/review/${value}`;
    resultUrl = `${import.meta.env.VITE_BASE_URL}/#/result/${value}`;
  });
</script>

<Modal {isOpen}>
  <div>
    <p>평가받고 싶은 평가자에게 아래 링크를 공유해주세요!</p>
    <p>*주의: 새로고침 시 모두 삭제됩니다.</p>
    <div class="bg-gray-200 rounded p-2">
      {#if reviewUrl}
        <a class="pink" href={reviewUrl} target="_blank" rel="noreferrer"
          >{reviewUrl}</a
        >
      {/if}
    </div>
  </div>
  <div>
    <p>아래 링크는 평가 결과 페이지입니다.</p>
    <div class="bg-gray-200 rounded p-2">
      {#if resultUrl}
        <a class="pink" href={resultUrl} target="_blank" rel="noreferrer"
          >{resultUrl}</a
        >
      {/if}
    </div>
  </div>
</Modal>
