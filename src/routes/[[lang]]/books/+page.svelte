<script>
    import { books, people, config } from "$lib/data.js";
    import { imgHashUrl } from "$lib/utils.js";
    import PeopleBar from "$lib/components/PeopleBar.svelte";

    function resolvePerson(id) {
        const found = people.find((p) => id.split("|").at(-1) === p.id);
        if (found) {
            return found;
        }
        return {
            name: id,
        };
    }
</script>

<svelte:head>
    <title>Books | {config.title}</title>
</svelte:head>

<div class="mt-4 mb-8">
    <h1 class="main text-2xl grow">Recommended Books</h1>
</div>

<div class="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-4">
    {#each books as b}
        <div class="text-center shrink-0">
            <a href="/b/{b.id}" class="shrink-0"
                ><img
                    src={imgHashUrl("books", b.imgHash, "m")}
                    class="h-[60vw] sm:h-[32vw] lg:h-[23vw] inline-block shrink-0 bg-gray-200 dark:bg-gray-800"
                    alt={b.name}
                /></a
            >
            <div class="text-2xl mt-3 mb-6">
                <PeopleBar
                    people={b.authors}
                    className="inline-block my-2 justify-center"
                />
                <div>
                    <a href="/b/{b.id}" class="font-semibold"
                        >{b.name.split(":").at(0)}</a
                    >
                    <span class="opacity-50">({b.year})</span>
                </div>
                <div class="mt-1.5 text-base opacity-50">
                    {b.name.split(":").at(1)}
                </div>
            </div>
        </div>
    {/each}
</div>
