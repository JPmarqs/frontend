<template>
  <div class="q-pa-md" v-for="medico in medicos" :key="medico">
    <q-card bordered>
      <q-card-section horizontal class="justify-between">
        <q-card-section class="q-pt-xs">
          <div class="flex">
            <div class="text-overline text-grey">Nome:</div>
            <div class="text-overline">{{ medico.NOMEMED }}</div>
          </div>
          <div class="flex">
            <div class="text-overline text-grey">Especialidade:</div>
            <div class="text-overline">{{ medico.ESPECIMED }}</div>
          </div>
          <div class="flex">
            <div class="text-overline text-grey">Telefone:</div>
            <div class="text-overline">{{ medico.TELMED }}</div>
          </div>
          <div class="flex">
            <div class="text-overline text-grey">Email:</div>
            <div class="text-overline">{{ medico.EMAILMED }}</div>
          </div>
          <div class="flex">
            <div class="text-overline text-grey">Horário de atendimento:</div>
            <div class="text-overline">
              {{ medico.HRINICIOMED }} às {{ medico.HRFIMMED }}
            </div>
          </div>
        </q-card-section>
        <q-card-actions vertical class="justify-center">
          <q-btn
            flat
            round
            color="red"
            icon="delete"
            @Click="deleteMedico(medico.IDMEDICO)"
          />
          <q-btn
            flat
            round
            color="primary"
            icon="edit"
            size="md"
            @click="
              (formEmEdicao = true), (medicoEdicao = medico), abreEdicao()
            "
          />
        </q-card-actions>
      </q-card-section>
    </q-card>

    <q-dialog v-model="formEmEdicao">
      <q-card>
        <div class="flex">
          <div class="text-overline text-grey">Nome:</div>
          <q-input v-model="medicoEdicao.NOMEMED" />
        </div>
        <div class="flex">
          <div class="text-overline text-grey">Especialidade:</div>
          <q-input v-model="medicoEdicao.ESPECIMED"></q-input>
        </div>
        <div class="flex">
          <div class="text-overline text-grey">Telefone:</div>
          <q-input v-model="medicoEdicao.TELMED"></q-input>
        </div>
        <div class="flex">
          <div class="text-overline text-grey">Email:</div>
          <q-input v-model="medicoEdicao.EMAILMED"></q-input>
        </div>
        <div class="flex">
          <div class="text-overline text-grey">Horário de atendimento:</div>
          <q-input v-model="medicoEdicao.HRINICIOMED"></q-input>
          <q-input v-model="medicoEdicao.HRFIMMED"></q-input>
        </div>
        <q-card-actions>
          <q-btn
            flat
            round
            color="primary"
            label="Editar"
            @click="patchMedico(medicoEdicao)"
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
  </div>
</template>

<script>
import { defineComponent, onMounted, ref } from "vue";
import api from "../../service/index";
import { useQuasar } from "quasar";

export default defineComponent({
  name: "ListagemMedico",

  setup() {
    const q = useQuasar();
    const medicoEdicao = ref({});
    const medicos = ref([]);
    const formEmEdicao = ref(false);
    const desabilitaExclusao = ref(false);

    const fetchMedicos = async () =>
      await api.get("/medicos").then((res) => (medicos.value = res.data));

    onMounted(fetchMedicos);

    const deleteMedico = async (id) => {
      getMedicosComConsultas(id);

      if (!desabilitaExclusao.value) {
        q.notify({
          color: "negative",
          message: "Médico não pode ser excluído, pois possui consultas",
        });
        return;
      } else {
        try {
          const response = await api
            .delete(`/medicos/${id}`)
            .then(() => fetchMedicos());
        } catch (error) {
          console.error(error);
          q.notify({
            color: "negative",
            message: "Erro ao deletar médico",
          });
        }
      }
    };

    const patchMedico = async function (medico) {
      try {
        const response = await api.patch(`/medicos/${medico.IDMEDICO}`, {
          NOMEMED: medico.NOMEMED,
          ESPECIMED: medico.ESPECIMED,
          TELMED: medico.TELMED,
          EMAILMED: medico.EMAILMED,
          HRINICIOMED: medico.HRINICIOMED,
          HRFIMMED: medico.HRFIMMED,
        });
        q.notify({
          color: "positive",
          message: "Médico atualizado com sucesso",
        });
        fetchMedicos();
        formEmEdicao.value = false;
      } catch (error) {
        console.error(error);
        q.notify({
          color: "negative",
          message: "Erro ao atualizar médico",
        });
      }
    };

    const getMedicosComConsultas = async function (id) {
      try {
        const response = await api.get(`consultas/verificamedico/${id}`);

        console.log(response.data.length);

        if (response.data.length > 0) {
          desabilitaExclusao.value = true;
          return;
        }
      } catch (error) {
        console.error(error);
        q.notify({
          color: "negative",
          message: "Erro ao verificar médico",
        });
      }
    };

    return {
      medicos,
      deleteMedico,
      medicoEdicao,
      formEmEdicao,
      patchMedico,
      getMedicosComConsultas,
    };
  },
});
</script>
