<script>
    import { getContext } from "svelte";

    const lang = getContext("lang");
    const pageTitle = lang === "cs" ? "Členství" : "Membership";
</script>

<div class="flex mt-4 mb-4">
    <h1 class="main text-2xl grow">{pageTitle}</h1>
</div>
