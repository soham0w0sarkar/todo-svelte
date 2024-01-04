<script>
  import { afterUpdate } from 'svelte';
  import { fly } from 'svelte/transition';

  export let message;
  export let messagetype;
  export let show = false;
</script>

{#if show}
  <div class="message" transition:fly={{ y: 100 }}>
    <h1 style="color:{messagetype == 'error' ? 'red' : 'green'}">{message}</h1>
  </div>
{/if}

<style>
  .message {
    position: fixed;
    bottom: 1%;
    left: 50%;
    transform: translate(-50%, 0);
    width: fit-content;
    padding: 0px 20px 0px 20px;
    height: 8vh;
    background-color: inherit;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 0.8rem;
    border-radius: 10px;
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.5);
  }
</style>
