import { Bricolage_Grotesque, Manrope, Open_Sans, Quicksand, Urbanist } from "next/font/google";

const bricolage_grotesque_init = Bricolage_Grotesque({
  subsets: ["latin"],
  display: "swap",
});

const manrope_init = Manrope({
  subsets: ["latin"],
  display: "swap",
});

const quick_init = Quicksand({
  subsets: ["latin"],
  display: "swap",
  weight: "300",
});

const open_sans = Open_Sans({
  subsets: ["latin"],
  display: "swap",
  weight: "300"
});

const urbanist_init = Urbanist({
  subsets: ["latin"],
  display: "swap",
  weight: "300"
})

export const bricolage_grotesque = bricolage_grotesque_init.className;
export const manrope = manrope_init.className;
export const quick = quick_init.className;
export const sans = open_sans.className;
export const urban = urbanist_init.className;
