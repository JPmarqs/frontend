<template>
  <div class="q-pa-md row items-start q-gutter-md">
    <q-card class="my-card" flat bordered>
      <q-card-section horizontal>
        <q-card-section class="q-pt-xs">
          <div class="text-overline flex justify-between" v-if="perimiteEditar">
            Consulta
          </div>
          <div class="text-h5 q-mt-sm q-mb-xs">Dr(ª) {{ nomeMedico }}</div>
          <div class="text-h6">Paciente: {{ nomePaciente }}</div>
          <div class="text-overline text-grey">
            {{ dataConsulta }}
          </div>
        </q-card-section>
      </q-card-section>
    </q-card>
  </div>
</template>

<script setup>
import { defineComponent } from "vue";

const props = defineProps({
  nomeMedico: {
    type: String,
  },
  nomePaciente: {
    type: String,
  },
  fotoMedico: {
    type: String,
  },
  dataConsulta: {
    type: String,
  },
  perimiteEditar: {
    type: Boolean,
    default: false,
  },
  edicaoAberta: {
    type: Boolean,
    default: false,
  },
});

defineComponent({
  setup() {
    const emit = defineEmits(["editar"]);
    const props = defineProps({
      nomeMedico: {
        type: String,
      },
      nomePaciente: {
        type: String,
      },
      fotoMedico: {
        type: String,
      },
      dataConsulta: {
        type: String,
      },
      perimiteEditar: {
        type: Boolean,
        default: false,
      },
      edicaoAberta: {
        type: Boolean,
        default: false,
      },
    });
    return { props, emit };
  },
});
</script>
