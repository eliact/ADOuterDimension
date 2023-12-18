<script>
import CostDisplay from "@/components/CostDisplay";
import DescriptionDisplay from "@/components/DescriptionDisplay";
import EffectDisplay from "@/components/EffectDisplay";

export default {
    name: "OuterPerkShopUpgradeButton",
    components: {
        DescriptionDisplay,
        EffectDisplay,
        CostDisplay
    },
    props: {
        upgrade: {
            type: Object,
            required: true
        }
    },
    data() {
        return {
            isAvailableForPurchase: false,
            isCapped: false
        };
    },
    computed: {
        isDoomed: () => Pelle.isDoomed,
        classObject() {
            return {
                "o-teresa-shop-button--pelle-disabled": this.isDoomed &&
                    (this.upgrade === PerkShopUpgrade.musicGlyph || this.upgrade === PerkShopUpgrade.fillMusicGlyph),
                "o-outerteresa-shop-button": true,
                "o-outerteresa-shop-button--available": this.isAvailableForPurchase && !this.isCapped,
                "o-outerteresa-shop-button--capped": this.isCapped,
            };
        },
    },
    methods: {
        update() {
            this.isAvailableForPurchase = this.upgrade.isAvailableForPurchase;
            this.isCapped = this.upgrade.isCapped;
        }
    }
};
</script>

<template>
    <div class="l-spoon-btn-group">
        <button
            :class="classObject"
            @click="upgrade.purchase()"
        >
            <DescriptionDisplay
                :config="upgrade.config"
                :lenght="70"
            />
            <br>
            <EffectDisplay :config="upgrade.config" />
            <br>
            <CostDisplay
                v-if="!isCapped"
                :config="upgrade.config"
                name="Perk Shop"
            />
        </button>
    </div>
</template>

<style scoped>
.o-teresa-shop-button--pelle-disabled {
  text-decoration: line-through;
  cursor: auto;
}
</style>