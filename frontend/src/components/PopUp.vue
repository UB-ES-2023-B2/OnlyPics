<template>
  <div class="main-container" @click="handlePopupClick">
    <div class="container" @click.stop>
      <span class="close-popup" @click="closePopup">&times;</span>
      <h2>{{ selectedImage.title }}</h2>
      <img :src="selectedImage.url" :alt="selectedImage.title" class="popup-image" @contextmenu.prevent="preventRightClick">
      <div style="text-align: center;">
        <p style="display: inline-block; margin-right: 15px;">{{ selectedImage.price }}<i class="fa-solid fa-coins"></i></p>
        <p style="display: inline-block;">{{ selectedImage.likes }}❤</p>
      </div>
      <button v-if="userMoney >= selectedImage.price" @click="descargarArchivo" class="download-button">Download Image</button>
    </div>
  </div>
</template>

<script>
import {userState, setUserState} from '@/userState'
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://pnrmoqedbmcpxehltqvy.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBucm1vcWVkYm1jcHhlaGx0cXZ5Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcwMDI1NDgxMywiZXhwIjoyMDE1ODMwODEzfQ.VkkazTWbRULNBVgwu56bjdHqSwzUnHriNNOs_6PpqEQ';
const supabase = createClient(supabaseUrl, supabaseKey);
export default {
  name: "PopUp",
  data () {
    return {
      userId: userState.user.username,
      available_money: userState.user.available_money
    }
  },
  props: {
    selectedImage: Object, // Objeto de imagen seleccionada,
    userMoney: Number
  },
  methods: {
    handlePopupClick(event) {
      // Comprobar si el clic ocurrió dentro del contenedor
      if (!event.target.closest('.container')) {
        // Si el clic fue fuera del contenedor, cerrar el popup
        this.closePopup();
      }
    },
    closePopup() {
      // Método para cerrar el popup
      this.$emit('close');
    },
    async descargarArchivo() {
      // URL de la imagen
      const urlImagen = this.selectedImage.url;

      // Realiza una solicitud para obtener el contenido de la imagen
      const respuesta = await fetch(urlImagen);
      const contenidoImagen = await respuesta.blob();

      // Crea un objeto Blob con el contenido de la imagen y un tipo MIME
      const blob = new Blob([contenidoImagen], {type: 'image/jpeg'}); // Ajusta el tipo MIME según el formato de la imagen

      // Crea una URL del blob
      const urlBlob = window.URL.createObjectURL(blob);

      // Extraer la parte de la URL que necesitas
      const shortUrlImagen = this.extraerParteDeURL(this.selectedImage.url);

      // Crea un enlace invisible y haz clic en él para iniciar la descarga
      const enlaceDescarga = document.createElement('a');
      enlaceDescarga.href = urlBlob;
      enlaceDescarga.download = shortUrlImagen;
      enlaceDescarga.style.display = 'none';

      // Agrega el enlace al DOM y haz clic en él
      document.body.appendChild(enlaceDescarga);
      enlaceDescarga.click();

      // Elimina el enlace del DOM después de la descarga
      document.body.removeChild(enlaceDescarga);

      // Libera los recursos del blob y la URL
      window.URL.revokeObjectURL(urlBlob);

      this.available_money = this.available_money - this.selectedImage.price
      this.fetchUpdatedMoney(this.available_money)
      this.closePopup()
    },
    extraerParteDeURL(urlCompleta) {
      // Encuentra la última aparición de "/" en la URL
      const ultimaBarra = urlCompleta.lastIndexOf('/');

      // Extrae la parte de la URL que necesitas
      const parteNecesaria = urlCompleta.substring(ultimaBarra + 1);

      return parteNecesaria;
    },
    fetchUpdatedMoney(available_money){
      const parameters = {
        available_money: available_money
      };
      supabase
        .from('users')
        .update(parameters)
        .eq('username', this.userId)
        .then((response) => {
          console.log('Money updated successfully', response.data);})
        .catch((error) => {
          console.error('Error updating money:', error);
        });
      userState.user.available_money = available_money;
      setUserState(userState);
    },
    // Mètode per prevenir el clic dret
    preventRightClick(event) {
      event.preventDefault();
    }
  }
}
</script>

<style scoped>

.main-container {
  z-index: 4;
  flex: 1;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(255, 255, 255, 0.8);
}
.container {
  background-color: white;
  width: 80%;
  max-width: 600px;
  padding: 10px;
  text-align: center;
  border-radius: 10px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
}

.popup-image {
  max-width: 100%;
  max-height: 500px;
  margin: 10px 0;
}

p {
  font-size: 25px;
}

.close-popup {
  /* Estilos del botón de cerrar el popup */
  cursor: pointer;
  position: absolute;
  top: 15px; /* Ajusta la posición desde la parte superior */
  right: 20px; /* Ajusta la posición desde la derecha */
  font-size: 35px; /* Ajusta el tamaño de la "X" */
  color: #37545d; /* Color de la "X" */
  transition: color 0.3s ease; /* Agrega una transición de color para un efecto más suave */
}

.close-popup:hover {
  color: #174048;
}

.container button {
  /* Estilos del botón para descargar la imagen */
  margin: 5px 0; /* Espaciado superior para separar el botón del contenido anterior */
  padding: 10px;
  background-color: #568591;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
.container button:hover {
    background-color: #0c5460;
}

</style>
