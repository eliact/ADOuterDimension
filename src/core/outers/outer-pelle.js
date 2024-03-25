

export const OuterPelle = {

  get isUnlocked() {
    return player.outer.tokens.pelle.unlocked;
  },

  initializeRun() {
    player.outer.tokens.pelle.isRunning = true;
  },

  get isRunning() {
    return player.outer.tokens.pelle.isRunning;
  },

  get runCompleted() {
    return player.outer.tokens.pelle.done;
  }
};