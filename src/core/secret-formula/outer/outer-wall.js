
export const outerWall = {
    automatorStart: {
        outers: 2,
        reward: () => {
            player.reality.automator.forceUnlock = true;
            return "Start with the automator each times you tried to go outer";
        }
    },
    two: {
        outers: 3,
        reward: "Start with NA"
    },
    three: {
        outers: 4,
        reward: "Start with NA"
    },
    four: {
        outers: 5,
        reward: "Start with NA"
    },
    five: {
        outers: 6,
        reward: "Start with NA"
    },
    six: {
        outers: 7,
        reward: "Start with NA"
    },
};