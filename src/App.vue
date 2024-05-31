<template>
  <div>
    <router-link to="/consulta" />
  </div>
  <router-view />
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "App",
});
</script>
