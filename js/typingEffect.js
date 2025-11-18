// typingEffect.js
import { $, sleep } from "./utils.js";

export function initTypingEffect(options = {}) {
  const palavras = options.palavras || ["BackEnd", "FrontEnd", "FullStack", "Criativo"];
  const tipoEl = $("#caracteristica");
  const devEl = $("#developer");

  if (!tipoEl || !devEl) return;

  const typingInterval = {
    type: options.typeMs || 150,
    del: options.deleteMs || 100,
    pause: options.pauseMs || 4000,
    initialPause: options.initialPauseMs || 4000,
  };

  let state = {
    palavraIndex: 0,
    charIndex: 0,
    palavraAtual: palavras[0],
  };

  async function digitarInicial() {
    const textoInicial = "Desenvolvedor BackEnd";
    for (; state.charIndex < textoInicial.length; state.charIndex++) {
      const c = textoInicial[state.charIndex];
      if (state.charIndex < "Desenvolvedor ".length) devEl.textContent += c;
      else tipoEl.textContent += c;
      await sleep(typingInterval.type);
    }
    state.palavraAtual = palavras[state.palavraIndex];
    state.charIndex = state.palavraAtual.length;
    await sleep(typingInterval.initialPause);
    loopPalavras();
  }

  async function loopPalavras() {
    // apagar
    while (state.charIndex > 0) {
      tipoEl.textContent = state.palavraAtual.substring(0, state.charIndex - 1);
      state.charIndex--;
      await sleep(typingInterval.del);
    }
    // próxima
    state.palavraIndex = (state.palavraIndex + 1) % palavras.length;
    state.palavraAtual = palavras[state.palavraIndex];
    while (state.charIndex < state.palavraAtual.length) {
      tipoEl.textContent += state.palavraAtual[state.charIndex];
      state.charIndex++;
      await sleep(typingInterval.type);
    }
    await sleep(typingInterval.pause);
    loopPalavras();
  }

  // start
  devEl.textContent = "";
  tipoEl.textContent = "";
  digitarInicial();
}