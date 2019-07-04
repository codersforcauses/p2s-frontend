<template>
  <div>
    <p class="v-label text-xs-center">
      {{label}}
    </p>
    <v-card v-ripple
            flat
            tag="label"
            class="card pa-0"
            height="100"
            width="100"
    >
      <v-container fill-height grid-list-lg class="pa-0">
        <v-img  height="96"
                width="96"
                style="border-radius: 1.16rem"
                v-if="imageData.length > 0"
                :src="imageData"
        />
        <v-icon v-else
                size="50"
                class="mx-auto"
                :color="primary"
        >
          mdi-plus
        </v-icon>
        <input  type="file"
                accept="image/*"
                @change="handleFileChange"
        />
      </v-container>
    </v-card>

    <p v-if="value" class="body-2 text-truncate text-xs-center">
      {{value.name}}
    </p>
  </div>
</template>

<script>
export default {
  name: 'FileUpload',
  props: {
    label: String,
    value: File,
    primary: String,
  },
  data() {
    return {
      imageData: '',
    };
  },
  methods: {
    previewImage(event) {
      // Reference to the DOM input element
      const input = event.target;
      // Ensure that you have a file before attempting to read it
      if (input.files && input.files[0]) {
        // create a new FileReader to read this image and convert to base64 format
        const reader = new FileReader();
        // Define a callback function to run, when FileReader finishes its job
        reader.onload = (e) => {
          // Read image as base64 and set to imageData
          this.imageData = e.target.result;
        };
        // Start the reader job - read file as a data url (base64 format)
        reader.readAsDataURL(input.files[0]);
      }
    },
    handleFileChange(e) {
      this.previewImage(e);
      this.$emit('input', e.target.files[0]);
    },
  },
};
</script>

<style scoped>
.v-card >>> input[type="file"] {
  display: none;
}
.theme--light.card {
  border: solid 2px var(--v-lightPrimary-base);
}
.theme--dark.card {
  border: solid 2px var(--v-darkPrimary-base);
}
</style>
