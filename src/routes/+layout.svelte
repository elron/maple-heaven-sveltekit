<script>
  import Plausable from "$lib/modules/Plausable.svelte";
  import { ArrowUpRightFromSquareOutline } from "flowbite-svelte-icons";
  import "../app.scss";
  import Icon from "@iconify/svelte";

  import {
    Navbar,
    NavBrand,
    NavHamburger,
    NavLi,
    NavUl,
    Footer,
    FooterBrand,
    FooterLinkGroup,
    FooterLink,
    FooterCopyright,
  } from "flowbite-svelte";
  import { DarkMode } from "flowbite-svelte";
</script>

<Plausable />

<div
  class="bg-white dark:bg-gray-900 text-gray-600 dark:text-gray-400 antialiased vsc-initialized min-h-screen"
>
  <Navbar>
    <!-- <div class="container mx-auto max-w-3xl"> -->
    <NavBrand href="/" class=" flex-grow ~md:flex-grow-0">
      <img src="/favicon.png" class="me-3 h-6 sm:h-9" alt="Maple Heaven" />
      <span
        class="self-center whitespace-nowrap text-xl font-semibold dark:text-white"
        >Maple Heaven</span
      >
      <span class="ms-3 text-sm mt-1"> Easily Find Item Prices in MapleLegends </span>
    </NavBrand>

    <DarkMode class="md:order-3" />
    <NavHamburger />
    <NavUl>
      <NavLi href="/">Home</NavLi>
      <NavLi href="/about">About</NavLi>
      <NavLi href="https://maplelegends.com/" target="_blank"
        >MapleLegends
        <ArrowUpRightFromSquareOutline
          size="sm"
          strokeWidth="2"
          class="text-primary-500 inline-block relative -top-[0.07em]"
        />
      </NavLi>
      <NavLi href="https://owlrepo.com/" target="_blank"
        >OwlRepo
        <ArrowUpRightFromSquareOutline
          size="sm"
          strokeWidth="2"
          class="text-primary-500 inline-block relative -top-[0.07em]"
        />
      </NavLi>
      <NavLi href="https://bbb.hidden-street.net/" target="_blank"
        >HiddenStreet
        <ArrowUpRightFromSquareOutline
          size="sm"
          strokeWidth="2"
          class="text-primary-500 inline-block relative -top-[0.07em]"
        />
      </NavLi>
    </NavUl>
    <!-- </div> -->
  </Navbar>
  <div class="wrap">
    <main class="py-10">
      <slot></slot>
    </main>
  </div>

  <div class="wrap">
    <Footer>
      <!-- <div class="sm:flex sm:items-center sm:justify-between">
        <FooterLinkGroup
          ulClass="flex flex-wrap items-center mb-6 text-sm text-gray-500 sm:mb-0 dark:text-gray-400"
        >
          <FooterLink href="/">About</FooterLink>
          <FooterLink href="/">Privacy Policy</FooterLink>
          <FooterLink href="/">Licensing</FooterLink>
          <FooterLink href="/">Contact</FooterLink>
        </FooterLinkGroup>
      </div> -->
      <hr
        class="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-4"
      />
      <!-- <FooterCopyright href="/" by="MapleHeaven™" copyrightMessage="" /> -->
      <div class="flex gap-x-4 text-center justify-center content text-xs">
        <span>
          © 2024 <a href="/" class="hover:underline">MapleHeaven™</a>
        </span>
        |
        <span>
          <a
            href="https://plausible.io/mapleheaven.netlify.app/"
            target="_blank">Website Stats</a
          >
        </span>
        |
        <span>
          <a href="https://plausible.io/mapleheaven.netlify.app/">
            GitHub Repo
            <!-- <Icon icon="mdi:github" /> -->
          </a>
        </span>
      </div>
    </Footer>
  </div>
</div>
