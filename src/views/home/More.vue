<template>
  <component :is="compName"></component>
</template>

<script>
import Dynamics from "./Dynamics";
import Notice from "./Notice";
export default {
  components: { Dynamics, Notice },
  computed: {
    compName() {
      return this.$route.params.compName;
    },
  }
}
</script>

<style>
</style>
