import { BitUpgradeState } from "../game-mechanics/bit-upgrade-state";
import { Currency } from "../currency";
import { GameCache } from "../cache";
import { GameDatabase } from "../secret-formula/game-database";
import { RebuyableMechanicState } from "../game-mechanics/rebuyable";


export const OuterTeresa = {
  timePoured: 0,
  lastUnlock: "spaceShard",
  displayName: "Teresa",
  possessiveName: "Teresa's",
  pouredAmountCap: 1e40,
  get isUnlocked() {
    return player.outer.tokens.teresa.unlocked;
  },
  pourRM(diff) {
    if (this.pouredAmount >= OuterTeresa.pouredAmountCap) return;
    this.timePoured += diff;
    const rm = Currency.realityMachines.value;
    const rmPoured = Math.min((this.pouredAmount + 1e6) * 0.01 * Math.pow(this.timePoured, 2), rm.toNumber());
    this.pouredAmount += Math.min(rmPoured, OuterTeresa.pouredAmountCap - this.pouredAmount);
    Currency.realityMachines.subtract(rmPoured);
    this.checkForUnlocks();
  },
  checkForUnlocks() {
    for (const info of OuterTeresaUnlocks.all) {
      info.unlock();
    }
  },
  initializeRun() {
    clearCelestialRuns();
    player.outer.tokens.active = true;
    player.outer.tokens.teresa.isRunning = true;
  },
  rewardMultiplier(antimatter) {
    return Decimal.max(Decimal.pow(antimatter.plus(1).log10() / 1.5e8, 12), 1).toNumber();
  },
  get isRunning() {
    return player.outer.tokens.teresa.isRunning;
  },
  get isOuter() {
    return player.outerSpace.celestials.teresa.active;
  },
  get runCompleted() {
    return player.outer.tokens.teresa.done;
  },
  get runRewardMultiplier() {
    return this.rewardMultiplier(player.records.totalAntimatter);
  },
  get pouredAmount() {
    return player.outerSpace.celestials.teresa.pouredAmount;
  },
  set pouredAmount(amount) {
    player.outerSpace.celestials.teresa.pouredAmount = amount;
  },
  get fill() {
    return Math.min(Math.log10(this.pouredAmount) / 24, 1);
  },
  get possibleFill() {
    return Math.min(Currency.realityMachines.value.plus(this.pouredAmount).log10() / 24, 1);
  },
  get rmMultiplier() {
    return Math.min(Math.max((250 * Math.pow(this.pouredAmount / 1e24, 0.1)) * 1.5, 1), 400);
  },
  get spaceShardGained() {
    if (!OuterTeresaUnlocks.spaceShard.canBeApplied) return 0;
    return 1;
  },
  get spaceShard() {
    return player.outerSpace.celestials.teresa.spaceShard;
  },
  get spaceShardMultiplier() {
    return Decimal.pow((this.spaceShard.ln()) / (Math.log(3)), 2);
  },
  addSpaceDimension() {
    if (Currency.spaceShard.lt(5e8)) return;
    Currency.spaceShard.reset();
    player.outerSpace.celestials.teresa.spaceDimension++;
  },
  get spaceDimension() {
    return player.outerSpace.celestials.teresa.spaceDimension;
  },
  get inSpaceReality() {
    return player.outerSpace.celestials.teresa.inSpaceReality;
  },
  symbol: "Ϟ"
};

class OuterPerkShopUpgradeState extends RebuyableMechanicState {
  constructor(config) {
    super(config);
    this.costCap = config.costCap;
  }

  get currency() {
    return Currency.perkPoints;
  }

  get boughtAmount() {
    return player.outerSpace.celestials.teresa.outerperkShop[this.id];
  }

  set boughtAmount(value) {
    player.outerSpace.celestials.teresa.outerperkShop[this.id] = value;
  }

  get isCapped() {
    return this.cost >= this.costCap(this.bought);
  }

  get isAvailableForPurchase() {
    const otherReq = this.config.otherReq ? this.config.otherReq() : true;
    return this.cost <= this.currency.value && otherReq;
  }

  onPurchased() {
    if (this.id === 0) {
      GameCache.staticGlyphWeights.invalidate();
    }
    if (this.id === 1) {
      Autobuyer.reality.bumpAmount(3);
    }
    if (this.id === 4 && !Pelle.isDoomed) {
      if (GameCache.glyphInventorySpace.value === 0) {
        // Refund the perk point if they didn't actually get a glyph
        Currency.perkPoints.add(1);
        GameUI.notify.error("You have no empty inventory space!");
      } else {
        Glyphs.addToInventory(GlyphGenerator.musicGlyph());
        GameUI.notify.success("Created a Music Glyph");
      }
    }
    // Fill the inventory with music glyphs
    if (this.id === 5 && !Pelle.isDoomed) {
      const toCreate = GameCache.glyphInventorySpace.value;
      for (let count = 0; count < toCreate; count++) Glyphs.addToInventory(GlyphGenerator.musicGlyph());
      GameUI.notify.success(`Created ${quantifyInt("Music Glyph", toCreate)}`);
    }

  }
}

class OuterTeresaUnlockState extends BitUpgradeState {
  get bits() { return player.outerSpace.celestials.teresa.unlockBits; }
  set bits(value) { player.outerSpace.celestials.teresa.unlockBits = value; }

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
    return !this.isUnlocked && OuterTeresa.pouredAmount >= this.price;
  }

  get description() {
    return typeof this.config.description === "function" ? this.config.description() : this.config.description;
  }

  onUnlock() {
    this.config.onUnlock?.();
  }
}

export const OuterTeresaUnlocks = mapGameDataToObject(
  GameDatabase.outer.outerteresa.unlocks,
  config => new OuterTeresaUnlockState(config)
);

export const OuterPerkShopUpgrade = mapGameDataToObject(
  GameDatabase.outer.outerperkShop,
  config => new OuterPerkShopUpgradeState(config)
);