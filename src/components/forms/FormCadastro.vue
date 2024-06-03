<template>
  <div class="">
    <div class="q-gutter-y-md column">
      <q-input
        outlined
        v-model="nome"
        :rules="[(val) => val.length > 0 || 'Nome deve ser preenchido']"
        placeholder="Nome"
      />
      <q-input
        ref="emailRef"
        v-model="email"
        outlined
        type="email"
        lazy-rules
        :rules="[emailRules]"
        hint="Email"
      />
      <q-input
        v-model="senha"
        :type="isPwd ? 'password' : 'text'"
        :rules="[
          (val) => val.length >= 6 || 'Senha deve ter no mínimo 6 caracteres',
        ]"
        outlined
        hint="Senha"
      >
        <template v-slot:append>
          <q-icon
            :name="isPwd ? 'visibility_off' : 'visibility'"
            class="cursor-pointer"
            @click="isPwd = !isPwd"
          />
        </template>
      </q-input>
      <div class="q-mt-lg">
        <q-btn
          @click="postCadastro()"
          color="primary"
          icon="done"
          label="Novo Cadastro"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { useQuasar } from "quasar";
import { defineComponent, ref } from "vue";
import api from "../../service/index";

export default defineComponent({
  name: "FormCadastro",
  setup() {
    const q = useQuasar();
    const nome = ref("");
    const email = ref("");
    const senha = ref("");
    const isPwd = ref(true);
    const emailRef = ref(null);
    const emailJaCadastrado = ref(false);
    const emailRules = ref([
      (val) => (val !== null && val !== "") || "Digite um email",
      (val) => /.+@.+\..+/.test(val) || "Email inválido",
      (val) => !emailJaCadastrado.value || "Email já cadastrado",
    ]);

    const postCadastro = function () {
      if (senha.value.length < 6) {
        console.log(senha.value.length);
        alert("Senha deve ter no mínimo 6 caracteres");
        return;
      }
      api
        .post("/cadastro", {
          nome: nome.value,
          email: email.value,
          senha: senha.value,
        })
        .then((response) => {
          console.log(response.status);
          if (response.status === 200) {
            q.notify({
              color: "success",
              message: "Usuário cadastrado com sucesso",
            });
            router.push("/");
          }

          if (response.status === 500) {
            alert("Erro no servidor");
          }
        })
        .catch((error) => {
          if (error.response.status === 400) {
            emailJaCadastrado.value = true;
            q.notify({
              color: "negative",
              message: "Email já cadastrado",
            });
          }
        });
    };
    return {
      nome,
      email,
      senha,
      isPwd,
      q,
      emailRules,
      postCadastro,
    };
  },
});
</script>
