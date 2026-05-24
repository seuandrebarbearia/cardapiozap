const money = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
});

const whatsappNumber = "5548996495663";
const orderCounterKey = "acai-next-order-number";
const deliveryTax = 0;
const cupImage = "https://images.pexels.com/photos/5232939/pexels-photo-5232939.jpeg?cs=srgb&dl=pexels-jess-vide-5232939.jpg&fm=jpg";

const sizes = {
  "250ml": { label: "250ml", price: 8 },
  "350ml": { label: "350ml", price: 10 },
  "500ml": { label: "500ml", price: 14 },
  "1l": { label: "1 litro", price: 45 },
};

const complements = [
  { name: "Leite Ninho", price: 3.99 },
  { name: "Nutella", price: 3.99 },
  { name: "Leite condensado", price: 1 },
  { name: "Granola", price: 1.99 },
  { name: "Paçoca", price: 1.99 },
  { name: "Banana", price: 1 },
  { name: "Morango", price: 2.99 },
  { name: "ChocoBall", price: 1.99 },
  { name: "Oreo", price: 2.99 },
  { name: "Creme de Leite Ninho", price: 3.99 },
];

const items = [
  {
    id: "primeiro-em-dobro",
    name: "Primeiro em Dobro",
    category: "primeiro",
    badge: "Promoção relâmpago",
    price: 19.9,
    image: cupImage,
    description: "Primeiro pedido em dobro: escolha 2 açaís de 500ml e pague um preço promocional.",
    fixed: true,
  },
  {
    id: "dois-nutella",
    name: "2 Açaí de Nutella - 500ml",
    category: "promocionais",
    badge: "Promoção",
    price: 29.99,
    image: cupImage,
    description: "Açaí, Nutella, Leite Ninho, leite condensado e morango.",
    fixed: true,
  },
  {
    id: "acai-chocoball",
    name: "Açaí ChocoBall - 500ml",
    category: "montado",
    price: 17,
    image: cupImage,
    description: "Açaí, leite condensado, Leite Ninho e ChocoBall.",
  },
  {
    id: "acai-da-selva",
    name: "Açaí da Casa - 500ml",
    category: "montado",
    badge: "Da casa",
    price: 21,
    image: cupImage,
    description: "Açaí, morango, banana, kiwi, leite condensado, creme de Leite Ninho e granola.",
  },
  {
    id: "acai-nutella",
    name: "Açaí de Nutella - 500ml",
    category: "montado",
    badge: "Mais pedido",
    price: 19,
    image: cupImage,
    description: "Açaí, Nutella, Leite Ninho, leite condensado e morango.",
  },
  {
    id: "acai-oreo",
    name: "Açaí de Oreo - 500ml",
    category: "montado",
    price: 17,
    image: cupImage,
    description: "Açaí, Oreo, Leite Ninho e leite condensado.",
  },
  {
    id: "acai-pacoca",
    name: "Açaí de Paçoca - 500ml",
    category: "montado",
    price: 14.99,
    image: cupImage,
    description: "Açaí, paçoca, leite condensado e Leite Ninho.",
  },
  {
    id: "monte-acai",
    name: "Monte seu Açaí",
    category: "monte",
    badge: "Complementos",
    image: cupImage,
    description: "Escolha o tamanho e adicione os complementos de sua preferência.",
    custom: true,
  },
  {
    id: "suco-natural",
    name: "Suco Natural",
    category: "bebidas",
    price: 9.9,
    image: "https://images.unsplash.com/photo-1511690656952-34342bb7c2f2?auto=format&fit=crop&w=900&q=80",
    description: "Suco gelado de laranja, morango ou abacaxi com hortelã.",
    fixed: true,
  },
];

const state = {
  filter: "todos",
  cart: [],
  nextCartId: 1,
};

