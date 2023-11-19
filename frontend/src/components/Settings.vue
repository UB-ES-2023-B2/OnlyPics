<template>
  <div>
    <HeaderMenu title="Settings" :money="userState.user.available_money"/>
    <!-- Botón para ir a la ventana de Inicio -->

    <div class="bloque">
      <div class="user-info-form">
        <br><br>
        <label for="username">Username:</label>
        <input type="text" id="username" v-model="username">
         <br><br>

        <label for="password">Password:</label>
        <input type="password" id="password" v-model="password">
        <br><br>

        <label for="name">Name:</label>
        <input type="text" id="name" v-model="name">
         <br><br>

        <label for="lastname">Lastname:</label>
        <input type="text" id="lastname" v-model="lastname">
         <br><br>

        <label for="email">Email:</label>
        <input type="email" id="email" v-model="email">
         <br><br>

        <label for="biography">Biography:</label>
        <textarea id="biography" v-model="biography" rows="5"></textarea>
         <br><br>

        <label for="ProfilePhoto">Profile Photo:</label>
        <label for="ProfilePhoto" class="custom-file-button">Select a File</label>
        <input type="file" id="ProfilePhoto" style="display: none" @change="handleFileUpload">
         <br><br>

        <label for="birthDate">Birth Date:</label>
        <input type="date" id="birthDate" v-model="date_birth">
        <br><br>

        <button @click="saveInformation">Save Information</button>
        <button @click="deleteAccount">Delete Account</button>
        <br><br>
      </div>
    </div>
    <footer-view />
  </div>
</template>

<script>
import axios from 'axios'
import HeaderMenu from '@/components/HeaderMenu.vue'
import FooterView from '@/components/FooterView.vue'
import userState from '@/userState'

export default {
  name: 'Settings',
  components: {HeaderMenu, FooterView},
  computed: {
    userState () {
      return userState
    }
  },
  data () {
    return {
      name: userState.user.name,
      lastname: userState.user.lastname,
      biography: userState.user.biography,
      username: userState.user.username,
      date_birth: userState.user.date_birth,
      profile_pic: userState.user.profile_pic,
      email: userState.user.email,
      password: userState.user.password
    }
  },
  methods: {
    saveInformation () {
      const path = '/userN/' + userState.user.username // Reemplaza con la URL de tu servidor para actualizar la información
      const updateUser = {
        email: this.email,
        username: this.username,
        name: this.name,
        lastname: this.lastname,
        biography: this.biography,
        date_birth: this.date_birth,
        password: this.password,
        profile_pic: this.profile_pic,
        available_money: userState.user.available_money
        // Agrega otros campos que desees actualizar
      }

      axios.put(path, updateUser) // Puedes usar axios.post si corresponde
        .then((res) => {
          console.log('Saved information')
          alert('Your information has been successfully updated.')
          // Realiza cualquier otra acción que desees después de guardar la información, como redirigir o actualizar datos en el componente.
          userState.user = {
            username: res.data.username,
            password: res.data.password,
            available_money: res.data.available_money,
            email: res.data.email,
            lastname: res.data.lastname,
            biography: res.data.biography,
            name: res.data.name,
            date_birth: res.data.date_birth,
            profile_pic: res.data.profile_pic
          }
        })
        .catch((error) => {
          console.error('Error saving information', error)
          alert('An error occurred while saving information.')
        })
    },
    deleteAccount () {
      const path = '/userN/' + userState.user.username // Reemplaza con la URL de tu servidor para eliminar cuentas
      const username = this.username // O cualquier otra forma de identificar al usuario

      if (confirm('¿Are you sure you want to delete your account??')) {
        axios.delete(path, { data: { username } })
          .then((res) => {
            console.log('Deleted account')
            this.$router.push({
              path: '/'
            })
            alert('Your account has been successfully deleted.')
            // Realiza cualquier otra acción que desees después de eliminar la cuenta, como redirigir o limpiar datos.
          })
          .catch((error) => {
            console.error('Error deleting account', error)
            alert('An error occurred while deleting the account.')
          })
      }
    }
  }
}
</script>

<style scoped>
/* Estilos CSS */
.header {
  text-align: center;
  margin-bottom: 20px;
}

.bloque {
  display: flex;
  flex-wrap: wrap;
  justify-content: center; /* Centra las imágenes */
  max-width: 1000px; /* Ancho máximo de la galería */
  margin: 0 auto; /* Centra la galería en la página */
}

header {
  background-color: #365b6d;
  padding-top: 20px;
  padding-bottom: 20px;
}

.custom-file-button {
  cursor: pointer;
  padding: 10px 20px;
  background-color: #007BFF;
  color: #fff;
  border: 1px solid #007BFF;
  border-radius: 5px;
}

.custom-file-button:hover {
  background-color: #0056b3;
}

</style>
