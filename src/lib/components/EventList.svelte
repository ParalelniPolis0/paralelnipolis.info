<script>
    import { DeviceTablet } from "svelte-heros-v2";
    import { addDays } from "date-fns";

    const { events, person = null } = $props();
</script>

<div class="grid grid-cols-1 gap-4 mt-4">
    {#each events as ev}
        <div>
            <div class="flex flex-wrap">
                <div class="grow">
                    <h3 class="text-2xl inline-block">
                        <a
                            href="/p/{ev.project}#{ev.id}"
                            alt={ev.name}
                            class="font-semibold">{ev.name}</a
                        >
                    </h3>
                    {#if person}
                        <span
                            class="py-0.5 px-1.5 bg-gray-100 dark:bg-gray-900 font-mono text-gray-500 text-xs rounded ml-1"
                            >přednášející</span
                        >
                    {/if}
                </div>
                <div class="mt-1 inline-block text-xl opacity-50">
                    {new Date(ev.date).toLocaleDateString("cs-CZ")}
                    {#if ev.days && ev.days > 1}
                        - {addDays(
                            new Date(ev.date),
                            ev.days - 1,
                        ).toLocaleDateString("cs-CZ")}{/if}
                </div>
            </div>
        </div>
    {/each}
</div>
