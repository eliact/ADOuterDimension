/* eslint-disable complexity */
import { Achievement, BlackHoles, BreakInfinityUpgrade, DilationUpgrade,
  END_STATE_MARKERS, EternityChallenges, EternityUpgrade,
  GameEnd, InfinityChallenge, RealityUpgrades, Replicanti, ReplicantiUpgrade } from "./globals";
import { Currency } from "./currency";
import { GameUI } from "./ui";
import { InfinityUpgrade } from "./infinity-upgrades";
import { PlayerProgress } from "./player-progress";


export function ListBugAnti(id) {
  if (id <= 10) {
    player.bug.Anti++;
    player.bugs++;
    GameUI.notify.outer(`You encounter a bug`, 8000);
    player.galaxies++;
    if (player.galaxies === 1) {
      Achievement(26).unlock();
      return;
    }
    if (player.galaxies === 2) {
      Achievement(27).unlock();
      return;
    }
    return;

  }
  if (id <= 25 && id > 10) {
    player.bug.Anti++;
    player.bugs++;
    GameUI.notify.outer(`You encounter a bug`, 8000);
    player.dimensionBoosts++;
    if (player.dimensionBoosts >= 10) {
      Achievement(25).unlock();
      return;
    }
    return;

  }
  if (id <= 45 && id > 25) {
    player.bug.Anti++;
    player.bugs++;
    GameUI.notify.outer(`You encounter a bug`, 8000);
    player.totalTickBought += 3;
    return;
  }
  if (id <= 90 && id > 45) {
    player.bug.Anti++;
    player.bugs++;
    GameUI.notify.outer(`You encounter a bug`, 8000);
    Currency.antimatter.multiply(100);
    return;
  }
  if (id === 100) {
    player.bug.Super++;
    player.bugs++;
    GameUI.notify.outer(`You encounter a superbug`, 8000);
    player.galaxies = 30;
    Achievement(26).unlock();
    Achievement(27).unlock();
    Achievement(83).unlock();
  }
}

