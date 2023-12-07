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
      <div class="price">
        <label v-if="selectedOption === 'private'"> Price:
          <input type="number" v-model="imagePrice" min="0"/>
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
import {userState} from '@/userState'
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://pnrmoqedbmcpxehltqvy.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBucm1vcWVkYm1jcHhlaGx0cXZ5Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcwMDI1NDgxMywiZXhwIjoyMDE1ODMwODEzfQ.VkkazTWbRULNBVgwu56bjdHqSwzUnHriNNOs_6PpqEQ';
const supabase = createClient(supabaseUrl, supabaseKey);

export default {
  name: 'PostView',
  data () {
    return {
      selectedImage: null,
      selectedOption: 'public',
      imageTitle: '',
      imagePrice: 0,
      userId: userState.user.username
    }
  },
  methods: {
    openFileSelector () {
      this.$refs.fileInput.click()
    },
    async handleFileSelect (event) {
      const file = event.target.files[0]
      const rutaEnStorage = file.name
      const rutaAssets = 'https://pnrmoqedbmcpxehltqvy.supabase.co/storage/v1/object/public/Assets/'

      // Subir la imagen al almacenamiento de Supabase
      const { data, error } = await supabase
        .storage
        .from('Assets')
        .upload(rutaEnStorage, file);

      if (error) {
        console.error('Error al subir la imagen:', error.message);
        alert(error.message)
        return;
      }

      console.log('Imagen subida exitosamente:', data.Key);

      this.selectedImage = rutaAssets + rutaEnStorage
      console.log('URL de la imagen:', this.selectedImage);
    },
    async uploadImage () {
      // Verifica que todos los campos estén llenos
      if (!this.selectedImage || !this.imageTitle) {
        console.error('All fields must be filled in.');
        alert('All fields must be filled in.');
        return;
      }
      const parameters = {
        url: this.selectedImage,
        title: this.imageTitle,
        price: this.imagePrice,
        user_id: this.userId,
        likes: 0
      }

      const path = '/photos'
      console.log(parameters)

      axios.post(path, parameters)
        .then((response) => {
          console.log('Image posted successfully', response.data)
        })
        .catch((error) => {
          console.error('Error', error)
          console.error(parameters)
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
  z-index: 100;
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

.price input {
  margin: 5px auto;
  width: 80px; /* Ajusta el tamaño según tus necesidades */
}

</style>
