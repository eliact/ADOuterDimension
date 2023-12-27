<script>
import { OuterTeresa } from "../../../core/globals";

import EffarigPanel from "./EffarigPanel";
import TeresaPanel from "./TeresaPanel";

export default {
  name: "TokenTab",
  components: {
    TeresaPanel,
    EffarigPanel
  },
  data() {
    return {
      teresa: false,
      effarig: false,
      enslaved: false,
      v: false,
      ra: false,
      laitela: false,
      pelle: false,
    };
  },
  computed: {
    ClassObject(celestial) {
      const celestials = `this.${celestial}`;
      const celestials2 = JSON.parse(celestials);
      return {
        "o-token": celestials2,
        "o-token--hidden": !celestials2,
      };
    },
    symbolTeresa() {
      return OuterTeresa.symbol;
    }
  },
  methods: {
    update() {
      this.teresa = player.outerSpace.celestials.teresa.active;
      this.effarig = player.outerSpace.celestials.effarig.active;
      this.enslaved = player.outerSpace.celestials.enslaved.active;
      this.v = player.outerSpace.celestials.v.active;
      this.ra = player.outerSpace.celestials.ra.active;
      this.laitela = player.outerSpace.celestials.laitela.active;
      this.pelle = player.outerSpace.celestials.pelle.active;
    }
  }

};
</script>

<template>
  <div class="o-test">
    <TeresaPanel />
    <EffarigPanel />
  </div>
</template>

<style scoped>
.o-test {
  display: flex;
}
</style>