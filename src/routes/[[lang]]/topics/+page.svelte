<script>
    import { topics, glossary, config } from "$lib/data.js";
    import TopicsList from "$lib/components/TopicsList.svelte";
</script>

<svelte:head>
    <title>Topics | {config.title}</title>
</svelte:head>

<h1 class="main text-2xl mb-4 mt-4">Topics</h1>

<TopicsList {topics} />
