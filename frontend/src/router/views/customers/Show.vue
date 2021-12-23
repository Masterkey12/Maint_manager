<template>
  <Layout>
    <PageHeader :title="title" :items="items" />
    <div class="row">
      <div class="col-md-12">
        <div class="card">
          <div class="card-body col-md-8 mx-auto">            
              <div class="row">
                <div class="col-md-12">
                  <h2 class="card-title nice-title">Customer Details</h2>
                </div>
              </div>
              <div class="mt-4">
                <table class="table table-striped">
                  <tbody>
                    <tr>
                      <td>
                        <b>
                          <h5>Name</h5>
                        </b>
                      </td>
                      <td>{{ customer.name }}</td>
                    </tr>

                    <tr>
                      <td>
                        <b>
                          <h5>Email</h5>
                        </b>
                      </td>
                      <td>{{ customer.email }}</td>
                    </tr>

                    <tr>
                      <td>
                        <b>
                          <h5>Adresse</h5>
                        </b>
                      </td>
                      <td>{{ customer.address }}</td>
                    </tr>

                    <tr>
                      <td>
                        <b>
                          <h5>Telephone</h5>
                        </b>
                      </td>
                      <td>{{ customer.phone }}</td>
                    </tr>
                     <tr>
                      <td>
                        <b>
                          <h5>Type de client</h5>
                        </b>
                      </td>
                      <td>{{ customer.type_client }}</td>
                    </tr>
                     <tr>
                      <td>
                        <b>
                          <h5>Durée du contrat</h5>
                        </b>
                      </td>
                      <td>{{ customer.duree_contrat }}</td>
                    </tr>
                     <tr>
                      <td>
                        <b>
                          <h5>Echéance</h5>
                        </b>
                      </td>
                      <td>{{ customer.echeance }}</td>
                    </tr>
                  </tbody>
                </table>

                <div class="mt-4 mb-3">
                  <div class="row">
                    <div class="col-md-8">
                      <router-link
                        :to="{ name: 'Customers'}"
                        class="btn btn-outline-secondary"
                      >Retour</router-link>
                    </div>

                    <div class="col-md-4 text-right">
                      <button
                        type="submit"
                        class="btn btn-default text-danger"
                        v-if="this.isDeleting === false"
                        @click="onDelete(customer.id)"
                      >Delete</button>
                      <button class="btn btn-primary" type="button" v-else disabled>
                        <span
                          class="spinner-border spinner-border-sm"
                          role="status"
                          aria-hidden="true"
                        ></span>
                        Deleting...
                      </button>
                      <router-link
                        :to="{path: `/computers/edit/${customer.id}`}"
                        class="btn btn-info"
                      >Edit</router-link>
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
      title: "Computers",
      items: [
        {
          text: "Dashboard",
        },
        {
          text: "Computers",
        },
        {
          text: "Create",
          active: true,
        },
      ],

      isLoading: false,
      isDeleting: false
    };
  },

  methods: {
    ...mapActions(["deleteCustomer", "getCustomerById"]),
    onDelete(id) {
      this.$toasted.clear();
      this.$confirm(
        `do you want to delete computer ${this.customer.name} ?`
      ).then(() => {
        this.deleteCustomer(id).then((deleted) => {
          if (deleted) {
            this.isDeleting = true;
            this.$toasted.success("Customer as been deleted");
            this.$router.push({ name: "Customers" });
          } else {
            this.isDeleting = false;
          }
        });
      });
    },
  },
  computed: {
    ...mapState({
      customer: (state) => state.customer.customer,
    }),
  },
  created() {
    this.$store.commit('EMPTY_CUSTOMER')
    this.isLoading = true
    this.getCustomerById(this.$route.params.id)
    .then(loaded => {
      if (loaded) {
        this.isLoading = false
      }else {        
        this.isLoading = false
      }
    });
  },
};
</script>