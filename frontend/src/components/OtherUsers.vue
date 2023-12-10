<template>
  <div class="back-container">
    <div class="front-container">
      <div class="profile">
        <img :src="user.profile_pic" alt="Imagen de perfil del usuario">
        <div class="profile-user">
          <h3 class="title">@{{ user.username }} - {{ user.name }} {{ user.lastname }}</h3>
          <h5>{{ user.biography }}</h5>
        </div>
      </div>

      <div class="gallery">
          <div class="row">
            <!-- Imágenes aleatorias -->
            <div v-for="imagen in userImages" :key="imagen.id" class="col-md-4" :class="{ 'col-md-6': userImages.length === 2 }">
              <div class="card" @click="openPopup(imagen)">
                <div class="usuario-info">
                  <!-- 👤  Este es el emoji de usuario -->
                  <img :src="getUserPic(user)" alt="Imagen de perfil del usuario">
                  <span class="img-user">{{ imagen.user_id }}</span>
                </div>
                <img class="card-img-top" :src="imagen.url" :alt="imagen.title" @contextmenu.prevent="preventRightClick">
                <div class="card-body">
                  <h4 class="card-title">{{ imagen.title }}</h4>
                  <p class="card-text">{{ imagen.price }}<i class="fa-solid fa-coins"></i></p>
                  <p class="card-text">{{ imagen.likes}}❤</p>
                </div>
              </div>
            </div>
          </div>
          <PopUp v-if="selectedImage" :selectedImage="selectedImage" :userMoney="user.available_money" @close="closePopup"/>
        </div>


    </div>
  </div>
</template>

<script>
import PopUp from "@/components/PopUp.vue";

export default {
  name: 'OtherUsers',
  components: {PopUp},
  props: ['user', 'userImages'],
  data () {
    return {
      selectedImage: null,
    }
  },
  methods: {
    getUserPic(user) {
      const defaultProfileImage = 'https://pnrmoqedbmcpxehltqvy.supabase.co/storage/v1/object/public/ProfileAssets/user_icon_149851.png'
      if (user.profile_pic === null) {
        return defaultProfileImage
      }
      return user.profile_pic
    },
    closePopup() {
      // Cerrar el popup y restablecer la imagen seleccionada
      this.selectedImage = null;
      this.toggleScroll();
    },
    // Mètode per prevenir el clic dret
    preventRightClick(event) {
      event.preventDefault();
    },
    openPopup(imagen) {
      // Abrir el popup y establecer la imagen seleccionada
      this.selectedImage = imagen;
      this.toggleScroll();
      window.scrollTo({
        top: 0,
        behavior: "smooth" // Agrega un desplazamiento suave
      });
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
    }
  }
}
</script>

<style scoped>

.back-container {
  z-index: 101;
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
.front-container {
  display: flex;
  background-color: white;
  max-width: 80%;
  text-align: center;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  justify-content: center;
  flex-direction: column;
}

.profile img {
  width: 70px; /* Ajusta el ancho de la imagen según tus preferencias */
  border-radius: 50%; /* Hace la imagen redonda */
  margin: 10px 15px;
}

.profile{
  display: flex;
  margin: 20px auto;
}

.profile-user {
  display: flex;
  flex-direction: column;
}

</style>
