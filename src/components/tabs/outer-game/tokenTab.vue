<script>
import EffectDisplay from "@/components/EffectDisplay";
import PrimaryButton from "@/components/PrimaryButton";
import PrimaryToggleButton from "@/components/PrimaryToggleButton";


export default {
  name: "tokenTab",
  components: {
    PrimaryButton,
    PrimaryToggleButton,
    EffectDisplay,
  },
  data() {
    return {
      tokens: {
        terese: false,
        effarig: false,
        enslaved: false,
        v: false,
        ra: false,
        laitela: false,
        pelle: false,
      },
      isUnlocked: false,
    };
  },
  computed: {
    ClassObject() {
      return {
        "o-token": true,
        "o-token--hidden": !this.isUnlocked,
      };
    },

  },
  methods: {
    update() {
      this.teresa = player.outer;
    }
  }

};
</script>

<template>
  <div>
    <div>
    
    </div>
  </div>
</template>

<style scoped>
.o-token {
  width: 10.6rem;
  height: 10.6rem;
  position: relative;
  text-align: center;
  font-family: Typewriter, serif;
  font-size: 0.8rem;
  color: black;
  border: var(--var-border-width, 0.2rem) solid;
  border-radius: var(--var-border-radius, 0.8rem);
  margin: 0 auto;
  -webkit-user-select: none;
  user-select: none;
}
</style>