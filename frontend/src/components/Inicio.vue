<template>
  <body style="background-color: #EEA3FF;">
      <HeaderMenu title="Random" money="0.0"/>
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
              <span>Usuario</span>
              </div>
              <img class="card-img-top" :src="imagen.url" alt="">
              <div class="card-body">
                <h5 class="card-title">{{ imagen.titulo }}</h5>
                <p class="card-text">{{ imagen.precio }}🪙</p>
                <p class="card-text">{{ imagen.likes }}❤</p>
              </div>
            </div>
          </div>
        </div>
      </div>
  </body>
  </div>
    <footer-view/>
  </div>
</template>


<script>
import HeaderMenu from '@/components/HeaderMenu.vue'
import FooterView from '@/components/FooterView.vue'
export default {
  name: 'PaginaInicio',
  components: {FooterView, HeaderMenu},
  data () {
    return {
      mostrarFiltros: false, //Variable para controlar la visibilidad de los filtros
      filtrar: null,
      orden: null,
      imagenesAleatorias: [
        // Aquí deberías tener una lista de objetos con información de tus imágenes
        {id: 1, url: require('../assets/alley-8289479_1280.png'), titulo: 'Aslley', precio: 50, likes: 50},
        {id: 2, url: require('../assets/barbary-macaque-8142917_1280.png'), titulo: 'Barbary macaque', precio: 0, likes: 30},
        {id: 3, url: require('../assets/bear-8275920_640.png'), titulo: 'Bear', precio: 0, likes: 25},
        {id: 4, url: require('../assets/dragon-fly-8229773_640.png'), titulo: 'Dragon fly', precio: 15, likes: 30},
        {id: 5, url: require('../assets/flowers-7954719_1280.png'), titulo: 'Flowers', precio: 0, likes: 100},
        {id: 6, url: require('../assets/free-photo-of-corazon-firmar-pared-forma.png'), titulo: 'Frase', precio: 96, likes: 150},
        {id: 7, url: require('../assets/free-photo-of-mar-ciudad-barco-italia.png'), titulo: 'Italia', precio: 0, likes: 0},
        {id: 8, url: require('../assets/free-photo-of-silueta-modelo-en-pie-esfera.png'), titulo: 'Esfera', precio: 18, likes: 46},
        {id: 9, url: require('../assets/mantis-8194123_1280.png'), titulo: 'Mantis', precio: 0, likes: 22},
        {id: 10, url: require('../assets/pexels-photo-5185446.png'), titulo: 'Patos', precio: 25, likes: 15},
        {id: 11, url: require('../assets/pexels-photo-10322825.png'), titulo: 'Cúpula', precio: 0, likes: 36},
        {id: 12, url: require('../assets/pexels-photo-10376281.png'), titulo: 'Flores', precio: 0,likes: 150},
        {id: 13, url: require('../assets/pexels-photo-10870571.png'), titulo: 'Casa en la nieve', precio: 12, likes: 3000},
        {id: 14, url: require('../assets/pexels-photo-12562449.png'), titulo: 'Mar', precio: 56, likes: 200},
        {id: 15, url: require('../assets/pexels-photo-12809204.png'), titulo: 'Wind surf', precio: 44, likes: 5},
        {id: 16, url: require('../assets/pexels-photo-14653888.png'), titulo: 'Flores', precio: 88, likes: 1},
        {id: 17, url: require('../assets/pexels-photo-18602619.png'), titulo: 'Bizcocho', precio: 0, likes: 22},
        {id: 18, url: require('../assets/residential-8278516_1280.png'), titulo: 'Montaña', precio: 0, likes: 43},
        {id: 19, url: require('../assets/torii-8254663_1280.png'), titulo: 'Oriental', precio: 12, likes: 189},
        {id: 20, url: require('../assets/train-8302635_640.png'), titulo: 'Train', precio: 22, likes: 202}
      ]
    }
  },
  methods: {
    mostrarFiltrosDialog(){
      this.mostrarFiltros = true;
    },
    aplicarFiltros(){
      this.mostrarFiltros = false;
    },
    mostrarImagenesFiltradas(){
      let imagenesMostrar = [...this.imagenesAleatorias]

      if (this.filtrar === 'publicas') {
        imagenesMostrar = imagenesMostrar.filter(imagen => imagen.precio === 0);
      } else if (this.filtrar === 'privadas') {
        imagenesMostrar = imagenesMostrar.filter(imagen => imagen.precio > 0);
      }

      // Ordenar por popularidad o coste
      if (this.orden === 'popularidad_as') {
        imagenesMostrar.sort((a, b) => a.likes - b.likes);
      } else if (this.orden === 'popularidad_des') {
        imagenesMostrar.sort((a, b) => b.likes - a.likes);
      } else if (this.orden === 'precio_as') {
        imagenesMostrar.sort((a, b) => a.precio - b.precio);
      } else if (this.orden === 'precio_des') {
        imagenesMostrar.sort((a, b) => b.precio - a.precio);
      }
      return imagenesMostrar;
    }
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
