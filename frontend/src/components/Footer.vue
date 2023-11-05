<template>
  <footer>
    <div class="footer-content">
      <div class="footer-section">
        <h2>Links</h2>
        <ul>
          <li><router-link to="/">Home</router-link></li>
          <li><router-link to="/account">Account</router-link></li>
        </ul>
      </div>

      <div class="footer-section">
        <h2>Contact</h2>
        <p>Adress: ***</p>
        <p>E-mail: ***</p>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'Footer'
}
</script>

<style scoped>
footer {
  background-color: #2c3e50;
  color: #fff;
  padding: 20px 0;
  margin-top: 40px;
}

.footer-content {
  display: flex;
  justify-content: space-between;
  max-width: 1200px;
  margin: 0 auto;
}

.footer-section {
  flex: 1;
}

ul {
  list-style: none;
  padding: 0;
}

ul li {
  margin-bottom: 10px;
}

a {
  text-decoration: none;
  color: #fff;
}

</style>
