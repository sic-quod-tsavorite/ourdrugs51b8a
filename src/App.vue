<template>
  <v-app id="app">
    <navigation />

    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
import navigation from '@/components/navigation.vue';

export default {
  components: {
    navigation,
  },
  name: 'App',
  props: {
    source: String,
  },
  data: () => ({
    drawer: null,
  }),
};
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Heebo:wght@400;700&family=Open+Sans:ital,wght@0,400;0,600;0,700;0,800;1,400;1,600;1,700;1,800&display=swap');

* {
  font-family: 'Open Sans', sans-serif;
}

main {
  background-color: rgb(17, 17, 17);
}
/*h1 {
  @include infobox_mixin(
    5px,
    map-get($colorz, white),
    10px,
    5px,
    map-get($colorz, white)
  );
  font-weight: bold;
  text-transform: uppercase;
  font-size: 16px;
  text-align: right;
}
.col:last-child h1 {
  text-align: left;
}
#info {
  background-color: white;
  border-radius: 5px;
}*/
</style>
