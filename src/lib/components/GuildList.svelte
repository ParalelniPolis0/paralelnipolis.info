<script>
    import PersonBox from "$lib/components/PersonBox.svelte";
    import { instances, people } from "$lib/data.js";

    const { guilds } = $props();

    const flags = {
        anon: {
            color: "bg-red-200 dark:bg-red-800",
        },
        transparent: {
            color: "bg-green-200 dark:bg-green-800",
        },
        public: {
            color: "bg-blue-200 dark:bg-blue-800",
        },
    };
</script>

<div class="grid grid-cols-1 gap-2 mt-6">
    {#each guilds.map((g) => {
        g.instanceObj = instances.find((i) => i.id === g.instance);
        return g;
    }) as g}
        <div
            class="flex gap-4 items-center hover:bg-gray-100 p-2 dark:hover:bg-gray-900"
        >
            <div class="text-3xl font-mono opacity-50 uppercase">
                <a href="/i/{g.instance}">{g.instanceObj.code}</a>-{String(
                    g.seq,
                ).padStart(2, "0")}
            </div>
            <div class="flex gap-4 grow items-center relative">
                <div class="text-3xl font-semibold z-10">
                    <a href="/g/{g.id}">{g.name}</a>
                </div>
                {#if g.flags}
                    {#each g.flags.map((f) => [f, flags[f]]) as [fid, f]}
                        <div
                            class="py-0.5 px-1 font-mono text-xs {(f &&
                                f.color) ||
                                'bg-gray-200 dark:bg-gray-800'} rounded"
                        >
                            {fid}
                        </div>
                    {/each}
                {/if}
                <div class="grow z-10">{g.focus}</div>
                {#if g.members}
                    <div class="flex gap-2 items-center z-10">
                        <div class="text-xl mr-4 font-semibold opacity-50">
                            {g.members.length}
                        </div>
                        <div class="flex items-center">
                            {#each g.members.map( (m) => people.find((p) => p.id === m.person), ) as p, i}
                                <div class="-ml-2">
                                    <PersonBox person={p} size="w-8" />
                                </div>
                            {/each}
                        </div>
                    </div>
                {/if}
            </div>
        </div>
    {/each}
</div>
