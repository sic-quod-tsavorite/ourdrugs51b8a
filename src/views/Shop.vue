<template>
  <v-container id="rowCont">
    <div id="drug-table">
      <v-simple-table>
        <template v-slot:default>
          <thead>
            <th>
              <div class="drug-filter">
                <h2>Filter</h2>
                <div class="drug-filter-content">
                  <a @click="filterAll()">All</a>
                  <a @click="filterPills()">Pills</a>
                  <a @click="filterCannabis()">Cannabis</a>
                  <a @click="filterCrystal()">Crystal</a>
                  <a @click="filterPowder()">Powder</a>
                </div>
              </div>
            </th>
          </thead>
        </template>
      </v-simple-table>
    </div>
    <v-row justify="center" id="rowProd">
      <v-card id="products" v-for="item in itemFilter" :key="item.name">
        <v-img
          id="product_img"
          class="white--text"
          height=""
          :src="item.imgURL"
        >
        </v-img>
        <span>
          {{ item.name }}
        </span>
        <p>{{ item.price }} BTC</p>
        <v-btn color="orange accent-2" @click="addToBasket(item)">BUY</v-btn>
      </v-card>
    </v-row>
    <v-col offset-md="1" md="4" id="drugBasket" v-if="user">
      <h1>
        Basket
      </h1>
      <div id="info" class="pa-2">
        <v-simple-table
          fixed-header
          height="300px"
          id="menu-table"
          v-if="basket.length > 0"
        >
          <template v-slot:default>
            <thead>
              <tr>
                <th class="text-left" style="width:30%;">Quantity</th>
                <th class="text-left" style="width:50%;">Name of item</th>
                <th class="text-left" style="width:20%;">Price</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in basket" :key="item.name">
                <td>
                  <v-icon color="orange accent-2" @click="incrQtn(item)"
                    >add_box</v-icon
                  >
                  {{ item.quantity }}
                  <v-icon color="orange accent-2" @click="decrQtn(item)"
                    >indeterminate_check_box</v-icon
                  >
                </td>
                <td>{{ item.name }}</td>
                <td>{{ item.price }}</td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
        <v-simple-table v-else>
          <p>
            The basket is empty
          </p>
        </v-simple-table>
        <v-divider></v-divider>
        <v-row class="mt-4" style="height: unset;" id="basket_checkout">
          <v-col>
            <p>Subtotal:</p>
            <p>Delivery:</p>
            <p>Total amount:</p>
          </v-col>
          <v-col class="text-right">
            <p>{{ subTotal }} BTC</p>
            <p>0.0005 BTC</p>
            <p>
              <b>{{ total }} BTC</b>
            </p>
          </v-col>
        </v-row>
        <v-row style="height: unset;">
          <v-spacer></v-spacer>
          <v-btn color="orange accent-2" style="margin-right: 10px;"
            >Checkout</v-btn
          >
        </v-row>
      </div>
    </v-col>
  </v-container>
</template>

<script>
import { dbMenuAdd } from '../../firebase';
import firebase from 'firebase';
import 'firebase/firestore';

export default {
  data() {
    return {
      basket: [],
      menuItems: [],
      filterValue: '',
      user: null,
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
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.user = user;
      } else {
        this.user = null;
      }
    });
  },
  methods: {
    addToBasket(item) {
      if (this.basket.find((itemInArray) => item.name === itemInArray.name)) {
        item = this.basket.find(
          (itemInArray) => item.name === itemInArray.name
        );
        this.incrQtn(item);
      } else {
        this.basket.push({
          name: item.name,
          price: item.price,
          quantity: 1,
        });
      }
    },
    incrQtn(item) {
      item.quantity++;
    },
    decrQtn(item) {
      item.quantity--;

      if (item.quantity === 0) {
        this.basket.splice(this.basket.indexOf(item), 1);
      }
    },
    filterAll() {
      this.filterValue = '';
    },
    filterPills() {
      this.filterValue = 'pills';
    },
    filterCannabis() {
      this.filterValue = 'cannabis';
    },
    filterCrystal() {
      this.filterValue = 'crystal';
    },
    filterPowder() {
      this.filterValue = 'powder';
    },
  },
  computed: {
    subTotal() {
      var subCost = 0;
      for (var items in this.basket) {
        var individualItem = this.basket[items];
        subCost += individualItem.quantity * individualItem.price;
      }
      return subCost;
    },
    total() {
      var deliveryPrice = 0.0005;
      var totalCost = this.subTotal;
      return totalCost + deliveryPrice;
    },
    itemFilter() {
      return this.menuItems.filter((filterI) =>
        filterI.filter.includes(this.filterValue)
      );
    },
  },
};
</script>

<style lang="scss">
#rowCont {
  display: flex;
  justify-content: center;
}

#rowProd {
  max-width: 80vw;
  padding-top: 70px;
}
#products {
  margin: 15px;
  height: 376px;
  width: 310px;
  text-align: center;
  span {
    font-size: 1.6em;
    font-weight: bold;
  }
  p {
    position: absolute;
    left: 5px;
    bottom: 0;
    margin: 25px 30px;
  }
  .v-btn {
    position: absolute;
    right: 5px;
    bottom: 0;
    margin: 20px;
  }
}
#product_img {
  width: 100%;
  height: 65%;
}

#drug-table {
  position: absolute;
}

.drug-filter {
  background: rgb(17, 17, 17);
  padding: 5px;
  color: #fefefe;
}

.drug-filter-content {
  a {
    margin: 5px;
    color: #fefefe !important;
    transition-duration: 0.5s;
    &:hover {
      color: #ff6d00 !important;
      transition-duration: 0.5s;
    }
  }
}

#drugBasket {
  background-color: #fefefe;
  height: fit-content;
  border-radius: 7px;
  margin-top: 85px;
}
</style>
