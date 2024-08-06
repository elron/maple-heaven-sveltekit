<script lang="ts">
  import { page } from "$app/stores";

  import {
    Table,
    TableBody,
    TableBodyCell,
    TableBodyRow,
    TableHead,
    TableHeadCell,
    TableSearch,
  } from "flowbite-svelte";

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

<div class="">
  <!-- {JSON.stringify(items)} -->

  {#if items}
    <!-- <td>Item Name</td>
          <td>mean</td> -->
    <!-- <td>p0</td>
          <td>p25</td>
          <td>p50</td>
          <td>p75</td>
          <td>p100</td> -->
    <TableSearch
      placeholder="Search MapleLegends Item Pricing..."
      hoverable={true}
      bind:inputValue={searchInput}
    >
      <TableHead>
        <TableHeadCell>Item Name</TableHeadCell>
        <TableHeadCell>Price</TableHeadCell>
        <TableHeadCell>
          <span class="sr-only">Source</span>
        </TableHeadCell>
      </TableHead>

      <TableBody tableBodyClass="divide-y">
        {#each items as item}
          <TableBodyRow>
            <TableBodyCell>
              {item.search_item}
            </TableBodyCell>
            <TableBodyCell>{item?.mean.toLocaleString()}</TableBodyCell>
            <TableBodyCell>
              <a
                class=" text-primary-500"
                href={`https://owlrepo.com/listing/${item.task_id}`}
              >
                Source
              </a>
            </TableBodyCell>
            <!-- <td>{item.p0}</td>
          <td>{item.p25}</td>
          <td>{item.p50}</td>
          <td>{item.p75}</td>
          <td>{item.p100}</td> -->
          </TableBodyRow>
        {/each}
      </TableBody>
    </TableSearch>
  {/if}
</div>
