const WHATSAPP_NUMBER = "5551999999999";
const DELIVERY_FEE = 7;

const categories = ["Todos", "Cervejas", "Destilados", "Sem álcool", "Conveniência", "Tabacaria"];

const products = [
  {
    id: "cerveja-lata-350",
    name: "Cerveja lata 350ml",
    category: "Cervejas",
    price: 4.99,
    description: "Lata gelada para pedido unitário ou complemento do fardo.",
    image: "https://images.pexels.com/photos/11351828/pexels-photo-11351828.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    id: "cerveja-latao-473",
    name: "Cerveja latão 473ml",
    category: "Cervejas",
    price: 6.49,
    description: "Latão gelado, uma das opções mais pedidas na entrega.",
    image: "https://images.pexels.com/photos/11351826/pexels-photo-11351826.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    id: "pack-pilsen",
    name: "Fardo cerveja 12 latas",
    category: "Cervejas",
    price: 59.9,
    description: "Fardo fechado para churrasco, jogo ou encontro.",
    image: "https://images.pexels.com/photos/11351828/pexels-photo-11351828.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    id: "garrafa-600",
    name: "Cerveja garrafa 600ml",
    category: "Cervejas",
    price: 9.99,
    description: "Garrafa 600ml gelada, ideal para dividir.",
    image: "https://images.pexels.com/photos/4955255/pexels-photo-4955255.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    id: "long-neck",
    name: "Long Neck Premium",
    category: "Cervejas",
    price: 8.5,
    description: "Garrafa long neck gelada.",
    image: "https://images.pexels.com/photos/13347485/pexels-photo-13347485.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    id: "vodka",
    name: "Vodka 1L",
    category: "Destilados",
    price: 39.9,
    description: "Opção para drinks e combos.",
    image: "https://images.pexels.com/photos/4167425/pexels-photo-4167425.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    id: "whisky",
    name: "Whisky 1L",
    category: "Destilados",
    price: 89.9,
    description: "Garrafa para presente, eventos e consumo adulto.",
    image: "https://images.pexels.com/photos/1200361/pexels-photo-1200361.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    id: "gin",
    name: "Gin 750ml",
    category: "Destilados",
    price: 64.9,
    description: "Combina com tônica, gelo e frutas.",
    image: "https://images.pexels.com/photos/12163069/pexels-photo-12163069.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    id: "energetico",
    name: "Energético 2L",
    category: "Sem álcool",
    price: 14.9,
    description: "Para combo com destilado ou consumo sem álcool.",
    image: "https://images.pexels.com/photos/11351828/pexels-photo-11351828.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    id: "refrigerante",
    name: "Refrigerante 2L",
    category: "Sem álcool",
    price: 9.99,
    description: "Coca, guaraná ou sabores disponíveis.",
    image: "https://images.pexels.com/photos/12900918/pexels-photo-12900918.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    id: "agua",
    name: "Água mineral 1,5L",
    category: "Sem álcool",
    price: 4.5,
    description: "Água mineral gelada ou natural.",
    image: "https://images.pexels.com/photos/327090/pexels-photo-327090.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    id: "gelo",
    name: "Gelo 5kg",
    category: "Conveniência",
    price: 13.0,
    description: "Saco de gelo para manter as bebidas geladas.",
    image: "https://images.pexels.com/photos/434259/pexels-photo-434259.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    id: "carvao",
    name: "Carvão 4kg",
    category: "Conveniência",
    price: 18.0,
    description: "Carvão para churrasco e eventos.",
    image: "https://images.pexels.com/photos/8021316/pexels-photo-8021316.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    id: "copo-descartavel",
    name: "Copo descartável",
    category: "Conveniência",
    price: 7.5,
    description: "Pacote para festas e encontros.",
    image: "https://images.pexels.com/photos/3900467/pexels-photo-3900467.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    id: "cigarro",
    name: "Cigarro maço",
    category: "Tabacaria",
    price: 12.0,
    description: "Venda somente para maiores de 18 anos.",
    image: "https://images.pexels.com/photos/5328464/pexels-photo-5328464.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    id: "tabaco",
    name: "Tabaco pacote",
    category: "Tabacaria",
    price: 19.9,
    description: "Produto adulto com conferência na entrega.",
    image: "https://images.pexels.com/photos/20528612/pexels-photo-20528612.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    id: "isqueiro",
    name: "Isqueiro",
    category: "Tabacaria",
    price: 5.0,
    description: "Item de conveniência para pedido junto.",
    image: "https://images.pexels.com/photos/10540414/pexels-photo-10540414.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
];

let activeCategory = "Todos";
let searchTerm = "";
let cart = [];

const money = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
});

