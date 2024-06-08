<template>
  <div class="">
    <div class="q-gutter-y-md column">
      <q-input
        ref="emailRef"
        v-model="email"
        outlined
        type="email"
        lazy-rules
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
        <q-btn @click="logar()" color="primary" icon="done" label="Entrar" />
        <q-btn
          class="q-ml-lg"
          outline
          to="/cadastro"
          color="primary"
          icon="add"
          label="Novo cadastro"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { useQuasar } from "quasar";
import { defineComponent, ref, computed } from "vue";
import api from "../../service/index";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "FormLogin",
  setup() {
    const q = useQuasar();
    const email = ref("");
    const senha = ref("");
    const isPwd = ref(true);
    const emailJaCadastrado = ref(false);

    const router = useRouter();

    const logar = function () {
      api
        .post("/login", {
          email: email.value,
          senha: senha.value,
        })
        .then((response) => {
          if (response.status === 200) {
            router.push("/menu");
            q.notify({
              color: "success",
              message: `Usuário logado ${logado.value}`,
            });
            return;
          }

          if (response.status === 500) {
            alert("Erro no servidor");
          }
        })
        .catch((error) => {
          console.log(error);
          emailJaCadastrado.value = true;
          q.notify({
            color: "negative",
            message: "Email ou senha incorretos",
          });
        });
    };
    return {
      email,
      senha,
      isPwd,
      q,
      logar,
    };
  },
});
</script>
