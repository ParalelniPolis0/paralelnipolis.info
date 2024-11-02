<script>
    import { imgHashUrl, archiveStorageUrl } from "$lib/utils.js";
    import Youtube from "$lib/components/Youtube.svelte";

    const { item } = $props();
    let storage = $derived(item.storage);
    let youtubeId = $derived(item.url.match(/\?v=([^&]+)/)[1]);
</script>

{#if storage}
    <video
        width="100%"
        height="100%"
        class="aspect-video"
        controls
        poster={imgHashUrl("archive", item.imgHash, "l")}
    >
        <source src={archiveStorageUrl(storage.source.path)} type="video/mp4" />
        Your browser does not support the video tag.
    </video>
{:else}
    <Youtube id={youtubeId} autoplay="true" />
{/if}