export function ListBugInf(id) {
  if (id <= 7) {
    player.bug.Inf++;
    player.bugs++;
    GameUI.notify.outer(`You encounter a bug`, 8000);
    if (!InfinityUpgrade.totalTimeMult.isBought) {
      InfinityUpgrade.totalTimeMult.isBought = true;
      return;
    }
    if (!InfinityUpgrade.buy10Mult.isBought) {
      InfinityUpgrade.buy10Mult.isBought = true;
      return;
    }
    if (!InfinityUpgrade.dim18mult.isBought) {
      InfinityUpgrade.dim18mult.isBought = true;
      return;
    }
    if (!InfinityUpgrade.dim27mult.isBought) {
      InfinityUpgrade.dim27mult.isBought = true;
      return;
    }
    if (!InfinityUpgrade.dim36mult.isBought) {
      InfinityUpgrade.dim36mult.isBought = true;
      return;
    }
    if (!InfinityUpgrade.dim45mult.isBought) {
      InfinityUpgrade.dim45mult.isBought = true;
      return;
    }
    if (!InfinityUpgrade.resetBoost.isBought) {
      InfinityUpgrade.resetBoost.isBought = true;
      return;
    }
    if (!InfinityUpgrade.galaxyBoost.isBought) {
      InfinityUpgrade.galaxyBoost.isBought = true;
      return;
    }
    if (!InfinityUpgrade.thisInfinityTimeMult.isBought) {
      InfinityUpgrade.thisInfinityTimeMult.isBought = true;
      return;
    }
    if (!InfinityUpgrade.unspentIPMult.isBought) {
      InfinityUpgrade.unspentIPMult.isBought = true;
      return;
    }
    if (!InfinityUpgrade.dimboostMult.isBought) {
      InfinityUpgrade.dimboostMult.isBought = true;
      return;
    }
    if (!InfinityUpgrade.ipGen.isBought) {
      InfinityUpgrade.ipGen.isBought = true;
      return;
    }
    if (!InfinityUpgrade.skipReset1.isBought) {
      InfinityUpgrade.skipReset1.isBought = true;
      return;
    }
    if (!InfinityUpgrade.skipReset2.isBought) {
      InfinityUpgrade.skipReset2.isBought = true;
      return;
    }
    if (!InfinityUpgrade.skipReset3.isBought) {
      InfinityUpgrade.skipReset3.isBought = true;
      return;
    }
    if (!InfinityUpgrade.skipResetGalaxy.isBought) {
      Achievement(41).unlock();
      InfinityUpgrade.skipResetGalaxy.isBought = true;
      return;
    }
    if (!InfinityUpgrade.ipOffline.isBought) {
      InfinityUpgrade.ipOffline.isBought = true;
      return;
    }
    player.IPMultPurchases++;
    return;
  }
  if (id <= 50 && id > 10) {
    player.bug.Inf++;
    player.bugs++;
    GameUI.notify.outer(`You encounter a bug`, 8000);
    if (Currency.infinityPoints.value.lte(1000)) {
      player.infinityPoints.mantissa += 1;
      return;
    }
    player.infinityPoints.mantissa *= 1.2;
    return;
  }
  if (id <= 90 && id > 50) {
    player.bug.Inf++;
    player.bugs++;
    GameUI.notify.outer(`You encounter a bug`, 8000);
    player.infinities.mantissa *= 1.2;
    if (Currency.infinities.value.mantissa >= 10 && Currency.infinities.value.mantissa <= 10000) {
      Achievement(33).unlock();
      return;
    }
    return;
  }
  if (id <= 95 && id > 90) {
    player.bug.Inf++;
    player.bugs++;
    GameUI.notify.outer(`You encounter a bug`, 8000);
    if (!NormalChallenge(2).isCompleted) {
      NormalChallenge(2).complete();
      player.challenge.normal.current = 0;
      return;
    }
    if (!NormalChallenge(3).isCompleted) {
      NormalChallenge(3).complete();
      player.challenge.normal.current = 0;
      return;
    }
    if (!NormalChallenge(4).isCompleted) {
      NormalChallenge(4).complete();
      player.challenge.normal.current = 0;
      Achievement(47).unlock();
      return;
    }
    if (!NormalChallenge(5).isCompleted) {
      NormalChallenge(5).complete();
      player.challenge.normal.current = 0;
      return;
    }
    if (!NormalChallenge(6).isCompleted) {
      NormalChallenge(6).complete();
      player.challenge.normal.current = 0;
      return;
    }
    if (!NormalChallenge(7).isCompleted) {
      NormalChallenge(7).complete();
      player.challenge.normal.current = 0;
      return;
    }
    if (!NormalChallenge(8).isCompleted) {
      NormalChallenge(8).complete();
      player.challenge.normal.current = 0;
      return;
    }
    if (!NormalChallenge(9).isCompleted) {
      NormalChallenge(9).complete();
      player.challenge.normal.current = 0;
      return;
    }
    if (!NormalChallenge(10).isCompleted) {
      if (Currency.infinities.value.gt(16)) {
        NormalChallenge(10).complete();
        player.challenge.normal.current = 0;
        return;
      }
      Currency.infinities.add(16);
      NormalChallenge(10).complete();
      player.challenge.normal.current = 0;
      return;
    }
    if (!NormalChallenge(11).isCompleted) {
      NormalChallenge(11).complete();
      player.challenge.normal.current = 0;
      return;
    }
    if (!NormalChallenge(12).isCompleted) {
      NormalChallenge(12).complete();
      player.challenge.normal.current = 0;
      Achievement(48).unlock();
      return;
    }
    return;
  }
  if (id === 100) {
    player.bug.Super++;
    player.bugs++;
    GameUI.notify.outer(`You encounter a superbug`, 8000);
    player.IPMultPurchases += 15;
  }
}

