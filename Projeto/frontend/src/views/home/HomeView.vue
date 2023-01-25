<template>
  <v-container class="fill-height">
    <v-container>
      <v-row>
        <v-col cols="12">
          <v-img
            src="@/assets/logo_banner.png"
            max-width="200"
            class="ml-auto mr-auto"
          />
        </v-col>
      </v-row>

      <v-row justify="center">
        <v-btn :loading="loading" plain @click="onBtnClick">
          LET'S GO
          <v-icon dark right> mdi-arrow-right </v-icon>
        </v-btn>
      </v-row>
    </v-container>
  </v-container>
</template>

<script>
export default {
  name: "HomeView",

  data: () => ({
    loading: false,
  }),

  methods: {
    onBtnClick() {
      this.loading = true;

      setTimeout(() => {
        this.$router.push("/list");
      }, 1200);
    },
  },
};
</script>
