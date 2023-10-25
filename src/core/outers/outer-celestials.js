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
    pelle: OuterPelle
};

GameDatabase.outer.descriptions = [
    {
        name: "Teresa",
        effects() {
            return `More difficult`;
        },
        description() {
            return `Teresa doesn't trust you, show that they can be themselve`;
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