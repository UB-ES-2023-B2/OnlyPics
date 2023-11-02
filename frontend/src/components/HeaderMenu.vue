<template>
  <div>
    <header>
      <div class="nav-bar">
        <h1><router-link to="/inicio">OnlyPics</router-link></h1>
        <div class="search-bar">
            <div class="search-bar">
              <input type="text" placeholder="Search..." class="search-input">
              <button class="search-button">Search</button>
            </div>
        </div>
         <div class="shopping-cart" style="margin-top: 10px">
          <a href="#"><i class="fa-sharp fas fa-cart-shopping fa-xl" style="margin-left: 10px"></i></a>
         </div>
          <p class="nav-money">{{ money }}<i class="fa-solid fa-sack-dollar fa-bounce" style="margin-left: 7px"></i></p>
        <!--<router-link to="/">Log In</router-link>-->
        <div class="dropdown">
          <button class="dropbtn">{{ userState.user.username }} <i class="fas fa-user" style="margin-left: 7px"></i></button>
          <div class="dropdown-content">
            <a href="#">Profile <i class="fas fa-circle-user" style="margin-left: 20px"></i></a>
            <a href="#">Settings <i class="fas fa-cog" style="margin-left: 10px"></i></a>
            <a href="/">Log Out <i class="fas fa-sign-out-alt" style="margin-left: 13px"></i></a>
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
import userState from '@/userState'

export default {
  name: 'HeaderMenu',
  props: {
    title: String,
    money: Number
  },
  computed: {
    userState () {
      return userState
    }
  }
}
</script>

<style scoped>
h1 {
  color: white;
  font-family: 'Courgette', cursive;
}

h2 {
  color: #a2c0c0;
  font-family: 'Courgette', cursive;
}

.nav-bar {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 50px;
  height: 80px;
  font-family: 'Courgette', cursive;
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
  font-family: 'Courgette', cursive;
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
  padding: 10px;
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
.nav-money {
  color: white; /* Set the text color to white */
  margin-top: 30px;
  margin-left: -15px;
  font-size: 17px;
  font-family: 'Courgette', cursive;
}
</style>
