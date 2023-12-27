import { outercelestialNavigation } from "./outer-navigation";
import { outereffarigUnlocks } from "./outer-effarig";
import { outerperkShop } from "./outer-perk-shop";
import { outerteresa } from "./outer-teresa";
import { outerWall } from "./outer-wall";
import { quotes } from "./quotes";


export const outer = {
  wall: outerWall,
  descriptions: {},
  quotes,
  outerperkShop,
  outereffarig: {
    unlocks: outereffarigUnlocks
  },
  outerteresa,
  outernavigation: outercelestialNavigation,
};