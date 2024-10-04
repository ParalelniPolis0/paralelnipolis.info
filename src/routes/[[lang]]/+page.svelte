<script>
    import { archive } from "$lib/data.js";
    import PeopleBar from "$lib/components/PeopleBar.svelte";
    const randomVideo = archive[Math.floor(Math.random() * archive.length)];
</script>

<svelte:head>
    <title>Paralelní Polis</title>
</svelte:head>

<p>
    Paralelní Polis je nestátní nezisková organizace, kterou v roce 2014 v
    pražských Holešovicích založila umělecká aktivistická skupina Ztohoven. Misí
    Paralelní Polis je poskytovat technologie a vzdělání, které lidé potřebují
    pro zapojení do nezávislé společnosti a na ochranu individuální svobody.
    Vizí Paralelní Polis je svět, kde lidé mají možnost odloučit se od státu a
    žít ve svobodné společnosti.
</p>

<div class="flex mt-8">
    <div class="grow"></div>
    <div class="w-1/3">
        <h2 class="main text-2xl">From archive</h2>
        <div class="mt-4">
            <img
                src="/archive/{randomVideo.img}"
                alt={randomVideo.name}
                class="aspect-video object-cover"
            />
        </div>
        <div class="mt-2 mb-2 text-xl">
            <a href="/v/{randomVideo.id}"><h3>{randomVideo.name}</h3></a>
        </div>
        <PeopleBar people={randomVideo.people} size="text-md" />
    </div>
</div>
