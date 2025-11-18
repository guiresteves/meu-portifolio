// main.js
import { initTypingEffect } from "./typingEffect.js";
import { initNavbar } from "./navbar.js";
import { initDropdown } from "./dropdown.js";
import { initMobileNavbarBehavior } from "./mobileNavbar.js";
import { initScrollReveal } from "./scrollReveal.js";
import { initSkills } from "./skills.js";
import { initContact } from "./contact.js";
import { initDownload } from "./download.js";
import { initLoader } from "./loader.js";

document.addEventListener("DOMContentLoaded", () => {
  try { initTypingEffect(); } catch (e) { console.warn("Typing init failed", e); }
  try { initNavbar(); } catch (e) { console.warn("Navbar init failed", e); }
  try { initDropdown(); } catch (e) { console.warn("Dropdown init failed", e); }
  try { initMobileNavbarBehavior(); } catch (e) { console.warn("Mobile nav init failed", e); }
  try { initScrollReveal(); } catch (e) { console.warn("Scroll reveal init failed", e); }
  try { initSkills(); } catch (e) { console.warn("Skills init failed", e); }
  try { initContact(); } catch (e) { console.warn("Contact init failed", e); }
  try { initDownload(); } catch (e) { console.warn("Download init failed", e); }
  try { initLoader({ selector: ".loader-overlay" }); } catch (e) { /* optional */ }
});
