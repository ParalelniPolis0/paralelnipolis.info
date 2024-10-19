<script>
    import { topics, glossary } from "$lib/data.js";
    import TopicsList from "$lib/components/TopicsList.svelte";
</script>

<h1 class="main text-2xl mb-4 mt-4">Topics</h1>

<TopicsList {topics} />
