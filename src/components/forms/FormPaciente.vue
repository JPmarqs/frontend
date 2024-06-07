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
      <q-select outlined v-model="genero" :options="generos" label="Genero" />
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
    const dataMontada = ref("");

    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();

    // This arrangement can be altered based on how we want the date's format to appear.
    let currentDate = `${day}/${month}/${year}`;

    const dataNasc = ref(currentDate);

    const novoPaciente = function () {
      novoCadastro.value = true;
    };
    const montadata = function () {
      const [ano, mes, dia] = dataNasc.value.split("/");
      dataMontada.value = `${ano}-${mes}-${dia}`;
    };

    const postPaciente = function () {
      montadata();
      console.log(dataMontada.value);
      api
        .post("/pacientes", {
          NOMEPACI: this.nome,
          DATANASPACI: dataMontada.value,
          GENPACI: this.genero,
          ENDERPACI: this.endereco,
          CIDADEPACI: this.cidade,
          UFPACI: this.uf,
          TELPACI: this.tel,
          EMAILPACI: this.email,
        })
        .then(() => (novoCadastro.value = true));

      location.reload();
    };

    return {
      nome: ref(""),
      dataNasc,
      email: ref(""),
      tel: ref(""),
      uf: ref(""),
      cidade: ref(""),
      endereco: ref(""),
      genero: ref(""),
      generos: ["Mas", "Fem", "Outro"],
      estados: [
        "AC",
        "AL",
        "AP",
        "AM",
        "BA",
        "CE",
        "DF",
        "ES",
        "GO",
        "MA",
        "MT",
        "MS",
        "MG",
        "PA",
        "PB",
        "PR",
        "PE",
        "PI",
        "RJ",
        "RN",
        "RS",
        "RO",
        "RR",
        "SC",
        "SP",
        "SE",
        "TO",
      ],
      novoCadastro,
      novoPaciente,
      postPaciente,
    };
  },
});
</script>