export function ListBugBreak(id) {
  if (id <= 10) {
    player.bug.Break++;
    player.bugs++;
    GameUI.notify.outer(`You encounter a bug`, 8000);
    if (!BreakInfinityUpgrade.totalAMMult.isBought) {
      BreakInfinityUpgrade.totalAMMult.isBought = true;
      return;
    }
    if (!BreakInfinityUpgrade.currentAMMult.isBought) {
      BreakInfinityUpgrade.currentAMMult.isBought = true;
      return;
    }
    if (!BreakInfinityUpgrade.infinitiedMult.isBought) {
      BreakInfinityUpgrade.infinitiedMult.isBought = true;
      return;
    }
    if (!BreakInfinityUpgrade.achievementMult.isBought) {
      BreakInfinityUpgrade.achievementMult.isBought = true;
      return;
    }
    if (!BreakInfinityUpgrade.slowestChallengeMult.isBought) {
      BreakInfinityUpgrade.slowestChallengeMult.isBought = true;
      return;
    }
    if (!BreakInfinityUpgrade.infinitiedGen.isBought) {
      BreakInfinityUpgrade.infinitiedGen.isBought = true;
      return;
    }
    if (!BreakInfinityUpgrade.autobuyMaxDimboosts.isBought) {
      BreakInfinityUpgrade.autobuyMaxDimboosts.isBought = true;
      return;
    }
    if (!BreakInfinityUpgrade.galaxyBoost.isBought) {
      BreakInfinityUpgrade.galaxyBoost.isBought = true;
      return;
    }
    if (!BreakInfinityUpgrade.autobuyerSpeed.isBought) {
      BreakInfinityUpgrade.autobuyerSpeed.isBought = true;
      return;
    }
    if (BreakInfinityUpgrade.tickspeedCostMult.boughtAmount < 8) {
      BreakInfinityUpgrade.tickspeedCostMult.boughtAmount += 1;
      return;
    }
    if (BreakInfinityUpgrade.dimCostMult.boughtAmount < 7) {
      BreakInfinityUpgrade.dimCostMult.boughtAmount += 1;
      return;
    }
    if (BreakInfinityUpgrade.ipGen.boughtAmount < 10) {
      BreakInfinityUpgrade.ipGen.boughtAmount += 1;
      return;
    }
    return;
  }
  if (id <= 15 && id > 10) {
    player.bug.Break++;
    player.bugs++;
    GameUI.notify.outer(`You encounter a bug`, 8000);
    if (!InfinityChallenge(1).isCompleted) {
      InfinityChallenge(1).complete();
      player.challenge.infinity.current = 0;
      Achievement(67).unlock();
      return;
    }
    if (!InfinityChallenge(2).isCompleted) {
      InfinityChallenge(2).complete();
      player.challenge.infinity.current = 0;
      return;
    }
    if (!InfinityChallenge(3).isCompleted) {
      InfinityChallenge(3).complete();
      player.challenge.infinity.current = 0;
      return;
    }
    if (!InfinityChallenge(4).isCompleted) {
      InfinityChallenge(4).complete();
      player.challenge.infinity.current = 0;
      return;
    }
    if (!InfinityChallenge(5).isCompleted) {
      InfinityChallenge(5).complete();
      player.challenge.infinity.current = 0;
      return;
    }
    if (!InfinityChallenge(6).isCompleted) {
      InfinityChallenge(6).complete();
      player.challenge.infinity.current = 0;
      return;
    }
    if (!InfinityChallenge(7).isCompleted) {
      InfinityChallenge(7).complete();
      player.challenge.infinity.current = 0;
      return;
    }
    if (!InfinityChallenge(8).isCompleted) {
      InfinityChallenge(8).complete();
      player.challenge.infinity.current = 0;
      Achievement(82).unlock();
      return;
    }
    return;
  }
  if (id <= 40 && id > 15) {
    player.bug.Break++;
    player.bugs++;
    GameUI.notify.outer(`You encounter a bug`, 8000);
    player.infinityPoints.exponent = player.infinityPoints.exponent++;
    return;
  }
  if (id <= 70 && id > 40) {
    player.bug.Break++;
    player.bugs++;
    GameUI.notify.outer(`You encounter a bug`, 8000);
    player.infinities.mantissa *= 1.2;
    return;
  }
  if (id <= 85 && id > 70) {
    player.bug.Break++;
    player.bugs++;
    GameUI.notify.outer(`You encounter a bug`, 8000);
    player.IPMultPurchases += 3;
    return;
  }
  if (id <= 95 && id > 85) {
    player.bug.Break++;
    player.bugs++;
    GameUI.notify.outer(`You encounter a bug`, 8000);
    player.galaxies += 10;
    return;
  }
  if (id === 100) {
    player.bug.Super++;
    player.bugs++;
    GameUI.notify.outer(`You encounter a superbug`, 8000);
    player.infinityPoints.exponent += 20;
  }
}

