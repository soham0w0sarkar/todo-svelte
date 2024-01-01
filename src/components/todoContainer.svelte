<script>
  import TodoCard from './todoCard.svelte';
  import { tasks } from '../lib/store.js';
  import { createEventDispatcher } from 'svelte';

  const dispatch = createEventDispatcher();

  const handleAdd = async (event) => {
    const task = prompt('Enter a new task');
    dispatch('add', task);
  };

  const handleSelectAll = (event) => {
    $tasks = $tasks.map((task) => ({ ...task, done: !task.done }));

    (async () => {
      for (let i = 0; i < tasks.length; i++) {
        dispatch('done', [tasks[i].id, 'PUT']);
      }
    })();
  };

  const handleDone = async (event) => {
    $tasks = $tasks.map((task) =>
      task.id === event.detail ? { ...task, done: !task.done } : task,
    );
    $tasks.sort((a, b) => a.done - b.done);
    dispatch('done', [event.detail, 'PUT']);
  };

  const handleDelete = async (event) => {
    $tasks = $tasks.filter((task) => task.id !== event.detail);
    dispatch('delete', [event.detail, 'DELETE']);
  };
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
