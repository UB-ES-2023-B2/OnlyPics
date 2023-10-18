<template>
  <div id="app">
    <HeaderMenu title="Flowers"/>
    <router-view/>
    <Footer/>
  </div>
</template>

<script>
import HeaderMenu from '@/components/HeaderMenu.vue'
import Footer from '@/components/Footer.vue'

export default {
  name: 'App',
  components: {Footer, HeaderMenu}
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
