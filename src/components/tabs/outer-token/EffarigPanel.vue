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
    },
    ClassButton() {
      return {
        "c-outer-enslaved-reality-button__available": this.isAvailable,
        "c-outer-enslaved-reality-button__unavailable": !this.isAvailable,
      };
    }
  },
  methods: {
    update() {
      this.isUnlocked = false;
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

<style scoped>
.c-outer-enslaved-reality-button__available {
  border: var(--var-border-width, 0.2rem) solid crimson;
  border-radius: var(--var-border-radius, 0.5rem);
  padding: 1rem;
  -webkit-user-select: none;
  user-select: none;
}

.c-outer-enslaved-reality-button__available:hover {
  border: var(--var-border-width, 0.2rem) solid crimson;
  border-radius: var(--var-border-radius, 0.5rem);
  background-color: crimson;
  padding: 1rem;
  -webkit-user-select: none;
  user-select: none;
}
.c-outer-enslaved-reality-button__unavailable {
  border: var(--var-border-width, 0.5rem) solid gray;
  border-radius: var(--var-border-radius, 0.5rem);
  padding: 1rem;
  -webkit-user-select: none;
  user-select: none;
  pointer-events: none;
}
</style>