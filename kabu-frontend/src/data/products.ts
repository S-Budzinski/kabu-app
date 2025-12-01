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
    description: `🦊 Lampka Nocna Pixelowy Lis – Najsłodszy Mob w Twoim Domu! 🧡

Zapomnij o szukaniu lisów w biomie Tajgi – ten uroczy śpioch jest gotowy zamieszkać na Twoim biurku od zaraz! 🌲

To wierna, pikselowa replika lisa z Minecrafta, zwiniętego w kłębek do snu. 💤 Emituje miękkie, ciepłe, pomarańczowe światło, które natychmiast sprawia, że pokój staje się przytulniejszy.

✨ Dlaczego musisz go mieć?

    🔥 Klimat Cozy: Idealna jako lampka nocna lub nastrojowe oświetlenie do grania.

    🎮 Oryginalny Design: Wygląda jak wyciągnięty prosto z gry (tylko nie ucieka!).

    🔋 Bezprzewodowa: Działa na baterie – postaw ją na szafce, biurku lub zabierz do łóżka.

    🎁 Super Prezent: Każdy fan Minecrafta pokocha tego słodziaka.

Ciii... nie obudź go! 🤫 Kliknij "Do koszyka" i przygarnij swojego liska już teraz! 🛒`,
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
    description: `🐝 BZZZ! Lampka Latająca Pszczoła – Najsłodszy Mob Przyleciał do Twojego Pokoju! 🍯

Szukasz idealnego towarzysza do swojego gamingowego "ula"? 🏡 Zapomnij o bieganiu po biomie Kwiecistego Lasu (Flower Forest) w poszukiwaniu tych uroczych, latających klocków. Najbardziej pracowity (i zdecydowanie najsłodszy!) mob w całym Minecrafcie właśnie wylądował na Twoim biurku i jest gotów rozświetlić Twój świat! ✨

💖 Zero Żądlenia, 100% Słodyczy! Ta lampka to wierna, pikselowa kopia Waszego ulubionego moba. Jej charakterystyczny, "klockowaty" kształt, wielkie niebieskie oczy i półprzezroczyste skrzydełka sprawiają, że wygląda, jakby przed chwilą wyfrunęła prosto z ekranu komputera. Ale spokojnie! Ta Pszczoła jest w trybie pacyfistycznym. Nie musisz używać Ogniska (Campfire), żeby ją uspokoić – ona nigdy Cię nie użądli! 😉

🌙 Miodowy Blask w Twojej Bazie Wieczorem, gdy zapada zmrok (zarówno w grze, jak i w realu), Twoja Pszczółka budzi się do życia. Emituje przyjemne, ciepłe, miodowe światło, które natychmiast buduje przytulną atmosferę. To idealny gadżet, by:

    🎮 Stworzyć klimatyczne oświetlenie do nocnych sesji budowania.

    📚 Poczytać ulubioną książkę lub komiks przed snem.

    🧟‍♂️ Odpędzić "potwory" czające się w ciemnych kątach pokoju.

✨ Dlaczego warto ją przygarnąć? ✅ Pixel-Perfect Design: Wygląda dokładnie tak, jak Pszczoła, którą kochasz z gry. 👾 🍯 Kojące Światło: Ciepły, żółty blask idealny do relaksu i jako lampka nocna. 🛋️ 🧸 Urocza Dekoracja: Świetnie wygląda na biurku, szafce nocnej lub półce z kolekcją gier – nawet gdy jest wyłączona! 🎁 Epicki Loot na Prezent: Każdy fan gier, mały czy duży, uśmiechnie się na widok tego słodziaka.

Nie czekaj, aż odleci zbierać pyłek! 🌸 Przygarnij własną Latającą Pszczółkę już dziś i stwórz najprzytulniejszą bazę na całym serwerze! 🐝💨`,
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
    description: `🔥 Brelok Lampka Minecraft Pochodnia – Rozświetl Swój Ekwipunek! 🔥

🌑 Zapada zmrok, jesteś głęboko w kopalni ⛏️, a ostatni kilof właśnie się zepsuł? Każdy gracz wie, że najważniejszy przedmiot w ekwipunku to... pochodnia! 🕯️ Teraz możesz zabrać kawałek świata Minecrafta ze sobą do "reala" 🌍. Ten stylowy brelok w kształcie kultowej, pikselowej pochodni (Torch) 🟧 to nie tylko świetny gadżet dla fana, ale też praktyczne narzędzie, które rozjaśni mroki codzienności. ✨

🛠️ Crafting w Realu 🟫 Ten brelok to wierna, licencjonowana replika przedmiotu z gry 🎮. Charakterystyczny, blokowy design i pikselowa tekstura 👾 sprawiają, że wygląda, jakbyś właśnie wyciągnął go prosto ze stołu rzemieślniczego. ⬜🟩

💡 Więcej niż ozdoba To nie jest zwykły kawałek plastiku! 😎 Brelok posiada wbudowane, jasne światło LED. Wystarczy jeden ruch, aby zamienić go w mini-latarkę 🔦.

    🚪 Wracasz późno do domu i nie możesz trafić kluczem do zamka? 👉 Użyj pochodni.

    🎒 Szukasz czegoś na dnie ciemnego plecaka? 👉 Pochodnia pomoże.

    🛏️ Chcesz odstraszyć "potwory" czające się pod łóżkiem? 👉 Wiesz, co robić. 🧟‍♂️

Solidne, metalowe kółko sprawia, że bezpiecznie przypniesz go do kluczy 🔑, plecaka szkolnego, piórnika czy szlufki od spodni. To idealny drobny prezent dla każdego fana Minecrafta – niezależnie od wieku! 👍

⭐️ Najważniejsze cechy produktu: ⭐️ ✅ Autentyczny design: Wierna, pikselowa replika pochodni z gry Minecraft. 👾 💡 Funkcja latarki: Wbudowane jasne światło LED, uruchamiane przyciskiem. ✨ 🔑 Praktyczny: Solidne kółko do kluczy lub przypięcia do plecaka. 🎒 🎁 Idealny na prezent: Must-have dla każdego fana budowania z bloków. 🧱 🔋 Zasilanie: Akumulatorowe (gotowy do działania od razu po wyjęciu z pudełka!). 👌

💥 Nie pozwól, by dopadły Cię Creepery w ciemności! 💥 Dodaj tę pochodnię do swojego ekwipunku już dziś i zawsze miej światło pod ręką! 🔥`,
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
    description: `🏮 Lampka Lampion – Oświetl Swoją Bazę w Realu! 🏮

Znudziło Ci się stawianie zwykłych Pochodni na każdym bloku? Czas na epicki upgrade oświetlenia w Twojej bazie! 🏰

Przenieś kawałek Minecrafta prosto na swoje biurko dzięki tej wiernej replice Lampionu. To nie jest zwykła lampka – to gadżet, który wygląda, jakbyś właśnie wyciągnął go ze stołu rzemieślniczego (Crafting Table), używając sztabek żelaza i pochodni. 🛠️

🟦 Pikselowa Autentyczność Lampka idealnie odwzorowuje charakterystyczny, blokowy design i teksturę "żelaznej" klatki z gry. Emituje przyjemne, ciepłe, migoczące światło, które natychmiast buduje niesamowity klimat w ciemnym pokoju. ✨

⛓️ Powieś lub Postaw – Ty Decydujesz! Tak jak w grze, ten lampion jest niezwykle uniwersalny:

    🪑 Tryb Stojący: Postaw go na biurku, szafce nocnej lub półce z kolekcją gier.

    🧱 Tryb Wiszący: Dzięki dołączonemu uchwytowi ściennemu i łańcuchowi (w zestawie!), możesz zamontować go na ścianie nad swoim stanowiskiem gamingowym, tworząc epicki, "dungeonowy" klimat.

💎 Dlaczego musisz go mieć w swoim ekwipunku? ✅ Wierny Design: Wygląda dokładnie jak przedmiot z gry. 🕯️ Klimatyczne Światło: Ciepły blask idealny do nocnych sesji grania. 🔨 Uniwersalny Montaż: Możliwość postawienia lub powieszenia na ścianie. 🎁 Idealny Prezent: Must-have dla każdego fana budowania i eksploracji.

🧟‍♂️ Nie pozwól, by w Twoim pokoju zespawnowały się potwory! Rozświetl mrok tym stylowym Lampionem. Zamów już dziś! 🔥`,
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
    description: `🌊 Lampka Nocna Minecraft AXOLOTL – Najsłodszy Mob w Twoim Pokoju! 💖

Marzysz o własnym Aksolotlu, ale nie chce Ci się przeszukiwać Bujnych Jaskiń (Lush Caves)? Mamy na to sposób! 🏝️ Oto najsympatyczniejszy drapieżnik świata Minecrafta, który teraz może zamieszkać na Twoim biurku! Zapomnij o noszeniu wody w wiaderku – ten Axolotl czuje się świetnie w Twoim pokoju, dodając mu niesamowitego, gamingowego klimatu. ✨

🌈 Jeden Mob, Wiele Oblicz! To nie jest zwykła lampka. Tak jak w grze występują rzadkie warianty kolorystyczne, tak i ten gadżet potrafi się zmieniać! 🎨 Dzięki funkcji Multi-Color, Twój Aksolotl może świecić aż w 5 różnych kolorach! Masz nastrój na klasyczny róż? 🌸 A może rzadki niebieski lub złoty? 🔵🟡 Zmieniaj barwę światła jednym dotknięciem i dopasuj klimat do swojej rozgrywki lub nastroju.

🔋 Bez Kabli, Bez Problemów Twój nowy przyjaciel jest w pełni mobilny! Dzięki wbudowanej, wydajnej baterii litowej 500 mAh, lampka działa bezprzewodowo. Możesz postawić ją na półce, przy łóżku lub zabrać ze sobą na nocne maratony grania. 🌙 Kiedy energia spadnie (tak jak pasek głodu w grze 😉), po prostu nakarm go prądem za pomocą dołączonego, nowoczesnego kabla USB Type-C. Szybko, łatwo i wygodnie! ⚡

✨ Dlaczego musisz go mieć? ✅ 5 Trybów Kolorystycznych: Od relaksującego błękitu po energetyczny róż. 🌈 ✅ Pixel-Perfect Design: Wygląda dokładnie tak, jak ten z klocków. 🟩 ✅ Wbudowany Akumulator: Koniec z kupowaniem paluszków! 🔋 ✅ Idealny na Prezent: Skradnie serce każdego fana (i fanki) Minecrafta. 🎁 ✅ Kabel USB-C w zestawie: Wszystko, czego potrzebujesz, jest w pudełku. 🔌

😱 Nie czekaj, aż zdespawnuje! Przygarnij własnego Aksolotla już dziś i spraw, by Twój pokój stał się najbardziej przytulnym biomem w całym domu! 🥰`,
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