const menuGrid = document.querySelector("#menuGrid");
const cartList = document.querySelector("#cartList");
const subtotalEl = document.querySelector("#subtotal");
const deliveryFeeEl = document.querySelector("#deliveryFee");
const grandTotalEl = document.querySelector("#grandTotal");
const deliveryMode = document.querySelector("#deliveryMode");
const orderMessage = document.querySelector("#orderMessage");
const customerName = document.querySelector("#customerName");
const customerCpf = document.querySelector("#customerCpf");
const addressGroup = document.querySelector("#addressGroup");
const street = document.querySelector("#street");
const addressNumber = document.querySelector("#addressNumber");
const addressComplement = document.querySelector("#addressComplement");
const district = document.querySelector("#district");
const referencePoint = document.querySelector("#referencePoint");
const paymentMethod = document.querySelector("#paymentMethod");
const changeGroup = document.querySelector("#changeGroup");
const changeFor = document.querySelector("#changeFor");
const notes = document.querySelector("#notes");
const checkout = document.querySelector("#checkout");
const nextOrderNumber = document.querySelector("#nextOrderNumber");

function formatCpf(value) {
  return value
    .replace(/\D/g, "")
    .slice(0, 11)
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
}

function getNextOrderNumber() {
  const storedNumber = Number(localStorage.getItem(orderCounterKey));
  return Number.isInteger(storedNumber) && storedNumber > 0 ? storedNumber : 1;
}

function formatOrderNumber(number) {
  return `#${String(number).padStart(4, "0")}`;
}

function updateNextOrderNumber() {
  nextOrderNumber.textContent = `Próximo pedido ${formatOrderNumber(getNextOrderNumber())}`;
}

function reserveOrderNumber() {
  const orderNumber = getNextOrderNumber();
  localStorage.setItem(orderCounterKey, String(orderNumber + 1));
  updateNextOrderNumber();
  return formatOrderNumber(orderNumber);
}

function renderMenu() {
  const visibleItems = state.filter === "todos"
    ? items
    : items.filter((item) => item.category === state.filter);

  menuGrid.innerHTML = visibleItems.map((item) => `
    <article class="menu-item">
      <img src="${item.image}" alt="${item.name}" loading="lazy" />
      <div class="item-body">
        ${item.badge ? `<span class="item-badge">${item.badge}</span>` : ""}
        <div class="item-title">
          <h3>${item.name}</h3>
          <span class="price">${item.custom ? "a partir de R$ 8,00" : money.format(item.price)}</span>
        </div>
        <p class="description">${item.description}</p>
        <button class="add-button" type="button" data-add="${item.id}">Adicionar</button>
      </div>
    </article>
  `).join("");
}

function getCartEntries() {
  return state.cart.map((cartItem) => {
    const item = items.find((menuItem) => menuItem.id === cartItem.itemId);
    return { ...item, ...cartItem };
  });
}

function calculateItemPrice(item) {
  if (!item.custom) return item.price * item.quantity;
  const complementTotal = item.complements.reduce((sum, complementName) => {
    const complement = complements.find((option) => option.name === complementName);
    return sum + (complement?.price || 0);
  }, 0);
  return (sizes[item.size].price + complementTotal) * item.quantity;
}

function calculateTotals() {
  const subtotal = getCartEntries().reduce((sum, item) => sum + calculateItemPrice(item), 0);
  const deliveryFee = deliveryMode.value === "entrega" ? deliveryTax : 0;
  return { subtotal, deliveryFee, total: subtotal + deliveryFee };
}