const els = {
  categoryTabs: document.querySelector("#categoryTabs"),
  productGrid: document.querySelector("#productGrid"),
  searchInput: document.querySelector("#searchInput"),
  cartItems: document.querySelector("#cartItems"),
  orderNumber: document.querySelector("#orderNumber"),
  clearCart: document.querySelector("#clearCart"),
  orderForm: document.querySelector("#orderForm"),
  subtotal: document.querySelector("#subtotal"),
  deliveryFee: document.querySelector("#deliveryFee"),
  total: document.querySelector("#total"),
  addressFields: document.querySelector("#addressFields"),
  paymentMethod: document.querySelector("#paymentMethod"),
  changeField: document.querySelector("#changeField"),
};

function getOrderNumber() {
  const current = Number(localStorage.getItem("distribuidoraOrderNumber") || "142");
  return current;
}

function nextOrderNumber() {
  const next = getOrderNumber() + 1;
  localStorage.setItem("distribuidoraOrderNumber", String(next));
  return next;
}

function formatOrderNumber(number) {
  return `Pedido #${String(number).padStart(3, "0")}`;
}

function renderCategories() {
  els.categoryTabs.innerHTML = categories
    .map(
      (category) => `
        <button class="${category === activeCategory ? "active" : ""}" data-category="${category}">
          ${category}
        </button>
      `,
    )
    .join("");
}

function filteredProducts() {
  return products.filter((product) => {
    const matchesCategory = activeCategory === "Todos" || product.category === activeCategory;
    const haystack = `${product.name} ${product.category} ${product.description}`.toLowerCase();
    return matchesCategory && haystack.includes(searchTerm.toLowerCase());
  });
}

function renderProducts() {
  const items = filteredProducts();

  els.productGrid.innerHTML = items.length
    ? items
        .map(
          (product) => `
            <article class="product-card">
              <img
                src="${product.image}"
                data-fallback="${productFallback(product)}"
                alt="${product.name}"
                loading="lazy"
                referrerpolicy="no-referrer"
                onerror="this.onerror=null;this.src=this.dataset.fallback"
              />
              <div>
                <h3>${product.name}</h3>
                <p>${product.description}</p>
                <div class="product-meta">
                  <span class="price">${money.format(product.price)}</span>
                  <button class="add-button" type="button" data-add="${product.id}" aria-label="Adicionar ${product.name}">+</button>
                </div>
              </div>
            </article>
          `,
        )
        .join("")
    : `<p class="empty-cart">Nenhum produto encontrado.</p>`;
}

function productFallback(product) {
  const visual = getVisualType(product);
  const svg = productSvg(product.name, visual);
  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
}

function getVisualType(product) {
  if (product.id.includes("pack")) return "pack";
  if (product.id.includes("lata")) return "can";
  if (product.id.includes("garrafa") || product.id.includes("long") || product.category === "Destilados") return "bottle";
  if (product.id.includes("gelo")) return "ice";
  if (product.id.includes("carvao")) return "charcoal";
  if (product.id.includes("copo")) return "cups";
  if (product.id.includes("cigarro") || product.id.includes("tabaco")) return "pack";
  if (product.id.includes("isqueiro")) return "lighter";
  return "bottle";
}

