<script lang="ts">
  import { deleteUser } from '../endpointApi';
  import { isSuccessResponse } from '../types/guards';

  export let error: boolean;
  export let errorMessage: string;

  const handleDeleteUser = async () => {
    const response = await deleteUser();
    if (!isSuccessResponse(response)) {
      error = true;
      errorMessage = 'Failed to delete user';
    } else {
      location.reload();
    }
  };
</script>

<div class="flex flex-row mt-2 items-center">
  <div>Delete user?</div>
  <button
    class="ml-5 rounded-md py-1 px-3 box-content bg-red-600 text-white mr-5"
    data-automation-id="delete-user"
    on:click={handleDeleteUser}>Delete</button
  >
</div>
