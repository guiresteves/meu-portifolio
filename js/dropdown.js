// dropdown.js
import { $, $$, throttle } from "./utils.js";

export function initDropdown() {
  const dropdown = $(".dropdown");
  const dropdownBtn = $("#dropdown-btn");
  if (!dropdown || !dropdownBtn) return;

  const textoBtn = dropdownBtn.querySelector(".texto-btn");
  const setaBtn = dropdownBtn.querySelector(".seta");
  const dropdownMenu = $("#dropdown-menu");
  const menuItems = $$(".dropdown-item");
  const indicadorDrop = $(".indicador-item");
  const sections = $$("section");

  let activeItem = document.querySelector('.dropdown-item[href="#home"]') || menuItems[0];
  if (activeItem) moveIndicadorDrop(activeItem);

  dropdownBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    dropdown.classList.toggle("open");
    setaBtn.style.transform = dropdown.classList.contains("open") ? "rotate(180deg)" : "rotate(0deg)";
  });

  document.addEventListener("click", (e) => {
    if (!dropdown.contains(e.target)) {
      dropdown.classList.remove("open");
      setaBtn.style.transform = "rotate(0deg)";
    }
  });

  menuItems.forEach((item) => {
    item.addEventListener("mouseenter", () => moveIndicadorDrop(item));
    item.addEventListener("click", (e) => {
      e.preventDefault();
      activeItem = item;
      moveIndicadorDrop(item);
      textoBtn.textContent = item.textContent;
      dropdown.classList.remove("open");
      setaBtn.style.transform = "rotate(0deg)";

      const target = document.querySelector(item.getAttribute("href"));
      if (target) {
        window.scrollTo({ top: target.offsetTop - 100, behavior: "smooth" });
      }
    });
  });

  dropdownMenu.addEventListener("mouseleave", () => {
    if (activeItem) moveIndicadorDrop(activeItem);
  });

  window.addEventListener("scroll", throttle(() => {
    let currentId = "";
    const scrollPos = window.scrollY;
    sections.forEach((sec) => {
      const top = sec.offsetTop - 150;
      const height = sec.clientHeight;
      if (scrollPos >= top && scrollPos < top + height) currentId = sec.id;
    });

    menuItems.forEach((item) => {
      const href = item.getAttribute("href").replace("#", "");
      if (href === currentId) {
        activeItem = item;
        textoBtn.textContent = item.textContent;
        moveIndicadorDrop(item);
      }
    });
  }, 120));

  function moveIndicadorDrop(element) {
    if (!element || !indicadorDrop) return;
    const rect = element.getBoundingClientRect();
    const menuRect = dropdownMenu.getBoundingClientRect();
    const offsetTop = rect.top - menuRect.top;
    indicadorDrop.style.top = `${offsetTop}px`;
    indicadorDrop.style.height = `${rect.height}px`;
  }
}
