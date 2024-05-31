<template>
  <q-page class="row">
    <div class="col-3 q-pl-md q-pt-md q-pb-md flex">
      <q-btn
        color="primary"
        label="Painel de consultas"
        style="font-size: 16px; width: 100%"
        to="/consulta"
      />
      <q-separator style="width: 90%" inset />
      <q-btn
        color="primary"
        label="Painel de Medicos"
        style="font-size: 16px; width: 100%"
        to="/medicos"
      />
      <q-separator style="width: 90%" inset />
      <q-btn
        color="primary"
        label="Painel de Pacientes"
        style="font-size: 16px; width: 100%"
        to="/pacientes"
      />
    </div>
    <div class="col-9 flex column">
      <div class="text-h6 q-pa-md">Proximas Consultas</div>
      <div v-for="consulta in consultas" :key="consulta">
        <BannerConsultas
          :nome-medico="consulta.NOMEMED"
          :nome-paciente="consulta.NOMEPACI"
          :data-consulta="
            dataFormatada(consulta.DATACON) +
            ' ' +
            horaApartirData(consulta.DATACON)
          "
          :perimite-editar="false"
        />
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { ref, onMounted } from "vue";
import api from "../service/index";
import BannerConsultas from "components/listagem/BannerConsultas.vue";

const cadastro = ref(false);
const consultas = ref([]);

const fetchConsultas = async () =>
  await api
    .get("/consultas/futuras")
    .then((res) => (consultas.value = res.data));

onMounted(fetchConsultas);

const dataFormatada = (data) => {
  const dataConsulta = new Date(data);
  return dataConsulta.toLocaleDateString();
};

const horaApartirData = (data) => {
  const dataConsulta = new Date(data);
  return dataConsulta.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
};
</script>
