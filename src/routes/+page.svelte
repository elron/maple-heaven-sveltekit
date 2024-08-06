<script lang="ts">
    import { page } from "$app/stores";
  
    let searchInput = $state("");
  
    let items = $derived.by(() => {
      if (searchInput.length === 0) return $page.data.items;
  
      const searchWords = searchInput.toLowerCase().split(" ").filter(word => word.length > 0);
  
      return $page.data.items.filter((item) => {
        const itemText = item.search_item.toLowerCase();
        return searchWords.every(word => itemText.includes(word));
      });
    });
  </script>
  
  <input type="text" bind:value={searchInput} />
  <!-- {JSON.stringify(items)} -->
  
  {#if items}
    <ul>
      {#each items as item}
        <li>
          <a href={`https://owlrepo.com/listing/${item.task_id}`}>
            {item.search_item}
          </a>
        </li>
      {/each}
    </ul>
  {/if}