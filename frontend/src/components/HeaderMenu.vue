<template>
  <header>
    <div class="nav-bar">
			<h1 class="title">OnlyPics</h1>
			<div class="search-bar">
				<input type="text" placeholder="Buscar" @input="search" />
			</div>
			<router-link to="/account">MY ACCOUNT</router-link>
    </div>
    <div class="select-bar">
			<h1>{{ title }}</h1>
				<nav>
					<router-link to="/">Home</router-link> /
					<router-link to="/">Search</router-link> /
					<router-link to="/">{{ title }}</router-link>
				</nav>
    </div>
    <hr>
  </header>
</template>

<script>

export default {
  name: "HeaderMenu",
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
  background-color: rgba(39, 66, 66, 0.7);
  border-radius: 4px;
  padding: 5px;
  margin: 0 50px;
	width: 30%;
	justify-content: space-between;
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
