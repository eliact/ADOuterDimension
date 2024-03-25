

export const OuterRa = {

  get isUnlocked() {
    return player.outer.tokens.ra.unlocked;
  },

  initializeRun() {
    clearCelestialRuns();
    player.outer.tokens.ra.isRunning = true;
  },

  get isRunning() {
    return player.outer.tokens.ra.isRunning;
  },

  get runCompleted() {
    return player.outer.tokens.ra.done;
  }
};
