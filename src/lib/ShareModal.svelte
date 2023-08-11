<script lang="ts">
  import { shareId } from '../store/store';
  import Modal from './Modal.svelte';
  import copy from 'copy-to-clipboard';

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
    <div class="bg-gray-200 rounded p-2 pt-3 relative">
      {#if reviewUrl}
        <a class="pink" href={reviewUrl} target="_blank" rel="noreferrer"
          >{reviewUrl}</a
        >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-5 h-5 absolute right-2 top-3 cursor-pointer"
          aria-hidden
          on:click={() =>
            copy(reviewUrl, {
              message:
                '평가 페이지가 복사되었습니다. 평가받고 싶은 분들에게 공유해주세요.',
            })}
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M15.666 3.888A2.25 2.25 0 0013.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 01-.75.75H9a.75.75 0 01-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 011.927-.184"
          />
        </svg>
      {/if}
    </div>
  </div>
  <div>
    <p>아래 링크는 평가 결과 페이지입니다.</p>
    <div class="bg-gray-200 rounded p-2 pt-3 relative">
      {#if resultUrl}
        <a class="pink" href={resultUrl} target="_blank" rel="noreferrer"
          >{resultUrl}</a
        >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-5 h-5 absolute right-2 top-3 cursor-pointer"
          aria-hidden
          on:click={() =>
            copy(reviewUrl, {
              message: '평가 결과 페이지가 복사되었습니다.',
            })}
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M15.666 3.888A2.25 2.25 0 0013.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 01-.75.75H9a.75.75 0 01-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 011.927-.184"
          />
        </svg>
      {/if}
    </div>
  </div>
</Modal>
