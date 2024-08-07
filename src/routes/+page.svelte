<script lang="ts">
  import { page } from "$app/stores";
  import { HeartSolid, HeartOutline } from "flowbite-svelte-icons";
  import {
    Button,
    Table,
    TableBody,
    TableBodyCell,
    TableBodyRow,
    TableHead,
    TableHeadCell,
    TableSearch,
  } from "flowbite-svelte";
  import { getStoredHeartedItems, setStoredHeartedItems } from "../store";

  let searchInput = $state("");
  let heartedItems = $state([]);

  $effect(() => {
    heartedItems = getStoredHeartedItems();
  });

  let items = $derived.by(() => {
    const searchWords = searchInput
      .toLowerCase()
      .split(" ")
      .filter((word) => word.length > 0);

    return $page.data.items
      .filter((item) => {
        if (searchInput.length) {
          const itemText = item.search_item.toLowerCase();
          return searchWords.every((word) => itemText.includes(word));
        } else {
          return true;
        }
      })
      .filter((item) => {
        if (showOnlyLiked) {
          if (heartedItems.includes(item.search_item)) {
            return true;
          } else {
            return false;
          }
        } else {
          return true;
        }
      });
  });

  function toggleHeart(itemName: string) {
    if (heartedItems.includes(itemName)) {
      heartedItems = heartedItems.filter((name) => name !== itemName);
    } else {
      heartedItems = [...heartedItems, itemName];
    }
    setStoredHeartedItems(heartedItems);
  }

  $effect(() => {
    // This effect will run whenever heartedItems changes
    setStoredHeartedItems(heartedItems);
  });

  let showOnlyLiked = $state(false);
</script>

<div class="">
  <div class="mt-5 h-[2em]">
    {#if showOnlyLiked}
      <Button size="xs" onclick={() => (showOnlyLiked = !showOnlyLiked)}>
        <HeartSolid class="w-4 h-4 me-2" />Show Only Liked Items
      </Button>
    {:else}
      <Button
        outline
        size="xs"
        onclick={() => (showOnlyLiked = !showOnlyLiked)}
      >
        <HeartOutline class="w-4 h-4 me-2" />Show Only Liked Items
      </Button>
    {/if}
  </div>

  {#if items}
    <TableSearch
      placeholder="Search MapleLegends Item Pricing..."
      hoverable={true}
      bind:inputValue={searchInput}
    >
      <TableHead>
        <TableHeadCell></TableHeadCell>
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
              <button
                onclick={() => toggleHeart(item.search_item)}
                class="text-gray-500 hover:text-red-500 transition-colors duration-200"
              >
                {#if heartedItems.includes(item.search_item)}
                  <HeartSolid class="w-6 h-6" />
                {:else}
                  <HeartOutline class="w-6 h-6" />
                {/if}
              </button>
            </TableBodyCell>
            <TableBodyCell>
              {item.search_item}
            </TableBodyCell>
            <TableBodyCell>{item?.mean.toLocaleString()}</TableBodyCell>
            <TableBodyCell>
              <a
                target="_blank"
                class="text-primary-500"
                href={`https://owlrepo.com/listing/${item.task_id}`}
              >
                Source
              </a>
            </TableBodyCell>
          </TableBodyRow>
        {/each}
      </TableBody>
    </TableSearch>
  {/if}
</div>
