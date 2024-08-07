<script lang="ts">
  import { page } from "$app/stores";
  import {
    HeartSolid,
    HeartOutline,
    PenOutline
  } from "flowbite-svelte-icons";
  import {
    TableBody,
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
