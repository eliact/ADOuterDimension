import { TheEye } from "./The-Eye";
import { OuterV } from "./outer-V";
import { OuterEffarig } from "./outer-effarig";
import { OuterEnslaved } from "./outer-enslaved";
import { OuterLaitela } from "./outer-laitela";
import { OuterPelle } from "./outer-pelle";
import { OuterRa } from "./outer-ra";
import { OuterTeresa } from "./outer-teresa";



export const OuterCelestials = {
    teresa: OuterTeresa,
    effarig: OuterEffarig,
    enslaved: OuterEnslaved,
    v: OuterV,
    ra: OuterRa,
    laitela: OuterLaitela,
    pelle: OuterPelle,
    theEye: TheEye
};

GameDatabase.outer.descriptions = [
    {
        name: "Teresa",
        effects() {
            return `Glyph Time Theorem generation is disabled.
            You gain less Infinity Points and Eternity Points (x^${format(0.55, 2, 2)}).`;
        },
        description() {
            return `Teresa doesn't trust you, show that they can be themself.`;
        }
    },
    {
        name: "Effarig",
        effects() {

        },
    },
    {
        name: "The Nameless Ones",
        effects() {

        },
    },
    {
        name: "V",
        effects() {

        },
    },
    {
        name: "Ra",
        effects() {

        },
    },
    {
        name: "Lai'tela",
        effects() {

        },
    },
    {
        name: "Pelle",
        effects() {

        },
    }
]