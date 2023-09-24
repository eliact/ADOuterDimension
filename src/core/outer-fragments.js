import { Currency } from "./currency";
import { Achievement, BreakInfinityUpgrade, END_STATE_MARKERS, EternityChallenges, EternityUpgrade, GameEnd, InfinityChallenge, Replicanti, ReplicantiUpgrade, replicantiCap } from "./globals";
import { InfinityUpgrade } from "./infinity-upgrades";
import { PlayerProgress } from "./player-progress";
import { GameUI } from "./ui";




export function ListBugAnti(id) {
    if (id <= 10) {
        player.outer.bug.Anti++;
        GameUI.notify.outer(`You encounter a bug`, 8000);
        player.galaxies++;
        if (player.galaxies === 1) {
            return Achievement(26).unlock();
        } if (player.galaxies === 2) {
            return Achievement(27).unlock();
        } else {
            return;
        }
    } if (id <= 25 && id > 10) {
        player.outer.bug.Anti++;
        GameUI.notify.outer(`You encounter a bug`, 8000);
        player.dimensionBoosts++;
        if (player.dimensionBoosts >= 10) {
            return Achievement(25).unlock();
        } else {
            return;
        }
    } if (id <= 45 && id > 25) {
        player.outer.bug.Anti++;
        GameUI.notify.outer(`You encounter a bug`, 8000);
        return player.totalTickBought += 3;
    } if (id <= 90 && id > 45) {
        player.outer.bug.Anti++;
        GameUI.notify.outer(`You encounter a bug`, 8000);
        return Currency.antimatter.multiply(100);
    } if(id === 100) {
        player.outer.bug.Super++;
        GameUI.notify.outer(`You encounter a superbug`, 8000);
        Achievement(26).unlock();
        Achievement(27).unlock();
        return player.galaxies = 50;
    } else {
        return;
    }
};

export function ListBugInf(id) {
    if (id <= 10){
        player.outer.bug.Inf++;
        GameUI.notify.outer(`You encounter a bug`, 8000);
        if (!InfinityUpgrade.totalTimeMult.isBought) {
            return InfinityUpgrade.totalTimeMult.isBought = true;
        } if (!InfinityUpgrade.buy10Mult.isBought) {
            return InfinityUpgrade.buy10Mult.isBought = true;
        } if (!InfinityUpgrade.dim18mult.isBought) {
            return InfinityUpgrade.dim18mult.isBought = true;
        } if (!InfinityUpgrade.dim27mult.isBought) {
            return InfinityUpgrade.dim27mult.isBought = true;
        } if (!InfinityUpgrade.dim36mult.isBought) {
            return InfinityUpgrade.dim36mult.isBought = true;
        } if (!InfinityUpgrade.dim45mult.isBought) {
            return InfinityUpgrade.dim45mult.isBought = true;
        } if (!InfinityUpgrade.resetBoost.isBought) {
            return InfinityUpgrade.resetBoost.isBought = true;
        } if (!InfinityUpgrade.galaxyBoost.isBought) {
            return InfinityUpgrade.galaxyBoost.isBought = true;
        } if (!InfinityUpgrade.thisInfinityTimeMult.isBought) {
            return InfinityUpgrade.thisInfinityTimeMult.isBought = true;
        } if (!InfinityUpgrade.unspentIPMult.isBought) {
            return InfinityUpgrade.unspentIPMult.isBought = true;
        } if (!InfinityUpgrade.dimboostMult.isBought) {
            return InfinityUpgrade.dimboostMult.isBought = true;
        } if (!InfinityUpgrade.ipGen.isBought) {
            return InfinityUpgrade.ipGen.isBought = true;
        } if (!InfinityUpgrade.skipReset1.isBought) {
            return InfinityUpgrade.skipReset1.isBought = true;
        } if (!InfinityUpgrade.skipReset2.isBought) {
            return InfinityUpgrade.skipReset2.isBought = true;
        } if (!InfinityUpgrade.skipReset3.isBought) {
            return InfinityUpgrade.skipReset3.isBought = true;
        } if (!InfinityUpgrade.skipResetGalaxy.isBought) {
            Achievement(41).unlock();
            return InfinityUpgrade.skipResetGalaxy.isBought = true;
        } if (!InfinityUpgrade.ipOffline.isBought) {
            return InfinityUpgrade.ipOffline.isBought = true;
        } else {
            return player.IPMultPurchases++;
        }
    } if (id <= 50 && id > 10) {
        player.outer.bug.Inf++;
        GameUI.notify.outer(`You encounter a bug`, 8000);
        if (Currency.infinityPoints.value.mantissa === 0 && Currency.infinityPoints.value.exponent === 0) {
            player.infinityPoints.exponent = 0;
            return player.infinityPoints.mantissa = 1;
        } else {
            return player.infinityPoints.mantissa = player.infinityPoints.mantissa * 1.2;
        }
    } if (id <= 90 && id > 50) {
        player.outer.bug.Inf++;
        GameUI.notify.outer(`You encounter a bug`, 8000);
        player.infinities.mantissa = player.infinities.mantissa * 1.2;
        if (Currency.infinities.value.mantissa >= 10 && Currency.infinities.value.mantissa <= 10000) {
            return Achievement(33).unlock();
        } else {
            return;
        }
    } if (id <= 95 && id > 90) {
        player.outer.bug.Inf++;
        GameUI.notify.outer(`You encounter a bug`, 8000);
        if (!NormalChallenge(2).isCompleted) {
            return NormalChallenge(2).complete();
        } if (!NormalChallenge(3).isCompleted) {
            return NormalChallenge(3).complete();
        } if (!NormalChallenge(4).isCompleted) {
            return NormalChallenge(4).complete();
        } if (!NormalChallenge(5).isCompleted) {
            return NormalChallenge(5).complete();
        } if (!NormalChallenge(6).isCompleted) {
            return NormalChallenge(6).complete();
        } if (!NormalChallenge(7).isCompleted) {
            return NormalChallenge(7).complete();
        } if (!NormalChallenge(8).isCompleted) {
            return NormalChallenge(8).complete();
        } if (!NormalChallenge(9).isCompleted) {
            return NormalChallenge(9).complete();
        } if (!NormalChallenge(10).isCompleted) {
            if (Currency.infinities.value.gt(16)) {
                return NormalChallenge(10).complete();
            } else {
                Currency.infinities.add(16);
                return NormalChallenge(10).complete();
            }
            
        } if (!NormalChallenge(11).isCompleted) {
            return NormalChallenge(11).complete();
        } if (!NormalChallenge(12).isCompleted) {
            return NormalChallenge(12).complete();
        } else {
            return;
        }
    } if (id === 100) {
        player.outer.bug.Super++;
        GameUI.notify.outer(`You encounter a superbug`, 8000);
        return player.IPMultPurchases += 30;
    } else {
        return;
    }
};