function productSvg(name, visual) {
  const cleanName = name.replace(/[<>&"]/g, "");
  const shapes = {
    can: `
      <ellipse cx="300" cy="118" rx="92" ry="30" fill="#f8f8f8"/>
      <rect x="208" y="118" width="184" height="330" rx="42" fill="#d82920"/>
      <rect x="230" y="178" width="140" height="190" rx="18" fill="#fff3d2"/>
      <ellipse cx="300" cy="448" rx="92" ry="30" fill="#9b1d18"/>
      <rect x="246" y="86" width="108" height="28" rx="12" fill="#c8ccd2"/>
      <circle cx="300" cy="273" r="46" fill="#f6b93b"/>
    `,
    bottle: `
      <rect x="264" y="72" width="72" height="120" rx="18" fill="#4b2316"/>
      <rect x="238" y="172" width="124" height="296" rx="48" fill="#6f351d"/>
      <rect x="252" y="258" width="96" height="118" rx="12" fill="#f8df91"/>
      <rect x="272" y="52" width="56" height="32" rx="8" fill="#e4b64d"/>
      <path d="M248 185c34 20 70 20 104 0" fill="none" stroke="#f7c95f" stroke-width="10"/>
    `,
    pack: `
      <rect x="150" y="198" width="300" height="206" rx="22" fill="#f3b22f"/>
      <rect x="180" y="168" width="240" height="52" rx="14" fill="#d82920"/>
      <rect x="190" y="236" width="220" height="112" rx="16" fill="#fff5da"/>
      <rect x="170" y="404" width="260" height="28" rx="12" fill="#b87913"/>
      <path d="M180 168l-30 30h300l-30-30z" fill="#ffd36b"/>
    `,
    ice: `
      <rect x="168" y="150" width="264" height="292" rx="38" fill="#dff7ff" opacity=".86"/>
      <path d="M210 198h180v200H210z" fill="#ffffff" opacity=".45"/>
      <circle cx="248" cy="265" r="36" fill="#aee8ff"/>
      <circle cx="330" cy="330" r="46" fill="#bff0ff"/>
      <circle cx="286" cy="382" r="28" fill="#85d8f5"/>
    `,
    charcoal: `
      <rect x="170" y="126" width="260" height="330" rx="28" fill="#3a2f28"/>
      <rect x="202" y="190" width="196" height="112" rx="16" fill="#f4eee5"/>
      <circle cx="228" cy="360" r="34" fill="#111"/>
      <circle cx="300" cy="380" r="42" fill="#222"/>
      <circle cx="370" cy="354" r="30" fill="#171717"/>
      <path d="M210 122h180l40 74H170z" fill="#6d5542"/>
    `,
    cups: `
      <path d="M210 180h92l-18 252h-56z" fill="#f3f7fb" opacity=".9"/>
      <path d="M302 160h102l-20 272h-62z" fill="#ffffff" opacity=".78"/>
      <ellipse cx="256" cy="180" rx="48" ry="14" fill="#d9e1ea"/>
      <ellipse cx="353" cy="160" rx="52" ry="15" fill="#d9e1ea"/>
    `,
    lighter: `
      <rect x="250" y="186" width="100" height="244" rx="22" fill="#1f8f53"/>
      <rect x="262" y="144" width="76" height="58" rx="12" fill="#d7dce2"/>
      <rect x="282" y="112" width="36" height="44" rx="10" fill="#333"/>
      <path d="M300 80c32 38 8 58 0 74c-10-20-34-34 0-74z" fill="#f6b93b"/>
    `,
  };

  return `
    <svg xmlns="http://www.w3.org/2000/svg" width="600" height="600" viewBox="0 0 600 600">
      <defs>
        <linearGradient id="bg" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0" stop-color="#fff8ec"/>
          <stop offset="1" stop-color="#ead5b8"/>
        </linearGradient>
        <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="18" stdDeviation="18" flood-color="#4b2316" flood-opacity=".22"/>
        </filter>
      </defs>
      <rect width="600" height="600" fill="url(#bg)"/>
      <g filter="url(#shadow)">${shapes[visual]}</g>
      <text x="300" y="520" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-size="28" font-weight="800" fill="#211a16">${cleanName}</text>
      <text x="300" y="552" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-size="18" font-weight="700" fill="#981f18">Imagem demonstrativa</text>
    </svg>
  `;
}

function addToCart(productId) {
  const product = products.find((item) => item.id === productId);
  const existing = cart.find((item) => item.id === productId);

  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1, observation: "" });
  }

  renderCart();
  focusCartItem(productId);
}

function updateQuantity(productId, direction) {
  cart = cart
    .map((item) => (item.id === productId ? { ...item, quantity: item.quantity + direction } : item))
    .filter((item) => item.quantity > 0);
  renderCart();
}

function updateObservation(productId, value) {
  const item = cart.find((cartItem) => cartItem.id === productId);
  if (item) item.observation = value;
}

function isPickup() {
  return new FormData(els.orderForm).get("fulfillment") === "pickup";
}

function calculateTotals() {
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const delivery = isPickup() ? 0 : DELIVERY_FEE;
  return { subtotal, delivery, total: subtotal + delivery };
}

function renderCart() {
  els.orderNumber.textContent = formatOrderNumber(getOrderNumber());

  if (!cart.length) {
    els.cartItems.innerHTML = `<p class="empty-cart">Adicione produtos para montar o pedido.</p>`;
  } else {
    els.cartItems.innerHTML = cart
      .map(
        (item) => `
          <div class="cart-item" data-cart-item="${item.id}">
            <div class="cart-item-top">
              <div>
                <h3>${item.name}</h3>
                <small>${money.format(item.price)} cada</small>
              </div>
              <strong>${money.format(item.price * item.quantity)}</strong>
            </div>
            <div class="qty-row">
              <div class="qty-controls">
                <button type="button" data-qty="${item.id}" data-direction="-1">−</button>
                <strong>${item.quantity}</strong>
                <button type="button" data-qty="${item.id}" data-direction="1">+</button>
              </div>
            </div>
            <textarea data-observation="${item.id}" placeholder="Observação do item">${item.observation}</textarea>
          </div>
        `,
      )
      .join("");
  }

  const totals = calculateTotals();
  els.subtotal.textContent = money.format(totals.subtotal);
  els.deliveryFee.textContent = money.format(totals.delivery);
  els.total.textContent = money.format(totals.total);
}

