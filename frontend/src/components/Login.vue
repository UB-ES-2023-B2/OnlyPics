<template>
  <div class="container">
    <div class="left-container">
      <h1 class="text-white">OnlyPics</h1>
    </div>
    <div class="right-container">
      <div class="col-md-6">
        <div class="signin-form" v-if="view">
          <h2>Create new Account</h2>
          <p class="text-center">
            Already Registered? <a href="#" @click="toggleView">Log In</a>
          </p>
          <div class="form-group">
            <label for="username">Username</label>
            <input type="text" id="username" v-model="addUserForm.username" class="form-control smaller-input"
                   placeholder="Username" required>
          </div>
          <div class="form-group">
            <label for="password">Password</label>
            <input type="password" id="password" v-model="addUserForm.password" class="form-control smaller-input"
                   placeholder="Password" required>
          </div>
          <div class="form-group">
            <label for="email">Email</label>
            <input type="email" id="email" v-model="email" class="form-control smaller-input" placeholder="Email" required>
          </div>
          <button @click="createUser" class="btn btn-primary">SIGN UP</button>
        </div>
        <div class="signin-form" v-else>
          <h2>Log In</h2>
          <p class="text-center">
            New? <a href="#" @click="toggleView">Sign In</a>
          </p>
          <div class="form-group">
            <label for="email">Email</label>
            <input type="email" id="email" v-model="email" class="form-control smaller-input" placeholder="Email" required>
          </div>
          <div class="form-group">
            <label for="password">Password</label>
            <input type="password" id="password" v-model="addUserForm.password" class="form-control smaller-input"
                   placeholder="Password" required>
          </div>
          <button @click="checkLogin" class="btn btn-primary">LOG IN</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import axios from 'axios'

export default {
  name: 'LogIn',
  data () {
    return {
      logged: false,
      email: null,
      password: null,
      username: null,
      token: null,
      is_admin: null,
      creatingAccount: false,
      money_available: null,
      addUserForm: {
        password: null,
        username: null,
        email: null
      },
      view: true
    }
  },
  methods: {
    initCreateForm () {
      this.creatingAccount = true
      this.addUserForm.username = null
      this.addUserForm.password = null
      this.addUserForm.email = null
    },
    checkLogin () {
      const path = 'http://127.0.0.1:8000/userN/' + this.addUserForm.email
      axios.get(path)
        .then((res) => {
          this.logged = true
          console.log(path)
          this.money_available = res.data.money_available
          this.$router.push({
            path: '/',
            query: {money_available: this.money_available}
          })
          alert('Login done')
        })
        .catch((error) => {
          console.error(error)
          alert('Email or Password incorrect')
        })
    },
    goToMatches () {
      this.$router.push({path: '/'})
      window.location.reload()
    },
    createUser () {
      const path = 'http://127.0.0.1:8000/user'
      const parameters = {
        username: this.addUserForm.username,
        password: this.addUserForm.password,
        email: this.addUserForm.email,
        available_money: 0

      }
      axios.post(path, parameters)
        .then((res) => {
          console.log('Account created')
          alert('Account created successfully')
          this.$router.push({path: '/'})
          window.location.reload()
        })
        .catch((error) => {
          console.log('Se ha producido un error')
          console.log(error)
          alert('Error creating the account')
        })
    },
    toggleView () {
      // Cambia la vista entre inicio de sesión y registro
      this.view = !this.view
    }
  }

}
</script>

<style scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  flex-wrap: wrap;
  margin: 0;
  padding: 0;
}

.left-container {
  flex: 1;
  background-color: #404040;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  min-width: 50%;
  margin: 0;
  padding: 0;
}

.signin-form {
  max-width: 300px;
  margin: 20px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.form-group {
  margin-bottom: 20px;
}

.btn-primary {
  margin-top: 20px;
}

.smaller-input {
  width: 100%;
  max-width: 250px;
  margin: 0 auto;
}

body {
  zoom: 150%;
}

.right-container {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}
</style>
