import React, { useMemo, useState, useEffect } from "react";

/**
 * Demo SaaS e-commerce / social-commerce "Operette" + "Boutique Lumière"
 * - Front complet dans UN SEUL FICHIER (ex: App.jsx)
 * - React (hooks), TailwindCSS seulement
 * - Aucune API externe; données en mémoire
 * - Tous les textes visibles en FRANÇAIS
 */

/* ---------------------------- Utilitaires globaux ---------------------------- */

// Format prix en Dinar Algérien (DA)
const formatDA = (n) => {
  try {
    return `${Number(n || 0).toLocaleString("fr-DZ")} DA`;
  } catch {
    return `${n} DA`;
  }
};

// Format date lisible FR
const formatDateTime = (iso) => {
  try {
    const d = new Date(iso);
    return d.toLocaleString("fr-FR", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch {
    return iso;
  }
};

// Date (YYYY-MM-DD) pour comparaisons "aujourd’hui"
const toYMD = (date) => {
  const d = new Date(date);
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
};

// Générer un ID simple pour commandes/produits
const uid = (prefix = "") =>
  `${prefix}${Math.random().toString(36).slice(2, 6)}-${Date.now()
    .toString(36)
    .slice(-6)}`;

// Couleurs de badge statut commande
const statusStyles = {
  "Nouveau": "bg-blue-100 text-blue-800",
  "En attente d’appel": "bg-yellow-100 text-yellow-800",
  "En livraison": "bg-indigo-100 text-indigo-800",
  "Livré": "bg-green-100 text-green-800",
  "Annulé": "bg-red-100 text-red-800",
};

// Badges produits
const productBadgeStyle = (badge) => {
  switch (badge) {
    case "Nouveau":
      return "bg-indigo-100 text-indigo-700";
    case "Meilleure vente":
      return "bg-amber-100 text-amber-800";
    case "Promotion":
      return "bg-rose-100 text-rose-700";
    default:
      return "bg-gray-100 text-gray-600";
  }
};

// Liste complète des 58 wilayas (FR)
const WILAYAS = [
  { code: "01", name: "Adrar" },
  { code: "02", name: "Chlef" },
  { code: "03", name: "Laghouat" },
  { code: "04", name: "Oum El Bouaghi" },
  { code: "05", name: "Batna" },
  { code: "06", name: "Béjaïa" },
  { code: "07", name: "Biskra" },
  { code: "08", name: "Béchar" },
  { code: "09", name: "Blida" },
  { code: "10", name: "Bouira" },
  { code: "11", name: "Tamanrasset" },
  { code: "12", name: "Tébessa" },
  { code: "13", name: "Tlemcen" },
  { code: "14", name: "Tiaret" },
  { code: "15", name: "Tizi Ouzou" },
  { code: "16", name: "Alger" },
  { code: "17", name: "Djelfa" },
  { code: "18", name: "Jijel" },
  { code: "19", name: "Sétif" },
  { code: "20", name: "Saïda" },
  { code: "21", name: "Skikda" },
  { code: "22", name: "Sidi Bel Abbès" },
  { code: "23", name: "Annaba" },
  { code: "24", name: "Guelma" },
  { code: "25", name: "Constantine" },
  { code: "26", name: "Médéa" },
  { code: "27", name: "Mostaganem" },
  { code: "28", name: "M'Sila" },
  { code: "29", name: "Mascara" },
  { code: "30", name: "Ouargla" },
  { code: "31", name: "Oran" },
  { code: "32", name: "El Bayadh" },
  { code: "33", name: "Illizi" },
  { code: "34", name: "Bordj Bou Arréridj" },
  { code: "35", name: "Boumerdès" },
  { code: "36", name: "El Tarf" },
  { code: "37", name: "Tindouf" },
  { code: "38", name: "Tissemsilt" },
  { code: "39", name: "El Oued" },
  { code: "40", name: "Khenchela" },
  { code: "41", name: "Souk Ahras" },
  { code: "42", name: "Tipaza" },
  { code: "43", name: "Mila" },
  { code: "44", name: "Aïn Defla" },
  { code: "45", name: "Naâma" },
  { code: "46", name: "Aïn Témouchent" },
  { code: "47", name: "Ghardaïa" },
  { code: "48", name: "Relizane" },
  { code: "49", name: "Timimoun" },
  { code: "50", name: "Bordj Badji Mokhtar" },
  { code: "51", name: "Ouled Djellal" },
  { code: "52", name: "Béni Abbès" },
  { code: "53", name: "In Salah" },
  { code: "54", name: "In Guezzam" },
  { code: "55", name: "Touggourt" },
  { code: "56", name: "Djanet" },
  { code: "57", name: "El M'Ghair" },
  { code: "58", name: "El Meniaa" },
];

/* --------------------------------- Données ---------------------------------- */

// Produits démo (images libres Pexels/Unsplash)
const initialProducts = [
  {
    id: "p-lampe-aurora",
    name: "Lampe de chevet Aurora",
    description:
      "Éclairage doux et réglable pour une ambiance apaisante. Idéale pour la chambre et le salon.",
    price: 4200,
    images: [
      "https://images.pexels.com/photos/1797393/pexels-photo-1797393.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260",
      "https://images.pexels.com/photos/112811/pexels-photo-112811.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260",
      "https://images.pexels.com/photos/842950/pexels-photo-842950.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260",
    ],
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    badge: "Nouveau",
    category: "Maison",
    status: "Actif",
    createdAt: "2025-10-22T09:00:00",
    features: [
      "Lumière chaude et froide",
      "Consommation 6W",
      "Câble USB inclus",
    ],
    benefits: [
      "Améliore le confort visuel",
      "Parfaite pour la lecture",
      "Design minimaliste",
    ],
    howTo: ["Branchez via USB", "Touchez pour varier l’intensité"],
  },
  {
    id: "p-tasse-horizon",
    name: "Tasse Thermique Horizon",
    description:
      "Garde vos boissons chaudes pendant 6h et froides 12h. Parfaite au bureau.",
    price: 2500,
    images: [
      "https://images.pexels.com/photos/1415551/pexels-photo-1415551.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260",
      "https://images.pexels.com/photos/1601990/pexels-photo-1601990.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260",
      "https://images.pexels.com/photos/302902/pexels-photo-302902.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260",
    ],
    badge: "Meilleure vente",
    category: "Cuisine",
    status: "Actif",
    createdAt: "2025-08-12T11:30:00",
    features: ["Acier inox 304", "Couvercle anti-fuite", "350 ml"],
    benefits: [
      "Conservation longue durée",
      "Facile à nettoyer",
      "Convient aux trajets",
    ],
    howTo: ["Rincer avant usage", "Ne pas mettre au micro-ondes"],
  },
  {
    id: "p-sac-nova",
    name: "Sac à dos Urbain Nova",
    description:
      "Résistant à l’eau, poches multiples, compartiment PC 15”. Idéal pour la ville.",
    price: 6900,
    images: [
      "https://images.pexels.com/photos/248484/pexels-photo-248484.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260",
      "https://images.pexels.com/photos/374746/pexels-photo-374746.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260",
      "https://images.pexels.com/photos/374844/pexels-photo-374844.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260",
    ],
    badge: "Promotion",
    category: "Mode",
    status: "Actif",
    createdAt: "2025-09-05T15:00:00",
    features: ["Compartiment PC 15”", "Tissu imperméable", "Bretelles rembourrées"],
    benefits: ["Confort quotidien", "Organisation optimale", "Style polyvalent"],
    howTo: ["Lavage à la main conseillé"],
  },
  {
    id: "p-montre-nebula",
    name: "Montre connectée Nébula",
    description:
      "Suivi d’activité, notifications, autonomie 7 jours. Compatible iOS/Android.",
    price: 15900,
    images: [
      "https://images.pexels.com/photos/277390/pexels-photo-277390.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260",
      "https://images.pexels.com/photos/190819/pexels-photo-190819.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260",
      "https://images.pexels.com/photos/36104/pexels-photo.jpg?auto=compress&cs=tinysrgb&h=750&w=1260",
    ],
    badge: "Meilleure vente",
    category: "Tech",
    status: "Actif",
    createdAt: "2025-07-18T10:00:00",
    features: ["Cardio, SpO₂", "Étanche IP68", "Bluetooth 5.2"],
    benefits: ["Motivation sportive", "Gain de temps", "Style moderne"],
    howTo: ["Installer l’app compagnon", "Charger 2h avant premier usage"],
  },
  {
    id: "p-ecouteurs-eclipse",
    name: "Écouteurs sans fil Éclipse",
    description:
      "Réduction de bruit, boîtier 24h d’autonomie, charge USB‑C.",
    price: 11900,
    images: [
      "https://images.pexels.com/photos/374777/pexels-photo-374777.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260",
      "https://images.pexels.com/photos/788946/pexels-photo-788946.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260",
      "https://images.pexels.com/photos/373945/pexels-photo-373945.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260",
    ],
    badge: "Nouveau",
    category: "Tech",
    status: "Actif",
    createdAt: "2025-11-01T09:50:00",
    features: ["ANC hybride", "Bluetooth 5.3", "Mode jeu faible latence"],
    benefits: ["Immersion sonore", "Appels clairs", "Compact et léger"],
    howTo: ["Jumelage en 3s via boîtier", "Recharger via USB‑C"],
  },
  {
    id: "p-diffuseur-brise",
    name: "Diffuseur d’arômes Brise",
    description:
      "Brume fine, veilleuse multicolore, minuterie. Pour une maison relaxante.",
    price: 5200,
    images: [
      "https://images.pexels.com/photos/2122532/pexels-photo-2122532.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260",
      "https://images.pexels.com/photos/1451467/pexels-photo-1451467.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260",
      "https://images.pexels.com/photos/190006/pexels-photo-190006.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260",
    ],
    badge: "",
    category: "Maison",
    status: "Actif",
    createdAt: "2025-06-03T08:00:00",
    features: ["Réservoir 300 ml", "Arrêt automatique", "LED 7 couleurs"],
    benefits: ["Ambiance zen", "Air plus agréable", "Cadeau idéal"],
    howTo: ["Ajouter eau + 2 gouttes d’huile", "Sélectionner le mode"],
  },
];

// Commandes démo (montant calculé dynamiquement)
const initialOrders = [
  {
    id: "CMD-2025-001",
    date: "2025-12-11T09:20:00", // aujourd’hui
    customerName: "Amine Bensalah",
    phone: "0550123456",
    wilaya: "Alger",
    address: "Bir Mourad Raïs, rue 12",
    items: [{ productId: "p-ecouteurs-eclipse", qty: 1, price: 11900 }],
    status: "Nouveau",
    note: "",
  },
  {
    id: "CMD-2025-002",
    date: "2025-12-10T16:05:00",
    customerName: "Nadia Bouzid",
    phone: "0770456789",
    wilaya: "Oran",
    address: "Hai El Akid, bloc B",
    items: [{ productId: "p-ecouteurs-eclipse", qty: 2, price: 11900 }],
    status: "En livraison",
    note: "Appeler après 17h",
  },
  {
    id: "CMD-2025-003",
    date: "2025-12-08T12:30:00",
    customerName: "Karim Belkacem",
    phone: "0660987654",
    wilaya: "Constantine",
    address: "Cité Ziadia, bât 3",
    items: [{ productId: "p-sac-nova", qty: 1, price: 6900 }],
    status: "En attente d’appel",
    note: "",
  },
  {
    id: "CMD-2025-004",
    date: "2025-12-05T10:30:00",
    customerName: "Sofia Aït",
    phone: "0552233445",
    wilaya: "Tizi Ouzou",
    address: "Azazga, centre",
    items: [
      { productId: "p-lampe-aurora", qty: 1, price: 4200 },
      { productId: "p-tasse-horizon", qty: 1, price: 2500 },
    ],
    status: "Livré",
    note: "Cadeau",
  },
  {
    id: "CMD-2025-005",
    date: "2025-11-28T09:10:00",
    customerName: "Yacine Ouali",
    phone: "0770123987",
    wilaya: "Annaba",
    address: "Sidi Amar, villa 14",
    items: [{ productId: "p-montre-nebula", qty: 1, price: 15900 }],
    status: "Livré",
    note: "",
  },
  {
    id: "CMD-2025-006",
    date: "2025-11-20T18:45:00",
    customerName: "Lina Hachemi",
    phone: "0661234567",
    wilaya: "Béjaïa",
    address: "Tichy, lot 7",
    items: [{ productId: "p-diffuseur-brise", qty: 1, price: 5200 }],
    status: "Annulé",
    note: "Client injoignable",
  },
  {
    id: "CMD-2025-007",
    date: "2025-10-14T14:00:00",
    customerName: "Mohamed Djelloul",
    phone: "0553344556",
    wilaya: "Sétif",
    address: "El Eulma",
    items: [{ productId: "p-tasse-horizon", qty: 3, price: 2500 }],
    status: "Livré",
    note: "",
  },
  {
    id: "CMD-2025-008",
    date: "2025-09-22T11:15:00",
    customerName: "Nour Benali",
    phone: "0770332211",
    wilaya: "Tipaza",
    address: "Bou Ismaïl",
    items: [{ productId: "p-lampe-aurora", qty: 2, price: 4200 }],
    status: "Livré",
    note: "",
  },
];

// Paramètres boutique par défaut
const defaultSettings = {
  storeName: "Boutique Lumière",
  slogan: "Produits sélectionnés avec soin pour votre quotidien.",
  phone: "+213 5x xx xx xx",
  instagram: "https://instagram.com/boutique.lumiere",
  facebook: "https://facebook.com/boutique.lumiere",
  wilayasDesservies: ["Alger", "Oran", "Constantine", "Tizi Ouzou", "Tipaza"],
  noteProduit:
    "Livraison rapide 24–72h selon la wilaya. Paiement à la livraison disponible.",
};

/* --------------------------- Composants utilitaires -------------------------- */

function TopLevelNav({ currentView, setCurrentView, storeName }) {
  return (
    <div className="sticky top-0 z-40 border-b bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="mx-auto max-w-7xl px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-full bg-gradient-to-tr from-indigo-500 via-sky-500 to-emerald-400 shadow-inner" />
            <div className="flex flex-col leading-tight">
              <span className="text-sm font-medium text-gray-500">Operette</span>
              <span className="text-base font-semibold text-gray-900">{storeName}</span>
            </div>
          </div>
          <nav className="flex items-center gap-1">
            {[
              { key: "boutique", label: "Boutique" },
              { key: "dashboard", label: "Tableau de bord" },
            ].map((t) => (
              <button
                key={t.key}
                onClick={() => setCurrentView(t.key)}
                className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                  currentView === t.key
                    ? "bg-gray-900 text-white"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                {t.label}
              </button>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
}

// Badge composant
const Badge = ({ children, className = "" }) => (
  <span
    className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${className}`}
  >
    {children}
  </span>
);

// Boutons primaires/secondaires
const Button = ({ children, onClick, type = "button", variant = "primary", className = "" }) => {
  const base =
    "inline-flex items-center justify-center rounded-lg px-4 py-2 text-sm font-semibold transition focus:outline-none focus:ring-2 focus:ring-offset-2";
  const styles =
    variant === "primary"
      ? "bg-gray-900 text-white hover:bg-black focus:ring-gray-900"
      : variant === "light"
      ? "bg-white text-gray-700 ring-1 ring-gray-300 hover:bg-gray-50 focus:ring-gray-400"
      : "bg-gray-100 text-gray-800 hover:bg-gray-200 focus:ring-gray-300";
  return (
    <button type={type} onClick={onClick} className={`${base} ${styles} ${className}`}>
      {children}
    </button>
  );
};

/* ------------------------------ STOREFRONT UI ------------------------------- */

function StoreHeader({ slogan, phone }) {
  return (
    <header className="bg-gradient-to-b from-white to-gray-50">
      <div className="mx-auto max-w-5xl px-4 py-10 text-center">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-tr from-indigo-500 via-sky-500 to-emerald-400 shadow-lg" />
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">
          Boutique Lumière
        </h1>
        <p className="mx-auto mt-2 max-w-2xl text-gray-600">{slogan}</p>
        {phone && (
          <p className="mt-1 text-sm text-gray-500">
            Téléphone: <span className="font-medium text-gray-700">{phone}</span>
          </p>
        )}
      </div>
    </header>
  );
}

function ProductCard({ product, onView }) {
  return (
    <div className="group relative flex flex-col overflow-hidden rounded-2xl border bg-white shadow-sm transition hover:shadow-lg">
      <div className="relative">
        <img
          src={product.images[0]}
          alt={product.name}
          className="h-48 w-full object-cover transition group-hover:scale-[1.02]"
        />
        {product.badge ? (
          <div className="absolute left-3 top-3">
            <Badge className={productBadgeStyle(product.badge)}>{product.badge}</Badge>
          </div>
        ) : null}
      </div>
      <div className="flex flex-1 flex-col gap-2 p-4">
        <h3 className="line-clamp-1 text-base font-semibold text-gray-900">
          {product.name}
        </h3>
        <p className="line-clamp-2 text-sm text-gray-600">{product.description}</p>
        <div className="mt-auto flex items-center justify-between">
          <span className="text-[15px] font-semibold text-gray-900">
            {formatDA(product.price)}
          </span>
          <Button onClick={() => onView(product)} variant="light">
            Voir le produit
          </Button>
        </div>
      </div>
    </div>
  );
}

function ProductGrid({ products, onView }) {
  const active = products.filter((p) => p.status === "Actif");
  return (
    <div className="mx-auto grid max-w-6xl grid-cols-1 gap-4 px-4 pb-14 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {active.map((p) => (
        <ProductCard key={p.id} product={p} onView={onView} />
      ))}
    </div>
  );
}

function ImageSlider({ images = [] }) {
  const [index, setIndex] = useState(0);
  const prev = () => setIndex((i) => (i - 1 + images.length) % images.length);
  const next = () => setIndex((i) => (i + 1) % images.length);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [images.length]);

  return (
    <div className="relative overflow-hidden rounded-xl border bg-white">
      <img
        src={images[index]}
        alt={`Image ${index + 1}`}
        className="h-72 w-full object-cover sm:h-96"
      />
      <button
        onClick={prev}
        aria-label="Précédent"
        className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-white/90 p-2 shadow hover:bg-white"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" className="text-gray-800">
          <path fill="currentColor" d="M15.41 16.59L10.83 12l4.58-4.59L14 6l-6 6l6 6z" />
        </svg>
      </button>
      <button
        onClick={next}
        aria-label="Suivant"
        className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-white/90 p-2 shadow hover:bg-white"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" className="text-gray-800">
          <path fill="currentColor" d="m10 6l-1.41 1.41L13.17 12l-4.58 4.59L10 18l6-6z" />
        </svg>
      </button>
      <div className="absolute inset-x-0 bottom-2 flex justify-center gap-1">
        {images.map((_, i) => (
          <button
            key={i}
            aria-label={`Aller à l’image ${i + 1}`}
            onClick={() => setIndex(i)}
            className={`h-2 w-2 rounded-full ${i === index ? "bg-gray-900" : "bg-gray-300"}`}
          />
        ))}
      </div>
    </div>
  );
}

function InfoItem({ icon, title, text }) {
  return (
    <div className="flex items-start gap-3 rounded-lg border bg-white p-3">
      <div className="mt-0.5">{icon}</div>
      <div>
        <div className="text-sm font-semibold text-gray-900">{title}</div>
        <div className="text-sm text-gray-600">{text}</div>
      </div>
    </div>
  );
}

function ProductDetail({ product, onBack, onOrder, noteProduit }) {
  const [openOrder, setOpenOrder] = useState(false);

  return (
    <div className="mx-auto max-w-6xl px-4 pb-20">
      <div className="mb-4">
        <Button variant="light" onClick={onBack}>
          ← Retour aux produits
        </Button>
      </div>
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="space-y-4">
          <ImageSlider images={product.images} />
          {product.videoUrl && (
            <div className="overflow-hidden rounded-xl border bg-white">
              <video controls className="h-60 w-full bg-black sm:h-72">
                <source src={product.videoUrl} type="video/mp4" />
                Votre navigateur ne supporte pas la vidéo.
              </video>
            </div>
          )}
        </div>

        <div className="flex flex-col">
          <div className="mb-3 flex items-center gap-2">
            {product.badge ? (
              <Badge className={productBadgeStyle(product.badge)}>{product.badge}</Badge>
            ) : null}
            <Badge className="bg-gray-100 text-gray-700">{product.category}</Badge>
          </div>
          <h2 className="text-2xl font-bold text-gray-900">{product.name}</h2>
          <p className="mt-2 text-gray-600">{product.description}</p>
          <div className="mt-4 text-2xl font-semibold text-gray-900">
            {formatDA(product.price)}
          </div>

          <div className="mt-6 grid grid-cols-1 gap-4">
            <section className="rounded-xl border bg-white p-4">
              <h3 className="mb-2 text-sm font-semibold text-gray-900">Avantages</h3>
              <ul className="list-disc space-y-1 pl-5 text-sm text-gray-700">
                {product.benefits?.map((b, i) => <li key={i}>{b}</li>)}
              </ul>
            </section>
            <section className="rounded-xl border bg-white p-4">
              <h3 className="mb-2 text-sm font-semibold text-gray-900">Caractéristiques</h3>
              <ul className="list-disc space-y-1 pl-5 text-sm text-gray-700">
                {product.features?.map((f, i) => <li key={i}>{f}</li>)}
              </ul>
            </section>
            <section className="rounded-xl border bg-white p-4">
              <h3 className="mb-2 text-sm font-semibold text-gray-900">Comment utiliser</h3>
              <ul className="list-disc space-y-1 pl-5 text-sm text-gray-700">
                {product.howTo?.map((h, i) => <li key={i}>{h}</li>)}
              </ul>
            </section>
          </div>

          {noteProduit ? (
            <div className="mt-4 rounded-lg border border-dashed bg-amber-50 p-3 text-sm text-amber-800">
              {noteProduit}
            </div>
          ) : null}

          <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
            <InfoItem
              icon={<span className="text-lg">💳</span>}
              title="Paiement à la livraison"
              text="Payez en espèces lors de la réception."
            />
            <InfoItem
              icon={<span className="text-lg">🚚</span>}
              title="Livraison wilayas"
              text="Livraison disponible dans plusieurs wilayas."
            />
          </div>

          <div className="mt-6">
            <Button onClick={() => setOpenOrder(true)} className="w-full sm:w-auto">
              Commander maintenant
            </Button>
          </div>
        </div>
      </div>

      {openOrder && (
        <OrderFormModal
          product={product}
          onClose={() => setOpenOrder(false)}
          onSubmit={(payload) => {
            onOrder(payload);
            setOpenOrder(false);
          }}
        />
      )}
    </div>
  );
}

/* ----------------------------- Formulaire commande ----------------------------- */

function OrderFormModal({ product, onClose, onSubmit }) {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    wilaya: "",
    address: "",
    qty: 1,
    remark: "",
  });
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);

  const validate = () => {
    const errs = {};
    // Nom complet = au moins deux mots
    if (!form.name.trim() || form.name.trim().split(/\s+/).length < 2) {
      errs.name = "Veuillez entrer votre nom complet (au moins deux mots).";
    }
    // Téléphone DZ: commence par 05/06/07 et 10 chiffres
    const phone = form.phone.replace(/\D/g, "");
    if (!/^(05|06|07)\d{8}$/.test(phone)) {
      errs.phone = "Le numéro doit commencer par 05, 06 ou 07 et contenir 10 chiffres.";
    }
    // Wilaya requise
    if (!form.wilaya) {
      errs.wilaya = "Veuillez sélectionner une wilaya.";
    }
    // Quantité 1..10
    if (!(Number(form.qty) >= 1 && Number(form.qty) <= 10)) {
      errs.qty = "Quantité invalide (min 1, max 10).";
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const submit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    // Simuler stockage commande
    const payload = {
      id: `CMD-${new Date().getFullYear()}-${Math.floor(Math.random() * 900 + 100)}`,
      date: new Date().toISOString(),
      customerName: form.name.trim(),
      phone: form.phone.replace(/\D/g, ""),
      wilaya: form.wilaya,
      address: form.address.trim(),
      items: [{ productId: product.id, qty: Number(form.qty), price: product.price }],
      status: "Nouveau",
      note: form.remark.trim(),
    };
    setSuccess(true);
    setTimeout(() => {
      onSubmit(payload);
    }, 450);
  };

  if (success) {
    return (
      <Modal onClose={onClose}>
        <div className="mx-auto max-w-md text-center">
          <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
            ✅
          </div>
          <h3 className="text-lg font-semibold text-gray-900">Commande enregistrée</h3>
          <p className="mt-1 text-sm text-gray-600">
            Votre commande a été enregistrée. Nous vous contacterons pour la confirmation.
          </p>
          <div className="mt-5">
            <Button onClick={onClose}>Fermer</Button>
          </div>
        </div>
      </Modal>
    );
  }

  return (
    <Modal onClose={onClose}>
      <h3 className="mb-3 text-lg font-semibold text-gray-900">
        Commander : {product.name}
      </h3>
      <form onSubmit={submit} className="grid grid-cols-1 gap-3">
        <Field
          label="Nom complet"
          placeholder="Ex: Amine Bensalah"
          value={form.name}
          onChange={(v) => setForm((s) => ({ ...s, name: v }))}
          error={errors.name}
        />
        <Field
          label="Numéro de téléphone"
          placeholder="Ex: 0550123456"
          value={form.phone}
          onChange={(v) => setForm((s) => ({ ...s, phone: v }))}
          error={errors.phone}
        />
        <Select
          label="Wilaya"
          value={form.wilaya}
          onChange={(v) => setForm((s) => ({ ...s, wilaya: v }))}
          options={WILAYAS.map((w) => ({ label: `${w.code} — ${w.name}`, value: w.name }))}
          placeholder="Sélectionner une wilaya"
          error={errors.wilaya}
        />
        <Field
          label="Adresse détaillée"
          placeholder="Commune, rue, références…"
          value={form.address}
          onChange={(v) => setForm((s) => ({ ...s, address: v }))}
        />
        <Field
          label="Quantité"
          type="number"
          value={form.qty}
          min={1}
          max={10}
          onChange={(v) => setForm((s) => ({ ...s, qty: v }))}
          error={errors.qty}
        />
        <TextArea
          label="Remarque (optionnel)"
          placeholder="Message pour le livreur…"
          value={form.remark}
          onChange={(v) => setForm((s) => ({ ...s, remark: v }))}
        />
        <div className="mt-2 flex items-center justify-between">
          <div className="text-sm text-gray-600">
            Total estimé:{" "}
            <span className="font-semibold text-gray-900">
              {formatDA(product.price * Number(form.qty || 1))}
            </span>
          </div>
          <div className="flex gap-2">
            <Button variant="light" onClick={onClose}>
              Annuler
            </Button>
            <Button type="submit">Valider la commande</Button>
          </div>
        </div>
      </form>
    </Modal>
  );
}

// Champs génériques
function Field({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  error,
  min,
  max,
}) {
  return (
    <div className="grid gap-1.5">
      <label className="text-sm font-medium text-gray-800">{label}</label>
      <input
        type={type}
        min={min}
        max={max}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={`w-full rounded-lg border bg-white px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900 ${
          error ? "border-red-300 ring-2 ring-red-200" : "border-gray-300"
        }`}
      />
      {error ? <p className="text-xs text-red-600">{error}</p> : null}
    </div>
  );
}

function TextArea({ label, value, onChange, placeholder, error }) {
  return (
    <div className="grid gap-1.5">
      <label className="text-sm font-medium text-gray-800">{label}</label>
      <textarea
        rows={3}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={`w-full rounded-lg border bg-white px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900 ${
          error ? "border-red-300 ring-2 ring-red-200" : "border-gray-300"
        }`}
      />
      {error ? <p className="text-xs text-red-600">{error}</p> : null}
    </div>
  );
}

function Select({ label, value, onChange, options, placeholder, error }) {
  return (
    <div className="grid gap-1.5">
      <label className="text-sm font-medium text-gray-800">{label}</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`w-full rounded-lg border bg-white px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900 ${
          error ? "border-red-300 ring-2 ring-red-200" : "border-gray-300"
        }`}
      >
        <option value="">{placeholder || "Sélectionner"}</option>
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
      {error ? <p className="text-xs text-red-600">{error}</p> : null}
    </div>
  );
}

function Modal({ children, onClose }) {
  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/40 p-0 sm:items-center sm:p-6">
      <div className="relative w-full max-w-lg rounded-t-2xl bg-white p-5 shadow-xl sm:rounded-2xl">
        <button
          onClick={onClose}
          className="absolute right-3 top-3 rounded-md p-2 text-gray-500 hover:bg-gray-100"
          aria-label="Fermer"
        >
          ✕
        </button>
        {children}
      </div>
    </div>
  );
}

function Storefront({ products, settings, onCreateOrder }) {
  const [selected, setSelected] = useState(null);
  return (
    <div className="min-h-[60vh] bg-gray-50">
      <StoreHeader slogan={settings.slogan} phone={settings.phone} />
      {!selected ? (
        <ProductGrid
          products={products}
          onView={(p) => setSelected(p)}
        />
      ) : (
        <ProductDetail
          product={selected}
          onBack={() => setSelected(null)}
          onOrder={(order) => {
            onCreateOrder(order);
          }}
          noteProduit={settings.noteProduit}
        />
      )}
      <div className="mx-auto max-w-6xl px-4 pb-24">
        <div className="mt-8 rounded-xl border bg-white p-4 text-sm text-gray-600">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <span>
              Suivez‑nous :
              <a
                href={settings.instagram}
                className="ml-2 font-medium text-gray-900 underline decoration-gray-300 underline-offset-4 hover:decoration-gray-800"
              >
                Instagram
              </a>
              <span className="px-2 text-gray-300">•</span>
              <a
                href={settings.facebook}
                className="font-medium text-gray-900 underline decoration-gray-300 underline-offset-4 hover:decoration-gray-800"
              >
                Facebook
              </a>
            </span>
            <span className="text-gray-500">
              Wilayas desservies :{" "}
              <span className="font-medium text-gray-800">
                {settings.wilayasDesservies.join(", ")}
              </span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ----------------------------- DASHBOARD (SaaS) ----------------------------- */

function DashboardShell({
  storeName,
  orders,
  products,
  setProducts,
  settings,
  setSettings,
}) {
  const [tab, setTab] = useState("overview");
  return (
    <div className="min-h-[60vh] bg-gray-50">
      <div className="border-b bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
          <div className="flex items-center gap-2">
            <div className="h-9 w-9 rounded-xl bg-gradient-to-tr from-indigo-500 via-sky-500 to-emerald-400" />
            <div>
              <div className="text-xs font-medium text-gray-500">Operette</div>
              <div className="text-sm font-semibold text-gray-900">{storeName}</div>
            </div>
          </div>
          <div className="flex items-center gap-1 rounded-full bg-gray-100 px-1 py-1">
            {[
              { key: "overview", label: "Vue d’ensemble" },
              { key: "orders", label: "Commandes" },
              { key: "products", label: "Produits" },
              { key: "customers", label: "Clients" },
              { key: "settings", label: "Paramètres" },
            ].map((t) => (
              <button
                key={t.key}
                onClick={() => setTab(t.key)}
                className={`rounded-full px-3 py-1.5 text-xs font-medium transition ${
                  tab === t.key ? "bg-white text-gray-900 shadow" : "text-gray-600 hover:bg-white"
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-3">
            <div className="text-right">
              <div className="text-xs text-gray-500">Utilisateur</div>
              <div className="text-sm font-medium text-gray-900">Admin</div>
            </div>
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-900 text-xs font-semibold text-white">
              BL
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-6">
        {tab === "overview" && (
          <OverviewPage orders={orders} products={products} />
        )}
        {tab === "orders" && <OrdersPage orders={orders} products={products} />}
        {tab === "products" && (
          <ProductsPage
            products={products}
            setProducts={setProducts}
          />
        )}
        {tab === "customers" && (
          <CustomersPage orders={orders} products={products} />
        )}
        {tab === "settings" && (
          <SettingsPage settings={settings} setSettings={setSettings} />
        )}
      </div>
    </div>
  );
}

/* ------------------------------ Overview / Stats ----------------------------- */

function calcOrderTotal(order, productsById) {
  // Si le prix au moment de la commande est fourni on l’utilise, sinon prix actuel
  return order.items.reduce((sum, it) => {
    const price = it.price ?? productsById[it.productId]?.price ?? 0;
    return sum + price * (it.qty ?? 1);
  }, 0);
}

function OverviewPage({ orders, products }) {
  const productsById = useMemo(() => {
    const map = {};
    for (const p of products) map[p.id] = p;
    return map;
  }, [products]);

  const todayYMD = toYMD(new Date());
  const totalOrders = orders.length;
  const ordersToday = orders.filter((o) => toYMD(o.date) === todayYMD).length;
  const delivered = orders.filter((o) => o.status === "Livré").length;
  const canceled = orders.filter((o) => o.status === "Annulé").length;
  const revenue = orders
    .filter((o) => o.status === "Livré")
    .reduce((sum, o) => sum + calcOrderTotal(o, productsById), 0);

  // Bar chart simple: revenus par mois (12 derniers mois)
  const months = (() => {
    const arr = [];
    const base = new Date();
    for (let i = 11; i >= 0; i--) {
      const d = new Date(base.getFullYear(), base.getMonth() - i, 1);
      arr.push({ key: `${d.getFullYear()}-${d.getMonth() + 1}`, label: d.toLocaleDateString("fr-FR", { month: "short" }) });
    }
    return arr;
  })();

  const monthlyTotal = months.map((m) => {
    const [y, mon] = m.key.split("-").map(Number);
    const sum = orders
      .filter((o) => {
        const d = new Date(o.date);
        return d.getFullYear() === y && d.getMonth() + 1 === mon && o.status === "Livré";
      })
      .reduce((acc, o) => acc + calcOrderTotal(o, productsById), 0);
    return sum;
  });

  const maxVal = Math.max(1, ...monthlyTotal);

  // Meilleurs produits
  const productCount = {};
  orders.forEach((o) => {
    o.items.forEach((it) => {
      productCount[it.productId] = (productCount[it.productId] || 0) + (it.qty || 1);
    });
  });
  const topProducts = Object.entries(productCount)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([pid, count]) => ({ product: productsById[pid], count }));

  return (
    <div className="grid grid-cols-1 gap-6">
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
        <StatCard label="Total commandes" value={totalOrders} />
        <StatCard label="Commandes aujourd’hui" value={ordersToday} />
        <StatCard label="Livrées" value={delivered} />
        <StatCard label="Annulées" value={canceled} />
        <StatCard label="Revenu total" value={formatDA(revenue)} />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="rounded-2xl border bg-white p-5 lg:col-span-2">
          <div className="mb-4 flex items-baseline justify-between">
            <h3 className="text-base font-semibold text-gray-900">Revenu par mois</h3>
            <span className="text-xs text-gray-500">12 derniers mois</span>
          </div>
          {/* Bar chart simple (sans librairie) */}
          <div className="flex h-48 items-end gap-2">
            {monthlyTotal.map((v, i) => {
              const h = Math.round((v / maxVal) * 100);
              return (
                <div key={i} className="flex w-full flex-col items-center gap-1">
                  <div className="w-full rounded-t-md bg-gray-900" style={{ height: `${Math.max(4, h)}%` }} />
                  <div className="text-[11px] text-gray-600">{months[i].label}</div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="rounded-2xl border bg-white p-5">
          <h3 className="mb-3 text-base font-semibold text-gray-900">Meilleurs produits</h3>
          <ul className="space-y-3">
            {topProducts.map(({ product, count }) => (
              <li key={product?.id || Math.random()} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img src={product?.images?.[0]} alt="" className="h-10 w-10 rounded-md object-cover" />
                  <div>
                    <div className="text-sm font-medium text-gray-900">{product?.name || "Produit supprimé"}</div>
                    <div className="text-xs text-gray-500">{product?.category}</div>
                  </div>
                </div>
                <div className="text-sm font-semibold text-gray-900">{count} cmd</div>
              </li>
            ))}
            {topProducts.length === 0 && (
              <li className="text-sm text-gray-600">Aucune donnée disponible.</li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}

function StatCard({ label, value }) {
  return (
    <div className="rounded-2xl border bg-white p-4">
      <div className="text-xs text-gray-500">{label}</div>
      <div className="mt-1 text-xl font-semibold text-gray-900">{value}</div>
    </div>
  );
}

/* -------------------------------- Orders page -------------------------------- */

function OrdersPage({ orders, products }) {
  const [statusFilter, setStatusFilter] = useState("");
  const [wilayaFilter, setWilayaFilter] = useState("");
  const [selected, setSelected] = useState(null);

  const productsById = useMemo(() => {
    const map = {};
    for (const p of products) map[p.id] = p;
    return map;
  }, [products]);

  const filtered = orders
    .filter((o) => (statusFilter ? o.status === statusFilter : true))
    .filter((o) => (wilayaFilter ? o.wilaya === wilayaFilter : true))
    .sort((a, b) => new Date(b.date) - new Date(a.date));

  const statuses = ["Nouveau", "En attente d’appel", "En livraison", "Livré", "Annulé"];

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-end gap-2">
        <Select
          label="Filtrer par statut"
          value={statusFilter}
          onChange={setStatusFilter}
          options={[{ label: "Tous", value: "" }, ...statuses.map((s) => ({ label: s, value: s }))]}
        />
        <Select
          label="Filtrer par wilaya"
          value={wilayaFilter}
          onChange={setWilayaFilter}
          options={[{ label: "Toutes", value: "" }, ...WILAYAS.map((w) => ({ label: w.name, value: w.name }))]}
        />
      </div>

      <div className="overflow-hidden rounded-2xl border bg-white">
        <table className="min-w-full divide-y divide-gray-200 text-sm">
          <thead className="bg-gray-50">
            <tr>
              {["ID", "Date", "Client", "Téléphone", "Wilaya", "Produit(s)", "Montant total", "Statut"].map((h) => (
                <th key={h} className="px-3 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 bg-white">
            {filtered.map((o) => {
              const total = calcOrderTotal(o, productsById);
              return (
                <tr
                  key={o.id}
                  className="hover:bg-gray-50"
                  onClick={() => setSelected(o)}
                >
                  <td className="whitespace-nowrap px-3 py-3 font-mono text-[12px] text-gray-700">{o.id}</td>
                  <td className="whitespace-nowrap px-3 py-3 text-gray-700">{formatDateTime(o.date)}</td>
                  <td className="whitespace-nowrap px-3 py-3 text-gray-900">{o.customerName}</td>
                  <td className="whitespace-nowrap px-3 py-3 text-gray-700">{o.phone}</td>
                  <td className="whitespace-nowrap px-3 py-3 text-gray-700">{o.wilaya}</td>
                  <td className="px-3 py-3 text-gray-700">
                    <div className="flex flex-wrap gap-1">
                      {o.items.map((it, i) => (
                        <Badge key={i} className="bg-gray-100 text-gray-700">
                          {productsById[it.productId]?.name || "Produit"} × {it.qty}
                        </Badge>
                      ))}
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-3 py-3 font-semibold text-gray-900">
                    {formatDA(total)}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    <Badge className={statusStyles[o.status] || "bg-gray-100 text-gray-700"}>
                      {o.status}
                    </Badge>
                  </td>
                </tr>
              );
            })}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={8} className="px-3 py-6 text-center text-sm text-gray-600">
                  Aucune commande trouvée.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {selected && (
        <Modal onClose={() => setSelected(null)}>
          <h3 className="mb-2 text-lg font-semibold text-gray-900">Détails de la commande</h3>
          <div className="grid grid-cols-1 gap-3 text-sm">
            <div className="rounded-lg border bg-gray-50 p-3">
              <div className="text-gray-500">ID</div>
              <div className="font-medium text-gray-900">{selected.id}</div>
            </div>
            <div className="rounded-lg border bg-gray-50 p-3">
              <div className="text-gray-500">Date</div>
              <div className="font-medium text-gray-900">{formatDateTime(selected.date)}</div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-lg border bg-gray-50 p-3">
                <div className="text-gray-500">Client</div>
                <div className="font-medium text-gray-900">{selected.customerName}</div>
              </div>
              <div className="rounded-lg border bg-gray-50 p-3">
                <div className="text-gray-500">Téléphone</div>
                <div className="font-medium text-gray-900">{selected.phone}</div>
              </div>
            </div>
            <div className="rounded-lg border bg-gray-50 p-3">
              <div className="text-gray-500">Adresse</div>
              <div className="font-medium text-gray-900">
                {selected.address}, {selected.wilaya}
              </div>
            </div>
            <div className="rounded-lg border bg-gray-50 p-3">
              <div className="mb-1 text-gray-500">Produits</div>
              <ul className="list-disc pl-5">
                {selected.items.map((it, i) => (
                  <li key={i} className="text-gray-800">
                    {products.find((p) => p.id === it.productId)?.name || "Produit"} × {it.qty} —{" "}
                    {formatDA((it.price ?? 0) * (it.qty ?? 1))}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-lg border bg-gray-50 p-3">
              <div className="text-gray-500">Statut</div>
              <div>
                <Badge className={statusStyles[selected.status] || ""}>{selected.status}</Badge>
              </div>
            </div>
            {selected.note ? (
              <div className="rounded-lg border bg-gray-50 p-3">
                <div className="text-gray-500">Remarque</div>
                <div className="text-gray-900">{selected.note}</div>
              </div>
            ) : null}
            <div className="mt-1 text-right text-sm font-semibold text-gray-900">
              Total: {formatDA(calcOrderTotal(selected, productsById))}
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}

/* -------------------------------- Products page ------------------------------- */

function ProductsPage({ products, setProducts }) {
  const [openAdd, setOpenAdd] = useState(false);
  const [edit, setEdit] = useState(null);

  const remove = (id) => {
    if (!window.confirm("Supprimer ce produit ?")) return;
    setProducts((list) => list.filter((p) => p.id !== id));
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h3 className="text-base font-semibold text-gray-900">Produits ({products.length})</h3>
        <Button onClick={() => setOpenAdd(true)}>Ajouter un produit</Button>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        {products.map((p) => (
          <div key={p.id} className="flex overflow-hidden rounded-2xl border bg-white shadow-sm">
            <img src={p.images[0]} alt="" className="h-32 w-32 object-cover" />
            <div className="flex flex-1 flex-col p-4">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <div className="text-sm font-semibold text-gray-900">{p.name}</div>
                  <div className="text-xs text-gray-500">{p.category}</div>
                </div>
                <Badge className={p.status === "Actif" ? "bg-emerald-100 text-emerald-700" : "bg-gray-100 text-gray-700"}>
                  {p.status}
                </Badge>
              </div>
              <p className="mt-1 line-clamp-2 text-sm text-gray-600">{p.description}</p>
              <div className="mt-auto flex items-center justify-between">
                <div className="text-sm font-semibold text-gray-900">{formatDA(p.price)}</div>
                <div className="flex gap-2">
                  <Button variant="light" onClick={() => setEdit(p)}>
                    Modifier
                  </Button>
                  <Button variant="secondary" onClick={() => remove(p.id)}>
                    Supprimer
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}
        {products.length === 0 && (
          <div className="rounded-2xl border bg-white p-6 text-center text-sm text-gray-600">
            Aucun produit. Ajoutez votre premier produit.
          </div>
        )}
      </div>

      {openAdd && (
        <ProductFormModal
          onClose={() => setOpenAdd(false)}
          onSubmit={(payload) => {
            setProducts((list) => [{ ...payload, id: uid("p-"), createdAt: new Date().toISOString() }, ...list]);
            setOpenAdd(false);
          }}
        />
      )}

      {edit && (
        <ProductFormModal
          initial={edit}
          onClose={() => setEdit(null)}
          onSubmit={(payload) => {
            setProducts((list) => list.map((p) => (p.id === edit.id ? { ...p, ...payload } : p)));
            setEdit(null);
          }}
        />
      )}
    </div>
  );
}

function ProductFormModal({ initial, onClose, onSubmit }) {
  const [form, setForm] = useState({
    name: initial?.name || "",
    price: initial?.price || 0,
    description: initial?.description || "",
    category: initial?.category || "",
    images: (initial?.images || []).join("\n"),
    videoUrl: initial?.videoUrl || "",
    status: initial?.status || "Actif",
    badge: initial?.badge || "",
  });

  const submit = (e) => {
    e.preventDefault();
    const images = form.images
      .split(/[\n,]+/g)
      .map((s) => s.trim())
      .filter(Boolean);
    onSubmit({
      ...initial,
      name: form.name.trim(),
      price: Number(form.price) || 0,
      description: form.description.trim(),
      category: form.category.trim() || "Autre",
      images: images.length ? images : ["https://via.placeholder.com/800x600.png?text=Image"],
      videoUrl: form.videoUrl.trim(),
      status: form.status,
      badge: form.badge,
    });
  };

  return (
    <Modal onClose={onClose}>
      <h3 className="mb-3 text-lg font-semibold text-gray-900">
        {initial ? "Modifier le produit" : "Ajouter un produit"}
      </h3>
      <form onSubmit={submit} className="grid grid-cols-1 gap-3">
        <Field
          label="Nom du produit"
          value={form.name}
          onChange={(v) => setForm((s) => ({ ...s, name: v }))}
        />
        <Field
          label="Prix (DA)"
          type="number"
          value={form.price}
          onChange={(v) => setForm((s) => ({ ...s, price: v }))}
        />
        <Field
          label="Catégorie"
          value={form.category}
          onChange={(v) => setForm((s) => ({ ...s, category: v }))}
          placeholder="Ex: Tech / Maison / Mode"
        />
        <TextArea
          label="Description"
          value={form.description}
          onChange={(v) => setForm((s) => ({ ...s, description: v }))}
          placeholder="Texte marketing…"
        />
        <TextArea
          label="URLs d’images (une par ligne ou séparées par des virgules)"
          value={form.images}
          onChange={(v) => setForm((s) => ({ ...s, images: v }))}
        />
        <Field
          label="URL vidéo (optionnel)"
          value={form.videoUrl}
          onChange={(v) => setForm((s) => ({ ...s, videoUrl: v }))}
          placeholder="https://…"
        />
        <div className="grid grid-cols-2 gap-3">
          <Select
            label="Statut"
            value={form.status}
            onChange={(v) => setForm((s) => ({ ...s, status: v }))}
            options={[
              { label: "Actif", value: "Actif" },
              { label: "Masqué", value: "Masqué" },
            ]}
          />
          <Select
            label="Badge"
            value={form.badge}
            onChange={(v) => setForm((s) => ({ ...s, badge: v }))}
            options={[
              { label: "Aucun", value: "" },
              { label: "Nouveau", value: "Nouveau" },
              { label: "Meilleure vente", value: "Meilleure vente" },
              { label: "Promotion", value: "Promotion" },
            ]}
          />
        </div>
        <div className="mt-2 flex items-center justify-end gap-2">
          <Button variant="light" onClick={onClose}>
            Annuler
          </Button>
          <Button type="submit">{initial ? "Enregistrer" : "Ajouter"}</Button>
        </div>
      </form>
    </Modal>
  );
}

/* ------------------------------- Customers page ------------------------------ */

function CustomersPage({ orders, products }) {
  const productsById = useMemo(() => {
    const map = {};
    for (const p of products) map[p.id] = p;
    return map;
  }, [products]);

  const customers = useMemo(() => {
    const map = {};
    for (const o of orders) {
      const key = o.phone || o.customerName;
      if (!map[key]) {
        map[key] = {
          name: o.customerName,
          phone: o.phone,
          orders: 0,
          total: 0,
          lastDate: o.date,
        };
      }
      map[key].orders += 1;
      map[key].total += calcOrderTotal(o, productsById);
      if (new Date(o.date) > new Date(map[key].lastDate)) map[key].lastDate = o.date;
    }
    return Object.values(map).sort((a, b) => b.total - a.total);
  }, [orders, productsById]);

  return (
    <div className="space-y-4">
      <h3 className="text-base font-semibold text-gray-900">Clients ({customers.length})</h3>
      <div className="overflow-hidden rounded-2xl border bg-white">
        <table className="min-w-full divide-y divide-gray-200 text-sm">
          <thead className="bg-gray-50">
            <tr>
              {["Nom du client", "Téléphone", "Nombre de commandes", "Dernière commande", "Montant total estimé", "Tag"].map(
                (h) => (
                  <th
                    key={h}
                    className="px-3 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500"
                  >
                    {h}
                  </th>
                )
              )}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 bg-white">
            {customers.map((c) => (
              <tr key={c.phone} className="hover:bg-gray-50">
                <td className="px-3 py-3 text-gray-900">{c.name}</td>
                <td className="px-3 py-3 text-gray-700">{c.phone}</td>
                <td className="px-3 py-3 text-gray-700">{c.orders}</td>
                <td className="px-3 py-3 text-gray-700">{formatDateTime(c.lastDate)}</td>
                <td className="px-3 py-3 font-semibold text-gray-900">{formatDA(c.total)}</td>
                <td className="px-3 py-3">
                  <Badge className={c.orders >= 2 ? "bg-emerald-100 text-emerald-700" : "bg-indigo-100 text-indigo-700"}>
                    {c.orders >= 2 ? "Récurrent" : "Nouveau"}
                  </Badge>
                </td>
              </tr>
            ))}
            {customers.length === 0 && (
              <tr>
                <td colSpan={6} className="px-3 py-6 text-center text-sm text-gray-600">
                  Aucun client pour le moment.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* ------------------------------- Settings page ------------------------------- */

function SettingsPage({ settings, setSettings }) {
  const [form, setForm] = useState(settings);
  const [search, setSearch] = useState("");

  const toggleWilaya = (name) => {
    setForm((s) => {
      const exists = s.wilayasDesservies.includes(name);
      return {
        ...s,
        wilayasDesservies: exists
          ? s.wilayasDesservies.filter((w) => w !== name)
          : [...s.wilayasDesservies, name],
      };
    });
  };

  const save = (e) => {
    e.preventDefault();
    setSettings(form);
  };

  const filteredWilayas = WILAYAS.filter((w) =>
    (w.name || "").toLowerCase().includes(search.toLowerCase())
  );

  return (
    <form onSubmit={save} className="grid grid-cols-1 gap-6">
      <div className="rounded-2xl border bg-white p-5">
        <h3 className="mb-4 text-base font-semibold text-gray-900">Informations de la boutique</h3>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <Field
            label="Nom de la boutique"
            value={form.storeName}
            onChange={(v) => setForm((s) => ({ ...s, storeName: v }))}
          />
          <Field
            label="Numéro de téléphone"
            value={form.phone}
            onChange={(v) => setForm((s) => ({ ...s, phone: v }))}
          />
          <Field
            label="Slogan"
            value={form.slogan}
            onChange={(v) => setForm((s) => ({ ...s, slogan: v }))}
          />
          <Field
            label="Lien Instagram"
            value={form.instagram}
            onChange={(v) => setForm((s) => ({ ...s, instagram: v }))}
          />
          <Field
            label="Lien Facebook"
            value={form.facebook}
            onChange={(v) => setForm((s) => ({ ...s, facebook: v }))}
          />
        </div>
      </div>

      <div className="rounded-2xl border bg-white p-5">
        <h3 className="mb-2 text-base font-semibold text-gray-900">Wilayas desservies</h3>
        <div className="mb-3">
          <Field
            label="Recherche"
            value={search}
            onChange={setSearch}
            placeholder="Tapez une wilaya…"
          />
        </div>
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {filteredWilayas.map((w) => {
            const checked = form.wilayasDesservies.includes(w.name);
            return (
              <label
                key={w.code}
                className={`flex cursor-pointer items-center justify-between rounded-lg border px-3 py-2 text-sm ${
                  checked ? "border-gray-900 bg-gray-900/5" : "border-gray-200 bg-white hover:bg-gray-50"
                }`}
              >
                <span>
                  <span className="font-medium text-gray-900">{w.code}</span>{" "}
                  <span className="text-gray-700">{w.name}</span>
                </span>
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={() => toggleWilaya(w.name)}
                  className="h-4 w-4 rounded border-gray-300 text-gray-900 focus:ring-gray-900"
                />
              </label>
            );
          })}
        </div>
      </div>

      <div className="rounded-2xl border bg-white p-5">
        <h3 className="mb-2 text-base font-semibold text-gray-900">Message global</h3>
        <TextArea
          label="Message affiché sur les pages produits"
          value={form.noteProduit}
          onChange={(v) => setForm((s) => ({ ...s, noteProduit: v }))}
          placeholder="Ex: Livraison en 24–72h selon la wilaya."
        />
      </div>

      <div className="flex justify-end">
        <Button type="submit">Enregistrer les paramètres</Button>
      </div>
    </form>
  );
}

/* ------------------------------- Chatbot Widget ------------------------------ */

function ChatbotWidget({ settings }) {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: "bot", text: "Bonjour 👋 Je suis l’Assistant Operette. Comment puis‑je vous aider ?" },
  ]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);

  const canned = [
    "Pouvez‑vous préciser votre question ?",
    "Nous livrons en 24–72h selon la wilaya.",
    "Le paiement à la livraison est disponible.",
    "Vous pouvez passer commande via le bouton « Commander maintenant ».",
    "Notre support répond de 9h à 18h.",
  ];

  const reply = (userMsg) => {
    const m = userMsg.toLowerCase();
    let text = "";
    if (m.includes("prix") || m.includes("coût")) {
      text = "Le prix est indiqué sur la page du produit, taxes incluses.";
    } else if (m.includes("livraison") || m.includes("wilaya")) {
      const list = settings.wilayasDesservies.slice(0, 5).join(", ");
      text = `Nous livrons dans plusieurs wilayas (ex: ${list}). Délai moyen 24–72h.`;
    } else if (m.includes("commande") || m.includes("acheter")) {
      text = "Cliquez sur « Commander maintenant » pour remplir vos informations.";
    } else if (m.includes("retour") || m.includes("remb")) {
      text = "Retours sous 7 jours si le produit est intact. Conditions sur demande.";
    } else if (m.includes("paiement") || m.includes("espèces")) {
      text = "Paiement à la livraison en espèces, simple et sûr.";
    } else if (m.includes("suivi") || m.includes("track")) {
      text = "Le suivi est envoyé par SMS après confirmation de votre commande.";
    } else {
      text = canned[Math.floor(Math.random() * canned.length)];
    }
    setMessages((prev) => [...prev, { role: "bot", text }]);
    setTyping(false);
  };

  const send = () => {
    const value = input.trim();
    if (!value) return;
    setMessages((prev) => [...prev, { role: "user", text: value }]);
    setInput("");
    setTyping(true);
    setTimeout(() => reply(value), 350);
  };

  useEffect(() => {
    const el = document.getElementById("chat-scroll");
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages, typing, open]);

  return (
    <>
      <button
        onClick={() => setOpen((s) => !s)}
        className="fixed bottom-5 right-5 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-gray-900 text-white shadow-lg transition hover:scale-105"
        aria-label="Ouvrir le chat"
      >
        💬
      </button>

      {open && (
        <div className="fixed bottom-20 right-5 z-50 w-[min(100vw-2rem,380px)] overflow-hidden rounded-2xl border bg-white shadow-2xl">
          <div className="flex items-center justify-between border-b bg-gray-50 px-4 py-3">
            <div>
              <div className="text-xs text-gray-500">Assistant</div>
              <div className="text-sm font-semibold text-gray-900">Assistant Operette</div>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="rounded-md p-2 text-gray-500 hover:bg-gray-100"
              aria-label="Fermer"
            >
              ✕
            </button>
          </div>
          <div id="chat-scroll" className="max-h-80 overflow-y-auto px-4 py-3">
            {messages.map((m, i) => (
              <div key={i} className={`mb-2 flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-[80%] rounded-2xl px-3 py-2 text-sm ${
                    m.role === "user" ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"
                  }`}
                >
                  {m.text}
                </div>
              </div>
            ))}
            {typing && (
              <div className="mb-2 flex justify-start">
                <div className="rounded-2xl bg-gray-100 px-3 py-2 text-sm text-gray-900">
                  <span className="inline-flex items-center gap-1">
                    <span className="h-1 w-1 animate-bounce rounded-full bg-gray-700 [animation-delay:-0.2s]" />
                    <span className="h-1 w-1 animate-bounce rounded-full bg-gray-700" />
                    <span className="h-1 w-1 animate-bounce rounded-full bg-gray-700 [animation-delay:0.2s]" />
                  </span>
                </div>
              </div>
            )}
          </div>
          <div className="flex items-center gap-2 border-t p-3">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && send()}
              placeholder="Écrivez votre message…"
              className="flex-1 rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900"
            />
            <Button onClick={send}>Envoyer</Button>
          </div>
        </div>
      )}
    </>
  );
}

/* --------------------------------- Composant App ----------------------------- */

export default function App() {
  const [currentView, setCurrentView] = useState("boutique");
  const [products, setProducts] = useState(initialProducts);
  const [orders, setOrders] = useState(initialOrders);
  const [settings, setSettings] = useState(defaultSettings);

  // Quand le nom de la boutique change dans Paramètres, on garde l’entête cohérente
  const storeName = settings.storeName || "Boutique Lumière";

  // Lorsque l’utilisateur crée une commande côté Boutique
  const handleCreateOrder = (order) => {
    setOrders((list) => [order, ...list]); // Ajoute en tête
    setCurrentView("dashboard"); // Optionnel: basculer vers l’admin pour voir la commande
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <TopLevelNav currentView={currentView} setCurrentView={setCurrentView} storeName={storeName} />

      {currentView === "boutique" ? (
        <Storefront
          products={products}
          settings={settings}
          onCreateOrder={handleCreateOrder}
        />
      ) : (
        <DashboardShell
          storeName={storeName}
          orders={orders}
          products={products}
          setProducts={setProducts}
          settings={settings}
          setSettings={setSettings}
        />
      )}

      {/* Chatbot flottant présent partout (front-end only) */}
      <ChatbotWidget settings={settings} />

      {/* Pied de page très léger */}
      <footer className="border-t bg-white">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-4 py-6 text-center sm:flex-row">
          <div className="text-sm text-gray-600">
            © {new Date().getFullYear()} Operette — Démo SaaS. Tous droits réservés.
          </div>
          <div className="text-sm text-gray-500">
            {storeName} • <span className="text-gray-700">{settings.phone}</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
