<script>
    import { events } from "$lib/data.js";
    const { event: eid } = $props();

    const e = events.find((e) => e.id === eid);
</script>

{#if e}
    <div class="inline-block ml-4">
        <span class="mr-1">@</span><a href="/p/{e.project}#{e.id}">{e.name}</a>
    </div>
{/if}
