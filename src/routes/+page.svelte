<script>
  import Head from '../components/head.svelte';
  import TodoContainer from '../components/todoContainer.svelte';
  import { tasks } from '../lib/store.js';
  import { onMount } from 'svelte';

  const handleLogout = async () => {
    try {
      const res = await fetch('http://localhost:8080/api/v1/user/logout', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
        credentials: 'include',
      });
      const data = await res.json();
    } catch (error) {
      console.log(error.message);
    }
  };
  const handleIfLogin = async () => {
    try {
      const res = await fetch('http://localhost:8080/api/v1/task/myTask', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
        credentials: 'include',
      });

      const data = await res.json();

      if (data.success) {
        for (let i = 0; i < data.tasks.length; i++) {
          $tasks = [
            ...$tasks,
            { id: data.tasks[i]._id, text: data.tasks[i].title, done: data.tasks[i].completed },
          ];
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  onMount(async () => {
    await handleIfLogin();
  });
</script>

<svelte:head>
  <title>Todo</title>
</svelte:head>

<div class="head"><Head on:logout={handleLogout} /></div>
<div class="todo">
  <TodoContainer />
</div>

<style>
  .head {
    margin: 0;
    padding: 0;
    height: 20%;
    width: 100%;
  }
  .todo {
    margin: 0;
    padding: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    height: 100%;
    width: 100%;
  }
</style>
