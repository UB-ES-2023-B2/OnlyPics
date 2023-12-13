Inicio.vue

<template>
  <div class="inicio">
    <HeaderMenu title="Home" @filtrar-imagenes="assignSearch" :money="userState.user.available_money"/>
    <body>
        <div class="dropdown_users" :class="{ 'none': this.searchUser.length === 0 }">
          <div v-for="user in mostrarUsuariosFiltrados().slice(0, 5)" :key="user.username">
            <div class="info_user" @click="openOtherUsers(user)">
              <img :src="getUserPic(user.username)" alt="Imagen de perfil del usuario">
              <span>{{ user.username }}</span>
            </div>
          </div>
        </div>
        <OtherUsers v-if="showOtherUsers" :user="localUser" :userImages="userImages" @close-container="closeContainer" @filtrar-imagenes="assignSearch"/>
        <div class="filter-container">
          <div class="dropdown" v-if="!mostrarFiltros">
            <button class="btn btn-secondary dropdown-toggle custom-button" type="button" @click="mostrarFiltrosDialog">
              Filter and Sort
            </button>
          </div>
          <div class="filter-modal" :class="{ 'show-filters': mostrarFiltros }">
            <div class="filter-content">
              <!-- Contenido del filtro -->
              <h3>Filter by</h3>
              <select v-model="filtrar">
                <option value="publicas">Public</option>
                <option value="privadas">Private</option>
                <option value="ambas">Both</option>
              </select>
              <h3>Sort by</h3>
              <select v-model="orden">
                <option value="popularidad_as">Rising popularity</option>
                <option value="popularidad_des">Declining popularity</option>
                <option value="precio_as" v-if="filtrar !== 'publicas'">Ascending price</option>
                <option value="precio_des" v-if="filtrar !== 'publicas'">Declining price</option>
              </select>
              <button class="close-button" @click="mostrarFiltros = false">×</button>
            </div>
          </div>
        </div>

        <!-- Galería de imágenes -->
        <div class="gallery">
          <div class="row">
            <!-- Imágenes aleatorias -->
            <div v-for="imagen in mostrarImagenesFiltradas()" :key="imagen.id" class="col-md-4" :class="{ 'col-md-6': mostrarImagenesFiltradas().length === 2 }">
              <div class="card" @click="openPopup(imagen)">
                <div class="usuario-info">
                  <!-- 👤  Este es el emoji de usuario -->
                  <img :src="getUserPic(imagen.user_id)" alt="Imagen de perfil del usuario">
                  <span class="img-user">{{ imagen.user_id }}</span>
                </div>
                <img class="card-img-top" :src="imagen.url" :alt="imagen.title" @contextmenu.prevent="preventRightClick">
                <div class="card-body">
                  <h4 class="card-title">{{ imagen.title }}</h4>
                  <p class="card-text">{{ imagen.price }}<i class="fa-solid fa-coins"></i></p>
                  <p style="display: inline-block;">{{ imagen.likes }}
                    <i v-if="imagen.isLiked" class="fa-solid fa-heart" style="color: #ff0000;"></i>
                    <i v-else class="fa-solid fa-heart" style="color: #000000;"></i>

                  </p>
                </div>
              </div>
            </div>
          </div>
          <PopUp v-if="selectedImage"
                 :selectedImage="selectedImage"
                 :userMoney="userState.user.available_money"
                 :user="userState.user"
                 @likes-updated="updateLikesStatus"
                 @close="closePopup"/>

        </div>
    </body>
    <footer-view/>
  </div>
</template>

<script>
import HeaderMenu from '@/components/HeaderMenu.vue'
import FooterView from '@/components/FooterView.vue'
import PopUp from "@/components/PopUp.vue";
import OtherUsers from "@/components/OtherUsers.vue";
import { userState } from "@/userState"
import axios from 'axios'

