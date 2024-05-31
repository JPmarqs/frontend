<template>
  <div class="">
    <q-btn
      @click="novoPaciente()"
      v-if="!novoCadastro"
      color="primary"
      icon="add"
      label="Novo(a) Paciente"
    />
    <div class="q-gutter-y-md column" v-if="novoCadastro">
      <q-input outlined v-model="nome" placeholder="Nome" />
      <q-input filled v-model="dataNasc">
        <template v-slot:append>
          <q-icon name="event" class="cursor-pointer">
            <q-popup-proxy
              cover
              transition-show="scale"
              transition-hide="scale"
            >
              <q-date v-model="dataNasc">
                <div class="row items-center justify-end">
                  <q-btn v-close-popup label="Close" color="primary" flat />
                </div>
              </q-date>
            </q-popup-proxy>
          </q-icon>
        </template>
      </q-input>
      <q-input v-model="tel" outlined type="tel" hint="Telefone" />
      <q-input v-model="email" outlined type="email" hint="Email" />
      <q-select outlined v-model="genero" :options="options" label="Genero" />
      <q-input v-model="cidade" outlined type="cidade" hint="Cidade" />
      <q-select outlined v-model="uf" :options="estados" label="UF" />
      <q-input v-model="endereco" outlined type="endereco" hint="Endereco" />
      <div class="q-mt-lg">
        <q-btn
          @click="postPaciente()"
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
import { defineComponent, ref } from "vue";
import api from "../../service/index";

export default defineComponent({
  name: "FormPaciente",
  setup() {
    const date = new Date();
    const novoCadastro = ref(false);

    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();

    // This arrangement can be altered based on how we want the date's format to appear.
    let currentDate = `${day}/${month}/${year}`;

    console.log(currentDate);

    const novoPaciente = function () {
      novoCadastro.value = true;
    };
    return {
      nome: ref(""),
      dataNasc: ref(currentDate),
      email: ref(""),
      tel: ref(""),
      uf: ref(""),
      cidade: ref(""),
      endereco: ref(""),
      genero: ref(""),
      estados: [
        "Acre",
        "Alagoas",
        "Amapá",
        "Amazonas",
        "Bahia",
        "Ceará",
        "distrito federal",
        "Espírito Santo",
        "Goiás",
        "Maranhão",
        "Mato Grosso",
        "Mato Grosso do Sul",
        "Minas Gerais",
        "Pará",
        "Paraíba",
        "Paraná",
        "Pernambuco",
        "Piauí",
        "Rio de Janeiro",
        "Rio Grande do Norte",
        "Rio Grande do Sul",
        "Rondônia",
        "Roraima",
        "Santa Catarina",
        "São Paulo",
        "Sergipe",
        "Tocantins",
      ],
      novoCadastro,
      novoPaciente,
    };
  },
  methods: {
    postPaciente() {
      api
        .post("/paciente", {
          NOMEPACI: this.nome,
          DATANASPACI: this.dataNasc,
          GENPACI: this.genero,
          ENDERPACI: "",
          CIDADEPACI: this.cidade,
          UFPACI: this.uf,
          TELPACI: this.tel,
          EMAILPACI: this.email,
        })
        .then(() => (novoCadastro.value = true));
    },
  },
});
</script>
