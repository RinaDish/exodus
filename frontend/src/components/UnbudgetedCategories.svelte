<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { fly, scale, slide } from 'svelte/transition';

  import type { ChartData } from '../types/Api';

  export let categories: ChartData[];

  let isActive = false;
  let activeCategotegory: string | null;

  const dispatch = createEventDispatcher();
  const handleClick = (category: ChartData) => () => {
    categories = categories.filter((c) => c.id !== category.id);
    dispatch('addCategory', category);
  };

  $: if (!categories.length) isActive = false;
</script>

<div class=" text-gray-800">
  {#if isActive}
    <div
      class="flex rounded-2xl text-sm bg-coolGreen-light px-3 py-0.5 cursor-pointer items-center"
      in:fly={{ duration: 500, x: 100 }}
    >
      <div class="flex flex-wrap justify-center">
        {#each categories as category}
          <div
            class="pl-3 pr-1.5 py-1 hover:bg-coolGreen-lessLight rounded-3xl flex items-center justify-center"
            on:mouseenter={() => (activeCategotegory = category.title)}
            on:mouseleave={() => (activeCategotegory = null)}
          >
            <div>{category.title}</div>
            <div
              class="ml-2 add opacity-0 mr-0.5"
              class:active={activeCategotegory === category.title}
              on:click={handleClick(category)}
            >
              <img alt="add" src="images/add-small.svg" />
            </div>
          </div>
        {/each}
      </div>

      <div
        class="ml-2 rounded-2xl sm:w-5 sm:h-5 hover:opacity-100 opacity-50 p-1"
        on:click={() => (isActive = false)}
      >
        <img alt="close" src="images/close.svg" />
      </div>
    </div>
  {:else}
    <div
      on:click={() => (isActive = true)}
      class="flex rounded-2xl text-sm bg-gree bg-coolGreen-light px-3 py-1.5 cursor-pointer"
    >
      <div class="mr-2">Unbudgeted</div>
      <div class="rounded-3xl bg-coolGreen-darkest px-1.5 text-indigo-50">
        {categories.length}
      </div>
    </div>
  {/if}
</div>

<style>
  .active {
    opacity: 1;
  }
</style>
