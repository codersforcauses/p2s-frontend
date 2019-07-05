<template>
  <div>
    <p class="v-label text-xs-center mb-1">
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
        <v-icon v-else-if="isPDF"
                size="50"
                class="mx-auto"
                :color="primary"
        >
          mdi-file-pdf
        </v-icon>
        <v-icon v-else
                size="50"
                class="mx-auto"
                :color="primary"
        >
          mdi-plus
        </v-icon>
        <input  type="file"
                accept="application/pdf, image/jpeg, image/png"
                @change="handleFileChange"
        />
      </v-container>
    </v-card>

    <p class="body-2 text-truncate text-xs-center mb-1">
      <span v-if="error" class="error--text">
        File must be a PDF, JPG or PNG
      </span>
      <span v-else-if="value" >
        {{value.name}}
      </span>
      <span v-else>
        <br>
      </span>
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
      isPDF: false,
      error: false,
    };
  },
  methods: {
    previewImage(input) {
      // Ensure that you have a file before attempting to read it
      if (input && input[0]) {
        // create a new FileReader to read this image and convert to base64 format
        const reader = new FileReader();
        // Define a callback function to run, when FileReader finishes its job
        reader.onload = (e) => {
          // Read image as base64 and set to imageData
          this.imageData = e.target.result;
        };
        // Start the reader job - read file as a data url (base64 format)
        reader.readAsDataURL(input[0]);
      }
    },
    handleFileChange(e) {
      const file = e.target.files;
      const allowedTypes = ['image/png', 'image/jpeg', 'application/pdf'];

      if (allowedTypes.indexOf(file[0].type) > -1) {
        this.error = false;
        if (file[0].type === 'application/pdf') {
          this.isPDF = true;
        } else {
          this.previewImage(file);
        }
        this.$emit('input', file[0]);
      } else {
        this.error = true;
      }
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
