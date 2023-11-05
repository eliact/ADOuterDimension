<script>
import { DC } from "@/core/constants";

import CelestialQuoteHistory from "@/components/CelestialQuoteHistory";
import CustomizeableTooltip from "@/components/CustomizeableTooltip";
import GlyphSetPreview from "@/components/GlyphSetPreview";
import PerkShopUpgradeButton from "./PerkShopUpgradeButton";
import { Modal } from "../../../core/modal";
import { OuterTeresa, Teresa } from "../../../core/globals";

export default {
  name: "TeresaTab",
  components: {
    GlyphSetPreview,
    PerkShopUpgradeButton,
    CelestialQuoteHistory,
    CustomizeableTooltip
  },
  data() {
    return {
      pour: false,
      time: new Date().getTime(),
      pouredAmount: 0,
      isPouredAmountCapped: false,
      rm: new Decimal(0),
      percentage: "",
      possibleFillPercentage: "",
      rmMult: 0,
      bestAM: new Decimal(0),
      bestAMSet: [],
      lastMachines: new Decimal(0),
      runReward: 0,
      perkPoints: 0,
      hasReality: false,
      hasEPGen: false,
      hasPerkShop: false,
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
      runRewardOuter: 0
    };
  },
  computed: {
    unlockInfos: () => TeresaUnlocks.all,
    pouredAmountCap: () => Teresa.pouredAmountCap,
    showRunReward() {
      return this.bestAM.gt(1);
    },
    showOuterReward() {
      return this.bestAMouter.gt(1);
    },
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
    runButtonClassObject() {
      return {
        "o-pelle-disabled-pointer": this.isDoomed,
        "c-teresa-run-button__icon": !this.isOuter,
        "c-teresa-run-button__icon--running": this.isRunning && !this.isOuter,
        "c-celestial-run-button--clickable": !this.isDoomed && !this.isOuter,
        "c-outerteresa-run-button__icon": this.isOuter,
        "c-outerteresa-run-button__icon--running": this.isRunning && this.isOuter,
        "c-outercelestial-run-button--clickable": !this.isDoomed && this.isOuter,
      };
    },
    pourButtonClassObject() {
        return {
          "o-outerteresa-shop-button": this.isOuter,
          "c-outerteresa-pour": this.isOuter,
          "o-outerteresa-shop-button--available": !this.isPouredAmountCapped && this.isOuter,
          "o-outerteresa-shop-button--capped": this.isPouredAmountCapped && this.isOuter,
          "c-outerteresa-pour--unlock-available": this.canUnlockNextPour && this.isOuter,
          "c-disabled-pour": this.isPouredAmountCapped,
          "o-teresa-shop-button": !this.isOuter,
          "c-teresa-pour": !this.isOuter,
          "o-teresa-shop-button--available": !this.isPouredAmountCapped && !this.isOuter,
          "o-teresa-shop-button--capped": this.isPouredAmountCapped && !this.isOuter,
          "c-teresa-pour--unlock-available": this.canUnlockNextPour && !this.isOuter,
        };
    },
    pourText() {
      return this.isPouredAmountCapped ? "Filled" : "Pour RM";
    },
    runDescription() {
      return GameDatabase.celestials.descriptions[0].effects();
    },
    lastMachinesString() {
      return this.lastMachines.lt(DC.E10000)
        ? `${quantify("Reality Machine", this.lastMachines, 2)}`
        : `${quantify("Imaginary Machine", this.lastMachines.dividedBy(DC.E10000), 2)}`;
    },
    unlockInfoTooltipArrowStyle() {
      if(!this.isOuter) {
        return {
          borderRight: "0.5rem solid var(--color-teresa--base)",
        };
      } else {
        return {
          borderRight: "0.5rem solid var(--color-outerteresa--base)"
        };
      }
    },
    RmStoreClass() {
      return {
        "c-outerrm-store-inner": this.isOuter,
        "c-rm-store-inner--light": true,
        "c-rm-store-inner":!this.isOuter
      };
    },
    RmStoreInnerClass() {
      return {
        "c-outerrm-store-inner": this.isOuter,
        "c-rm-store-inner":!this.isOuter
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
      }
    },
    isDoomed: () => Pelle.isDoomed,
  },
  methods: {
    update() {
      const now = new Date().getTime();
      if (this.pour) {
        const diff = (now - this.time) / 1000;
        Teresa.pourRM(diff);
      } else {
        Teresa.timePoured = 0;
      }
      this.time = now;
      this.pouredAmount = player.celestials.teresa.pouredAmount;
      this.isPouredAmountCapped = this.pouredAmount === this.pouredAmountCap;
      this.percentage = `${(Teresa.fill * 100).toFixed(2)}%`;
      this.possibleFillPercentage = `${(Teresa.possibleFill * 100).toFixed(2)}%`;
      this.rmMult = Teresa.rmMultiplier;
      this.hasReality = TeresaUnlocks.run.isUnlocked;
      this.hasEPGen = TeresaUnlocks.epGen.isUnlocked;
      this.hasPerkShop = TeresaUnlocks.shop.isUnlocked;
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
      this.outers.copyFrom(player.outers);
      this.outerFragment.copyFrom(player.outer.fragment);
      this.TestUnlocked = player.outer.tokens.teresa.unlocked;
      this.TestDone = player.outer.tokens.teresa.done;
      this.TestRunning = player.outer.tokens.teresa.isRunning;
      this.TheEyeTalk = player.outer.quotes.theEye.quoteBits > 0 ? true : false;
      this.isOuter = player.outerSpace.celestials.teresa.active;
      this.bestAMouter.copyFrom(player.records.totalAntimatter);
      this.runRewardOuter = OuterTeresa.runRewardMultiplier;
    },
    startRun() {
      if (this.isDoomed) return;
      Modal.celestials.show({ name: "Teresa's", number: 0 });
    },
    unlockDescriptionHeight(unlockInfo) {
      const maxPrice = TeresaUnlocks[Teresa.lastUnlock].price;
      const pos = Math.log1p(unlockInfo.price) / Math.log1p(maxPrice);
      return `calc(${(100 * pos).toFixed(2)}% - 0.1rem)`;
    },
    hasUnlock(unlockInfo) {
      return unlockInfo.isUnlocked;
    },
    unlockInfoTooltipClass(unlockInfo) {
      return {
        "c-outerteresa-unlock-description": this.isOuter,
        "c-outerteresa-unlock-description--unlocked": this.hasUnlock(unlockInfo) && this.isOuter,
        "c-teresa-unlock-description": !this.isOuter,
        "c-teresa-unlock-description--unlocked": this.hasUnlock(unlockInfo) && !this.isOuter
      };
    },
    milestoneClass(unlockInfo) {
      return {
        "c-teresa-milestone-line": !this.isOuter,
        "c-teresa-milestone-line--unlocked": this.hasUnlock(unlockInfo) && !this.isOuter,
        "c-outerteresa-milestone-line": this.isOuter,
        "c-outerteresa-milestone-line--unlocked": this.hasUnlock(unlockInfo) && this.isOuter
      }
    },
    OuterTeresaIntro() {
      Teresa.quotes.IntroOuter.show();
      player.outer.tokens.teresa.unlocked = true;
      player.outerFragment -= 1;
      return;
    },
    EnterOuterTeresa() {
      if (this.isDoomed) return;
      Modal.outer.show({ name: "Teresa's", number: 0 });
    },
    GoOuterSpace() {
      player.outerSpace.celestials.teresa.active = true;
      Teresa.quotes.OuterTeresa.show();
      return;
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
    <div
      v-if="TestUnlocked===true && !TestDone===true && !TestRunning===true && !isOuter"
      class="l-teresa-fragment"
      @click="EnterOuterTeresa()"
    >
      Try
    </div>
    <div
      v-if="TheEyeTalk && !isOuter"
      class="l-teresa-fragment"
      @click="GoOuterSpace()"
    >
      Try to get out of this Reality
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
          v-if="hasEPGen"
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
            :class="RmStoreClass"
            :style="{ height: possibleFillPercentage}"
          />
          <div
            :class="RmStoreInnerClass"
            :style="{ height: percentage}"
          >
            <div class="c-rm-store-label">
              {{ formatX(rmMult, 2, 2) }} RM gain
              <br>
              {{ format(pouredAmount, 2, 2) }}/{{ format(pouredAmountCap, 2, 2) }}
            </div>
          </div>
          <CustomizeableTooltip
            v-for="unlockInfo in unlockInfos"
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
                :class="milestoneClass(unlockInfo)"
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
      <div
        v-if="hasPerkShop"
        class="c-teresa-shop"
      >
        <span class="o-teresa-pp">
          You have {{ quantify("Perk Point", perkPoints, 2, 0) }}.
        </span>
        <PerkShopUpgradeButton
          v-for="upgrade in upgrades"
          :key="upgrade.id"
          :upgrade="upgrade"
        />
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
