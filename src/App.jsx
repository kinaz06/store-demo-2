import React, { useState, useMemo } from "react";

/* ---------- Données de base ---------- */

const ALGERIAN_WILAYAS = [
  "Adrar",
  "Chlef",
  "Laghouat",
  "Oum El Bouaghi",
  "Batna",
  "Béjaïa",
  "Biskra",
  "Béchar",
  "Blida",
  "Bouira",
  "Tamanrasset",
  "Tébessa",
  "Tlemcen",
  "Tiaret",
  "Tizi Ouzou",
  "Alger",
  "Djelfa",
  "Jijel",
  "Sétif",
  "Saïda",
  "Skikda",
  "Sidi Bel Abbès",
  "Annaba",
  "Guelma",
  "Constantine",
  "Médéa",
  "Mostaganem",
  "M'Sila",
  "Mascara",
  "Ouargla",
  "Oran",
  "El Bayadh",
  "Illizi",
  "Bordj Bou Arréridj",
  "Boumerdès",
  "El Tarf",
  "Tindouf",
  "Tissemsilt",
  "El Oued",
  "Khenchela",
  "Souk Ahras",
  "Tipaza",
  "Mila",
  "Aïn Defla",
  "Naâma",
  "Aïn Témouchent",
  "Ghardaïa",
  "Relizane",
  "Timimoun",
  "Bordj Badji Mokhtar",
  "Ouled Djellal",
  "Béni Abbès",
  "In Salah",
  "In Guezzam",
  "Touggourt",
  "Djanet",
  "El M'Ghair",
  "El Meniaa",
];

const INITIAL_SETTINGS = {
  storeName: "Boutique Lumière",
  slogan: "Produits sélectionnés avec soin pour votre quotidien.",
  phone: "+213 555 12 34 56",
  instagram: "https://instagram.com/boutique.lumiere",
  facebook: "https://facebook.com/boutique.lumiere.dz",
  wilayasDesservies: ["Alger", "Blida", "Tipaza", "Boumerdès"],
  globalMessage:
    "Livraison rapide et paiement à la livraison dans les principales wilayas.",
};

const INITIAL_PRODUCTS = [
  {
    id: "p1",
    name: "Lampe de bureau LED minimaliste",
    description:
      "Une lampe élégante et économique pour illuminer votre espace de travail ou votre chambre.",
    price: 3200,
    category: "Maison & bureau",
    badge: "Meilleure vente",
    status: "Actif",
    images: [
      "https://images.pexels.com/photos/5741264/pexels-photo-5741264.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/7063800/pexels-photo-7063800.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/4492043/pexels-photo-4492043.jpeg?auto=compress&cs=tinysrgb&w=800",
    ],
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    advantages: [
      "Consommation d’énergie réduite",
      "Lumière douce qui préserve les yeux",
      "Design minimaliste qui s’adapte à tous les bureaux",
    ],
    features: [
      "3 niveaux de luminosité",
      "Port USB pour la recharge",
      "Couleur : blanc mat",
      "Col flexible orientable à 360°",
    ],
    usage: [
      "Idéale pour travailler, lire ou étudier",
      "Brancher sur une prise ou un port USB",
      "Utiliser le bouton tactile pour régler l’intensité",
    ],
  },
  {
    id: "p2",
    name: "Guirlande lumineuse 10m",
    description:
      "Créez une ambiance chaleureuse dans votre salon, votre chambre ou votre terrasse.",
    price: 2500,
    category: "Décoration",
    badge: "Nouveau",
    status: "Actif",
    images: [
      "https://images.pexels.com/photos/1128797/pexels-photo-1128797.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/255379/pexels-photo-255379.jpeg?auto=compress&cs=tinysrgb&w=800",
    ],
    videoUrl: "",
    advantages: [
      "Ambiance cosy instantanée",
      "Installation simple et rapide",
      "Convient pour intérieur et extérieur couvert",
    ],
    features: [
      "Longueur : 10 mètres",
      "Plusieurs modes d’éclairage",
      "Alimentation sur prise 220V",
    ],
    usage: [
      "Parfaite pour les fêtes, mariages et décorations saisonnières",
      "Fixer avec du scotch ou des crochets",
      "Choisir le mode lumineux souhaité",
    ],
  },
  {
    id: "p3",
    name: "Anneau lumineux pour smartphone",
    description:
      "L’outil idéal pour les créateurs de contenu, lives et appels vidéo de haute qualité.",
    price: 4200,
    category: "Créateurs & réseaux sociaux",
    badge: "Promotion",
    status: "Actif",
    images: [
      "https://images.pexels.com/photos/6898859/pexels-photo-6898859.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/6898853/pexels-photo-6898853.jpeg?auto=compress&cs=tinysrgb&w=800",
    ],
    videoUrl: "",
    advantages: [
      "Éclairage uniforme pour le visage",
      "Idéal pour Instagram, TikTok et YouTube",
      "Trépied stable inclus",
    ],
    features: [
      "3 températures de couleur",
      "Support pour smartphone réglable",
      "Contrôle via télécommande filaire",
    ],
    usage: [
      "Placer l’anneau face à vous",
      "Fixer le téléphone au centre",
      "Régler la luminosité selon votre environnement",
    ],
  },
  {
    id: "p4",
    name: "Veilleuse murale pour enfant",
    description:
      "Une veilleuse douce et rassurante pour accompagner le sommeil des petits.",
    price: 1900,
    category: "Enfants",
    badge: "",
    status: "Actif",
    images: [
      "https://images.pexels.com/photos/14443834/pexels-photo-14443834.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/14443836/pexels-photo-14443836.jpeg?auto=compress&cs=tinysrgb&w=800",
    ],
    videoUrl: "",
    advantages: [
      "Rassure l’enfant pendant la nuit",
      "Consommation d’énergie très faible",
      "Design mignon pour la chambre",
    ],
    features: [
      "Lumière LED douce",
      "Se branche directement sur la prise",
      "Couleurs et formes variées",
    ],
    usage: [
      "Brancher la veilleuse dans la prise murale",
      "Laisser allumée toute la nuit sans risque",
      "Nettoyer avec un chiffon sec si besoin",
    ],
  },
  {
    id: "p5",
    name: "Kit néon LED personnalisé",
    description:
      "Votre phrase ou logo en néon LED pour un décor unique à la maison ou au bureau.",
    price: 8900,
    category: "Décoration premium",
    badge: "Best seller",
    status: "Actif",
    images: [
      "https://images.pexels.com/photos/2635596/pexels-photo-2635596.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/3408808/pexels-photo-3408808.jpeg?auto=compress&cs=tinysrgb&w=800",
    ],
    videoUrl: "",
    advantages: [
      "Personnalisation complète du texte",
      "Effet néon moderne et tendance",
      "Durée de vie supérieure au néon classique",
    ],
    features: [
      "Télécommande pour régler l’intensité",
      "Plusieurs couleurs disponibles",
      "Fixation murale simple",
    ],
    usage: [
      "Choisir la phrase ou le mot à afficher",
      "Installer sur un mur propre et sec",
      "Brancher et régler la luminosité",
    ],
  },
];

const INITIAL_ORDERS = [
  {
    id: "CMD-2025-0001",
    date: "2025-12-09T10:32:00Z",
    clientName: "Samir Bensalem",
    phone: "0550123456",
    wilaya: "Alger",
    address: "Bir Mourad Raïs, cité 120 logements",
    quantity: 1,
    productId: "p1",
    productName: "Lampe de bureau LED minimaliste",
    totalAmount: 3200,
    status: "Nouveau",
    remark: "",
  },
  {
    id: "CMD-2025-0002",
    date: "2025-12-08T15:15:00Z",
    clientName: "Nadia Khelifi",
    phone: "0776543210",
    wilaya: "Blida",
    address: "Boufarik, lotissement des pins",
    quantity: 2,
    productId: "p2",
    productName: "Guirlande lumineuse 10m",
    totalAmount: 5000,
    status: "En attente d’appel",
    remark: "Appeler après 18h svp.",
  },
  {
    id: "CMD-2025-0003",
    date: "2025-12-07T09:00:00Z",
    clientName: "Yacine Amrani",
    phone: "0667890123",
    wilaya: "Oran",
    address: "Es Senia, près de la faculté",
    quantity: 1,
    productId: "p3",
    productName: "Anneau lumineux pour smartphone",
    totalAmount: 4200,
    status: "En livraison",
    remark: "",
  },
  {
    id: "CMD-2025-0004",
    date: "2025-12-05T19:40:00Z",
    clientName: "Souad Belkacem",
    phone: "0559988776",
    wilaya: "Tizi Ouzou",
    address: "Larbaâ Nath Irathen, centre-ville",
    quantity: 1,
    productId: "p4",
    productName: "Veilleuse murale pour enfant",
    totalAmount: 1900,
    status: "Livré",
    remark: "",
  },
  {
    id: "CMD-2025-0005",
    date: "2025-11-29T14:20:00Z",
    clientName: "Ahmed Cheriet",
    phone: "0770011223",
    wilaya: "Constantine",
    address: "El Khroub, cité 200 logements",
    quantity: 1,
    productId: "p5",
    productName: "Kit néon LED personnalisé",
    totalAmount: 8900,
    status: "Livré",
    remark: "Texte : \"Relax\" en bleu.",
  },
  {
    id: "CMD-2025-0006",
    date: "2025-11-25T11:05:00Z",
    clientName: "Imène Lounès",
    phone: "0661122334",
    wilaya: "Boumerdès",
    address: "Boumerdès ville, près du front de mer",
    quantity: 3,
    productId: "p2",
    productName: "Guirlande lumineuse 10m",
    totalAmount: 7500,
    status: "Annulé",
    remark: "Client injoignable.",
  },
  {
    id: "CMD-2025-0007",
    date: "2025-11-20T16:50:00Z",
    clientName: "Samir Bensalem",
    phone: "0550123456",
    wilaya: "Alger",
    address: "Bir Mourad Raïs, cité 120 logements",
    quantity: 1,
    productId: "p3",
    productName: "Anneau lumineux pour smartphone",
    totalAmount: 4200,
    status: "Livré",
    remark: "Pour tournage de vidéos.",
  },
];

