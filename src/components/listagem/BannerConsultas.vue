<template>
  <div>
    <CardConsulta
      :nome-medico="nomeMedico"
      :nome-paciente="nomePaciente"
      :data-consulta="dataConsulta"
      :perimite-editar="perimiteEditar"
    />
  </div>
</template>

<script setup>
import { defineComponent } from "vue";
import CardConsulta from "../cards/CardConsulta.vue";

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
});

defineComponent({
  components: {
    CardConsulta,
  },
  setup() {
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
        type: String,
      },
    });

    return {
      props,
    };
  },
});
</script>
