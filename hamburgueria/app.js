const money = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
});

const whatsappNumber = "5548996495663";
const orderCounterKey = "burguer-next-order-number";

const items = [
  {
    id: "smash-classico",
    name: "Smash Classico",
    category: "burgers",
    price: 28.9,
    image: "https://images.unsplash.com/photo-1571091718767-18b5b1457add?auto=format&fit=crop&w=900&q=80",
    description: "Pao brioche, blend 120g, cheddar, picles e molho da casa.",
  },
  {
    id: "duplo-bacon",
    name: "Duplo Bacon",
    category: "burgers",
    price: 36.9,
    image: "https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=900&q=80",
    description: "Dois smashs, cheddar duplo, bacon crocante e cebola caramelizada.",
  },
  {
    id: "brasa-onion",
    name: "Brasa Onion",
    category: "burgers",
    price: 34.9,
    image: "https://images.unsplash.com/photo-1596662951482-0c4ba74a6df6?auto=format&fit=crop&w=900&q=80",
    description: "Burger alto, queijo prato, onion rings e barbecue defumado.",
  },
  {
    id: "combo-smash",
    name: "Combo Smash",
    category: "combos",
    price: 42.9,
    image: "https://images.unsplash.com/photo-1610614819513-58e34989848b?auto=format&fit=crop&w=900&q=80",
    description: "Smash classico, batata rustica e refrigerante lata.",
  },
  {
    id: "combo-familia",
    name: "Combo Familia",
    category: "combos",
    price: 89.9,
    image: "https://images.unsplash.com/photo-1596662951482-0c4ba74a6df6?auto=format&fit=crop&w=900&q=80",
    description: "Tres burgers, duas batatas e dois refrigerantes.",
  },
  {
    id: "batata-rustica",
    name: "Batata Rustica",
    category: "combos",
    price: 18.9,
    image: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=900&q=80",
    description: "Batata com paprika, sal grosso e maionese verde.",
  },
  {
    id: "refri-lata",
    name: "Refrigerante Lata",
    category: "bebidas",
    price: 7.5,
    image: "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&w=900&q=80",
    description: "Coca-Cola, Guarana ou soda, lata 350ml.",
  },
  {
    id: "cha-limao",
    name: "Cha Gelado Limao",
    category: "bebidas",
    price: 9.9,
    image: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?auto=format&fit=crop&w=900&q=80",
    description: "Cha preto gelado com limao siciliano.",
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

const removableIngredients = [
  "Molho",
  "Cebola",
  "Picles",
  "Salada",
  "Bacon",
  "Queijo",
];

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
    emptyField.focus();
    const label = emptyField.closest(".field")?.querySelector("span")?.textContent || "campo obrigatorio";
    orderMessage.textContent = `Preencha: ${label.replace(" *", "")}.`;
    return false;
  }

  return true;
}

function formatCpf(value) {
  return value
    .replace(/\D/g, "")
    .slice(0, 11)
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
}

function renderMenu() {
  const visibleItems = state.filter === "todos"
    ? items
    : items.filter((item) => item.category === state.filter);

  menuGrid.innerHTML = visibleItems
    .map((item) => `
      <article class="menu-item">
        <img src="${item.image}" alt="${item.name}" loading="lazy" />
        <div class="item-body">
          <div class="item-title">
            <h3>${item.name}</h3>
            <span class="price">${money.format(item.price)}</span>
          </div>
          <p class="description">${item.description}</p>
          <button class="add-button" type="button" data-add="${item.id}">Adicionar</button>
        </div>
      </article>
    `)
    .join("");
}

function getCartEntries() {
  return state.cart.map((cartItem) => {
    const item = items.find((menuItem) => menuItem.id === cartItem.itemId);
    return { ...item, ...cartItem };
  });
}

function calculateTotals() {
  const subtotal = getCartEntries().reduce((sum, item) => sum + item.price * item.quantity, 0);
  const deliveryFee = deliveryMode.value === "entrega" ? 6 : 0;
  return {
    subtotal,
    deliveryFee,
    total: subtotal + deliveryFee,
  };
}

function renderCart() {
  const cartEntries = getCartEntries();

  if (cartEntries.length === 0) {
    cartList.innerHTML = '<p class="empty-cart">Escolha um item do cardapio para comecar.</p>';
  } else {
    cartList.innerHTML = cartEntries
      .map((item) => `
        <div class="cart-row" data-cart-id="${item.cartId}">
          <div class="cart-row-top">
            <strong>${item.name}</strong>
            <span>${money.format(item.price * item.quantity)}</span>
          </div>
          <div class="qty-controls" aria-label="Quantidade de ${item.name}">
            <button class="qty-button" type="button" data-decrease="${item.cartId}" aria-label="Remover um ${item.name}">-</button>
            <span>${item.quantity}</span>
            <button class="qty-button" type="button" data-increase="${item.cartId}" aria-label="Adicionar mais um ${item.name}">+</button>
          </div>
          <div class="item-options">
            <p class="option-title">Especificacao do item</p>
            <div class="ingredient-options">
              ${removableIngredients.map((ingredient) => `
                <label class="check-option">
                  <input type="checkbox" data-ingredient="${ingredient}" ${item.removedIngredients.includes(ingredient) ? "checked" : ""} />
                  Sem ${ingredient.toLowerCase()}
                </label>
              `).join("")}
            </div>
            <textarea class="line-note" data-item-note rows="2" placeholder="Ex: carne ao ponto, molho separado...">${item.note}</textarea>
          </div>
        </div>
      `)
      .join("");
  }

  const totals = calculateTotals();
  subtotalEl.textContent = money.format(totals.subtotal);
  deliveryFeeEl.textContent = money.format(totals.deliveryFee);
  grandTotalEl.textContent = money.format(totals.total);
  checkout.disabled = cartEntries.length === 0;
}

