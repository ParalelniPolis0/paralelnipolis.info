<script>
    import { imgHashUrl, archiveStorageUrl } from "$lib/utils.js";

    const { item } = $props();
    const storage = $derived(item.storage);
</script>

<video
    width="100%"
    height="100%"
    controls
    poster={imgHashUrl("archive", item.imgHash, "l")}
>
    <source src={archiveStorageUrl(storage.source.path)} type="video/mp4" />
    Your browser does not support the video tag.
</video>
