<script>
export default {
  name: "TeresaPanel",
  components: {

  },
  date() {
    return {
      spaceShard: new Decimal(),
      isUnlocked: false
    };
  },
  computed: {
    Class() {
      return {
        "l-outer-teresa-panel-container__unlocked": this.isUnlocked,
        "l-outer-teresa-panel-container__locked": !this.isUnlocked
      };
    },
    ClassTitle() {
      return {
        "c-outer-teresa-panel-title__unlocked": this.isUnlocked,
        "c-outer-teresa-panel-title__locked": !this.isUnlocked
      };
    }
  },
  methods: {
    update() {
      this.isUnlocked = player.outerSpace.celestials.teresa.active;
      this.spaceShard = player.outerSpace.celestials.teresa.spaceShard;
    }
  }
};
</script>

<template>
  <div :class="Class">
    <div :class="ClassTitle">
      Ϟ
    </div>
    <div
      v-if="isUnlocked"
      class="l-outer-teresa-content-container"
    >
      Number of Space Shards You have:
      {{ spaceShard }} Shards
      <br>
      You keep them through games.
      <br>
      They have some effect on your game :

      <br>
      Once you have one, something special will happen.
    </div>
  </div>
</template>

<style scoped>
</style>