<script lang="ts">
  import { page } from "$app/stores";
  import { HeartSolid, HeartOutline, PenOutline, QuestionCircleOutline, ArrowUpRightFromSquareOutline, ChevronDownOutline } from "flowbite-svelte-icons";
  import {
    TableBody,
    Button,
    TableBodyCell,
    TableBodyRow,
    TableHead,
    TableHeadCell,
    TableSearch,
    Label,
    Dropdown,
    Select,
    Popover,
    Table,
    Hr,
    Search,
    Radio,
  } from "flowbite-svelte";
  import { getStoredHeartedItems, setStoredHeartedItems } from "../store";
  import { PriceName } from "$lib/enums/price-name.enum";
  import type { ItemMetadata } from "$lib/types/item-metadata";
  import { dev } from "$app/environment";
  import { Tooltip } from 'flowbite-svelte';

  import Icon from '@iconify/svelte';

  const MORE_PER_CLICK = 20;

  let showAmount = $state(10);

  function showMore() { showAmount = showAmount+MORE_PER_CLICK }


  const priceOptions: { value: keyof typeof PriceName; name: PriceName }[] = [
    { value: "p0", name: PriceName.p0 },
    { value: "p25", name: PriceName.p25 },
    { value: "p50", name: PriceName.p50 },
    { value: "p75", name: PriceName.p75 },
    { value: "p100", name: PriceName.p100 },
    { value: "mean", name: PriceName.mean },
  ];

  // let searchInput = $state(dev ? "Scroll for Gloves for ATT 60%" : "");
  let searchInput = $state(dev ? "" : "");
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
      }).sort((a, b) => {
        if(sortBy === 'Highest Price') {
          return b[selectedPrice] - a[selectedPrice];
        } else if (sortBy === 'Lowest Price') {
          return a[selectedPrice] - b[selectedPrice];
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

    if(heartedItems.length === 0) {
      showOnlyLiked = false;
    }
  });

  let sortBy = $state();
</script>


<div class="mt-5">
  

  <section class="flex mb-3 gap-x-3">

  <Search placeholder="Search MapleLegends Item Pricing..." bind:value={searchInput} />


  
<Button class=" whitespace-nowrap" size="xs" outline={!Boolean(sortBy)}>
  Sort By {sortBy}<ChevronDownOutline class="w-6 h-6 ms-2 text-white dark:text-white" />
</Button>
<Dropdown class="w-44 p-3 space-y-3 text-sm">
  <li>
    <Radio name="group1" bind:group={sortBy} value={''}>No Sorting</Radio>
  </li>
  <li>
    <Radio name="group1" bind:group={sortBy} value={'Highest Price'}>Highest Price First</Radio>
  </li>
  <li>
    <Radio name="group1" bind:group={sortBy} value={'Lowest Price'}>Lowest Price First</Radio>
  </li>
</Dropdown>
      <Button
        outline={!showOnlyLiked}
        size="xs"
        onclick={() => showOnlyLiked = !showOnlyLiked}
        disabled={heartedItems.length === 0}
        class=" text-nowrap {showOnlyLiked ? "m-[1px]" : ''}"
      >
      {#if showOnlyLiked}
      <HeartSolid class="w-4 h-4 me-2" />
      {:else}
      <HeartOutline class="w-4 h-4 me-2" />
      {/if}
        Show Only Liked Items ({heartedItems.length})
      </Button>
  
  </section>

  {#if items}
    <Table
      divClass="relative shadow-md sm:rounded-lg"
      hoverable={true}
    >
      <TableHead>
        <TableHeadCell class="w-[5.25rem]"></TableHeadCell>
        <TableHeadCell class="w-[5.25rem]"><!--icon--></TableHeadCell>
        <TableHeadCell class=" w-[45%]">Item Name</TableHeadCell>
        <TableHeadCell class="w-[20%] relative">
          <Label htmlFor="select-price" class="flex items-center gap-2">
            {@html PriceName[selectedPrice].replaceAll(' ', '<br>')}
            <PenOutline size="sm" strokeWidth="2" class="text-primary-500" />
          </Label>
          <Select
          id="select-price"
          placeholder="Choose displayed price"
          defaultClass="absolute inset-0 opacity-0 cursor-pointer"
          items={priceOptions}
          bind:value={selectedPrice}
          />
        </TableHeadCell>
        <TableHeadCell class="w-32">NPC</TableHeadCell>
      </TableHead>

      <TableBody tableBodyClass="divide-y">
        {#each items.slice(0, showAmount) as item, i}
          {@const metadata: ItemMetadata = $page.data.itemsMetadata?.[item.search_item]}



          <TableBodyRow  class="group">
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
              {#if metadata?.image_path}
              <Tooltip color="navbar" triggeredBy="#icon-{i}">Show Item on hidden-street.com</Tooltip>
              <a href={metadata.url} target="_blank" id="icon-{i}">
              <img class="min-w-8 max-w-8 min-h-8 max-h-8 object-contain h-auto box-content bg-white p-0.5  rounded-md  opacity-70 group-hover:opacity-100" src="{$page.data.api_url}{metadata.image_path}" alt={item.search_item} />
              </a>
              {/if}
            </TableBodyCell>
            <TableBodyCell>

              {#if metadata?.url && metadata.image_path}
              <a class="hover:underline" id="name-{i}" href="{metadata.url}"
              target="_blank">
              {item.search_item}
              </a>
              {:else}
              {item.search_item}
              {/if}
            </TableBodyCell>
            <TableBodyCell
              >
              <Popover border={false} color="navbar" triggeredBy="#price-{i}" class="text-sm pointer-events-none" defaultClass="">
                <dl class="grid grid-cols-2 px-5 pt-2 pb-3 gap-y-1 text-slate-400 dark:text-slate-500">
                  <dt>count</dt> <dd class="font-bold">{item.n_owled}</dd>
                  <hr class="col-span-2 -mx-5 my-0.5" />
                  <dt class:selected={selectedPrice === 'p0'}>min</dt> <dd class=" font-bold" class:selected={selectedPrice === 'p0'} >{item.p0.toLocaleString()}</dd>
                  <dt class:selected={selectedPrice === 'p25'}>p25</dt> <dd class=" font-bold" class:selected={selectedPrice === 'p25'} >{item.p25.toLocaleString()}</dd>
                  <dt class:selected={selectedPrice === 'p50'}>p50</dt> <dd class=" font-bold" class:selected={selectedPrice === 'p50'} >{item.p50.toLocaleString()}</dd>
                  <dt class:selected={selectedPrice === 'p75'}>p75</dt> <dd class=" font-bold" class:selected={selectedPrice === 'p75'} >{item.p75.toLocaleString()}</dd>
                  <dt class:selected={selectedPrice === 'p100'}>p100</dt> <dd class=" font-bold" class:selected={selectedPrice === 'p100'} >{item.p100.toLocaleString()}</dd>
                  <dt class:selected={selectedPrice === 'mean'}>mean</dt> <dd class=" font-bold" class:selected={selectedPrice === 'mean'} >{item.mean.toLocaleString()}</dd>
                  <dt class:selected={selectedPrice === 'std'}>std</dt> <dd class=" font-bold" class:selected={selectedPrice === 'std'} >{item.std.toLocaleString()}</dd>
                </dl>
                
              </Popover>
              <div class="flex justify-between gap-2">
                <span id="price-{i}">
                {item && item[selectedPrice].toLocaleString()}
              </span>
            
              <a
               id="owl-{i}"
                target="_blank"
              class="text-primary-500" href="https://owlrepo.com/listing/${item.task_id}">
                <!-- <ArrowUpRightFromSquareOutline size="sm" strokeWidth="2" class="text-primary-500 inline-block" /> -->
                <!-- <Icon icon="mdi:owl" class="text-primary-500 inline-block"  /> -->
                 <Tooltip  color="navbar" triggeredBy="#owl-{i}">More data on OwlRepo.com</Tooltip>
                <ArrowUpRightFromSquareOutline size="sm" strokeWidth="2" class="text-primary-500 inline-block relative -top-[0.1em]" />
              </a>
            </div>
              </TableBodyCell
            >
            <TableBodyCell>
              {#if metadata?.sold_for}
                {metadata?.sold_for.toLocaleString()} {metadata?.sold_for > 1 ? 'mesos' : 'meso'}
              {/if}
            </TableBodyCell>
          </TableBodyRow>
        {/each}
      </TableBody>
    </Table>
    {#if items.length> showAmount}
    <div class="text-center mt-6 ">

      <Button outline pill onclick={showMore}>Show {MORE_PER_CLICK} More Items</Button>
    </div>
    {/if}
  {/if}
</div>


<style lang="scss">
  dl .selected {
    @apply text-slate-800 dark:text-white;
  }
</style>