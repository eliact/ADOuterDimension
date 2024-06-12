<script>
export default {
  name: "TheWallTabButton",
  props: {
    getMilestone: {
      type: Function,
      required: true
    }
  },
  data() {
    return {
      isReached: false,
    };
  },
  computed: {
    milestone() {
      return this.getMilestone();
    },
    config() {
      return this.milestone.config;
    },
    outers() {
      return this.config.outers;
    },
    reward() {
      const reward = this.config.reward;
      return typeof reward === "function" ? reward() : reward;
    },
    rewardClassObject() {
      return {
        "o-outer-wall__reward": true,
        "o-outer-wall__reward--locked": !this.isReached,
        "o-outer-wall__reward--reached": this.isReached,
        "o-outer-wall__reward--small-font": this.reward.length > 80,
      };
    },
    activeCondition() {
      return this.config.activeCondition ? this.config.activeCondition() : null;
    },
  },
  methods: {
    update() {
      this.isReached = this.milestone.isReached;
    }
  }
};
</script>

<template>
  <div
    v-if="!config.invisible"
    class="l-outer-wall"
  >
    <button
      v-tooltip="activeCondition"
      :class="rewardClassObject"
    >
      <span>
        {{ reward }}
      </span>
    </button>
  </div>
</template>

<style scoped>
.o-outer-wall__reward {
  width: 25rem;
  height: 8rem;
  font-family: Typewriter, serif;
  font-size: 1.2rem;
  font-weight: bold;
  color: black;
  border: 0.1rem solid #2196f3;
  border-radius: var(--var-border-radius, 0.4rem);
  transition-duration: 0.2s;
}
</style>