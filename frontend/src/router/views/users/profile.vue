<template>
  <Layout>
    <PageHeader :title="title" />
    <div class="row">
      <div class="col-md-5">
        <div class="card">
          <div class="card-body">                       
            <div class="mt-4">
              <div class="col-md-12 text-center">
                <img src="@/assets/images/users/avatar-3.jpg" class="rounded-circle" alt="">
              </div>
              <div class="text-center mt-4">
                <h2>Username</h2>
                <!-- <input type="file" class="btn btn-primary"> -->
                <div class="input-group mb-3 rounded-pill bg-white mx-auto">
                    <input id="upload" type="file" onchange="readURL(this);" class="form-control border-0" hidden>
                    <label id="upload-label" for="upload" class="font-weight-light text-muted" hidden>Modifier la photo</label>
                    <div class="input-group-append mx-auto">
                        <label for="upload" class="btn btn-primary m-0 rounded-pill px-4"> <i class="fa fa-cloud-upload mr-2 text-light"></i><small class="text-uppercase font-weight-bold">Modifier la photo</small></label>
                    </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-7">
        <div class="card">
          <div class="card-body">
            <div class="row">
              <div class="col-md-6">
                <h5 class="card-title nice-title">Détails du profil</h5>
              </div>
            </div>                        
            <div class="col-md-12 mt-2">
              <div class="mt-4 mb-4">
                <form @submit.prevent="onSubmit">
                  <div class="row mt-4">
                    <div class="col">
                      <label>Prénom : </label>
                      <input type="text" v-model.trim="user.name" class="form-control" placeholder="Prénom" style="background-color: #f1f5fa" required>
                    </div>
                    <div class="col">
                      <label>Nom : </label>
                      <input type="text" v-model.trim="user.lastname"  class="form-control" placeholder="Nom" style="background-color: #f1f5fa" required>
                    </div>
                  </div>

                  <div class="row mt-2 mb-4">
                    <div class="col-md-12">
                      <label>Email : </label>
                      <input type="text" v-model.trim="user.email" class="form-control" placeholder="E-mail" style="background-color: #f1f5fa" required>
                    </div>
                    <div class="col-md-12 mt-2">
                      <label>Téléphone : </label>
                      <input type="number" v-model.number="user.phone"  class="form-control" placeholder="Téléphone" style="background-color: #f1f5fa" required>
                    </div>
                  </div>
                  <hr>
                  <div class="mt-4 mb-3">
                    <div class="row">
                      <div class="col-md-8">
                        <router-link :to="{ name: 'Computers'}" class="btn btn-secondary">Retour à la liste</router-link>  
                      </div>

                      <div class="col-md-4 text-right">
                          <button class="btn btn-default" @click="cancel()">Annuler</button>
                          <button v-if="!this.isLoading" type="submit" class="btn btn-primary">Mettre à jour</button>
                          <button class="btn btn-primary" type="button" v-else disabled>
                            <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                            Veuillez patienter...
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
    </div>         
  </Layout>
</template>

<script>
import Layout from "../../layouts/main";
import PageHeader from "@/components/page-header";
import { mapActions, mapState } from 'vuex';

export default {
    name: 'Profile',
    components: {
      Layout,
      PageHeader
    },
    data() {
      return {
        title: 'User profile',
        picture: 'Picture name',
        isLoading: false
      }
    },
    computed: {
      ...mapState({
        user: state => state.user.user
      })
    },
    methods: {
      ...mapActions(['updateUser', 'getUserById']),
      onSubmit() {
        this.isLoading = true;
        this.updateUser(this.user).then(updated => {
          if (updated) {
            this.isLoading = false          
            this.$toasted.success('Profil modifié avec succès') 
          } else {
            this.$toasted.error('Une erreur est survenue. Réessayez svp !')
            this.isLoading = false
          }
        })
      }
    },
    created() {
      this.getUserById(this.$route.params.id);
    },

}
</script>

<style>

</style>