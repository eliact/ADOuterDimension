<script>
import { Modal } from "../../../core/modal";
import { NG } from "../../../core/new-game";

export default {
  name: "NewGame",
  data() {
    return {
      opacity: 0,
      visible: false,
      hasMoreCosmetics: false,
      selectedSetName: "",
    };
  },
  computed: {
    style() {
      return {
        opacity: this.opacity,
        visibility: this.visible ? "visible" : "hidden",
      };
    }
  },
  methods: {
    update() {
      this.visible = GameEnd.endState > END_STATE_MARKERS.SHOW_NEW_GAME && !GameEnd.removeAdditionalEnd;
      this.opacity = (GameEnd.endState - END_STATE_MARKERS.SHOW_NEW_GAME) * 2;
      this.hasMoreCosmetics = GlyphAppearanceHandler.lockedSets.length > 0;
      this.selectedSetName = GlyphAppearanceHandler.chosenFromModal?.name ?? "None (will choose randomly)";
    },
    startNewGame() {
      NG.startNewGame();
    },
    openSelectionModal() {
      Modal.cosmeticSetChoice.show();
    },
    startOuterGame() {
      Modal.OuterGameNew.show();
    }
  }
};
</script>

<template>
  <div
    class="c-new-game-container"
    :style="style"
  >
    <h2>
      Reset the entire game, but keep Automator Scripts, Secret Themes, Secret Achievements, Options,
      and Companion Glyph.
    </h2>
    <h3>You can use the button in the top-right to view the game as it is right now.</h3>
    <div class="c-new-game-button-container">
      <button
        id="NG"
        class="c-new-game-button"
        @click="startNewGame"
      >
        Start over?
      </button>
    </div>
    <br>
    <h3 v-if="hasMoreCosmetics">
      For completing the game, you also unlock a new cosmetic set of your choice for Glyphs. These are freely
      modifiable once you reach Reality again, but are purely visual and offer no gameplay bonuses.
      <br>
      <button
        class="c-new-game-button"
        @click="openSelectionModal"
      >
        Choose Cosmetic Set
      </button>
      <br>
      <br>
      Selected Set: {{ selectedSetName }}
    </h3>
    <h3 v-else>
      You have unlocked all Glyph cosmetic sets!
    </h3>
    <br>
    <h3>
      You can also import "speedrun" to start the game again with additional tracking for speedrunning purposes.
    </h3>
    <br>
    <h3>
      Or there is maybe another way to meet them again....
    </h3>
    <div class="c-outer-game-button-container">
      <button
        class="c-outer-game-button o-primary-btn"
        @click="startOuterGame"
      >
        Approach the  W̳̾͢͞a̷͠l̲͞l̹̯̾͢͟
      </button>
    </div>
  </div>
</template>

<style scoped>
.c-new-game-container {
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 50%;
  left: 50%;
  z-index: 9;
  justify-content: center;
  align-items: center;
  transform: translate(-50%, -50%);
  pointer-events: auto;
}

.t-s12 .c-new-game-container {
  color: white;
}

.c-new-game-button-container {
  display: flex;
  flex-direction: column;
  align-items: stretch;
}

.c-new-game-button {
  font-family: Typewriter;
  background: grey;
  border: black;
  border-radius: var(--var-border-radius, 0.5rem);
  margin-top: 1rem;
  padding: 1rem;
  cursor: pointer;
}

.c-outer-game-button-container {
  display: flex;
  flex-direction: column;
  align-items: stretch;
}

.c-outer-game-button {
  font-family: Typewriter;
  background: grey;
  border: 0.1rem solid var(--color-good-dark);
  border-radius: var(--var-border-radius, 1rem);
  margin-top: 1rem;
  padding: 1rem;
  cursor: pointer;
}

.o-primary-btn {
  height: 2.5rem;
  font-family: Typewriter, serif;
  font-size: 1.3rem;
  font-weight: bold;
  color: var(--color-text);
  background-color: var(--color-base);
  border-radius: var(--var-border-radius, 0.4rem);
  padding: 0.3rem 1rem;
  transition-duration: 0.2s;
  cursor: pointer;
}

.c-outer-game-button:hover {
  background-color: gray;
  opacity: 70%;
}
</style>
