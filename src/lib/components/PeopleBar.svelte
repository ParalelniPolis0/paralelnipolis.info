<script>
    import { people as allPeople, instances } from "$lib/data.js";
    let { people, size = "text-lg" } = $props();

    /*let fullPeople = $derived(
        typeof people[0] === "string"
            ? people.map((x) => allPeople.find((p) => p.id === x))
            : people,
    );*/

    function resolveItem(p) {
        let type = "people";
        let obj = null;
        if (typeof p === "string") {
            const split = p.split(":");
            if (split[0] === "instances") {
                type = "instances";
                obj = instances.find((p) => p.id === split[1]);
            } else {
                obj = allPeople.find((p) => p.id === split[1] || split[0]);
            }
        } else {
            obj = p;
        }
        if (!obj) {
            return null;
        }
        return Object.assign(obj, {
            url: `/${type === "instances" ? "i" : "p"}/${obj.id}`,
            img: `/gimg/${type}/s/${obj.id}.webp`,
        });
    }
</script>

<div class="flex flex-wrap gap-4">
    {#each people.map(resolveItem) as p}
        <div class="flex items-center gap-2">
            <div class="shrink-0">
                <img
                    src={p.img}
                    alt={p.name}
                    class="aspect-square w-6 h-6 object-cover rounded bg-gray-200 dark:bg-gray-800"
                />
            </div>
            <div class={size}>
                <a href={p.url} class="hover:underline">{p.name}</a>
            </div>
        </div>
    {/each}
</div>
