<script>
  import MessageCard from '../../components/messageCard.svelte';
  import io from 'socket.io-client';
  import { onMount } from 'svelte';
  import { tasks } from '../../lib/store.js';
  import TodoContainer from '../../components/todoContainer.svelte';
  import { message, type, showMessage ,show} from '../../lib/store.js';

  const API_PORT = import.meta.env.VITE_API_PORT;

  const socket = io(`http://localhost:${API_PORT}`);

  socket.on('connect', () => {
    showMessage();
    $message = 'Connected to server';
    $type = 'message';
  });

  socket.on('connect_error', (error) => {
    showMessage();
    $message = error.message;
    $type = 'error';
  });

  socket.on('tasks', (task) => {
    for (let i = 0; i < task.length; i++) {
      $tasks = [...$tasks, { id: task[i]._id, text: task[i].title, done: task[i].completed }];
    }
  });

  socket.on('newTask', (task) => {
    $tasks = [...$tasks, { id: task._id, text: task.title, done: task.completed }];
    showMessage();
    $message = 'New task created';
    $type = 'message';
  });

  socket.on('updatedTask', (task) => {
    $tasks = $tasks.map((tsk) =>
      tsk.id === task._id ? { id: task._id, text: task.title, done: task.completed } : tsk,
    );
    showMessage();
    $message = 'Updated task';
    $type = 'message';
  });

  socket.on('deletedTask', (task) => {
    $tasks = $tasks.filter((t) => t.id !== task._id);
    showMessage();
    $message = 'Deleted Task';
    $type = 'message';
  });

  socket.on('error', (err) => {
    showMessage();
    $message = err.message;
    $type = 'error';
  });

  const getUser = async () => {
    try {
      const res = await fetch(`http://localhost:${API_PORT}/api/v1/user/me`, {
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
    if (!companyId) {
      showMessage();
      $message = 'You are not an employee!!';
      $type = 'error';
      return;
    }
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
    const user = await getUser();
    await join(user.companyId, user);
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
<MessageCard message={$message} messagetype={$type} show={$show} />

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
