<script>
    import Youtube from "$lib/components/Youtube.svelte";
    import PeopleBar from "$lib/components/PeopleBar.svelte";
    import EventLink from "$lib/components/EventLink.svelte";
    import { config } from "$lib/data.js";

    const { data } = $props();
    let item = $derived(data.item);
    let youtubeId = $derived(item.url.match(/\?v=([^&]+)/)[1]);
</script>

<svelte:head>
    <title>{item.name} | {config.title}</title>
</svelte:head>

<div class="w-full">
    <Youtube id={youtubeId} autoplay="true" />
</div>

<h1 class="mt-4 grow text-3xl font-semibold">{item.name}</h1>

<div class="mt-2 flex flex-wrap gap-2 items-center">
    <PeopleBar people={item.people} />
    <EventLink event={item.event} />
    {#if item.duration}<div class="opacity-50 text-sm">
            {Math.round(item.duration / 60)}m
        </div>{/if}
</div>

<div class="mt-4 whitespace-pre-wrap">{item.desc}</div>
