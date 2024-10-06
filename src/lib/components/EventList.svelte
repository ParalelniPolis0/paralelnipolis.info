<script>
    import { DeviceTablet } from "svelte-heros-v2";
    import { addDays } from "date-fns";
    import { getContext } from "svelte";

    const lang = getContext("lang");

    const { events, person = null } = $props();
</script>

<div class="grid grid-cols-1 gap-4 mt-4">
    {#each events as ev}
        <div>
            <div class="flex flex-wrap">
                <div class="grow">
                    <h3 class="text-2xl inline">
                        <a href="/e/{ev.id}" alt={ev.name} class="font-semibold"
                            >{ev.name}</a
                        >
                    </h3>
                    {#if person}
                        <span
                            class="py-0.5 px-1.5 bg-blue-100 dark:bg-blue-900 font-mono text-black dark:text-white text-xs rounded ml-1"
                            >{lang === "cs" ? "přednášející" : "speaker"}</span
                        >
                    {/if}
                </div>
                <div class="mt-1 inline-block text-xl opacity-50">
                    {new Date(ev.date).toLocaleDateString(lang)}
                    {#if ev.days && ev.days > 1}
                        - {addDays(
                            new Date(ev.date),
                            ev.days - 1,
                        ).toLocaleDateString(lang)}{/if}
                </div>
            </div>
        </div>
    {/each}
</div>
