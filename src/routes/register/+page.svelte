<script>
  import MessageCard from '../../components/messageCard.svelte';
  import Spinner from '../../components/spinner.svelte';
  import { message, type, show, showMessage } from '../../lib/store.js';
  import { goto } from '$app/navigation';
  //const API_PORT = import.meta.env.VITE_API_PORT;

  let name = '';
  let email = '';
  let password = '';
  let companyId = '';

  const handleClick = (e) => {
    e.preventDefault();
    e.target.disabled = true;
    e.target.innerHTML = `<Spinner />`;
    if (!name || !email || !password) {
      showMessage();
      $message = 'Fill all the required data';
      $type = 'error';
      e.target.disabled = false;
      e.target.innerHTML = `Register`;
      return;
    }
    register();
    e.target.disabled = false;
    e.target.innerHTML = `Register`;
  };

  const register = async () => {
    try {
      const res = await fetch(`https://todo-api-9ezo.onrender.com/api/v1/user/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
        credentials: 'include',
        body: JSON.stringify({ name, email, password, companyId }),
      });

      const data = await res.json();

      if (data.success) {
        showMessage();
        $message = 'Registered succesfully';
        $type = 'message';
        goto('/');
      }
    } catch (error) {
      showMessage();
      $message = error.message;
      $type = 'error';
    }
  };
</script>

<svelte:head>
  <title>Register</title>
</svelte:head>

<div class="main">
  <h1>Register</h1>
  <label>
    <span>Name</span>
    <input type="text" name="Name" placeholder="Name" bind:value={name} required />
  </label>
  <label>
    <span>Email</span>
    <input type="email" name="email" placeholder="Email" bind:value={email} required />
  </label>
  <label>
    <span>Company Id</span>
    <input
      type="text"
      name="companyId"
      placeholder="Company Id (if you have)"
      bind:value={companyId}
    />
  </label>
  <label>
    <span>Password</span>
    <input type="password" name="password" placeholder="Password" bind:value={password} required />
  </label>
  <button on:click={handleClick}> Register </button>
</div>
<MessageCard message={$message} messagetype={$type} show={$show} />

<style>
  .main {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: white;
    height: 100vh;
    width: 100vw;
  }
  h1 {
    font-size: 2rem;
    margin-bottom: 1rem;
  }

  label {
    display: flex;
    flex-direction: column;
    margin-bottom: 1rem;
  }

  span {
    font-size: 1.5rem;
    margin-bottom: 0.5rem;
  }

  input {
    outline: none;
    border: none;
    width: 20rem;
    height: 2rem;
    font-size: 1.5rem;
    padding: 0.5rem;
    border: 1px solid #ddd;
    border-radius: 0.25rem;
  }

  button {
    width: 20rem;
    height: 3rem;
    font-size: 1.5rem;
    font-weight: bold;
    margin-top: 1rem;
    padding: 0.5rem 1rem;
    border: none;
    border-radius: 0.25rem;
    background-color: #ddd;
    cursor: pointer;
  }
</style>
