<script>
import ModalWrapperChoice from "@/components/modals/ModalWrapperChoice";
import { Currency } from "../../core/currency";
import { OG } from "../../core/outer-game";

export default {
  name: "OuterGameNewModal",
  components: {
    ModalWrapperChoice
  },
  data() {
    return {
      outers: new Decimal(),
    };
  },
  computed: {
    topLabel() {
      return `Do you want to go out ?`;
    },
  },
  methods: {
    update() {
      this.outers = Math.floor(Currency.outers.value);
    },
    handleYesClick() {
      OG.startOuterGame();
    }
  },
};
</script>

<template>
  <ModalWrapperChoice
    @confirm="handleYesClick"
  >
    <template #header>
         {{ topLabel }}
    </template>
    <div
      v-if="outers === 0"
      class="c-modal-message__text"
    >
      It seems that there is a crack in the W̳̾͢͞a̷͠l̲͞l̹̯̾͢͟. <br> 
      Do you want to use END to grab a  Fͯ͢r̳͞a̷̱͠͝g̾͢m̳͞e̷̲͠͞n̾͢t̹̯͟ of the W̳̾͢͞a̷͠l̲͞l̹̯̾͢͟ ?
    </div>
    <div
      v-else
      class="c-modal-message__text"
    >
      Use your END to grab another Fͯ͢r̳͞a̷̱͠͝g̾͢m̳͞e̷̲͠͞n̾͢t̹̯͟.
    </div>
  </ModalWrapperChoice>
</template>

<style scoped>
.c-modal-message__text {
  max-width: 50rem;
}
</style>