<template>
  <div>
    <header>
      <div class="nav-bar">
        <h1>OnlyPics</h1>
        <div class="search-bar">
          <input type="text" placeholder="Buscar" @input="search" />
          <font-awesome-icon icon="fa-solid fa-magnifying-glass"  @click="search" />
        </div>
        <font-awesome-icon icon="fas fa-shopping-cart" />
        <font-awesome-icon icon="fa-solid fa-magnifying-glass"  @click="search" />
        <router-link to="/login">Log In</router-link>
      </div>

      <div class="select-bar">
        <h1>{{ title }}</h1>
        <nav>
          <router-link to="/">Home</router-link> /
          <router-link to="/account">Search</router-link> /
          <router-link to="/">{{ title }}</router-link>
        </nav>
      </div>
    </header>
    <hr>
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
.nav-bar {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 50px;
}

.nav-bar a{
  text-decoration: none;
}

.search-bar {
  display: flex;
  align-items: center;
  background-color: rgba(0, 139, 139, 0.7);
  border-radius: 5px;
  padding: 5px;
  margin: 0 10px;width: 30%;justify-content: space-between;
}

input {
  border: none;
  background: none;
  outline: none;
  color: #fff;
}

input::placeholder {
  color: white;
}

font-awesome-icon {
  cursor: pointer;
  margin: 0 10px;
}

</style>