export function ListBugRep(id) {
  if (id <= 10) {
    player.bug.Rep++;
    player.bugs++;
    GameUI.notify.outer(`You encounter a bug`, 8000);
    if (player.replicanti.galaxies === player.replicanti.boughtGalaxyCap) {
      player.replicanti.boughtGalaxyCap++;
      player.replicanti.galaxies += 1;
      return;
    }
    player.replicanti.galaxies += 1;
    return;
  }
  if (id <= 30 && id > 10) {
    player.bug.Rep++;
    player.bugs++;
    GameUI.notify.outer(`You encounter a bug`, 8000);
    if (player.replicanti.interval === ReplicantiUpgrade.interval.cap) {
      return;
    }
    player.replicanti.interval = Math.max(player.replicanti.interval * 0.9, ReplicantiUpgrade.interval.cap);
    return;

  }
  if (id <= 50 && id > 30) {
    player.bug.Rep++;
    player.bugs++;
    GameUI.notify.outer(`You encounter a bug`, 8000);
    if (player.replicanti.chance === ReplicantiUpgrade.chance.cap) {
      player.replicanti.chance = ReplicantiUpgrade.chance.cap;
      return;
    }
    player.replicanti.chance = nearestPercent(player.replicanti.chance + 0.01);
    return;

  }
  if (id <= 75 && id > 50) {
    player.bug.Rep++;
    player.bugs++;
    GameUI.notify.outer(`You encounter a bug`, 8000);
    if (Replicanti.amount.log10() <= 2) {
      Currency.replicanti.multiply(2);
      return;
    }
    Currency.replicanti.multiply(Currency.replicanti.value.log10());
    return;
  }
  if (id <= 90 && id > 75) {
    player.bug.Rep++;
    player.bugs++;
    GameUI.notify.outer(`You encounter a bug`, 8000);
    player.infinityPoints.exponent += 5;
    return;
  }
  if (id < 100 && id > 90) {
    player.bug.Rep++;
    player.bugs++;
    GameUI.notify.outer(`You encounter a bug`, 8000);
    Currency.infinities.add(Currency.infinities.value.log10());
    return;
  }
  if (id === 100) {
    player.bug.Super++;
    player.bugs++;
    GameUI.notify.outer(`You encounter a superbug`, 8000);
    Currency.eternityPoints.add(1);
  }
}


export function ListBugEter(id) {
  if (id <= 10) {
    player.bugs++;
    player.bug.Eter++;
    GameUI.notify.outer(`You encounter a bug`, 8000);
    if (Currency.eternityPoints.lte(1000)) {
      Currency.eternityPoints.add(2);
      return;
    }
    Currency.eternityPoints.add(Currency.eternityPoints.value.log10());
    return;
  }
  if (id <= 20 && id > 10) {
    player.bugs++;
    player.bug.Eter++;
    GameUI.notify.outer(`You encounter a bug`, 8000);
    if (Currency.eternities.lte(1000)) {
      Currency.eternities.add(1);
      return;
    }
    Currency.eternities.add(Currency.eternities.value.log10());
    return;
  }
  if (id <= 22 && id > 20) {
    player.bug.Eter++;
    player.bugs++;
    GameUI.notify.outer(`You encounter a bug`, 8000);
    if (!EternityUpgrade.idMultEP.isBought) {
      EternityUpgrade.idMultEP.isBought = true;
      return;
    }
    if (!EternityUpgrade.idMultEternities.isBought) {
      EternityUpgrade.idMultEternities.isBought = true;
      return;
    }
    if (!EternityUpgrade.idMultICRecords.isBought) {
      EternityUpgrade.idMultICRecords.isBought = true;
      return;
    }
    if (!EternityUpgrade.tdMultAchs.isBought) {
      EternityUpgrade.tdMultAchs.isBought = true;
      return;
    }
    if (!EternityUpgrade.tdMultTheorems.isBought) {
      EternityUpgrade.tdMultTheorems.isBought = true;
      return;
    }
    if (!EternityUpgrade.tdMultRealTime.isBought) {
      EternityUpgrade.tdMultRealTime.isBought = true;
      return;
    }
    EternityUpgrade.epMult.boughtAmount += 1;
    return;
  }
  if (id <= 38 && id > 23) {
    player.bug.Eter++;
    player.bugs++;
    GameUI.notify.outer(`You encounter a bug`, 8000);
    if (Currency.timeTheorems.lte(1000)) {
      Currency.timeTheorems.add(1);
      return;
    }
    Currency.timeTheorems.add(Currency.timeTheorems.value.log10());
    return;
  }
  if (id <= 42 && id > 38) {
    player.bug.Eter++;
    player.bugs++;
    GameUI.notify.outer(`You encounter a bug`, 8000);
    if (EternityChallenges.all[0].completions < 5) {
      EternityChallenges.all[0].addCompletion();
      return;
    }
    if (EternityChallenges.all[1].completions < 5) {
      EternityChallenges.all[1].addCompletion();
      return;
    }
    if (EternityChallenges.all[2].completions < 5) {
      EternityChallenges.all[2].addCompletion();
      return;
    }
    if (EternityChallenges.all[3].completions < 5) {
      EternityChallenges.all[3].addCompletion();
      return;
    }
    if (EternityChallenges.all[4].completions < 5) {
      EternityChallenges.all[4].addCompletion();
      return;
    }
    if (EternityChallenges.all[5].completions < 5) {
      EternityChallenges.all[5].addCompletion();
      return;
    }
    if (EternityChallenges.all[6].completions < 5) {
      EternityChallenges.all[6].addCompletion();
      return;
    }
    if (EternityChallenges.all[7].completions < 5) {
      EternityChallenges.all[7].addCompletion();
      return;
    }
    if (EternityChallenges.all[8].completions < 5) {
      EternityChallenges.all[8].addCompletion();
      return;
    }
    if (EternityChallenges.all[9].completions < 5) {
      EternityChallenges.all[9].addCompletion();
      Achievement(123).unlock();
      return;
    }
    if (EternityChallenges.all[10].completions < 5) {
      EternityChallenges.all[10].addCompletion();
      return;
    }
    if (EternityChallenges.all[11].completions < 5) {
      EternityChallenges.all[11].addCompletion();
      return;
    }
    return;
  }
  if (id <= 51 && id > 41) {
    player.bug.Eter++;
    player.bugs++;
    GameUI.notify.outer(`You encounter a bug`, 8000);
    Currency.infinitiesBanked.add(Currency.infinities.value.log10());
    return;
  }
  if (id === 100) {
    player.bug.Super++;
    player.bugs++;
    GameUI.notify.outer(`You encounter a superbug`, 8000);
    Currency.timeTheorems.add(100);
  }
}

