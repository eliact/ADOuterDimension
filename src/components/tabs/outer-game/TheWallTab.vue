<script>
import { Currency } from '../../../core/currency';
import { OuterWallState } from '../../../core/outer';
import TheWallTabButton from './TheWallTabButton.vue';

export default {
  name: "TheWallTab",
  components: {
    TheWallTabButton
  },
  data() {
    return {
      outerCount: new Decimal(),
    }; 
  },
  computed: {
    milestones() {
      return Object.values(GameDatabase.outer.wall)
        .sort((a,b) => a.outers - b.outers)
        .map(config => new OuterWallState(config));
    },
    rows() {
      return Math.ceil(this.milestones.length / 3);
    }
  },
  methods: {
    update() {
      this.outerCount = Math.floor(Currency.outers.value);
    },
    getMilestone(row, column) {
      return () => this.milestones[(row - 1) * 3 + column - 1];
    }
  }
};
</script>

<template>
  <div class="l-outer-wall-grid">
    <div>You have {{ quantifyInt("Outer", outerCount, 3) }}.</div>
    <div
      v-for="row in rows"
      :key="row"
      class="l-outer-wall-grid_row"
    >
      <TheWallTabButton
        v-for="column in 3"
        :key="row * 3 + column"
        :get-milestone="getMilestone(row, column)"
        class="l-outer-wall-grid_cell"
      />
    </div>
  </div>
</template>

<style scoped>

</style>