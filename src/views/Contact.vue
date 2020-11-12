<template>
  <v-row justify="center">
    <v-card id="submitCard">
      <h2>Fill in forms to contact us:</h2>

      <v-form ref="form" v-model="valid" lazy-validation>
        <v-text-field
          outlined
          v-model="name"
          :counter="10"
          :rules="nameRules"
          label="Name"
          required
        ></v-text-field>

        <v-text-field
          outlined
          v-model="email"
          :rules="emailRules"
          label="E-mail"
          required
        ></v-text-field>

        <v-textarea
          outlined
          v-model="message"
          :rules="messageRules"
          label="Message"
          required
        ></v-textarea>

        <v-btn
          :disabled="!valid"
          color="success"
          class="mr-4"
          @click="validate"
        >
          Send Email
        </v-btn>
      </v-form>
    </v-card>
  </v-row>
</template>

<script>
export default {
  data: () => ({
    valid: true,
    name: '',
    nameRules: [(v) => !!v || 'Name is required'],
    email: '',
    emailRules: [
      (v) => !!v || 'E-mail is required',
      (v) => /.+@.+\..+/.test(v) || 'E-mail must be valid',
    ],
    message: '',
    messageRules: [(v) => !!v || 'Message is required'],
  }),

  methods: {
    validate() {
      this.$refs.form.validate();
    },
    reset() {
      this.$refs.form.reset();
    },
    resetValidation() {
      this.$refs.form.resetValidation();
    },
  },
};
</script>

<style lang="scss" scoped>
#submitCard {
  margin-top: 65px;
  padding: 25px;
  width: 65vw;
  h2 {
    margin-bottom: 20px;
  }
}
</style>
