<template>
  <Layout>
    <PageHeader :title="title" :items="items" />
    <div class="row">
      <div class="col-md-12">
        <div class="card">
          <div class="card-body col-md-8 mx-auto">
            <div class="row">
              <div class="col-md-12">
                <h2 class="card-title nice-title mt-4">Create a Equipment</h2>
              </div>
            </div>

            <div class="mt-4 mb-4">
              <form @submit.prevent="onSubmit">
                <div class="row mt-4">
                  <div class="col">
                    <label>Designation </label>
                    <input
                      type="text"
                      v-model.trim="forms.designation"
                      class="form-control"
                      placeholder="designation"
                      style="background-color: #f1f5fa"
                      required
                    />
                  </div>
                  <div class="col">
                    <label>Marque </label>
                    <input
                      type="text"
                      v-model.trim="forms.marque"
                      class="form-control"
                      placeholder="marque"
                      style="background-color: #f1f5fa"
                      required
                    />
                  </div>
                  <div class="col">
                    <label>Modele </label>
                    <input
                      type="text"
                      v-model.trim="forms.modele"
                      class="form-control"
                      placeholder="modele"
                      style="background-color: #f1f5fa"
                      required
                    />
                  </div>
                  <div class="col">
                    <label>Fabricant</label>
                    <input
                      type="text"
                      v-model.trim="forms.fabricant"
                      class="form-control"
                      placeholder="fabricant"
                      style="background-color: #f1f5fa"
                      required
                    />
                  </div>
                  <div class="col">
                    <label>Capacité </label>
                    <input
                      type="text"
                      v-model.trim="forms.capacite"
                      class="form-control"
                      placeholder="capacite"
                      style="background-color: #f1f5fa"
                      required
                    />
                  </div>
                  <div class="row mt-4">
                    <div class="col">
                      <label>Affectation </label>
                      <input
                        type="text"
                        v-model.trim="forms.affectation"
                        class="form-control"
                        placeholder="affectation"
                        style="background-color: #f1f5fa"
                        required
                      />
                    </div>
                    <div class="col">
                      <label>Situation actuelle </label>
                      <select
                        name="cars"
                        id="cars"
                        v-model.trim="forms.situation_actuelle"
                        class="form-control"
                        placeholder="situation_actuelle"
                        style="background-color: #f1f5fa"
                      >
                        <option
                          v-for="(
                            situation_actuelle, index
                          ) in situation_actuelles"
                          :key="index"
                          :value="situation_actuelle.value"
                        >
                          {{ situation_actuelle.situation_actuelle }}
                        </option>
                      </select>
                    </div>
                    <div class="col">
                      <label>Dernière intervention </label>
                      <input
                        type="date"
                        v-model.trim="forms.derniere_intervention"
                        class="form-control"
                        placeholder="derniere_intervention"
                        style="background-color: #f1f5fa"
                        required
                      />
                    </div>
                    <div class="col">
                      <label>Type d'intervention </label>
                      <select
                        name="cars"
                        id="cars"
                        v-model.trim="intervention_type"
                        class="form-control"
                        style="background-color: #f1f5fa"
                      >
                        <option
                          v-for="(
                            type_intervention, index
                          ) in type_interventions"
                          :key="index"
                          :value="type_intervention.value"
                        >
                          {{ type_intervention.type_intervention }}
                        </option>
                      </select>
                    </div>
                    <div v-if="show_prev_interv" class="col">
                      <label>Prochaine Intervention</label>
                      <input
                        type="date"
                        v-model.trim="next_prev_interv"
                        class="form-control"
                        placeholder="Prochaine Intervention"
                        style="background-color: #f1f5fa"
                        required
                      />
                    </div>
                  </div>
                </div>
                <div class="mt-4 mb-3">
                  <div class="row">
                    <div class="col-md-8">
                      <router-link
                        :to="{ name: 'Equipments' }"
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
      equipments: [],
      title: "Equipments",
      items: [
        {
          text: "Dashboard",
        },
        {
          text: "Equipments",
        },
        {
          text: "Create",
          active: true,
        },
      ],

      forms: {
        designation: "",
        marque: "",
        modele: "",
        fabricant: "",
        capacite: "",
        affectation: "",
        situation_actuelle: "",
        type_intervention: "",
        derniere_intervention: "",
        prochaine_interv_prev: "",
      },
      type_interventions: [
        { type_intervention: "preventif", value: "preventive" },
        { type_intervention: "operationnel", value: "operationnel" },
        { type_intervention: "correctif", value: "correctif" },
      ],
      situation_actuelles: [
        { situation_actuelle: "en panne ", value: "en panne " },
        { situation_actuelle: "declassé", value: "declassé" },
        { situation_actuelle: "hors-service", value: "hors-service" },
      ],
      intervention_type: null,
      next_prev_interv: null,
      show_prev_interv: true,

      isLoading: false,
    };
  },

  methods: {
    ...mapActions(["createEquipment", "getCustomers"]),
    onSubmit() {
      this.$toasted.clear();
      this.isLoading = true;
      let formData = new FormData();
      formData.append("designation", this.forms.designation);
      formData.append("marque", this.forms.marque);
      formData.append("modele", this.forms.marque);
      formData.append("fabricant", this.forms.fabricant);
      formData.append("capacite", this.forms.capacite);
      formData.append("affectation", this.forms.affectation);
      formData.append(
        "derniere_intervention",
        this.forms.derniere_intervention
      );
      formData.append(
        "prochaine_interv_prev",
        this.forms.prochaine_interv_prev
      );
      formData.append("type_intervention", this.intervention_type);
      formData.append("situation_actuelle", this.forms.situation_actuelle);
      this.createEquipment(formData).then((created) => {
        if (created) {
          this.isLoading = false;
          this.$toasted.success("Equipment as been added");
          this.$router.push({ name: "Equipments" });
        } else {
          this.isLoading = false;
          this.$toasted.error("An error has occured, please try again...");
        }
      });
    },

    cancel() {
      this.forms = {
        designation: "",
        marque: "",
        modele: "",
        fabricant: "",
        capacite: "",
        affectation: "",
        situation_actuelle: "",
        derniere_intervention: "",
        type_intervention: "",
        prochaine_interv_prev: "",
      };
    },
  },
  watch: {
    intervention_type: function () {
      console.log("ca change : ", this.intervention_type);
      if (this.intervention_type === "preventive") {
        this.show_prev_interv = false;
      } else {
        this.show_prev_interv = true;
      }
    },
  },
  mounted() {
    console.log(process.env.VUE_APP_DEFAULT_URL);
  },
  created() {},
};
</script>


