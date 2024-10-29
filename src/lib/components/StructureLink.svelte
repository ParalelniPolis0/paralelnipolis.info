<script>
    import { structures } from "$lib/data.js";
    const { id } = $props();
    const item = $derived(structures.find((s) => s.id === id));
</script>

<a href="/s/{item.id}" class="">{item.shortname || item.name}</a>
