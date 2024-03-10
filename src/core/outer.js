import { Currency } from "./currency";
import { GameDatabase } from "./secret-formula/game-database";

export class OuterWallState {
  constructor(config) {
    this.config = config;
  }

  get isReached() {
    return Currency.outers.gte(this.config.outers);
  }
}
export const OuterWall = mapGameDataToObject(
  GameDatabase.outer.wall,
  config => new OuterWallState(config)
);