export default {
  name: 'PaginaInicio',
  computed: {
    userState () {
      return userState
    }
  },
  components: {FooterView, HeaderMenu, PopUp, OtherUsers},
  data () {
    return {
      mostrarFiltros: false, //Variable para controlar la visibilidad de los filtros
      selectedImage: null,
      filtrar: null,
      orden: null,
      photos: [],
      like: null,
      users: [],
      searchFilter: "",
      searchUser: "",
      showOtherUsers: false,
      userImages: [],
      localUser: []
    }
  },
  methods: {
    mostrarFiltrosDialog(){
      this.mostrarFiltros = true;
      console.log('mostrarFiltros:', this.mostrarFiltros);
    },
    aplicarFiltros(){
      this.mostrarFiltros = false;
      console.log('mostrarFiltros:', this.mostrarFiltros);
    },
    backendPhotos(){
      try{
        const path = '/photos/'

        axios.get(path)
          .then((response) => {
            //Check if the request was successful
            if(response.status === 200){
              //Assuming the photos are in response.data.photos
              this.photos = response.data
              console.log(this.photos)
              this.photos.forEach(imagen => {
                this.likedImage(userState.user.username, imagen.title, imagen);
              });
            } else{
              console.error('Error getting the backend photos: Invalid response status')
            }
          })
          .catch((error) => {
            console.error('Error getting the backend photos', error)
          })
      } catch (error) {
        console.error('Error in the try-catch block', error)
      }
    },
    backendUsers() {
      try{
        const path = '/users/?skip=0&limit=1000'

        axios.get(path)
          .then((response) => {
            //Check if the request was successful
            console.log('response', response)
            if(response.status === 200){
              //Assuming the photos are in response.data.users
              this.users = response.data
              console.log(this.users)
            } else{
              console.error('Error getting the backend users: Invalid response status')
            }
          })
          .catch((error) => {
            console.error('Error getting the backend photos', error)
          })
      } catch (error) {
        console.error('Error in the try-catch block', error)
      }
    },
    mostrarImagenesFiltradas(){
      let imagenesMostrar = [...this.photos]

      this.$parent.$on("buscar-imagenes", this.assignSearch);

      //Buscador de imagenes
      if (this.searchFilter !== "") {
        imagenesMostrar = imagenesMostrar.filter(imagen => imagen.title.toLowerCase().includes(this.searchFilter.toLowerCase()));
      }

      if (this.filtrar === 'publicas') {
        imagenesMostrar = imagenesMostrar.filter(imagen => imagen.price === 0);
      } else if (this.filtrar === 'privadas') {
        imagenesMostrar = imagenesMostrar.filter(imagen => imagen.price > 0);
      }

      // Ordenar por popularidad o coste
      if (this.orden === 'popularidad_as') {
        imagenesMostrar.sort((a, b) => a.likes - b.likes);
      } else if (this.orden === 'popularidad_des') {
        imagenesMostrar.sort((a, b) => b.likes - a.likes);
      } else if (this.orden === 'precio_as') {
        imagenesMostrar.sort((a, b) => a.price - b.price);
      } else if (this.orden === 'precio_des') {
        imagenesMostrar.sort((a, b) => b.price - a.price);
      }
      return imagenesMostrar;
    },
    mostrarUsuariosFiltrados() {
      let usuariosMostrar = [...this.users]

      this.$parent.$on("buscar-imagenes", this.assignSearch);

      //Buscador de usuarios
      if (this.searchUser !== "") {
        usuariosMostrar = usuariosMostrar.filter(user => user.username.toLowerCase().includes(this.searchFilter.toLowerCase()));
      }
      return usuariosMostrar
    },
    assignSearch(titleSearch) {
      this.searchFilter = titleSearch
      this.searchUser = titleSearch
    },
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
      window.scrollTo({
        top: 0,
        behavior: "smooth" // Agrega un desplazamiento suave
      });
      this.toggleScroll();
    },
    closePopup() {
      // Cerrar el popup y restablecer la imagen seleccionada
      this.selectedImage = null;
      this.toggleScroll();
    },
    closeContainer () {
      this.showOtherUsers= false;
      this.toggleScroll();
    },
    // Mètode per prevenir el clic dret
    preventRightClick(event) {
      event.preventDefault();
    },
    likedImage(username, title, imagen){
       try{
        const path = '/like/'+username+'/'+title

        axios.get(path)
          .then((response) => {
            //Check if the request was successful
            if(response.status === 200){
              //Assuming the photos are in response.data.photos, replace this with the actual data structure
              imagen.isLiked = response.data !== false;
              console.log("imagen.isLiked: "+imagen.isLiked)
              this.updateLikesStatus(imagen.isLiked,imagen)
            } else{
              console.error('Error getting the liked photos: Invalid response status')
            }
          })
          .catch((error) => {
            console.error('Error getting the liked photos', error)
          })
      } catch (error) {
        console.error('Error in the try-catch block', error)
      }
    },
    updateLikesStatus(newLiked, image){
      this.$set(image,image.isLiked, newLiked)
    },
    getUserPic(userId) {
      const defaultProfileImage = 'https://pnrmoqedbmcpxehltqvy.supabase.co/storage/v1/object/public/ProfileAssets/user_icon_149851.png'
      const userToFind = this.users.find(u => u.username === userId)
      if (userToFind.profile_pic === null) {
        return defaultProfileImage
      }
      return userToFind.profile_pic
    },
    openOtherUsers (user) {
      this.userImages = []
      this.localUser = []
      this.userImages = this.photos.filter(img => img.user_id === user.username);
      this.localUser = user
      console.log(this.userImages)
      console.log(this.localUser)
      this.showOtherUsers = true;
    }
  },
  created(){
    this.backendPhotos()
    this.backendUsers()
  }
}
</script>

<style>

* {
    font-family: 'Arial', sans-serif;
}

