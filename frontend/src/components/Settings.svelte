<script lang="ts">
  import DeleteUser from './DeleteUser.svelte';
  import ErrorMessage from './ErrorMessage.svelte';
  import PasswordChange from './PasswordChange.svelte';
  import XtokenChange from './XtokenChange.svelte';

  let state: 'password' | 'x-token' | 'deleteUser' = 'password';
  let error = false;
  let errorMessage = '';

  export let showSettings: boolean;
</script>

<div id="bg" class="w-full z-0">
  {#if error}
    <ErrorMessage bind:visible={error} {errorMessage} />
  {/if}
  <div
    id="content"
    class="flex xs:flex-col sm:flex-row bg-white rounded-lg sm:min-w-max-content overlay"
  >
    <div
      class="xs:flex-row xs:justify-between sm:flex-col px-5 sm:text-left xs:border-b-1 sm:border-r-2 border-gray-600 relative"
    >
      <div
        class="cursor-pointer xs:mt-2 sm:mt-5"
        on:click={() => (state = 'password')}
        data-automation-id="change-password-nav"
      >
        Change password
      </div>
      <div
        class="cursor-pointer xs:mt-2 sm:mt-5"
        on:click={() => (state = 'x-token')}
        data-automation-id="change-token-nav"
      >
        Change X-Token
      </div>
      <div
        class="cursor-pointer xs:mt-2 sm:mt-5"
        on:click={() => (state = 'deleteUser')}
        data-automation-id="delete-user-nav"
      >
        Delete User
      </div>
      <div
        class="cursor-pointer sm:absolute xs:mt-2 sm:bottom-5 sm:bg-coolGreen-default sm:py-1 sm:px-3 sm:rounded-md sm:text-white"
        on:click={() => (showSettings = false)}
        data-automation-id="close-settings"
      >
        Close
      </div>
    </div>
    <div class="ml-10 mt-5">
      {#if state === 'password'}
        <PasswordChange bind:error bind:errorMessage />
      {:else if state === 'x-token'}
        <XtokenChange bind:error bind:errorMessage />
      {:else if state === 'deleteUser'}
        <DeleteUser bind:error bind:errorMessage />
      {/if}
    </div>
  </div>
</div>

<style>
  #bg {
    position: fixed;
    height: 100%;
    background: rgb(0, 121, 191);
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 4000;
    display: flex;
    flex-direction: column;
    padding-top: 32px;
    justify-content: center;
    align-items: center;
    user-select: none;
    background-color: rgba(0, 121, 191, 0.3);
  }

  #content {
    min-width: 38rem;
    min-height: 20rem;
  }

  .overlay {
    z-index: 4000;
  }
</style>
