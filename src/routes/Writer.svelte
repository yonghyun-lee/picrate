<script lang="ts">
    import { Button } from "flowbite-svelte";
    import { onDestroy } from "svelte";
    import UploadImage from "../lib/UploadImage.svelte";
    import { uploadedImage } from "../store/store";
    
    let imageUrl: null | string = null;
    
    onDestroy(uploadedImage.subscribe((value) => {
      if (!value) {
        return;
      }
      const reader = new FileReader();
      reader.onload = (event) => {
        imageUrl = event.target.result as string;
      }
      reader.readAsDataURL(value);
    }));
</script>

<div class="init-page">
  { #if !imageUrl }
    <h1 class="guide">평가받고 싶은 사진을<br/> 올려주세요</h1>
    <UploadImage />
    {:else}
    <!-- svelte-ignore a11y-img-redundant-alt -->
    <img src={imageUrl} alt="rate picture" />
    <button type="button" class="text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-xs px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">저장하기</button>
  { /if }
</div>

<style>
  .init-page {
    display: flex;
    flex-direction: column;
    width: 100%;
    align-items: center;
  }

  .guide {
    font-size: 20px;
    margin-bottom: 30px;
  }

  img {
    margin: 10px;
    max-width: 90%;
    max-height: 80%;
  }
</style>