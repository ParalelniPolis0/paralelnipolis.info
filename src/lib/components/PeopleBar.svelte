<script>
    import { people as allPeople, structures } from "$lib/data.js";
    import { imgHashUrl } from "$lib/utils.js";

    let { people, size = "text-lg", className = "" } = $props();

    /*let fullPeople = $derived(
        typeof people[0] === "string"
            ? people.map((x) => allPeople.find((p) => p.id === x))
            : people,
    );*/

    function resolveItem(p) {
        let type = "people";
        let obj = null;
        if (typeof p === "string") {
            const [title, id] = p.split("|");
            const split = (id || title).split(":");
            if (split[0] === "structure") {
                type = "structure";
                obj = structures.find((p) => p.id === split[1]);
            } else {
                obj = allPeople.find((p) => p.id === (split[1] || split[0]));
            }
            if (!obj) {
                return { name: title };
            }
        } else {
            obj = p;
        }
        if (!obj) {
            return null;
        }
        return {
            ...obj,
            url: `/${type === "structure" ? "s" : "p"}/${obj.id}`,
            imgUrl: imgHashUrl(type, obj.imgHash),
        };
    }
</script>

{#if people.length > 0}
    <div class="flex flex-wrap gap-y-2 gap-x-4 {className}">
        {#each people.map(resolveItem) as p}
            <div class="flex items-center gap-2">
                {#if p.imgUrl}
                    <div class="shrink-0">
                        <img
                            src={p.imgUrl}
                            alt={p.name}
                            class="aspect-square w-5 h-5 object-cover rounded bg-gray-200 dark:bg-gray-800"
                        />
                    </div>
                {/if}
                {#if p.url}
                    <div class={size}>
                        <a
                            href={p.url}
                            class="hover:underline {!p.url ? 'invalid-link' : ''}"
                            >{p.name}</a
                        >
                    </div>
                {:else}
                    <span class="text-lg">{p.name}</span>
                {/if}
            </div>
        {/each}
    </div>
{/if}
