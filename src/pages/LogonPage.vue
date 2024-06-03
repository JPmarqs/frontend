<template>
  <q-card class="flex row justify-evenly items-center q-pt-xs q-pb-xs">
    <FormLogin />
  </q-card>
</template>

<script>
import { defineComponent } from "vue";
import FormLogin from "src/components/forms/FormLogin.vue";
export default defineComponent({
  name: "LogonPage",
  components: { FormLogin },
  setup() {
    return {};
  },
});
</script>
