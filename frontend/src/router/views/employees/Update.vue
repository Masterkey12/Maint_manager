<template>
  <Layout>
    <PageHeader :title="title" :items="items" />
    <div class="row">
      <div class="col-md-12">
        <div class="card">
          <div class="card-body col-md-8 mx-auto">
            <div class="row">
              <div class="col-md-12">
                <h2 class="card-title nice-title mt-4">Modifier un employé</h2>
              </div>
            </div>
            <div class="mt-4 mb-4">
              <form @submit.prevent="onSubmit">
                <div class="row mt-4">
                  <div class="col">
                    <label>Nom </label>
                    <input
                      type="text"
                      v-model="emp.name"
                      class="form-control"
                      placeholder="ex: Mumba"
                      style="background-color: #f1f5fa"
                      required
                    />
                  </div>
                  <div class="col">
                    <label>Post-nom </label>
                    <input
                      type="text"
                      v-model.trim="employee.lastname"
                      class="form-control"
                      placeholder="ex: Mumba"
                      style="background-color: #f1f5fa"
                      required
                    />
                  </div>
                  <div class="col">
                    <label>Prenom </label>
                    <input
                      type="text"
                      v-model.trim="employee.firstname"
                      class="form-control"
                      placeholder="ex: Henry"
                      style="background-color: #f1f5fa"
                      required
                    />
                  </div>
                </div>
                <hr />
                <div class="row mt-3 mb-3">
                  <div class="col">
                    <label>Email </label>
                    <input
                      type="text"
                      v-model.trim="employee.email"
                      class="form-control"
                      placeholder="email"
                      style="background-color: #f1f5fa"
                      required
                    />
                  </div>
                  <div class="col">
                    <label>Téléphone </label>
                    <input
                      type="text"
                      v-model.trim="employee.phone"
                      class="form-control"
                      placeholder=""
                      style="background-color: #f1f5fa"
                      required
                    />
                  </div>
                </div>
                <hr />
                <div class="row mt-3 mb-3">
                  <div class="col">
                    <label for="">Genre</label>
                    <select v-model="employee.gender" id="" class="form-control">
                      <option
                        v-for="genderOption in genderOptions"
                        :value="genderOption.value"
                        :key="genderOption.id"
                      >
                        {{ genderOption.value }}
                      </option>
                    </select>
                  </div>
                  <div class="col">
                    <label for="">Etat civil</label>
                    <select v-model="employee.state" id="" class="form-control">
                      <option
                        v-for="stateOption in stateOptions"
                        :value="stateOption.value"
                        :key="stateOption.id"
                      >
                        {{ stateOption.label }}
                      </option>
                    </select>
                  </div>
                  <div class="col">
                    <label>Date de naissance </label>
                    <input
                      type="date"
                      v-model.trim="employee.birthday"
                      class="form-control"
                      placeholder="Price"
                      style="background-color: #f1f5fa"
                      required
                    />
                  </div>
                </div>
                <hr />
                <div class="row mt-3 mb-4">
                  <div class="col">
                    <label>Fonction </label>
                    <input
                      type="text"
                      v-model.trim="fonction"
                      class="form-control"
                      placeholder="ex: ressources humaines"
                      style="background-color: #f1f5fa"
                      required
                    />
                  </div>
                  <div class="col">
                    <label>Type de contrat </label>
                    <input
                      type="text"
                      v-model.trim="employee.contract_type"
                      class="form-control"
                      placeholder="ex: journalier"
                      style="background-color: #f1f5fa"
                      required
                    />
                  </div>
                </div>
                <hr />
                <div class="row mt-4 mb-4">
                  <div class="col">
                    <label>vacances </label>
                    <input
                      type="date"
                      v-model.trim="employee.vacation"
                      class="form-control"
                      placeholder="Price"
                      style="background-color: #f1f5fa"
                      required
                    />
                  </div>
                  <div class="col">
                    <label for="">Adresse</label>
                    <textarea
                      v-model="employee.address"
                      id=""
                      cols="5"
                      rows="1"
                      class="form-control"
                    ></textarea>
                  </div>
                </div>
                <div class="mt-4 mb-3">
                  <div class="row">
                    <div class="col-md-8">
                      <router-link
                        :to="{ name: 'Customers' }"
                        class="btn btn-outline-secondary"
                        >Retour</router-link
                      >
                    </div>

                    <div class="col-md-4 text-right">
                      <button
                        v-if="this.isLoading === false"
                        type="submit"
                        class="btn btn-primary"
                      >
                        Save
                      </button>
                      <button
                        class="btn btn-primary"
                        type="button"
                        v-else
                        disabled
                      >
                        <span
                          class="spinner-border spinner-border-sm"
                          role="status"
                          aria-hidden="true"
                        ></span>
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
import { mapActions } from "vuex";

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
      genderOptions: [
        { id: "g1", label: "Homme", value: "M" },
        { id: "g2", label: "Femme", value: "F" },
      ],
      contract_types: [
        { id: "ct1", label: "Employée", value: "Employée"},
        { id: "ct1", label: "Journalier"},
        { id: "ct1", label: "Sous-traitant"}
      ],
      stateOptions: [
        { id: "st1", label: "Marié", value: "Married" },
        { id: "st2", label: "Célibataire", value: "Unmaried" },
      ],
      fonction: "",
      employee: {},
      emp: {},
      isLoading: false,
    };
  },

  computed: {
    // ...mapState({
    //   employee: (state) => state.employee.employee
    // })
  },
  methods: {
    ...mapActions(["getEmployee", "updateEmployee"]),
    onSubmit() {
      this.$toasted.clear();
      this.isLoading = true;

      console.log("employee on update : ", this.employee);
      this.updateEmployee(this.employee)
        .then((response) => {
          if (response) {
            this.$toasted.success("Employé(e) modifié avec succès !");
            this.$router.push({ name: "Employees" });
          }
        })
        .catch(() => {
          this.$toasted.error(
            "Une erreur est survenue, veuillez réessayer s'il vous plait!"
          );
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
  },
  mounted() {
    console.log(process.env.VUE_APP_DEFAULT_URL);
  },
  created() {
    // this.getEmployee(this.$route.params.id)
    // .then((response) => {
    //     this.employee = response.data;
    // });

    this.$store.dispatch("getEmployee", this.$route.params.id)
    .then((response) => {
      console.log("response : ", response.data);
      this.emp = response.data;
    })
    .finally(() => {
      console.log("employee : ", this.employee);
    });
  },
};
</script>