function renderCart() {
  const cartEntries = getCartEntries();

  if (cartEntries.length === 0) {
    cartList.innerHTML = '<p class="empty-cart">Escolha um item para começar.</p>';
  } else {
    cartList.innerHTML = cartEntries.map((item) => `
      <div class="cart-row" data-cart-id="${item.cartId}">
        <div class="cart-row-top">
          <strong>${item.name}</strong>
          <span>${money.format(calculateItemPrice(item))}</span>
        </div>
        <div class="qty-controls">
          <button class="qty-button" type="button" data-decrease="${item.cartId}" aria-label="Remover um ${item.name}">-</button>
          <span>${item.quantity}</span>
          <button class="qty-button" type="button" data-increase="${item.cartId}" aria-label="Adicionar mais um ${item.name}">+</button>
        </div>
        ${item.custom ? `
          <div class="item-options">
            <p class="option-title">Monte seu açaí</p>
            <label class="field">
              <span>Tamanho</span>
              <select data-size>
                ${Object.entries(sizes).map(([value, option]) => `
                  <option value="${value}" ${item.size === value ? "selected" : ""}>${option.label} - ${money.format(option.price)}</option>
                `).join("")}
              </select>
            </label>
            <p class="option-title">Complementos</p>
            <div class="check-grid">
              ${complements.map((complement) => `
                <label class="check-option">
                  <input type="checkbox" data-complement="${complement.name}" ${item.complements.includes(complement.name) ? "checked" : ""} />
                  ${complement.name} + ${money.format(complement.price)}
                </label>
              `).join("")}
            </div>
          </div>
        ` : ""}
        <textarea class="line-note" data-item-note rows="2" placeholder="Alguma observação?">${item.note}</textarea>
      </div>
    `).join("");
  }

  const totals = calculateTotals();
  subtotalEl.textContent = money.format(totals.subtotal);
  deliveryFeeEl.textContent = money.format(totals.deliveryFee);
  grandTotalEl.textContent = money.format(totals.total);
  checkout.disabled = cartEntries.length === 0;
}

function addItem(id) {
  const item = items.find((menuItem) => menuItem.id === id);
  state.cart.push({
    cartId: state.nextCartId,
    itemId: id,
    quantity: 1,
    size: "500ml",
    complements: item.custom ? ["Leite Ninho"] : [],
    note: "",
  });
  state.nextCartId += 1;
  orderMessage.textContent = "";
  renderCart();
}

function updateCartItem(cartId, updates, shouldRender = true) {
  const cartItem = state.cart.find((item) => item.cartId === cartId);
  if (!cartItem) return;
  Object.assign(cartItem, updates);
  if (shouldRender) renderCart();
}

function toggleListValue(list, value, checked) {
  if (checked) return list.includes(value) ? list : [...list, value];
  return list.filter((item) => item !== value);
}

function increaseItem(cartId) {
  const cartItem = state.cart.find((item) => item.cartId === cartId);
  if (!cartItem) return;
  cartItem.quantity += 1;
  renderCart();
}

function decreaseItem(cartId) {
  const cartItem = state.cart.find((item) => item.cartId === cartId);
  if (!cartItem) return;
  if (cartItem.quantity <= 1) {
    state.cart = state.cart.filter((item) => item.cartId !== cartId);
  } else {
    cartItem.quantity -= 1;
  }
  renderCart();
}

function getRequiredFields() {
  const fields = [customerName, customerCpf, paymentMethod];
  if (deliveryMode.value === "entrega") fields.push(street, addressNumber, addressComplement, district, referencePoint);
  if (paymentMethod.value === "Dinheiro") fields.push(changeFor);
  return fields;
}

function validateCustomerFields() {
  const emptyField = getRequiredFields().find((field) => !field.value.trim());
  if (emptyField) {
    const label = emptyField.closest(".field")?.querySelector("span")?.textContent || "campo obrigatório";
    emptyField.focus();
    orderMessage.textContent = `Preencha: ${label.replace(" *", "")}.`;
    return false;
  }
  return true;
}

function updateDeliveryMode() {
  const isDelivery = deliveryMode.value === "entrega";
  addressGroup.classList.toggle("hidden", !isDelivery);
  [street, addressNumber, addressComplement, district, referencePoint].forEach((field) => {
    field.required = isDelivery;
  });
  renderCart();
}

function updatePaymentMode() {
  const isCash = paymentMethod.value === "Dinheiro";
  changeGroup.classList.toggle("hidden", !isCash);
  changeFor.required = isCash;
  if (!isCash) changeFor.value = "";
}

document.querySelector(".filters").addEventListener("click", (event) => {
  const button = event.target.closest("[data-filter]");
  if (!button) return;
  state.filter = button.dataset.filter;
  document.querySelectorAll(".filter").forEach((filterButton) => {
    filterButton.classList.toggle("active", filterButton === button);
  });
  renderMenu();
});

