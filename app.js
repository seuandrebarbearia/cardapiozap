const WHATSAPP_NUMBER = "5548996495663";

const leadForm = document.querySelector("#leadForm");
const formError = document.querySelector("#formError");
const selectedPlan = { value: "" };

function getValue(selector) {
  return document.querySelector(selector).value.trim();
}

function setPlan(plan) {
  selectedPlan.value = plan;
}

function buildMessage() {
  const lines = [
    "*QUERO UM SITE PARA MEU NEGOCIO*",
    "",
    `Negocio: ${getValue("#businessName")}`,
    `WhatsApp: ${getValue("#leadPhone")}`,
    selectedPlan.value ? `Plano de interesse: ${selectedPlan.value}` : "Plano de interesse: Quero orientacao",
    "Promocao vista no site: R$ 599,99 em ate 6x",
    "",
    "*O que preciso*",
    getValue("#leadNeed")
  ];

  return lines.join("\n");
}

document.addEventListener("click", (event) => {
  const planLink = event.target.closest("[data-plan]");
  if (planLink) setPlan(planLink.dataset.plan);
});

leadForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const required = [
    ["#businessName", "Informe o nome do negocio."],
    ["#leadPhone", "Informe seu WhatsApp."],
    ["#leadNeed", "Conte rapidamente o que voce precisa."]
  ];

  const missing = required.find(([selector]) => !getValue(selector));
  if (missing) {
    document.querySelector(missing[0]).focus();
    formError.textContent = missing[1];
    return;
  }

  formError.textContent = "";
  window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(buildMessage())}`, "_blank", "noopener");
});
