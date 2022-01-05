<template>
  <Layout>
    <PageHeader :title="title" :items="items" />
    <div class="row">
      <div class="col-md-12">
        <div class="card">
          <div class="card-body col-md-8 mx-auto">
            <div class="row">
              <div class="col-md-12">
                <h2 class="card-title nice-title">Edit customer</h2>
              </div>
            </div>
                                   
            <div class="mt-4 mb-4">
              <form @submit.prevent="onSubmit">
                <div class="row mt-4">
                  <div class="col">
                    <label>Nom: </label>
                    <input type="text" v-model.trim="customer.name" class="form-control" placeholder="Name" style="background-color: #f1f5fa" required>
                  </div>
                  <div class="col">
                    <label>Email: </label>
                    <input type="text" v-model.trim="customer.email"  class="form-control" placeholder="Model" style="background-color: #f1f5fa" required>
                  </div>
                </div>

                <div class="row mt-4">
                  <div class="col">
                    <label>Adresse : </label>
                    <input type="text" v-model.trim="customer.address" class="form-control" placeholder="Generation" style="background-color: #f1f5fa" required>
                  </div>
                  <div class="col">
                    <label>Telephone : </label>
                    <input type="text" v-model.trim="customer.phone"  class="form-control" placeholder="Price" style="background-color: #f1f5fa" required>
                  </div>
                   <div class="col">
                    <label>Type de client : </label>
                    <input type="text" v-model.trim="customer.type_client"  class="form-control" placeholder="Price" style="background-color: #f1f5fa" required>
                  </div>
                   <div class="col">
                    <label>Durée de contrat : </label>
                    <input type="text" v-model.trim="customer.duree_contrat"  class="form-control" placeholder="Price" style="background-color: #f1f5fa" required>
                  </div>
                  <div>
                    <label> Echeance : </label>
                    <input type="date" v-model.trim="customer.echeance" class="form-control" placeholder="Generation" style="background-color: #f1f5fa" required>
                  </div>
                </div>
                <hr>
                <div class="mt-4 mb-3">
                  <div class="row">
                    <div class="col-md-8">
                      <router-link :to="{ name: 'Customers'}" class="btn btn-outline-secondary">Retour</router-link>
                    </div>

                    <div class="col-md-4 text-right">
                        <!-- <button class="btn btn-default" @click="cancel()">Cancel</button> -->
                        <button type="submit" v-if="!isLoading" class="btn btn-primary">Save</button>
                        <button class="btn btn-primary" type="button" v-else disabled>
                          <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                          Updating...
                        </button>
                    </div>
                  </div>
                </div>
              </form>
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
import { mapActions, mapState } from 'vuex';
/**
 * Dashboard Component
 */
export default {
  page: {
    title: "Customers",
    meta: [{ name: "description", content: appConfig.description }],
  },
  components: {
    Layout,
    PageHeader,
  },
  data() {
    return {
      title: "Customer",
      items: [
        {
          text: "Dashboard",
        },
        {
          text: "Customers",
        },
        {
          text: "Edit",
          active: true,
        },
      ],

      isLoading: false
    };
  },

  computed: {
    ...mapState({
      customer: state => state.customer.customer
    }),
  },

  methods: {
    ...mapActions(['updateCustomer', 'getCustomerById']),
    onSubmit(){
      this.$toasted.clear()
      this.isLoading = true
      this.updateCustomer(this.customer).then(updated => {
        if(updated) {
          this.isLoading = false
          this.$toasted.success('Customer as been updated')      
          this.$router.push({ name: 'Customers'});
        }
        else {
          this.isLoading = false
          this.$toasted.error('An error has occured, please try again')
        }
      });
      
    },
  },
  created() {
    this.getCustomerById(this.$route.params.id)
  },
};
</script>