menuGrid.addEventListener("click", (event) => {
  const button = event.target.closest("[data-add]");
  if (!button) return;
  addItem(button.dataset.add);
});

cartList.addEventListener("click", (event) => {
  const increase = event.target.closest("[data-increase]");
  const decrease = event.target.closest("[data-decrease]");
  const complement = event.target.closest("[data-complement]");

  if (increase) increaseItem(Number(increase.dataset.increase));
  if (decrease) decreaseItem(Number(decrease.dataset.decrease));
  if (complement) {
    const row = complement.closest("[data-cart-id]");
    const cartId = Number(row.dataset.cartId);
    const cartItem = state.cart.find((item) => item.cartId === cartId);
    if (!cartItem) return;
    cartItem.complements = toggleListValue(cartItem.complements, complement.dataset.complement, complement.checked);
    renderCart();
  }
});

cartList.addEventListener("change", (event) => {
  const row = event.target.closest("[data-cart-id]");
  if (!row) return;
  if (event.target.matches("[data-size]")) {
    updateCartItem(Number(row.dataset.cartId), { size: event.target.value });
  }
});

cartList.addEventListener("input", (event) => {
  const note = event.target.closest("[data-item-note]");
  if (!note) return;
  const row = note.closest("[data-cart-id]");
  updateCartItem(Number(row.dataset.cartId), { note: note.value }, false);
});

document.querySelector("#clearCart").addEventListener("click", () => {
  state.cart = [];
  orderMessage.textContent = "";
  renderCart();
});

deliveryMode.addEventListener("change", updateDeliveryMode);
paymentMethod.addEventListener("change", updatePaymentMode);
customerCpf.addEventListener("input", () => {
  customerCpf.value = formatCpf(customerCpf.value);
});

checkout.addEventListener("click", () => {
  const cartEntries = getCartEntries();
  if (cartEntries.length === 0) return;
  if (!validateCustomerFields()) return;

  const orderNumber = reserveOrderNumber();
  const isDelivery = deliveryMode.value === "entrega";
  const address = isDelivery
    ? `${street.value.trim()}, ${addressNumber.value.trim()} - ${addressComplement.value.trim()} - ${district.value.trim()}`
    : "Retirada no balcão";
  const reference = isDelivery ? referencePoint.value.trim() : "Não se aplica";
  const totals = calculateTotals();

  const details = cartEntries.map((item) => {
    const config = item.custom
      ? `${sizes[item.size].label}; Complementos: ${item.complements.join(", ") || "sem complementos"}`
      : "Produto pronto";
    const itemNote = item.note.trim() ? `Obs do item: ${item.note.trim()}` : "Obs do item: nenhuma";
    return `- ${item.quantity}x ${item.name}: ${money.format(calculateItemPrice(item))}\n  ${config}\n  ${itemNote}`;
  });

  const payment = paymentMethod.value;
  const change = payment === "Dinheiro" ? `Troco para: ${changeFor.value.trim()}` : "Troco: não precisa";
  const extraNotes = notes.value.trim() || "Sem observações";
  const message = [
    `Olá, quero fazer o pedido ${orderNumber}:`,
    "",
    `Pedido: ${orderNumber}`,
    `Nome: ${customerName.value.trim()}`,
    `CPF: ${customerCpf.value.trim()}`,
    `Forma: ${isDelivery ? "Entrega" : "Retirada"}`,
    `Endereço: ${address}`,
    `Referência: ${reference}`,
    `Pagamento: ${payment}`,
    change,
    "",
    "Itens:",
    ...details,
    "",
    `Subtotal: ${money.format(totals.subtotal)}`,
    `Entrega: ${money.format(totals.deliveryFee)}`,
    `Total: ${money.format(totals.total)}`,
    "",
    `Observações gerais: ${extraNotes}`,
  ].join("\n");

  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
  orderMessage.innerHTML = `${orderNumber} pronto. <a href="${whatsappUrl}" target="_blank" rel="noopener">Abrir WhatsApp</a>`;
  window.location.href = whatsappUrl;
});

renderMenu();
renderCart();
updateNextOrderNumber();
updateDeliveryMode();
updatePaymentMode();
