<template>
  <Layout>
    <PageHeader :title="title" :items="items" />
    <div class="row">
      <div class="col-md-12">
        <div class="card">
          <div class="card-body col-md-8 mx-auto">
            <div class="row">
              <div class="col-md-12">
                <h2 class="card-title nice-title mt-4">Créer un employé</h2>
              </div>
            </div>

            <div class="mt-4 mb-4">
              <form @submit.prevent="onSubmit">
                <div class="row mt-4">
                  <div class="col">
                    <label>Nom </label>
                    <input
                      type="text"
                      v-model.trim="name"
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
                      v-model.trim="lastname"
                      class="form-control"
                      placeholder="ex: postnom"
                      style="background-color: #f1f5fa"
                      required
                    />
                  </div>
                  <div class="col">
                    <label>Prenom </label>
                    <input
                      type="text"
                      v-model.trim="firstname"
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
                      v-model.trim="email"
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
                      v-model.trim="phone"
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
                    <select v-model="gender" id="" class="form-control">
                      <option
                        v-for="genderOption in genderOptions"
                        :value="genderOption.value"
                        :key="genderOption.id"
                      >
                        {{ genderOption.label }}
                      </option>
                    </select>
                  </div>
                  <div class="col">
                    <label for="">Etat civil</label>
                    <select v-model="civilState" id="" class="form-control">
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
                      v-model.trim="birthday"
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
                      v-model.trim="contract_type"
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
                      v-model.trim="vacation"
                      class="form-control"
                      placeholder="Price"
                      style="background-color: #f1f5fa"
                      required
                    />
                  </div>
                  <div class="col">
                    <label for="">Adresse</label>
                    <textarea
                      v-model="address"
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
                        class="btn btn-default text-danger"
                        @click="cancel"
                      >
                        <strong>Cancel</strong>
                      </button>
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

      stateOptions: [
        { id: "st1", label: "Marié", value: "Marié" },
        { id: "st2", label: "Célibataire", value: "Célibataire" },
      ],

      name: "",
      lastname: "",
      firstname: "",
      email: "",
      phone: "",
      fonction: "",
      birthday: "",
      address: "",
      gender: "",
      civilState: "",
      contract_type: "",
      vacation: "",

      isLoading: false,
    };
  },

  methods: {
    ...mapActions(["storeEmployee"]),
    onSubmit() {
      this.$toasted.clear();
      this.isLoading = true;

      const data = {
        name: this.name,
        lastname: this.lastname,
        firstname: this.firstname,
        phone: this.phone,
        email: this.email,
        fonction: this.fonction,
        birthday: this.birthday,
        address: this.address,
        gender: this.gender,
        state: this.civilState,
        contract_type: this.contract_type,
        vacation: this.vacation
      };

      this.storeEmployee(data)
        .then((response) => {
          if (response) {
            this.$toasted.success("Employé(e) ajouté avec succès !");
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

    cancel() {
      this.name = "";
      this.email = "";
      this.phone = "";
      this.fonction = "";
      this.birthday = "";
      this.address = "";
    },
  },
  mounted() {
    console.log(process.env.VUE_APP_DEFAULT_URL);
  },
};
</script>


