async function renderProjects() {
  const response = await fetch("pages/project.html");
  return await response.text();
}

async function renderAbout() {
  const response = await fetch("pages/about-me.html");
  return await response.text();
}

const tabContent = document.getElementById("tabContent");
const tabButtons = document.querySelectorAll(".tab-button");
const storyRevealTargets = document.querySelectorAll("[data-story]");

async function switchTab(tab) {
  tabButtons.forEach((button) => button.classList.remove("active"));
  document.querySelector(`[data-tab="${tab}"]`).classList.add("active");

  switch (tab) {
    case "projects":
      tabContent.innerHTML = await renderProjects();
      break;
    case "about":
      tabContent.innerHTML = await renderAbout();
      break;
  }
}

tabButtons.forEach((button) => {
  button.addEventListener("click", () => switchTab(button.dataset.tab));
});

const revealTargets = document.querySelectorAll("[data-reveal]");

function revealOnScroll() {
  revealTargets.forEach((section, index) => {
    const rect = section.getBoundingClientRect();
    if (rect.top < window.innerHeight - 80) {
      section.classList.add("fade-in");
      section.style.animationDelay = `${index * 0.15}s`;
    }
  });
}

function attachHeroActions() {
  document.querySelectorAll("[data-tab-target]").forEach((button) => {
    button.addEventListener("click", () => {
      const target = button.dataset.tabTarget;
      switchTab(target);
      document.querySelector(".tab-wrapper")?.scrollIntoView({ behavior: "smooth" });
    });
  });
}

tabButtons[0]?.click();
window.addEventListener("scroll", revealOnScroll);
window.addEventListener("load", () => {
  revealOnScroll();
  attachHeroActions();
});

// Mobile menu toggle
const menuButton = document.getElementById("menuButton");
let mobileMenu = null;

menuButton.addEventListener("click", () => {
  if (mobileMenu) {
    mobileMenu.remove();
    mobileMenu;
  } else {
    mobileMenu = document.createElement("div");
    mobileMenu.style.cssText = `
        position: fixed;
        inset: 0;
        background: black;
        z-index: 50;
        padding: 1rem;
      `;
    mobileMenu.innerHTML = `
        <button class="nav-button" style="float: right">✕</button>
        <nav>
        <a style="color:#fff" href="https://acortar.link/qOYWru">
        <button class="nav-button">
          <img
            src="./public/cv.png"
            style="width: 28px"
            height="28px"
            alt="Icon"
          />
          CV
        </button>
          <a>
          <a style="color:#fff" href="https://www.linkedin.com/in/juan-david-escobar-quezada-380430302/">
        <button class="nav-button" >
          <img
            src="./public/linkedid.png"
            style="width: 28px"
            height="28px"
            alt="Icon"
          />
          LinkedIn
        </button>
            </a>
            <a style="color:#fff" href="https://acortar.link/neITj2">
              <button class="nav-button" >
                <img
                  src="./public/whatsapp.png"
                  style="width: 28px"
                  height="28px"
                  alt="Icon"
                />
                Whatsapp
              </button>
                  </a>
        <button class="nav-button">
          <div class="profile-avatar-mobile"></div>
          Escobq
        </button>
      </nav>
      `;
    document.body.appendChild(mobileMenu);

    mobileMenu.querySelector("button").addEventListener("click", () => {
      mobileMenu.remove();
      mobileMenu = null;
    });
  }
});
