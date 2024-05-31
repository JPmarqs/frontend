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
        <q-card-actions vertical class="justify-between">
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
            size="xl"
            @click="
              (formEmEdicao = true), (medicoEdicao = medico), abreEdicao()
            "
          />
          <q-btn flat round color="primary" icon="schedule" />
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
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import { defineComponent, onMounted, ref } from "vue";
import api from "../../service/index";
export default defineComponent({
  name: "ListagemMedico",

  setup() {
    const medicoEdicao = ref({});
    const medicos = ref([]);
    const formEmEdicao = ref(false);

    const fetchMedicos = async () =>
      await api.get("/medicos").then((res) => (medicos.value = res.data));

    onMounted(fetchMedicos);

    const deleteMedico = async (id) => {
      await api.delete(`/medicos/${id}`).then(() => fetchMedicos());
    };

    const abreEdicao = () => {};
    return {
      medicos,
      deleteMedico,
      medicoEdicao,
      formEmEdicao,
      abreEdicao,
    };
  },
});
</script>
