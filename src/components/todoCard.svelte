<script>
  import { createEventDispatcher } from 'svelte';
  export let task;
  export let id;
  export let done = true;
  export let completedBy = "";
  export let createdBy = "";

  const dispatch = createEventDispatcher();

  function handleDone() {
    dispatch('done', id);
  }

  function handleDelete() {
    dispatch('delete', id);
  }
</script>

<div
  class="todo-card"
  style="text-decoration: {done ? 'line-through' : 'none'}; border-left: {done
    ? '4px solid green'
    : '4px solid red'}"
>
  {task}
  <span style="color:{done ? 'green' : 'red'}"> {done ? `Completed by ${completedBy}` : `Created by ${createdBy}`}</span>
  <div class="buttons"><button class="done-button" on:click={handleDone}></button>
    <button class="trash-button" on:click={handleDelete}></button></div>
</div>

<style>
  .todo-card {
    width: 90%;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0.5rem 1rem;
    margin-top: 10px;
    font-size: 1.5rem;
    color: white;
    border: none;
    border-radius: 5px;
    box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.5);
  }
  .todo-card:hover {
    box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.8);
  }
  span {
    font-size: 1rem;
  }
  .buttons {
    display: flex;
    align-items: center;
  }
  .done-button,
  .trash-button {
    width: 30px;
    height: 30px;
    border: none;
    color: white;
    font-weight: bold;
    transform: rotate(45deg);
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    background-color: inherit;
  }
  .done-button {
    border: 1px solid green;
  }
  .trash-button {
    border: 1px solid red;
    margin-left: 5px;
  }
</style>
