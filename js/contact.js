// contact.js
import { $ } from "./utils.js";

const EMAILJS_USER = "0nOTFDy6tltT0CC7v"; // ideal: backend/.env em produção
const EMAILJS_SERVICE = "service_ekb8hai";
const EMAILJS_TEMPLATE = "template_4pltybk";

export function initContact() {
  if (typeof emailjs === "undefined") return;
  emailjs.init(EMAILJS_USER);

  const form = $(".contact-form");
  const btn = $(".send-btn");
  if (!form || !btn) return;

  let feedback = $(".form-feedback");
  if (!feedback) {
    feedback = document.createElement("div");
    feedback.className = "form-feedback";
    form.appendChild(feedback);
  }

  const showFeedback = (msg, type = "info") => {
    feedback.textContent = msg;
    feedback.className = `form-feedback ${type}`;
    feedback.style.opacity = "1";
    setTimeout(() => { feedback.style.opacity = "0"; }, 4000);
  };

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const name = (form.querySelector("#name") || {}).value?.trim?.() || "";
    const email = (form.querySelector("#email") || {}).value?.trim?.() || "";
    const message = (form.querySelector("#message") || {}).value?.trim?.() || "";

    if (!name || !email || !message) {
      showFeedback("Por favor, preencha todos os campos!", "error");
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      showFeedback("Digite um email válido!", "error");
      return;
    }

    btn.disabled = true;
    const originalText = btn.innerHTML;
    btn.innerHTML = `<span class="loader" aria-hidden="true"></span> Enviando...`;

    try {
      await emailjs.send(EMAILJS_SERVICE, EMAILJS_TEMPLATE, { name, email, message });
      showFeedback("Mensagem enviada com sucesso! 🚀", "success");
      form.reset();
    } catch (err) {
      console.error(err);
      showFeedback("Erro ao enviar. Tente novamente mais tarde.", "error");
    } finally {
      btn.disabled = false;
      btn.innerHTML = originalText || "Send Message";
    }
  });
}
