<script lang="ts">
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
  { /if }
</div>

<style>
  .init-page {
    display: flex;
    flex-direction: column;
    width: 100%;
  }

  .guide {
    font-size: 20px;
    margin-bottom: 30px;
  }
</style>