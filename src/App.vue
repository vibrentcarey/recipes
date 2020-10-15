<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">View Recipes</router-link>|
      <router-link to="/about">Add Recipe</router-link>
    </div>
    <router-view />
  </div>
</template>

<style>
body {
  margin: 0;
  padding: 0;
}

input {
  background-color: #AD9D9D;
  border: none;
  height: 2em;
}
button {
  border: none;
  font-size: x-large;
  margin: 1em;
  padding: .4em;
  background-color: #AD9D9D;
}

button:hover {
  cursor: pointer;
  color:#fccbcb;
  background-color: #838383;

}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  background-color: #ad9d9d;
  height: 100vh;
  margin: 0;
  overflow: scroll;
}

#nav {
  padding: 30px;
  background-color: #838383;
}

#nav a {
  font-weight: bold;
  color: #d9adad;
  font-size: 1.5em;
  margin: 1em;
  text-decoration: none;
}

#nav a.router-link-exact-active {
  color: #fccbcb;
  text-decoration: underline;
}
</style>
