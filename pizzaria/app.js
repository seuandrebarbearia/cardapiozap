const money = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
});

const whatsappNumber = "5548996495663";
const orderCounterKey = "pizzaria-next-order-number";
const deliveryTax = 8;

const sizeOptions = {
  pequena: { label: "Pequena", multiplier: 0.82 },
  media: { label: "Media", multiplier: 1 },
  grande: { label: "Grande", multiplier: 1.25 },
  familia: { label: "Familia", multiplier: 1.55 },
};

const crustOptions = {
  sem: { label: "Sem borda recheada", price: 0 },
  catupiry: { label: "Borda de catupiry", price: 8 },
  cheddar: { label: "Borda de cheddar", price: 8 },
  chocolate: { label: "Borda de chocolate", price: 10 },
};

const items = [
  {
    id: "marguerita",
    name: "Marguerita",
    category: "tradicionais",
    price: 44.9,
    image: "https://images.unsplash.com/photo-1598023696416-0193a0bcd302?auto=format&fit=crop&w=900&q=80",
    description: "Molho de tomate, mussarela, tomate fresco e manjericao.",
  },
  {
    id: "calabresa",
    name: "Calabresa",
    category: "tradicionais",
    price: 42.9,
    image: "https://images.unsplash.com/photo-1628840042765-356cda07504e?auto=format&fit=crop&w=900&q=80",
    description: "Calabresa fatiada, cebola roxa, mussarela e oregano.",
  },
  {
    id: "frango-catupiry",
    name: "Frango com Catupiry",
    category: "tradicionais",
    price: 48.9,
    image: "https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?auto=format&fit=crop&w=900&q=80",
    description: "Frango desfiado, catupiry, mussarela e milho.",
  },
  {
    id: "portuguesa",
    name: "Portuguesa",
    category: "especiais",
    price: 52.9,
    image: "https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?auto=format&fit=crop&w=900&q=80",
    description: "Presunto, ovos, cebola, azeitona, ervilha e mussarela.",
  },
  {
    id: "quatro-queijos",
    name: "Quatro Queijos",
    category: "especiais",
    price: 54.9,
    image: "https://images.unsplash.com/photo-1628840042765-356cda07504e?auto=format&fit=crop&w=900&q=80",
    description: "Mussarela, parmesao, provolone e gorgonzola.",
  },
  {
    id: "chocolate-morango",
    name: "Chocolate com Morango",
    category: "doces",
    price: 49.9,
    image: "https://images.unsplash.com/photo-1598023696416-0193a0bcd302?auto=format&fit=crop&w=900&q=80",
    description: "Chocolate cremoso, morangos e leite condensado.",
  },
  {
    id: "refri-2l",
    name: "Refrigerante 2L",
    category: "bebidas",
    price: 14.9,
    image: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?auto=format&fit=crop&w=900&q=80",
    description: "Coca-Cola, Guarana ou soda 2 litros.",
    noPizzaOptions: true,
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
const orderPanel = document.querySelector("#pedido");
const continueOrder = document.querySelector("#continueOrder");

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
  nextOrderNumber.textContent = `Proximo pedido ${formatOrderNumber(getNextOrderNumber())}`;
}

function focusOrderPanel() {
  orderPanel.scrollIntoView({ behavior: "smooth", block: "start" });
  orderPanel.classList.add("order-focus");
  window.setTimeout(() => orderPanel.classList.remove("order-focus"), 1600);
}

function returnToMenu() {
  document.querySelector("#cardapio").scrollIntoView({ behavior: "smooth", block: "start" });
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
        <div class="item-title">
          <h3>${item.name}</h3>
          <span class="price">a partir de ${money.format(item.price)}</span>
        </div>
        <p class="description">${item.description}</p>
        <button class="add-button" type="button" data-add="${item.id}">Adicionar</button>
      </div>
    </article>
  `).join("");
}

function getPizzaItems() {
  return items.filter((item) => !item.noPizzaOptions);
}

function calculateItemPrice(item) {
  if (item.noPizzaOptions) return item.price * item.quantity;
  const size = sizeOptions[item.size];
  const crust = crustOptions[item.crust];
  return ((item.price * size.multiplier) + crust.price) * item.quantity;
}

function getCartEntries() {
  return state.cart.map((cartItem) => {
    const item = items.find((menuItem) => menuItem.id === cartItem.itemId);
    return { ...item, ...cartItem };
  });
}

function calculateTotals() {
  const subtotal = getCartEntries().reduce((sum, item) => sum + calculateItemPrice(item), 0);
  const deliveryFee = deliveryMode.value === "entrega" ? deliveryTax : 0;
  return {
    subtotal,
    deliveryFee,
    total: subtotal + deliveryFee,
  };
}

function renderCart() {
  const cartEntries = getCartEntries();

  if (cartEntries.length === 0) {
    cartList.innerHTML = '<p class="empty-cart">Escolha uma pizza para comecar.</p>';
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
        ${item.noPizzaOptions ? "" : `
          <div class="pizza-options">
            <p class="option-title">Configuracao da pizza</p>
            <label class="field">
              <span>Tamanho</span>
              <select data-size>
                ${Object.entries(sizeOptions).map(([value, option]) => `
                  <option value="${value}" ${item.size === value ? "selected" : ""}>${option.label}</option>
                `).join("")}
              </select>
            </label>
            <label class="field">
              <span>Borda recheada</span>
              <select data-crust>
                ${Object.entries(crustOptions).map(([value, option]) => `
                  <option value="${value}" ${item.crust === value ? "selected" : ""}>${option.label}${option.price ? ` + ${money.format(option.price)}` : ""}</option>
                `).join("")}
              </select>
            </label>
            <label class="check-option">
              <input type="checkbox" data-half-half ${item.halfHalf ? "checked" : ""} />
              Meio a meio
            </label>
            <label class="field ${item.halfHalf ? "" : "hidden"}">
              <span>Segundo sabor</span>
              <select data-second-flavor>
                ${getPizzaItems().map((pizza) => `
                  <option value="${pizza.id}" ${item.secondFlavorId === pizza.id ? "selected" : ""}>${pizza.name}</option>
                `).join("")}
              </select>
            </label>
            <textarea class="line-note" data-item-note rows="2" placeholder="Ex: metade calabresa, sem cebola, bem assada...">${item.note}</textarea>
          </div>
        `}
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
    size: item.noPizzaOptions ? "media" : "media",
    crust: "sem",
    halfHalf: false,
    secondFlavorId: id,
    note: "",
  });
  state.nextCartId += 1;
  orderMessage.textContent = "";
  renderCart();
  focusOrderPanel();
}

function updateCartItem(cartId, updates) {
  const cartItem = state.cart.find((item) => item.cartId === cartId);
  if (!cartItem) return;
  Object.assign(cartItem, updates);
  renderCart();
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
  if (deliveryMode.value === "entrega") {
    fields.push(street, addressNumber, addressComplement, district, referencePoint);
  }
  if (paymentMethod.value === "Dinheiro") {
    fields.push(changeFor);
  }
  return fields;
}

function validateCustomerFields() {
  const emptyField = getRequiredFields().find((field) => !field.value.trim());
  if (emptyField) {
    const label = emptyField.closest(".field")?.querySelector("span")?.textContent || "campo obrigatorio";
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
  const halfHalf = event.target.closest("[data-half-half]");

  if (increase) increaseItem(Number(increase.dataset.increase));
  if (decrease) decreaseItem(Number(decrease.dataset.decrease));
  if (halfHalf) {
    const row = halfHalf.closest("[data-cart-id]");
    updateCartItem(Number(row.dataset.cartId), { halfHalf: halfHalf.checked });
  }
});

cartList.addEventListener("change", (event) => {
  const row = event.target.closest("[data-cart-id]");
  if (!row) return;
  const cartId = Number(row.dataset.cartId);

  if (event.target.matches("[data-size]")) {
    updateCartItem(cartId, { size: event.target.value });
  }
  if (event.target.matches("[data-crust]")) {
    updateCartItem(cartId, { crust: event.target.value });
  }
  if (event.target.matches("[data-second-flavor]")) {
    updateCartItem(cartId, { secondFlavorId: event.target.value });
  }
});

cartList.addEventListener("input", (event) => {
  const note = event.target.closest("[data-item-note]");
  if (!note) return;
  const row = note.closest("[data-cart-id]");
  const cartItem = state.cart.find((item) => item.cartId === Number(row.dataset.cartId));
  if (cartItem) cartItem.note = note.value;
});

document.querySelector("#clearCart").addEventListener("click", () => {
  state.cart = [];
  orderMessage.textContent = "";
  renderCart();
});

continueOrder.addEventListener("click", returnToMenu);

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
    : "Retirada no balcao";
  const reference = isDelivery ? referencePoint.value.trim() : "Nao se aplica";
  const totals = calculateTotals();

  const details = cartEntries.map((item) => {
    const secondFlavor = items.find((menuItem) => menuItem.id === item.secondFlavorId);
    const config = item.noPizzaOptions
      ? "Bebida/acompanhamento"
      : `${sizeOptions[item.size].label}, ${crustOptions[item.crust].label}, ${
          item.halfHalf ? `meio a meio com ${secondFlavor?.name || item.name}` : "sabor unico"
        }`;
    const itemNote = item.note.trim() ? `Obs do item: ${item.note.trim()}` : "Obs do item: nenhuma";
    return `- ${item.quantity}x ${item.name}: ${money.format(calculateItemPrice(item))}\n  ${config}\n  ${itemNote}`;
  });

  const payment = paymentMethod.value;
  const change = payment === "Dinheiro" ? `Troco para: ${changeFor.value.trim()}` : "Troco: nao precisa";
  const extraNotes = notes.value.trim() || "Sem observacoes";
  const message = [
    `Ola, quero fazer o pedido ${orderNumber}:`,
    "",
    `Pedido: ${orderNumber}`,
    `Nome: ${customerName.value.trim()}`,
    `CPF: ${customerCpf.value.trim()}`,
    `Forma: ${isDelivery ? "Entrega" : "Retirada"}`,
    `Endereco: ${address}`,
    `Referencia: ${reference}`,
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
    `Observacoes gerais: ${extraNotes}`,
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