export function ListBugDila(id) {
  if (id <= 10) {
    player.bug.Dila++;
    player.bugs++;
    GameUI.notify.outer(`You encounter a bug`, 8000);
    Currency.eternityPoints.multiply(2);
    return;
  }
  if (id <= 20 && id > 10) {
    player.bug.Dila++;
    player.bugs++;
    GameUI.notify.outer(`You encounter a bug`, 8000);
    Currency.eternities.multiply(2);
    return;
  }
  if (id <= 25 && id > 10) {
    player.bug.Dila++;
    player.bugs++;
    GameUI.notify.outer(`You encounter a bug`, 8000);
    Currency.tachyonParticles.multiply(2);
    return;
  }
  if (id <= 35 && id > 25) {
    player.bug.Dila++;
    player.bugs++;
    GameUI.notify.outer(`You encounter a bug`, 8000);
    Currency.dilatedTime.multiply(2);
    return;
  }
  if (id <= 40 && id > 35) {
    player.bug.Dila++;
    player.bugs++;
    GameUI.notify.outer(`You encounter a bug`, 8000);
    if (!DilationUpgrade.doubleGalaxies.isBought) {
      DilationUpgrade.doubleGalaxies.isBought = true;
      return;
    }
    if (!DilationUpgrade.tdMultReplicanti.isBought) {
      DilationUpgrade.tdMultReplicanti.isBought = true;
      return;
    }
    if (!DilationUpgrade.ndMultDT.isBought) {
      DilationUpgrade.ndMultDT.isBought = true;
      return;
    }
    if (!DilationUpgrade.ipMultDT.isBought) {
      DilationUpgrade.ipMultDT.isBought = true;
      return;
    }
    if (!DilationUpgrade.timeStudySplit.isBought) {
      DilationUpgrade.timeStudySplit.isBought = true;
      return;
    }
    if (!DilationUpgrade.dilationPenalty.isBought) {
      DilationUpgrade.dilationPenalty.isBought = true;
      return;
    }
    if (!DilationUpgrade.ttGenerator.isBought) {
      DilationUpgrade.ttGenerator.isBought = true;
      return;
    }
    const rand = randomInt(1, 3);
    switch (rand) {
      case 1: {
        DilationUpgrade.dtGain.boughtAmount += 1;
        return;
      }
      case 2: {
        DilationUpgrade.galaxyThreshold.boughtAmount += 1;
        return;
      }
      case 3: {
        DilationUpgrade.tachyonGain.boughtAmount += 1;
        return;
      }
    }
  }
  if (id <= 50 && id > 40) {
    player.bug.Dila++;
    player.bugs++;
    GameUI.notify.outer(`You encounter a bug`, 8000);
    Currency.infinitiesBanked.multiply(Currency.infinitiesBanked.value.log10());
  }
  if (id === 100) {
    player.bug.Super++;
    player.bugs++;
    GameUI.notify.outer(`You encounter a superbug`, 8000);
    if (TimeDimensions.all[4].amount.mantissa < 1) {
      TimeDimensions.all[4].amount.mantissa = 1;
      return;
    }
    if (TimeDimensions.all[5].amount.mantissa < 1) {
      TimeDimensions.all[5].amount.mantissa = 1;
      return;
    }
    if (TimeDimensions.all[6].amount.mantissa < 1) {
      TimeDimensions.all[6].amount.mantissa = 1;
      return;
    }
    if (TimeDimensions.all[7].amount.mantissa < 1) {
      TimeDimensions.all[7].amount.mantissa += 1;
    } else {
      TimeDimensions.all[7].amount.mantissa += 1;
    }
  }
}

