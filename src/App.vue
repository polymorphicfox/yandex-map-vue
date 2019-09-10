<template>
  <v-app>
    <v-app-bar app>
      <v-btn
              text
              to="/"
      >
        <span class="mr-2">Map Example</span>
      </v-btn>
      <v-btn
        text
        to="/about"
      >
        <span class="mr-2">About</span>
      </v-btn>
      <v-spacer></v-spacer>
    </v-app-bar>

    <v-content class="app-content">
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>

export default {
  name: 'App',

  data: () => ({
    //
  }),
};
</script>

<style scoped>
  .app-content{
    margin: 10px 10px;
  }
</style>
