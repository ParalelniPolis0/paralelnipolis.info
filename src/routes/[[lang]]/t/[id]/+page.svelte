<script>
    import { parse } from "marked";

    const { data } = $props();
    const i = $derived(data.item);
</script>

<div class="mt-4 mb-8">
    <div class="breadcrumb">
        <a href="/glossary">Glossary</a>
    </div>
    <h1 class="text-4xl font-semibold">
        {i.name}
    </h1>

    {#if i.description}
        <div class="mt-8 markdown">
            {@html parse(i.description)}
        </div>
    {/if}

    <div class="mt-8">
        <a href="/glossary">See all terms in Glossary →</a>
    </div>
</div>
