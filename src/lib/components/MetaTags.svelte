<script>
    import { config } from "$lib/data.js";
    let { title, description, url, img } = $props();
    let trimmedTitle = $derived(title.trim());
</script>

<title>{trimmedTitle} | {config.title}</title>
<meta name="title" content={trimmedTitle} />
<meta name="description" content={description} />

<meta property="og:title" content={trimmedTitle} />
<meta property="og:description" content={description} />

<meta property="og:type" content="website" />
{#if url}
    <meta property="og:url" content={url} />
{/if}
{#if img}
    <meta property="og:image" content={img} />
{/if}