export function ListBugBreak(id) {
    if (id <= 10) {
        player.outer.bug.Break++;
        GameUI.notify.outer(`You encounter a bug`, 8000);
        if (!BreakInfinityUpgrade.totalAMMult.isBought) {
            return BreakInfinityUpgrade.totalAMMult.isBought = true;
        } if (!BreakInfinityUpgrade.currentAMMult.isBought) {
            return BreakInfinityUpgrade.currentAMMult.isBought = true;
        } if (!BreakInfinityUpgrade.infinitiedMult.isBought) {
            return BreakInfinityUpgrade.infinitiedMult.isBought = true;
        } if (!BreakInfinityUpgrade.achievementMult.isBought) {
            return BreakInfinityUpgrade.achievementMult.isBought = true;
        } if (!BreakInfinityUpgrade.slowestChallengeMult.isBought) {
            return BreakInfinityUpgrade.slowestChallengeMult.isBought = true;
        } if (!BreakInfinityUpgrade.infinitiedGen.isBought) {
            return BreakInfinityUpgrade.infinitiedGen.isBought = true;
        } if (!BreakInfinityUpgrade.autobuyMaxDimboosts.isBought) {
            return BreakInfinityUpgrade.autobuyMaxDimboosts.isBought = true;
        } if (!BreakInfinityUpgrade.galaxyBoost.isBought) {
            return BreakInfinityUpgrade.galaxyBoost.isBought = true;
        } if (!BreakInfinityUpgrade.autobuyerSpeed.isBought) {
            return BreakInfinityUpgrade.autobuyerSpeed.isBought = true;
        } if (BreakInfinityUpgrade.tickspeedCostMult.boughtAmount < 8) {
            return BreakInfinityUpgrade.tickspeedCostMult.boughtAmount += 1;
        } if (BreakInfinityUpgrade.dimCostMult.boughtAmount < 7) {
            return BreakInfinityUpgrade.dimCostMult.boughtAmount += 1;
        } if (BreakInfinityUpgrade.ipGen.boughtAmount < 10) {
            return BreakInfinityUpgrade.ipGen.boughtAmount += 1;
        } else {
            return;
        }
    } if (id <= 15 && id > 10) {
        player.outer.bug.Break++;
        GameUI.notify.outer(`You encounter a bug`, 8000);
        if (!InfinityChallenge(1).isCompleted) {
            return InfinityChallenge(1).complete();
        } if (!InfinityChallenge(2).isCompleted) {
            return InfinityChallenge(2).complete();
        } if (!InfinityChallenge(3).isCompleted) {
            return InfinityChallenge(3).complete();
        } if (!InfinityChallenge(4).isCompleted) {
            return InfinityChallenge(4).complete();
        } if (!InfinityChallenge(5).isCompleted) {
            return InfinityChallenge(5).complete();
        } if (!InfinityChallenge(6).isCompleted) {
            return InfinityChallenge(6).complete();
        } if (!InfinityChallenge(7).isCompleted) {
            return InfinityChallenge(7).complete();
        } if (!InfinityChallenge(8).isCompleted) {
            return InfinityChallenge(8).complete();
        } else {
            return;
        }
    } if (id <= 40 && id > 15) {
        player.outer.bug.Break++;
        GameUI.notify.outer(`You encounter a bug`, 8000);
        return player.infinityPoints.exponent = player.infinityPoints.exponent++;
    } if (id <= 70 && id > 40) {
        player.outer.bug.Break++;
        GameUI.notify.outer(`You encounter a bug`, 8000);
        return player.infinities.mantissa = player.infinities.mantissa * 1.2;
    } if (id <= 85 && id > 70) {
        player.outer.bug.Break++;
        GameUI.notify.outer(`You encounter a bug`, 8000);
        return player.IPMultPurchases += 5;
    } if (id <= 95 && id > 85) {
        player.outer.bug.Break++;
        GameUI.notify.outer(`You encounter a bug`, 8000);
        return player.galaxies += 10;
    } if (id === 100) {
        player.outer.bug.Super++;
        GameUI.notify.outer(`You encounter a superbug`, 8000);
        return player.infinityPoints.exponent = 140;
    } else {
        return;
    }
};

