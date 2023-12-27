<script>
  import Spinner from '../../components/spinner.svelte';
  import { goto } from '$app/navigation';

  let name = '';
  let email = '';
  let password = '';

  const handleClick = (e) => {
    e.preventDefault();
    e.target.disabled = true;
    e.target.innerHTML = `<Spinner />`;
    if (!name || !email || !password) {
      alert('Please fill all the fields');
      return;
    }
    register();
    e.target.disabled = false;
    e.target.innerHTML = `Register`;
  };

  const register = async () => {
    try {
      const res = await fetch('http://localhost:8080/api/v1/user/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
        credentials: 'include',
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();

      if (data.success) {
        goto('/');
      } else {
        alert(data.message);
        return;
      }
    } catch (error) {
      console.log(error.message);
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
    <input type="text" name="Name" placeholder="Name" bind:value={name} />
  </label>
  <label>
    <span>Email</span>
    <input type="email" name="email" placeholder="Email" bind:value={email} />
  </label>
  <label>
    <span>Password</span>
    <input type="password" name="password" placeholder="Password" bind:value={password} />
  </label>
  <button on:click={handleClick}> Register </button>
</div>

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
