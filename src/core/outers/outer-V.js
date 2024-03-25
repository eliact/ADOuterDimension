

export const OuterV = {

  get isUnlocked() {
    return player.outer.tokens.v.unlocked;
  },

  initializeRun() {
    clearCelestialRuns();
    player.outer.tokens.v.isRunning = true;
  },

  get isRunning() {
    return player.outer.tokens.v.isRunning;
  },

  get runCompleted() {
    return player.outer.tokens.v.done;
  }
};