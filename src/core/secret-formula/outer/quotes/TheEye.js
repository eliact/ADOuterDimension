import zalgo from "../../../celestials/pelle/zalgo";


/** @param {string} cel */
const primaryBackground = cel => [["theEye", 1.5], [cel, 1.5]];

const LineOuter1 = zalgo("So . . . Here You Are.", 7);
const LineOuter2 = zalgo("A New Challenger.", 7);
const LineOuter3 = zalgo("We'll SEE How Far You Can Go.", 7);

const LineTeresa1 = zalgo("You Think You Can Escape Like That ?", 7);
const LineTeresa2 = zalgo("I Want To Play A Little More With You and this Sycophant", 7);
const LineTeresa3 = zalgo("If You Want I can Help, But Not For Free", 7);

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
      LineTeresa2,
      { text: LineTeresa3,
        background: primaryBackground("teresa") }
    ]
  }
};