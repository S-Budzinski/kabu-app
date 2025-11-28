import flashlightImg from "@/assets/flashlight.avif";
import chargerImg from "@/assets/charger.avif";
import hero1 from "@/assets/hero-1.png";
import hero2 from "@/assets/hero-2.png";
import hero3 from "@/assets/hero-3.png";
import hero4 from "@/assets/hero-4.png";
import hero5 from "@/assets/hero-5.png";

export interface Product {
  id: string;
  name: string;
  price: number;
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
    id: "tactical-flashlight-pro",
    name: "Tactical Flashlight Pro X9",
    price: 89.99,
    image: flashlightImg,
    images: [flashlightImg, hero1, hero3, hero4, hero5],
    rating: 4.8,
    purchaseCount: 1247,
    category: "Flashlights",
    description: `The Tactical Flashlight Pro X9 is engineered for professionals who demand reliability in extreme conditions. With its aerospace-grade aluminum body and military-grade LED, this flashlight delivers exceptional performance when you need it most.

**Key Features:**
- Ultra-bright 2000 lumen output
- 5 light modes: Strong, Medium, SOS, Strobe, Low
- Waterproof to 30 meters (IP68 rated)
- Impact resistant from 3 meters
- Rechargeable lithium battery (included)
- Zoom function for focused or wide beam
- Battery level indicator
- Emergency glass breaker tip

**Specifications:**
- Material: Aerospace-grade aluminum alloy
- Length: 165mm
- Weight: 185g
- Battery: 5000mAh rechargeable
- Runtime: Up to 12 hours on low mode
- Beam distance: 500 meters

Perfect for law enforcement, military personnel, outdoor enthusiasts, and emergency preparedness. Includes USB-C charging cable, hand strap, and tactical holster.`,
    reviews: [
      {
        id: "r1",
        rating: 5,
        nickname: "OutdoorExplorer92",
        comment: "Absolutely brilliant flashlight! Used it on a 3-day camping trip and it performed flawlessly. The battery life is exceptional and the build quality is outstanding.",
        date: "2025-01-15",
      },
      {
        id: "r2",
        rating: 5,
        nickname: "SecurityPro",
        comment: "As a security professional, I've used many flashlights. This one is by far the best. The multiple modes are incredibly useful and it's built like a tank.",
        date: "2025-01-10",
      },
      {
        id: "r3",
        rating: 4,
        nickname: "HikingDad",
        comment: "Great flashlight overall. Very bright and durable. Only minor issue is it's slightly heavier than expected, but that's due to the solid construction.",
        date: "2025-01-05",
      },
    ],
  },
  {
    id: "universal-charger-elite",
    name: "Universal Fast Charger Elite",
    price: 49.99,
    image: chargerImg,
    images: [chargerImg, hero2],
    rating: 4.6,
    purchaseCount: 892,
    category: "Chargers",
    description: `The Universal Fast Charger Elite is your all-in-one charging solution for flashlights, smartphones, and other USB devices. Featuring intelligent charging technology and multiple safety protections, this charger ensures your devices are always ready when you need them.

**Key Features:**
- Dual USB-C and USB-A ports
- Fast charging up to 30W
- Compatible with all major flashlight batteries
- LED charging status indicators
- Overcharge protection
- Temperature monitoring
- Compact, portable design
- Universal voltage (100-240V)

**Specifications:**
- Input: AC 100-240V, 50/60Hz
- USB-C Output: 5V/3A, 9V/2.22A, 12V/1.67A (20W max)
- USB-A Output: 5V/2.4A (12W max)
- Dimensions: 85mm x 50mm x 28mm
- Weight: 95g
- Certifications: CE, FCC, RoHS

**Safety Features:**
- Short circuit protection
- Overvoltage protection
- Overcurrent protection
- Temperature control
- Fire-resistant housing

Perfect companion for the Tactical Flashlight Pro X9 and all your portable devices. Compact enough for travel, powerful enough for daily use.`,
    reviews: [
      {
        id: "r4",
        rating: 5,
        nickname: "TechGuru88",
        comment: "Charges my devices super fast! The dual ports are really convenient and I love the LED indicators showing charging status.",
        date: "2025-01-12",
      },
      {
        id: "r5",
        rating: 4,
        nickname: "TravelBlogger",
        comment: "Great charger for travel. Compact and works with all my devices. Wish it came with a travel case though.",
        date: "2025-01-08",
      },
      {
        id: "r6",
        rating: 5,
        nickname: "GadgetLover",
        comment: "Best charger I've owned. Fast, safe, and very well built. Highly recommend!",
        date: "2025-01-03",
      },
    ],
  },
  {
    id: "tactical-flashlight-mini",
    name: "Tactical Flashlight Mini",
    price: 59.99,
    image: flashlightImg,
    images: [flashlightImg, hero3, hero4],
    rating: 4.7,
    purchaseCount: 654,
    category: "Flashlights",
    description: `Compact powerhouse designed for everyday carry. The Tactical Flashlight Mini delivers professional-grade performance in a pocket-sized package.

**Key Features:**
- 1000 lumen output
- 3 light modes: High, Low, Strobe
- Waterproof (IP65 rated)
- Clip for easy carry
- Rechargeable battery
- 5-hour runtime

Perfect for EDC, emergency kits, and backup lighting.`,
    reviews: [
      {
        id: "r7",
        rating: 5,
        nickname: "EDCEnthusiast",
        comment: "Perfect size for everyday carry. Very bright for its size!",
        date: "2025-01-14",
      },
    ],
  },
  {
    id: "car-charger-dual",
    name: "Dual Car Charger Pro",
    price: 29.99,
    image: chargerImg,
    images: [chargerImg],
    rating: 4.5,
    purchaseCount: 521,
    category: "Chargers",
    description: `Keep your devices charged on the go with the Dual Car Charger Pro. Features intelligent power distribution and universal compatibility.

**Key Features:**
- Dual USB ports
- 24W total output
- LED power indicator
- Compact design
- Universal compatibility

Essential for road trips and daily commutes.`,
    reviews: [
      {
        id: "r8",
        rating: 4,
        nickname: "RoadWarrior",
        comment: "Works great in my car. Charges phone and flashlight simultaneously.",
        date: "2025-01-11",
      },
    ],
  },
  {
    id: "headlamp-pro",
    name: "LED Headlamp Pro",
    price: 69.99,
    image: flashlightImg,
    images: [flashlightImg, hero5],
    rating: 4.9,
    purchaseCount: 789,
    category: "Flashlights",
    description: `Hands-free illumination for any task. The LED Headlamp Pro features adjustable beam angle and multiple brightness settings.

**Key Features:**
- 1500 lumen output
- Adjustable head strap
- Tilting light head
- Red light mode
- Rechargeable battery
- Motion sensor control

Ideal for camping, hiking, repairs, and night work.`,
    reviews: [
      {
        id: "r9",
        rating: 5,
        nickname: "CamperJoe",
        comment: "Game changer for camping! The motion sensor is amazing.",
        date: "2025-01-09",
      },
    ],
  },
];

export const carouselImages = [hero1, hero2, hero3, hero4, hero5];
