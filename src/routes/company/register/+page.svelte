<script>
  import { goto } from '$app/navigation';
  //const API_PORT = import.meta.env.VITE_API_PORT;
  import { message, type } from '../../../lib/store.js';

  let name = '';
  let companyId = '';

  const handleClick = async (e) => {
    e.preventDefault();
    e.target.disabled = true;
    e.target.innerHTML = `<Spinner />`;
    if (!name || !companyId) {
      alert('Please fill all the fields');
      return;
    }
    register();
    e.target.disabled = false;
    e.target.innerHTML = `Register`;
  };

  const register = async () => {
    try {
      const res = await fetch(`https://todo-api-9ezo.onrender.com/api/v1/company/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
        credentials: 'include',
        body: JSON.stringify({ name, companyId }),
      });

      const data = await res.json();

      if (data.success) {
        showMessage();
        $message = 'Company registered succesfully';
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
  <title>Company Registration</title>
</svelte:head>

<div class="main">
  <h1>Register Your Company</h1>
  <label>
    <span>Name</span>
    <input type="text" name="Name" placeholder="Name" bind:value={name} />
  </label>
  <label>
    <span>Company-Id</span>
    <input type="text" name="Company-Id" placeholder="Company-Id" bind:value={companyId} />
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
