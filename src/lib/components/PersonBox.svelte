<script>
    const { person: p, size = "w-6" } = $props();
</script>

<div class="">
    <a href="/p/{p.id}"
        ><img
            src="/gimg/people/s/{p.id}.webp"
            alt={p.name}
            class="object-cover aspect-square rounded {size} ring-2 ring-white dark:ring-black hover:rounded-sm hover:scale-150 hover:z-50 hover:-rotate-6 transition-all"
        /></a
    >
</div>
