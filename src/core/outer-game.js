import * as ADNotations from "@antimatter-dimensions/notations";

export const OG = {
  startOuterGame() {

    GameEnd.creditsClosed = false;
    GameEnd.creditsEverClosed = false;
    player.isGameEnd = false;
    player.celestials.pelle.doomed = false;
    if (OuterWall.MultFragments.isReached) {
      player.outer.fragment += 2;
    } else {
      player.outer.fragment++;
    }
    player.outers ++;

    const speedrun = player.speedrun;
    if (speedrun.isActive) {
      player.speedrun.previousRuns[player.records.fullGameCompletions + 1] = {
        isSegmented: speedrun.isSegmented,
        usedSTD: speedrun.usedSTD,
        startDate: speedrun.startDate,
        name: speedrun.name,
        offlineTimeUsed: speedrun.offlineTimeUsed,
        records: [...speedrun.records],
        achievementTimes: JSON.parse(JSON.stringify(speedrun.achievementTimes)),
        seedSelection: speedrun.seedSelection,
        initialSeed: speedrun.initialSeed,
      };

      // For the sake of keeping a bounded savefile size, we only keep a queue of the last 100 full runs. The earliest
      // this will feasibly become an issue from nonstop speedruns is around 2030; I guess we can revisit it at that
      // point if we really need to, but I suspect this limit should be high enough
      const prevRunIndices = Object.keys(speedrun.previousRuns).map(k => Number(k));
      if (prevRunIndices.length > 100) player.speedrun.previousRuns[prevRunIndices.min()] = undefined;
    }


    GlyphAppearanceHandler.unlockSet();
    this.restart();

    GameEnd.removeAdditionalEnd = true;
    GameEnd.additionalEnd = 15;
    setTimeout(() => GameStorage.save(), 10000);
  },

  restart() {
    const backUpOptions = JSON.stringify(player.options);
    // This can't be JSONed as it contains sets
    const secretUnlocks = player.secretUnlocks;
    const secretAchievements = JSON.stringify(player.secretAchievementBits);
    // We don't backup the whole player.reality.automator object because it contains "state",
    // which could lead to some edge cases where it starts when it shouldn't (ie before it's unlocked)
    // It's easier to do something like this to avoid it entirely.
    const automatorConstants = JSON.stringify(player.reality.automator.constants);
    const automatorScripts = JSON.stringify(player.reality.automator.scripts);
    const fullCompletions = player.records.fullGameCompletions;
    const fullTimePlayed = player.records.previousRunRealTime + player.records.realTimePlayed;
    const glyphCosmetics = JSON.stringify(player.reality.glyphs.cosmetics);
    const speedrunRecords = JSON.stringify(player.speedrun.previousRuns);
    const Outergame = JSON.stringify(player.outers);
    const OuterFragment = JSON.stringify(player.outer.fragment);
    Modal.hideAll();
    Quote.clearAll();
    GameStorage.hardReset();
    player.options = JSON.parse(backUpOptions);
    // We need to force this one to be true because otherwise the player will be unable to select their glyphs
    // until they can auto-reality
    player.options.confirmations.glyphSelection = true;
    player.secretUnlocks = secretUnlocks;
    player.secretAchievementBits = JSON.parse(secretAchievements);
    player.reality.automator.constants = JSON.parse(automatorConstants);
    player.reality.automator.scripts = JSON.parse(automatorScripts);
    player.records.fullGameCompletions = fullCompletions;
    player.records.previousRunRealTime = fullTimePlayed;
    ui.view.newUI = player.options.newUI;
    ui.view.news = player.options.news.enabled;
    player.reality.glyphs.cosmetics = JSON.parse(glyphCosmetics);
    player.speedrun.previousRuns = JSON.parse(speedrunRecords);
    Themes.find(Theme.currentName()).set();
    Notations.all.find(n => n.name === player.options.notation).setAsCurrent();
    ADNotations.Settings.exponentCommas.show = player.options.commas;
    player.lastUpdate = Date.now();
    player.outers = JSON.parse(Outergame);
    player.outer.fragment = JSON.parse(OuterFragment);
    Achievements.all[26].unlock();
    Achievements.all[53].unlock();
    if (player.outers === 1) TheEye.quotes.Outer.show();
  }
};

