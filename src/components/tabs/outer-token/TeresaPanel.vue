<script>
import { clearCelestialRuns, Currency, OuterTeresa } from "../../../core/globals";
import { DC } from "../../../core/constants";

export default {
  name: "TeresaPanel",
  components: {

  },
  data() {
    return {
      spaceShard: new Decimal(),
      isUnlocked: false,
      shardMultiplier: DC.D1,
      spaceDimension: 0,
      isAvailable: false,
      timer: 0,
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
    },
    ClassButton() {
      return {
        "c-outer-teresa-reality-button__available": this.isAvailable,
        "c-outer-teresa-reality-button__unavailable": !this.isAvailable,
      };
    }
  },
  methods: {
    update() {
      this.isUnlocked = OuterTeresaUnlocks.spaceShard.canBeApplied;
      this.spaceShard.copyFrom(Currency.spaceShard);
      this.shardMultiplier = OuterTeresa.spaceShardMultiplier;
      this.spaceDimension = player.outerSpace.celestials.teresa.spaceDimension;
      this.isAvailable = player.outerSpace.celestials.teresa.availableSpaceReality;
      this.timer = (player.outerSpace.celestials.teresa.timeBefore / TimeSpan.fromHours(5).totalMilliseconds);
    },
    Enter() {
      player.outerSpace.celestials.teresa.timeBefore = 0;
      clearCelestialRuns();
      player.outerSpace.celestials.teresa.inSpaceReality = true;
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
      They have some effect on your game : {{ formatX(shardMultiplier, 2, 2) }} on antimatter dimension.

      <br>
      <span v-if="spaceDimension === 0">
        Once you have one, something special will happen.
      </span>
      <span v-if="spaceDimension >= 1">
        You have {{ quantifyInt("Dimension",spaceDimension) }}.
      </span>
      <br>
      <div
        v-if="spaceDimension >= 1"
        :class="ClassButton"
        @click="Enter"
      >
        <span>
          Enter the Outer Reality of Teresa
        </span>
        <br>
        <span>
          Reality is {{ formatPercents(timer, 3) }}% charged.
        </span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.c-outer-teresa-reality-button__available {
  border: var(--var-border-width, 0.2rem) solid crimson;
  border-radius: var(--var-border-radius, 0.5rem);
  padding: 1rem;
  -webkit-user-select: none;
  user-select: none;
}

.c-outer-teresa-reality-button__available:hover {
  border: var(--var-border-width, 0.2rem) solid crimson;
  border-radius: var(--var-border-radius, 0.5rem);
  background-color: crimson;
  padding: 1rem;
  -webkit-user-select: none;
  user-select: none;
}
.c-outer-teresa-reality-button__unavailable {
  border: var(--var-border-width, 0.5rem) solid gray;
  border-radius: var(--var-border-radius, 0.5rem);
  padding: 1rem;
  -webkit-user-select: none;
  user-select: none;
  pointer-events: none;
}
</style>