function addItem(id) {
  state.cart.push({
    cartId: state.nextCartId,
    itemId: id,
    quantity: 1,
    removedIngredients: [],
    note: "",
  });
  state.nextCartId += 1;
  orderMessage.textContent = "";
  renderCart();
  focusOrderPanel();
}

function increaseItem(cartId) {
  const cartItem = state.cart.find((item) => item.cartId === cartId);
  if (!cartItem) return;
  cartItem.quantity += 1;
  orderMessage.textContent = "";
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

function updateCartItem(cartId, updates) {
  const cartItem = state.cart.find((item) => item.cartId === cartId);
  if (!cartItem) return;
  Object.assign(cartItem, updates);
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
  const ingredient = event.target.closest("[data-ingredient]");

  if (increase) increaseItem(Number(increase.dataset.increase));
  if (decrease) decreaseItem(Number(decrease.dataset.decrease));
  if (ingredient) {
    const row = ingredient.closest("[data-cart-id]");
    const cartId = Number(row.dataset.cartId);
    const cartItem = state.cart.find((item) => item.cartId === cartId);
    if (!cartItem) return;

    if (ingredient.checked) {
      cartItem.removedIngredients.push(ingredient.dataset.ingredient);
    } else {
      cartItem.removedIngredients = cartItem.removedIngredients.filter((item) => item !== ingredient.dataset.ingredient);
    }
  }
});

cartList.addEventListener("input", (event) => {
  const note = event.target.closest("[data-item-note]");
  if (!note) return;

  const row = note.closest("[data-cart-id]");
  updateCartItem(Number(row.dataset.cartId), { note: note.value });
});

document.querySelector("#clearCart").addEventListener("click", () => {
  state.cart = [];
  orderMessage.textContent = "";
  renderCart();
});

continueOrder.addEventListener("click", returnToMenu);

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
  if (!isCash) {
    changeFor.value = "";
  }
}

deliveryMode.addEventListener("change", updateDeliveryMode);
paymentMethod.addEventListener("change", updatePaymentMode);
customerCpf.addEventListener("input", () => {
  customerCpf.value = formatCpf(customerCpf.value);
});

document.querySelector("[data-add-featured]").addEventListener("click", () => {
  addItem("combo-smash");
  document.querySelector("#pedido").scrollIntoView({ behavior: "smooth", block: "start" });
});

checkout.addEventListener("click", () => {
  const cartEntries = getCartEntries();
  if (cartEntries.length === 0) return;
  if (!validateCustomerFields()) return;

  const orderNumber = reserveOrderNumber();
  const name = customerName.value.trim();
  const cpf = customerCpf.value.trim();
  const isDelivery = deliveryMode.value === "entrega";
  const address = isDelivery
    ? `${street.value.trim()}, ${addressNumber.value.trim()} - ${addressComplement.value.trim()} - ${district.value.trim()}`
    : "Retirada no balcao";
  const reference = isDelivery ? referencePoint.value.trim() : "Nao se aplica";
  const totals = calculateTotals();
  const deliveryLabel = isDelivery ? "Entrega" : "Retirada";
  const details = cartEntries.map((item) => {
    const lineTotal = money.format(item.price * item.quantity);
    const removed = item.removedIngredients.length
      ? `Sem: ${item.removedIngredients.join(", ")}`
      : "Completo";
    const itemNote = item.note.trim() ? `Obs do item: ${item.note.trim()}` : "Obs do item: nenhuma";
    return `- ${item.quantity}x ${item.name}: ${lineTotal}\n  ${removed}\n  ${itemNote}`;
  });
  const extraNotes = notes.value.trim() || "Sem observacoes";
  const payment = paymentMethod.value;
  const change = payment === "Dinheiro" ? `Troco para: ${changeFor.value.trim()}` : "Troco: nao precisa";
  const message = [
    `Ola, quero fazer o pedido ${orderNumber}:`,
    "",
    `Pedido: ${orderNumber}`,
    `Nome: ${name}`,
    `CPF: ${cpf}`,
    `Forma: ${deliveryLabel}`,
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
    `Observacoes: ${extraNotes}`,
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
