<script>
  import { createEventDispatcher } from 'svelte';
  import { onMount } from 'svelte';
  import { tasks } from '../lib/store.js';

  const dispatch = createEventDispatcher();

  let show = false;

  const amIlogined = async () => {
    try {
      const res = await fetch('http://localhost:8080/api/v1/user/amIloggedIn', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
        credentials: 'include',
      });

      const data = await res.json();

      if (data.success) {
        show = true;
      } else {
        show = false;
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  onMount(async () => {
    await amIlogined();
  });

  const handleClickLogout = () => {
    dispatch('logout');
    show = !show;
    $tasks = [];
  };
</script>

<nav class="head">
  <button class={show} on:click={handleClickLogout}>Logout</button>
  <button class={!show}><a href="/login">Login</a></button>
  <button class={!show}><a href="/register">Register</a></button>
</nav>

<style>
  .head {
    display: flex;
    justify-content: flex-end;
    padding: 1rem;
  }
  button {
    width: 10%;
    height: 20%;
    font-size: 1rem;
    font-weight: bold;
    margin-left: 1rem;
    padding: 0.5rem 1rem;
    border: none;
    border-radius: 0.25rem;
    background-color: #ddd;
    cursor: pointer;
  }
  a {
    text-decoration: none;
    color: #000;
  }
  .false {
    display: none;
  }
</style>
