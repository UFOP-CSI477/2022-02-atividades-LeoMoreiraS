<template>
  <div class="fill-height">
    <v-toolbar>
      <v-tooltip right>
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            color="error"
            dark
            text
            @click="$router.push('/')"
            v-bind="attrs"
            v-on="on"
          >
            <v-icon dark class="rotate-icon-logout"> mdi-logout </v-icon>
          </v-btn>
        </template>
        <span>Logout</span>
      </v-tooltip>

      <v-spacer />

      <v-avatar>
        <v-img
          :src="require('@/assets/logo.png')"
          alt="PandaFilm - Logo"
          contain
        />
      </v-avatar>

      <v-spacer />

      <v-tooltip left>
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            color="primary"
            dark
            text
            @click="dialog = true"
            v-bind="attrs"
            v-on="on"
          >
            <v-icon dark> mdi-cloud-upload </v-icon>
          </v-btn>
        </template>
        <span>Upload</span>
      </v-tooltip>
    </v-toolbar>

    <v-container>
      <v-card
        v-for="(item, index) in list"
        :key="index"
        :loading="loading"
        class="mb-5"
      >
        <v-card-title>{{ item.title }}</v-card-title>

        <v-img
          class="mx-auto"
          :src="`http://localhost:3000/${item.image}`"
          height="200"
        />

        <v-card-actions>
          <v-tooltip right>
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                text
                color="green lighten-2"
                :href="`http://localhost:3000/video/${item.id}`"
                target="_blank"
                v-bind="attrs"
                v-on="on"
              >
                <v-icon dark> mdi-television-play </v-icon>
              </v-btn>
            </template>
            <span>Play</span>
          </v-tooltip>

          <v-spacer />

          <v-tooltip left>
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                text
                color="red lighten-2"
                @click="onClickBtnDelete(item.id)"
                v-bind="attrs"
                v-on="on"
              >
                <v-icon dark> mdi-delete </v-icon>
              </v-btn>
            </template>
            <span>Delete</span>
          </v-tooltip>
        </v-card-actions>
      </v-card>
    </v-container>

    <v-dialog v-model="dialog" persistent max-width="500">
      <v-card>
        <v-card-title class="text-h5"> Form - Upload </v-card-title>

        <v-card-text>
          <v-container>
            <v-form ref="form" v-model="form.valid">
              <v-row>
                <v-col cols="12">
                  <v-file-input
                    v-model="form.video"
                    label="Video (mp4)"
                    show-size
                    truncate-length="50"
                    accept=".mp4"
                    prepend-icon="mdi-video-image"
                    :rules="[rules.notEmptyObject]"
                    @change="onChangeVideoInput"
                  />
                </v-col>

                <v-col cols="12">
                  <v-text-field
                    v-model="form.title"
                    :label="form.file ? 'Title' : 'Filled automatically'"
                    :rules="[rules.notEmpty]"
                    disabled
                  >
                    <v-icon slot="prepend"> mdi-format-title </v-icon>
                  </v-text-field>
                </v-col>

                <v-col cols="12">
                  <v-file-input
                    v-model="form.thumbnail"
                    label="Thumbnail (jpeg)"
                    show-size
                    truncate-length="50"
                    accept=".jpeg"
                    prepend-icon="mdi-camera-image"
                    :rules="[rules.notEmptyObject]"
                  />
                </v-col>
              </v-row>
            </v-form>
          </v-container>
        </v-card-text>

        <v-card-actions>
          <v-btn color="error darken-1" text @click="onCancelDialog">
            Cancel
          </v-btn>

          <v-spacer />

          <v-btn color="primary darken-1" text @click="onSubmitForm">
            Confirm
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-snackbar v-model="snackbar" timeout="4000" :color="type">
      {{ msg }}

      <template v-slot:action="{ attrs }">
        <v-btn color="error" text v-bind="attrs" @click="snackbar = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>

<script>
export default {
  name: "ExploreView",

  data: () => ({
    loading: false,
    list: [],
    dialog: false,
    form: {
      title: "",
      video: null,
      thumbnail: null,
      valid: false,
    },
    rules: {
      notEmpty: (val) => (val || "").length > 0 || "Campo obrigatório!",
      notEmptyObject: (val) => {
        if (!val) return "Campo Obrigatório!";
        return true;
      },
    },
    snackbar: false,
    type: "",
    msg: "",
  }),

  methods: {
    async fetch() {
      this.loading = true;

      const { data } = await this.$axios
        .get("http://localhost:3000/videos")
        .then((res) => res)
        .catch(() => this.onApiError());

      setTimeout(() => {
        this.loading = false;
      }, 1000);

      this.list = data;

      if (this.list.length === 0)
        this.useSnackbar("warning darken-1", "No videos found!");
    },

    async onClickBtnDelete(id) {
      await this.$axios
        .delete(`http://localhost:3000/delete/${id}`)
        .then(() =>
          this.useSnackbar("success darken-1", "Video successfully deleted!")
        )
        .catch(() => this.onApiError());

      this.fetch();
    },

    async onSubmitForm() {
      if (this.form.valid) {
        let formData = new FormData();
        formData.append("video", this.form.video);
        formData.append("jpeg", this.form.thumbnail);

        await this.$axios
          .post("http://localhost:3000/upload", formData)
          .then(() =>
            this.useSnackbar("success darken-1", "Video successfully uploaded!")
          )
          .catch(() => this.onApiError());

        this.onCancelDialog();
        this.fetch();
      } else this.$refs.form.validate();
    },

    onCancelDialog() {
      this.resetForm();
      this.dialog = false;
    },

    resetForm() {
      this.form = {
        title: "",
        video: null,
        thumbnail: null,
        valid: false,
      };
      this.$refs.form.reset();
    },

    onChangeVideoInput(file) {
      if (!file) this.form.title = "";
      else this.form.title = file.name.replaceAll("_", " ").replace(".mp4", "");
    },

    onApiError() {
      this.useSnackbar(
        "error darken-1",
        "Oops... Aparentemente algo deu errado e não foi possível prosseguir com a operação!"
      );
    },

    useSnackbar(type, msg) {
      this.type = type;
      this.msg = msg;
      this.snackbar = true;
    },
  },

  mounted() {
    this.fetch();
  },
};
</script>

<style scoped>
.rotate-icon-logout {
  transform: rotate(180deg);
}
</style>
