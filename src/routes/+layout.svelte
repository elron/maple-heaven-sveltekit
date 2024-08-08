<script>
  import Plausable from "$lib/modules/Plausable.svelte";
  import "../app.css";

  import {
    Navbar,
    NavBrand,
  } from "flowbite-svelte";
  import { DarkMode } from "flowbite-svelte";
</script>

<Plausable />

<div
  class="bg-white dark:bg-gray-900 text-gray-600 dark:text-gray-400 antialiased vsc-initialized min-h-screen"
>
  <Navbar>
    <!-- <div class="container mx-auto max-w-3xl"> -->
      <NavBrand href="/">
        <!-- <img
      src="/images/flowbite-svelte-icon-logo.svg"
      class="me-3 h-6 sm:h-9"
      alt="Flowbite Logo"
    /> -->
        <span
          class="self-center whitespace-nowrap text-xl font-semibold dark:text-white"
          >Maple Heaven</span
        >
      </NavBrand>
<!--      <NavHamburger />-->
      <!-- <NavUl>
    <NavLi href="/">Home</NavLi>
    <NavLi href="/about">About</NavLi>
    <NavLi href="/docs/components/navbar">Navbar</NavLi>
    <NavLi href="/pricing">Pricing</NavLi>
    <NavLi href="/contact">Contact</NavLi>
  </NavUl> -->
      <DarkMode />
    <!-- </div> -->
  </Navbar>
  <div class="container mx-auto max-w-4xl">
    <slot></slot>
  </div>
</div>
