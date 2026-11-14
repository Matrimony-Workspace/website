/**
 * Photography — Unsplash (free licence), face-cropped and colour-graded with the
 * house grade (DESIGN.md › Photography). Static imports give Next/Image intrinsic
 * sizes + blur placeholders.
 */
import heroConsult from "@/assets/photos/hero-consult.jpg";
import heroCompass from "@/assets/photos/hero-compass.jpg";
import heroWorkshop from "@/assets/photos/hero-workshop.jpg";
import heroApp from "@/assets/photos/hero-app.jpg";
import cardSingles from "@/assets/photos/card-singles.jpg";
import cardCouples from "@/assets/photos/card-couples.jpg";
import cardParents from "@/assets/photos/card-parents.jpg";
import cardCounsellors from "@/assets/photos/card-counsellors.jpg";
import fConsult from "@/assets/photos/f-consult.jpg";
import fCompass from "@/assets/photos/f-compass.jpg";
import fWorkshops from "@/assets/photos/f-workshops.jpg";
import fWebinars from "@/assets/photos/f-webinars.jpg";
import ready from "@/assets/photos/ready.jpg";
import footerCouple from "@/assets/photos/footer-couple.jpg";
import step1 from "@/assets/photos/step-1.jpg";
import step3 from "@/assets/photos/step-3.jpg";
import step4 from "@/assets/photos/step-4.jpg";
import pArjun from "@/assets/photos/p-arjun.jpg";
import pRohan from "@/assets/photos/p-rohan.jpg";
import pKabir from "@/assets/photos/p-kabir.jpg";
import pCounsellor from "@/assets/photos/p-counsellor.jpg";
import tMehak from "@/assets/photos/t-mehak.jpg";
import tC4 from "@/assets/photos/t-c4.jpg";
import tC8 from "@/assets/photos/t-c8.jpg";
import tC6 from "@/assets/photos/t-c6.jpg";
import tD1 from "@/assets/photos/t-d1.jpg";
import tC5 from "@/assets/photos/t-c5.jpg";
import tE3 from "@/assets/photos/t-e3.jpg";
import tC3 from "@/assets/photos/t-c3.jpg";

export const PHOTOS = {
  heroConsult, heroCompass, heroWorkshop, heroApp,
  cardSingles, cardCouples, cardParents, cardCounsellors,
  fConsult, fCompass, fWorkshops, fWebinars,
  ready, footerCouple,
  step1, step3, step4,
  pArjun, pRohan, pKabir, pCounsellor,
  tMehak, tC4, tC8, tC6, tD1, tC5, tE3, tC3,
};

export type PhotoKey = keyof typeof PHOTOS;

/** Unsplash credits (not legally required by the Unsplash Licence, but good practice). */
export const PHOTO_CREDITS = [
  { photographer: "Vitaly Gariev", url: "https://unsplash.com/photos/rG5elqddGzo", used: "heroConsult, cardCounsellors, fConsult, pCounsellor" },
  { photographer: "Dhruv vishwakarma", url: "https://unsplash.com/photos/rv4x3H1TnMM", used: "heroCompass" },
  { photographer: "ARTO SURAJ", url: "https://unsplash.com/photos/m1WjMkbakG0", used: "heroWorkshop, cardCouples, footerCouple, pKabir, tC4, tC5, tC6" },
  { photographer: "Karthik Balakrishnan", url: "https://unsplash.com/photos/Y4zNMW3pQAs", used: "heroApp, tC3" },
  { photographer: "Subhra Jyoti Paul", url: "https://unsplash.com/photos/c07j-zSHezM", used: "cardSingles" },
  { photographer: "Tanmay Abhay Mahajan", url: "https://unsplash.com/photos/a52zqf2R7jA", used: "cardParents, tD1" },
  { photographer: "Ravi Sharma", url: "https://unsplash.com/photos/e0CldfN99pM", used: "fCompass" },
  { photographer: "Dylan Gillis", url: "https://unsplash.com/photos/KdeqA3aTnBY", used: "fWorkshops" },
  { photographer: "Rohit Dey", url: "https://unsplash.com/photos/apOMdj47q6s", used: "fWebinars" },
  { photographer: "Jose Nicdao", url: "https://unsplash.com/photos/vPer-6p6UHc", used: "ready, tC8" },
  { photographer: "Kunal Goswami", url: "https://unsplash.com/photos/8NwmlKxUsCc", used: "step1, tMehak" },
  { photographer: "Christina @ wocintechchat.com", url: "https://unsplash.com/photos/LQ1t-8Ms5PY", used: "step3" },
  { photographer: "Alba Rebecca", url: "https://unsplash.com/photos/Iz1ae_tdK6k", used: "step4" },
  { photographer: "DICSON", url: "https://unsplash.com/photos/vAXmZOtLfo0", used: "pArjun" },
  { photographer: "Ashwini Chaudhary (Monty)", url: "https://unsplash.com/photos/eq6EJSdpHUQ", used: "pRohan, tE3" },
];
