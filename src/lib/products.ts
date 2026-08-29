import m1 from "@/assets/m1.jpg";
import m2 from "@/assets/m2.jpg";
import m3 from "@/assets/m3.jpg";
import m4 from "@/assets/m4.jpg";
import w1 from "@/assets/w1.jpg";
import w2 from "@/assets/w2.jpg";
import w3 from "@/assets/w3.jpg";
import w4 from "@/assets/w4.png";
import w4p from "@/assets/w4p.png";
import w4s from "@/assets/w4s.jpeg";
import w6 from "@/assets/w6.png";
import w6b from "@/assets/w6b.jpeg";
import w6p from "@/assets/w6p.jpeg";
import m7 from "@/assets/m7.png";
import m7b from "@/assets/m7b.jpeg";
import m7p from "@/assets/m7p.jpeg";
import w1f4 from "@/assets/w1.jpeg";
import wb from "@/assets/wb.jpeg";
import wp from "@/assets/wp.jpeg";


export type Gender = "men" | "women";

export type Product = {
  id: string;
  name: string;
  price: number;
  gender: Gender;
  category: "Oversized" | "Essential" | "Graphic" | "Crop";
  colors: string[];
  sizes: string[];
  image: string;
  images?: Record<string, string>;
  stickerImages?: Record<string, Record<string, string>>;
  description: string;
  popularity: number;
  createdAt: number;
  stickers?: string[];
};

export const COLOR_SWATCHES: Record<string, string> = {
  Black: "oklch(0.2 0 0)",
  White: "oklch(0.98 0 0)",
  Cobalt: "oklch(0.55 0.19 258)",
  Sand: "oklch(0.89 0.05 85)",
  Coral: "oklch(0.68 0.18 30)",
  Pink: "oklch(0.85 0.08 10)",
  Emerald: "oklch(0.55 0.14 160)",
  Blue:"oklch(0.888 0.049 223)"
};

export const CATEGORIES = ["Oversized", "Essential", "Graphic", "Crop"] as const;
export const SIZES = ["XS", "S", "M", "L", "XL"] as const;

export const products: Product[] = [
  {
    id: "atlas-oversized-black",
    name: "Atlas Oversized Tee",
    price: 68,
    gender: "men",
    category: "Oversized",
    colors: ["Black", "Sand", "White"],
    sizes: ["S", "M", "L", "XL"],
    image: m1,
    description:
      "A heavyweight 240gsm cotton tee cut with a relaxed drop shoulder. Garment-dyed for depth of colour and built to hold its shape wash after wash.",
    popularity: 96,
    createdAt: 6,
  },
  {
    id: "cobalt-essential",
    name: "Cobalt Essential Tee",
    price: 52,
    gender: "men",
    category: "Essential",
    colors: ["Cobalt", "Black", "White"],
    sizes: ["S", "M", "L", "XL"],
    image: m2,
    description:
      "Our everyday staple in a saturated cobalt. Combed long-staple cotton with a clean ribbed collar and a straight, tailored body.",
    popularity: 84,
    createdAt: 5,
  },
  {
    id: "dune-heavyweight",
    name: "Dune Heavyweight Tee",
    price: 74,
    gender: "men",
    category: "Graphic",
    colors: ["Sand", "White"],
    sizes: ["M", "L", "XL"],
    image: m3,
    description:
      "Sun-washed sand tone on a dense heavyweight knit. Subtle tonal embroidery at the hem and a structured neckline.",
    popularity: 71,
    createdAt: 4,
  },
  {
    id: "ember-coral",
    name: "Ember Coral Tee",
    price: 58,
    gender: "men",
    category: "Essential",
    colors: ["Coral", "White"],
    sizes: ["S", "M", "L"],
    image: m4,
    description:
      "A vivid coral pigment dye with a soft hand feel. Cut slim through the body with a slightly extended sleeve.",
    popularity: 88,
    createdAt: 7,
  },
  {
    id: "ivory-crop",
    name: "Ivory Crop Tee",
    price: 56,
    gender: "women",
    category: "Crop",
    colors: ["White", "Pink"],
    sizes: ["XS", "S", "M", "L"],
    image: w1,
    description:
      "A boxy cropped silhouette in crisp optic white. Lightweight jersey with a rolled sleeve and a clean raw-cut hem.",
    popularity: 94,
    createdAt: 7,
  },
  {
    id: "blush-relaxed",
    name: "Blush Relaxed Tee",
    price: 54,
    gender: "women",
    category: "Essential",
    colors: ["Pink", "White", "Sand"],
    sizes: ["XS", "S", "M", "L"],
    image: w2,
    description:
      "Softest-in-class pima cotton in a powder blush. Relaxed through the shoulder with a gently curved hem.",
    popularity: 79,
    createdAt: 6,
  },
  {
    id: "verde-fitted",
    name: "Verde Fitted Tee",
    price: 62,
    gender: "women",
    category: "Essential",
    colors: ["Emerald", "Black"],
    sizes: ["XS", "S", "M"],
    image: w3,
    description:
      "A rich emerald knit with a scoop neck and a body-skimming fit. Four-way stretch that keeps its line all day.",
    popularity: 86,
    createdAt: 5,
    stickers: ["/stickers/f1.png", "/stickers/f2.png", "/stickers/f3.png", "/stickers/f4.png"],
  },
  {
    id: "noir-oversized",
    name: "Summer Cropped T-Shirt",
    price: 2500,
    gender: "women",
    category: "Crop",
    colors: [ "White", "Blue","Pink"],
    sizes: ["XS", "S", "M",],
    image: w4,
    images: {
      White: w4,
      Pink: w4p,
      Blue: w4s,
    },
    stickerImages: {
      "/stickers/f1.png": { White: w4, Blue: w4s, Pink: w4p },
      "/stickers/f2.png": { White: w6, Blue: w6b, Pink: w6p },
      "/stickers/f3.jpeg": { White: m7, Blue: m7b, Pink: m7p },
      "/stickers/f4.jpeg": { White: w1f4, Blue: wb, Pink: wp },
    },
    description:
      "Deep black, generously cut, with a soft drape that falls past the hip. The quiet centrepiece of the collection.",
    popularity: 91,
    createdAt: 8,
    stickers: ["/stickers/f1.png", "/stickers/f2.png", "/stickers/f3.jpeg", "/stickers/f4.jpeg"],
  },
];

export const getProduct = (id: string) => products.find((p) => p.id === id);

export const formatPrice = (n: number) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 0 }).format(n);