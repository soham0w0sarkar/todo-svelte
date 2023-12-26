<script>
  import TodoCard from './todoCard.svelte';
  import { onMount } from 'svelte';
  import { tasks } from '../lib/store.js';

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

  const handleAdd = async (event) => {
    const task = prompt('Enter a new task');
    await add(task);
    $tasks = [...$tasks, { id: $tasks.length + 1, text: task, done: false }];
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
      }
    } catch (error) {
      console.error(error);
      return;
    }
  };

  const handleSelectAll = (event) => {
    $tasks = $tasks.map((task) => ({ ...task, done: !task.done }));

    (async () => {
      for (let i = 0; i < tasks.length; i++) {
        await update(tasks[i].id, 'PUT');
      }
    })();
  };

  const handleDone = async (event) => {
    $tasks = $tasks.map((task) =>
      task.id === event.detail ? { ...task, done: !task.done } : task,
    );
    tasks.sort((a, b) => a.done - b.done);
    await update(event.detail, 'PUT');
  };

  const handleDelete = async (event) => {
    $tasks = $tasks.filter((task) => task.id !== event.detail);
    await update(event.detail, 'DELETE');
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

      const data = await res.json();
    } catch (error) {
      console.error(error);
    }
  };

  onMount(async () => {
    await handleIfLogin();
  });
</script>

<div class="todo-container">
  <div class="todo-head">
    <h3>Todo</h3>
    <button class="add" on:click={handleAdd}>+</button>
    <button class="select-all" on:click={handleSelectAll}>*</button>
  </div>
  <div class="todo-body">
    {#each $tasks as task}
      <TodoCard
        id={task.id}
        task={task.text}
        done={task.done}
        on:done={handleDone}
        on:delete={handleDelete}
      />
    {/each}
  </div>
</div>

<style>
  .todo-container {
    margin: 0;
    padding: 0;
    height: 70%;
    width: 30%;
  }
  .todo-head {
    width: 100%;
    height: 10%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 3rem;
    color: white;
    border: none;
    border-bottom: 5px solid rgb(80, 78, 78);
    border-radius: 0.25rem;
  }
  button {
    width: 10%;
    height: 30%;
    background-color: inherit;
    border: none;
    font-size: 3rem;
    color: white;
    display: flex;
    align-items: center;
    cursor: pointer;
  }
  .add {
    margin-left: auto;
  }
  .todo-body {
    width: 100%;
    height: 90%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    gap: 10px;
    color: white;
    border: none;
    transition: all 2s ease-in-out;
    border-radius: 0.25rem;
  }
</style>
