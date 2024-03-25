

export const OuterLaitela = {

  get isUnlocked() {
    return player.outer.tokens.laitela.unlocked;
  },

  initializeRun() {
    clearCelestialRuns();
    player.outer.tokens.laitela.isRunning = true;
  },

  get isRunning() {
    return player.outer.tokens.laitela.isRunning;
  },

  get runCompleted() {
    return player.outer.tokens.laitela.done;
  }
};
