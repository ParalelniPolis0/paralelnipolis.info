<script>
    import "../app.css";
    import { page } from "$app/stores";
    import { Sun, Moon, Bars3 } from "svelte-heros-v2";
    import { onMount, setContext } from "svelte";
    import { pkg, build, config } from "$lib/data.js";

    const { data } = $props();
    const lang = data.lang;
    setContext("lang", lang);

    const menu = $derived(config.menu);
    let currentPath = $derived($page.url?.pathname);
    let darkMode = $state(null);
    let menuOpen = $state(false);

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
    <title>{config.title}</title>
</svelte:head>

{#if menuOpen}
    <div
        class="absolute top-0 left-0 w-full h-full bg-white dark:bg-black z-30 p-4"
    >
        <a href="/" class="pr-2 shrink-0" onclick={() => (menuOpen = false)}
            ><img
                src="/logo.png"
                alt={config.title}
                class="invert dark:invert-0"
            /></a
        >

        <div class="grid grid-cols-1 text-3xl">
            {#each menu as [path, titleEn, titleCs]}
                <a
                    href="{lang === 'cs' ? '/cs' : ''}{path}"
                    onclick={() => (menuOpen = false)}
                    class="font-semibold hover:underline px-2.5 py-1.5 hover:bg-gray-200 hover:dark:bg-gray-800 {(
                        path === '/'
                            ? currentPath === path
                            : currentPath.match(path)
                    )
                        ? 'bg-gray-100 dark:bg-gray-900'
                        : ''}">{lang === "cs" ? titleCs || titleEn : titleEn}</a
                >
            {/each}
        </div>
    </div>
{/if}

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
                    alt={config.title}
                    class="invert dark:invert-0"
                /></a
            >
            <div class="hidden sm:flex gap-1 px-4 top-menu">
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
            <div class="text-xl sm:hidden">
                <button
                    class="p-1.5 cursor-pointer hover:bg-gray-200 p-2 dark:hover:bg-gray-800"
                    onclick={() => (menuOpen = !menuOpen)}><Bars3 /></button
                >
            </div>
            <div class="grow"></div>
            <div class="flex items-center gap-2">
                <div
                    onclick={switchDarkMode}
                    class="cursor-pointer hover:bg-gray-200 p-2 dark:hover:bg-gray-800"
                >
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
                        <a href="https://x.com/{config.refs.twitter}">𝕏</a>
                        <a href="https://primal.net/p/{config.refs.nostr}"
                            >Nostr</a
                        >
                        <a href="https://bsky.app/profile/{config.refs.bsky}"
                            >Bluesky</a
                        >
                        <a
                            href="https://www.facebook.com/{config.refs
                                .facebook}">Facebook</a
                        >
                        <a
                            href="https://www.instagram.com/{config.refs
                                .instagram}">Instagram</a
                        >
                        <a
                            href="https://www.youtube.com/channel/{config.refs
                                .youtube_channel}">YouTube</a
                        >
                        <a href="https://www.meetup.com/{config.refs.meetup}/"
                            >Meetup</a
                        >
                        <a href="https://github.com/{config.refs.github}"
                            >GitHub</a
                        >
                    </div>
                </div>
                <div class="">
                    <div
                        class="flex items-center gap-2 mt-8 lg:mt-0 lg:justify-end lg:text-right"
                    >
                        <div>
                            <a href={config.license.url}
                                ><img
                                    src={config.license.logo}
                                    class="text-black w-6"
                                    alt={config.license.caption}
                                /></a
                            >
                        </div>
                        <div class="font-semibold">
                            <a href={config.license.url}
                                >{config.license.name}</a
                            >
                        </div>
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
