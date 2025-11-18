// navbar.js
import { $, $$, throttle, debounce } from "./utils.js";

export function initNavbar() {
  const navbar = $(".navbar ul");
  const indicadorNav = $(".navbar .indicador");
  const links = $$(".navbar ul li a");
  const sections = $$("section");

  if (!navbar || !indicadorNav || links.length === 0) return;

  let activeLink = $(".navbar ul li a.active") || links[0];
  let isClicking = false;
  let hoverTimeout;

  function moveIndicadorNav(link, instant = false) {
    if (!link) return;
    const rect = link.getBoundingClientRect();
    const parentRect = navbar.getBoundingClientRect();

    if (instant) indicadorNav.style.transition = "none";
    else indicadorNav.style.transition = "all 450ms cubic-bezier(.2,.9,.2,1)";

    indicadorNav.style.width = `${rect.width}px`;
    indicadorNav.style.left = `${rect.left - parentRect.left}px`;
    indicadorNav.style.height = `${rect.height}px`;
    indicadorNav.style.top = `${rect.top - parentRect.top}px`;

    if (instant) {
      void indicadorNav.offsetHeight;
      indicadorNav.style.transition = "all 450ms cubic-bezier(.2,.9,.2,1)";
    }
  }

  function updateActiveSection() {
    if (isClicking) return;
    let currentId = "";
    const scrollPos = window.scrollY;
    sections.forEach((sec) => {
      const top = sec.offsetTop - 150;
      const height = sec.clientHeight;
      if (scrollPos >= top && scrollPos < top + height) currentId = sec.id;
    });

    links.forEach((link) => {
      const isActive = link.getAttribute("href") === `#${currentId}`;
      link.classList.toggle("active", isActive);
      if (isActive) {
        activeLink = link;
        moveIndicadorNav(link);
      }
    });
  }

  window.addEventListener("load", () => {
    if (activeLink) moveIndicadorNav(activeLink, true);
  });

  window.addEventListener("scroll", throttle(updateActiveSection, 100));
  window.addEventListener("resize", debounce(() => {
    if (activeLink) moveIndicadorNav(activeLink, true);
  }, 200));

  links.forEach((link) => {
    link.addEventListener("mouseenter", () => {
      clearTimeout(hoverTimeout);
      if (!isClicking) moveIndicadorNav(link);
    });

    link.addEventListener("mouseleave", () => {
      hoverTimeout = setTimeout(() => {
        if (!isClicking && activeLink) moveIndicadorNav(activeLink);
      }, 250);
    });

    link.addEventListener("click", (e) => {
      e.preventDefault();
      isClicking = true;
      links.forEach((l) => l.classList.remove("active"));
      link.classList.add("active");
      activeLink = link;
      moveIndicadorNav(link);
      const target = document.querySelector(link.getAttribute("href"));
      if (target) {
        window.scrollTo({ top: target.offsetTop - 100, behavior: "smooth" });
      }
      setTimeout(() => (isClicking = false), 700);
    });
  });
}
