document.addEventListener("DOMContentLoaded", () => {

  /* === EFEITO DE DIGITALIZAÇÃO === */

  const palavras = ["BackEnd", "FrontEnd", "FullStack", "Criativo"];
  const tipo = document.getElementById("caracteristica");
  const desenvolvedor = document.getElementById("developer");

  let fase = 0; // 0 = digitar "Desenvolvedor BackEnd", 1 = loop das palavras
  let charIndex = 0;
  let palavraAtual = palavras[0];

  // Função para digitar o texto inicial completo
  function digitarInicial() {
    const textoInicial = "Desenvolvedor BackEnd";
    if (charIndex < textoInicial.length) {
      // Alterna entre "Desenvolvedor " e "BackEnd"
      if (charIndex < "Desenvolvedor ".length) {
        desenvolvedor.textContent += textoInicial[charIndex];
      } else {
        tipo.textContent += textoInicial[charIndex];
      }
      charIndex++;
      setTimeout(digitarInicial, 150);
    } else {
      // Depois que completa, inicia o loop apenas no tipo
      fase = 1;
      charIndex = palavraAtual.length;
      setTimeout(loopPalavras, 4000);
    }
  }

  // Loop de apagar e digitar apenas a parte do tipo
  let palavraIndex = 0;
  function loopPalavras() {
    if (charIndex > 0) {
      tipo.textContent = palavraAtual.substring(0, charIndex - 1);
      charIndex--;
      setTimeout(loopPalavras, 100);
    } else {
      palavraIndex = (palavraIndex + 1) % palavras.length;
      palavraAtual = palavras[palavraIndex];
      digitarNovaPalavra();
    }
  }

  function digitarNovaPalavra() {
    if (charIndex < palavraAtual.length) {
      tipo.textContent += palavraAtual[charIndex];
      charIndex++;
      setTimeout(digitarNovaPalavra, 150);
    } else {
      setTimeout(loopPalavras, 4000);
    }
  }

  // inicia o efeito
  digitarInicial();


  /* === NAVBAR (PRINCIPAL) === */

  const navbar = document.querySelector(".navbar ul");
  const indicadorNav = document.querySelector(".navbar .indicador");
  const links = document.querySelectorAll(".navbar ul li a");
  const sections = document.querySelectorAll("section");

  let activeLink = document.querySelector(".navbar ul li a.active");
  let hoverTimeout;
  let isClicking = false;

  // Move o indicador horizontal
  function moveIndicadorNav(link, instant = false) {
    const rect = link.getBoundingClientRect();
    const parentRect = navbar.getBoundingClientRect();

    if (instant) indicadorNav.style.transition = "none";
    else indicadorNav.style.transition = "all 1s cubic-bezier(0.25, 1, 0.5, 1)";

    indicadorNav.style.width = `${rect.width}px`;
    indicadorNav.style.left = `${rect.left - parentRect.left}px`;
    indicadorNav.style.height = `${rect.height}px`;
    indicadorNav.style.top = `${rect.top - parentRect.top}px`;

    if (instant) {
      indicadorNav.offsetHeight; // reflow
      indicadorNav.style.transition = "all 1s cubic-bezier(0.25, 1, 0.5, 1)";
    }
  }

  // Atualiza indicador conforme scroll
  function updateActiveSection() {
    if (isClicking) return;

    let current = "";
    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 150;
      const sectionHeight = section.clientHeight;
      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        current = section.getAttribute("id");
      }
    });

    links.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href") === `#${current}`) {
        link.classList.add("active");
        activeLink = link;
        moveIndicadorNav(link);
      }
    });
  }

  // Inicialização
  window.addEventListener("load", () => {
    if (activeLink) moveIndicadorNav(activeLink, true);
  });
  window.addEventListener("scroll", updateActiveSection);
  window.addEventListener("resize", () => {
    if (activeLink) moveIndicadorNav(activeLink, true);
  });

  // Hover e clique
  links.forEach((link) => {
    link.addEventListener("mouseenter", () => {
      clearTimeout(hoverTimeout);
      if (!isClicking) moveIndicadorNav(link);
    });

    link.addEventListener("mouseleave", () => {
      hoverTimeout = setTimeout(() => {
        if (!isClicking && activeLink) moveIndicadorNav(activeLink);
      }, 300);
    });

    link.addEventListener("click", () => {
      isClicking = true;
      links.forEach((l) => l.classList.remove("active"));
      link.classList.add("active");
      activeLink = link;
      moveIndicadorNav(link);
      setTimeout(() => (isClicking = false), 800);
    });
  });


  /* === NAVBAR (DROPDOWN) === */

  const dropdown = document.querySelector(".dropdown");
  const dropdownBtn = document.getElementById("dropdown-btn");
  const textoBtn = dropdownBtn.querySelector(".texto-btn");
  const setaBtn = dropdownBtn.querySelector(".seta");
  const dropdownMenu = document.getElementById("dropdown-menu");
  const menuItems = document.querySelectorAll(".dropdown-item");
  const indicadorDrop = document.querySelector(".indicador-item");

  // Todas as sections do site
  const sectionsD = document.querySelectorAll("section");

  // Define item ativo inicial
  let activeItem = document.querySelector('.dropdown-item[href="#home"]');
  moveIndicadorDrop(activeItem);

  // Abre/fecha menu
  dropdownBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    dropdown.classList.toggle("open");
    setaBtn.style.transform = dropdown.classList.contains("open")
      ? "rotate(180deg)"
      : "rotate(0deg)";
  });

  // Fecha ao clicar fora
  document.addEventListener("click", (e) => {
    if (!dropdown.contains(e.target)) {
      dropdown.classList.remove("open");
      setaBtn.style.transform = "rotate(0deg)";
    }
  });

  // Clique e hover nos itens do menu
  menuItems.forEach((item) => {
    item.addEventListener("mouseenter", () => moveIndicadorDrop(item));

    item.addEventListener("click", (e) => {
      e.preventDefault();

      activeItem = item;
      moveIndicadorDrop(item);
      textoBtn.textContent = item.textContent;

      // Fecha o menu e reseta seta
      dropdown.classList.remove("open");
      setaBtn.style.transform = "rotate(0deg)";

      // 🔥 Rola suavemente até a section
      const targetId = item.getAttribute("href");
      const targetSection = document.querySelector(targetId);
      if (targetSection) {
        window.scrollTo({
          top: targetSection.offsetTop - 100, // ajuste se sua navbar tiver altura diferente
          behavior: "smooth",
        });
      }
    });
  });

  // Volta o indicador pro item ativo se o mouse sair do menu
  dropdownMenu.addEventListener("mouseleave", () => {
    if (activeItem) moveIndicadorDrop(activeItem);
  });

  // 🔥 Atualiza o texto do botão conforme a section visível
  window.addEventListener("scroll", () => {
    let currentSection = "";

    sectionsD.forEach((section) => {
      const sectionTop = section.offsetTop - 150;
      const sectionHeight = section.clientHeight;

      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        currentSection = section.getAttribute("id");
      }
    });

    menuItems.forEach((item) => {
      const href = item.getAttribute("href").replace("#", "");
      if (href === currentSection) {
        activeItem = item;
        textoBtn.textContent = item.textContent;
        moveIndicadorDrop(item);
      }
    });
  });

  // ====== Indicador animado ======
  function moveIndicadorDrop(element) {
    const rect = element.getBoundingClientRect();
    const menuRect = dropdownMenu.getBoundingClientRect();
    const offsetTop = rect.top - menuRect.top;
    indicadorDrop.style.top = `${offsetTop}px`;
    indicadorDrop.style.height = `${rect.height}px`;
  }

  /* 🟢 NOVO — Efeito esconder/mostrar a navbar ao rolar */
  let lastScroll = 0;
  const navbarD = document.querySelector(".navbar-dropdown");
  const homeSection = document.querySelector("#home");

  window.addEventListener("scroll", () => {
    const currentScroll = window.pageYOffset;
    const homeBottom = homeSection.offsetTop + homeSection.offsetHeight;

    // Mostra navbar enquanto estiver na section Home
    if (currentScroll < homeBottom) {
      navbarD.classList.remove("navbar-hidden");
      return;
    }

    // Rolando pra baixo → esconde
    if (currentScroll > lastScroll) {
      navbarD.classList.add("navbar-hidden");
    }
    // Rolando pra cima → mostra
    else {
      navbarD.classList.remove("navbar-hidden");
    }

    lastScroll = currentScroll;
  });

  let hideTimeout;

  // mostra o navbar quando rolar
  window.addEventListener("scroll", () => {
    // mostra o navbar imediatamente
    navbarD.style.opacity = "1";
    navbarD.style.pointerEvents = "auto";
    navbarD.style.transition = "opacity 0.5s ease";

    // limpa qualquer timeout anterior
    clearTimeout(hideTimeout);

    // após 3 segundos sem rolar, esconde o navbar
    hideTimeout = setTimeout(() => {
      navbarD.style.opacity = "0";
      navbarD.style.pointerEvents = "none";
    }, 3000);
  });


  // ======== SCROLL REVEAL ========
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("show");
          observer.unobserve(entry.target); // ativa só uma vez
        }
      });
    },
    { threshold: 0.15 }
  );
  
  document.querySelectorAll(".section").forEach((sec) => observer.observe(sec));

  /* === SKILLS === */

  const skillsGrid = document.getElementById("skills-grid");
  const skillButtons = document.querySelectorAll(".skills-button button");
  const leftArrow = document.querySelector(".arrow-left");
  const rightArrow = document.querySelector(".arrow-right");

  const skillOrder = ["backend", "frontend", "database", "tools"];
  let currentIndex = 0;

  const skillsData = {
    backend: [
      { name: "Node.js", icon: "assets/logos/node.svg" },
      { name: "Python", icon: "assets/logos/python.svg" },
      { name: "Spring Boot", icon: "assets/logos/springBoot.svg" },
      { name: "JavaScript", icon: "assets/logos/javascript.svg" },
      { name: "TypeScript", icon: "assets/logos/typescript.svg" },
      { name: "Java", icon: "assets/logos/java.svg" },
      { name: "Fastify", icon: "assets/logos/fastify.svg" },
      { name: "Express", icon: "assets/logos/express.svg" },
    ],
    frontend: [
      { name: "HTML", icon: "assets/logos/html.svg" },
      { name: "CSS", icon: "assets/logos/css.svg" },
      { name: "JavaScript", icon: "assets/logos/javascript.svg" },
      { name: "TypeScript", icon: "assets/logos/typescript.svg" },
      { name: "Angular", icon: "assets/logos/angular.svg" },
      { name: "React", icon: "assets/logos/react.svg" },
      { name: "Vue", icon: "assets/logos/vue.svg" },
      { name: "Tailwind", icon: "assets/logos/tailwind.svg" },
      { name: "BootStrap", icon: "assets/logos/bootstrap.svg" },
    ],
    database: [
      { name: "MySQL", icon: "assets/logos/mysql.svg" },
      { name: "PostgreSQL", icon: "assets/logos/postgresql.svg" },
      { name: "MongoDB", icon: "assets/logos/mongo.svg" },
    ],
    tools: [
      { name: "Docker", icon: "assets/logos/docker.svg" },
      { name: "Git", icon: "assets/logos/git.svg" },
      { name: "GitHub", icon: "assets/logos/github.svg" },
    ],
  };

  function renderSkills(category) {
    skillsGrid.style.opacity = "0";
    setTimeout(() => {
      skillsGrid.innerHTML = "";
      skillsData[category].forEach(skill => {
        const div = document.createElement("div");
        div.classList.add("skill-card");
        div.innerHTML = `
          <img src="${skill.icon}" alt="${skill.name}">
          <p>${skill.name}</p>
        `;
        skillsGrid.appendChild(div);
      });
      skillsGrid.style.opacity = "1";
    }, 300);
  }

  // Troca skill ativa
  function setActiveSkill(index) {
    skillButtons.forEach(btn => btn.classList.remove("active"));
    const newActive = skillButtons[index];
    newActive.classList.add("active");
    const category = newActive.getAttribute("data-skill");
    renderSkills(category);
  }

  // Clique nos botões
  skillButtons.forEach((button, index) => {
    button.addEventListener("click", () => {
      currentIndex = index;
      setActiveSkill(index);
    });
  });

  // Navegação pelas setas
  leftArrow.addEventListener("click", () => {
    currentIndex = (currentIndex - 1 + skillOrder.length) % skillOrder.length;
    setActiveSkill(currentIndex);
  });

  rightArrow.addEventListener("click", () => {
    currentIndex = (currentIndex + 1) % skillOrder.length;
    setActiveSkill(currentIndex);
  });

  // Inicializa com Back-end
  renderSkills("backend");

  /* === CONTATO === */

  emailjs.init("0nOTFDy6tltT0CC7v");

  const form = document.querySelector(".contact-form");
  const btn = document.querySelector(".send-btn");

  // Cria um elemento de feedback dentro do formulário
  const feedback = document.createElement("div");
  feedback.classList.add("form-feedback");
  form.appendChild(feedback);

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = document.querySelector("#name").value.trim();
    const email = document.querySelector("#email").value.trim();
    const message = document.querySelector("#message").value.trim();

    // Verificação básica
    if (!name || !email || !message) {
      showFeedback("Por favor, preencha todos os campos!", "error");
      return;
    }

    // Validação de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      showFeedback("Digite um email válido!", "error");
      return;
    }

    // Desativa botão e mostra loading
    btn.disabled = true;
    btn.innerHTML = `<span class="loader"></span> Enviando...`;

    try {
      // Envio via EmailJS
      await emailjs.send("service_ekb8hai", "template_4pltybk", {
        name,
        email,
        message,
      });

      showFeedback("Mensagem enviada com sucesso! 🚀", "success");
      form.reset();
    } catch (error) {
      showFeedback("Erro ao enviar. Tente novamente mais tarde.", "error");
      console.error(error);
    } finally {
      btn.disabled = false;
      btn.innerHTML = "Send Message";
    }
  });

  // Exibe feedback
  function showFeedback(msg, type) {
    feedback.textContent = msg;
    feedback.className = `form-feedback ${type}`;
    feedback.style.opacity = "1";
    setTimeout(() => {
      feedback.style.opacity = "0";
    }, 4000);
  }
});
