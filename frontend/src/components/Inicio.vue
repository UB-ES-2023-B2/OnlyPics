<template>
  <div>
    <HeaderMenu title="Random"/>
    <!-- Encabezado -->
    <div class="header">
      <div class="filters">
        <!-- Filtrado -->
        <div class="filter">
          <label>Filtrar por:</label>
          <select v-model="filtro">
            <option value="publicas">Públicas</option>
            <option value="privadas">Privadas</option>
            <option value="ambas">Ambas</option>
          </select>
        </div>

        <!-- Orden -->
        <div class="orden">
          <label>Ordenar por:</label>
          <select v-model="orden">
            <option value="popularidad">Popularidad</option>
            <option value="coste">Coste</option>
          </select>
        </div>
      </div>
    </div>

    <!-- Galería de imágenes -->
    <div class="gallery">
      <!-- Imágenes aleatorias -->
      <div v-for="(imagen) in imagenesAleatorias" :key="imagen.id" class="imagen">
        <img class="card-img-top" :src="imagen.url" alt="">
        <div class="caption">
          <p>{{ imagen.titulo }}</p>
          <p>{{ imagen.precio }}€</p>
        </div>
      </div>
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
      filtro: 'ambas', // Valor por defecto del filtro
      orden: 'popularidad', // Valor por defecto del orden
      imagenesAleatorias: [
        // Aquí deberías tener una lista de objetos con información de tus imágenes
        {id: 1, url: require('../assets/alley-8289479_1280.png'), titulo: 'Aslley', precio: 50},
        {id: 2, url: require('../assets/barbary-macaque-8142917_1280.png'), titulo: 'Barbary macaque', precio: 0},
        {id: 3, url: require('../assets/bear-8275920_640.png'), titulo: 'Bear', precio: 0},
        {id: 4, url: require('../assets/dragon-fly-8229773_640.png'), titulo: 'Dragon fly', precio: 15},
        {id: 5, url: require('../assets/flowers-7954719_1280.png'), titulo: 'Flowers', precio: 0},
        {id: 6, url: require('../assets/free-photo-of-corazon-firmar-pared-forma.png'), titulo: 'Frase', precio: 96},
        {id: 7, url: require('../assets/free-photo-of-mar-ciudad-barco-italia.png'), titulo: 'Italia', precio: 0},
        {id: 8, url: require('../assets/free-photo-of-silueta-modelo-en-pie-esfera.png'), titulo: 'Esfera', precio: 18},
        {id: 9, url: require('../assets/mantis-8194123_1280.png'), titulo: 'Mantis', precio: 0},
        {id: 10, url: require('../assets/pexels-photo-5185446.png'), titulo: 'Patos', precio: 25},
        {id: 11, url: require('../assets/pexels-photo-10322825.png'), titulo: 'Cúpula', precio: 0},
        {id: 12, url: require('../assets/pexels-photo-10376281.png'), titulo: 'Flores', precio: 0},
        {id: 13, url: require('../assets/pexels-photo-10870571.png'), titulo: 'Casa en la nieve', precio: 12},
        {id: 14, url: require('../assets/pexels-photo-12562449.png'), titulo: 'Mar', precio: 56},
        {id: 15, url: require('../assets/pexels-photo-12809204.png'), titulo: 'Wind surf', precio: 44},
        {id: 16, url: require('../assets/pexels-photo-14653888.png'), titulo: 'Flores', precio: 88},
        {id: 17, url: require('../assets/pexels-photo-18602619.png'), titulo: 'Bizcocho', precio: 0},
        {id: 18, url: require('../assets/residential-8278516_1280.png'), titulo: 'Montaña', precio: 0},
        {id: 19, url: require('../assets/torii-8254663_1280.png'), titulo: 'Oriental', precio: 12},
        {id: 20, url: require('../assets/train-8302635_640.png'), titulo: 'Train', precio: 22}
      ]
    }
  }
}
</script>

<style scoped>
/* Estilos CSS */
.header {
  text-align: center;
}

.filters {
  display: flex;
  justify-content: space-between;
}

.filter,
.orden {
  display: flex;
  align-items: center;
}

.gallery {
  display: flex;
  flex-wrap: wrap;
  justify-content: center; /* Centra las imágenes */
  max-width: 1000px; /* Ancho máximo de la galería */
  margin: 0 auto; /* Centra la galería en la página */
}

.imagen {
  margin: 10px;
  text-align: center;
  max-width: 150px; /* Ajusta el tamaño de la imagen según tus preferencias */
  flex: 0 0 20%; /* Establece el ancho del contenedor al 20% del contenedor principal (5 imágenes en una fila) */
}

.imagen img {
  max-width: 100%;
  height: auto;
  width: 100%; /* Asegura que la imagen ocupe el 100% del contenedor */
  height: 150px; /* Establece una altura específica */
}

.caption {
  text-align: left;
}
</style>
