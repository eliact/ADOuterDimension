<script>
import OutersQuoteBackground from "./OutersQuoteBackground";

export default {
    name: "OuterQuoteLine",
    components: {
        OutersQuoteBackground,
    },
    props: {
        quote: {
            type: Object,
            required: true
        },
        currentLine: {
            type: Number,
            required: true
        },
        primary: {
            type: Boolean,
            required: false,
            default: false,
        },
        leftVisible: {
            type: Boolean,
            required: false,
            default: false
        },
        rightVisible: {
            type: Boolean,
            required: false,
            default: false
        },
        closeVisible: {
            type: Boolean,
            required: false,
            default: false
        },
    },
    data() {
        return {
            message: "",
            outerSymbols: [],
            outers: [],
            outerName: ""
        };
    },
    computed: {
        line() {
            return this.quote.line(this.currentLine);
        },
        leftClass() {
            return {
                "c-modal-outer-quote__arrow": true,
                "c-modal-outer-quote__arrow-left": true,
                "c-modal-outer-quote__arrow-invisible": !this.leftVisible,
                "fas": true,
                "fa-chevron-circle-left": true,
            };
        },
        rightClass() {
            return {
                "c-modal-outer-quote__arrow": true,
                "c-modal-outer-quote__arrow-right": true,
                "c-modal-outer-quote__arrow-invisible": !this.rightVisible,
                "fas": true,
                "fa-chevron-circle-right": true,
            };
        },
    },
    methods: {
        update() {
            const line = this.line;
            this.outerSymbols = line.outerSymbols;
            this.message = line.line;
            this.outers = line.outers;
            this.outerName = line.outerName;
        }
    },
}
</script>

<template>
    <OutersQuoteBackground
        :outer-symbols="outerSymbols"
        :outers="outers"
        :primary="primary"
    >
        <span
            v-if="line.showOuterName"
            class="c-modal-outer-name"
        >
            {{ outerName }}
        </span>

        <i
            :class="leftClass"
            @click="$emit('progress-in','left')"
        />

        <span class="l-modal-outer-quote__text">
            {{ message }}
        </span>

        <i
            :class="rightClass"
            @click="$emit('progress-in', 'right')"
        />

        <i
            v-if="closeVisible"
            class="c-modal-outer-quote__end fas fa-check-circle"
            @click="emitClose"
        />
    </OutersQuoteBackground>
</template>

<style scoped>
.c-modal-outer-name {
    position: absolute;
    top: 1rem;
    right: 0;
    left: 0;
    font-weight: bold;
}

.c-modal-outer-quote__arrow {
    font-size: 150%;
    margin: 0.5rem;
    cursor: pointer;
}
  
.c-modal-outer-quote__arrow-left {
    position: absolute;
    left: 1rem;
}
  
.c-modal-outer-quote__arrow-right {
    position: absolute;
    right: 1rem;
}
  
.c-modal-outer-quote__end {
    position: absolute;
    bottom: 1.5rem;
    left: calc(50% - 1rem);
    font-size: 150%;
    cursor: pointer;
}
  
.l-modal-outer-quote__text {
    display: flex;
    flex-direction: column;
    height: 100%;
    justify-content: center;
}
  
.l-modal-outer-quote__buttons {
    display: flex;
    flex-direction: column;
    height: 100%;
    justify-content: space-between;
}
  
.c-modal-outer-quote__arrow-invisible {
    visibility: hidden;
}
</style>