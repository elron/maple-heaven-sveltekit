<script>
  import { dev } from "$app/environment";
</script>

<svelte:head>
  {#if !dev}
    <!-- plausible -->
    <script
      defer
      data-domain="mapleheaven.netlify.app"
      src={dev
        ? "https://plausible.io/js/script.local.js"
        : "https://plausible.io/js/script.outbound-links.js"}
    ></script>
    <script>
      window.plausible =
        window.plausible ||
        function () {
          (window.plausible.q = window.plausible.q || []).push(arguments);
        };
    </script>
    <!-- /plausible -->
  {/if}
</svelte:head>
