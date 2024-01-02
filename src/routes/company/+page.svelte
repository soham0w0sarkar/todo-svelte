<script>
  import io from 'socket.io-client';
  import { onMount, onDestroy } from 'svelte';
  import { tasks } from '../../lib/store.js';
  import TodoContainer from '../../components/todoContainer.svelte';

  const socket = io('http://localhost:8080');

  socket.on('connect', () => {
    console.log('Connected to the socket server');
  });

  socket.on('connect_error', (error) => {
    console.error('Error connecting to the socket server:', error);
  });

  socket.on('tasks', (task) => {
    for (let i = 0; i < task.length; i++) {
      $tasks = [...$tasks, { id: task[i]._id, text: task[i].title, done: task[i].completed }];
    }
  });

  socket.on('newTask', (task) => {
    $tasks = [...$tasks, { id: task._id, text: task.title, done: task.completed }];
  });

  socket.on('updatedTask', (task) => {
    $tasks = $tasks.map((tsk) =>
      tsk.id === task._id ? { id: task._id, text: task.title, done: task.completed } : tsk,
    );
    console.log($tasks);
  });

  socket.on('deletedTask', (task) => {
    $tasks = $tasks.filter((t) => t.id !== task._id);
  });

  socket.on('error', (err) => {
    console.error(err);
  });

  const disconnectHandler = () => socket.disconnect();

  const getUser = async () => {
    try {
      const res = await fetch('http://localhost:8080/api/v1/user/me', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
        credentials: 'include',
      });
      const data = await res.json();
      return data.user;
    } catch (error) {
      console.error(error.message);
    }
  };

  const join = async (companyId, user) => {
    socket.emit('join', companyId, user);
  };

  const add = (task) => {
    socket.emit('createTask', task);
  };

  const update = (task, method) => {
    if (method === 'PUT') {
      socket.emit('updateTask', task);
    } else {
      socket.emit('deleteTask', task);
    }
  };

  onMount(async () => {
    const companyId = prompt('Enter your company id');
    const user = await getUser();
    await join(companyId, user);
    window.addEventListener('beforeunload', disconnectHandler);
  });

  onDestroy(() => {
    window.removeEventListener('beforeunload', disconnectHandler);
  });
</script>

<svelte:head>
  <title>Todo</title>
</svelte:head>

<div class="todo">
  <TodoContainer
    on:add={(e) => add(e.detail)}
    on:done={(e) => update(...e.detail)}
    on:delete={(e) => update(...e.detail)}
  />
</div>

<style>
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
