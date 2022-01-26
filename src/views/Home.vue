<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
<!--    <HelloWorld msg="Welcome to Your Vue.js App"/> -->
<hello></hello>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import hello from'../components/hello.vue'
export default {
  name: 'Home',
  components: {
    HelloWorld,
	hello
  }
}
</script>
