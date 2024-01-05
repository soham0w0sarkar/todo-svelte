<script>
  import Spinner from '../../components/spinner.svelte';
  import { goto } from '$app/navigation';
  import { message, type, showMessage } from '../../lib/store.js';

  //const API_PORT = import.meta.env.VITE_API_PORT;

  let email = '';
  let password = '';

  const handleClick = (e) => {
    e.preventDefault();
    e.target.disabled = true;
    e.target.innerHTML = `<Spinner />`;
    if (!email || !password) {
      alert('Please fill all the fields');
      return;
    }
    login();
    e.target.disabled = false;
    e.target.innerHTML = `Login`;
  };

  const login = async () => {
    try {
      const res = await fetch(`https://todo-api-9ezo.onrender.com/api/v1/user/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
        credentials: 'include',
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (data.success) {
        showMessage();
        $message = 'Loggined succesfully';
        $type = 'message';
        goto('/');
      } else {
        alert(data.message);
        return;
      }
    } catch (error) {
      showMessage();
      $message = error.message;
      $type = 'error';
    }
  };
</script>

<svelte:head>
  <title>Login</title>
</svelte:head>

<div class="main">
  <h1>Login</h1>
  <label>
    <span>Email</span>
    <input type="email" name="email" placeholder="Email" bind:value={email} />
  </label>
  <label>
    <span>Password</span>
    <input type="password" name="password" placeholder="Password" bind:value={password} />
  </label>
  <button on:click={handleClick}> Login </button>
</div>

<style>
  .main {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: white;
    width: 100vw;
    height: 100vh;
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
