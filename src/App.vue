<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
 
  text-align: center;
  color: #2c3e50;
  
}
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
.w-e-panel-tab-content .eleImg {
    width: 40px;
}
/* .w-e-text>* {
  box-sizing: border-box;
} */
.w-e-panel-tab-content {
  user-select: none !important;
}
.w-e-text>*>*{
  /* background: red;
  border: 20px solid olive; */
  max-width: 90% !important;
  box-sizing: border-box;
  margin: 1rem 1rem 2rem !important;
  /* margin: 1rem 3rem 1rem 3rem; */
}
.w-e-text>*:last-child {
  margin-bottom: 10vh;
}
</style>
