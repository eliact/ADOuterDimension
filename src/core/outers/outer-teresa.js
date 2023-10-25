

export const OuterTeresa = {
    get isUnlocked() {
        return player.outer.tokens.teresa.unlocked;
    },

    initializeRun() {
        clearCelestialRuns();
        player.outer.tokens.active = true;
        player.outer.tokens.teresa.isRunning = true;
    },

    get isRunning() {
        return player.outer.tokens.teresa.isRunning;
    },

    get runCompleted() {
        return player.outer.tokens.teresa.done;
    }
}