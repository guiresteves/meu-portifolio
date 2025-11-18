// skills.js
import { $ , $$ } from "./utils.js";

export function initSkills() {
  const skillsGrid = $("#skills-grid");
  const skillButtons = $$(".skills-button button");
  const leftArrow = $(".arrow-left");
  const rightArrow = $(".arrow-right");

  if (!skillsGrid || skillButtons.length === 0) return;

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
      { name: "BootStrap", icon: "assets/logos/bootstrap.svg" },
      { name: "React", icon: "assets/logos/react.svg" },
      { name: "Angular", icon: "assets/logos/angular.svg" },
      { name: "Tailwind", icon: "assets/logos/tailwind.svg" },
    ],
    database: [
      { name: "MySQL", icon: "assets/logos/mysql.svg" },
      { name: "PostgreSQL", icon: "assets/logos/postgresql.svg" },
      { name: "MongoDB", icon: "assets/logos/mongo.svg" },
    ],
    tools: [
      { name: "Docker", icon: "assets/logos/docker.svg" },
      { name: "Git", icon: "assets/logos/git.svg" },
      { name: "GitHub", icon: "assets/logos/github2.png" },
    ],
  };

  function renderSkills(category) {
    skillsGrid.style.opacity = "0";
    setTimeout(() => {
      skillsGrid.innerHTML = "";
      const arr = skillsData[category] || [];
      const html = arr.map((s) => `
        <div class="skill-card" aria-label="${s.name}">
          <img src="${s.icon}" alt="${s.name}" loading="lazy">
          <p>${s.name}</p>
        </div>`).join("");
      skillsGrid.insertAdjacentHTML("beforeend", html);
      skillsGrid.style.opacity = "1";
    }, 220);
  }

  function setActiveSkill(index) {
    skillButtons.forEach((b) => b.classList.remove("active"));
    const btn = skillButtons[index];
    if (!btn) return;
    btn.classList.add("active");
    renderSkills(btn.getAttribute("data-skill"));
  }

  skillButtons.forEach((btn, idx) => {
    btn.addEventListener("click", () => {
      currentIndex = idx;
      setActiveSkill(idx);
    });
  });

  if (leftArrow) leftArrow.addEventListener("click", () => {
    currentIndex = (currentIndex - 1 + skillOrder.length) % skillOrder.length;
    setActiveSkill(currentIndex);
  });

  if (rightArrow) rightArrow.addEventListener("click", () => {
    currentIndex = (currentIndex + 1) % skillOrder.length;
    setActiveSkill(currentIndex);
  });

  // inicial
  setActiveSkill(0);
}
