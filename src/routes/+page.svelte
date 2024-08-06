<script lang="ts">
  import { page } from "$app/stores";

  let searchInput = $state("");

  let items = $derived.by(() => {
    if (searchInput.length === 0) return $page.data.items;

    const searchWords = searchInput
      .toLowerCase()
      .split(" ")
      .filter((word) => word.length > 0);

    return $page.data.items.filter((item) => {
      const itemText = item.search_item.toLowerCase();
      return searchWords.every((word) => itemText.includes(word));
    });
  });
</script>

<input type="text" bind:value={searchInput} />
<!-- {JSON.stringify(items)} -->

{#if items}
  <table>
    <thead>
      <tr>
        <td>Item Name</td>
        <td>mean</td>
        <td>p0</td>
        <td>p25</td>
        <td>p50</td>
        <td>p75</td>
        <td>p100</td>
      </tr>
    </thead>
    <tbody>
      {#each items as item}
        <tr>
          <td>
            <a href={`https://owlrepo.com/listing/${item.task_id}`}>
              {item.search_item}
            </a>
          </td>
          <td>{item.mean}</td>
          <td>{item.p0}</td>
          <td>{item.p25}</td>
          <td>{item.p50}</td>
          <td>{item.p75}</td>
          <td>{item.p100}</td>
        </tr>
      {/each}
    </tbody>
  </table>
{/if}
