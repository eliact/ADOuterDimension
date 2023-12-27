<script>
export default {
  name: "EffarigPanel",
  components: {

  },
  data() {
    return {
      isUnlocked: false
    };
  },
  computed: {
    Class() {
      return {
        "l-outer-effarig-panel-container__unlocked": this.isUnlocked,
        "l-outer-effarig-panel-container__locked": !this.isUnlocked
      };
    },
    ClassTitle() {
      return {
        "c-outer-effarig-panel-title__unlocked": this.isUnlocked,
        "c-outer-effarig-panel-title__locked": !this.isUnlocked
      };
    }
  },
  methods: {
    update() {
      this.isUnlocked = player.outerSpace.celestials.effarig.active;
    }
  }
};
</script>

<template>
  <div :class="Class">
    <div :class="ClassTitle">
      Ϙ
    </div>
    <div
      v-if="isUnlocked"
      class="l-outer-effarig-content-container"
    >
      hey
    </div>
  </div>
</template>