// eslint-disable-next-line complexity
export function ListBugReal(id) {
  if (id <= 10) {
    player.bug.Real++;
    player.bugs++;
    GameUI.notify.outer(`You encounter a bug`, 8000);
    if (Currency.realityMachines.value.lt(1000)) {
      Currency.realityMachines.add(1);
      return;
    }
    Currency.realityMachines.add(Currency.realityMachines.value.log10());
    return;

  }
  if (id <= 20 && id > 10) {
    player.bug.Real++;
    player.bugs++;
    GameUI.notify.outer(`You encounter a bug`, 8000);
    Currency.realities.add(1);
    return;
  }
  if (id <= 25 && id > 20) {
    player.bug.Real++;
    player.bugs++;
    GameUI.notify.outer(`You encounter a bug`, 8000);
    Currency.perkPoints.add(1);
    return;
  }
  if (id <= 28 && id > 25) {
    player.bug.Real++;
    player.bugs++;
    GameUI.notify.outer(`You encounter a bug`, 8000);
    if (!RealityUpgrades.all[5].isBought) {
      RealityUpgrades.all[5].isBought = true;
      return;
    }
    if (!RealityUpgrades.all[6].isBought) {
      RealityUpgrades.all[6].isBought = true;
      return;
    }
    if (!RealityUpgrades.all[7].isBought) {
      RealityUpgrades.all[7].isBought = true;
      return;
    }
    if (!RealityUpgrades.all[8].isBought) {
      RealityUpgrades.all[8].isBought = true;
      return;
    }
    if (!RealityUpgrades.all[9].isBought) {
      RealityUpgrades.all[9].isBought = true;
      return;
    }
    if (!RealityUpgrades.all[10].isBought) {
      RealityUpgrades.all[10].isBought = true;
      return;
    }
    if (!RealityUpgrades.all[11].isBought) {
      RealityUpgrades.all[11].isBought = true;
      return;
    }
    if (!RealityUpgrades.all[12].isBought) {
      RealityUpgrades.all[12].isBought = true;
      return;
    }
    if (!RealityUpgrades.all[13].isBought) {
      RealityUpgrades.all[13].isBought = true;
      return;
    }
    if (!RealityUpgrades.all[14].isBought) {
      RealityUpgrades.all[14].isBought = true;
      return;
    }
    if (!RealityUpgrades.all[15].isBought) {
      RealityUpgrades.all[15].isBought = true;
      return;
    }
    if (!RealityUpgrades.all[16].isBought) {
      RealityUpgrades.all[16].isBought = true;
      return;
    }
    if (!RealityUpgrades.all[17].isBought) {
      RealityUpgrades.all[17].isBought = true;
      return;
    }
    if (!RealityUpgrades.all[18].isBought) {
      RealityUpgrades.all[18].isBought = true;
      return;
    }
    if (!RealityUpgrades.all[19].isBought) {
      RealityUpgrades.all[19].isBought = true;
      return;
    }
    if (!RealityUpgrades.all[20].isBought) {
      RealityUpgrades.all[20].isBought = true;
      return;
    }
    if (!RealityUpgrades.all[21].isBought) {
      RealityUpgrades.all[21].isBought = true;
      return;
    }
    if (!RealityUpgrades.all[22].isBought) {
      RealityUpgrades.all[22].isBought = true;
      return;
    }
    if (!RealityUpgrades.all[23].isBought) {
      RealityUpgrades.all[23].isBought = true;
      return;
    }
    if (!RealityUpgrades.all[24].isBought) {
      RealityUpgrades.all[24].isBought = true;
      Achievement(147).unlock();
      return;
    }
    return;
  }
  if (id <= 30 && id > 28) {
    player.bug.Real++;
    player.bugs++;
    GameUI.notify.outer(`You encounter a bug`, 8000);
    if (!player.blackHole[0].unlocked) {
      player.blackHole[0].unlocked = true;
      Achievement(144).unlock();
      return;
    }
    // eslint-disable-next-line no-negated-condition
    if (!BlackHoles.list[0].isPermanent) {
      const ran = randomInt(1, 3);
      switch (ran) {
        case 1: {
          BlackHoles.list[0].intervalUpgrade.incrementAmount();
          return;
        }
        case 2: {
          BlackHoles.list[0].durationUpgrade.incrementAmount();
          return;
        }
        case 3: {
          BlackHoles.list[0].powerUpgrade.incrementAmount();
          return;
        }
      }
    } else {
      return;
    }
  }
  if (id === 100) {
    player.bug.Super++;
    player.bugs++;
    GameUI.notify.outer(`You encounter a superbug`, 8000);
    const lev = randomInt(100, 400);
    const rar = randomRelat(1, 4, 1);
    const type = typeglyph();
    const pow = powglyph(type);
    Glyphs.addToInventory({
      id: undefined,
      idx: null,
      type,
      strength: rar,
      level: lev,
      rawLevel: lev,
      effects: makeGlyphEffectBitmask(pow) });
  }
}


