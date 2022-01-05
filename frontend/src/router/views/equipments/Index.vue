<template>
  <Layout>
    <PageHeader :title="title" :items="items" />
    <div class="row">
      <div class="col-md-12">
        <div class="card">
          <div class="card-body">
            <div class="row">
              <div class="col-md-6">
                <h2 class="card-title nice-title">List of equipments</h2>
              </div>
              <div class="col-md-6 text-right">
                <router-link :to=" { name: 'CreateEquipment' } " class="btn btn-primary">
                  <i class="bx bx-plus"></i>
                  Create Equipment
                </router-link>
              </div>
            </div>
            <div class="q-pa-md">
              <v-sheet v-if="isLoading">
                <v-skeleton-loader type="table-tbody" ></v-skeleton-loader>
              </v-sheet>
              <table class="table table-condensed table-hover" v-else-if="equipments.length > 0">
                <thead class="thead-light">
                  <tr>
                    <th >#</th>
                    <th class="text-left">Designation</th>
                    <th class="text-left">Marque</th>
                    <th class="text-left">Modele</th>
                    <th class="text-left">Fabricant</th>
                    <th class="text-left">Capacité</th>
                    <th class="text-left">Affectation</th>
                    <th class="text-left">Situation actuelle</th>
                    <th class="text-left">Dernière intervention </th>
                    <th class="text-left">Type d'intervention </th>
                    <th class="text-left">Prochaine Intervention </th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="equipment in equipments" :key="equipment.id">
                    <th scope="row">{{equipment.id}}</th>
                    <td>{{ equipment.designation }}</td>
                    <td>{{ equipment.marque }}</td>
                    <td>{{ equipment.modele }}</td>
                    <td>{{ equipment.fabricant }}</td>
                    <td>{{ equipment.capacite }}</td>
                    <td>{{ equipment.affectation }}</td>
                    <td>{{ equipment.situation_actuelle }}</td>
                    <td>{{ equipment.derniere_intervention  }}</td>
                    <td>{{ equipment.type_intervention }}</td>
                    <td>{{ equipment.prochaine_interv_prev}}</td>


                    <td class="text-right">
                      <router-link :to="{ path: `/customer/show/${equipment.id}`}"  class="btn btn-success btn-sm mr-2" >Show</router-link>
                      <router-link :to="{ path: `/customer/edit/${equipment.id}`}"  class="btn btn-primary btn-sm mr-2" >Edit</router-link>                      
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
    title: "Equipments",
    meta: [{ name: "description", content: appConfig.description }],
  },
  components: {
    Layout,
    PageHeader,
  },
  data() {
    return {
      isLoading: false,
      title: "Equipments",
      items: [
        {
          text: "Dashboard",
        },
        {
          text: "Equipments",
        },
        {
          text: "List",
          active: true,
        },
      ],
      bool: false,
    };
  },
  methods: {
    ...mapActions(["getEquipments"]),
    show(customerId) {
      this.$router.push({ path: `/customers/show/${customerId}` });
    },

    edit(customerId) {
      this.$router.push({ path: `/customers/edit/${customerId}` });
    },
  },
  computed: {
    ...mapState({
      equipments: (state) => state.equipment.equipments,
    }),
  },
  created(){    
    this.isLoading = true    
    setTimeout(() => {
      this.$toasted.clear()
    }, 2000)
    this.getEquipments().then(loaded => {
      if (loaded) {                
        this.isLoading = false
      } else {
        // TODO: display error notifications
      }
    });
  },
};
</script>