function focusCartItem(productId) {
  const cartItem = document.querySelector(`[data-cart-item="${productId}"]`);
  const target = document.querySelector("#checkout");

  if (!target || !cartItem) return;

  smoothScrollToElement(target);
  window.setTimeout(() => {
    cartItem.classList.add("cart-item-highlight");
    window.setTimeout(() => cartItem.classList.remove("cart-item-highlight"), 1400);
  }, 520);
}

function smoothScrollToElement(element) {
  const headerOffset = 104;
  const top = element.getBoundingClientRect().top + window.scrollY - headerOffset;
  window.scrollTo({ top, behavior: "smooth" });
}

function toggleFulfillment() {
  const pickup = isPickup();
  els.addressFields.classList.toggle("hidden", pickup);
  els.addressFields.querySelectorAll("input").forEach((input) => {
    input.required = !pickup && ["street", "number", "district", "reference"].includes(input.name);
  });
  renderCart();
}

function togglePayment() {
  const isCash = els.paymentMethod.value === "Dinheiro";
  els.changeField.classList.toggle("hidden", !isCash);
  els.changeField.querySelector("input").required = isCash;
}

function buildWhatsAppMessage(orderNumber, data, totals) {
  const fulfillment = data.get("fulfillment") === "pickup" ? "Retirada no balcão" : "Entrega";
  const address =
    data.get("fulfillment") === "pickup"
      ? "Cliente vai retirar no balcão"
      : `${data.get("street")}, ${data.get("number")} - ${data.get("district")}
Complemento: ${data.get("complement") || "Não informado"}
Referência: ${data.get("reference")}`;

  const items = cart
    .map((item) => {
      const observation = item.observation ? `\n   Obs: ${item.observation}` : "";
      return `- ${item.quantity}x ${item.name} (${money.format(item.price * item.quantity)})${observation}`;
    })
    .join("\n");

  const change = data.get("payment") === "Dinheiro" ? `\nTroco para: ${data.get("changeFor")}` : "";
  const notes = data.get("notes") ? `\nObservações gerais: ${data.get("notes")}` : "";

  return `Olá! Quero fazer um pedido na Distribuidora Express.

${formatOrderNumber(orderNumber)}

Cliente: ${data.get("customerName")}
CPF: ${data.get("cpf")}
Recebimento: ${fulfillment}
Endereço: ${address}

Itens:
${items}

Pagamento: ${data.get("payment")}${change}

Subtotal: ${money.format(totals.subtotal)}
Entrega: ${money.format(totals.delivery)}
Total: ${money.format(totals.total)}
${notes}

Confirmo que tenho 18 anos ou mais.`;
}

function submitOrder(event) {
  event.preventDefault();

  if (!cart.length) {
    alert("Adicione pelo menos um produto ao pedido.");
    return;
  }

  if (!els.orderForm.reportValidity()) return;

  const data = new FormData(els.orderForm);
  const totals = calculateTotals();
  const orderNumber = nextOrderNumber();
  const message = buildWhatsAppMessage(orderNumber, data, totals);
  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

  window.open(url, "_blank", "noopener");
  cart = [];
  els.orderForm.reset();
  toggleFulfillment();
  togglePayment();
  renderCart();
}

function bindEvents() {
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (event) => {
      const target = document.querySelector(link.getAttribute("href"));
      if (!target) return;
      event.preventDefault();
      smoothScrollToElement(target);
      history.replaceState(null, "", link.getAttribute("href"));
    });
  });

  els.categoryTabs.addEventListener("click", (event) => {
    const button = event.target.closest("[data-category]");
    if (!button) return;
    activeCategory = button.dataset.category;
    renderCategories();
    renderProducts();
  });

  els.productGrid.addEventListener("click", (event) => {
    const button = event.target.closest("[data-add]");
    if (button) addToCart(button.dataset.add);
  });

  els.searchInput.addEventListener("input", (event) => {
    searchTerm = event.target.value;
    renderProducts();
  });

  els.cartItems.addEventListener("click", (event) => {
    const button = event.target.closest("[data-qty]");
    if (!button) return;
    updateQuantity(button.dataset.qty, Number(button.dataset.direction));
  });

  els.cartItems.addEventListener("input", (event) => {
    if (!event.target.matches("[data-observation]")) return;
    updateObservation(event.target.dataset.observation, event.target.value);
  });

  els.orderForm.addEventListener("change", (event) => {
    if (event.target.name === "fulfillment") toggleFulfillment();
    if (event.target.name === "payment") togglePayment();
  });

  els.clearCart.addEventListener("click", () => {
    cart = [];
    renderCart();
  });

  els.orderForm.addEventListener("submit", submitOrder);
}

function init() {
  renderCategories();
  renderProducts();
  toggleFulfillment();
  togglePayment();
  renderCart();
  bindEvents();
}

init();