let orderCounter = INITIAL_ORDERS.length;

/* ---------- Fonctions utilitaires ---------- */

function formatCurrency(value) {
  try {
    return new Intl.NumberFormat("fr-FR", {
      style: "currency",
      currency: "DZD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  } catch {
    return `${value.toLocaleString("fr-FR")} DA`;
  }
}

function formatShortDate(dateString) {
  if (!dateString) return "";
  const d = new Date(dateString);
  if (Number.isNaN(d.getTime())) return "";
  return d.toLocaleDateString("fr-FR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function formatDateTime(dateString) {
  if (!dateString) return "";
  const d = new Date(dateString);
  if (Number.isNaN(d.getTime())) return "";
  return d.toLocaleString("fr-FR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function computeCustomersFromOrders(orders) {
  const map = new Map();
  orders.forEach((order) => {
    const key = order.phone || order.clientName;
    if (!key) return;
    if (!map.has(key)) {
      map.set(key, {
        name: order.clientName,
        phone: order.phone,
        orderCount: 0,
        lastOrderDate: null,
        totalAmount: 0,
      });
    }
    const c = map.get(key);
    c.orderCount += 1;
    c.totalAmount += order.totalAmount || 0;
    if (!c.lastOrderDate || new Date(order.date) > new Date(c.lastOrderDate)) {
      c.lastOrderDate = order.date;
    }
  });
  return Array.from(map.values()).sort(
    (a, b) => new Date(b.lastOrderDate) - new Date(a.lastOrderDate)
  );
}

function getMonthlyStats(orders) {
  const map = new Map();
  orders.forEach((order) => {
    const d = new Date(order.date);
    if (Number.isNaN(d.getTime())) return;
    const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(
      2,
      "0"
    )}`;
    const label = d.toLocaleString("fr-FR", { month: "short" });
    if (!map.has(key)) {
      map.set(key, { key, label, revenue: 0, orders: 0 });
    }
    const obj = map.get(key);
    obj.revenue += order.totalAmount || 0;
    obj.orders += 1;
  });
  const arr = Array.from(map.values()).sort((a, b) =>
    a.key.localeCompare(b.key)
  );
  return arr.slice(-6);
}

function getTopProductsFromOrders(orders, products) {
  const map = new Map();
  orders.forEach((order) => {
    const id = order.productId || order.productName;
    if (!id) return;
    if (!map.has(id)) {
      const product = products.find((p) => p.id === id);
      map.set(id, {
        productId: id,
        name: product?.name || order.productName || "Produit",
        orders: 0,
        revenue: 0,
      });
    }
    const obj = map.get(id);
    obj.orders += order.quantity || 1;
    obj.revenue += order.totalAmount || 0;
  });
  return Array.from(map.values()).sort((a, b) => b.orders - a.orders);
}

function generateOrderId() {
  orderCounter += 1;
  return `CMD-2025-${String(orderCounter).padStart(4, "0")}`;
}

/* ---------- Composant principal ---------- */

export default function App() {
  const [currentView, setCurrentView] = useState("boutique"); // 'boutique' | 'dashboard'
  const [dashboardTab, setDashboardTab] = useState("overview"); // 'overview' | 'orders' | 'products' | 'customers' | 'settings'
  const [products, setProducts] = useState(INITIAL_PRODUCTS);
  const [orders, setOrders] = useState(INITIAL_ORDERS);
  const [settings, setSettings] = useState(INITIAL_SETTINGS);
  const [selectedProductId, setSelectedProductId] = useState(null);

  const customers = useMemo(
    () => computeCustomersFromOrders(orders),
    [orders]
  );

  const selectedProduct = products.find((p) => p.id === selectedProductId);

  const handleCreateOrder = (payload) => {
    const product = products.find((p) => p.id === payload.productId);
    if (!product) return;
    const id = generateOrderId();
    const date = new Date().toISOString();
    const quantity = payload.quantity || 1;
    const totalAmount = product.price * quantity;
    const newOrder = {
      id,
      date,
      clientName: payload.fullName,
      phone: payload.phone,
      wilaya: payload.wilaya,
      address: payload.address,
      quantity,
      productId: product.id,
      productName: product.name,
      totalAmount,
      status: "Nouveau",
      remark: payload.remark || "",
    };
    setOrders((prev) => [newOrder, ...prev]);
  };

  const activeProductsForStorefront = products.filter(
    (p) => p.status === "Actif"
  );

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      {/* Barre de navigation principale */}
      <header className="border-b bg-white/80 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-sky-500 text-sm font-semibold text-white shadow">
              Op
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-semibold text-slate-900">
                Operette
              </span>
              <span className="text-xs text-slate-500">
                Plateforme social-commerce
              </span>
            </div>
          </div>
          <nav className="flex items-center gap-2 rounded-full bg-slate-100 p-1 text-xs sm:text-sm">
            <button
              type="button"
              onClick={() => setCurrentView("boutique")}
              className={`rounded-full px-3 py-1.5 font-medium transition ${
                currentView === "boutique"
                  ? "bg-white text-slate-900 shadow-sm"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              Boutique
            </button>
            <button
              type="button"
              onClick={() => setCurrentView("dashboard")}
              className={`rounded-full px-3 py-1.5 font-medium transition ${
                currentView === "dashboard"
                  ? "bg-white text-slate-900 shadow-sm"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              Tableau de bord
            </button>
          </nav>
        </div>
      </header>

      {/* Contenu principal */}
      <main className="mx-auto max-w-6xl px-4 pb-28 pt-6 sm:pb-24 sm:pt-8">
        {currentView === "boutique" ? (
          <Storefront
            products={activeProductsForStorefront}
            rawProducts={products}
            settings={settings}
            selectedProduct={selectedProduct}
            onSelectProduct={setSelectedProductId}
            onBackToGrid={() => setSelectedProductId(null)}
            onCreateOrder={handleCreateOrder}
          />
        ) : (
          <DashboardShell
            products={products}
            setProducts={setProducts}
            orders={orders}
            setOrders={setOrders}
            customers={customers}
            settings={settings}
            setSettings={setSettings}
            activeTab={dashboardTab}
            onTabChange={setDashboardTab}
          />
        )}
      </main>

      {/* Chatbot flottant */}
      <ChatbotWidget storeName={settings.storeName} />
    </div>
  );
}

/* ---------- STOREFRONT ---------- */

function Storefront({
  products,
  rawProducts,
  settings,
  selectedProduct,
  onSelectProduct,
  onBackToGrid,
  onCreateOrder,
}) {
  return (
    <div className="space-y-6 sm:space-y-8">
      <StorefrontHeader settings={settings} />
      {settings.globalMessage && (
        <GlobalMessageBanner message={settings.globalMessage} />
      )}
      {!selectedProduct ? (
        <ProductGrid products={products} onSelectProduct={onSelectProduct} />
      ) : (
        <ProductDetail
          product={
            rawProducts.find((p) => p.id === selectedProduct.id) ||
            selectedProduct
          }
          settings={settings}
          onBack={onBackToGrid}
          onCreateOrder={onCreateOrder}
        />
      )}
    </div>
  );
}

function StorefrontHeader({ settings }) {
  return (
    <section className="rounded-2xl bg-gradient-to-br from-indigo-500 via-sky-500 to-cyan-400 px-4 py-6 text-white shadow-md sm:px-8 sm:py-8">
      <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 ring-2 ring-white/30">
            <span className="text-xl font-semibold">✨</span>
          </div>
          <div>
            <h1 className="text-xl font-semibold sm:text-2xl">
              {settings.storeName || "Boutique Lumière"}
            </h1>
            <p className="mt-1 text-sm text-indigo-50">
              {settings.slogan ||
                "Produits sélectionnés avec soin pour votre quotidien."}
            </p>
            <p className="mt-2 text-xs text-indigo-100">
              Paiement à la livraison • Livraisons disponibles dans plusieurs
              wilayas
            </p>
          </div>
        </div>
        <div className="flex flex-col items-start gap-2 text-xs sm:items-end">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 backdrop-blur">
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-400 text-[10px] font-bold text-emerald-950">
              ✓
            </span>
            <span className="font-medium">Boutique vérifiée Operette</span>
          </div>
          <div className="rounded-xl bg-white/10 px-3 py-2 text-indigo-50">
            <p className="text-[11px] font-medium uppercase tracking-wide text-indigo-100">
              Contact WhatsApp
            </p>
            <p className="mt-0.5 text-sm font-semibold">
              {settings.phone || "+213 555 12 34 56"}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function GlobalMessageBanner({ message }) {
  return (
    <div className="flex items-start gap-3 rounded-2xl border border-dashed border-indigo-200 bg-indigo-50 px-4 py-3 text-xs text-indigo-900 sm:text-sm">
      <span className="mt-0.5 text-lg">🚚</span>
      <div>
        <p className="font-medium">Information importante</p>
        <p className="mt-1 text-[13px] leading-snug">{message}</p>
      </div>
    </div>
  );
}

function ProductGrid({ products, onSelectProduct }) {
  return (
    <section className="space-y-3">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-base font-semibold text-slate-900 sm:text-lg">
          Produits en vedette
        </h2>
        <p className="text-xs text-slate-500">
          {products.length} produit{products.length > 1 ? "s" : ""} disponible
          {products.length > 1 ? "s" : ""} actuellement
        </p>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onSelect={() => onSelectProduct(product.id)}
          />
        ))}
      </div>
    </section>
  );
}

function ProductBadge({ badge }) {
  if (!badge) return null;
  const map = {
    Nouveau: "bg-emerald-50 text-emerald-700 ring-emerald-100",
    "Meilleure vente": "bg-amber-50 text-amber-700 ring-amber-100",
    Promotion: "bg-rose-50 text-rose-700 ring-rose-100",
    "Best seller": "bg-purple-50 text-purple-700 ring-purple-100",
  };
  const style = map[badge] || "bg-slate-50 text-slate-700 ring-slate-100";
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium ring-1 ${style}`}
    >
      <span>★</span>
      {badge}
    </span>
  );
}

function ProductCard({ product, onSelect }) {
  return (
    <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
      <div className="relative h-44 w-full overflow-hidden bg-slate-100">
        {product.images && product.images.length > 0 ? (
          <img
            src={product.images[0]}
            alt={product.name}
            className="h-full w-full object-cover transition duration-500 hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-slate-400">
            Image
          </div>
        )}
        {product.badge && (
          <div className="absolute left-3 top-3">
            <ProductBadge badge={product.badge} />
          </div>
        )}
      </div>
      <div className="flex flex-1 flex-col gap-3 p-4">
        <div>
          <h3 className="line-clamp-2 text-sm font-semibold text-slate-900">
            {product.name}
          </h3>
          <p className="mt-1 line-clamp-2 text-xs text-slate-500">
            {product.description}
          </p>
        </div>
        <div className="mt-auto flex items-end justify-between gap-3">
          <div>
            <p className="text-xs text-slate-400">Prix</p>
            <p className="text-base font-semibold text-slate-900">
              {formatCurrency(product.price)}
            </p>
          </div>
          <button
            type="button"
            onClick={onSelect}
            className="inline-flex items-center justify-center rounded-xl bg-slate-900 px-3.5 py-2 text-xs font-medium text-white shadow-sm transition hover:bg-slate-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-900/70 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-50"
          >
            Voir le produit
          </button>
        </div>
      </div>
    </article>
  );
}

function ProductDetail({ product, settings, onBack, onCreateOrder }) {
  const [showOrderForm, setShowOrderForm] = useState(false);

  if (!product) {
    return (
      <div className="rounded-2xl bg-white p-6 text-sm text-slate-500 shadow-sm">
        Produit introuvable.
      </div>
    );
  }

  return (
    <section className="space-y-4 sm:space-y-6">
      <button
        type="button"
        onClick={onBack}
        className="inline-flex items-center gap-2 text-xs font-medium text-slate-500 transition hover:text-slate-900"
      >
        <span className="rounded-full bg-slate-100 px-2 py-1">←</span>
        <span>Retour à la boutique</span>
      </button>

      <div className="grid gap-6 rounded-2xl border border-slate-100 bg-white p-4 shadow-sm sm:grid-cols-2 sm:p-6">
        {/* Média */}
        <div className="space-y-4">
          <MediaCarousel images={product.images} />
          {product.videoUrl && (
            <div className="overflow-hidden rounded-xl border border-slate-100 bg-slate-900/90">
              <video
                src={product.videoUrl}
                controls
                className="h-52 w-full object-cover sm:h-60"
              />
            </div>
          )}
        </div>

        {/* Infos produit */}
        <div className="flex flex-col gap-4">
          <div>
            <div className="flex items-center gap-2">
              {product.badge && <ProductBadge badge={product.badge} />}
              {product.category && (
                <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-500">
                  {product.category}
                </span>
              )}
            </div>
            <h2 className="mt-3 text-lg font-semibold text-slate-900 sm:text-xl">
              {product.name}
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              {product.description}
            </p>
          </div>

          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="text-xs text-slate-400">Prix</p>
              <p className="text-2xl font-semibold text-slate-900">
                {formatCurrency(product.price)}
              </p>
              <p className="mt-1 text-[11px] text-slate-400">
                Paiement à la livraison. Aucun paiement en ligne requis.
              </p>
            </div>
            <button
              type="button"
              onClick={() => setShowOrderForm(true)}
              className="inline-flex items-center justify-center rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-600 focus-visible:ring-offset-2 focus-visible:ring-offset-white"
            >
              Commander maintenant
            </button>
          </div>

          <div className="grid gap-4 rounded-xl bg-slate-50 p-3 text-xs sm:grid-cols-2 sm:text-sm">
            <div className="flex items-start gap-2">
              <div className="mt-1 flex h-6 w-6 items-center justify-center rounded-full bg-emerald-100 text-xs text-emerald-700">
                ✓
              </div>
              <div>
                <p className="font-medium text-slate-900">
                  Paiement à la livraison
                </p>
                <p className="mt-0.5 text-[13px] text-slate-500">
                  Vous payez uniquement lorsque le colis arrive chez vous.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <div className="mt-1 flex h-6 w-6 items-center justify-center rounded-full bg-sky-100 text-xs text-sky-700">
                🚚
              </div>
              <div>
                <p className="font-medium text-slate-900">
                  Livraison dans plusieurs wilayas
                </p>
                <p className="mt-0.5 text-[13px] text-slate-500">
                  Wilayas desservies :{" "}
                  {(settings.wilayasDesservies || []).join(", ")}.
                </p>
              </div>
            </div>
          </div>

          {/* Sections d'information */}
          <div className="space-y-3 rounded-xl border border-slate-100 p-3 text-xs sm:text-sm">
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                Avantages
              </h3>
              <ul className="mt-2 space-y-1 text-slate-600">
                {(product.advantages && product.advantages.length > 0
                  ? product.advantages
                  : [
                      "Produit sélectionné pour sa qualité.",
                      "Convient à un usage quotidien.",
                      "Très bon rapport qualité/prix.",
                    ]
                ).map((item, idx) => (
                  <li key={idx} className="flex gap-2">
                    <span className="mt-0.5 text-sky-500">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="border-t border-dashed border-slate-100 pt-3">
              <h3 className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                Caractéristiques
              </h3>
              <ul className="mt-2 space-y-1 text-slate-600">
                {(product.features && product.features.length > 0
                  ? product.features
                  : [
                      "Produit prêt à l’emploi.",
                      "Matériaux durables et fiables.",
                    ]
                ).map((item, idx) => (
                  <li key={idx} className="flex gap-2">
                    <span className="mt-0.5 text-sky-500">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="border-t border-dashed border-slate-100 pt-3">
              <h3 className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                Comment utiliser
              </h3>
              <ul className="mt-2 space-y-1 text-slate-600">
                {(product.usage && product.usage.length > 0
                  ? product.usage
                  : [
                      "Lire la notice fournie avec le produit.",
                      "Installer le produit dans un endroit adapté.",
                    ]
                ).map((item, idx) => (
                  <li key={idx} className="flex gap-2">
                    <span className="mt-0.5 text-sky-500">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Formulaire de commande */}
      {showOrderForm && (
        <OrderForm product={product} onCreateOrder={onCreateOrder} />
      )}
    </section>
  );
}

function MediaCarousel({ images }) {
  const [index, setIndex] = useState(0);
  if (!images || images.length === 0) {
    return (
      <div className="flex h-60 items-center justify-center rounded-xl bg-slate-100 text-slate-400">
        Aucune image
      </div>
    );
  }

  const goPrev = () => {
    setIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const goNext = () => {
    setIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="space-y-3">
      <div className="relative h-60 overflow-hidden rounded-xl bg-slate-100 sm:h-72">
        <img
          src={images[index]}
          alt={`Image ${index + 1}`}
          className="h-full w-full object-cover transition duration-500"
        />
        {images.length > 1 && (
          <>
            <button
              type="button"
              onClick={goPrev}
              className="absolute left-2 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-black/30 text-xs text-white backdrop-blur transition hover:bg-black/50"
            >
              ←
            </button>
            <button
              type="button"
              onClick={goNext}
              className="absolute right-2 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-black/30 text-xs text-white backdrop-blur transition hover:bg-black/50"
            >
              →
            </button>
          </>
        )}
      </div>
      {images.length > 1 && (
        <div className="flex justify-center gap-1.5">
          {images.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setIndex(i)}
              className={`h-1.5 rounded-full transition ${
                i === index ? "w-6 bg-slate-900" : "w-2 bg-slate-300"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function OrderForm({ product, onCreateOrder }) {
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [wilaya, setWilaya] = useState("");
  const [address, setAddress] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [remark, setRemark] = useState("");
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const validate = () => {
    const newErrors = {};

    const trimmedName = fullName.trim();
    if (!trimmedName || trimmedName.split(/\s+/).length < 2) {
      newErrors.fullName =
        "Veuillez entrer votre nom complet (au moins deux mots).";
    }

    const phoneDigits = phone.replace(/\D/g, "");
    if (!/^0(5|6|7)\d{8}$/.test(phoneDigits)) {
      newErrors.phone =
        "Le numéro doit commencer par 05, 06 ou 07 et contenir 10 chiffres.";
    }

    if (!wilaya) {
      newErrors.wilaya = "Veuillez sélectionner une wilaya.";
    }

    if (!address || address.trim().length < 10) {
      newErrors.address =
        "Veuillez entrer une adresse détaillée (commune, rue, repères…).";
    }

    const q = Number(quantity);
    if (!Number.isInteger(q) || q < 1 || q > 10) {
      newErrors.quantity = "La quantité doit être comprise entre 1 et 10.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    onCreateOrder({
      fullName: fullName.trim(),
      phone: phone.replace(/\D/g, ""),
      wilaya,
      address: address.trim(),
      quantity: Number(quantity),
      remark: remark.trim(),
      productId: product.id,
    });
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="mt-2 rounded-2xl border border-emerald-100 bg-emerald-50 p-4 text-sm text-emerald-900 sm:p-5">
        <div className="flex items-start gap-3">
          <div className="mt-0.5 flex h-7 w-7 items-center justify-center rounded-full bg-emerald-500 text-sm text-white">
            ✓
          </div>
          <div>
            <p className="font-semibold">
              Votre commande a été enregistrée avec succès.
            </p>
            <p className="mt-1 text-[13px] leading-snug">
              ✅ Nous vous contacterons par téléphone pour confirmer les détails
              de la commande et de la livraison. Merci pour votre confiance.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <section className="mt-2 rounded-2xl border border-slate-100 bg-white p-4 shadow-sm sm:p-6">
      <h3 className="text-sm font-semibold text-slate-900 sm:text-base">
        Finaliser la commande
      </h3>
      <p className="mt-1 text-xs text-slate-500 sm:text-sm">
        Remplissez ce formulaire et nous vous appellerons pour confirmer votre
        commande de{" "}
        <span className="font-semibold text-slate-900">{product.name}</span>.
      </p>
      <form onSubmit={handleSubmit} className="mt-4 grid gap-4 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label className="flex items-center justify-between text-xs font-medium text-slate-700">
            Nom complet
            <span className="text-[11px] text-slate-400">
              Ex: "Nom Prénom"
            </span>
          </label>
          <input
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            placeholder="Votre nom et prénom"
            className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm outline-none ring-0 transition placeholder:text-slate-400 focus:border-indigo-500 focus:bg-white"
          />
          {errors.fullName && (
            <p className="mt-1 text-xs text-rose-500">{errors.fullName}</p>
          )}
        </div>

        <div>
          <label className="text-xs font-medium text-slate-700">
            Numéro de téléphone
          </label>
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="05xx xx xx xx"
            className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm outline-none focus:border-indigo-500 focus:bg-white"
          />
          {errors.phone && (
            <p className="mt-1 text-xs text-rose-500">{errors.phone}</p>
          )}
        </div>

        <div>
          <label className="text-xs font-medium text-slate-700">Wilaya</label>
          <select
            value={wilaya}
            onChange={(e) => setWilaya(e.target.value)}
            className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900 outline-none focus:border-indigo-500 focus:bg-white"
          >
            <option value="">Sélectionnez une wilaya</option>
            {ALGERIAN_WILAYAS.map((w) => (
              <option key={w} value={w}>
                {w}
              </option>
            ))}
          </select>
          {errors.wilaya && (
            <p className="mt-1 text-xs text-rose-500">{errors.wilaya}</p>
          )}
        </div>

        <div className="sm:col-span-2">
          <label className="text-xs font-medium text-slate-700">
            Adresse détaillée
          </label>
          <textarea
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Commune, quartier, rue, bâtiment, repères..."
            rows={3}
            className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm outline-none focus:border-indigo-500 focus:bg-white"
          />
          {errors.address && (
            <p className="mt-1 text-xs text-rose-500">{errors.address}</p>
          )}
        </div>

        <div>
          <label className="text-xs font-medium text-slate-700">
            Quantité
          </label>
          <input
            type="number"
            min={1}
            max={10}
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            className="mt-1 w-28 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm outline-none focus:border-indigo-500 focus:bg-white"
          />
          {errors.quantity && (
            <p className="mt-1 text-xs text-rose-500">{errors.quantity}</p>
          )}
        </div>

        <div className="sm:col-span-2">
          <label className="text-xs font-medium text-slate-700">
            Remarque (optionnel)
          </label>
          <textarea
            value={remark}
            onChange={(e) => setRemark(e.target.value)}
            placeholder="Ex : couleur souhaitée, préférence de livraison…"
            rows={2}
            className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm outline-none focus:border-indigo-500 focus:bg-white"
          />
        </div>

        <div className="sm:col-span-2 flex flex-col gap-3 border-t border-dashed border-slate-100 pt-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="text-xs text-slate-500">
            <p>
              Montant estimé :{" "}
              <span className="font-semibold text-slate-900">
                {formatCurrency(product.price * (Number(quantity) || 1))}
              </span>{" "}
              hors frais de livraison.
            </p>
            <p className="mt-1 text-[11px] text-slate-400">
              Un agent vous appellera pour confirmer la commande et le montant
              final avec livraison.
            </p>
          </div>
          <button
            type="submit"
            className="inline-flex items-center justify-center rounded-xl bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 focus-visible:ring-offset-2 focus-visible:ring-offset-white"
          >
            Valider la commande
          </button>
        </div>
      </form>
    </section>
  );
}

/* ---------- DASHBOARD ---------- */

function DashboardShell({
  products,
  setProducts,
  orders,
  customers,
  settings,
  setSettings,
  activeTab,
  onTabChange,
}) {
  const totalOrders = orders.length;
  const totalRevenue = orders.reduce(
    (sum, o) => sum + (o.status === "Livré" ? o.totalAmount || 0 : 0),
    0
  );
  const todayKey = new Date().toISOString().slice(0, 10);
  const ordersToday = orders.filter(
    (o) => o.date && o.date.slice(0, 10) === todayKey
  ).length;

  return (
    <div className="space-y-5 sm:space-y-6">
      {/* Barre dashboard */}
      <div className="flex flex-col gap-4 rounded-2xl border border-slate-100 bg-white px-4 py-3 shadow-sm sm:flex-row sm:items-center sm:justify-between sm:px-6 sm:py-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-900 text-sm font-semibold text-white">
            BL
          </div>
          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
              Espace marchand • Operette
            </p>
            <h1 className="text-base font-semibold text-slate-900 sm:text-lg">
              {settings.storeName || "Boutique Lumière"}
            </h1>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-2 text-xs sm:justify-end">
          <div className="rounded-full bg-slate-50 px-3 py-1 text-slate-600">
            Total commandes :{" "}
            <span className="font-semibold text-slate-900">
              {totalOrders}
            </span>
          </div>
          <div className="rounded-full bg-emerald-50 px-3 py-1 text-emerald-700">
            CA livré :{" "}
            <span className="font-semibold">{formatCurrency(totalRevenue)}</span>
          </div>
          <div className="rounded-full bg-indigo-50 px-3 py-1 text-indigo-700">
            Aujourd’hui :{" "}
            <span className="font-semibold">{ordersToday} commande(s)</span>
          </div>
        </div>
      </div>

      {/* Navigation interne dashboard */}
      <DashboardNav activeTab={activeTab} onTabChange={onTabChange} />

      {/* Contenu des onglets */}
      <div className="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm sm:p-6">
        {activeTab === "overview" && (
          <OverviewPage
            orders={orders}
            products={products}
            customers={customers}
          />
        )}
        {activeTab === "orders" && (
          <OrdersPage orders={orders} products={products} />
        )}
        {activeTab === "products" && (
          <ProductsPage products={products} setProducts={setProducts} />
        )}
        {activeTab === "customers" && (
          <CustomersPage customers={customers} />
        )}
        {activeTab === "settings" && (
          <SettingsPage
            settings={settings}
            setSettings={setSettings}
          />
        )}
      </div>
    </div>
  );
}

function DashboardNav({ activeTab, onTabChange }) {
  const tabs = [
    { id: "overview", label: "Vue d’ensemble" },
    { id: "orders", label: "Commandes" },
    { id: "products", label: "Produits" },
    { id: "customers", label: "Clients" },
    { id: "settings", label: "Paramètres" },
  ];
  return (
    <nav className="overflow-x-auto">
      <div className="inline-flex min-w-full rounded-full bg-slate-100 p-1 text-xs sm:text-sm">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => onTabChange(tab.id)}
            className={`relative flex-1 rounded-full px-3 py-1.5 font-medium transition sm:px-4 sm:py-2 ${
              activeTab === tab.id
                ? "bg-white text-slate-900 shadow-sm"
                : "text-slate-500 hover:text-slate-900"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </nav>
  );
}

/* ---------- Vue d’ensemble ---------- */

function SummaryCard({ label, value, sub, trend }) {
  return (
    <div className="rounded-2xl border border-slate-100 bg-slate-50/60 p-3 text-xs text-slate-600 sm:p-4 sm:text-sm">
      <p className="text-[11px] font-medium uppercase tracking-wide text-slate-400">
        {label}
      </p>
      <p className="mt-1 text-lg font-semibold text-slate-900 sm:text-xl">
        {value}
      </p>
      <div className="mt-1 flex items-center justify-between gap-2">
        <p className="text-[11px] text-slate-400">{sub}</p>
        {trend && (
          <span
            className={`inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-medium ${
              trend.startsWith("+")
                ? "bg-emerald-50 text-emerald-700"
                : "bg-rose-50 text-rose-700"
            }`}
          >
            {trend}
          </span>
        )}
      </div>
    </div>
  );
}

function OverviewPage({ orders, products, customers }) {
  const delivered = orders.filter((o) => o.status === "Livré");
  const canceled = orders.filter((o) => o.status === "Annulé");
  const totalRevenue = delivered.reduce(
    (sum, o) => sum + (o.totalAmount || 0),
    0
  );
  const monthlyStats = getMonthlyStats(orders);
  const topProducts = getTopProductsFromOrders(orders, products).slice(0, 4);

  return (
    <div className="space-y-6">
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <SummaryCard
          label="Total commandes"
          value={orders.length}
          sub="Toutes périodes confondues"
          trend="+12% vs mois dernier"
        />
        <SummaryCard
          label="Commandes livrées"
          value={delivered.length}
          sub="Statut marqué comme livré"
          trend="+8% vs mois dernier"
        />
        <SummaryCard
          label="Commandes annulées"
          value={canceled.length}
          sub="Inclut les retours"
          trend="-3% vs mois dernier"
        />
        <SummaryCard
          label="CA estimé livré"
          value={formatCurrency(totalRevenue)}
          sub="Basé sur les commandes livrées"
          trend="+15% vs mois dernier"
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Graphique */}
        <div className="rounded-2xl border border-slate-100 bg-slate-50/60 p-4 text-xs sm:p-5 sm:text-sm lg:col-span-2">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-semibold text-slate-900 sm:text-base">
                Commandes par mois
              </h3>
              <p className="mt-1 text-[11px] text-slate-500">
                Répartition des commandes et du chiffre d’affaires.
              </p>
            </div>
            <span className="rounded-full bg-slate-900 px-2.5 py-1 text-[11px] font-medium text-white">
              Vue 6 derniers mois
            </span>
          </div>
          <div className="mt-4 flex h-44 items-end gap-2 sm:gap-3">
            {monthlyStats.length === 0 ? (
              <div className="flex h-full w-full items-center justify-center text-xs text-slate-400">
                Pas encore assez de données.
              </div>
            ) : (
              <>
                {(() => {
                  const max = Math.max(
                    ...monthlyStats.map((m) => m.orders || 1),
                    1
                  );
                  return monthlyStats.map((m) => (
                    <div
                      key={m.key}
                      className="flex flex-1 flex-col items-center gap-1"
                    >
                      <div
                        className="flex w-full flex-1 items-end rounded-t-md bg-gradient-to-t from-indigo-500/70 to-sky-400/90"
                        style={{
                          height: `${(m.orders / max) * 100}%`,
                        }}
                      >
                        <div className="w-full rounded-t-md bg-gradient-to-t from-slate-900/80 via-indigo-700/80 to-sky-600/80"></div>
                      </div>
                      <span className="text-[11px] font-medium text-slate-600">
                        {m.label}
                      </span>
                      <span className="text-[10px] text-slate-400">
                        {m.orders} cmd • {formatCurrency(m.revenue)}
                      </span>
                    </div>
                  ));
                })()}
              </>
            )}
          </div>
        </div>

        {/* Meilleurs produits */}
        <div className="rounded-2xl border border-slate-100 bg-slate-50/60 p-4 text-xs text-slate-600 sm:p-5 sm:text-sm">
          <h3 className="text-sm font-semibold text-slate-900 sm:text-base">
            Meilleurs produits
          </h3>
          <p className="mt-1 text-[11px] text-slate-500">
            Basé sur le nombre de commandes enregistrées.
          </p>
          <div className="mt-3 space-y-2">
            {topProducts.length === 0 ? (
              <p className="text-xs text-slate-400">
                Aucune commande pour l’instant.
              </p>
            ) : (
              topProducts.map((item) => (
                <div
                  key={item.productId}
                  className="flex items-center justify-between rounded-xl bg-white px-3 py-2"
                >
                  <div>
                    <p className="text-[13px] font-medium text-slate-900">
                      {item.name}
                    </p>
                    <p className="text-[11px] text-slate-500">
                      {item.orders} commande
                      {item.orders > 1 ? "s" : ""} •{" "}
                      {formatCurrency(item.revenue)}
                    </p>
                  </div>
                  <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[11px] font-medium text-emerald-700">
                    Top
                  </span>
                </div>
              ))
            )}
          </div>

          <div className="mt-4 rounded-xl bg-slate-900 px-3 py-3 text-white">
            <p className="text-[11px] font-medium uppercase tracking-wide text-slate-300">
              Clients actifs
            </p>
            <p className="mt-1 text-sm font-semibold">
              {customers.length} client
              {customers.length > 1 ? "s" : ""} unique
            </p>
            <p className="mt-1 text-[11px] text-slate-300">
              Gardez le contact avec vos meilleurs clients pour booster vos
              ventes.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------- Commandes ---------- */

function StatusBadge({ status }) {
  const map = {
    Nouveau: "bg-indigo-50 text-indigo-700 ring-indigo-100",
    "En attente d’appel": "bg-amber-50 text-amber-700 ring-amber-100",
    "En livraison": "bg-sky-50 text-sky-700 ring-sky-100",
    Livré: "bg-emerald-50 text-emerald-700 ring-emerald-100",
    Annulé: "bg-rose-50 text-rose-700 ring-rose-100",
  };
  const cls = map[status] || "bg-slate-50 text-slate-700 ring-slate-100";
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-[11px] font-medium ring-1 ${cls}`}
    >
      {status}
    </span>
  );
}

function OrdersPage({ orders }) {
  const [statusFilter, setStatusFilter] = useState("");
  const [wilayaFilter, setWilayaFilter] = useState("");
  const [selectedOrderId, setSelectedOrderId] = useState(null);

  const filteredOrders = orders.filter((order) => {
    if (statusFilter && order.status !== statusFilter) return false;
    if (wilayaFilter && order.wilaya !== wilayaFilter) return false;
    return true;
  });

  const selectedOrder = orders.find((o) => o.id === selectedOrderId);

  const uniqueWilayas = Array.from(
    new Set(orders.map((o) => o.wilaya).filter(Boolean))
  );

  const uniqueStatuses = Array.from(
    new Set(orders.map((o) => o.status).filter(Boolean))
  );

  return (
    <div className="space-y-4 text-xs sm:text-sm">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-sm font-semibold text-slate-900 sm:text-base">
            Commandes
          </h2>
          <p className="mt-1 text-[11px] text-slate-500">
            Suivez vos commandes depuis la boutique et les campagnes sociales.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs outline-none focus:border-indigo-500 focus:bg-white"
          >
            <option value="">Tous les statuts</option>
            {uniqueStatuses.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
          <select
            value={wilayaFilter}
            onChange={(e) => setWilayaFilter(e.target.value)}
            className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs outline-none focus:border-indigo-500 focus:bg-white"
          >
            <option value="">Toutes les wilayas</option>
            {uniqueWilayas.map((w) => (
              <option key={w} value={w}>
                {w}
              </option>
            ))}
          </select>
          <button
            type="button"
            onClick={() => {
              setStatusFilter("");
              setWilayaFilter("");
            }}
            className="rounded-full border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-600 hover:bg-slate-50"
          >
            Réinitialiser
          </button>
        </div>
      </div>

      <div className="overflow-hidden rounded-2xl border border-slate-100">
        <div className="max-h-72 overflow-auto">
          <table className="min-w-full divide-y divide-slate-100 text-xs sm:text-[13px]">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-3 py-2 text-left font-medium text-slate-400">
                  ID
                </th>
                <th className="px-3 py-2 text-left font-medium text-slate-400">
                  Date
                </th>
                <th className="px-3 py-2 text-left font-medium text-slate-400">
                  Client
                </th>
                <th className="px-3 py-2 text-left font-medium text-slate-400">
                  Téléphone
                </th>
                <th className="px-3 py-2 text-left font-medium text-slate-400">
                  Wilaya
                </th>
                <th className="px-3 py-2 text-left font-medium text-slate-400">
                  Produit(s)
                </th>
                <th className="px-3 py-2 text-right font-medium text-slate-400">
                  Montant
                </th>
                <th className="px-3 py-2 text-left font-medium text-slate-400">
                  Statut
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50 bg-white">
              {filteredOrders.length === 0 ? (
                <tr>
                  <td
                    colSpan={8}
                    className="px-3 py-6 text-center text-xs text-slate-400"
                  >
                    Aucune commande ne correspond à ces filtres.
                  </td>
                </tr>
              ) : (
                filteredOrders.map((order) => (
                  <tr
                    key={order.id}
                    className="cursor-pointer hover:bg-slate-50"
                    onClick={() =>
                      setSelectedOrderId(
                        selectedOrderId === order.id ? null : order.id
                      )
                    }
                  >
                    <td className="whitespace-nowrap px-3 py-2 font-mono text-[11px] text-slate-500">
                      {order.id}
                    </td>
                    <td className="whitespace-nowrap px-3 py-2 text-slate-600">
                      {formatShortDate(order.date)}
                    </td>
                    <td className="px-3 py-2 font-medium text-slate-900">
                      {order.clientName}
                    </td>
                    <td className="whitespace-nowrap px-3 py-2 text-slate-600">
                      {order.phone}
                    </td>
                    <td className="whitespace-nowrap px-3 py-2 text-slate-600">
                      {order.wilaya}
                    </td>
                    <td className="px-3 py-2 text-slate-600">
                      {order.productName} ×{order.quantity || 1}
                    </td>
                    <td className="whitespace-nowrap px-3 py-2 text-right font-medium text-slate-900">
                      {formatCurrency(order.totalAmount)}
                    </td>
                    <td className="px-3 py-2">
                      <StatusBadge status={order.status} />
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {selectedOrder && (
        <div className="rounded-2xl border border-slate-100 bg-slate-50/70 p-4 text-xs text-slate-600 sm:text-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[11px] font-medium uppercase tracking-wide text-slate-400">
                Détails de la commande
              </p>
              <p className="mt-1 font-medium text-slate-900">
                {selectedOrder.clientName} • {selectedOrder.phone}
              </p>
            </div>
            <StatusBadge status={selectedOrder.status} />
          </div>
          <div className="mt-3 grid gap-3 sm:grid-cols-3">
            <div>
              <p className="text-[11px] text-slate-400">ID commande</p>
              <p className="font-mono text-[11px] text-slate-700">
                {selectedOrder.id}
              </p>
            </div>
            <div>
              <p className="text-[11px] text-slate-400">Date</p>
              <p className="text-[13px] text-slate-700">
                {formatDateTime(selectedOrder.date)}
              </p>
            </div>
            <div>
              <p className="text-[11px] text-slate-400">Montant total</p>
              <p className="text-[13px] font-semibold text-slate-900">
                {formatCurrency(selectedOrder.totalAmount)}
              </p>
            </div>
            <div className="sm:col-span-2">
              <p className="text-[11px] text-slate-400">
                Adresse & localisation
              </p>
              <p className="text-[13px] text-slate-700">
                {selectedOrder.address} • {selectedOrder.wilaya}
              </p>
            </div>
            <div>
              <p className="text-[11px] text-slate-400">Produit(s)</p>
              <p className="text-[13px] text-slate-700">
                {selectedOrder.productName} ×{selectedOrder.quantity || 1}
              </p>
            </div>
            {selectedOrder.remark && (
              <div className="sm:col-span-3">
                <p className="text-[11px] text-slate-400">Remarque client</p>
                <p className="mt-0.5 text-[13px] text-slate-700">
                  {selectedOrder.remark}
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

/* ---------- Produits ---------- */

function ProductsPage({ products, setProducts }) {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [formState, setFormState] = useState({
    name: "",
    price: "",
    description: "",
    category: "",
    imagesInput: "",
    videoUrl: "",
    status: "Actif",
    badge: "",
  });

  const resetForm = () => {
    setFormState({
      name: "",
      price: "",
      description: "",
      category: "",
      imagesInput: "",
      videoUrl: "",
      status: "Actif",
      badge: "",
    });
    setEditingProduct(null);
  };

  const openForNew = () => {
    resetForm();
    setIsFormOpen(true);
  };

  const openForEdit = (product) => {
    setEditingProduct(product);
    setFormState({
      name: product.name || "",
      price: product.price?.toString() || "",
      description: product.description || "",
      category: product.category || "",
      imagesInput: (product.images || []).join("\n"),
      videoUrl: product.videoUrl || "",
      status: product.status || "Actif",
      badge: product.badge || "",
    });
    setIsFormOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const images = formState.imagesInput
      .split(/[\n,]/)
      .map((s) => s.trim())
      .filter(Boolean);
    const price = Number(formState.price) || 0;
    if (!formState.name || price <= 0) return;

    if (editingProduct) {
      setProducts((prev) =>
        prev.map((p) =>
          p.id === editingProduct.id
            ? {
                ...p,
                name: formState.name,
                price,
                description: formState.description,
                category: formState.category,
                images,
                videoUrl: formState.videoUrl,
                status: formState.status,
                badge: formState.badge,
              }
            : p
        )
      );
    } else {
      const id = `p${Date.now()}`;
      setProducts((prev) => [
        ...prev,
        {
          id,
          name: formState.name,
          price,
          description: formState.description,
          category: formState.category,
          images,
          videoUrl: formState.videoUrl,
          status: formState.status,
          badge: formState.badge,
          advantages: [],
          features: [],
          usage: [],
        },
      ]);
    }
    setIsFormOpen(false);
    resetForm();
  };

  const handleDelete = (id) => {
    if (!window.confirm("Supprimer ce produit ?")) return;
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  return (
    <div className="space-y-4 text-xs sm:text-sm">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-sm font-semibold text-slate-900 sm:text-base">
            Produits
          </h2>
          <p className="mt-1 text-[11px] text-slate-500">
            Gérez le catalogue affiché sur votre boutique et vos liens sociaux.
          </p>
        </div>
        <button
          type="button"
          onClick={openForNew}
          className="inline-flex items-center justify-center rounded-xl bg-slate-900 px-3.5 py-2 text-xs font-semibold text-white shadow-sm transition hover:bg-slate-800"
        >
          + Ajouter un produit
        </button>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((p) => (
          <div
            key={p.id}
            className="flex flex-col rounded-2xl border border-slate-100 bg-slate-50/70 p-3 text-xs text-slate-600"
          >
            <div className="flex items-start gap-3">
              <div className="h-14 w-14 overflow-hidden rounded-xl bg-slate-200">
                {p.images && p.images.length > 0 ? (
                  <img
                    src={p.images[0]}
                    alt={p.name}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center text-[11px] text-slate-400">
                    Image
                  </div>
                )}
              </div>
              <div className="flex-1">
                <p className="line-clamp-1 text-[13px] font-semibold text-slate-900">
                  {p.name}
                </p>
                <p className="mt-0.5 line-clamp-2 text-[11px] text-slate-500">
                  {p.description}
                </p>
                <div className="mt-1 flex items-center gap-2">
                  <span className="text-[11px] font-medium text-slate-900">
                    {formatCurrency(p.price)}
                  </span>
                  {p.category && (
                    <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[10px] text-slate-500">
                      {p.category}
                    </span>
                  )}
                </div>
                <div className="mt-2 flex items-center gap-2">
                  <span
                    className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${
                      p.status === "Actif"
                        ? "bg-emerald-50 text-emerald-700"
                        : "bg-slate-100 text-slate-500"
                    }`}
                  >
                    {p.status === "Actif" ? "Actif" : "Masqué"}
                  </span>
                  {p.badge && (
                    <span className="rounded-full bg-amber-50 px-2 py-0.5 text-[10px] font-medium text-amber-700">
                      {p.badge}
                    </span>
                  )}
                </div>
              </div>
            </div>
            <div className="mt-3 flex items-center justify-between border-t border-slate-100 pt-2">
              <button
                type="button"
                onClick={() => openForEdit(p)}
                className="text-[11px] font-medium text-slate-700 hover:text-slate-900"
              >
                Modifier
              </button>
              <button
                type="button"
                onClick={() => handleDelete(p.id)}
                className="text-[11px] font-medium text-rose-600 hover:text-rose-700"
              >
                Supprimer
              </button>
            </div>
          </div>
        ))}
      </div>

      {isFormOpen && (
        <div className="fixed inset-0 z-40 flex items-end justify-center bg-black/30 px-4 py-6 sm:items-center">
          <div className="max-h-[90vh] w-full max-w-lg overflow-auto rounded-2xl bg-white p-4 text-xs shadow-lg sm:p-5 sm:text-sm">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-semibold text-slate-900 sm:text-base">
                  {editingProduct ? "Modifier le produit" : "Nouveau produit"}
                </h3>
                <p className="mt-1 text-[11px] text-slate-500">
                  Les produits actifs sont visibles dans la boutique.
                </p>
              </div>
              <button
                type="button"
                onClick={() => {
                  setIsFormOpen(false);
                  resetForm();
                }}
                className="rounded-full bg-slate-100 px-2 py-1 text-xs text-slate-500 hover:bg-slate-200"
              >
                Fermer
              </button>
            </div>
            <form onSubmit={handleSubmit} className="mt-4 space-y-3">
              <div>
                <label className="text-xs font-medium text-slate-700">
                  Nom du produit
                </label>
                <input
                  type="text"
                  value={formState.name}
                  onChange={(e) =>
                    setFormState((s) => ({ ...s, name: e.target.value }))
                  }
                  className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm outline-none focus:border-indigo-500 focus:bg-white"
                  required
                />
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                <div>
                  <label className="text-xs font-medium text-slate-700">
                    Prix (DA)
                  </label>
                  <input
                    type="number"
                    min={0}
                    value={formState.price}
                    onChange={(e) =>
                      setFormState((s) => ({ ...s, price: e.target.value }))
                    }
                    className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm outline-none focus:border-indigo-500 focus:bg-white"
                    required
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-slate-700">
                    Catégorie
                  </label>
                  <input
                    type="text"
                    value={formState.category}
                    onChange={(e) =>
                      setFormState((s) => ({ ...s, category: e.target.value }))
                    }
                    className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm outline-none focus:border-indigo-500 focus:bg-white"
                  />
                </div>
              </div>
              <div>
                <label className="text-xs font-medium text-slate-700">
                  Description
                </label>
                <textarea
                  rows={3}
                  value={formState.description}
                  onChange={(e) =>
                    setFormState((s) => ({
                      ...s,
                      description: e.target.value,
                    }))
                  }
                  className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm outline-none focus:border-indigo-500 focus:bg-white"
                />
              </div>
              <div>
                <label className="text-xs font-medium text-slate-700">
                  URLs d’images
                </label>
                <textarea
                  rows={3}
                  value={formState.imagesInput}
                  onChange={(e) =>
                    setFormState((s) => ({
                      ...s,
                      imagesInput: e.target.value,
                    }))
                  }
                  placeholder="Une URL par ligne ou séparée par des virgules."
                  className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs outline-none focus:border-indigo-500 focus:bg-white"
                />
              </div>
              <div>
                <label className="text-xs font-medium text-slate-700">
                  URL vidéo (optionnel)
                </label>
                <input
                  type="text"
                  value={formState.videoUrl}
                  onChange={(e) =>
                    setFormState((s) => ({
                      ...s,
                      videoUrl: e.target.value,
                    }))
                  }
                  className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm outline-none focus:border-indigo-500 focus:bg-white"
                />
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                <div>
                  <label className="text-xs font-medium text-slate-700">
                    Statut
                  </label>
                  <select
                    value={formState.status}
                    onChange={(e) =>
                      setFormState((s) => ({
                        ...s,
                        status: e.target.value,
                      }))
                    }
                    className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm outline-none focus:border-indigo-500 focus:bg-white"
                  >
                    <option value="Actif">Actif</option>
                    <option value="Masqué">Masqué</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-medium text-slate-700">
                    Badge (optionnel)
                  </label>
                  <input
                    type="text"
                    value={formState.badge}
                    onChange={(e) =>
                      setFormState((s) => ({ ...s, badge: e.target.value }))
                    }
                    placeholder='Ex: "Nouveau", "Promotion"...'
                    className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm outline-none focus:border-indigo-500 focus:bg-white"
                  />
                </div>
              </div>
              <div className="mt-3 flex items-center justify-end gap-2 border-t border-slate-100 pt-3">
                <button
                  type="button"
                  onClick={() => {
                    setIsFormOpen(false);
                    resetForm();
                  }}
                  className="rounded-xl border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-600 hover:bg-slate-50"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="rounded-xl bg-slate-900 px-4 py-1.5 text-xs font-semibold text-white hover:bg-slate-800"
                >
                  {editingProduct ? "Enregistrer" : "Ajouter le produit"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

/* ---------- Clients ---------- */

function CustomersPage({ customers }) {
  return (
    <div className="space-y-4 text-xs sm:text-sm">
      <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-sm font-semibold text-slate-900 sm:text-base">
            Clients
          </h2>
          <p className="mt-1 text-[11px] text-slate-500">
            Vue CRM simplifiée basée sur les numéros de téléphone uniques.
          </p>
        </div>
        <div className="rounded-full bg-slate-100 px-3 py-1 text-[11px] text-slate-600">
          {customers.length} client
          {customers.length > 1 ? "s" : ""} répertorié
          {customers.length > 1 ? "s" : ""}.
        </div>
      </div>

      <div className="overflow-hidden rounded-2xl border border-slate-100">
        <div className="max-h-72 overflow-auto">
          <table className="min-w-full divide-y divide-slate-100 text-xs sm:text-[13px]">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-3 py-2 text-left font-medium text-slate-400">
                  Client
                </th>
                <th className="px-3 py-2 text-left font-medium text-slate-400">
                  Téléphone
                </th>
                <th className="px-3 py-2 text-right font-medium text-slate-400">
                  Nb commandes
                </th>
                <th className="px-3 py-2 text-right font-medium text-slate-400">
                  Montant estimé
                </th>
                <th className="px-3 py-2 text-left font-medium text-slate-400">
                  Dernière commande
                </th>
                <th className="px-3 py-2 text-left font-medium text-slate-400">
                  Tag
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50 bg-white">
              {customers.length === 0 ? (
                <tr>
                  <td
                    colSpan={6}
                    className="px-3 py-6 text-center text-xs text-slate-400"
                  >
                    Aucun client pour le moment.
                  </td>
                </tr>
              ) : (
                customers.map((c) => {
                  let tag = "Nouveau";
                  let tagClass = "bg-emerald-50 text-emerald-700";
                  if (c.orderCount >= 3 && c.orderCount < 5) {
                    tag = "Récurrent";
                    tagClass = "bg-indigo-50 text-indigo-700";
                  } else if (c.orderCount >= 5) {
                    tag = "VIP";
                    tagClass = "bg-amber-50 text-amber-700";
                  }
                  return (
                    <tr key={c.phone || c.name}>
                      <td className="px-3 py-2 font-medium text-slate-900">
                        {c.name}
                      </td>
                      <td className="px-3 py-2 text-slate-600">
                        {c.phone || "-"}
                      </td>
                      <td className="px-3 py-2 text-right text-slate-600">
                        {c.orderCount}
                      </td>
                      <td className="px-3 py-2 text-right font-medium text-slate-900">
                        {formatCurrency(c.totalAmount)}
                      </td>
                      <td className="px-3 py-2 text-slate-600">
                        {formatShortDate(c.lastOrderDate)}
                      </td>
                      <td className="px-3 py-2">
                        <span
                          className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-[11px] font-medium ${tagClass}`}
                        >
                          {tag}
                        </span>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

/* ---------- Paramètres ---------- */

function SettingsPage({ settings, setSettings }) {
  const handleChange = (field, value) => {
    setSettings((prev) => ({ ...prev, [field]: value }));
  };

  const handleWilayasChange = (e) => {
    const selected = Array.from(e.target.selectedOptions).map(
      (opt) => opt.value
    );
    handleChange("wilayasDesservies", selected);
  };

  return (
    <div className="space-y-4 text-xs sm:text-sm">
      <div>
        <h2 className="text-sm font-semibold text-slate-900 sm:text-base">
          Paramètres de la boutique
        </h2>
        <p className="mt-1 text-[11px] text-slate-500">
          Ces informations sont utilisées sur la boutique publique et dans le
          tableau de bord.
        </p>
      </div>

      <form className="grid gap-4 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label className="text-xs font-medium text-slate-700">
            Nom de la boutique
          </label>
          <input
            type="text"
            value={settings.storeName}
            onChange={(e) => handleChange("storeName", e.target.value)}
            className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm outline-none focus:border-indigo-500 focus:bg-white"
          />
        </div>

        <div className="sm:col-span-2">
          <label className="text-xs font-medium text-slate-700">Slogan</label>
          <input
            type="text"
            value={settings.slogan}
            onChange={(e) => handleChange("slogan", e.target.value)}
            className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm outline-none focus:border-indigo-500 focus:bg-white"
          />
        </div>

        <div>
          <label className="text-xs font-medium text-slate-700">
            Numéro de téléphone
          </label>
          <input
            type="text"
            value={settings.phone}
            onChange={(e) => handleChange("phone", e.target.value)}
            className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm outline-none focus:border-indigo-500 focus:bg-white"
          />
        </div>

        <div>
          <label className="text-xs font-medium text-slate-700">
            Lien Instagram
          </label>
          <input
            type="text"
            value={settings.instagram}
            onChange={(e) => handleChange("instagram", e.target.value)}
            className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm outline-none focus:border-indigo-500 focus:bg-white"
          />
        </div>

        <div>
          <label className="text-xs font-medium text-slate-700">
            Lien Facebook
          </label>
          <input
            type="text"
            value={settings.facebook}
            onChange={(e) => handleChange("facebook", e.target.value)}
            className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm outline-none focus:border-indigo-500 focus:bg-white"
          />
        </div>

        <div className="sm:col-span-2">
          <label className="text-xs font-medium text-slate-700">
            Wilayas desservies
          </label>
          <select
            multiple
            value={settings.wilayasDesservies}
            onChange={handleWilayasChange}
            className="mt-1 max-h-40 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs outline-none focus:border-indigo-500 focus:bg-white"
          >
            {ALGERIAN_WILAYAS.map((w) => (
              <option key={w} value={w}>
                {w}
              </option>
            ))}
          </select>
          <p className="mt-1 text-[11px] text-slate-400">
            Maintenez CTRL (Windows) ou CMD (Mac) pour sélectionner plusieurs
            wilayas.
          </p>
        </div>

        <div className="sm:col-span-2">
          <label className="text-xs font-medium text-slate-700">
            Message global à afficher sur les pages produits
          </label>
          <textarea
            rows={3}
            value={settings.globalMessage}
            onChange={(e) => handleChange("globalMessage", e.target.value)}
            className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm outline-none focus:border-indigo-500 focus:bg-white"
          />
          <p className="mt-1 text-[11px] text-slate-400">
            Ex : note sur la livraison, les délais ou une promotion générale.
          </p>
        </div>
      </form>
    </div>
  );
}

/* ---------- Chatbot ---------- */

function ChatbotWidget({ storeName }) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: "m1",
      from: "bot",
      text: `Bonjour 👋 Je suis l’assistant Operette pour ${
        storeName || "votre boutique"
      }. Comment puis-je vous aider ?`,
    },
  ]);
  const [input, setInput] = useState("");

  const sendMessage = () => {
    const text = input.trim();
    if (!text) return;
    const userMessage = {
      id: `u-${Date.now()}`,
      from: "user",
      text,
    };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    // Réponse simulée côté client (pas d’appel API réel ici)
    setTimeout(() => {
      const lower = text.toLowerCase();
      let reply =
        "Merci pour votre message. Un membre de l’équipe vous répondra très vite ✨";

      if (lower.includes("prix") || lower.includes("combien")) {
        reply =
          "Les prix sont affichés sur chaque fiche produit en dinars algériens (DA).";
      } else if (
        lower.includes("livraison") ||
        lower.includes("délai") ||
        lower.includes("delai")
      ) {
        reply =
          "La livraison est généralement effectuée en 2 à 5 jours ouvrables selon la wilaya.";
      } else if (
        lower.includes("commande") ||
        lower.includes("commander") ||
        lower.includes("achat")
      ) {
        reply =
          "Pour commander, cliquez sur « Voir le produit » puis sur « Commander maintenant » et remplissez le formulaire.";
      } else if (lower.includes("paiement")) {
        reply =
          "Le paiement se fait à la livraison, directement auprès du livreur.";
      } else {
        const canned = [
          "Je prends note de votre demande, merci 🙏",
          "D’accord, merci pour ces informations.",
          "Parfait, je vous accompagne si vous avez d’autres questions.",
          "Merci, nous faisons le maximum pour vous répondre rapidement.",
        ];
        reply = canned[Math.floor(Math.random() * canned.length)];
      }

      const botMessage = {
        id: `b-${Date.now()}`,
        from: "bot",
        text: reply,
      };
      setMessages((prev) => [...prev, botMessage]);
    }, 400);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="pointer-events-none fixed bottom-4 right-4 z-50 flex flex-col items-end gap-2 sm:bottom-6 sm:right-6">
      {isOpen && (
        <div className="pointer-events-auto flex w-72 flex-col rounded-2xl border border-slate-200 bg-white shadow-xl sm:w-80">
          <div className="flex items-center justify-between rounded-t-2xl bg-slate-900 px-3 py-2.5 text-xs text-slate-100 sm:px-4">
            <div>
              <p className="text-[11px] font-medium uppercase tracking-wide text-slate-300">
                Assistant Operette
              </p>
              <p className="text-[11px] text-slate-300">
                Réponses rapides sur la boutique
              </p>
            </div>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="rounded-full bg-slate-800 px-2 py-1 text-[11px] text-slate-200 hover:bg-slate-700"
            >
              ✕
            </button>
          </div>
          <div className="flex max-h-64 flex-col gap-2 overflow-y-auto px-3 py-2 text-[11px] sm:px-4 sm:py-3 sm:text-xs">
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex ${
                  m.from === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[80%] rounded-2xl px-3 py-2 ${
                    m.from === "user"
                      ? "bg-slate-900 text-slate-50 rounded-br-sm"
                      : "bg-slate-100 text-slate-800 rounded-bl-sm"
                  }`}
                >
                  {m.text}
                </div>
              </div>
            ))}
          </div>
          <div className="border-t border-slate-100 p-2 sm:p-3">
            <div className="flex items-center gap-2 rounded-xl bg-slate-50 px-2 py-1.5">
              <textarea
                rows={1}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Écrire un message..."
                className="max-h-16 flex-1 resize-none bg-transparent text-[11px] outline-none sm:text-xs"
              />
              <button
                type="button"
                onClick={sendMessage}
                className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-slate-900 text-[11px] text-white hover:bg-slate-800"
              >
                ➤
              </button>
            </div>
            <p className="mt-1 text-[9px] text-slate-400">
              Réponses simulées en local pour la démo (aucun appel externe).
            </p>
          </div>
        </div>
      )}

      <button
        type="button"
        onClick={() => setIsOpen((o) => !o)}
        className="pointer-events-auto flex h-12 w-12 items-center justify-center rounded-full bg-slate-900 text-lg text-white shadow-lg shadow-slate-900/20 transition hover:scale-105 hover:bg-slate-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-900 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-50"
      >
        💬
      </button>
    </div>
  );
}
