<template>
  <Layout>
    <PageHeader :title="title" :items="items" />
    <div class="row">
      <div class="col-md-12">
        <div class="card">
          <div class="card-body col-md-8 mx-auto">
            <div class="row">
              <div class="col-md-12">
                <h2 class="card-title nice-title">Reset Password</h2>
              </div>
            </div>
             <div class="mt-4 mb-4">
              <form @submit.prevent="onSubmit">
                <div class="row mt-4">
                  <div class="col">
                    <label>Current Password </label>
                    <input type="password" v-model.trim="forms.CurrentPassword" class="input-lg form-control" placeholder="CurrentPassword" style="background-color: #f1f5fa" required>
                  </div>
                  <div class="col">
                    <label>New Password : </label>
                    <input type="password" v-model.trim="forms.NewPassword"  class="input-lg form-control" placeholder="New Password" style="background-color: #f1f5fa" required>
                  </div>
                </div>

                <div class="row mt-3 mb-4">
                <div class="col">
                    <label>New Password : </label>
                    <input type="password" v-model.trim="forms.NewPassword"  class="input-lg form-control" placeholder="New Password" style="background-color: #f1f5fa" required>
                  </div>
                </div>
                <hr>
                <div class="mt-4 mb-3">
                  <div class="row">
                    <div class="col-md-8">
                      <router-link :to="{ name: 'Profile'}" class="btn btn-secondary">Back to profile</router-link>  
                    </div>

                    <div class="col-md-4 text-right">
                        <button class="btn btn-default" @click="cancel()">Cancel</button>
                        <button v-if="this.isLoading === false" type="submit" class="btn btn-primary">Update</button>
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
// import axios from 'axios';
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
      computers: [],
      title: "Reset Password",
      items: [
        {
          text: "profile",
        },
        {
          text: "Reset",
          active: true,
        },
      ],

      forms: {
        name: "",
        model: "",
        generation: "",
        price: ""
      },

      isLoading: false
    };
  },

  methods: {
    ...mapActions(['createComputer']),
    onSubmit(){
      this.isLoading = true
      this.createComputer(this.forms).then(created => {
        if (created) {
          this.isLoading = false          
          this.$router.push({ name: 'Computers'});
        } else {
          this.isLoading = false
        }
      })
    },

    cancel(){
      this.forms = {
        name: "",
        model: "",
        generation: "",
        price: ""
      }
    }
  },
  mounted(){
    console.log(process.env.VUE_APP_DEFAULT_URL);
  }
};
</script>
