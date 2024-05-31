<template>
  <q-card class="flex row justify-evenly items-center q-pt-xs q-pb-xs">
    <FormMedicos />
  </q-card>
  <q-page id="element-to-convert">
    <q-btn
      flat
      color="primary"
      label="exportar"
      icon="print"
      @Click="gerarPDF()"
    />
    <ListagemMedico />
  </q-page>
</template>

<script>
import { defineComponent } from "vue";
import ListagemMedico from "../components/listagem/ListagemMedico.vue";
import FormMedicos from "src/components/forms/FormMedicos.vue";
import html2pdf from "html2pdf.js";

export default defineComponent({
  name: "MedicoPage",
  components: { ListagemMedico, FormMedicos },
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
