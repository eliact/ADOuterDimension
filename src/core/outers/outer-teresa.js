

export const OuterTeresa = {
    displayName: "Teresa",
    possessiveName: "Teresa's",
    get isUnlocked() {
        return player.outer.tokens.teresa.unlocked;
    },
    initializeRun() {
        clearCelestialRuns();
        player.outer.tokens.active = true;
        player.outer.tokens.teresa.isRunning = true;
    },
    rewardMultiplier(antimatter) {
        return Decimal.max(Decimal.pow(antimatter.plus(1).log10() / 1.5e8, 12), 1).toNumber();
    },
    get isRunning() {
        return player.outer.tokens.teresa.isRunning;
    },
    get AtteinObjective() {
        
    },
    get isOuter() {
        return player.outerSpace.celestials.teresa.active;
    },
    get runCompleted() {
        return player.outer.tokens.teresa.done;
    },
    get runRewardMultiplier() {
        return this.rewardMultiplier(player.records.totalAntimatter);
    },
}