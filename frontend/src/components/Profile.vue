<template>
  <div class="profile">
    <!-- Header Menu -->
    <HeaderMenu title="Profile" @filtrar-imagenes="assignSearch" :money="userState.user.available_money" />

    <!-- Profile Container -->
    <div class="profile-container">
      <!-- Profile Pic -->
      <div class="profile-pic">
        <img :src="userState.user.profile_pic || null">
        <i v-if="!userState.user.profile_pic || userState.user.profile_pic=='profile_pic.jpg'" class="fas fa-circle-user fa-10x"></i>
      </div>

      <!-- User Info -->
      <div class="user-info">
        <h1 class="username"> {{ userState.user.username }} </h1>
        <p class="name" v-if=userState.user.name>{{ userState.user.name }} {{userState.user.lastname}}</p>
        <p class="biography" v-if=userState.user.biography>{{ userState.user.biography }}</p>
        <p class="biography" v-else>Biography</p>
      </div>
    </div>
    <div>
      <p class="text-latest"> Latest Pics </p>
    </div>
    <!-- Uploaded Pics Grid -->
    <div class="gallery" v-if="photos">
      <div class="row">
        <div v-for="photo in mostrarImagenesFiltradas()" class="col-md-4" :class="{ 'col-md-6': mostrarImagenesFiltradas().length === 2 }">
          <img class="card-img-top" :src="photo.url" alt="" @click="openPopup(photo)">
          <div class="usuario-info">
            <p>{{ photo.title }}</p>
          </div>
        </div>
      </div>
      <PopUpProfileDelete v-if="selectedImage" :selectedImage="selectedImage" @close="closePopup" />
    </div>
    <footer-view />
  </div>
</template>

<script>
import FooterView from '@/components/FooterView.vue'
import {userState} from '@/userState'
import HeaderMenu from '@/components/HeaderMenu.vue'
import PopUpProfileDelete from "@/components/PopUpProfileDelete.vue";
import axios from 'axios'

export default {
  name: 'Profile',
  components: {HeaderMenu, FooterView, PopUpProfileDelete},
  data () {
    return {
      selectedImage: null,
      userState: userState,
      searchFilter: "",
      photos: []
    }
  },
  methods: {
    toggleScroll() {
      // Obtén el elemento body
      const body = document.body;

      // Verifica si el scroll está habilitado
      if (body.style.overflow === 'hidden') {
        // Si está desactivado, vuelve a habilitarlo
        body.style.overflow = 'auto';
      } else {
        // Si está habilitado, desactívalo
        body.style.overflow = 'hidden';
      }
    },
    openPopup(imagen) {
      // Abrir el popup y establecer la imagen seleccionada
      this.selectedImage = imagen;
      this.toggleScroll()
      window.scrollTo({
        top: 0,
        behavior: "smooth" // Agrega un desplazamiento suave
      });
    },
    closePopup() {
      // Cerrar el popup y restablecer la imagen seleccionada
      this.selectedImage = null;
      this.toggleScroll()
    },
    assignSearch(titleSearch) {
      this.searchFilter = titleSearch
    },
    mostrarImagenesFiltradas() {
      let imagenesMostrar = [...this.photos]

      this.$parent.$on("buscar-imagenes", this.assignSearch);

      console.log(this.searchFilter)
      //Buscador de imagenes
      if (this.searchFilter !== "") {
        imagenesMostrar = imagenesMostrar.filter(photo => photo.title.toLowerCase().includes(this.searchFilter.toLowerCase()));
      }

      return imagenesMostrar
    },
    fetchUserPhotos (username) {
      try {
        const path = '/user/' + username + '/photos'

        axios.get(path)
          .then((response) => {
            // Check if the request was successful
            if (response.status === 200) {
              // Assuming the photos are in response.data.photos, replace this with the actual data structure.
              this.photos = response.data
              console.log(this.photos)

              // Set userState.user.photos with the resolved data
              this.userState.user.photos = this.photos
            } else {
              console.error('Error fetching user photos: Invalid response status')
            }
          })
          .catch((error) => {
            console.error('Error fetching user photos', error)
          })
      } catch (error) {
        console.error('Error in the try-catch block', error)
      }
    }
  },
  created () {
    const username = userState.user.username
    this.fetchUserPhotos(username)
    console.log(userState.user.photos)
  }
}
</script>

<style scoped>
* {
  box-sizing: border-box;
  font-family: 'Arial', sans-serif;
}

.profile-container {
  display: flex;
  align-items: flex-start;
  justify-content: start;
  margin: 20px;
}

.profile-pic {
  margin-top: 10px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
}
.user-info {
  /* Add any desired styles for the user info here */
  margin-left: 20px;
}

.biography {
  /* Add any desired styles for the biography here */
}
.profile-pic img {
  border-radius: 50%;
  width: 200px;
  height: 200px;
  /* Add styles for the profile pic here */
}
.text-latest{
  font-family: 'Courgette', cursive;
  margin-top: 60px;
  font-size: 20px;
  text-align: left;
  margin-left: 30px;
}

.username {
  font-family: 'Courgette', cursive;
  font-size: 27px;
  margin-left: 10px;
  margin-top: 25px;
  font-weight: 650;
  /* Add styles for the username here */
}

.name {
  font-family: 'Courgette', cursive;
  font-size: 18px;
  /* Add styles for the name here */
}

.biography {
  font-family: 'Courgette', cursive;
  margin-top: 20px;
  /* Add styles for the biography here */
}

.pics-grid {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  /* Add styles for the pics grid here */
  font-family: 'Courgette', cursive;
  margin-top: 60px;
  font-size: 20px;
  text-align: right;
  margin-left: 28px;
  margin-right: 30px;
  height: 100%;
}

.gallery {
  display: flex;
  flex-wrap: wrap;
  justify-content: center; /* Centra las imágenes */
  max-width: 1000px; /* Ancho máximo de la galería */
  margin: 0 auto; /* Centra la galería en la página */
}

.photo {
  width: calc(33.33% - 10px); /* 10px is the gap between columns, adjust as needed */
  margin-bottom: 20px; /* Add spacing between rows */
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  object-fit: contain;
  align-self: flex-start;
}

.image-container {
  max-width: 300px;
  background-color: #365b6d;
  text-align: center; /* Center the image within the container */
  padding: 10px 20px; /* Add padding around the image for separation */
  color: #a2c0c0;
}

.card-img-top {
  width: 100%; /* Ajusta la imagen al 100% del contenedor */
  height: 300px;
  object-fit: cover; /* Ajusta la imagen sin deformarla */
}

.card-img-top:hover {
  transform: scale(1.025); /* Ajusta el valor según sea necesario para el aumento de tamaño en el hover */
  background-color: rgba(255, 255, 255, 0.6);
  .usuario-info:hover {
    transform: scale(1.025); /* Ajusta el valor según sea necesario para el aumento de tamaño en el hover */
  }
}

img {
  width: 100%;
  height: auto; /* Maintain aspect ratio */
}

.usuario-info {
  display: flex;
  align-items: center; /* Alinea verticalmente en el centro */
  font-size: 1.5rem;
  margin-bottom: 30px;
  background-color: #0c5460;
  width: 100%;
  justify-content: center;
  color: white;
  border-bottom-left-radius: 4px;
  border-bottom-right-radius: 4px;
}

</style>
