<template>
  <v-container>
    <v-row justify="center">
      <div id="loginBg">
        <h1>OurDrugs</h1>
        <p>Please Login or Register</p>
        <div id="info">
          <v-text-field v-model="email" label="Email" required outlined>
          </v-text-field>
          <v-text-field
            v-model="password"
            label="Password"
            required
            type="password"
            outlined
          >
          </v-text-field>
          <v-btn
            absolute
            right
            style="margin-right:19px;"
            color="dark"
            dark
            @click.prevent="signIn()"
          >
            Login
          </v-btn>
          <p>Keep me logged in</p>
          <p>
            Don't have an account?
            <router-link to="/login" class="regTxt">
              Register Now
            </router-link>
          </p>
        </div>
      </div>
    </v-row>
  </v-container>
</template>

<script>
import firebase from 'firebase';
import 'firebase/firestore';

export default {
  data() {
    return {
      email: '',
      password: '',
    };
  },
  methods: {
    signIn() {
      firebase
        .auth()
        .signInWithEmailAndPassword(this.email, this.password)
        .then(() => {
          this.$router.replace('/');
        })
        .catch(function(error) {
          var errorCode = error.code;
          var errorMessage = error.message;
          if (errorCode === 'auth/wrong-password') {
            alert('Wrong password');
          } else {
            alert(errorMessage);
          }
          console.log(error);
        });
    },
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
};
</script>

<style lang="scss" scoped>
#loginBg {
  background: rgba(255, 255, 255, 0.8);
  border-radius: 3px;
  padding: 15px;
  margin-top: 50px;
  contain: content;
  min-width: 25vw;
  max-width: 550px;
  h1,
  p {
    font-family: 'Heebo', sans-serif;
    text-align: center;
  }
  p {
    font-family: Open Sans;
  }
  p:nth-child(4) {
    text-align: start;
  }
}

.regTxt {
  color: royalblue;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
}

#info {
  padding: 20px;
}
</style>
