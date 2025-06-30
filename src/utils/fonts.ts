import { Bricolage_Grotesque, Manrope } from "next/font/google";

const bricolage_grotesque_init = Bricolage_Grotesque({
  subsets: ["latin"],
  display: "swap",
});

const manrope_init = Manrope({
  subsets: ["latin"],
  display: "swap",
});

export const bricolage_grotesque = bricolage_grotesque_init.className;
export const manrope = manrope_init.className;
