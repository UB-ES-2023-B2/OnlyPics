<template>
  <div>
    <body style="background-color: #EEA3FF;">
      <HeaderMenu title="Random" :money="userState.user.available_money"/>
      <!-- Encabezado -->
      <div class="header">
        <div class="filter-button-container">
          <button v-if="!this.mostrarFiltros" @click="mostrarFiltrosDialog">Filtrar y Ordenar</button>
          <div v-if="this.mostrarFiltros" class="filter-modal">
            <div class="filter-content">
              <!-- Filtrado -->
              <div class="filter-selection">
                <h3>Filtrar por</h3>
                <select v-model="filtrar">
                  <option value="publicas">Públicas</option>
                  <option value="privadas">Privadas</option>
                  <option value="ambas">Ambas</option>
                </select>
              </div>

              <!-- Orden -->
              <div class="filter-section">
                <h3>Ordenar por</h3>
                <select v-model="orden">
                  <option value="popularidad_as">Popularidad ascendente</option>
                  <option value="popularidad_des">Popularidad descendente</option>
                  <option value="precio_as" v-if="filtrar != 'publicas'">Precio ascendente</option>
                  <option value="precio_des" v-if="filtrar != 'publicas'">Precio descendente</option>
                </select>
              </div>
              <div class="button-filtrar">
                <button @click="aplicarFiltros">Cerrar</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Galería de imágenes -->
      <div class="gallery">
        <div class="row">
          <!-- Imágenes aleatorias -->
          <div v-for="imagen in mostrarImagenesFiltradas()" :key="imagen.id" class="col-md-4">
            <div class="card">
              <div class="usuario-info">
                👤 <!-- Este es el emoji de usuario -->
                <span>{{ imagen.user_id }}</span>
              </div>
              <img class="card-img-top" :src="require('@/assets/' + imagen.url)" alt="">
              <div class="card-body">
                <h5 class="card-title">{{ imagen.title }}</h5>
                <p class="card-text">{{ imagen.price }}🪙</p>
                <p class="card-text">{{ imagen.likes}}❤</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </body>
    <footer-view/>
  </div>
</template>

<script>
import HeaderMenu from '@/components/HeaderMenu.vue'
import FooterView from '@/components/FooterView.vue'
import userState from '@/userState'
import axios from 'axios'

export default {
  name: 'PaginaInicio',
  computed: {
    userState () {
      return userState
    }
  },
  components: {FooterView, HeaderMenu},
  data () {
    return {
      mostrarFiltros: false, //Variable para controlar la visibilidad de los filtros
      filtrar: null,
      orden: null,
      photos: []
    }
  },
  methods: {
    mostrarFiltrosDialog(){
      this.mostrarFiltros = true;
    },
    aplicarFiltros(){
      this.mostrarFiltros = false;
    },
    backendPhotos(){
      try{
        const path = '/photos/'

        axios.get(path)
          .then((response) => {
            //Check if the request was successful
            if(response.status === 200){
              //Assuming the photos are in response.data.photos, replace this with the actual data structure
              this.photos = response.data
              console.log(this.photos)
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
    mostrarImagenesFiltradas(){
      let imagenesMostrar = [...this.photos]

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
    }
  },
  created(){
    this.backendPhotos()
    console.log(this.photos)
  }
}
</script>

<style scoped>
/* Estilos CSS */

.button-filtrar{
  margin-top: 20px;
}

.card {
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

.card-img-top {
  width: 100%; /* Ajusta la imagen al 100% del contenedor */
  height: 200px;
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
  background: rgba(255, 255, 255, 0.2);
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
  z-index: 1000;
}

.filter-content {
  background-color: rgba(255, 255, 255, 0.2);
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

</style>
