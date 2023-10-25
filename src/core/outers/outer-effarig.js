

export const OuterEffarig = {

    get isUnlocked() {
        return player.outer.tokens.effarig.unlocked;
    },

    initializeRun() {
        clearCelestialRuns();
        player.outer.tokens.active = true;
        player.outer.tokens.effarig.isRunning = true;
    },

    get isRunning() {
        return player.outer.tokens.effarig.isRunning;
    },

    get runCompleted() {
        return player.outer.tokens.effarig.done;
    }
}