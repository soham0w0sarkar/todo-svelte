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
        let tempTasks = [...$tasks];

        if (tempTasks.length > 0) {
          await Promise.all(
            tempTasks.map(async (task) => {
              const data = await add(task.text);
              task.id = data.id;

              if (task.done) {
                await update(task.id, 'PUT');
              }
            }),
          );
        }
        $tasks = [...new Map([...$tasks, ...tempTasks].map((item) => [item.id, item])).values()];
      }
    } catch (error) {
      console.error(error);
    }
  };
  const add = async (title) => {
    try {
      const res = await fetch('http://localhost:8080/api/v1/task/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title }),
        withCredentials: true,
        credentials: 'include',
      });
      const data = await res.json();

      if (data.success) {
        $tasks = [...$tasks, { id: data.id, text: title, done: false }];
        return data;
      }
      $tasks = [...$tasks, { id: Date.now(), text: title, done: false }];
    } catch (error) {
      console.error(error);
    }
  };

  const update = async (id, method) => {
    try {
      const res = await fetch(`http://localhost:8080/api/v1/task/update/${id}`, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
        credentials: 'include',
      });
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
  <TodoContainer
    on:add={(e) => add(e.detail)}
    on:done={(e) => update(...e.detail)}
    on:delete={(e) => update(...e.detail)}
  />
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
