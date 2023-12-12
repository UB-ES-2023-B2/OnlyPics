<template>
  <div class="back-container" @click="handlePopupClick">
    <div class="front-container" @click.stop>
      <span class="close-popup" @click="handleX">&times;</span>
      <div class="profile-container">
        <img :src="profileImg(user)" alt="Imagen de perfil del usuario" class="profile-pic">
        <div class="profile-details">
          <h3 class="title">@{{ user.username }}</h3>
          <p class="full-name-other-profile">{{ user.name }} {{ user.lastname }}</p>
          <p class="biography">{{ user.biography }}</p>
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
      this.selectedImage = null;
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
    },
    handleX (){
      this.closePopup();
      this.clearSearch();
    },
    handlePopupClick(event) {
      // Comprobar si el clic ocurrió dentro del contenedor
      if (!event.target.closest('.front-container')) {
        // Si el clic fue fuera del contenedor, cerrar el popup
        this.closePopup();
        this.clearSearch();
      }
    },
    searchImages() {
      this.$emit("filtrar-imagenes", this.titleSearch);
      this.$emit("close-container");
    },
    clearSearch() {
      this.titleSearch = "";
      this.searchImages()
    },
    profileImg (user) {
      if(user.profile_pic === null) {
        return 'https://pnrmoqedbmcpxehltqvy.supabase.co/storage/v1/object/public/ProfileAssets/user_icon_149851.png'
      }
      return user.profile_pic
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
  min-width: 1000px;
  text-align: center;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  justify-content: center;
  flex-direction: column;
}

.profile-container p {
  margin: 0;
}

.profile-container {
  display: flex;
  align-items: center;
  background-color: rgb(52 58 64 / 10%);
  border-radius: 5px;
  border: 1px #ccc solid;
  margin: 10px auto 30px;
}

.profile-pic {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  margin: auto 30px;
}

.profile-details {
  display: flex;
  flex-direction: column;
  align-items: center; /* Alinea verticalmente dentro del .profile-details */
  margin: 25px 15px;
}

.title {
  font-size: 1.8em;
  margin-bottom: 5px;
}

.full-name-other-profile {
  font-weight: bold;
  padding-bottom: 5px;
}

.biography {
  color: #555;
}

.close-popup {
  font-size: 1.3em;
  cursor: pointer;
}
</style>
