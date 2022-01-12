<template>
  <Layout>
    <PageHeader :title="title" :items="items" />
    <div class="row">
      <div class="col-md-12">
        <div class="card">
          <div class="card-body col-md-8 mx-auto">            
              <div class="row">
                <div class="col-md-12">
                  <h2 class="card-title nice-title">Equipments Details</h2>
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
                      <td>{{ equipment.designation }}</td>
                    </tr>

                    <tr>
                      <td>
                        <b>
                          <h5>Email</h5>
                        </b>
                      </td>
                      <td>{{ equipment.marque }}</td>
                    </tr>

                    <tr>
                      <td>
                        <b>
                          <h5>Adresse</h5>
                        </b>
                      </td>
                      <td>{{ equipment.modele }}</td>
                    </tr>

                    <tr>
                      <td>
                        <b>
                          <h5>Telephone</h5>
                        </b>
                      </td>
                      <td>{{ equipment.fabricant }}</td>
                    </tr>
                     <tr>
                      <td>
                        <b>
                          <h5>Type de client</h5>
                        </b>
                      </td>
                      <td>{{ equipment.capacite }}</td>
                    </tr>
                     <tr>
                      <td>
                        <b>
                          <h5>Durée du contrat</h5>
                        </b>
                      </td>
                      <td>{{ equipment.affectation }}</td>
                    </tr>
                     <tr>
                      <td>
                        <b>
                          <h5>Echéance</h5>
                        </b>
                      </td>
                      <td>{{ equipment.situation_actuelle }}</td>
                    </tr>
                      <tr>
                      <td>
                        <b>
                          <h5>Echéance</h5>
                        </b>
                      </td>
                      <td>{{ equipment.derniere_intervention }}</td>
                    </tr>
                       <tr>
                      <td>
                        <b>
                          <h5>Echéance</h5>
                        </b>
                      </td>
                      <td>{{equipment.type_intervention }}</td>
                    </tr>
                       <tr>
                      <td>
                        <b>
                          <h5>Echéance</h5>
                        </b>
                      </td>
                      <td>{{ equipment.prochaine_interv_prev }}</td>
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
                        @click="onDelete(equipment.id)"
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
                        :to="{path: `/computers/edit/${equipment.id}`}"
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
    ...mapActions(["deleteEquipment", "getEquipmentById"]),
    onDelete(id) {
      this.$toasted.clear();
      this.$confirm(
        `do you want to delete computer ${this.equipment.name} ?`
      ).then(() => {
        this.deleteEquipment(id).then((deleted) => {
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
      equipment: (state) => state.equipment.equipment,
    }),
  },
  created() {
    this.$store.commit('EMPTY_EQUIPMENT');
    this.isLoading = true
    this.getEquipmentById(this.$route.params.id)
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