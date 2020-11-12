<template>
  <v-container>
    <v-row justify="center" class="pa-15">
      <div id="info" class="pa-2">
        <h1>
          add a new product
        </h1>
        <v-btn color="orange accent-4" small text to="/addNew">
          <v-icon>mdi-plus-thick</v-icon
          ><span style="padding:0 10px;">Add Product</span>
        </v-btn>
        <v-simple-table fixed-header height="60vh" id="menu-table">
          <template v-slot:default>
            <thead>
              <tr>
                <th class="text-left" style="width:15%;">
                  Name
                </th>
                <th class="text-left" style="width:65%px;">
                  Image
                </th>
                <th style="width:100px;">Price</th>
                <th style="width:100px;">Edit</th>
                <th style="width:100px;">Remove</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in menuItems" :key="item.name">
                <td>
                  <span id="td_name">{{ item.name }}</span>
                  <br />
                  <span id="menu_item_description">
                    {{ item.description }}
                  </span>
                </td>
                <td>
                  <v-img
                    id="product_img"
                    class="white--text"
                    height=""
                    :src="item.imgURL"
                  >
                  </v-img>
                </td>
                <td>{{ item.price }} BTC</td>
                <td>
                  <v-btn
                    fab
                    small
                    text
                    id="btns"
                    @click="editItem(item)"
                    @click.stop="dialog = true"
                  >
                    <v-icon color="orange accent-4">
                      mdi-file-edit
                    </v-icon>
                  </v-btn>
                </td>
                <td>
                  <v-btn fab small text @click="deleteItem(item.id)">
                    <v-icon color="incomplete">
                      mdi-trash-can
                    </v-icon>
                  </v-btn>
                </td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
      </div>
    </v-row>
    <v-row>
      <v-dialog v-model="dialog" max-width="400">
        <v-card id="editItem">
          <h1>
            Product Information
          </h1>
          <v-text-field
            label="Name"
            :rules="nameRules"
            required
            v-model="item.name"
            outlined
          >
          </v-text-field>
          <v-text-field
            label="Description"
            :rules="descRules"
            required
            v-model="item.description"
            outlined
          >
          </v-text-field>
          <v-text-field
            label="Price"
            required
            :rules="priceRules"
            v-model="item.price"
            outlined
          >
          </v-text-field>
          <v-text-field
            label="Filter"
            required
            :rules="filterRules"
            v-model="item.filter"
            outlined
          >
          </v-text-field>
          <v-text-field
            label="Image URL"
            required
            :rules="imgURLRules"
            v-model="item.imgURL"
            outlined
          >
          </v-text-field>
          <!--<v-file-input
            label="File input"
            :rules="imgRules"
            v-model="img"
            @change="uploadImage"
          ></v-file-input>-->
          <!--
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
            @click="updateItem(item.id)"
            @click.stop="dialog = false"
            dark
            style="margin-right:15px;"
          >
            Edit Item
          </v-btn>
          <v-btn color="red darken-2" dark @click.stop="dialog = false">
            Close
          </v-btn>
        </v-card>
      </v-dialog>
    </v-row>
  </v-container>
</template>

<script>
import { dbMenuAdd } from '../../firebase';

export default {
  data() {
    return {
      basket: [],
      menuItems: [],
      dialog: false,
      nameRules: [(v) => !!v || 'Name is required'],
      descRules: [(v) => !!v || 'Description is required'],
      priceRules: [(v) => !!v || 'Price is required'],
      filterRules: [(v) => !!v || 'Filter tag is required'],
      imgURLRules: [(v) => !!v || 'Image URL is required'],
      item: [],
      activeEditItem: null,
    };
  },
  created() {
    dbMenuAdd.get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        console.log(doc.id, ' => ', doc.data());
        var menuItemData = doc.data();
        this.menuItems.push({
          id: doc.id,
          name: menuItemData.name,
          description: menuItemData.description,
          price: menuItemData.price,
          filter: menuItemData.filter,
          imgURL: menuItemData.imgURL,
        });
      });
    });
  },
  methods: {
    editItem(item) {
      this.item = item;
      this.activeEditItem = item.id;
    },
    updateItem() {
      dbMenuAdd
        .doc(this.activeEditItem)
        .update(this.item)
        .then(() => {
          console.log('Document successfully updated!');
        })
        .catch(function(error) {
          // The document probably doesn't exist.
          console.error('Error updating document: ', error);
        });
    },
    deleteItem(id) {
      dbMenuAdd
        .doc(id)
        .delete()
        .then(function() {
          console.log('Document successfully deleted!');
        })
        .catch(function(error) {
          console.error('Error removing document: ', error);
        });
    },
  },
};
</script>

<style lang="scss" scoped>
h1 {
  font-family: heebo, sans-serif;
  font-weight: bold;
  text-transform: uppercase;
  font-size: 18px;
  text-align: center;
  margin: 16px;
}
.col:last-child h1 {
  text-align: left;
}
#info {
  background-color: white;
  border-radius: 5px;
  width: 70vw;
  padding: 25px;
}
tr th {
  font-weight: 300;
}
#td_name {
  font-weight: bold;
}
tr td {
  padding: 10px 10px 10px 16px;
  white-space: nowrap;
}
#menu_item_description {
  font-style: italic;
  font-weight: 300;
  color: map-get($colorz, darkgrey);
  font-size: 13px;
}
#product_img {
  height: 50px;
  width: 50px;
  margin: 10px 0;
}
#btns {
  margin-left: -5px;
}

#editItem {
  padding: 10px;
  h1 {
    margin: 10px;
  }
}
</style>
