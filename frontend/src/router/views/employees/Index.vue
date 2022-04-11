<template>
  <Layout>
    <PageHeader :title="title" :items="items" />
    <div class="row">
      <div class="col-md-12">
        <div class="card">
          <div class="card-body">
            <div class="row">
              <div class="col-md-6">
                <h2 class="card-title nice-title">Liste des personnels</h2>
              </div>
              <div class="col-md-6 text-right">
                <router-link
                  :to="{ name: 'CreateEmployee' }"
                  class="btn btn-primary"
                >
                  <i class="bx bx-plus"></i>
                  Ajouter un personnel
                </router-link>
              </div>
            </div>
            <div class="q-pa-md">
              <div v-if="isLoading">loading</div>
              <!-- <v-sheet v-if="isLoading">
                <v-skeleton-loader type="table-tbody" ></v-skeleton-loader>
              </v-sheet> -->
              <table
                class="table table-condensed table-hover"
                v-else-if="employees.length > 0"
              >
                <thead class="thead-light">
                  <tr>
                    <th>#</th>
                    <th class="text-left">Nom</th>
                    <th class="text-left">Adresse</th>
                    <th class="text-left">Email</th>
                    <th class="text-left">Telephone</th>
                    <th class="text-left">Type de contrat</th>
                    <th class="text-left">Genre</th>
                    <th class="text-left">Etat civil</th>
                    <th class="text-left">Congé</th>
                    <th class="text-left">Date de naissance</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(employee, index) in employees" :key="employee.id">
                    <th scope="row">{{ index + 1 }}</th>
                    <td>
                      {{
                        employee.name +
                        " " +
                        employee.lastname +
                        " " +
                        employee.firstname
                      }}
                    </td>
                    <td>{{ employee.address }}</td>
                    <td>{{ employee.email }}</td>
                    <td>{{ employee.phone }}</td>
                    <td>{{ employee.contract_type }}</td>
                    <td>{{ employee.gender }}</td>
                    <td>{{ employee.state }}</td>
                    <td>{{ employee.vacation }}</td>
                    <td>{{ employee.birthday }}</td>
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
                        <b-dropdown-item
                          @click="
                            $router.push({
                              path: `/employees/edit/${employee.id}`,
                            })
                          "
                          >Modifier</b-dropdown-item
                        >
                        <!-- <b-dropdown-item
                          @click="
                            $router.push({
                              path: `/employees/show/${employee.id}`,
                            })
                          "
                          >Afficher</b-dropdown-item
                        > -->
                        <b-dropdown-item
                          @click="deletePersonal(employee.id)"
                          >Supprimer</b-dropdown-item
                        >
                      </b-dropdown>
                    </td>
                  </tr>
                </tbody>
              </table>
              <div class="text-center" v-else>
                <img
                  src="../../../assets/images/animations/empty_state.gif"
                  alt=""
                />
                <h3 class="text-center">Pas d'employés enregistré</h3>
                <p class="mt-2">
                 La liste des employés est vide.
                </p>
              </div>
              <div class="row mb-4">
                <div class="col-md-12">
                  <div class="text-center">
                    <!-- <jw-pagination
                      :pageSize="pageSize"
                      :items="employees"
                      @changePage="onChangePage"
                      :labels="labels"
                      class="text-center"
                    ></jw-pagination> -->
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

// const employees = [
//     {id: 1, name: "Employee 1 Employee 1 Employee 1", address: "Kipushi", email: "employee1@gmail.com", phone: "+0000000000", function: "RH", birthday: "28-10-1997"},
//     {id: 2, name: "Employee 2 Employee 2 Employee 2", address: "Kipushi", email: "employee2@gmail.com", phone: "+0000000000", function: "RH", birthday: "28-10-1997"}
// ];

/**
 * Dashboard Component
 */
export default {
  page: {
    title: "Employees",
    meta: [{ name: "description", content: appConfig.description }],
  },
  components: {
    Layout,
    PageHeader,
  },
  data() {
    return {
      isLoading: false,
      title: "Employees",
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
    ...mapActions(["getEmployees", "deleteEmployee"]),
    deletePersonal(id) {
      this.deleteEmployee(id)
        .then(() => {
        })
        .finally(() => {
        });
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
      employees: (state) => state.employee.employees,
    }),
  },
  created() {
    this.isLoading = true;
    setTimeout(() => {
      this.$toasted.clear();
    }, 2000);

    this.getEmployees().finally(() => {
      this.isLoading = false;
    });
  },
};
</script>