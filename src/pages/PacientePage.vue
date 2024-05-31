<template>
  <q-page>
    <q-card class="flex row justify-evenly items-center q-pt-xs q-pb-xs">
      <FormPaciente />
    </q-card>
    <q-page id="element-to-convert">
      <q-btn
        flat
        color="primary"
        label="exportar"
        icon="print"
        @Click="gerarPDF()"
      />
      <ListagemPaciente />
    </q-page>
  </q-page>
</template>

<script>
import { defineComponent } from "vue";
import ListagemPaciente from "../components/listagem/ListagemPaciente.vue";
import FormPaciente from "src/components/forms/FormPaciente.vue";
import html2pdf from "html2pdf.js";

export default defineComponent({
  name: "PacientePage",
  components: { ListagemPaciente, FormPaciente },
  setup() {
    const gerarPDF = () => {
      html2pdf(document.getElementById("element-to-convert"), {
        margin: 1,
        filename: "i-was-html.pdf",
      });
    };
    return { gerarPDF };
  },
});
</script>
