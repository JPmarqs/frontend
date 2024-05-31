<template>
  <q-card-section style="max-height: 50vh" class="scroll">
    <FormConsulta />
  </q-card-section>
</template>

<script>
import { defineComponent, ref } from "vue";
import FormConsulta from "../forms/FormConsulta.vue";
const cadastro = ref(false);

export default defineComponent({
  name: "CardConsultaCadastro",

  setup() {
    return { cadastro };
  },
});
</script>
