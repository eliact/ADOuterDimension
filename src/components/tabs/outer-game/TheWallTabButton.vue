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
          isLocked: false,
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
      <span class="o-outer-wall__goal">
        {{ quantifyInt("Outer", outers) }}:
      </span>
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

</style>