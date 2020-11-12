<template>
  <v-container>
    <v-row justify="center" class="pa-15">
      <div id="info">
        <h1>
          Product Information
        </h1>
        <v-text-field
          label="Name"
          :rules="nameRules"
          required
          v-model="name"
          outlined
        >
        </v-text-field>
        <v-text-field
          label="Description"
          :rules="descRules"
          required
          v-model="description"
          outlined
        >
        </v-text-field>
        <v-text-field
          label="Price"
          required
          :rules="priceRules"
          v-model="price"
          outlined
        >
        </v-text-field>
        <v-text-field
          label="Filter"
          required
          :rules="filterRules"
          v-model="filter"
          outlined
        >
        </v-text-field>
        <!--<h2>Select filter:</h2>
        <v-radio-group v-model="filters" column required>
          <v-radio label="Cannabis" v-model="cannabis"></v-radio>
          <v-radio label="Crystal" v-model="crystal"></v-radio>
          <v-radio label="Pills" v-model="pills"></v-radio>
          <v-radio label="Powder" v-model="powder"></v-radio>
        </v-radio-group>-->
        <v-text-field
          label="Image URL"
          required
          :rules="imgURLRules"
          v-model="imgURL"
          outlined
        >
        </v-text-field>
        <!--
        <v-file-input
          label="File input"
          :rules="imgRules"
          v-model="img"
          @change="uploadImage"
        ></v-file-input>
        
        <vue-dropzone
          ref="imgDropzone"
          :options="dropzoneOptions"
          @vdropzone-complete="afterComplete"
        ></vue-dropzone>

        <div v-if="images.length > 0">
          <div v-for="image in images" :key="image.src">
            <img :src="image.src" />
          </div>
        </div>
-->
        <v-btn
          color="success"
          @click="addNewMenuItem()"
          dark
          style="margin-right:15px;"
        >
          Add Item
        </v-btn>
        <v-btn color="red darken-2" dark to="/admin">
          Back
        </v-btn>
      </div>
    </v-row>
  </v-container>
</template>

<script>
import { dbMenuAdd /*, fb*/ } from '../../../firebase';
/*import vue2Dropzone from 'vue2-dropzone';
import 'vue2-dropzone/dist/vue2Dropzone.min.css';
import { storage } from 'firebase';
let uuid = require('uuid');*/

export default {
  data() {
    return {
      name: '',
      nameRules: [(v) => !!v || 'Name is required'],
      description: '',
      descRules: [(v) => !!v || 'Description is required'],
      price: '',
      priceRules: [(v) => !!v || 'Price is required'],
      filter: '',
      filterRules: [(v) => !!v || 'Filter tag is required'],
      imgURL: '',
      imgURLRules: [(v) => !!v || 'Image URL is required'],
      /*selectedFile: null,
      img: '',
      imgRules: [(v) => !!v || 'Uploading an image is required'],
      images: [],
      dropzoneOptions: {
        url: '',
        thumbnailWidth: 250,
        thumbnailHeight: 250,
        addRemoveLinks: false,
        acceptedFiles: '.jpg, .jpeg, .png',
      },*/
    };
  },
  methods: {
    /*async afterComplete(file) {
      try {
        const imageName = uuid.v1();
        const metaData = {
          contentType: 'image/png',
        };

        const storageRef = firebase.storage().ref;
        const imageRef = storageRef.child(`images/s{imageName}.png`);

        await imageRef.put(file, metaData);

        const downloadUrl = await imageRef.getDownloadURL();

        this.images.push({ src: downloadUrl });

        this.$refs.imgDropzone.removeFile(file);
      } catch (error) {
        console.log(error);
      }
    },*/
    /*uploadImage(e) {
      console.log(e);
      this.selectedFile = e.target.files[0];
      let file = e;
      var storageRef = fb.storage().ref('images/' + file.name);
      let uploadTask = storageRef.put(file);
    },*/
    addNewMenuItem() {
      dbMenuAdd.add({
        name: this.name,
        description: this.description,
        price: this.price,
        filter: this.filter,
        imgURL: this.imgURL,
      });
    },
  },
};
</script>

<style lang="scss" scoped>
#info {
  background-color: white;
  border-radius: 5px;
  width: 70vw;
  padding: 25px;
}
h1 {
  font-weight: bold;
  text-transform: uppercase;
  font-size: 18px;
  text-align: center;
  font-family: 'Heebo', sans-serif;
  margin-bottom: 25px;
}
tr th {
  font-weight: 300;
}
#td_name {
  font-weight: bold;
}
tr td {
  padding: 10px 10px 10px 16px;
}
#menu_item_description {
  font-style: italic;
  font-weight: 300;
  color: map-get($colorz, darkgrey);
  font-size: 13px;
}

/*.img-div {
  display: flex;
  margin: 25px;
}

.img {
  max-width: 250px;
  margin: 15px;
}*/
</style>
