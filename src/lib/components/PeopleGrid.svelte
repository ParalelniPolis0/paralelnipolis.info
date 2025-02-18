<script>
    import { imgHashUrl } from "$lib/utils.js";
    import { people as allPeople } from "$lib/data.js";
    import { t } from "$lib/i18n.js";
    import { User } from "svelte-heros-v2";

    let { people, size, showAll = false } = $props();
    let sizePx = $derived(size === "small" ? 75 : 110);

    function resolvePerson(pid) {
        if (typeof pid === "object") {
            return pid;
        }
        const item = allPeople.find((p) => p.id === pid);
        if (item) {
            return item;
        }
        return {
            name: pid,
        };
    }

    const resolvedPeople = people.map(resolvePerson)
    const peopleWithProfile = resolvedPeople.filter(x => x.id)
    const peopleWithoutProfile = resolvedPeople.filter(x => !x.id)

</script>

{#if people.length === 0}
    <div class="text-xl">{$t`No results`}</div>
{:else}
    <div
        class="grid gap-4 {size === 'small'
            ? 'grid-cols-4 sm:grid-cols-8 lg:grid-cols-10'
            : 'grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-7'}"
    >
        {#each peopleWithProfile as p}
            <div
                class="w-full text-center font-semibold {size === 'small'
                    ? 'text-sm'
                    : ''}"
            >
                {#if p.imgHash}<a href="/p/{p.id}"
                        ><img
                            src={imgHashUrl("people", p.imgHash)}
                            alt={p.name}
                            class="text-gray-300 w-full inline-block aspect-square object-cover {p.rand ===
                            1
                                ? '-rotate-0'
                                : '-rotate-0'} hover:-rotate-6 hover:scale-110 transition-all rounded bg-gray-200 dark:bg-gray-800 mb-2"
                        /></a
                    >{:else}<div
                        class="w-full aspect-square rounded bg-gray-200 dark:bg-gray-200 flex items-center justify-center mb-2"
                    >
                        <User class="opacity-25" size="50%" />
                    </div>{/if}
                {#if p.id}
                    <a href="/p/{p.id}">{p.name}</a>
                {:else}
                    <a class:invalid-link={!p.id}>{p.name}</a>
                {/if}
                <!--div class="font-normal"></div-->
            </div>
        {/each}
        {#if showAll}
            <div
                class="w-full text-center font-semibold {size === 'small'
                    ? 'text-lg'
                    : 'text-xl'}"
            >
                <div
                    class="w-full aspect-square bg-gray-100 dark:bg-gray-900 rounded transition-all hover:scale-150 flex items-center justify-center p-2"
                >
                    <a href="/people">{$t`Show all`} ({showAll}) →</a>
                </div>
            </div>
        {/if}
    </div>
    {#if peopleWithoutProfile.length > 0}
        <div class="flex flex-wrap gap-3.5 mt-6">
        {#each peopleWithoutProfile as p}
            <div class="text-md">{p.name}</div>
        {/each}
        </div>
    {/if}
{/if}
