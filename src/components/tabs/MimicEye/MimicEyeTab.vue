<script>
import MimicTeresa from "./MimicTeresa";

export default {
  name: "MimicEyeTab",
  components: {
    MimicTeresa,
  },
  data() {
    return {
      mimicTeresa: false,
    };
  },
  computed: {
  },
  methods: {
    update() {
      this.mimicTeresa = player.outer.MimicEye.TeresaUnlocked;
    }
  }
};
</script>

<template>
  <div>
    <MimicTeresa v-if="mimicTeresa" />
  </div>
</template>

<style scoped>

</style>