<script>
import { OUTER_EFFARIG_STAGES, OuterEffarig, OuterEnslaved, OuterLaitela, OuterPelle, OuterRa, OuterTeresa, OuterV }
  from "../../../core/globals";

import ModalWrapperChoice from "@/components/modals/ModalWrapperChoice";

export default {
  name: "EnterOuterCelestialsModal",
  components: {
    ModalWrapperChoice
  },
  props: {
    number: {
      type: Number,
      required: true,
    },
    name: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      outereffarigDone: false,
      outereffarigLayer: ""
    };
  },
  computed: {
    effects() {
      return GameDatabase.outer.descriptions[this.number].effects().split("\n");
    },
    description() {
      const description = GameDatabase.outer.descriptions[this.number].description;
      return description ? description() : "";
    },
    topLabel() {
      return `${this.name} Test`;
    },
    message() {
      return `Perform a Reality and enter ${this.name} Reality in wich`;
    },
    extraLine() {
      switch (this.number) {
        case 0: return `Show to Teresa that they can have faith in you`;
        case 1: return `Effarig want to see if you are worthy enough`;
        case 2: return `The Nameless Ones want to see if you are worthy enough`;
        case 3: return `V want to see if you are worthy enough`;
        case 4: return `Ra want to see if you are worthy enough`;
        case 5: return `Lai'tela want to see if you are worthy enough`;
        case 6: return `Pelle want to see if he can trust you`;
        default: throw new Error(`Attempted to start an Unknown Outer Celestial in 
        Outer Celestial Modal Confirmation.`);
      }
    }
  },
  methods: {
    update() {
      const outereffarigStage = OuterEffarig.currentStage;
      this.outereffarigDone = outereffarigStage === OUTER_EFFARIG_STAGES.COMPLETED;
      this.outereffarigLayer = [null, "Infinity", "Eternity", "Reality", "Outer"][outereffarigStage];
    },
    handleYesClick() {
      beginProcessReality(getRealityProps(true));
      switch (this.number) {
        case 0: return OuterTeresa.initializeRun();
        case 1: return OuterEffarig.initializeRun();
        case 2: return OuterEnslaved.initializeRun();
        case 3: return OuterV.initializeRun();
        case 4: return OuterRa.initializeRun();
        case 5: return OuterLaitela.initializeRun();
        case 6: return OuterPelle.initializeRun();
        default: throw new Error(`Attempted to start an Unknown Outer Celestial in
         Outer Celestial Modal Confirmation.`);
      }
    }
  },
};
</script>

<template>
  <ModalWrapperChoice @confirm="handleYesClick">
    <template #header>
      {{ topLabel }}
    </template>
    <div class="c-modal-message__text">
      {{ message }}
      <br>
      <br>
      <div class="c-modal-celestial__run-effects">
        <div
          v-for="(effect, i) in effects"
          :key="i"
          class="c-modal-celestial__run-effects__line"
        >
          <b v-if="effect.trim()">&bull;</b>
          <b>&nbsp;</b>
          {{ effect }}
        </div>
      </div>
      <div
        v-if="description"
        class="reality-description"
      >
        <br><br>
        {{ description }}
      </div>
      <br>
      <div>
        {{ extraLine }}
      </div>
    </div>
    <template #confirm-text>
      Begin
    </template>
  </ModalWrapperChoice>
</template>

<style scoped>
.c-modal-celestial__run-effects {
  display: inline-block;
  max-width: 45rem;
  text-align: left;
}
.c-modal-celestial__run-effects__line {
  display: flex;
  margin-bottom: 0.5rem;
}

.reality-description {
  padding: 0 2rem;
}
</style>