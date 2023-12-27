
export function emphasizeEnd(fraction) {
  return Math.pow(fraction, 10);
}

export function pelleStarPosition(angle, scale) {
  const pelleCenter = new Vector(750, 550);
  const theta = (0.7 - 0.4 * angle) * Math.PI;
  return new Vector(scale * Math.cos(theta), -scale * Math.sin(theta)).plus(pelleCenter);
}

export const OUTER_CELESTIAL_NAV_DRAW_ORDER = {
  // Node background is a black fuzzy circle drawn behind nodes. It can help show their
  // outline in some cases, and can be used in cases where a connector passes under a node
  NODE_BG: 0,
  CONNECTORS: 1000,
  NODES: 2000,
  NODE_OVERLAYS: 3000,
  CANVAS_OVERLAY: 4000,
};

const Positions = Object.freeze({
  outerteresa: new Vector(100, 100),
  outerteresaPerkPointShop: new Vector(0, -50),
  outerteresaSpaceShard: new Vector(0, -250),

  outereffarigShop: new Vector(300, 0),
  outereffarigRealityUnlock: new Vector(400, 50),
  outereffarigNode: new Vector(550, 25),

  outerenslavedReality: new Vector(650, 250),
  outerenslavedGlyphLevel:
   new Vector(650 + 75 * Math.cos(Math.PI / 180 * -60), 250 + 75 * Math.sin(Math.PI / 180 * -60)),
  outerenslavedGlyphRarity:
   new Vector(650 + 75 * Math.cos(Math.PI / 180 * 120), 250 + 75 * Math.sin(Math.PI / 180 * 120)),

  outervUnlockAchievement: new Vector(400, 350 + 50 * Math.sqrt(3)),
  outervAchievement0: new Vector(350, 350),
  outervAchievement1: new Vector(450, 350),
  outervAchievement2: new Vector(500, 350 + 50 * Math.sqrt(3)),
  outervAchievement3: new Vector(450, 350 + 100 * Math.sqrt(3)),
  outervAchievement4: new Vector(350, 350 + 100 * Math.sqrt(3)),
  outervAchievement5: new Vector(300, 350 + 50 * Math.sqrt(3)),

  outerraReality: new Vector(400, 200),
  outerraPetTeresa: new Vector(400 + 85 * Math.sin(Math.PI / 180 * 252), 200 + 85 * Math.cos(Math.PI / 180 * 252)),
  outerraPetEffarig: new Vector(400 + 85 * Math.sin(Math.PI / 180 * 140), 200 + 85 * Math.cos(Math.PI / 180 * 140)),
  outerraPetEnslaved: new Vector(400 + 85 * Math.sin(Math.PI / 180 * 78), 200 + 85 * Math.cos(Math.PI / 180 * 78)),
  outerraPetV: new Vector(400 + 85 * Math.sin(Math.PI / 180 * 0), 200 + 85 * Math.cos(Math.PI / 180 * 0)),

  outerlaitelaFirstCenter: new Vector(150, 450),
  outerlaitelaFirstLeft: new Vector(100, 500),
  outerlaitelaFirstRight: new Vector(200, 500),
  outerlaitelaSecondCenter: new Vector(150, 550),
  outerlaitelaSecondLeft: new Vector(100, 600),
  outerlaitelaSecondRight: new Vector(200, 600),
  outerlaitelaThirdCenter: new Vector(150, 650),

  outerpelleUnlock: new Vector(450, 580),
  outerpelleAchievementRequirement: pelleStarPosition(0, 0),
  outerpelleVacuum: pelleStarPosition(0, 150),
  outerpelleDecay: pelleStarPosition(1, 150),
  outerpelleChaos: pelleStarPosition(2, 150),
  outerpelleRecursion: pelleStarPosition(3, 150),
  outerpelleParadox: pelleStarPosition(4, 150),

  outerpelleGalaxyGen: pelleStarPosition(0, 0),
});

