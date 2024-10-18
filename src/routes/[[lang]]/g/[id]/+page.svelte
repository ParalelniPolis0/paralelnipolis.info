<script>
    import { parse } from "marked";
    import { instances, config } from "$lib/data.js";
    import RefsBar from "$lib/components/RefsBar.svelte";

    const { data } = $props();
    const g = $derived(data.item);
    const instance = $derived(instances.find((i) => i.id === g.instance));
</script>

<svelte:head>
    <title>{g.name} | {config.title}</title>
</svelte:head>

<div class="mb-2 mt-4 flex gap-4 items-center">
    <div class="text-4xl uppercase font-mono opacity-50">
        <a href="/i/{instance.id}">{instance.code}</a>-{String(g.seq).padStart(
            2,
            "0",
        )}
    </div>
    <h1 class="text-4xl font-semibold">{g.name}</h1>
    <div>{g.focus}</div>
</div>

{#if g.refs}
    <RefsBar refs={g.refs} />
{/if}

{#if g.description}
    <div class="mt-8 mb-8">
        {@html parse(g.description)}
    </div>
{/if}
