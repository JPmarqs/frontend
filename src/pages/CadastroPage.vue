<template>
  <q-card class="flex row justify-evenly items-center q-pt-xs q-pb-xs">
    <FormCadastro />
  </q-card>
</template>

<script>
import { defineComponent } from "vue";
import ListagemMedico from "../components/listagem/ListagemMedico.vue";
import FormCadastro from "src/components/forms/FormCadastro.vue";
export default defineComponent({
  name: "CadastroPage",
  components: { FormCadastro },
  setup() {
    return {};
  },
});
</script>
