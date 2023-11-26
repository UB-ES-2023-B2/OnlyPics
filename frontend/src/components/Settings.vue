<template>
  <div>
    <HeaderMenu title="Settings" :money="userState.user.available_money"/>
    <div class="bloque">
      <div class="user-info-form">
        <br><br>

        <label for="username">Username:</label>
        <input type="text" id="username" v-model="username" class="styled-input">
        <br><br>

        <label for="password">Password:</label>
        <input type="password" id="password" v-model="password" class="styled-input">
        <br><br>

        <label for="name">Name:</label>
        <input type="text" id="name" v-model="name" class="styled-input">
        <br><br>

        <label for="lastname">Lastname:</label>
        <input type="text" id="lastname" v-model="lastname" class="styled-input">
        <br><br>

        <label for="email">Email:</label>
        <input type="email" id="email" v-model="email" class="styled-input">
        <br><br>

        <label for="biography">Biography:</label>
        <textarea id="biography" v-model="biography" rows="5" class="styled-input"></textarea>
        <br><br>

        <label for="ProfilePhoto">
          <input type="file" ref="fileInput" style="display: none" @change="handleFileSelect" />
          <button @click="openFileSelector">Seleccionar una imagen</button>
          <img :src="selectedImage" v-if="selectedImage" alt="Imagen seleccionada" class="max-width-image" />
        </label>
        <br><br>

        <label for="birthDate">Birth Date:</label>
        <input type="date" id="birthDate" v-model="date_birth" class="styled-input">
        <br><br>

        <button @click="saveInformation" class="styled-button">Save Information</button>
        <button @click="deleteAccount" class="styled-button delete-button">Delete Account</button>
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
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://pnrmoqedbmcpxehltqvy.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBucm1vcWVkYm1jcHhlaGx0cXZ5Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcwMDI1NDgxMywiZXhwIjoyMDE1ODMwODEzfQ.VkkazTWbRULNBVgwu56bjdHqSwzUnHriNNOs_6PpqEQ';
const supabase = createClient(supabaseUrl, supabaseKey);


export default {
  name: 'Settings',
  components: {HeaderMenu, FooterView},
  data () {
    return {
      userState: userState,
      name: userState.user.name,
      lastname: userState.user.lastname,
      biography: userState.user.biography,
      username: userState.user.username,
      date_birth: userState.user.date_birth,
      profile_pic: userState.user.profile_pic,
      email: userState.user.email,
      password: userState.user.password,
      selectedImage: null,
    }
  },
  methods: {
    saveInformation () {
      const path = '/userN/' + userState.user.username // Reemplaza con la URL de tu servidor para actualizar la información
      const formattedDate = this.formatDate(this.date_birth)
      if (this.selectedImage === null){
        this.profile_pic = userState.user.profile_pic
      }else {
        this.profile_pic = this.selectedImage
      }
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
      // Verify all fields before update.
      if (!this.email || !this.username || !this.name || !this.lastname || !this.biography || !this.date_birth || !this.password){
        alert('Complete the form before updating')
        return
      }
      axios.put(path, updateUser) // Puedes usar axios.post si corresponde
        .then((res) => {
          console.log(updateUser)
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
            // Convert date_birth to "aaaa/mm/dd" format
            date_birth: formattedDate,
            profile_pic: res.data.profile_pic
          }
          this.$router.push({
              path: '/profile'
            })
        })
        .catch((error) => {
          console.error('Error saving information', error)
          alert('An error occurred while saving information.')
        })
    },
    formatDate(inputDate) {
      // Convert date to "aaaa/mm/dd" format
      const dateObj = new Date(inputDate)
      const year = dateObj.getFullYear()
      const month = String(dateObj.getMonth() + 1).padStart(2, '0')
      const day = String(dateObj.getDate()).padStart(2, '0')
      return `${year}-${month}-${day}`
    },
    deleteAccount () {
      const path = '/user/' + userState.user.username // Reemplaza con la URL de tu servidor para eliminar cuentas
      const username = this.username // O cualquier otra forma de identificar al usuario

      if (confirm('Are you sure you want to delete your account?')) {
        axios.delete(path, { data: { username } })
          .then((res) => {
            console.log('Deleted account')
            alert('Your account has been successfully deleted.')
            // Realiza cualquier otra acción que desees después de eliminar la cuenta, como redirigir o limpiar datos.
            this.$router.push({
              path: '/'
            })
            window.location.reload()

          })
          .catch((error) => {
            console.error('Error deleting account', error)
            alert('An error occurred while deleting the account.')
          })
      }
    },
    openFileSelector () {
      this.$refs.fileInput.click()
    },
    async handleFileSelect (event) {
      const file = event.target.files[0]
      const rutaEnStorage = file.name
      const rutaAssets = 'https://pnrmoqedbmcpxehltqvy.supabase.co/storage/v1/object/public/ProfileAssets/'

      this.selectedImage = rutaAssets + rutaEnStorage
      console.log('URL de la imagen:', this.selectedImage);

      // Obtener la lista de archivos en el almacenamiento de Supabase
      const { data: fileList, error: fileListError } = await supabase
        .storage
        .from('ProfileAssets')
        .list();

      if (fileListError) {
        console.error('Error al obtener la lista de archivos:', fileListError.message);
        alert(fileListError.message);
        return;
      }

      // Verificar si la imagen ya existe en la lista de archivos
      const existingImage = fileList.find(fileInfo => fileInfo.name === rutaEnStorage);

      if (existingImage) {
        console.log('La imagen ya existe. No es necesario subirla de nuevo.');
        // Puedes realizar acciones adicionales o simplemente salir de la función.
        return;
      }

      // Subir la imagen al almacenamiento de Supabase
      const { data, error } = await supabase
        .storage
        .from('ProfileAssets')
        .upload(rutaEnStorage, file);

      if (error) {
        console.error('Error al subir la imagen:', error.message);
        alert(error.message)
        return;
      }

      console.log('Imagen subida exitosamente:', data.Key);

    }
  }
}
</script>

<style scoped>
.header {
  text-align: center;
  margin-bottom: 20px;
}

.bloque {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  max-width: 1000px;
  margin: 0 auto;
}

.user-info-form {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.styled-input {
  width: 100%;
  padding: 10px;
  margin-bottom: 15px;
  box-sizing: border-box;
}

textarea.styled-input {
  resize: vertical;
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

.styled-button {
  cursor: pointer;
  padding: 10px 20px;
  background-color: #28a745;
  color: #fff;
  border: 1px solid #28a745;
  border-radius: 5px;
}

.delete-button {
  background-color: #dc3545;
  border: 1px solid #dc3545;
}

.max-width-image {
  max-width: 100%;
  max-height: 150px;
  margin-top: 10px;
}
</style>
