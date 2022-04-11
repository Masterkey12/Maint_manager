<template>
  <Layout>
    <PageHeader :title="title" :items="items" />
    <div class="row">
      <div class="col-md-12">
        <div class="card">
          <div class="card-body">
            <div class="row">
              <div class="col-md-6">
                <h2 class="card-title nice-title">List of customers</h2>
              </div>
              <div class="col-md-6 text-right">
                <router-link :to=" { name: 'CreateCustomer' } " class="btn btn-primary">
                  <i class="bx bx-plus"></i>
                  Create Customer
                </router-link>
              </div>
            </div>
            <div class="q-pa-md">
              <v-sheet v-if="isLoading">
                <v-skeleton-loader type="table-tbody" ></v-skeleton-loader>
              </v-sheet>
              <table class="table table-condensed table-hover" v-else-if="customers.length > 0">
                <thead class="thead-light">
                  <tr>
                    <th >#</th>
                    <th class="text-left">Nom</th>
                    <th class="text-left">Adresse</th>
                    <th class="text-left">Email</th>
                    <th class="text-left">Telephone</th>
                    <th class="text-left">Type de Client </th>
                    <th class="text-left">Echéance</th>
                    <th class="text-left">Durée du contrat </th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="customer in customers" :key="customer.id">
                    <th scope="row">{{customer.id}}</th>
                    <td>{{ customer.name }}</td>
                    <td>{{ customer.address }}</td>
                    <td>{{ customer.email }}</td>
                    <td>{{ customer.phone }}</td>
                    <td>{{ customer.type_client }}</td>
                    <td>{{ customer.echeance }}</td>
                    <td>{{ customer.duree_contrat }}</td>


                    <td class="text-right">
                      <b-dropdown
                        class="card-drop"
                        variant="white"
                        right
                        toggle-class="p-0"
                      >
                        <template v-slot:button-content>
                          <i class="mdi mdi-dots-horizontal font-size-18"></i>
                        </template>
                        <!-- <b-dropdown-item
                          @click="
                            $router.push({
                              path: `/employees/edit/${employee.id}`,
                            })
                          "
                          >Modifier</b-dropdown-item
                        > -->
                        <b-dropdown-item
                          @click="
                            $router.push({
                              path: `/customer/show/${customer.id}`,
                            })
                          "
                          >Afficher</b-dropdown-item
                        >
                        <b-dropdown-item
                          @click="$router.push({
                            path: `/customer/edit/${customer.id}`
                          })"
                          >Modifier</b-dropdown-item
                        >
                      </b-dropdown>
                      <!-- <router-link :to="{ path: `/customer/show/${customer.id}`}"  class="btn btn-success btn-sm mr-2" >Show</router-link> -->
                      <!-- <router-link :to="{ path: `/customer/edit/${customer.id}`}"  class="btn btn-primary btn-sm mr-2" >Edit</router-link>                       -->
                    </td>
                  </tr>
                </tbody>
              </table>
              <div class="text-center" v-else>
                <img src="../../../assets/images/animations/empty_state.gif" alt="" /> 
                <h3 class="text-center">No computers</h3>
                <p class="mt-2">
                    The list of computers is empty, no computer has been added yet.
                </p>                 
              </div>  
                <div class="row mb-4">
                <div class="col-md-12">
                  <div class="text-center">
                    <jw-pagination
                      :pageSize="pageSize"
                      :items="customers"
                      @changePage="onChangePage"
                      :labels="labels"
                      class="text-center"
                    ></jw-pagination>
                  </div>
                </div>
              </div>                            
            </div>
          </div>
        </div>
      </div>      
    </div>      
  </Layout>
</template>


<script>
import Layout from "../../layouts/main";
import appConfig from "@/app.config";
import PageHeader from "@/components/page-header";
import { mapActions, mapState } from "vuex";

/**
 * Dashboard Component
 */
export default {
  page: {
    title: "Computers",
    meta: [{ name: "description", content: appConfig.description }],
  },
  components: {
    Layout,
    PageHeader,
  },
  data() {
    return {
      isLoading: false,
      title: "Computers",
      items: [
        {
          text: "Dashboard",
        },
        {
          text: "Computers",
        },
        {
          text: "List",
          active: true,
        },
      ],
        labels: {
        first: "<<",
        last: ">>",
        next: ">",
        previous: "<",
      },
      bool: false,
      pageOfItems: [],
      pageSize: 5,
    };
  },
  methods: {
    ...mapActions(["getCustomers"]),
    show(customerId) {
      this.$router.push({ path: `/customers/show/${customerId}` });
    },

    edit(customerId) {
      this.$router.push({ path: `/customers/edit/${customerId}` });
    },
      onChangePage(pageOfItems) {
      this.pageOfItems = pageOfItems;
      console.log(" items:" + this.pageOfItems);
    },
    toggle: function () {
      this.required = !this.required;
    },
  },
  computed: {
    ...mapState({
      customers: (state) => state.customer.customers,
    }),
  },
  created(){    
    this.isLoading = true    
    setTimeout(() => {
      this.$toasted.clear()
    }, 2000)
    this.getCustomers().then(loaded => {
      if (loaded) {                
        this.isLoading = false
      } else {
        // TODO: display error notifications
      }
    });
  },
};
</script>



