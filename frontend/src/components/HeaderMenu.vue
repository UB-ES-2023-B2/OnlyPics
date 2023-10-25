<template>
  <div>
    <header>
      <div class="nav-bar">
        <h1><router-link to="/inicio">OnlyPics</router-link></h1>
        <div class="search-bar">
            <div class="search-bar">
              <input type="text" placeholder="Cerca..." class="search-input">
              <button class="search-button">Cerca</button>
            </div>
        </div>
        <a href="#" class="buy-icon">
          <img src="@/assets/icono-carro.png" alt="Carro" @click="descargar" class="buy-button">
        </a>
        <!--<router-link to="/">Log In</router-link>-->
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

export default {
  name: 'HeaderMenu',
  props: {
    title: String
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
  width: 40px;
}

</style>
