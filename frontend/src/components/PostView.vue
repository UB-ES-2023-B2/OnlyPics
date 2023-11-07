<template>
  <div class="main-container">
    <div class="container">
      <h2 class="title">POST IMAGE</h2>
      <input type="file" ref="fileInput" style="display: none" @change="handleFileSelect" />
      <button @click="openFileSelector">Seleccionar una imagen</button>
      <img :src="selectedImage" v-if="selectedImage" alt="Imagen seleccionada" class="max-width-image" />
      <input type="text" v-model="imageTitle" placeholder="Título de la imagen" />

      <div class="checkboxes">
        <label>
          <input type="radio" v-model="selectedOption" value="public" /> Public
        </label>
        <label>
          <input type="radio" v-model="selectedOption" value="private" /> Private
        </label>
      </div>

      <!-- Botones al final de la página -->
      <div class="botones">
        <button @click="uploadImage">POST</button>
        <button @click="cancel">Cancel</button>
      </div>
    </div>
  </div>
</template>

<script>

import axios from 'axios'

export default {
  name: 'PostView',
  data () {
    return {
      selectedImage: null,
      selectedOption: 'public',
      imageTitle: '',
      imagePrice: 0,
      userId: 'joanv'
    }
  },
  methods: {
    openFileSelector () {
      this.$refs.fileInput.click()
    },
    handleFileSelect (event) {
      const file = event.target.files[0]
      if (file) {
        this.selectedImage = URL.createObjectURL(file)
      }
    },
    uploadImage () {
      const parameters = {
        url: this.selectedImage,
        title: this.imageTitle,
        price: this.imagePrice
      }

      const currentUser = 'joanv' // Pots canviar-ho per obtenir el nom d'usuari desitjat

      const baseUrl = `http://127.0.0.1:8000/photos/?user_id=${currentUser}`
      console.log(parameters)

      const config = {
        headers: {
          'Content-Type': 'application/json'
        }
      }

      axios.post(baseUrl, parameters, config)
        .then((response) => {
          console.log('Image posted successfully', response.data)
        })
        .catch((error) => {
          console.error('Error', error)
        })
      this.$emit('cancel')
    },
    cancel () {
      this.$emit('cancel')
    }
  }
}
</script>

<style scoped>

.main-container {
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
  padding: 20px;
  text-align: center;
  border-radius: 10px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
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

.max-width-image {
  max-width: 100%;
  max-height: 300px;
  margin-top: 10px;
}

.max-width-image {
  max-width: 100%;
  max-height: 350px;
  margin-top: 10px;
}

.checkboxes {
  margin-top: 20px;
  display: flex;
  justify-content: center;
}

.checkboxes label {
  margin: 0 10px;
}

input[type="text"] {
  width: 100%;
  padding: 10px;
  margin-top: 10px;
  border-radius: 3px;
}

</style>
