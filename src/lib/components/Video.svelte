<script>
    import { imgHashUrl, archiveStorageUrl } from "$lib/utils.js";
    import Youtube from "$lib/components/Youtube.svelte";
    import "media-chrome";

    const { item } = $props();
    let storage = $derived(item.storage);
    let youtubeId = $derived(item.url.match(/\?v=([^&]+)/)[1]);
</script>

{#if storage}
    <!--video
            width="100%"
            height="100%"
            class="aspect-video"
            controls
            poster={}
        >
            <source
                src={archiveStorageUrl(storage.source.path)}
                type="video/mp4"
            />
            Your browser does not support the video tag.
        </video-->
    <media-controller
        role="region"
        aria-label="video player"
        defaultduration={item.duration}
        width="100%"
        height="100%"
        class="aspect-video w-full h-full"
        defaultsubtitles
    >
        <video
            slot="media"
            src={archiveStorageUrl(storage.source.path)}
            poster={imgHashUrl("archive", item.imgHash, "l")}
            preload="none"
            playsinline
            width="100%"
            height="100%"
            class="aspect-video w-full h-full"
        >
        </video>
        <media-loading-indicator slot="centered-chrome"
        ></media-loading-indicator>
        <media-control-bar>
            <media-play-button></media-play-button>
            <media-time-range></media-time-range>
            <media-time-display showduration></media-time-display>
            <media-mute-button></media-mute-button>
            <media-volume-range></media-volume-range>
            <media-captions-menu hidden anchor="auto"></media-captions-menu>
            <media-captions-menu-button></media-captions-menu-button>
            <media-fullscreen-button></media-fullscreen-button>
            <media-playback-rate-button></media-playback-rate-button>
            <media-pip-button></media-pip-button>
            <!--media-cast-button></media-cast-button-->
        </media-control-bar>
    </media-controller>
{:else}
    <Youtube id={youtubeId} autoplay="true" />
{/if}
