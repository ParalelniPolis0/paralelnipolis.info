<script>
    import { people as allPeople } from "$lib/data.js";
    let { people, size = "text-lg" } = $props();

    let fullPeople = $derived(
        typeof people[0] === "string"
            ? people.map((x) => allPeople.find((p) => p.id === x))
            : people,
    );
</script>

<div class="flex flex-wrap gap-4">
    {#each fullPeople as p}
        <div class="flex items-center gap-2">
            <div class="shrink-0">
                <img
                    src="/people/{p.img}"
                    alt={p.name}
                    class="aspect-square w-6 h-6 object-cover rounded bg-gray-200 dark:bg-gray-800"
                />
            </div>
            <div class={size}>
                <a href="/u/{p.id}" class="hover:underline">{p.name}</a>
            </div>
        </div>
    {/each}
</div>
