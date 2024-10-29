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
            <div
                class="md:flex items-center {ev.major
                    ? 'text-2xl'
                    : 'text-2xl'}"
            >
                <div
                    class="mt-1 text-nowrap inline-block opacity-75 mr-4 text-xl font-mono {ev.major
                        ? 'font-semibold'
                        : ''}"
                >
                    {new Date(ev.date).toISOString().slice(0, 10)}
                    <!--{#if ev.days && ev.days > 1}
            - {addDays(new Date(ev.date), ev.days - 1)
                .toISOString()
                .slice(0, 10)}{/if}-->
                </div>
                <div class="grow">
                    <h3 class="inline">
                        <a
                            href="/e/{ev.id}"
                            alt={ev.name}
                            class={ev.major ? "font-semibold" : ""}>{ev.name}</a
                        >
                        {#if ev.days && ev.days > 1}
                            <span class="opacity-50">({ev.days}d)</span>
                        {/if}
                    </h3>
                    {#if person}
                        {#if ev.organizers?.includes(person)}
                            <span
                                class="py-0.5 px-1.5 bg-red-100 dark:bg-red-900 font-mono text-black dark:text-white text-xs rounded ml-1"
                                >{lang === "cs"
                                    ? "organizátor"
                                    : "organizer"}</span
                            >
                        {/if}
                        {#if ev.speakers?.includes(person)}
                            <span
                                class="py-0.5 px-1.5 bg-blue-100 dark:bg-blue-900 font-mono text-black dark:text-white text-xs rounded ml-1"
                                >{lang === "cs"
                                    ? "přednášející"
                                    : "speaker"}</span
                            >
                        {/if}
                    {/if}
                </div>
                <div class="mt-2 sm:mt-0 mr-4 opacity-50 text-xl">
                    {#if ev.place?.country}
                        <span class="uppercase">{ev.place?.country}</span>/{ev
                            .place?.city || "YY"}
                    {:else}
                        Online
                    {/if}
                </div>
            </div>
        </div>
    {/each}
</div>
