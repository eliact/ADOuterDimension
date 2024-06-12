import { BitUpgradeState } from "../game-mechanics/bit-upgrade-state";
import { Currency } from "../currency";
import { GameDatabase } from "../secret-formula/game-database";

export const OUTER_EFFARIG_STAGES = {
  INFINITY: 1,
  ETERNITY: 2,
  REALITY: 3,
  OUTER: 4,
  COMPLETED: 5
};


export const OuterEffarig = {
  displayName: "Effarig",
  possessiveName: "Effarig's",
  get isUnlocked() {
    return player.outer.tokens.effarig.unlocked;
  },
  initializeRun() {
    clearCelestialRuns();
    player.outer.tokens.effarig.isRunning = true;
    recalculateAllGlyphs();
    Tab.reality.glyphs.show(false);
  },
  get isRunning() {
    return player.outer.tokens.effarig.isRunning;
  },
  get runCompleted() {
    return player.outer.tokens.effarig.done;
  },
  get isOuter() {
    return player.outerSpace.celestials.active;
  },
  get currentStage() {
    if (!OuterEffarigUnlock.infinity.isUnlocked) {
      return OUTER_EFFARIG_STAGES.INFINITY;
    }
    if (!OuterEffarigUnlock.eternity.isUnlocked) {
      return OUTER_EFFARIG_STAGES.ETERNITY;
    }
    if (!OuterEffarigUnlock.reality.isUnlocked) {
      return OUTER_EFFARIG_STAGES.REALITY;
    }
    if (!OuterEffarigUnlock.outer.isUnlocked) {
      return OUTER_EFFARIG_STAGES.OUTER;
    }
    return OUTER_EFFARIG_STAGES.COMPLETED;
  },
  get currentStageName() {
    switch (this.currentStage) {
      case OUTER_EFFARIG_STAGES.INFINITY:
        return "Infinity";
      case OUTER_EFFARIG_STAGES.ETERNITY:
        return "Eternity";
      case OUTER_EFFARIG_STAGES.REALITY:
        return "Reality";
      case OUTER_EFFARIG_STAGES.OUTER:
      default:
        return "Outer";
    }
  },
  get eternityCap() {
    return this.isRunning && this.currentStage === OUTER_EFFARIG_STAGES.ETERNITY ? DC.E50 : undefined;
  },
  get glyphLevelCap() {
    switch (this.currentStage) {
      case OUTER_EFFARIG_STAGES.INFINITY:
        return 100;
      case OUTER_EFFARIG_STAGES.ETERNITY:
        return 1500;
      case OUTER_EFFARIG_STAGES.REALITY:
        return 2000;
      case OUTER_EFFARIG_STAGES.OUTER:
      default:
        return 2000;
    }
  },
  get glyphEffectAmount() {
    const genEffectBitmask = Glyphs.activeWithoutCompanion
      .filter(g => generatedTypes.includes(g.type))
      .reduce((prev, curr) => prev | curr.effects, 0);
    const nongenEffectBitmask = Glyphs.activeWithoutCompanion
      .filter(g => !generatedTypes.includes(g.type))
      .reduce((prev, curr) => prev | curr.effects, 0);
    return countValuesFromBitmask(genEffectBitmask) + countValuesFromBitmask(nongenEffectBitmask);
  },
  get shardsGained() {
    if (!OuterTeresaUnlocks.effarig.canBeApplied) return 0;
    return Math.floor(Math.pow(Currency.eternityPoints.exponent / 7000, this.glyphEffectAmount)) *
          AlchemyResource.effarig.effectValue;
  },
  get maxRarityBoost() {
    return 5 * Math.log10(Math.log10(Currency.relicShards.value + 20));
  },
  nerfFactor(power) {
    let c;
    switch (this.currentStage) {
      case OUTER_EFFARIG_STAGES.INFINITY:
        c = 1500;
        break;
      case OUTER_EFFARIG_STAGES.ETERNITY:
        c = 29.29;
        break;
      case OUTER_EFFARIG_STAGES.REALITY:
        c = 25;
        break;
      case OUTER_EFFARIG_STAGES.OUTER:
      default:
        c = 100;
        break;
    }
    return 3 * (1 - c / (c + Math.sqrt(power.pLog10())));
  },
  get tickDilation() {
    return 0.7 + 0.1 * this.nerfFactor(Currency.timeShards.value);
  },
  get multDilation() {
    return 0.25 + 0.25 * this.nerfFactor(Currency.infinityPower.value);
  },
  get tickspeed() {
    const base = 3 + Tickspeed.baseValue.reciprocal().log10();
    return Decimal.pow10(Math.pow(base, this.tickDilation)).reciprocal();
  },
  multiplier(mult) {
    const base = new Decimal(mult).pLog10();
    return Decimal.pow10(Math.pow(base, this.multDilation));
  },
  get bonusRG() {
    // Will return 0 if Effarig Infinity is uncompleted
    return Math.floor(replicantiCap().pLog10() / LOG10_MAX_VALUE - 1);
  },
  symbol: "Ϙ"
};

class OuterEffarigUnlockState extends BitUpgradeState {
  get bits() { return player.outerSpace.celestials.effarig.unlockBits; }
  set bits(value) { player.outerSpace.celestials.effarig.unlockBits = value; }

  get cost() {
    return this.config.cost;
  }

  get isEffectActive() {
    return !Pelle.isDisabled("effarig");
  }

  purchase() {
    if (this.isUnlocked || !Currency.relicShards.purchase(this.cost)) return;
    this.unlock();
    this.config.onPurchased?.();
  }
}

export const OuterEffarigUnlock = mapGameDataToObject(
  GameDatabase.outer.outereffarig.unlocks,
  config => new OuterEffarigUnlockState(config)
);