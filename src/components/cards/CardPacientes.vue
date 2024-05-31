<template>
  <q-card class="my-card q-mt-lg q-mb-lg" style="width: 90%">
    <q-card-section class="bg-primary text-white">
      <div class="text-h6 text-center">PACIENTES</div>
    </q-card-section>

    <q-separator />

    <q-card-actions align="center">
      <q-btn outline to="/pacientes">Lista de Pacientes</q-btn>

      <q-btn outline @click="cadastro = true" label="cadastrar" />
      <q-dialog v-model="cadastro">
        <q-card>
          <q-card-section>
            <div class="text-h6">Novo Cadastro</div>
          </q-card-section>

          <q-separator />

          <q-card-section style="max-height: 50vh" class="scroll">
            <FormPaciente />
          </q-card-section>

          <q-separator />

          <q-card-actions align="right">
            <q-btn flat label="Cancelar" color="primary" v-close-popup />
          </q-card-actions>
        </q-card>
      </q-dialog>
    </q-card-actions>
  </q-card>
</template>

<script>
import { defineComponent, ref } from "vue";
import FormPaciente from "../forms/FormPaciente.vue";

export default defineComponent({
  name: "CardPacientes",

  components: {
    FormPaciente,
  },

  setup() {
    return {
      cadastro: ref(false),
      mostragem: ref(false),
    };
  },
});
</script>
