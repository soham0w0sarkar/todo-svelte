<script>
  import { UserOutline } from 'flowbite-svelte-icons';
  import { onMount } from 'svelte';
  let show = false;

  const me = async () => {
    try {
      const res = await fetch('http://localhost:8080/api/v1/user/amIloggedIn', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });
      const data = await res.json();

      if (data.success) {
        show = true;
      } else {
        show = false;
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  onMount(async () => {
    await me();
  });
</script>

<nav>
  <button class={show}><UserOutline /></button>
  <button class={show}>Logout</button>
  <button class={!show}><a href="/login">Login</a></button>
  <button class={!show}><a href="/register">Register</a></button>
</nav>

<style>
  nav {
    display: flex;
    justify-content: flex-end;
    padding: 1rem;
  }
  button {
    width: 10%;
    height: 20%;
    font-size: 1rem;
    font-weight: bold;
    margin-left: 1rem;
    padding: 0.5rem 1rem;
    border: none;
    border-radius: 0.25rem;
    background-color: #ddd;
    cursor: pointer;
  }
  a {
    text-decoration: none;
    color: #000;
  }
  .false {
    display: none;
  }
</style>
