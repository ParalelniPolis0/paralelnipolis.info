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

<h1 class="text-3xl font-semibold mt-4 mb-2">{item.name}</h1>

<div class="flex flex-wrap">
    <PeopleBar people={item.people} />
    <EventLink event={item.event} />
</div>

<div class="mt-4">{item.desc}</div>
