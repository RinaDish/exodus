<script lang="ts">
  import { signUp } from '../endpointApi';
  import LoginForm from '../components/LoginForm.svelte';
  import { createEventDispatcher } from 'svelte';
  import PasswordInput from '../components/PasswordInput.svelte';
  import PhoneNumberInput from '../components/PhoneNumberInput.svelte';
  import MonoLogo from '../components/MonoLogo.svelte';
  import ErrorMessage from '../components/ErrorMessage.svelte';
  import { isSuccessResponse } from '../types/guards';

  export let error: boolean = false;

  let phoneNumber: string;
  let pwd: string;
  let token: string;
  let confirmPwd: string;
  let pwdCheck: boolean;
  let errorMessage: string;
  let countryCode: string = '380';

  const dispatch = createEventDispatcher();

  const checkPwd = (pwd, confirmPwd) => {
    return pwd === confirmPwd;
  };

  const singUpButton = {
    dataAut: 'signup-button',
    label: 'Sign Up',
    onclick: async () => {
      pwdCheck = checkPwd(pwd, confirmPwd);
      if (pwdCheck) {
        const resp = await signUp(countryCode + phoneNumber, pwd, token);
        if (!isSuccessResponse(resp)) {
          errorMessage = resp.message;
          error = true;
        }
        return dispatch('signUp', resp);
      } else {
        error = true;
        errorMessage = 'Passwords do not match';
      }
    },
  };

  const signInButton = {
    dataAut: 'link-signin-button',
    prefix: 'Have an account?',
    label: 'Sign In',
    onclick: () => dispatch('openSignIn', {}),
  };
</script>

{#if error}
  <ErrorMessage bind:visible={error} bind:errorMessage />
{/if}

<LoginForm
  title="Sign Up"
  actionButton={singUpButton}
  linkButton={signInButton}
>
  <div class="flex justify-center flex-col">
    <div class="phone flex items-center justify-center w-3/4 self-center">
      <PhoneNumberInput {countryCode} bind:value={phoneNumber} />
    </div>

    <div class="flex items-center justify-center w-full relative">
      <PasswordInput placeholder="Password" bind:value={pwd} />
    </div>
    <div class="flex items-center justify-center w-full relative">
      <PasswordInput
        placeholder="Confirm Password"
        bind:value={confirmPwd}
        dataAut="confirm-pwd-input"
      />
    </div>

    <div class="flex items-center w-full justify-center">
      <div class="w-3/4 flex mt-5 h-10">
        <input
          class="text-lg w-full text-gray-700 placeholder-gray-500 border-gray-200 rounded-lg border-2 px-2"
          type="text"
          placeholder="Monobank token"
          required
          data-automation-id="xtoken-input"
          bind:value={token}
        />
        <div class="items-center w-1/6"><MonoLogo /></div>
      </div>
    </div>
  </div>
</LoginForm>
