
  async function renderProjects() {
   const response = await fetch('pages/project.html');
    return await response.text()
  }

  async function renderAbout() {
    const response = await fetch('pages/about-me.html');
    return await response.text()
  }

  async  function renderContact() {
    const response = await fetch('pages/contact.html');
    return await response.text()
  }

  const tabContent = document.getElementById('tabContent');
  const tabButtons = document.querySelectorAll('.tab-button');

  async function switchTab(tab) {

    tabButtons.forEach(button => button.classList.remove('active'));
    document.querySelector(`[data-tab="${tab}"]`).classList.add('active');

    switch(tab) {
      case 'projects':
        tabContent.innerHTML = await renderProjects();
        break;
      case 'about':
        tabContent.innerHTML = await renderAbout();
        break;
      case 'contact':
        tabContent.innerHTML = await renderContact();
        break;
    }
  }

  tabButtons.forEach(button => {
    button.addEventListener('click', () => switchTab(button.dataset.tab));
  });

  // Initialize with projects tab
  switchTab('projects').then(r => console.log('Projects tab loaded'));


  // Mobile menu toggle
  const menuButton = document.getElementById('menuButton');
  let mobileMenu = null;

  menuButton.addEventListener('click', () => {
    if(mobileMenu) {
      mobileMenu.remove();
      mobileMenu = null;
    } else {
      mobileMenu = document.createElement('div');
      mobileMenu.style.cssText = `
        position: fixed;
        inset: 0;
        background: black;
        z-index: 50;
        padding: 1rem;
      `;
      mobileMenu.innerHTML = `
        <button class="nav-button" style="float: right">✕</button>
        <nav style="margin-top: 3rem">
           <button class="nav-button">
          <img
            src="../assets/png/cv.png"
            style="width: 28px"
            height="28px"
            alt="Icon"
          />
          CV
        </button>
        <button class="nav-button">
          <img
            src="../assets/png/linkedid.png"
            style="width: 28px"
            height="28px"
            alt="Icon"
          />
          LinkedIn
        </button>
        <button class="nav-button">Escobq</button>
        </nav>
      `;
      document.body.appendChild(mobileMenu);

      mobileMenu.querySelector('button').addEventListener('click', () => {
        mobileMenu.remove();
        mobileMenu = null;
      });
    }
  });