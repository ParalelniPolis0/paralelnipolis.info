<script>
    import "../app.css";
    import { page } from "$app/stores";
    import { Sun, Moon } from "svelte-heros-v2";
    import { onMount, setContext } from "svelte";
    import { pkg, build } from "$lib/data.js";

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

    function convertGitUrl(url) {
        return url.replace(/^git\+/, "").replace(/\.git$/, "");
    }

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
    <div class="bg-gray-100 dark:bg-gray-900 py-3 px-6 dark:text-white">
        <div class="max-w-6xl h-auto mx-auto py-2 mb-2">
            <div class="w-full lg:flex gap-4 items-start">
                <div class="grow">
                    <a href="https://vojdivon.sk/" class="text-2xl"
                        >vejdi ven!</a
                    >
                    <div class="mt-2 flex flex-wrap gap-2 text-sm mb-4">
                        <a href="https://x.com/paralelnipolis">𝕏</a>
                        <a
                            href="https://primal.net/p/npub1m2mvvpjugwdehtaskrcl7ksvdqnnhnjur9v6g9v266nss504q7mqvlr8p9"
                            >Nostr</a
                        >
                        <a href="https://bsky.app/profile/paralelnipolis.cz"
                            >Bluesky</a
                        >
                        <a href="https://www.facebook.com/vejdiven">Facebook</a>
                        <a href="https://www.instagram.com/paralelnipolis"
                            >Instagram</a
                        >
                        <a
                            href="https://www.youtube.com/channel/UCfHJ5Y3akQ7LA0PQmSYlYmQ"
                            >YouTube</a
                        >
                        <a href="https://github.com/ParalelniPolis">GitHub</a>
                    </div>
                </div>
                <div class="">
                    <div
                        class="flex items-center gap-2 mt-8 lg:mt-0 lg:justify-end lg:text-right"
                    >
                        <div>
                            <a href="https://www.wtfpl.cz/"
                                ><img
                                    src="/wtfpl.svg"
                                    class="text-black w-6"
                                    alt="WTFPL – Do What the Fuck You Want to Public License"
                                /></a
                            >
                        </div>
                        <div class="font-semibold">
                            <a href="https://www.wtfpl.cz/">WTFPL</a>
                        </div>
                        <!--div>/</div>
                        <div>
                            <a href="https://choosealicense.com/licenses/unlicense/"
                                ><img
                                    src="/unlicense.svg"
                                    class="text-black w-5"
                                    alt="The Unlicense"
                                /></a
                            >
                        </div>
                        <div class="font-semibold">
                            <a href="https://choosealicense.com/licenses/unlicense/"
                                >Unlicense</a
                            >
                        </div-->
                        <div>v{pkg.version}</div>
                        <div>
                            <a href={convertGitUrl(pkg.repository.url)}>
                                Source code</a
                            >
                        </div>
                    </div>
                    <div class="mt-3 opacity-50">
                        Last update: {new Date(build.time).toLocaleString(lang)}
                    </div>
                </div>
            </div>
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
