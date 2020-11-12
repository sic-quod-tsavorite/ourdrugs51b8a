<template>
  <div>
    <h1>Welcome to OurDrugs</h1>
    <span style="display:none;">
      Image source: https://www.artstation.com/artwork/6aRKm0
    </span>
    <img
      src="https://firebasestorage.googleapis.com/v0/b/ourdrugs-51b8a.appspot.com/o/drugs-front-page.jpg?alt=media&token=a666b043-9800-40c6-acfd-2b3a0cf7e154"
    />
    <h2>
      View our products:
    </h2>
    <v-btn rounded x-large to="/shop">
      go to shop
    </v-btn>
  </div>
</template>

<script>
// @ is an alias to /src
//import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'Home',
  components: {
    //  HelloWorld
  },
};
</script>

<style lang="scss" scoped>
h1 {
  font-family: 'Heebo', sans-serif;
  font-size: 3em;
  text-align: center;
  color: white;
  margin: 100px 20px 20px -236.531px;
  position: absolute;
  z-index: 2;
  left: 50%;
}
img {
  position: absolute;
  height: 100%;
  z-index: 1;
  pointer-events: none;
}
.v-btn {
  position: absolute;
  z-index: 2;
  left: 50%;
  margin-left: -79.172px;
  top: 50%;
  font-weight: bold;
}
h2 {
  position: absolute;
  z-index: 2;
  color: white;
  left: 50%;
  margin-left: -112.547px;
  top: 43%;
}
</style>
