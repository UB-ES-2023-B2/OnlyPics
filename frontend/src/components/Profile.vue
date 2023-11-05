<template>
  <div class="profile">
    <!-- Header Menu -->
    <HeaderMenu title="Profile" :money="userState.user.available_money" />

    <!-- Profile Container -->
    <div class="profile-container">
      <!-- Profile Pic -->
      <div class="profile-pic">
        <img :src="userState.user.profile_pic || null">
        <i v-if="!userState.user.profile_pic" class="fas fa-circle-user fa-10x"></i>
      </div>

      <!-- User Info -->
      <div class="user-info">
        <h1 class="username"> {{ userState.user.username }} </h1>
        <p class="biography" v-if=userState.user.biography>{{ userState.user.biography }}</p>
        <p class="biography" v-else>Biography</p>
      </div>
    </div>
    <div>
      <p class="text-latest"> Latest Pics </p>
    </div>
    <!-- Uploaded Pics Grid -->
    <div class="pics-grid">
      <p>{{userState.user.photos}}</p>
      <div v-for="photo in userState.user.photos" :key="photo.id" class="photo">
        <p>{{ photo.url }}</p>
        <img :src="require('@/assets/' + photo.url)" :alt="photo.title || 'Image Description'">
        <p>{{ photo.title }}</p>
      </div>
    </div>
    <footer-view />
  </div>
</template>

<script>
import FooterView from '@/components/FooterView.vue'
import userState from '@/userState'
import HeaderMenu from '@/components/HeaderMenu.vue'
import axios from 'axios'

export default {
  name: 'Profile',
  components: {HeaderMenu, FooterView},
  data () {
    return {
      userState: userState
    }
  },
  methods: {
    async fetchUserPhotos (username) {
      try {
        const response = await axios.get('/user/' + username + '/photos')
        const photos = response.data
        console.log(photos)
        return photos
      } catch (error) {
        console.error('Error fetching user photos', error)
      }
    }
  },
  created () {
    const username = userState.user.username
    const photos = this.fetchUserPhotos(username)
    this.userState.user.photos = photos
    console.log(userState.user.photos)
  }
}
</script>

<style scoped>
  .profile {
    font-family: 'Arial', sans-serif;
    /* Add your overall styles for the profile page here */
  }
.profile-container {
  display: flex;
  align-items: flex-start;
  justify-content: start;
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
    width: 100px;
    height: 100px;
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
    margin-left: 10px;
    /* Add styles for the biography here */
  }

  .pics-grid {
    /* Add styles for the pics grid here */
    font-family: 'Courgette', cursive;
    margin-top: 60px;
    font-size: 20px;
    text-align: left;
    margin-left: 30px;

  }
</style>
