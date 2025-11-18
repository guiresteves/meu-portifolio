// download.js
import { $ } from "./utils.js";

export function initDownload() {
  const downloadBtn = $("#downloadBtn");
  const hiddenLink = $("#cv-link"); // <a id="cv-link" href="..." download hidden></a>

  if (!downloadBtn || !hiddenLink) return;

  downloadBtn.addEventListener("click", (e) => {
    e.preventDefault();
    hiddenLink.click();
  });
}
