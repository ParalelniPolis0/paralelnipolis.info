<script>
    import { events } from "$lib/data.js";
    const { event: eid } = $props();

    const e = $derived(events.find((e) => e.id === eid));
</script>

{#if e}
    <div class="inline-block">
        <span class="mr-1">@</span><a href="/e/{e.id}">{e.name}</a>
    </div>
{/if}
