<script>
import CustomizeableTooltip from "@/components/CustomizeableTooltip";

export default {
  name: "MimicTeresa",
  components: {
    CustomizeableTooltip
  },
  data() {
    return {
      pour: false,
      time: new Date().getTime(),
      mimicTeresa: false,
      pouredAmount: 0,
      isPouredAmountCapped: false,
      rm: new Decimal(0),
      percentage: "",
      possibleFillPercentage: "",
    };
  },
  computed: {
    unlockInfos: () => MimicTeresaUnlocks.all,
    pouredAmountCap: () => TheEye.pouredAmountCap,
    pourText() {
      return this.isPouredAmountCapped ? "Filled" : "Pour Rm";
    },
    rmMult: () => TheEye.rmMultiplier,
    unlockInfoTooltipArrowStyle() {
      return {
        borderRight: "0.5rem solid var(--color-theEye--base)"
      };
    },
    pourButtonClassObject() {
      return {
        "c-mimic-teresa-pour": true,
        "o-mimic-teresa-shop-button--available": !this.isPouredAmountCapped,
        "o-mimic-teresa-shop-button--capped": this.isPouredAmountCapped,
        "c-disabled-pour": this.isPouredAmountCapped,
        "o-mimic-teresa-shop-button": true
      };
    },
    isDoomed: () => Pelle.isDoomed,
  },
  methods: {
    update() {
      const now = new Date().getTime();
      if (this.pour) {
        const diff = (now - this.time) / 1000;
        TheEye.pourRM(diff);
      } else {
        TheEye.timePoured = 0;
      }
      this.time = now;
      this.pouredAmount = player.outer.MimicEye.pouredAmount;
      this.isPouredAmountCapped = this.pouredAmount === this.pouredAmountCap;
      this.rm.copyFrom(Currency.realityMachines);
      this.percentage = `${(TheEye.fill * 100).toFixed(2)}%`;
      this.possibleFillPercentage = `${(TheEye.possibleFill * 100).toFixed(2)}%`;
    },
    unlockDescriptionHeight(unlockInfo) {
      const maxPrice = MimicTeresaUnlocks[TheEye.lastUnlock].price;
      const pos = Math.log1p(unlockInfo.price) / Math.log1p(maxPrice);
      return `calc(${(100 * pos).toFixed(2)}% - 0.1rem)`;
    },
    hasUnlock(unlockInfo) {
      return unlockInfo.isUnlocked;
    },
    unlockInfoTooltipClass(unlockInfo) {
      return {
        "c-mimic-teresa-unlock-description": true,
        "c-mimic-teresa-unlock-description--unlocked": this.hasUnlock(unlockInfo)
      };
    },
  }
};
</script>

<template>
  <div>
    <div>
      <div class="l-rm-container l-teresa-mechanic-container">
        <button
          :class="pourButtonClassObject"
          @mousedown="pour = true"
          @touchstart="pour = true"
          @mouseup="pour = false"
          @touchend="pour = false"
          @mouseleave="pour = false"
        >
          {{ pourText }}
        </button>
        <div class="c-rm-store">
          <div
            class="c-rm-store-inner--light c-mimic-teresa-rm-store-inner"
            :style="{ height: possibleFillPercentage}"
          />
          <div
            class="c-mimic-teresa-rm-store-inner"
            :style="{ height: percentage }"
          >
            <div class="c-rm-store-label">
              {{ formatX(rmMult, 2, 2) }} RM gain
              <br>
              {{ format(pouredAmount, 2, 2) }}/{{ format(pouredAmountCap, 2, 2) }}
            </div>
          </div>
          <CustomizeableTooltip
            v-for="(unlockInfo) in unlockInfos"
            :key="unlockInfo.id"
            content-class="c-teresa-unlock-description--hover-area"
            :bottom="unlockDescriptionHeight(unlockInfo)"
            right="0"
            mode="right"
            :show="true"
            :tooltip-arrow-style="unlockInfoTooltipArrowStyle"
            :tooltip-class="unlockInfoTooltipClass(unlockInfo)"
          >
            <template #mainContent>
              <div
                class="c-mimic-teresa-milestone-line"
                :class="{ 'c-mimic-teresa-milestone-line__unlocked': hasUnlock(unlockInfo)}"
              />
            </template>
            <template #tooltipContent>
              <b :class="{ 'o-pelle-disabled': unlockInfo.pelleDisabled }">
                {{ format(unlockInfo.price, 2, 2) }}: {{ unlockInfo.description }}
              </b>
            </template>
          </CustomizeableTooltip>
        </div>
      </div>
      <div
        v-if="pouredAmount < pouredAmountCap"
        class="l-rm-container-labels l-teresa-mechanic-container"
      />
    </div>
  </div>
</template>

<style scoped>
.c-disabled-pour {
  opacity: 0.8;
  pointer-events: none;
}
</style>