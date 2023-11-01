<template>
  <div>
    <!-- Encabezado -->

    <!-- Botón para ir a la ventana de Inicio -->

    <div class="bloque">
      <div class="user-info-form">
        <br>
        <label for="username">Username:</label>
        <input type="text" id="username" v-model="username">
         <br>

        <label for="nombre">Nombre:</label>
        <input type="text" id="nombre" v-model="nombre">
         <br>

        <label for="apellido">Apellido:</label>
        <input type="text" id="apellido" v-model="apellido">
         <br>

        <label for="email">Email:</label>
        <input type="email" id="email" v-model="email">
         <br>

        <label for="biografia">Biografía:</label>
        <textarea id="biografia" v-model="biografia" rows="5"></textarea>
         <br>

        <label for="fotoPerfil">Foto de Perfil:</label>
        <input type="file" id="fotoPerfil" @change="handleFileUpload">
         <br>

        <button @click="guardarInformacion">Guardar Información</button>
        <button @click="borrarCuenta">Borrar Cuenta</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Settings',
  data () {
    return {
      nombre: '',
      apellido: '',
      biografia: '',
      username: '',
      fechaNacimiento: '',
      perfil: '',
      email: ''
    }
  },
  methods: {
    guardarInformacion () {
      const path = 'http://127.0.0.1:8000/user' // Reemplaza con la URL de tu servidor para actualizar la información
      const usuarioActualizado = {
        email: this.email,
        username: this.username
        // Agrega otros campos que desees actualizar
      }

      axios.put(path, usuarioActualizado) // Puedes usar axios.post si corresponde
        .then((res) => {
          console.log('Información guardada')
          alert('Tu información ha sido actualizada exitosamente.')
          // Realiza cualquier otra acción que desees después de guardar la información, como redirigir o actualizar datos en el componente.
        })
        .catch((error) => {
          console.error('Error al guardar la información', error)
          alert('Se produjo un error al guardar la información.')
        })
    },
    borrarCuenta () {
      const path = 'http://127.0.0.1:8000/user' // Reemplaza con la URL de tu servidor para eliminar cuentas
      const email = this.email // O cualquier otra forma de identificar al usuario

      if (confirm('¿Estás seguro de que deseas eliminar tu cuenta?')) {
        axios.delete(path, { data: { email } })
          .then((res) => {
            console.log('Cuenta eliminada')
            alert('Tu cuenta ha sido eliminada exitosamente.')
            // Realiza cualquier otra acción que desees después de eliminar la cuenta, como redirigir o limpiar datos.
          })
          .catch((error) => {
            console.error('Error al eliminar la cuenta', error)
            alert('Se produjo un error al eliminar la cuenta.')
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
  background-color: rgb(128, 128, 128);
}
</style>
