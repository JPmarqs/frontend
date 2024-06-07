<template>
  <div class="q-pa-md" v-for="paciente in pacientes" :key="paciente">
    <q-card bordered>
      <q-card-section horizontal class="justify-between">
        <q-card-section class="q-pt-xs">
          <div class="flex">
            <div class="text-overline text-grey">Nome:</div>
            <div class="text-overline">{{ paciente.NOMEPACI }}</div>
          </div>
          <div class="flex">
            <div class="text-overline text-grey">Data de Nascimento:</div>
            <div class="text-overline">{{ paciente.DATANASPACI }}</div>
          </div>
          <div class="flex">
            <div class="text-overline text-grey">Genero:</div>
            <div class="text-overline">{{ paciente.GENPACI }}</div>
          </div>
          <div class="flex">
            <div class="text-overline text-grey">Cidade:</div>
            <div class="text-overline">{{ paciente.CIDADEPACI }}</div>
          </div>
          <div class="flex">
            <div class="text-overline text-grey">UF:</div>
            <div class="text-overline">{{ paciente.UFPACI }}</div>
          </div>
          <div class="flex">
            <div class="text-overline text-grey">Endereço:</div>
            <div class="text-overline">{{ paciente.ENDERPACI }}</div>
          </div>
          <div class="flex">
            <div class="text-overline text-grey">Telefone:</div>
            <div class="text-overline">{{ paciente.TELMED }}</div>
          </div>
          <div class="flex">
            <div class="text-overline text-grey">Email:</div>
            <div class="text-overline">{{ paciente.EMAILMED }}</div>
          </div>
        </q-card-section>
        <q-card-actions vertical class="justify-between">
          <q-btn
            flat
            round
            color="red"
            icon="delete"
            @Click="deletePaciente(paciente.IDPACIENTE)"
          />
          <q-btn
            flat
            round
            color="primary"
            icon="edit"
            @click="
              (formEmEdicao = true), (pacienteEdicao = paciente), abreEdicao()
            "
          />
          <q-btn flat round color="primary" icon="schedule" />
        </q-card-actions>
      </q-card-section>
    </q-card>

    <q-dialog v-model="formEmEdicao">
      <q-card>
        <q-card-section>
          <div class="flex">
            <div class="text-overline text-grey">Nome:</div>
            <q-input v-model="pacienteEdicao.NOMEPACI" />
          </div>
          <div class="flex">
            <div class="text-overline text-grey">Data de Nascimento:</div>
            <q-date v-model="pacienteEdicao.DATANASPACI"> </q-date>
          </div>
          <div class="flex">
            <div class="text-overline text-grey">Genero:</div>
            <q-input v-model="pacienteEdicao.GENPACI"></q-input>
          </div>
          <div class="flex">
            <div class="text-overline text-grey">Cidade:</div>
            <q-input v-model="pacienteEdicao.CIDADEPACI"></q-input>
          </div>
          <div class="flex">
            <div class="text-overline text-grey">UF:</div>
            <q-input v-model="pacienteEdicao.UFPACI"></q-input>
          </div>
          <div class="flex">
            <div class="text-overline text-grey">Endereço:</div>
            <q-input v-model="pacienteEdicao.ENDERPACI"></q-input>
          </div>
          <div class="flex">
            <div class="text-overline text-grey">Telefone:</div>
            <q-input v-model="pacienteEdicao.TELMED"></q-input>
          </div>
          <div class="flex">
            <div class="text-overline text-grey">Email:</div>
            <q-input v-model="pacienteEdicao.EMAILMED"></q-input></div
        ></q-card-section>
        <q-card-section
          ><q-btn
            flat
            round
            color="primary"
            label="Editar"
            @click="patchPaciente(pacienteEdicao)"
          />
          <q-btn
            flat
            round
            color="red"
            label="Cancelar"
            @Click="formEmEdicao = false"
          />
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import { defineComponent, onMounted, ref } from "vue";
import api from "../../service/index";
import { useQuasar } from "quasar";

export default defineComponent({
  name: "ListagemPaciente",

  setup() {
    const q = useQuasar();
    const pacienteEdicao = ref({});
    const pacientes = ref([]);
    const formEmEdicao = ref(false);
    const desabilitaExclusao = ref(false);

    const fetchPacientes = async () =>
      await api.get("/pacientes").then((res) => (pacientes.value = res.data));

    onMounted(fetchPacientes);

    const deletePaciente = async (id) => {
      await getPacientesComConsultas(id);

      if (desabilitaExclusao.value) {
        q.notify({
          color: "negative",
          message: "Paciente possui consultas agendadas",
        });
        return;
      } else {
        await api.delete(`/pacientes/${id}`).then(() => fetchPacientes());
      }
    };

    const getPacientesComConsultas = async function (id) {
      try {
        const response = await api.get(`consultas/verificapaciente/${id}`);

        if (response.data.length > 0) {
          desabilitaExclusao.value = true;
          return;
        }
      } catch (error) {
        console.error(error);
        q.notify({
          color: "negative",
          message: "Erro ao verificar paciente",
        });
      }
    };

    const patchPaciente = async function (paciente) {
      try {
        const response = await api
          .patch(`/pacientes/${paciente.IDPACIENTE}`, paciente)
          .then(() => fetchPacientes());
        formEmEdicao.value = false;
      } catch (error) {
        console.error(error);
        q.notify({
          color: "negative",
          message: "Erro ao editar paciente",
        });
      }
    };

    const abreEdicao = () => {};
    return {
      pacientes,
      pacienteEdicao,
      formEmEdicao,
      abreEdicao,
      patchPaciente,
      deletePaciente,
    };
  },
});
</script>
