 // mobileNavbar.js
import { $ , throttle } from "./utils.js";

export function initMobileNavbarBehavior() {
  const navbarD = $(".navbar-dropdown");
  const homeSection = $("#home");
  if (!navbarD || !homeSection) return;

  let lastScroll = window.pageYOffset || 0;
  let hideTimeout;

  function onScroll() {
    const currentScroll = window.pageYOffset || 0;
    const homeBottom = homeSection.offsetTop + homeSection.offsetHeight;

    if (currentScroll < homeBottom) {
      navbarD.classList.remove("navbar-hidden");
      navbarD.style.opacity = "1";
      navbarD.style.pointerEvents = "auto";
      return;
    }

    if (currentScroll > lastScroll) navbarD.classList.add("navbar-hidden");
    else navbarD.classList.remove("navbar-hidden");

    navbarD.style.opacity = "1";
    navbarD.style.pointerEvents = "auto";
    clearTimeout(hideTimeout);
    hideTimeout = setTimeout(() => {
      navbarD.style.opacity = "0";
      navbarD.style.pointerEvents = "none";
    }, 3000);

    lastScroll = currentScroll;
  }

  window.addEventListener("scroll", throttle(onScroll, 100));
}
