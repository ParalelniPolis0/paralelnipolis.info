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
        width="100%"
        height="100%"
        class="aspect-video"
        role="region"
        aria-label="video player"
    >
        <video
            slot="media"
            src={archiveStorageUrl(storage.source.path)}
            poster={imgHashUrl("archive", item.imgHash, "l")}
        >
        </video>
        <media-control-bar>
            <media-play-button></media-play-button>
            <media-seek-forward-button></media-seek-forward-button>
            <media-seek-backward-button></media-seek-backward-button>
            <media-mute-button></media-mute-button>
            <media-time-range></media-time-range>
            <media-time-display></media-time-display>
            <!--media-captions-button></media-captions-button-->
            <media-fullscreen-button></media-fullscreen-button>
            <media-playback-rate-button></media-playback-rate-button>
            <media-pip-button></media-pip-button>
            <media-fullscreen-button></media-fullscreen-button>
        </media-control-bar>
    </media-controller>
{:else}
    <Youtube id={youtubeId} autoplay="true" />
{/if}
