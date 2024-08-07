<script lang="ts">
  import { page } from "$app/stores";
  import {
    HeartSolid,
    HeartOutline,
    PenOutline
  } from "flowbite-svelte-icons";
  import {
    TableBody,
    Button,
    TableBodyCell,
    TableBodyRow,
    TableHead,
    TableHeadCell,
    TableSearch,
    Label,
    Select
  } from "flowbite-svelte";
  import { getStoredHeartedItems, setStoredHeartedItems } from "../store";
  import { PriceName } from "$lib/enums/price-name.enum";

  const priceOptions: { value: keyof typeof PriceName; name: PriceName }[] = [
    { value: "p0", name: PriceName.p0 },
    { value: "p25", name: PriceName.p25 },
    { value: "p50", name: PriceName.p50 },
    { value: "p75", name: PriceName.p75 },
    { value: "p100", name: PriceName.p100 },
    { value: "mean", name: PriceName.mean },
  ];

  let searchInput = $state("");
  let heartedItems = $state([]) as string[];
  let selectedPrice = $state("mean" as keyof typeof PriceName);

  $effect(() => {
    heartedItems = getStoredHeartedItems();
  });

  let showOnlyLiked = $state(false);
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
        <TableHeadCell class="relative w-full">
          <Label htmlFor="select-price" class="flex items-center gap-2">
            {PriceName[selectedPrice]}
            <PenOutline size="sm" strokeWidth="2" class="text-primary-500" />
          </Label>
          <Select id="select-price" placeholder="Choose displayed price"
                  defaultClass="absolute inset-0 opacity-0 cursor-pointer" items={priceOptions}
                  bind:value={selectedPrice} />
        </TableHeadCell>
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
            <TableBodyCell>{item && item[selectedPrice].toLocaleString()}</TableBodyCell>
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