function nearestPercent(x) {
  return Math.round(100 * x) / 100;
}

export function OuterBug() {
  if (PlayerProgress.outerUnlocked() && GameEnd.endState < END_STATE_MARKERS.INTERACTIVITY_DISABLED) {
    let id = null;
    if (PlayerProgress.TeresaUnlocked()) {
      return;
    }
    if (PlayerProgress.realityUnlocked()) {
      id = randomInt(1, 100);
      ListBugReal(id);
      return;
    }
    if (PlayerProgress.dilationUnlocked()) {
      id = randomInt(1, 100);
      console.log(id);
      ListBugDila(id);
      return;
    }
    if (PlayerProgress.eternityUnlocked()) {
      id = randomInt(1, 100);
      ListBugEter(id);
      return;
    }
    if (PlayerProgress.replicantiUnlocked()) {
      id = randomInt(1, 100);
      ListBugRep(id);
      return;
    }
    if (PlayerProgress.hasBroken()) {
      id = randomInt(1, 100);
      ListBugBreak(id);
      return;
    }
    if (PlayerProgress.infinityUnlocked()) {
      id = randomInt(1, 100);
      ListBugInf(id);
      return;
    }
    id = randomInt(1, 100);
    ListBugAnti(id);
  }


}

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function randomRelat(min, max, precision) {
  const r = Math.random() * (max - min) + min;
  const val = r.toFixed(precision);
  const values = parseFloat(val.replace(",", "."));
  return values;
}


// eslint-disable-next-line consistent-return
function typeglyph() {
  const t = randomInt(1, 5);
  let types = undefined;
  switch (t) {
    case 1: {
      types = "time";
      return types;
    }
    case 2: {
      types = "dilation";
      return types;
    }
    case 3: {
      types = "replication";
      return types;
    }
    case 4: {
      types = "infinity";
      return types;
    }
    case 5: {
      types = "power";
      return types;
    }
  }
}

// eslint-disable-next-line consistent-return
function powglyph(type) {
  if (type === "time") {
    return [["timepow"], ["timespeed"], ["timeetermult"], ["timeEP"]];
  }
  if (type === "dilation") {
    return [["dilationDT"], ["dilationgalaxyThreshold"], ["dilationTTgen"], ["dilationpow"]];
  }
  if (type === "replication") {
    return [["replicationspeed"], ["replicationpow"], ["replicationdtgain"], ["replicationglyphlevel"]];
  }
  if (type === "infinity") {
    return [["infinitypow"], ["infinityrate"], ["infinityIP"], ["infinityinfmult"]];
  }
  if (type === "power") {
    return [["powerpow"], ["powermult"], ["powerdimboost"], ["powerbuy10"]];
  }
}