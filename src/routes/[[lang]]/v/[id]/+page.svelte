<script>
    import Youtube from "$lib/components/Youtube.svelte";
    import PeopleBar from "$lib/components/PeopleBar.svelte";
    import EventLink from "$lib/components/EventLink.svelte";
    import { config, people } from "$lib/data.js";
    import { shortText } from "$lib/utils.js";

    const { data } = $props();
    let item = $derived(data.item);
    let youtubeId = $derived(item.url.match(/\?v=([^&]+)/)[1]);
    let peopleArr = $derived(
        item.people
            ?.map((pid) => people.find((p) => p.id === pid))
            .filter((p) => p),
    );
    let archiveTitle = $derived(
        `${item.name} ${peopleArr && peopleArr.length > 0 ? " - " + peopleArr.map((p) => p.name).join(", ") : ""}`,
    );
    let description = $derived(shortText(item.desc.split("\n")[0]));
</script>

<svelte:head>
    <title>{archiveTitle} | {config.title}</title>
    <meta name="title" content={archiveTitle} />
    <meta name="description" content={description} />

    <meta property="og:title" content={archiveTitle} />
    <meta property="og:description" content={description} />

    <meta property="og:type" content="website" />
    <meta property="og:url" content="https://{config.host}/v/{item.id}" />
    <meta
        property="og:image"
        content="https://{config.host}/archive/{item.img}"
    />
</svelte:head>

<div class="w-full">
    <Youtube id={youtubeId} autoplay="true" />
</div>

<h1 class="mt-4 grow text-3xl font-semibold">{item.name}</h1>

<div class="mt-2 flex flex-wrap gap-2 items-center">
    {#if item.people}
        <PeopleBar people={item.people} />
    {/if}
    <EventLink event={item.event} />
    {#if item.duration}<div class="opacity-50 text-sm">
            {Math.round(item.duration / 60)}m
        </div>{/if}
</div>

<div class="mt-4 whitespace-pre-wrap">{item.desc}</div>
