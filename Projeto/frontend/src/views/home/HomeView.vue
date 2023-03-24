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

      <v-form @submit.prevent="onSubmit">
        <v-row>
          <v-col cols="12">
            <v-text-field
              v-model="email"
              label="Email"
              outlined
              required
            ></v-text-field>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12">
            <v-text-field
              v-model="password"
              label="Password"
              outlined
              required
              type="password"
            ></v-text-field>
          </v-col>
        </v-row>

        <v-row justify="center">
          <v-btn :loading="loading" type="submit" plain>
            LET'S GO
            <v-icon dark right> mdi-arrow-right </v-icon>
          </v-btn>
        </v-row>
      </v-form>
    </v-container>
  </v-container>
</template>

<script>
import axios from "axios";

export default {
  name: "HomeView",

  data: () => ({
    loading: false,
    email: "",
    password: "",
  }),

  methods: {
    onSubmit() {
      this.loading = true;

      const data = {
        email: this.email,
        password: this.password,
      };

      axios
        .post("http://localhost:3000/login", data)
        .then((response) => {
          console.log(response.data);
          this.$router.push("/list");
        })
        .catch((error) => {
          console.log(error);
          this.loading = false;
        });
    },
  },
};
</script>
