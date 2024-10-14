<script>
    import { instances } from "$lib/data.js";

    const { guilds } = $props();
</script>

<div class="grid grid-cols-1 gap-4 mt-6">
    {#each guilds.map((g) => {
        g.instanceObj = instances.find((i) => i.id === g.instance);
        return g;
    }) as g}
        <div class="flex gap-4 items-center">
            <div class="text-3xl font-mono opacity-50 uppercase">
                <a href="/i/{g.instance}">{g.instanceObj.code}</a>-{String(
                    g.seq,
                ).padStart(2, "0")}
            </div>
            <div class="text-3xl font-semibold">
                <a href="/g/{g.id}">{g.name}</a>
            </div>
            <div>{g.focus}</div>
        </div>
    {/each}
</div>
