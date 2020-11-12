<template>
  <v-container>
    <v-row justify="center">
      <h1>FAQ</h1>
    </v-row>
    <v-row id="questions">
      <v-col cols="12">
        <h2>1. What is OurDrugs?</h2>
        <span>
          OurDrugs was created with the vision of providing high-quality drugs
          without our customers having to worry about buying drugs <br />
          from some sketchy dealers that might be selling bad drugs.
        </span>
      </v-col>
      <v-col cols="12">
        <h2>2. What is the expected delivery time?</h2>
        <span>
          You can expect a delivery time of 1-4 weekdays, depending on your
          location. There might be unexpected delays during transport <br />
          which we can't take responsibility for.
        </span>
      </v-col>
      <v-col cols="12">
        <h2>3. Which currencies do you accept?</h2>
        <span>
          As a safety measure, we are only accepting the cryptocurrency Bitcoin,
          as this allows both parties to remain anonymous and keep <br />
          the transaction untraceable. We may however in the future accept other
          cryptocurrencies such as Ethereum.
        </span>
      </v-col>
      <v-col cols="12">
        <h2>4. I got arrested, what are you gonna do?</h2>
        <span>
          We do not take responsibility for any legal action that may be taken
          against you from any law enforcements.
        </span>
      </v-col>
    </v-row>
  </v-container>
</template>

<style lang="scss" scoped>
h1 {
  color: white;
  border-bottom: solid 5px white;
  text-align: center;
  margin: 65px auto 30px auto;
  width: 20vw;
}
h2,
span {
  color: white;
}
#questions {
  .col {
    margin: 15px 20vw;
  }
}
</style>
