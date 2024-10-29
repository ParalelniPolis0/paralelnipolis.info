<script>
    import { people, archive, config, projects } from "$lib/data.js";
    import { imgHashUrl } from "$lib/utils.js";
    import { getContext } from "svelte";
    import { marked } from "marked";
    import PeopleBar from "$lib/components/PeopleBar.svelte";
    import RefsBar from "$lib/components/RefsBar.svelte";
    const lang = getContext("lang");

    const { data } = $props();
    const p = $derived(data.item);
</script>

<svelte:head>
    <title>{p.name} | {config.title}</title>
</svelte:head>

<div class="sm:flex gap-6 mt-6">
    <div class="shrink-0 mb-3 sm:mb-0">
        <img
            src={imgHashUrl("books", p.imgHash, "m")}
            class="h-[60vw] sm:h-[40vw] bg-gray-200 dark:bg-gray-800"
        />
    </div>
    <div>
        <PeopleBar people={p.authors} className="mb-2" />
        <h1 class="text-4xl font-semibold">{p.name.split(":").at(0)}</h1>
        <div class="text-2xl opacity-50 mt-2">{p.name.split(":").at(1)}</div>
        <RefsBar refs={p.refs} />
        <div class="mt-4 markdown">{@html marked(p.description)}</div>
    </div>
</div>
