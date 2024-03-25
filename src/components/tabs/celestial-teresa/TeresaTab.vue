<script>
import { Currency, OuterTeresa, OuterTeresaUnlocks, Teresa } from "../../../core/globals";

import { Modal } from "../../../core/modal";

import { DC } from "@/core/constants";


import CelestialQuoteHistory from "@/components/CelestialQuoteHistory";
import CustomizeableTooltip from "@/components/CustomizeableTooltip";
import GlyphSetPreview from "@/components/GlyphSetPreview";
import OuterPerkShopUpgradeButton from "./OuterPerkShopUpgradeButton";
import PerkShopUpgradeButton from "./PerkShopUpgradeButton";


export default {
  name: "TeresaTab",
  components: {
    GlyphSetPreview,
    PerkShopUpgradeButton,
    CelestialQuoteHistory,
    CustomizeableTooltip,
    OuterPerkShopUpgradeButton
  },
  data() {
    return {
      pour: false,
      time: new Date().getTime(),
      pouredAmount: 0,
      outerpouredAmount: 0,
      isPouredAmountCapped: false,
      isOuterPouredAmountCapped: false,
      rm: new Decimal(0),
      percentage: "",
      outerpercentage: "",
      possibleFillPercentage: "",
      outerpossibleFillPercentage: "",
      bestAM: new Decimal(0),
      bestAMSet: [],
      lastMachines: new Decimal(0),
      runReward: 0,
      perkPoints: 0,
      hasReality: false,
      hasEPGen: false,
      hasOuterEPGen: false,
      hasPerkShop: false,
      hasOuterPerkShop: false,
      raisedPerkShop: false,
      isRunning: false,
      canUnlockNextPour: false,
      outers: new Decimal(0),
      outerFragment: 0,
      TestUnlocked: false,
      TestDone: false,
      TestRunning: false,
      TheEyeTalk: false,
      isOuter: false,
      bestAMouter: new Decimal(0),
      runRewardOuter: 0,
      hasSpaceShard: false
    };
  },
  computed: {
    unlockInfos: () => TeresaUnlocks.all,
    outerunlockInfos: () => OuterTeresaUnlocks.all,
    pouredAmountCap: () => Teresa.pouredAmountCap,
    outerpouredAmountCap: () => OuterTeresa.pouredAmountCap,
    showRunReward() {
      return this.bestAM.gt(1);
    },
    showOuterReward() {
      return this.bestAMouter.gt(1);
    },
    objectifAttained() {
      return OuterTeresaUnlocks.spaceShard.canBeApplied;
    },
    rmMult: () => (OuterTeresa.isOuter ? OuterTeresa.rmMultiplier : Teresa.rmMultiplier),
    upgrades() {
      const upgrades = [
        PerkShopUpgrade.glyphLevel,
        PerkShopUpgrade.rmMult,
        PerkShopUpgrade.bulkDilation,
        PerkShopUpgrade.autoSpeed,
        PerkShopUpgrade.musicGlyph,
      ];
      if (this.raisedPerkShop) upgrades.push(PerkShopUpgrade.fillMusicGlyph);
      return upgrades;
    },
    outerupgrades() {
      const outerupgrades = [
        OuterPerkShopUpgrade.glyphLevel,
        OuterPerkShopUpgrade.rmMult,
        OuterPerkShopUpgrade.bulkDilation,
        OuterPerkShopUpgrade.autoSpeed,
        OuterPerkShopUpgrade.musicGlyph,
      ];
      if (this.raisedPerkShop) outerupgrades.push(OuterPerkShopUpgrade.fillMusicGlyph);
      return outerupgrades;
    },
    runButtonClassObject() {
      return {
        "o-pelle-disabled-pointer": this.isDoomed,
        "c-teresa-run-button__icon": !this.isOuter,
        "c-teresa-run-button__icon--running": this.isRunning && !this.isOuter,
        "c-celestial-run-button--clickable": !this.isDoomed && !this.isOuter,
        "c-outerteresa-run-button__icon": this.isOuter || this.TestUnlocked,
        "c-outerteresa-run-button__icon--running": this.isRunning && this.isOuter,
        "c-outercelestial-run-button--clickable": !this.isDoomed && this.isOuter,
      };
    },
    pourButtonClassObject() {
      return {
        "o-outerteresa-shop-button": this.isOuter,
        "c-outerteresa-pour": this.isOuter,
        "o-outerteresa-shop-button--available": !this.isOuterPouredAmountCapped && this.isOuter,
        "o-outerteresa-shop-button--capped": this.isOuterPouredAmountCapped && this.isOuter,
        "c-outerteresa-pour--unlock-available": this.canUnlockNextPour && this.isOuter,
        "c-disabled-pour": (this.isPouredAmountCapped && !this.isOuter) ||
         (this.isOuterPouredAmountCapped && this.isOuter),
        "o-teresa-shop-button": !this.isOuter,
        "c-teresa-pour": !this.isOuter,
        "o-teresa-shop-button--available": !this.isPouredAmountCapped && !this.isOuter,
        "o-teresa-shop-button--capped": this.isPouredAmountCapped && !this.isOuter,
        "c-teresa-pour--unlock-available": this.canUnlockNextPour && !this.isOuter,
      };
    },
    pourText() {
      if (!this.isOuter) {
        return this.isPouredAmountCapped ? "Filled" : "Pour Rm";
      }
      return this.isOuterPouredAmountCapped ? "Filled" : "Pour RM";
    },
    runDescription() {
      return GameDatabase.celestials.descriptions[0].effects();
    },
    lastMachinesString() {
      return this.lastMachines.lt(DC.E10000)
        ? `${quantify("Reality Machine", this.lastMachines, 2)}`
        : `${quantify("Imaginary Machine", this.lastMachines.dividedBy(DC.E10000), 2)}`;
    },
    RmStoreClass() {
      return {
        "c-outerrm-store-inner": this.isOuter,
        "c-rm-store-inner--light": true,
        "c-rm-store-inner": !this.isOuter
      };
    },
    RmStoreInnerClass() {
      return {
        "c-outerrm-store-inner": this.isOuter,
        "c-rm-store-inner": !this.isOuter
      };
    },
    teresaUnlockClass() {
      return {
        "c-teresa-unlock": !this.isOuter,
        "c-outerteresa-unlock": this.isOuter
      };
    },
    teresaUnlockRunClass() {
      return {
        "c-teresa-run-button": !this.isOuter,
        "c-outerteresa-run-button": this.isOuter,
        "c-teresa-unlock": !this.isOuter,
        "c-outerteresa-unlock": this.isOuter,
      };
    },
    isDoomed: () => Pelle.isDoomed,
  },
  methods: {
    update() {
      const now = new Date().getTime();
      if (this.pour) {
        const diff = (now - this.time) / 1000;
        // eslint-disable-next-line no-unused-expressions
        this.isOuter ? OuterTeresa.pourRM(diff) : Teresa.pourRM(diff);
      } else {
        // eslint-disable-next-line no-unused-expressions
        this.isOuter ? OuterTeresa.timePoured = 0 : Teresa.timePoured = 0;
      }
      this.time = now;
      this.pouredAmount = player.celestials.teresa.pouredAmount;
      this.outerpouredAmount = player.outerSpace.celestials.teresa.pouredAmount;
      this.isPouredAmountCapped = this.pouredAmount === this.pouredAmountCap;
      this.isOuterPouredAmountCapped = this.outerpouredAmount === this.outerpouredAmountCap;
      this.percentage = `${(Teresa.fill * 100).toFixed(2)}%`;
      this.outerpercentage = `${(OuterTeresa.fill * 100).toFixed(2)}%`;
      this.possibleFillPercentage = `${(Teresa.possibleFill * 100).toFixed(2)}%`;
      this.outerpossibleFillPercentage = `${(OuterTeresa.possibleFill * 100).toFixed(2)}%`;
      this.hasReality = TeresaUnlocks.run.isUnlocked;
      this.hasEPGen = TeresaUnlocks.epGen.isUnlocked;
      this.hasOuterEPGen = OuterTeresaUnlocks.epGen.isUnlocked;
      this.hasPerkShop = TeresaUnlocks.shop.isUnlocked;
      this.hasOuterPerkShop = OuterTeresaUnlocks.shop.isUnlocked;
      this.raisedPerkShop = Ra.unlocks.perkShopIncrease.canBeApplied;
      this.bestAM.copyFrom(player.celestials.teresa.bestRunAM);
      this.bestAMSet = Glyphs.copyForRecords(player.celestials.teresa.bestAMSet);
      this.lastMachines.copyFrom(player.celestials.teresa.lastRepeatedMachines);
      this.runReward = Teresa.runRewardMultiplier;
      this.perkPoints = Currency.perkPoints.value;
      this.rm.copyFrom(Currency.realityMachines);
      this.isRunning = Teresa.isRunning;
      this.canUnlockNextPour = TeresaUnlocks.all
        .filter(unlock => this.rm.plus(this.pouredAmount).gte(unlock.price) && !unlock.isUnlocked).length > 0;
      this.outers = player.outers;
      this.outerFragment = player.outer.fragment;
      this.TestUnlocked = player.outer.tokens.teresa.unlocked;
      this.TestDone = OuterTeresa.runCompleted;
      this.TestRunning = OuterTeresa.isRunning;
      this.TheEyeTalk = player.outer.quotes.theEye.quoteBits > 0;
      this.isOuter = OuterTeresa.isOuter;
      this.bestAMouter.copyFrom(player.records.totalAntimatter);
      this.runRewardOuter = OuterTeresa.runRewardMultiplier;
      this.hasSpaceShard = OuterTeresaUnlocks.spaceShard.isUnlocked;
    },
    startRun() {
      if (this.isDoomed) return;
      if (this.TestUnlocked) Modal.outer.show({ name: "Teresa's", number: 0 });
      if (this.outers < 1) Modal.celestials.show({ name: "Teresa's", number: 0 });
    },
    unlockDescriptionHeight(unlockInfo) {
      const maxPrice = TeresaUnlocks[Teresa.lastUnlock].price;
      const pos = Math.log1p(unlockInfo.price) / Math.log1p(maxPrice);
      return `calc(${(100 * pos).toFixed(2)}% - 0.1rem)`;
    },
    outerunlockDescriptionHeight(unlockInfo) {
      const outermaxPrice = OuterTeresaUnlocks[OuterTeresa.lastUnlock].price;
      const outerpos = Math.log1p(unlockInfo.price) / Math.log1p(outermaxPrice);
      return `calc(${(100 * outerpos).toFixed(2)}% - 0.1rem)`;
    },
    hasUnlock(unlockInfo) {
      return unlockInfo.isUnlocked;
    },
    unlockInfoTooltipClass(unlockInfo, index) {
      return {
        "c-outerteresa-unlock-last-line": this.isOuter && index === 6,
        "c-outerteresa-unlock-last-line--unlocked": this.isOuter &&
         index === 6 && this.hasUnlock(unlockInfo),
        "c-outerteresa-unlock-description": this.isOuter && index < 6,
        "c-outerteresa-unlock-description--unlocked": this.hasUnlock(unlockInfo) && this.isOuter && index < 6,
        "c-teresa-unlock-description": !this.isOuter && index < 6,
        "c-teresa-unlock-description--unlocked": this.hasUnlock(unlockInfo) && !this.isOuter && index < 6
      };
    },
    milestoneClass(unlockInfo, index) {
      return {
        "c-outerteresa-milestone-last-line": this.isOuter && index === 6,
        "c-outerteresa-milestone-last-line--unlocked": this.isOuter &&
         index === 6 && this.hasUnlock(unlockInfo),
        "c-teresa-milestone-line": !this.isOuter && index < 6,
        "c-teresa-milestone-line--unlocked": this.hasUnlock(unlockInfo) && !this.isOuter && index < 6,
        "c-outerteresa-milestone-line": this.isOuter && index < 6,
        "c-outerteresa-milestone-line--unlocked": this.hasUnlock(unlockInfo) && this.isOuter && index < 6
      };
    },
    unlockInfoTooltipArrowStyle(index) {
      if (!this.isOuter) {
        return {
          borderRight: "0.5rem solid var(--color-teresa--base)"
        };
      }
      switch (index) {
        case 0: return {
          borderRight: "0.5rem solid var(--color-outerteresa--base)"
        };
        case 1: return {
          borderRight: "0.5rem solid var(--color-outerteresa--base)"
        };
        case 2: return {
          borderRight: "0.5rem solid var(--color-outerteresa--base)"
        };
        case 3: return {
          borderRight: "0.5rem solid var(--color-outerteresa--base)"
        };
        case 4: return {
          borderRight: "0.5rem solid var(--color-outerteresa--base)"
        };
        case 5: return {
          borderRight: "0.5rem solid var(--color-outerteresa--base)"
        };
        case 6: return {
          borderRight: "0.5rem solid var(--color-theEye--base)"
        };
        default: return {
          borderRight: "0.5rem solid var(--color-outerteresa--base)"
        };
      }
    },
    OuterTeresaIntro() {
      Teresa.quotes.IntroOuter.show();
      player.outer.tokens.teresa.unlocked = true;
    }
  }
};
</script>

