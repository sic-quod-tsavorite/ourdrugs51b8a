<template>
  <div>
    <!--<v-navigation-drawer color="primary" v-model="drawer" app style="display:none;">
      <ul>
        <router-link tag="li" to="/"
          ><v-icon color="orange">home</v-icon> Home
        </router-link>
        <router-link tag="li" to="/menu"
          ><v-icon color="orange">restaurant_menu</v-icon> Menu
        </router-link>
        <router-link tag="li" to="/about"
          ><v-icon color="orange">info</v-icon> About
        </router-link>
        <router-link tag="li" to="/login"
          ><v-icon color="orange">info</v-icon> Login
        </router-link>
        <router-link tag="li" to="/admin"
          ><v-icon color="inprogress">lock</v-icon> Admin
        </router-link>
      </ul>
    </v-navigation-drawer>-->

    <v-app-bar app id="appBar">
      <div id="nav-left">
        <router-link to="/login" v-if="!user"> Login </router-link>
        <a v-if="user" @click.prevent="signOut()">
          Logout
        </a>
        <!--<v-app-bar-nav-icon
          @click.stop="drawer = !drawer"
          color="blue"
        ></v-app-bar-nav-icon>-->
      </div>
      <div id="nav-center">
        <router-link to="/shop"> Shop </router-link>
        <router-link to="/faq"> FAQ </router-link>
        <router-link to="/">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 155.32 142.25"
            height="60"
            width="60"
          >
            <defs id="test1"></defs>
            <g id="Layer_2" data-name="Layer 2">
              <g id="Layer_2-2" data-name="Layer 2">
                <path
                  class="cls-1"
                  d="M116.82,137.75q17-66.49,34-133l-73,24Z"
                />
                <path class="cls-1" d="M38.5,137.5,4.5,4.5l73,24Z" />
                <path
                  class="cls-1"
                  d="M77.32,137.25,150.5,5.5,77.82,28.75,4.5,4.5Z"
                />
              </g>
            </g>
          </svg>
        </router-link>
        <router-link to="/safety">Safety</router-link>
        <router-link to="/contact">Contact</router-link>
      </div>
      <div id="nav-right">
        <router-link to="/admin" v-if="user">Admin</router-link>
      </div>
    </v-app-bar>
  </div>
</template>

<script>
import firebase from 'firebase';
import 'firebase/firestore';

export default {
  data: () => ({
    drawer: null,
    user: null,
  }),
  methods: {
    signOut() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          alert('Logged Out');
          this.$router.replace('/');
        })
        .catch((error) => {
          alert(error);
        });
    },
  },
  created() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.user = user;
      } else {
        this.user = null;
      }
    });
  },
};
</script>

<style lang="scss" scoped>
#appBar {
  background-color: rgba(34, 34, 34, 0.27);
  #nav-left {
    display: flex;
    width: 100%;
  }
  #nav-center {
    display: flex;
    justify-content: center;
    width: 100%;
    align-items: center;
    text-align: center;
  }
  #nav-right {
    width: 100%;
    display: flex;
    justify-content: flex-end;
  }
  a /*this is router-link*/ {
    color: rgba(255, 255, 255, 0.95);
    margin: 30px;
    font-family: 'Heebo', sans-serif;
    font-weight: bold;
    font-size: 22px;
    text-decoration: none;
    text-transform: uppercase;
    transition-duration: 0.5s;
    cursor: pointer;
    width: 70px;
    svg {
      fill: none;
      stroke: rgba(255, 255, 255, 0.95);
      stroke-linecap: round;
      stroke-linejoin: round;
      stroke-width: 9px;
      margin-top: 10px;
    }
    &:hover,
    svg:hover {
      color: #ff6d00;
      stroke: #ff6d00;
      transition-duration: 0.5s;
    }
  }
}

nav ul {
  padding: 0;
  margin-top: 20px;
  text-decoration: none;
}
nav li {
  color: map-get($colorz, orange);
  margin-left: 15%;
  padding: 5px 20px;
  list-style-type: none;
  cursor: pointer;
}

nav li i {
  margin-right: 10px;
}
nav li:last-child {
  position: absolute;
  bottom: 40px;
  color: map-get($colorz, inprogress);
}
</style>
