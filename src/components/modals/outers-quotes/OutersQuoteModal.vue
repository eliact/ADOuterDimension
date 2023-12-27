<script>
import OutersQuoteLineBasicInteractable from "./templates/OutersQuoteLineBasicInteractable";

export default {
  name: "OutersQuoteModal",
  components: {
    OutersQuoteLineBasicInteractable,
  },
  props: {
    quote: {
      type: Object,
      required: true
    }
  },
};
</script>

<template>
  <div class="l-modal-overlay c-modal-overlay">
    <OutersQuoteLineBasicInteractable
      class="c-quote-overlay"
      :quote="quote"
    />
  </div>
</template>

<style scoped>
.c-quote-overlay {
    font-size: 1.4rem;
    padding: 1rem;
    transition-duration: 0.2s;
}
</style>