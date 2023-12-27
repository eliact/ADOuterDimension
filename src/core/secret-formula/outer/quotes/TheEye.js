import zalgo from "../../../celestials/pelle/zalgo";

const LineOuter1 = zalgo("So . . . Here You Are.", 7);
const LineOuter2 = zalgo("A New Challenger.", 7);
const LineOuter3 = zalgo("We'll SEE How Far You Can Go.", 7);

const LineTeresa1 = zalgo("Are you sure ?", 7);
const LineTeresa2 = zalgo("You have done enough harm", 7);

export const TheEyeQuotes = {
  Outer: {
    id: 0,
    lines: [
      LineOuter1,
      LineOuter2,
      LineOuter3
    ]
  },
  Teresa: {
    id: 1,
    lines: [
      LineTeresa1,
      LineTeresa2
    ]
  }
};