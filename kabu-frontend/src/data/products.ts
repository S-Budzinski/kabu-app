import flashlightImg from "@/assets/flashlight.avif";
import chargerImg from "@/assets/charger.avif";
import hero1 from "@/assets/hero-1.png";
import hero2 from "@/assets/hero-2.png";
import hero3 from "@/assets/hero-3.png";
import hero4 from "@/assets/hero-4.png";
import hero5 from "@/assets/hero-5.png";
import lis_main from "@/assets/products/lis/lis_main.png"
import lis_polka from "@/assets/products/lis/lis-polka.png"
import lis_ksiazki from "@/assets/products/lis/lis-ksiazki.png"
import axo_polka from "@/assets/products/axolotl/axolotl-polka.png"
import axo_komp from "@/assets/products/axolotl/axolotl-komputer.png"
import axo_komp2 from "@/assets/products/axolotl/axolotl-komputer2.png"
import axo_biurko from "@/assets/products/axolotl/axolotl-biurko.png"
import pszczola_biurko from "@/assets/products/pszczola/pszczola-biurko.png"
import pszczola_komp from "@/assets/products/pszczola/pszczola-komp.png"
import pszczola_komp2 from "@/assets/products/pszczola/pszczola-komp2.png"
import pszczola_polka from "@/assets/products/pszczola/pszczola-polka.png"
import lampion_main from "@/assets/products/lampion/lampion (1).png"
import lampion_lozko from "@/assets/products/lampion/lampion (2).png"
import lampion_biurko from "@/assets/products/lampion/lampion (3).png"
import lampion_pokoj from "@/assets/products/lampion/lampion (4).png"
import brelok_reka from "@/assets/products/brelok/brelok (2).png"
import brelok_stol from "@/assets/products/brelok/brelok (1).png"
import brelok_biurko from "@/assets/products/brelok/brelok (3).png"
import brelok_skrzynia from "@/assets/products/brelok/brelok (4).png"

export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?:number;
  image: string;
  images: string[];
  rating: number;
  purchaseCount: number;
  description: string;
  category: string;
  reviews: Review[];
}

export interface Review {
  id: string;
  rating: number;
  nickname: string;
  comment: string;
  date: string;
}

export const products: Product[] = [
  {
    id: "lis-lampka",
    name: "Lampka Pixelowy Lis USB-C",
    price: 89.99,
    originalPrice:109.99,
    image: lis_main,
    images: [lis_main, lis_ksiazki, lis_polka],
    rating: 4.8,
    purchaseCount: 8,
    category: "Lampki",
    description: ``,
    reviews: [
      {
        id: "r1",
        rating: 5,
        nickname: "fidbek410",
        comment: "Długo szukałem takiego Lisa w tak dobrej cenie. Polecam!",
        date: "2025-11-15",
      },
      {
        id: "r2",
        rating: 5,
        nickname: "Scorpion",
        comment: "Idealnie wpasowuję się do mojego stanowiska. Wszystko elegancko!",
        date: "2025-11-10",
      },
      {
        id: "r3",
        rating: 4,
        nickname: "nova",
        comment: "Lampka fajnie świeci, pudełko mogłoby być lepsze ale sam gadżet fajny",
        date: "2025-11-11",
      },
    ],
  },
  {
    id: "pszczola-lampka",
    name: "Lampka na biurko Latająca Pszczoła USB-C",
    price: 79.99,
    originalPrice:99.99,
    image: pszczola_biurko,
    images: [pszczola_biurko, pszczola_komp, pszczola_komp2, pszczola_polka],
    rating: 4,
    purchaseCount: 3,
    category: "Lampki",
    description: ``,
    reviews: [
      {
        id: "r4",
        rating: 4,
        nickname: "Majk3l",
        comment: "Jak na lampke w takiej cenie to spoko, fajny gadżet na biurko",
        date: "2025-11-12",
      },
    ],
  },
  {
    id: "brelok-pochodnia",
    name: "Świecący brelok do kluczy Pochodnia",
    price: 24.99,
    originalPrice:39.99,
    image: brelok_stol,
    images: [brelok_stol, brelok_reka, brelok_biurko, brelok_skrzynia],
    rating: 5,
    purchaseCount: 23,
    category: "Lampki",
    description: ``,
    reviews: [
      {
        id: "r7",
        rating: 5,
        nickname: "bob_2115",
        comment: "Małe poręczne, przydaję się do odnajdywania kluczy po ciemku",
        date: "2025-11-14",
      },
    ],
  },
  {
    id: "lampka-lampion",
    name: "Lampka na ściane Lampion RGB",
    price: 89.99,
    originalPrice:149.99,
    image: lampion_main,
    images: [lampion_main, lampion_biurko, lampion_lozko, lampion_pokoj],
    rating: 4,
    purchaseCount: 62,
    category: "Lampki",
    description: ``,
    reviews: [
      {
        id: "r8",
        rating: 4,
        nickname: "EnglishCatplXd",
        comment: "Szukałem takiej, tańsza niż u innych sprzedawców a bardzo fajne jakościowo. Dobry zakup",
        date: "2025-11-12",
      },
    ],
  },
  {
    id: "lampka-axolotl",
    name: "Lampka RGB Axolotl",
    price: 99.99,
    originalPrice:119.99,
    image: axo_polka,
    images: [axo_polka, axo_komp, axo_biurko, axo_komp2],
    rating: 5,
    purchaseCount: 6,
    category: "Lampki",
    description: ``,
    reviews: [
      {
        id: "r9",
        rating: 5,
        nickname: "Macio3",
        comment: "Ładny jakościowy axolotl, wpasował się idealnie na moją półkę",
        date: "2025-11-09",
      },
    ],
  },
];

export const carouselImages = [hero1, hero2, hero3, hero4, hero5];