export function ListBugRep(id) {
    if (id <= 10) {
        player.outer.bug.Rep++;
        GameUI.notify.outer(`You encounter a bug`, 8000);
        player.replicanti.boughtGalaxyCap++;
        return player.replicanti.galaxies += 1;
    } if (id <= 30 && id > 10) {
        player.outer.bug.Rep++;
        GameUI.notify.outer(`You encounter a bug`, 8000);
        if (player.replicanti.interval === ReplicantiUpgrade.interval.cap) {
            return;
        } else {
            return player.replicanti.interval = Math.max(player.replicanti.interval * 0.9, ReplicantiUpgrade.interval.cap);
        }
    } if (id <= 50 && id > 30) {
        player.outer.bug.Rep++;
        GameUI.notify.outer(`You encounter a bug`, 8000);
        if (player.replicanti.chance === ReplicantiUpgrade.chance.cap) {
            return player.replicanti.chance = ReplicantiUpgrade.chance.cap;
        } else {
            return player.replicanti.chance = nearestPercent(player.replicanti.chance + 0.01);
        }
    } if (id <= 75 && id > 50) {
        player.outer.bug.Rep++;
        GameUI.notify.outer(`You encounter a bug`, 8000);
        if ( Replicanti.amount.log10() <= 2) {
            return Currency.replicanti.multiply(2);
        } else {
            return Currency.replicanti.multiply(Currency.replicanti.value.log10());
        }
    } if (id <= 90 && id > 75) {
        player.outer.bug.Rep++;
        GameUI.notify.outer(`You encounter a bug`, 8000);
        return player.infinityPoints.exponent = player.infinityPoints.exponent + 5; 
    } if (id < 100 && id > 90) {
        player.outer.bug.Rep++;
        GameUI.notify.outer(`You encounter a bug`, 8000);
        return Currency.infinities.add(Currency.infinities.value.log10());
    } if (id === 100) {
        player.outer.bug.Super++;
        GameUI.notify.outer(`You encounter a superbug`, 8000);
        return Currency.eternityPoints.add(1);
    } else {
        return;
    }
};



