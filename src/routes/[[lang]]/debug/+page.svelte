<script>
    import TorrentPlayer from "$lib/components/TorrentPlayer.svelte";
    import { archive } from "$lib/data.js";
    import { filesize } from "$lib/utils.js";

    const missingVideos = $derived(archive.filter((i) => !i.storage));
    const videosBySize = $derived(
        archive
            .filter((i) => i.storage)
            .map((i) => {
                i.ratio = Math.round(
                    i.storage.source.size / i.storage.duration / 10000,
                );
                return i;
            })
            .sort(
                (
                    x,
                    y, //(x.ratio > y.ratio ? -1 : 1),
                ) => (x.storage.source?.size > y.storage.source?.size ? -1 : 1),
            ),
    );
</script>

<h1 class="main text-2xl mb-4 mt-4">Debug</h1>

<h2 class="main text-xl mb-4 mt-4">
    Missing archive videos ({missingVideos.length})
</h2>

<table cellspacing="10">
    <tbody>
        {#each missingVideos as v}
            <tr>
                <td>{v.target}</td>
                <td>{v.project}</td>
                <td>{v.event}</td>
                <td><a href="/v/{v.id}">{v.name}</a></td>
                <td>{v.videoId}</td>
            </tr>
        {/each}
    </tbody>
</table>
<!--
<h2 class="main text-xl mb-4 mt-4">WebTorrent Player</h2>
<TorrentPlayer />
-->

<h2 class="main text-xl mb-4 mt-4">Videos by size</h2>
<table>
    <tbody>
        {#each videosBySize as v}
            <tr>
                <td>{v.event}</td>
                <td><a href="/v/{v.id}">{v.name}</a></td>
                <td>{filesize(v.storage.source.size)}</td>
                <td>{v.storage.duration}</td>
                <td>{v.ratio}</td>
            </tr>
        {/each}
    </tbody>
</table>
