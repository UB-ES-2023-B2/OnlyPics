<template>
  <div class="main-container" @click="handlePopupClick">
    <div class="container" @click.stop>
      <span class="close-popup" @click="closePopup">&times;</span>
      <h2>{{ selectedImage.title }}</h2>
      <img :src="selectedImage.url" :alt="selectedImage.title" class="popup-image" @contextmenu.prevent="preventRightClick">
      <div style="text-align: center;">
        <p style="display: inline-block; margin-right: 15px;">{{ selectedImage.price }}🪙</p>
        <p style="display: inline-block;">{{ selectedImage.likes }}❤</p>
      </div>
      <button v-if="userMoney >= selectedImage.price" @click="downloadImage" class="download-button">Download Image</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "PopUp",
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
