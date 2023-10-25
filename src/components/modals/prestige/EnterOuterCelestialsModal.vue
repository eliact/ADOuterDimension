<script>
import ModalWrapperChoice from "@/components/modals/ModalWrapperChoice";
import { OuterEffarig, OuterEnslaved, OuterLaitela, OuterPelle, OuterRa, OuterTeresa, OuterV } from "../../../core/globals";
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

    };
  },
  computed: {
    effects(){
        return GameDatabase.outer.descriptions[this.number].effects().split("\n");
    },
    description() {
      const description = GameDatabase.outer.descriptions[this.number].description;
      return description ? description() : "";
    },
    topLabel() {
      return `Attempt ${this.name} Test`;
    },
    message() {
        return `Perform a Reality and once you are in, You will not be able to leave until you pass the Trial`;
    },
    extraline() {
        switch(this.number) {
            case 0: return `Teresa want to see if you are worthy enough`;
            case 1: return `Effarig want to see if you are worthy enough`;
            case 2: return `The Nameless Ones want to see if you are worthy enough`;
            case 3: return `V want to see if you are worthy enough`;
            case 4: return `Ra want to see if you are worthy enough`;
            case 5: return `Lai'tela want to see if you are worthy enough`;
            case 6: return `Pelle want to see if he can trust you`;
            default: throw new Error(`Attempted to start an Unknown Outer Celestial in Outer Celestial Modal Confirmation.`);
        }
    }
  },
  methods: {
    update() {
    },
    handleYesClick() {
        beginProcessReality(getRealityProps(true));
        switch(this.number) {
            case 0: return OuterTeresa.initializeRun();
            case 1: return OuterEffarig.initializeRun();
            case 2: return OuterEnslaved.initializeRun();
            case 3: return OuterV.initializeRun();
            case 4: return OuterRa.initializeRun();
            case 5: return OuterLaitela.initializeRun();
            case 6: return OuterPelle.initializeRun();
            default : throw new Error(`Attempted to start an Unknown Outer Celestial in Outer Celestial Modal Confirmation.`);
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
        </div>
    </ModalWrapperChoice>
</template>
