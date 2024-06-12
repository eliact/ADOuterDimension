import { BitUpgradeState } from "../game-mechanics/bit-upgrade-state";
import { GameDatabase } from "../secret-formula/game-database";

import { OuterQuotes } from "./quotes";

export const TheEye = {
  displayName: "The Eye",
  possessiveName: "The Eye's",
  pouredAmountCap: 1e20,
  lastUnlock: "GlyphBoost",
  quotes: OuterQuotes.theEye,
  symbol: "⊚",
  get isUnlocked() {
    return true;
  },
  pourRM(diff) {
    if (this.pouredAmount >= this.pouredAmountCap) return;
    this.timePoured += diff;
    const rm = Currency.realityMachines.value;
    const rmPoured = Math.min((this.pouredAmount + 1e6) * 0.01 * Math.pow(this.timePoured, 2), rm.toNumber());
    this.pouredAmount += Math.min(rmPoured, this.pouredAmountCap - this.pouredAmount);
    Currency.realityMachines.subtract(rmPoured);
    this.checkForUnlocks();
  },
  checkForUnlocks() {
    for (const info of MimicTeresaUnlocks.all) {
      info.unlock();
    }
  },
  get pouredAmount() {
    return player.outer.MimicEye.pouredAmount;
  },
  set pouredAmount(amount) {
    player.outer.MimicEye.pouredAmount = amount;
  },
  get fill() {
    return Math.min(Math.log10(this.pouredAmount) / 24, 1);
  },
  get possibleFill() {
    return Math.min(Currency.realityMachines.value.plus(this.pouredAmount).log10() / 24, 1);
  },
  get rmMultiplier() {
    return Math.max((250 * Math.pow(this.pouredAmount / 1e24, 0.1)) * 1.5, 1);
  }
};

class MimicTeresaUnlockState extends BitUpgradeState {
  get bits() { return player.outer.MimicEye.TeresaBits; }
  set bits(value) { player.outer.MimicEye.TeresaBits = value; }

  get price() {
    return this.config.price;
  }

  get pelleDisabled() {
    return false;
  }

  get isEffectActive() {
    return !this.pelleDisabled;
  }

  get canBeUnlocked() {
    return !this.isUnlocked && TheEye.pouredAmount >= this.price;
  }

  get description() {
    return typeof this.config.description === "function" ? this.config.description() : this.config.description;
  }

  onUnlock() {
    this.config.onUnlock?.();
  }
}

export const MimicTeresaUnlocks = mapGameDataToObject(
  GameDatabase.outer.TeresaMimic.unlocks,
  config => new MimicTeresaUnlockState(config)
);