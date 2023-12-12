<template xmlns="http://www.w3.org/1999/html">
  <div class="main-container" @click="handlePopupClick">
    <div class="container" @click.stop>
      <span class="close-popup" @click="closePopup">&times;</span>
      <h2>{{ selectedImage.title }}</h2>
      <img :src="selectedImage.url" :alt="this.selectedImage.title" class="popup-image" @contextmenu.prevent="preventRightClick">
      <div style="text-align: center;">
        <p style="display: inline-block; margin-right: 15px;">{{ selectedImage.price }}<i class="fa-solid fa-coins"></i></p>
        <p style="display: inline-block;">
          {{ selectedImage.likes }}
          <span @click="toggleLike(response_like)">
            <span v-if="response_like === false">🖤</span>
            <span v-else>❤</span>
        </span></p>
      </div>
      <button v-if="userMoney >= selectedImage.price" @click="downloadImage" class="download-button">Download Image</button>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import {createClient} from "@supabase/supabase-js";
import userState from "@/userState";

const supabaseUrl = 'https://pnrmoqedbmcpxehltqvy.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBucm1vcWVkYm1jcHhlaGx0cXZ5Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcwMDI1NDgxMywiZXhwIjoyMDE1ODMwODEzfQ.VkkazTWbRULNBVgwu56bjdHqSwzUnHriNNOs_6PpqEQ';
const supabase = createClient(supabaseUrl, supabaseKey);

export default {
  name: "PopUp",
  props: {
    selectedImage: Object, // Objeto de imagen seleccionada,
    userMoney: Number,
    user: Object
  },
    data() {
    return {
      response_like: null,
      like: null
    }
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
    downloadImage() {
      // Crea un element <a> amb l'atribut de descàrrega
      const link = document.createElement('a');
      link.href = this.selectedImage.url;
      link.download = 'nom_de_la_imatge.jpg';
      link.target = '_blank';

      // Simula un clic al botó per iniciar la descàrrega
      document.body.appendChild(link);
      link.click();

      // Elimina l'element <a> després de la descàrrega
      document.body.removeChild(link);
    },
    // Mètode per prevenir el clic dret
    preventRightClick(event) {
      event.preventDefault();
    },
    toggleLike(response_like){
      console.log("ResponseLike recibido en toggle like: "+response_like)
      if(response_like !== null){
        if(response_like !== false){
          this.eliminarLike(this.user.username, this.selectedImage.title);
        }else{
          this.sumarLike(this.user.username, this.selectedImage.title);
        }
      }else{
        console.error("response_like es null: " + response_like);
      }
      this.$emit('likes-updated', response_like);
      this.fetchUpdatedLikes();
    },
    likedImageFrontend(username, title){
      console.log("He entrado en el método likedImageFrontend");
      return new Promise((resolve, reject) => {
        const path = '/like/' + username + '/' + title;
        axios.get(path)
          .then((response) => {
            console.log("Response del método like popup: " + response.data);
            if (response.status === 200) {
              this.response_like = response.data;
              console.log("Response likedImage PopUp: " + this.response_like);
              resolve(this.response_like);
            } else {
              console.error('Error getting the liked photos: Invalid response status');
              reject('Error getting the liked photos: Invalid response status');
            }
          })
          .catch((error) => {
            console.error('Error getting the liked photos', error);
            reject('Error getting the liked photos');
          });
      });
    },
    fetchUpdatedLikes(likes){
      const parameters = {
        likes: likes
      };

      supabase
        .from('photos')
        .update(parameters)
        .eq('id', this.selectedImage.id)
        .then((response) => {
          console.log('Image updated successfully', response.data);
        })
        .catch((error) => {
          console.error('Error updating image:', error);
        });
    },
    sumarLike(username, title){
      console.log("He entrado en el método sumarLike")
      console.log("Usuario: "+username)
      console.log("Foto: "+title)
      try{
        const path = '/like/'+username+'/'+title
        console.log("Path: "+path)
        axios.post(path)
          .then((response) => {
            //Check if the request was successful
            if(response.status === 200){
              //Assuming the photos are in response.data.photos, replace this with the actual data structure
              this.response_like = true
              this.selectedImage.likes = this.selectedImage.likes + 1
              this.fetchUpdatedLikes(this.selectedImage.likes)
              console.log("Nuevo valor de response_like:", this.response_like);
              this.selectedImage.isLiked = this.response_like
              this.$emit('likes-updated',this.selectedImage.isLiked,this.selectedImage)
            } else{
              console.error('Error creating the liked photos: Invalid response status')
            }
          })
          .catch((error) => {
            console.error('Error creating the liked photos', error)
          })
      } catch (error) {
        console.error('Error in the try-catch block', error)
      }
    },
    eliminarLike(username, title){
      console.log("He entrado en el método eliminarLike")
      console.log("Usuario: "+username)
      console.log("Foto: "+title)
      try{
        const path = '/like/'+username+'/'+title
        console.log("Path: "+path)
        axios.delete(path)
          .then((response) => {
            //Check if the request was successful
            if(response.status === 200){
              //Assuming the photos are in response.data.photos, replace this with the actual data structure
              this.response_like = false
              this.selectedImage.likes = this.selectedImage.likes - 1
              this.fetchUpdatedLikes(this.selectedImage.likes)
              console.log("Nuevo valor de response_like:", this.response_like);
              this.selectedImage.isLiked = this.response_like
              this.$emit('likes-updated',this.selectedImage.isLiked, this.selectedImage)
            } else{
              console.error('Error deleting the liked photos: Invalid response status')
            }
          })
          .catch((error) => {
            console.error('Error deleting the liked photos', error)
          })
      } catch (error) {
        console.error('Error in the try-catch block', error)
      }
    }
  },
  created() {
    this.likedImageFrontend(this.user.username, this.selectedImage.title)
      .then((response_like) => {
        console.log("Initial response_like value:", response_like);
        this.selectedImage.isLiked = response_like;
      })
      .catch((error) => {
        console.error(error);
      });
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
  max-height: 700px;
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
