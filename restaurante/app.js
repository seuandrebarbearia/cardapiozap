const money = new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" });
const whatsappNumber = "5548996495663";
const orderCounterKey = "restaurante-next-order-number";
const deliveryTax = 6;
const sides = ["Arroz", "Feijão", "Salada", "Batata frita", "Farofa"];

const items = [
  { id: "pf-bife", name: "PF Bife Acebolado", category: "pf", price: 24.9, image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=900&q=80", description: "Arroz, feijão, bife acebolado, salada e batata frita." },
  { id: "pf-frango", name: "PF Frango Grelhado", category: "pf", price: 22.9, image: "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&w=900&q=80", description: "Arroz, feijão, frango grelhado, salada e farofa." },
  { id: "pf-parmegiana", name: "PF Parmegiana", category: "pf", price: 29.9, image: "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&w=900&q=80", description: "Filé à parmegiana, arroz, fritas e salada simples." },
  { id: "ala-bife", name: "Ala Minuta de Bife", category: "alaminuta", price: 32.9, image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=900&q=80", description: "Bife, arroz, ovo, fritas, salada e feijão separado." },
  { id: "ala-frango", name: "Ala Minuta de Frango", category: "alaminuta", price: 30.9, image: "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&w=900&q=80", description: "Frango, arroz, ovo, fritas, salada e feijão separado." },
  { id: "marmita-media", name: "Marmita Média", category: "marmitas", price: 18.9, image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=900&q=80", description: "Arroz, feijão, proteína do dia, salada e acompanhamento." },
  { id: "marmita-grande", name: "Marmita Grande", category: "marmitas", price: 23.9, image: "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&w=900&q=80", description: "Porção maior com arroz, feijão, proteína, salada e acompanhamento." },
  { id: "refri-lata", name: "Refrigerante Lata", category: "bebidas", price: 7, image: "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&w=900&q=80", description: "Coca-Cola, Guaraná ou soda 350ml.", noOptions: true },
];

const state = { filter: "todos", cart: [], nextCartId: 1 };
const $ = (selector) => document.querySelector(selector);
const menuGrid = $("#menuGrid");
const cartList = $("#cartList");
const subtotalEl = $("#subtotal");
const deliveryFeeEl = $("#deliveryFee");
const grandTotalEl = $("#grandTotal");
const deliveryMode = $("#deliveryMode");
const orderMessage = $("#orderMessage");
const customerName = $("#customerName");
const customerCpf = $("#customerCpf");
const addressGroup = $("#addressGroup");
const street = $("#street");
const addressNumber = $("#addressNumber");
const addressComplement = $("#addressComplement");
const district = $("#district");
const referencePoint = $("#referencePoint");
const paymentMethod = $("#paymentMethod");
const changeGroup = $("#changeGroup");
const changeFor = $("#changeFor");
const notes = $("#notes");
const checkout = $("#checkout");
const nextOrderNumber = $("#nextOrderNumber");
const orderPanel = $("#pedido");
const continueOrder = $("#continueOrder");

function formatCpf(value) {
  return value.replace(/\D/g, "").slice(0, 11).replace(/(\d{3})(\d)/, "$1.$2").replace(/(\d{3})(\d)/, "$1.$2").replace(/(\d{3})(\d{1,2})$/, "$1-$2");
}
function getNextOrderNumber() {
  const storedNumber = Number(localStorage.getItem(orderCounterKey));
  return Number.isInteger(storedNumber) && storedNumber > 0 ? storedNumber : 1;
}
function formatOrderNumber(number) { return `#${String(number).padStart(4, "0")}`; }
function updateNextOrderNumber() { nextOrderNumber.textContent = `Próximo pedido ${formatOrderNumber(getNextOrderNumber())}`; }
function focusOrderPanel() {
  orderPanel.scrollIntoView({ behavior: "smooth", block: "start" });
  orderPanel.classList.add("order-focus");
  window.setTimeout(() => orderPanel.classList.remove("order-focus"), 1600);
}
function returnToMenu() { $("#cardapio").scrollIntoView({ behavior: "smooth", block: "start" }); }
function reserveOrderNumber() {
  const orderNumber = getNextOrderNumber();
  localStorage.setItem(orderCounterKey, String(orderNumber + 1));
  updateNextOrderNumber();
  return formatOrderNumber(orderNumber);
}
function renderMenu() {
  const visibleItems = state.filter === "todos" ? items : items.filter((item) => item.category === state.filter);
  menuGrid.innerHTML = visibleItems.map((item) => `
    <article class="menu-item">
      <img src="${item.image}" alt="${item.name}" loading="lazy" />
      <div class="item-body">
        <div class="item-title"><h3>${item.name}</h3><span class="price">${money.format(item.price)}</span></div>
        <p class="description">${item.description}</p>
        <button class="add-button" type="button" data-add="${item.id}">Adicionar</button>
      </div>
    </article>
  `).join("");
}
function getCartEntries() {
  return state.cart.map((cartItem) => ({ ...items.find((menuItem) => menuItem.id === cartItem.itemId), ...cartItem }));
}
function calculateTotals() {
  const subtotal = getCartEntries().reduce((sum, item) => sum + item.price * item.quantity, 0);
  const deliveryFee = deliveryMode.value === "entrega" ? deliveryTax : 0;
  return { subtotal, deliveryFee, total: subtotal + deliveryFee };
}
function renderCart() {
  const cartEntries = getCartEntries();
  if (cartEntries.length === 0) {
    cartList.innerHTML = '<p class="empty-cart">Escolha um prato para começar.</p>';
  } else {
    cartList.innerHTML = cartEntries.map((item) => `
      <div class="cart-row" data-cart-id="${item.cartId}">
        <div class="cart-row-top"><strong>${item.name}</strong><span>${money.format(item.price * item.quantity)}</span></div>
        <div class="qty-controls">
          <button class="qty-button" type="button" data-decrease="${item.cartId}">-</button><span>${item.quantity}</span><button class="qty-button" type="button" data-increase="${item.cartId}">+</button>
        </div>
        ${item.noOptions ? "" : `<div class="item-options"><p class="option-title">Ajustes do prato</p><div class="check-grid">${sides.map((side) => `<label class="check-option"><input type="checkbox" data-remove-side="${side}" ${item.removeSides.includes(side) ? "checked" : ""} />Sem ${side.toLowerCase()}</label>`).join("")}</div></div>`}
        <textarea class="line-note" data-item-note rows="2" placeholder="Ex: feijão separado, carne bem passada, sem salada...">${item.note}</textarea>
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
  state.cart.push({ cartId: state.nextCartId, itemId: id, quantity: 1, removeSides: [], note: "" });
  state.nextCartId += 1;
  orderMessage.textContent = "";
  renderCart();
  focusOrderPanel();
}
function toggleListValue(list, value, checked) {
  if (checked) return list.includes(value) ? list : [...list, value];
  return list.filter((item) => item !== value);
}
function getRequiredFields() {
  const fields = [customerName, customerCpf, paymentMethod];
  if (deliveryMode.value === "entrega") fields.push(street, addressNumber, addressComplement, district, referencePoint);
  if (paymentMethod.value === "Dinheiro") fields.push(changeFor);
  return fields;
}
function validateCustomerFields() {
  const emptyField = getRequiredFields().find((field) => !field.value.trim());
  if (!emptyField) return true;
  const label = emptyField.closest(".field")?.querySelector("span")?.textContent || "campo obrigatório";
  emptyField.focus();
  orderMessage.textContent = `Preencha: ${label.replace(" *", "")}.`;
  return false;
}
function updateDeliveryMode() {
  const isDelivery = deliveryMode.value === "entrega";
  addressGroup.classList.toggle("hidden", !isDelivery);
  [street, addressNumber, addressComplement, district, referencePoint].forEach((field) => { field.required = isDelivery; });
  renderCart();
}
function updatePaymentMode() {
  const isCash = paymentMethod.value === "Dinheiro";
  changeGroup.classList.toggle("hidden", !isCash);
  changeFor.required = isCash;
  if (!isCash) changeFor.value = "";
}

$(".filters").addEventListener("click", (event) => {
  const button = event.target.closest("[data-filter]");
  if (!button) return;
  state.filter = button.dataset.filter;
  document.querySelectorAll(".filter").forEach((filterButton) => filterButton.classList.toggle("active", filterButton === button));
  renderMenu();
});
menuGrid.addEventListener("click", (event) => {
  const button = event.target.closest("[data-add]");
  if (button) addItem(button.dataset.add);
});
cartList.addEventListener("click", (event) => {
  const increase = event.target.closest("[data-increase]");
  const decrease = event.target.closest("[data-decrease]");
  const side = event.target.closest("[data-remove-side]");
  if (increase) state.cart.find((item) => item.cartId === Number(increase.dataset.increase)).quantity += 1;
  if (decrease) {
    const cartId = Number(decrease.dataset.decrease);
    const cartItem = state.cart.find((item) => item.cartId === cartId);
    if (cartItem.quantity <= 1) state.cart = state.cart.filter((item) => item.cartId !== cartId);
    else cartItem.quantity -= 1;
  }
  if (side) {
    const cartItem = state.cart.find((item) => item.cartId === Number(side.closest("[data-cart-id]").dataset.cartId));
    cartItem.removeSides = toggleListValue(cartItem.removeSides, side.dataset.removeSide, side.checked);
  }
  renderCart();
});
cartList.addEventListener("input", (event) => {
  const note = event.target.closest("[data-item-note]");
  if (!note) return;
  const cartItem = state.cart.find((item) => item.cartId === Number(note.closest("[data-cart-id]").dataset.cartId));
  cartItem.note = note.value;
});
$("#clearCart").addEventListener("click", () => { state.cart = []; orderMessage.textContent = ""; renderCart(); });
continueOrder.addEventListener("click", returnToMenu);
$("[data-add-featured]").addEventListener("click", () => { addItem("pf-bife"); $("#pedido").scrollIntoView({ behavior: "smooth", block: "start" }); });
deliveryMode.addEventListener("change", updateDeliveryMode);
paymentMethod.addEventListener("change", updatePaymentMode);
customerCpf.addEventListener("input", () => { customerCpf.value = formatCpf(customerCpf.value); });
checkout.addEventListener("click", () => {
  const cartEntries = getCartEntries();
  if (cartEntries.length === 0 || !validateCustomerFields()) return;
  const orderNumber = reserveOrderNumber();
  const isDelivery = deliveryMode.value === "entrega";
  const address = isDelivery ? `${street.value.trim()}, ${addressNumber.value.trim()} - ${addressComplement.value.trim()} - ${district.value.trim()}` : "Retirada no balcão";
  const reference = isDelivery ? referencePoint.value.trim() : "Não se aplica";
  const totals = calculateTotals();
  const details = cartEntries.map((item) => {
    const removed = item.removeSides?.length ? `Sem: ${item.removeSides.join(", ")}` : "Completo";
    const itemNote = item.note.trim() ? `Obs do item: ${item.note.trim()}` : "Obs do item: nenhuma";
    return `- ${item.quantity}x ${item.name}: ${money.format(item.price * item.quantity)}\n  ${removed}\n  ${itemNote}`;
  });
  const payment = paymentMethod.value;
  const change = payment === "Dinheiro" ? `Troco para: ${changeFor.value.trim()}` : "Troco: não precisa";
  const message = [`Olá, quero fazer o pedido ${orderNumber}:`, "", `Pedido: ${orderNumber}`, `Nome: ${customerName.value.trim()}`, `CPF: ${customerCpf.value.trim()}`, `Forma: ${isDelivery ? "Entrega" : "Retirada"}`, `Endereço: ${address}`, `Referência: ${reference}`, `Pagamento: ${payment}`, change, "", "Itens:", ...details, "", `Subtotal: ${money.format(totals.subtotal)}`, `Entrega: ${money.format(totals.deliveryFee)}`, `Total: ${money.format(totals.total)}`, "", `Observações gerais: ${notes.value.trim() || "Sem observações"}`].join("\n");
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
  orderMessage.innerHTML = `${orderNumber} pronto. <a href="${whatsappUrl}" target="_blank" rel="noopener">Abrir WhatsApp</a>`;
  window.location.href = whatsappUrl;
});

renderMenu();
renderCart();
updateNextOrderNumber();
updateDeliveryMode();
updatePaymentMode();
