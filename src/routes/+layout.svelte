<script>
    import "../app.css";
    import { page } from "$app/stores";
    import { Sun, Moon } from "svelte-heros-v2";
    import { onMount, setContext } from "svelte";

    const { data } = $props();
    const lang = data.lang;
    setContext("lang", lang);

    let currentPath = $derived($page.url?.pathname);
    let darkMode = $state(null);
    const menu = [
        ["/", "→/"],
        ["/concepts", "Concepts", "Koncepty"],
        ["/people", "People", "Lidé"],
        ["/archive", "Archive", "Archiv"],
        ["/membership", "Membership", "Členství"],
        ["https://forum.paralelnipolis.cz", "Forum"],
        ["https://shop.paralelnipolis.cz", "Shop"],
        /*["https://docs.paralelnipolis.cz", "Docs", "Dokumentace"],*/
    ];

    onMount(() => {
        if (
            localStorage.theme === "dark" ||
            (!("theme" in localStorage) &&
                window.matchMedia("(prefers-color-scheme: dark)").matches)
        ) {
            document.documentElement.classList.add("dark");
            darkMode = true;
        } else {
            document.documentElement.classList.remove("dark");
            darkMode = false;
        }
    });

    function switchDarkMode() {
        if (darkMode) {
            localStorage.theme = "light";
            document.documentElement.classList.remove("dark");
            darkMode = false;
        } else {
            localStorage.theme = "dark";
            document.documentElement.classList.add("dark");
            darkMode = true;
        }
    }
</script>

<svelte:head>
    <title>Paralelní Polis</title>
</svelte:head>

<div
    class="w-full bg-white dark:bg-black dark:text-white min-h-screen flex flex-col"
>
    <div class="w-full grow">
        <div
            class="max-w-6xl mx-auto px-3 py-3 flex items-center sticky top-0 bg-white dark:bg-black z-10"
        >
            <a href="/" class="pr-2 shrink-0"
                ><img
                    src="/logo.png"
                    alt="Paralelní Polis"
                    class="invert dark:invert-0"
                /></a
            >
            <div class="flex gap-1 px-4 top-menu grow">
                {#each menu as [path, titleEn, titleCs]}
                    <a
                        href="{lang === 'cs' ? '/cs' : ''}{path}"
                        class="font-semibold hover:underline px-2.5 py-1.5 hover:bg-gray-200 hover:dark:bg-gray-800 {(
                            path === '/'
                                ? currentPath === path
                                : currentPath.match(path)
                        )
                            ? 'bg-gray-100 dark:bg-gray-900'
                            : ''}"
                        >{lang === "cs" ? titleCs || titleEn : titleEn}</a
                    >
                {/each}
            </div>
            <div>
                <div onclick={switchDarkMode} class="cursor-pointer">
                    {#if darkMode}<Sun />{:else}<Moon />{/if}
                </div>
            </div>
        </div>
        <div class="max-w-5xl mx-auto px-3 pt-4 pb-16 flex-grow">
            <slot />
        </div>
    </div>
    <div class="bg-gray-100 dark:bg-gray-900 py-3 dark:text-white">
        <div class="max-w-6xl h-auto mx-auto py-2">
            <div><a href="https://vojdivon.sk/">vejdi ven!</a></div>
        </div>
    </div>
</div>

<style>
    @layer {
        body {
            @apply bg-gray-100 dark:bg-gray-900;
        }
    }
</style>
