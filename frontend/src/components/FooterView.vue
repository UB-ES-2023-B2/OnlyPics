<template>
  <footer class="footer">
    <div class="footer-content">
      <div class="footer-section">
        <h2>Navigation</h2>
        <ul>
          <li><router-link to="/inicio">Home  <i class="fas fa-house" style="margin-left: 7px"></i></router-link></li>
          <li><router-link to="/profile">Account <i class="fas fa-circle-user" style="margin-left: 7px"></i></router-link></li>
        </ul>
      </div>
      <div class="footer-section">
        <h2>Contact</h2>
        <p>Barcelona, Spain<i class="fa-solid fa-location-dot" style="margin-left: 10px"></i></p>
        <p style="margin-left: 30px">{{userState.user.email}} <i class="fa-solid fa-envelope" style="margin-left: 7px"></i></p>
      </div>
    </div>
  </footer>
</template>

<script>
import userState from '@/userState'

export default {
  name: 'FooterView',
  computed: {
    userState () {
      return userState
    }
  }
}
</script>

<style scoped>
footer {
  background-color: #2c3e50;
  color: #fff;
  padding: 20px 0;
}

.footer-content {
  display: flex;
  justify-content: space-between;
  max-width: 1200px;
  margin: 0 auto;
  height: 120px;
  align-items: center;
  font-family: 'Courgette', cursive;
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

.footer {
  position: fixed;
  bottom: 0;
  width: 100%;
  background-color: #2c3e50;
  color: #fff;
  padding: 20px 0;
  font-family: 'Courgette', cursive;
  z-index: 9999;
}
</style>
