

export const OuterEnslaved = {

  get isUnlocked() {
    return player.outer.tokens.enslaved.unlocked;
  },

  initializeRun() {
    clearCelestialRuns();
    player.outer.tokens.active = true;
    player.outer.tokens.enslaved.isRunning = true;
  },

  get isRunning() {
    return player.outer.tokens.enslaved.isRunning;
  },

  get runCompleted() {
    return player.outer.tokens.enslaved.done;
  }
};