<script>
export default {
    name: "OutersQuoteBackground",
    props: {
        outerSymbols: {
            type: Array,
            required: true
        },
        outers: {
            type: Array,
            required: true
        },
        primary: {
            type: Boolean,
            required: true
        },
    },
    computed: {
        modalClass() {
            return {
                "l-modal-outer-quote": true,
            };
        },
    },
    methods: {
        styleObject(outEntry, opac, isText) {
            const basecol = `var(--color-${outEntry[0]}--base)`;
            return {
                color: basecol,
                opacity: opac * outEntry[1]
            };
        },
    },

}
</script>

<template>
    <div :class="modalClass">
        <span
            v-for="(outer, index) in outers"
            :key="index"
            class="c-modal-outer-quote c-modal-outer-quote__symbol"
            :style="styleObject(outer, 0.2, true)"
            v-html="outerSymbols[index]"
        />
        <span
            v-for="(outer, index) in outers"
            :key="index + 10"
            class="c-modal-outer-quote c-modal-outer-quote__shadow"
            :style="styleObject(outer, 1, false)"
        />
        <span
            v-for="(outer, index) in outers"
            :key="index + 20"
            class="c-modal-outer-quote c-modal-outer-quote__text"
            :style="styleObject(outer, 1, true)"
        >
            <slot />
        </span>
    </div>
</template>

<style scoped>
.l-modal-outer-quote {
    display: flex;
    flex-direction: row;
    width: 30rem;
    height: 30rem;
    position: absolute;
    top: 50vh;
    left: 50vw;
    justify-content: space-between;
    align-items: center;
    border-radius: var(--var-border-radius, 1rem);
    transform: translate(-50%, -50%);
    background-color: black;
}

.c-modal-outer-quote {
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  user-select: none;
  border-radius: var(--var-border-radius, 1rem);
}

.c-modal-outer-quote__symbol {
    z-index: 1;
    font-size: 25rem;
    text-shadow: 0 0 2rem;
}

.c-modal-outer-quote__shadow {
    box-shadow: 0 0 1.5rem 0.1rem, 0 0 1rem 0.1rem inset;
}

.c-modal-outer-quote__text {
    z-index: 2;
    padding: 5rem;
}
</style>