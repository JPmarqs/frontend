<template>
  <div class="">
    <q-btn
      @click="novaConsulta()"
      v-if="!novoCadastro"
      color="primary"
      icon="add"
      label="Nova consulta"
    />
    <div class="q-gutter-y-md column" v-if="novoCadastro">
      <q-select
        outlined
        v-model="selectMedico"
        :options="medicos"
        label="Médico"
      />
      <q-select
        outlined
        v-model="selectPaciente"
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
      <div class="q-mt-lg">
        <q-btn
          @click="postConsulta()"
          color="primary"
          icon="done"
          label="Cadastrar"
        />
        <q-btn
          class="q-ml-lg"
          outline
          @click="novoCadastro = false"
          color="primary"
          icon="cancel"
          label="Cancelar"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref, onMounted, defineProps } from "vue";
import api from "../../service/index";

export default defineComponent({
  name: "FormConsulta",
  setup() {
    const medicos = ref([]);
    const pacientes = ref([]);
    const dataMontada = ref("");

    const selectMedico = ref([]);
    const selectPaciente = ref([]);
    const horaConsulta = ref(null);
    const dataConsulta = ref(null);
    const novoCadastro = ref(false);

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

    const montadata = function () {
      const hora = horaConsulta;
      const [dia, mes, ano] = dataConsulta.value.split("/");
      dataMontada.value = `${ano}-${mes}-${dia} ${hora.value}:00`;
    };

    const postConsulta = function () {
      montadata();
      api.post("/consultas", {
        IDPACIENTECON: this.selectPaciente.id,
        IDMEDICOCON: this.selectMedico.id,
        DATACON: this.dataMontada.value,
      });
      location.reload();
    };

    const novaConsulta = function () {
      novoCadastro.value = true;
      fetchPacientes();
      fetchMedicos();
    };

    return {
      medicos,
      pacientes,
      dataMontada,
      selectMedico,
      selectPaciente,
      horaConsulta,
      dataConsulta,
      novoCadastro,
      montadata,
      postConsulta,
      novaConsulta,
    };
  },
});
</script>
