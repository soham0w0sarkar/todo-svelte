## TODO with realtime feature

This is a todo app with realtime feature using svelte and a backend server using nodejs and socket.io

## Cloning and running the app

1. Clone the repo

```bash
git clone https://github.com/soham0w0sarkar/todo-svelte.git
```
2. Move into the project directory

```bash
cd todo-svelte
```
3. Install dependencies

```bash
npm install
```
4. Run the app

```bash
npm run dev
```

5. make a `.env` file in root directory, and add following variables:
   
```javascript
VITE_API_PORT=<port_number_of_your_server>
```

## Backend server

clone the backend server from [here](https://github.com/soham0w0sarkar/Todo-app-API.git)

further instructions are given in the repo

## Features

- login, signup and logout
- register company
- add, delete and update todos
- while logined in, you can see the todo you created before logout
- when you click the company button, by entering the companyId you can see the todos of that company in realtime

