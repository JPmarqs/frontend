<template>
  <q-page>
    <q-card class="flex row justify-evenly items-center q-pt-xs q-pb-xs">
      <FormConsulta />
      <q-separator vertical />
      <div style="width: 60%" class="flex row justify-around items-center">
        <div class="text-h6">Filtrar por:</div>
        <q-select
          style="width: 20%"
          outlined
          v-model="selectMedico"
          :options="medicos"
          label="Médico"
        />
        <q-select
          style="width: 20%"
          outlined
          v-model="selectPaciente"
          :options="pacientes"
          label="Paciente"
        />
        <q-btn color="primary" icon="search" @click="filtrar" />
      </div>
    </q-card>
    <q-btn
      flat
      color="primary"
      label="exportar"
      icon="print"
      @Click="gerarPDF()"
    />
    <div class="flex row justify-center" id="element-to-convert">
      <div v-for="consulta in consultas" :key="consulta">
        <q-card class="q-mt-xs q-mb-xs q-ml-xs q-mr-xs">
          <q-btn
            flat
            icon="edit"
            color="primary"
            round
            size="xs"
            class="q-pt-xs q-pl-xs"
            @click="abrirEdicao(consulta)"
          />
          <q-btn
            flat
            icon="delete"
            round
            color="red"
            size="xs"
            class="q-pt-xs q-pl-xs"
            @click="excluir(consulta.IDCONSULTA)"
          ></q-btn>

          <BannerConsultas
            :nome-medico="consulta.NOMEMED"
            :nome-paciente="consulta.NOMEPACI"
            :data-consulta="
              dataFormatada(consulta.DATACON) +
              ' ' +
              horaApartirData(consulta.DATACON)
            "
          />
        </q-card>
      </div>
    </div>
    <q-dialog v-model="formEmEdicao">
      <q-card>
        {{ consultaEmEdicao }}
        <q-card-section>
          <q-select
            outlined
            v-model="consultaEmEdicao.IDMEDICOCON"
            :options="medicos"
            label="Médico"
          />
          <q-select
            outlined
            v-model="consultaEmEdicao.IDPACIENTECON"
            :options="pacientes"
            label="Paciente"
          />
          <q-input
            v-model="horaConsulta"
            outlined
            type="time"
            hint="Horario da consulta"
          />
          <q-date v-model="dataConsulta"> </q-date>
        </q-card-section>
        <q-card-actions>
          <q-btn
            flat
            round
            color="primary"
            label="Editar"
            @click="patchConsulta()"
          />
          <q-btn
            flat
            round
            color="red"
            label="Cancelar"
            @Click="formEmEdicao = false"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script setup>
import { ref, onMounted } from "vue";
import api from "../service/index";
import BannerConsultas from "components/listagem/BannerConsultas.vue";
import FormConsulta from "components/forms/FormConsulta.vue";
import html2pdf from "html2pdf.js";

const emit = defineEmits(["customChange"]);

const medicos = ref([]);
const consultas = ref([]);
const pacientes = ref([]);
const selectMedico = ref([]);
const selectPaciente = ref([]);
const formEmEdicao = ref(false);
const consultaEmEdicao = ref({});
const horaConsulta = ref(null);
const dataConsulta = ref(null);
const dataMontada = ref("");

const fetchConsultas = async () =>
  await api.get("/consultas").then((res) => (consultas.value = res.data));

const fetchConsultasMedico = async () =>
  await api
    .get(`/consultas/medico/${selectMedico.value.id}`)
    .then((res) => (consultas.value = res.data));

const fetchConsultasPaciente = async () =>
  await api
    .get(`/consultas/paciente/${selectPaciente.value.id}`)
    .then((res) => (consultas.value = res.data));

const fetchConsultasPacienteEMedico = async () =>
  await api
    .get(
      `/consultas/medicoepaciente/${selectMedico.value.id}&${selectPaciente.value.id}`
    )
    .then((res) => (consultas.value = res.data));

const fetchMedicos = () =>
  api.get("/medicos").then((res) => {
    medicos.value = res.data.map((medico) => ({
      id: medico.IDMEDICO,
      label: medico.NOMEMED,
    }));
  });

const fetchPacientes = async () =>
  await api.get("/pacientes").then((res) => {
    pacientes.value = res.data.map((paciente) => ({
      id: paciente.IDPACIENTE,
      label: paciente.NOMEPACI,
    }));
  });

const patchConsulta = async function (consulta) {
  try {
    montadata();
    const response = await api.patch(`/consultas/${consulta.IDCONSULTA}`, {
      IDPACIENTECON: consulta.IDPACIENTECON,
      IDMEDICOCON: consulta.IDPACIENTECON,
      DATACON: consulta.DATACON,
    });
    console.log(response);
  } catch (error) {
    console.error(error);
  }
};

const abrirEdicao = function (consulta) {
  formEmEdicao.value = true;
  consultaEmEdicao.value = consulta;
};

const excluir = async function (id) {
  try {
    const response = await api.delete(`/consultas/${id}`);
    location.reload();
  } catch (error) {
    console.error(error);
  }
};

onMounted(() => {
  fetchConsultas();
  fetchMedicos();
  fetchPacientes();
});

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

const filtrar = function () {
  if (selectMedico.value.id && selectPaciente.value.id) {
    fetchConsultasPacienteEMedico();
  } else if (selectMedico.value.id) {
    fetchConsultasMedico();
  } else if (selectPaciente.value.id) {
    fetchConsultasPaciente();
  }
};

const montadata = function () {
  const hora = horaConsulta;
  const [dia, mes, ano] = dataConsulta.value.split("/");
  dataMontada.value = `${ano}-${mes}-${dia} ${hora.value}:00`;
};

const gerarPDF = () => {
  html2pdf(document.getElementById("element-to-convert"), {
    margin: 1,
    filename: "i-was-html.pdf",
  });
};
</script>