export const outercelestialNavigation = {
  "outer-teresa-base": {
    visible: () => true,
    complete: () => 1,
    node: {
      clickAction: () => Tab.celestials.teresa.show(true),
      completeClass: "c-outer-nav__test-complete",
      incompleteClass: "c-celestial-nav__test-incomplete",
      position: Positions.outerteresa,
      ring: {
        rMajor: 78,
        rMinor: 64,
      },
      legend: {
        text: "Outer Teresa",
        angle: 135,
        diagonal: 32,
        horizontal: 16,
      },
    }
  },
  "outer-teresa-reality-unlock": {
    visible: () => true,
    complete: () => (OuterTeresaUnlocks.run.canBeApplied
      ? 1 : Decimal.pLog10(OuterTeresa.pouredAmount) / Math.log10(OuterTeresaUnlocks.run.price)),
    node: {
      completeClass: "c-outer-nav__test-complete",
      incompleteClass: "c-celestial-nav__test-incomplete",
      position: Positions.outerteresa,
      ring: {
        rMajor: 32,
        rMinor: 22,
      },
      legend: {
        hideWhenCompleted: true,
        text: () => {
          const rm = OuterTeresa.pouredAmount;
          const cost = OuterTeresaUnlocks.run.price;
          return `Pour ${format(rm, 2)} / ${format(cost, 2)} RM`;
        },
        angle: 135,
        diagonal: 16,
        horizontal: 16,
      },
    },
    connector: (function() {
      const pathStart = -Math.PI;
      const pathEnd = Math.PI;
      const path = LogarithmicSpiral.fromPolarEndpoints(Positions.outerteresa, -Math.PI, 69, Math.PI, 26);
      const pathPadStart = path.angleFromRadius(64 - 3) - pathStart;
      const pathPadEnd = pathEnd - path.angleFromRadius(34);
      return {
        pathStart,
        pathEnd,
        path,
        pathPadStart,
        pathPadEnd,
        fill: "#7851ec",
      };
    }()),
  },
  "outer-teresa-reality": {
    visible: () => true,
    complete: () => (OuterTeresa.runCompleted ? 1 : 0),
    node: {
      clickAction: () => Tab.celestials.teresa.show(true),
      completeClass: "c-outer-nav__test-complete",
      incompleteClass: "c-celestial-nav__test-incomplete",
      symbol: "Ϟ",
      position: Positions.outerteresa,
      ring: {
        rMajor: 16,
      },
      alwaysShowLegend: true,
      legend: {
        text: "Teresa's Outer Reality",
        angle: -135,
        diagonal: 96,
        horizontal: 16,
      },
    }
  },
  "outer-teresa-pp-shop": {
    visible: () => true,
    complete: () => (OuterTeresaUnlocks.shop.canBeApplied
      ? 1 : Decimal.pLog10(OuterTeresa.pouredAmount) / Math.log10(OuterTeresaUnlocks.shop.price)),
    node: {
      clickAction: () => Tab.celestials.teresa.show(true),
      completeClass: "c-outer-nav__test-complete",
      incompleteClass: "c-celestial-nav__test-incomplete",
      position: Positions.outerteresaPerkPointShop,
      ring: {
        rMajor: 16,
        rMinor: 0,
      },
      legend: {
        text: complete => {
          if (complete >= 1) return "Teresa's Outer Perk Point Shop";
          const rm = OuterTeresa.pouredAmount;
          const cost = OuterTeresaUnlocks.shop.price;
          return [
            "Teresa's Outer Perk Point Shop",
            `Pour ${format(rm, 2)} / ${format(cost, 2)} Reality Machines`
          ];
        },
        angle: -35,
        diagonal: 16,
        horizontal: 16,
      },
    },
    connector: {
      pathStart: 0,
      pathEnd: 1,
      path: LinearPath.connectCircles(Positions.outerteresa, 78 - 1, Positions.outerteresaPerkPointShop, 16 - 1),
      completeWidth: 6,
      incompleteWidth: 4,
      fill: "#7851ec",
    }
  },
  "outer-teresa-space-shard": {
    visible: () => true,
    complete: () => (OuterTeresaUnlocks.spaceShard.canBeApplied
      ? 1 : Decimal.pLog10(OuterTeresa.pouredAmount) / Math.log10(OuterTeresaUnlocks.spaceShard.price)),
    node: {
      clickAction: () => Tab.celestials.teresa.show(true),
      completeClass: "c-eye-nav",
      incompleteClass: "c-celestial-nav__test-incomplete",
      position: Positions.outerteresaSpaceShard,
      ring: {
        rMajor: 16,
        rMinor: 0,
      },
      legend: {
        text: complete => {
          if (complete >= 1) return "Space Shard Unlock";
          const spaceCost = OuterTeresaUnlocks.spaceShard.price;
          const spaceRm = OuterTeresa.pouredAmount;
          return [
            "Space Shard Unlock",
            `Pour ${format(spaceRm, 2)} / ${format(spaceCost, 2)} Reality Machines`
          ];
        },
        angle: -35,
        diagonal: 16,
        horizontal: 16,
      },
    },
    connector: {
      pathStart: 0,
      pathEnd: 1,
      path: LinearPath.connectCircles(Positions.outerteresa, 78 - 1, Positions.outerteresaSpaceShard, 16 - 1),
      completeWidth: 6,
      incompleteWidth: 4,
      fill: "url(#gradTeresaEye)",
    }
  },
  "outer-effarig-shop": {
    visible: () => (OuterTeresa.isOuter),
    complete: () => (OuterTeresaUnlocks.effarig.canBeApplied
      ? 1 : Decimal.pLog10(OuterTeresa.pouredAmount) / Math.log10(OuterTeresaUnlocks.effarig.price)),
    node: {
      clickAction: () => Tab.celestials.effarig.show(true),
      completeClass: "c-outer-nav__effarig",
      incompleteClass: "c-celestial-nav__test-incomplete",
      position: Positions.outereffarigShop,
      ring: {
        rMajor: 24,
      },
      legend: {
        text: complete => {
          if (complete >= 1) return "Effarig's Outer Shop";
          const rm = OuterTeresa.pouredAmount;
          const cost = OuterTeresaUnlocks.effarig.price;
          return [
            "Outer Effarig",
            `Pour ${format(rm, 2)} / ${format(cost, 2)} Reality Machines`
          ];
        },
        angle: -135,
        diagonal: 16,
        horizontal: 16,
      },
    },
    connector: {
      pathStart: 0,
      pathEnd: 1,
      path: LinearPath.connectCircles(Positions.outerteresa, 78 - 1, Positions.outereffarigShop, 24 - 1),
      fill: "url(#gradTeresaEffarig)",
    }
  },
  "effarig-reality-unlock": {
    visible: () => OuterTeresaUnlocks.effarig.canBeApplied,
    // If the upgrade to unlock the reality isn't yet bought, clamp the progress at 99.9%,
    // even if the player has enough relic shards to buy it.
    complete: () => (OuterEffarigUnlock.run.isUnlocked
      ? 1 : Math.clampMax(0.999, Decimal.pLog10(Currency.relicShards.value) /
        Math.log10(OuterEffarigUnlock.run.cost))),
    node: {
      clickAction: () => Tab.celestials.effarig.show(true),
      completeClass: "c-outer-nav__effarig",
      incompleteClass: "c-celestial-nav__test-incomplete",
      position: Positions.outereffarigRealityUnlock,
      ring: {
        rMajor: 16,
      },
      legend: {
        text: complete => {
          if (complete >= 1) return "Unlock Effarig's Outer Reality";
          const rs = Currency.relicShards.value;
          const cost = OuterEffarigUnlock.run.cost;
          return [
            "Unlock Effarig's Outer Reality",
            `Reach ${format(rs, 2)} / ${format(cost, 2)} Relic Shards`
          ];
        },
        angle: 75,
        diagonal: 40,
        horizontal: 16,
      },
    },
    connector: {
      pathStart: 0,
      pathEnd: 1,
      path: LinearPath.connectCircles(Positions.outereffarigShop, 24 - 1, Positions.outereffarigRealityUnlock, 16 - 1),
      fill: "#f0503b",
    }
  },
};