<template>
  <Layout>
    <PageHeader :title="title" :items="items" />
    <div class="row">
      <div class="col-md-12">
        <div class="card">
          <div class="card-body col-md-8 mx-auto">
            <div class="row">
              <div class="col-md-12">
                <h2 class="card-title nice-title mt-4">Create a Customer</h2>                
              </div>
            </div>
                                   
            <div class="mt-4 mb-4">
              <form @submit.prevent="onSubmit">
                <div class="row mt-4">
                  <div class="col">
                    <label>Name </label>
                    <input type="text" v-model.trim="forms.name" class="form-control" placeholder="Name" style="background-color: #f1f5fa" required>
                  </div>
                   <div class="col">
                    <label>Email </label>
                    <input type="text" v-model.trim="forms.email" class="form-control" placeholder="email" style="background-color: #f1f5fa" required>
                  </div>
                  <div class="col">
                    <label>Adresse </label>
                    <input type="text" v-model.trim="forms.address"  class="form-control" placeholder="Adresse" style="background-color: #f1f5fa" required>
                  </div>
                  <div class="col">
                    <label>Mot de passe </label>
                    <input type="text" v-model.trim="forms.password"  class="form-control" placeholder="Mot de Passe" style="background-color: #f1f5fa" required>
                  </div>
                  <div class="col">
                    <label>Type de client </label>
                    <input type="text" v-model.trim="forms.type_client"  class="form-control" placeholder="type_client" style="background-color: #f1f5fa" required>
                  </div>
                </div>

                <div class="row mt-3 mb-4">
                  <div class="col">
                    <label>Telephone </label>
                    <input type="text" v-model.trim="forms.phone" class="form-control" placeholder="telephone" style="background-color: #f1f5fa" required>
                  </div>
                  <div class="col">
                    <label>Durée du contrat </label>
                    <input type="text" v-model.trim="forms.duree_contrat"  class="form-control" placeholder="duree du contrat" style="background-color: #f1f5fa" required>
                  </div>
                   <div class="col">
                    <label>Echeance </label>
                    <input type="date" v-model.trim="forms.echeance"  class="form-control" placeholder="Price" style="background-color: #f1f5fa" required>
                  </div>
                </div>
                <hr>
                <div class="mt-4 mb-3">
                  <div class="row">
                    <div class="col-md-8">
                      <router-link :to="{ name: 'Customers'}" class="btn btn-outline-secondary">Retour</router-link>  
                    </div>

                    <div class="col-md-4 text-right">
                        <button class="btn btn-default text-danger" @click="cancel">
                          <strong>Cancel</strong>
                        </button>
                        <button v-if="this.isLoading === false" type="submit" class="btn btn-primary">Save</button>
                        <button class="btn btn-primary" type="button" v-else disabled>
                          <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                          Saving...
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
import { mapActions } from 'vuex';

/**
 * Dashboard Component
 */
export default {
  page: {
    title: "Utilisateurs",
    meta: [{ name: "description", content: appConfig.description }],
  },
  components: {
    Layout,
    PageHeader,
  },
  data() {
    return {
      customers: [],
      title: "Customers",
      items: [
        {
          text: "Dashboard",
        },
        {
          text: "Customers",
        },
        {
          text: "Create",
          active: true,
        },
      ],

    forms: {
    name:"",
    type_client:"",
    phone:"",
    duree_contrat:"",
    echeance:"",
    address:"",
    email:"",
    password:"",
      },

      isLoading: false
    };
  },

  methods: {
    ...mapActions(['createCustomer']),
    onSubmit(){
      this.$toasted.clear()
      this.isLoading = true
      this.createCustomer(this.forms).then(created => {
        if (created) {
          this.isLoading = false    
          this.$toasted.success('Customer as been added')      
          this.$router.push({ name: 'Customers'});
        } else {
          this.isLoading = false
          this.$toasted.error('An error has occured, please try again...')
        }
      })
    },

    cancel(){
    this.forms = {
    name:"",
    type_client:"",
    phone:"",
    duree_contrat:"",
    echeance:"",
    address:"",
    email:"",
    password:""
      }
    }
  },
  mounted(){
    console.log(process.env.VUE_APP_DEFAULT_URL);
  }
};
</script>


