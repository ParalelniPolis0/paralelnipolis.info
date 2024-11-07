<script>
    import { config } from "$lib/data.js";
    let { title, description, url, img } = $props();
    title = title.trim();
</script>

<title>{title} | {config.title}</title>
<meta name="title" content={title} />
<meta name="description" content={description} />

<meta property="og:title" content={title} />
<meta property="og:description" content={description} />

<meta property="og:type" content="website" />
{#if url}
    <meta property="og:url" content={url} />
{/if}
{#if img}
    <meta property="og:image" content={img} />
{/if}
