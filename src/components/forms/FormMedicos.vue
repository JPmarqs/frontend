<template>
  <div class="">
    <q-btn
      @click="novoMedico()"
      v-if="!novoCadastro"
      color="primary"
      icon="add"
      label="Novo(a) Médico(a)"
    />
    <div class="q-gutter-y-md column" v-if="novoCadastro">
      <q-input outlined v-model="phNome" placeholder="Nome" />
      <q-select
        outlined
        v-model="selectEspecialidade"
        :options="options"
        label="Especialidade"
      />
      <q-input v-model="tel" outlined type="tel" hint="Telefone" />
      <q-input v-model="email" outlined type="email" hint="Email" />
      <q-input
        v-model="horaInicio"
        outlined
        type="time"
        hint="Inicio do expediente"
      />
      <q-input
        v-model="horaFim"
        outlined
        type="time"
        hint="Fim do expediente"
      />
      <div class="q-mt-lg">
        <q-btn
          @click="postMedico()"
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
import { defineComponent, ref, defineProps } from "vue";
import api from "../../service/index";

export default defineComponent({
  name: "FormMedicos",
  setup() {
    const novoCadastro = ref(false);
    const novoMedico = function () {
      novoCadastro.value = true;
    };
    return {
      phNome: ref(""),
      selectEspecialidade: ref(""),
      email: ref(""),
      tel: ref(""),
      horaFim: ref(""),
      horaInicio: ref(""),
      options: [
        "Neurologista",
        "Cardiologista",
        "Nutrólogo",
        "Urologista",
        "Ginecologista",
      ],
      novoCadastro,
      novoMedico,
    };
  },
  methods: {
    postMedico() {
      api
        .post("/medicos", {
          NOMEMED: this.phNome,
          ESPECIMED: this.selectEspecialidade,
          TELMED: this.tel,
          EMAILMED: this.email,
        })
        .then((response) => (novoCadastro.value = false));
    },
  },
});
</script>
