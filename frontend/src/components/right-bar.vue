<script>
import { layoutMethods } from "@/state/helpers";
import simplebar from "simplebar-vue";

/**
 * Right sidebar component
 */
export default {
  components: { simplebar },
  data() {
    return {
      config: {
        handler: this.handleRightBarClick,
        middleware: this.middleware,
        events: ["click"],
      },
      layout: this.$store ? this.$store.state.layout.layoutType : {} || {},
      width: this.$store ? this.$store.state.layout.layoutWidth : {} || {},
      topbar: this.$store ? this.$store.state.layout.topbar : {} || {},
      sidebarType: this.$store
        ? this.$store.state.layout.leftSidebarType
        : {} || {},
      loader: this.$store ? this.$store.state.layout.loader : {} || {},
    };
  },
  methods: {
    ...layoutMethods,
    hide() {
      this.$parent.toggleRightSidebar();
    },
    // eslint-disable-next-line no-unused-vars
    handleRightBarClick(e, el) {
      this.$parent.hideRightSidebar();
    },
    // eslint-disable-next-line no-unused-vars
    middleware(event, el) {
      return !event.target.classList.contains("toggle-right");
    },
    changeLayout(layout) {
      this.changeLayoutType({ layoutType: layout });
    },
    changeType(type) {
      return this.changeLeftSidebarType({ leftSidebarType: type });
    },
    changeWidth(width) {
      return this.changeLayoutWidth({ layoutWidth: width });
    },
    changeTopbartype(value) {
      return this.changeTopbar({ topbar: value });
    },
    changeloader() {
      return this.changeLoaderValue({ loader: this.loader });
    },
  },
};
</script>

<template>
  <div>
    <div v-click-outside="config" class="right-bar">
      <simplebar class="h-100">
        <div class="rightbar-title px-3 py-4">
          <a href="javascript:void(0);" class="right-bar-toggle float-right" @click="hide">
            <i class="mdi mdi-close noti-icon"></i>
          </a>
          <h5 class="m-0">Settings</h5>
        </div>

        <div class="p-2">          
          <!-- Sidebar -->
          <div v-if="layout === 'vertical'">
            <h6 class="mt-3">Menu</h6>
            <hr class="mt-1" />
            <b-form-radio-group v-model="sidebarType" stacked @input="changeType($event)">
              <b-form-radio value="dark" class="mb-1">Expanded</b-form-radio>
              <b-form-radio value="compact" class="mb-1">Compact</b-form-radio>
              <b-form-radio value="icon" class="mb-1">Icon</b-form-radio>
            </b-form-radio-group>
          </div>
        </div>
         
      </simplebar>
    </div>

    <!-- Right bar overlay-->
    <div class="rightbar-overlay"></div>
  </div>
</template>

<style lang="scss"></style>
