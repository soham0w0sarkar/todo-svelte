<script>
  import Head from '../components/head.svelte';
  import TodoContainer from '../components/todoContainer.svelte';

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
      alert(error.message);
    }
  };
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