export function ListBugEter(id) {
    if (id <= 10) {
        if (Currency.eternityPoints.lte(1000)) {
            player.outer.bug.Eter++
            GameUI.notify.outer(`You encounter a bug`, 8000);
            return Currency.eternityPoints.add(2);
        } else {
            player.outer.bug.Eter++
            GameUI.notify.outer(`You encounter a bug`, 8000);
            return Currency.eternityPoints.add(Currency.eternityPoints.value.log10());
        }
    } if (id <= 20 && id > 10) {
        if (Currency.eternities.lte(1000)) {
            player.outer.bug.Eter++
            GameUI.notify.outer(`You encounter a bug`, 8000);
            return  Currency.eternities.add(1);
        } else {
            player.outer.bug.Eter++
            GameUI.notify.outer(`You encounter a bug`, 8000);
            return  Currency.eternities.add(Currency.eternities.value.log10());
        }
    } if (id <= 23 && id > 20) {
        player.outer.bug.Eter++
        GameUI.notify.outer(`You encounter a bug`, 8000);
        if (!EternityUpgrade.idMultEP.isBought) {
            return EternityUpgrade.idMultEP.isBought = true;
        } if (!EternityUpgrade.idMultEternities.isBought) {
            return EternityUpgrade.idMultEternities.isBought = true;
        } if (!EternityUpgrade.idMultICRecords.isBought) {
            return EternityUpgrade.idMultICRecords.isBought = true;
        } if (!EternityUpgrade.tdMultAchs.isBought) {
            return EternityUpgrade.tdMultAchs.isBought = true;
        } if (!EternityUpgrade.tdMultTheorems.isBought) {
            return EternityUpgrade.tdMultTheorems.isBought = true;
        } if (!EternityUpgrade.tdMultRealTime.isBought) {
            return EternityUpgrade.tdMultRealTime.isBought = true;
        } else {
            return EternityUpgrade.epMult.boughtAmount += 1;
        }
    } if (id <= 33 && id > 23) {
        player.outer.bug.Eter++
        GameUI.notify.outer(`You encounter a bug`, 8000);
        if (Currency.timeTheorems.lte(1000)) {
            return Currency.timeTheorems.add(1)
        } else {
            return Currency.timeTheorems.add(Currency.timeTheorems.value.log10())
        }
    } if (id <= 36 && id > 33) {
        player.outer.bug.Eter++
        GameUI.notify.outer(`You encounter a bug`, 8000);
        if (EternityChallenges.completions < 5) {
            return EternityChallenges.all[0].addCompletion();
        } if (EternityChallenges.completions < 10) {
            return EternityChallenges.all[1].addCompletion();
        } if (EternityChallenges.completions < 15) {
            return EternityChallenges.all[2].addCompletion();
        } if (EternityChallenges.completions < 20) {
            return EternityChallenges.all[3].addCompletion();
        } if (EternityChallenges.completions < 25) {
            return EternityChallenges.all[4].addCompletion();
        } if (EternityChallenges.completions < 30) {
            return EternityChallenges.all[5].addCompletion();
        } if (EternityChallenges.completions < 35) {
            return EternityChallenges.all[6].addCompletion();
        } if (EternityChallenges.completions < 40) {
            return EternityChallenges.all[7].addCompletion();
        } if (EternityChallenges.completions < 45) {
            return EternityChallenges.all[8].addCompletion();
        } if (EternityChallenges.completions < 50) {
            return EternityChallenges.all[9].addCompletion();
        } if (EternityChallenges.completions < 55) {
            return EternityChallenges.all[10].addCompletion();
        } if (EternityChallenges.completions < 60) {
            return EternityChallenges.all[11].addCompletion();
        } else {
            return;
        }
    } if (id === 100) {
        player.outer.bug.Super++;
        GameUI.notify.outer(`You encounter a superbug`, 8000);
        Currency.timeTheorems.add(100);
        return;
    } else {
        return;
    }
};

export function ListBugDila(id) {

};

export function ListBugReal(id) {

};

export function ListBugCelest(id) {

};



function nearestPercent(x) {
    return Math.round(100 * x) / 100;
}

export function OuterBug() {
    if (Currency.outers.value > 0 && GameEnd.endState < END_STATE_MARKERS.INTERACTIVITY_DISABLED) {
        let id = null;
        // if (Teresa.isUnlocked = true) {
        //     console.log("cels");
        //     id = randomInt(1,100);
        //     return ListBugCelest(id);
        if (PlayerProgress.realityUnlocked()) {
            console.log("real");
            id = randomInt(1,100);
            return ListBugReal(id);
        } if (PlayerProgress.dilationUnlocked()) {
            console.log("dila");
            id = randomInt(1,100);
            return ListBugDila(id);
        } if (PlayerProgress.eternityUnlocked()) {
            console.log("eter");
            id = randomInt(1,100);
            return ListBugEter(id);
        } if (PlayerProgress.replicantiUnlocked()) {
            console.log("rep");
            id = randomInt(1,100);
            return ListBugRep(id);
        } if (PlayerProgress.hasBroken()) {
            console.log("broke");
            id = randomInt(1,100);
            return ListBugBreak(id);
        } if (PlayerProgress.infinityUnlocked()) {
            id = randomInt(1,100);
            return ListBugInf(id);
        } else {
            id = randomInt(1,100);
            return ListBugAnti(id);
        }
    } else {
        return;
    }
};
  
( function bugloop() {
    let rand = Math.round(Math.random() * 450);
    setTimeout( () => {
      OuterBug();
      bugloop();
    }, rand * 1000);
}());
  
function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}
  