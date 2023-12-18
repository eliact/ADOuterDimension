function rebuyableCost(initialCost, increment, id) {
  return initialCost * Math.pow(increment, player.outerSpace.celestials.teresa.outerperkShop[id]);
}
function rebuyable(config) {
  const { id, otherReq, cap, costCap, description, formatEffect, formatCost } = config;
  return {
    id,
    cost: () => (config.cost ? config.cost() : rebuyableCost(config.initialCost, config.increment, config.id)),
    otherReq,
    cap,
    costCap,
    description,
    effect: () => config.effect(player.outerSpace.celestials.teresa.outerperkShop[config.id]),
    formatEffect,
    formatCost,
    rebuyable: true
  };
}

export const outerperkShop = {
  glyphLevel: rebuyable({
    id: 0,
    initialCost: 1,
    increment: 1.5,
    description: () => `Increase pre-instability Glyph level by ${formatPercents(0.10)}`,
    effect: bought => Math.pow(1.1, bought),
    formatEffect: value => formatX(value, 2, 2),
    formatCost: value => format(value, 2),
    costCap: () => (Ra.unlocks.perkShopIncrease.canBeApplied ? 1048576 : 86),
    cap: () => (Ra.unlocks.perkShopIncrease.canBeApplied ? Math.pow(1.1, 20) : Math.pow(1.1, 11))
  }),
  rmMult: rebuyable({
    id: 1,
    initialCost: 1,
    increment: 1.5,
    description: "Triple Reality Machine gain",
    effect: bought => Math.pow(3, bought),
    formatEffect: value => formatX(value, 2),
    formatCost: value => format(value, 2),
    costCap: () => (Ra.unlocks.perkShopIncrease.canBeApplied ? 4194304 : 38),
    cap: () => (Ra.unlocks.perkShopIncrease.canBeApplied ? 4194304 : 16384)
  }),
  bulkDilation: rebuyable({
    id: 2,
    initialCost: 100,
    increment: 1.5,
    description: "Buy twice as many Dilation Upgrades at once.",
    effect: bought => Math.pow(2, bought),
    formatEffect: value => formatX(value, 2),
    formatCost: value => format(value, 2),
    costCap: () => (Ra.unlocks.perkShopIncrease.canBeApplied ? 3276800 : 1139),
    cap: () => (Ra.unlocks.perkShopIncrease.canBeApplied ? 65536 : 64),
  }),
  autoSpeed: rebuyable({
    id: 3,
    initialCost: 1000,
    increment: 1.5,
    description: () => `Infinity Dimension, Time Dimension, Dilation,
            and Replicanti autobuyers are ${formatX(2)} faster.`,
    effect: bought => Math.pow(2, bought),
    formatEffect: value => formatX(value, 2),
    formatCost: value => format(value, 2),
    costCap: () => (Ra.unlocks.perkShopIncrease.canBeApplied ? 64000 : 4000),
    cap: () => (Ra.unlocks.perkShopIncrease.canBeApplied ? 256 : 16)
  }),
  musicGlyph: rebuyable({
    id: 4,
    description: () => `Receive a Music Glyph of a random type that is ${formatPercents(0.8)} of your highest level.
          (Try clicking it!)`,
    cost: () => 1,
    formatCost: value => formatInt(value),
    costCap: () => Number.MAX_VALUE,
    cap: () => Number.MAX_VALUE
  }),
  // Only appears with the perk shop increase upgrade
  fillMusicGlyph: rebuyable({
    id: 5,
    description: () => `Fill all empty slots in your inventory with Music Glyphs`,
    cost: () => Math.clampMin(GameCache.glyphInventorySpace.value, 1),
    otherReq: () => GameCache.glyphInventorySpace.value > 0,
    formatCost: value => formatInt(value),
    costCap: () => Number.MAX_VALUE,
    cap: () => Number.MAX_VALUE
  }),
};