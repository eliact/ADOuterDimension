import { BitUpgradeState } from "../game-mechanics/bit-upgrade-state";

export const OuterQuote = {
      addToQueue(quote) {
        ui.view.outerquotes.queue.push(quote);
        if (!ui.view.outerquotes.current) this.advanceQueue();
      },
      advanceQueue() {
        ui.view.outerquotes.current = ui.view.outerquotes.queue.shift();
      },
      showHistory(history) {
        ui.view.outerquotes.history = history;
      },
      clearQueue() {
        ui.view.outerquotes.queue = [];
        ui.view.outerquotes.current = undefined;
      },
      clearHistory() {
        ui.view.outerquotes.history = undefined;
      },
      clearAll() {
        this.clearQueue();
        this.clearHistory();
      },
      get isOpen() {
        return ui.view.outerquotes.current !== undefined;
      },
      get isHistoryOpen() {
        return ui.view.outerquotes.history !== undefined;
    }
};

function blendCel(cels) {
    const totalTime = cels.map(cel => cel[1]).sum();
    const tick = (Date.now() / 1000) % totalTime;
  
    // Blend the first blendTime seconds with the previous celestial and the last blendTime seconds with the next;
    // note that this results in a total transition time of 2*blendTime. We specifically set this to be half the duration
    // of the first entry - this is because in the case of all intervals having the same duration, this guarantees two
    // blended entries at all points in time.
    const blendTime = cels[0][1] / 2;
    let start = 0;
    for (let index = 0; index < cels.length; index++) {
      const prevCel = cels[(index + cels.length - 1) % cels.length], currCel = cels[index],
        nextCel = cels[(index + 1) % cels.length];
  
      // Durations of time from after last transition and after next transition. May be negative, which is how we
      // check to see if we're in the correct time interval (last should be positive, next should be negative)
      const lastTime = tick - start, nextTime = lastTime - currCel[1];
      if (nextTime > 0) {
        start += currCel[1];
        continue;
      }
  
      if (lastTime <= blendTime) {
        const t = 0.5 * lastTime / blendTime;
        return [[prevCel[0], 0.5 - t], [currCel[0], 0.5 + t]];
      }
      if (-nextTime <= blendTime) {
        const t = 0.5 * nextTime / blendTime;
        return [[currCel[0], 0.5 - t], [nextCel[0], 0.5 + t]];
      }
  
      // In principle the animation properties should never get to this return case, but we leave it here just in case -
      // the worst side-effect of reaching here is that some UI elements may appear to lose click detection for a
      // fraction of a second when transitioning from two blended entries to one
      return [[currCel[0], 1]];
    }
    throw new Error("Could not blend celestial fractions in Quote modal");
}

class OuterQuoteLine {
    constructor(line, parent) {
      this._parent = parent;
      this._showOuterName = line.showOuterName ?? true;
  
      this._outerArray = line.background
        ? () => blendCel(line.background)
        : [[parent.outer, 1]];
  
      const replacementMatch = /\$(\d+)/gu;
  
      this._line = typeof line === "string"
        ? line
        // This matches each digit after a $ and replaces it with the wordCycle of an array with the digit it matched.
        : () => line.text.replaceAll(replacementMatch, (_, i) => wordShift.wordCycle(line[i]));
    }
  
    get line() {
      return typeof this._line === "function" ? this._line() : this._line;
    }
  
    get outers() {
      return typeof this._outerArray === "function" ? this._outerArray() : this._outerArray;
    }
  
    get outerSymbols() {
      return this.outers.map(c => OuterCelestials[c[0]].symbol);
    }
  
    get showOuterName() {
      return this._showOuterName;
    }
  
    get outerName() {
      return OuterCelestials[this._parent.outer].displayName;
    }
}

class OutQuotes extends BitUpgradeState {
    constructor(config, outer) {
      super(config);
      this._outer = outer;
      this._lines = config.lines.map(line => new OuterQuoteLine(line, this));
    }
  
    get bits() { return player.outer.quotes[this._outer].quoteBits; }
    set bits(value) { player.outer.quotes[this._outer].quoteBits = value; }
  
    get requirement() {
      // If requirement is defined, it is always a function returning a boolean.
      return this.config.requirement?.();
    }
  
    get outer() {
      return this._outer;
    }
  
    line(id) {
      return this._lines[id];
    }
  
    get totalLines() {
      return this._lines.length;
    }
  
    show() { this.unlock(); }
    onUnlock() { this.present(); }
  
    present() {
      OuterQuote.addToQueue(this);
    }
}

export const OuterQuotes = {
    theEye: mapGameDataToObject(
        GameDatabase.outer.quotes.theEye,
        config => new OutQuotes(config, "theEye")
    ),
}