<template>
  <div>
    <header>
      <div class="nav-bar">
        <h1><router-link to="/inicio">OnlyPics</router-link></h1>
        <div class="search-bar">
            <div class="search-bar">
              <input type="text" placeholder="Cerca..." class="search-input"/>
              <button class="search-button">Cerca</button>
            </div>
        </div>
        <a href="#" class="buy-icon">
          <img src="@/assets/icono-carro.png" alt="Carro" class="buy-button"/>
          <p class="nav-money">{{ money }} €</p>
        </a>
        <!--Container vista penjar foto-->
        <button @click="toggleOverlay()" class="round-button">+</button>
        <PostView v-if="showOverlay" @cancel="toggleOverlay()"/>
        <div class="dropdown">
          <button class="dropbtn">My Account</button>
          <div class="dropdown-content">
            <a href="#">Profile</a>
            <a href="#">Settings</a>
            <a href="/">Log Out</a>
          </div>
        </div>
      </div>
      <div class="select-bar">
        <h2>{{ title }}</h2>
        <nav>
          <router-link to="/inicio">Home</router-link> /
          <router-link to="/account">Search</router-link> /
          <router-link to="/">{{ title }}</router-link>
        </nav>
      </div>
    </header>
  </div>
</template>

<script>
import PostView from '@/components/PostView.vue'
/* eslint-disable */
export default {
  name: 'HeaderMenu',
  props: {
    title: String,
    money: Number
  },
  data () {
    return {
      showOverlay: false
    }
  },
  components: { PostView },
  methods: {
    toggleOverlay () {
      this.showOverlay = !this.showOverlay
    }
  }
}
</script>

<style scoped>
h1 {
  color: white;
}

h2 {
  color: #a2c0c0;
}

.nav-bar {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 50px;
  height: 80px;
}

header {
  background-color: #365b6d;
  padding-top: 20px;
  padding-bottom: 20px;
}

header a{
  text-decoration: none;
  list-style: none;
  color: white;
}

/*SEARCH-BAR*/
.search-bar {
    display: flex;
    background-color: white;
    border-radius: 4px;
    padding: 2px;
}

.search-input {
    flex: 1;
    border: none;
    outline: none;
}

.search-button {
    background-color: #568591;
    color: white;
    border: none;
    border-radius: 4px;
    padding: 5px 10px;
    cursor: pointer;
}

.search-button:hover {
  background-color: #39535b;
}

/*DESPLEGABLE*/
/* Estils per al botó desplegable */
.dropbtn {
  background-color: #568591;
  border-radius: 4px;
  color: white;
  padding: 8px;
  border: none;
  cursor: pointer;
}

/* Estils per al contenidor desplegable */
.dropdown {
  position: relative;
  display: inline-block;
}

/* Estils per a les opcions del desplegable */
.dropdown-content {
  display: none;
  position: absolute;
  background-color: #f9f9f9;
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
  z-index: 1;
  border-radius: 4px;
  margin-top: 1px;
}

.dropdown-content a {
  color: black;
  padding: 12px 16px;
  text-decoration: none;
  display: block;
}

/* Canvia l'aparença de les opcions quan es passa per sobre */
.dropdown-content a:hover {
  background-color: #ddd;
  border-radius: 4px;
}

/* Mostra les opcions quan es fa clic al botó */
.dropdown:hover .dropdown-content {
  display: block;
}

.buy-button {
  width: 30px;
}

/* Botó per pública imatge*/
.round-button {
  display: inline-block;
  background-color: #568591;
  color: white;
  border: none;
  border-radius: 5px;
  width: 40px;
  height: 40px;
  font-size: 24px;
  text-align: center;
  line-height: 40px;
  cursor: pointer;
}

.round-button:hover {
background-color: #0c5460;
}

</style>