<template>
  <div class="l-teresa-celestial-tab">
    <CelestialQuoteHistory celestial="teresa" />
    <div
      v-if="outers > 0 && TestUnlocked===false && outerFragment > 0"
      class="l-teresa-fragment"
      @click="OuterTeresaIntro()"
    >
      Approach Teresa
    </div>
    <div>
      You have {{ quantify("Reality Machine", rm, 2, 2) }}.
    </div>
    <div class="l-mechanics-container">
      <div
        v-if="hasReality"
        class="l-teresa-mechanic-container"
      >
        <div :class="teresaUnlockRunClass">
          <span :class="{ 'o-pelle-disabled': isDoomed }">
            Start Teresa's Reality.
          </span>
          <div
            :class="runButtonClassObject"
            @click="startRun()"
          >
            Ϟ
          </div>
          {{ runDescription }}
          <br><br>
          <div>
            This Reality can be repeated for a stronger reward based on the antimatter gained within it.
            <br><br>
            <span v-if="showRunReward && !isOuter">
              Your record antimatter in Teresa's Reality is {{ format(bestAM, 2) }},
              achieved with {{ lastMachinesString }}.
              <br><br>
              Glyph Set used:
              <GlyphSetPreview
                text="Teresa's Best Glyph Set"
                :text-hidden="true"
                :force-name-color="false"
                :glyphs="bestAMSet"
              />
            </span>
            <span v-else-if="showOuterReward && isOuter">
              Your record antimatter in this Game is {{ format(bestAMouter) }}
            </span>
            <span v-else>
              You have not completed Teresa's Reality yet.
            </span>
          </div>
        </div>
        <div
          v-if="showRunReward && !isOuter"
          :class="teresaUnlockClass"
        >
          Teresa Reality reward: Glyph Sacrifice power {{ formatX(runReward, 2, 2) }}
        </div>
        <div
          v-else-if="showOuterReward && isOuter"
          :class="teresaUnlockClass"
        >
          Teresa Outer Reality reward: Glyph Sacrifice power {{ formatX(runRewardOuter, 2, 2) }}
        </div>
        <div
          v-if="hasEPGen || hasOuterEPGen"
          :class="teresaUnlockClass"
        >
          <span
            v-if="!isOuter"
            :class="{ 'o-pelle-disabled': isDoomed }"
          >
            Every second, you gain {{ formatPercents(0.01) }} of your peaked Eternity Points per minute this Reality.
          </span>
          <span
            v-else-if="isOuter"
            :class="{ 'o-pelle-disabled': isDoomed }"
          >
            Every second, you gain {{ formatPercents(0.02) }} of your peaked Eternity Points per minute this Reality.
          </span>
        </div>
      </div>
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
            v-if="!isOuter"
            :class="RmStoreClass"
            :style="{ height: possibleFillPercentage}"
          />
          <div
            v-else-if="isOuter"
            :class="RmStoreClass"
            :style="{ height: outerpossibleFillPercentage}"
          />
          <div
            v-if="!isOuter"
            :class="RmStoreInnerClass"
            :style="{ height: percentage}"
          >
            <div class="c-rm-store-label">
              {{ formatX(rmMult, 2, 2) }} RM gain
              <br>
              {{ format(pouredAmount, 2, 2) }}/{{ format(pouredAmountCap, 2, 2) }}
            </div>
          </div>
          <div
            v-else-if="isOuter"
            :class="RmStoreInnerClass"
            :style="{ height: outerpercentage }"
          >
            <div class="c-rm-store-label">
              {{ formatX(rmMult, 2, 2) }} RM gain
              <br>
              {{ format(outerpouredAmount, 2, 2) }}/{{ format(outerpouredAmountCap, 2, 2) }}
            </div>
          </div>
          <div v-if="!isOuter">
            <CustomizeableTooltip
              v-for="(unlockInfo, index) in unlockInfos"
              :key="unlockInfo.id"
              content-class="c-teresa-unlock-description--hover-area"
              :bottom="unlockDescriptionHeight(unlockInfo)"
              right="0"
              mode="right"
              :show="true"
              :tooltip-arrow-style="unlockInfoTooltipArrowStyle(index)"
              :tooltip-class="unlockInfoTooltipClass(unlockInfo, index)"
            >
              <template #mainContent>
                <div
                  :class="milestoneClass(unlockInfo, index)"
                />
              </template>
              <template #tooltipContent>
                <b :class="{ 'o-pelle-disabled': unlockInfo.pelleDisabled }">
                  {{ format(unlockInfo.price, 2, 2) }}: {{ unlockInfo.description }}
                </b>
              </template>
            </CustomizeableTooltip>
          </div>
          <div v-else-if="isOuter">
            <CustomizeableTooltip
              v-for="(outerunlockInfo, index) in outerunlockInfos"
              :key="outerunlockInfo.id"
              content-class="c-teresa-unlock-description--hover-area"
              :bottom="unlockDescriptionHeight(outerunlockInfo)"
              right="0"
              mode="right"
              :show="true"
              :tooltip-arrow-style="unlockInfoTooltipArrowStyle(index)"
              :tooltip-class="unlockInfoTooltipClass(outerunlockInfo, index)"
            >
              <template
                #mainContent
              >
                <div
                  :class="milestoneClass(outerunlockInfo, index)"
                />
              </template>
              <template
                #tooltipContent
              >
                <b :class="{ 'o-pelle-disabled': outerunlockInfo.pelleDisabled }">
                  {{ format(outerunlockInfo.price, 2, 2) }}: {{ outerunlockInfo.description }}
                </b>
              </template>
            </CustomizeableTooltip>
          </div>
        </div>
      </div>
      <div
        v-if="pouredAmount < pouredAmountCap"
        class="l-rm-container-labels l-teresa-mechanic-container"
      />
      <div
        v-else-if="outerpouredAmount < outerpouredAmountCap"
        class="l-rm-container-labels l-teresa-mechanic-container"
      />
      <div
        v-if="hasPerkShop || hasOuterPerkShop"
        class="c-teresa-shop"
      >
        <span class="o-teresa-pp">
          You have {{ quantify("Perk Point", perkPoints, 2, 0) }}.
        </span>
        <div v-if="!isOuter">
          <PerkShopUpgradeButton
            v-for="upgrade in upgrades"
            :key="upgrade.id"
            :upgrade="upgrade"
          />
        </div>
        <div v-if="isOuter">
          <OuterPerkShopUpgradeButton
            v-for="upgrade in outerupgrades"
            :key="upgrade.id"
            :upgrade="upgrade"
          />
        </div>
        You can now modify the appearance of your Glyphs to look like Music Glyphs.
      </div>
    </div>
  </div>
</template>

<style scoped>
.c-disabled-pour {
  opacity: 0.8;
  pointer-events: none;
}
</style>
