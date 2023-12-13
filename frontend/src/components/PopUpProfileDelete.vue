<template>
  <div class="main-container" @click="handlePopupClick">
    <div class="container" @click.stop>
      <span class="close-popup" @click="closePopup">&times;</span>
      <h2>{{ selectedImage.title }}</h2>
      <img :src="selectedImage.url" alt="" class="popup-image">
      <div style="text-align: center;">
        <p style="display: inline-block; margin-right: 15px;">{{ selectedImage.price }}<i class="fa-solid fa-coins"></i></p>
        <p style="display: inline-block;">{{ selectedImage.likes }}❤</p>
        <button @click="DeleteImage">DELETE</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import {createClient} from "@supabase/supabase-js";

const supabaseUrl = 'https://pnrmoqedbmcpxehltqvy.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBucm1vcWVkYm1jcHhlaGx0cXZ5Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcwMDI1NDgxMywiZXhwIjoyMDE1ODMwODEzfQ.VkkazTWbRULNBVgwu56bjdHqSwzUnHriNNOs_6PpqEQ';
const supabase = createClient(supabaseUrl, supabaseKey);
export default {
  name: "PopUp",
  props: {
    selectedImage: Object, // Objeto de imagen seleccionada,
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
    async DeleteImage () {
      const path = '/photos/' + this.selectedImage.title + '/'
      const rutaAssets = 'https://pnrmoqedbmcpxehltqvy.supabase.co/storage/v1/object/public/Assets/'

      axios.delete(path)
        .then((response) => {
          const rutaEnStorage = this.selectedImage.url.replace(rutaAssets, '');
          console.error(rutaEnStorage)
          const { data, error } = supabase
            .storage
            .from('Assets')
            .remove(rutaEnStorage);

          if (error) {
            console.error('Error al eliminar la imagen:', error.message);
            alert(error.message)
            return;
          }
          console.log('Image Deleted successfully', response.data)
        })
        .catch((error) => {
          console.error('Error', error)
        })
      this.$emit('cancel')
      this.closePopup()
    }
  }
}
</script>

<style scoped>

.main-container {
  flex: 2000;
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
  max-width: 700px;
  padding: 10px;
  text-align: center;
  border-radius: 10px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
}

.popup-image {
  max-width: 650px;
  max-height: 580px;
  width: auto;
  height: auto;
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
  color: #333; /* Color de la "X" */
  transition: color 0.3s ease; /* Agrega una transición de color para un efecto más suave */
}

.close-popup:hover {
  color: #ff0000;
}


button {
  margin-top: 10px;
  background-color: #568591;
  color: white;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
  border-radius: 3px;
}

button:hover {
  background-color: #0c5460;
}

</style>
