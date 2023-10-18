<template>
  <div id="app">
    <img src="./assets/logo.png">
    <HeaderMenu/>
    <router-view/>
  </div>
</template>

<script>
import HeaderMenu from '@/components/HeaderMenu.vue'
export default {
  name: 'App',
  components: {HeaderMenu}
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