body {
  background-color: #FFFFFF;
  margin-bottom: 30px;
}

.card {
  z-index: 1;
  flex: 1;
  width: 300px;
  height: 400px;
  margin: 10px;
  display: inline-block;
  vertical-align: top;
  border: 1px solid #ccc;
  box-sizing: border-box; /* Asegura que el borde se incluya en el ancho total */
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
  overflow: hidden;
  background-color: rgba(255, 255, 255, 0.2);
}

.card:hover {
  transform: scale(1.025); /* Ajusta el valor según sea necesario para el aumento de tamaño en el hover */
}

.card-img-top {
  width: 100%; /* Ajusta la imagen al 100% del contenedor */
  height: 190px;
  object-fit: cover; /* Ajusta la imagen sin deformarla */
}

.card-body {
  text-align: left;
}

.header {
  text-align: center;
}

.filter-button-container {
  display: flex;
  justify-content: flex-end;
  flex: 1; /* Hace que este contenedor ocupe el espacio disponible */
}

.filter-modal {
  position: relative;
  top: 0;
  right: 20px;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
  z-index: 1000;
}

.filter-content {
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.filter-section{
  margin-right: 20px;
}

.filter-section h3 {
  margin-bottom: 5px;
}

.filter-section ul {
  list-style: none;
  padding: 0;
}

.filter-section ul li {
  margin-bottom: 5px;
}

.filter label,
.orden label{
  margin-right: 4px;
  font-size: 16px;
}

select{
  border: none;
  background: none;
  front-size: 16px;
}

.gallery {
  display: flex;
  flex-wrap: wrap;
  justify-content: center; /* Centra las imágenes */
  max-width: 1000px; /* Ancho máximo de la galería */
  margin: 0 auto; /* Centra la galería en la página */
}

.imagen img {
  max-width: 100%;
  height: auto;
  width: 100%; /* Asegura que la imagen ocupe el 100% del contenedor */
  height: 150px; /* Establece una altura específica */
}

.filter-container {
  position: relative;
  z-index: 2; /* Asegura que el filtro se superponga al contenido */
}

.dropdown {
  margin-left: 20px; /* Espaciado entre el borde izquierdo y el botón de filtro */
}

.filter-modal {
  position: absolute;
  top: 0;
  right: 100%; /* Cambio a la derecha del elemento padre */
  width: calc(100% - 20px);
  max-width: 300px;
  background-color: #365b6d; /* Cambio de color del filtro */
  color: white;
  padding: 20px;
  transition: left 0.3s ease; /* Cambio en la animación de transición */
  z-index: 3;
  box-sizing: border-box;
  margin-top: 10px; /* Margen superior */
  margin-left: 10px; /* Margen izquierdo */
}

.filter-content {
  display: flex;
  flex-direction: column;
}

.close-button,
.apply-button {
  border: none;
  background-color: transparent;
  color: white;
  font-size: 16px;
  cursor: pointer;
  margin-top: 10px;
}

.close-button {
  position: absolute;
  top: 4px;
  right: 10px;
  border: none;
  background-color: #365b6d; /* Cambio de color del botón */
  color: white;
  font-size: 28px;
  cursor: pointer;
}

.apply-button {
  align-self: flex-start;
}

.show-filters {
  left: 0;
}

.custom-button {
  background-color: #365b6d; /* Cambio de color del botón "Filtrar y Ordenar" */
  border-color: #365b6d; /* Cambio de color del borde del botón */
  margin-top: 10px; /* Margen superior */
  margin-left: 10px; /* Margen izquierdo */
}

.custom-button:hover {
  background-color: #4e7490; /* Cambio de color al pasar el cursor por encima del botón */
  border-color: #4e7490; /* Cambio de color del borde al pasar el cursor por encima del botón */
}

.img-user{
  font-size: 20px;
}

.usuario-info {
  display: flex;
  align-items: center; /* Alinea verticalmente en el centro */
}

.usuario-info img {
  width: 40px; /* Ajusta el ancho de la imagen según tus preferencias */
  height: 40px; /* Ajusta la altura de la imagen según tus preferencias */
  border-radius: 50%; /* Hace la imagen redonda */
  margin: 10px 15px;
}

.dropdown_users {
  position: absolute;
  left: 620px;
  top: 90px;
  z-index: 5;
}

.info_user {
  display: flex;
  align-items: center;
  border: 1px grey solid;
  border-radius: 4px;
  margin: 1px 0;
  width: 250px;
  height: 50px;
  background-color: white;
}

.info_user:hover {
  background-color: #dcdcdc;
  cursor: pointer;

}

.info_user img {
  width: 40px; /* Ajusta el ancho de la imagen según tus preferencias */
  height: 40px; /* Ajusta la altura de la imagen según tus preferencias */
  border-radius: 50%; /* Hace la imagen redonda */
  margin: 10px 15px;
}

.none {
  display: none;
}

</style>
