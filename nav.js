const mobileOverlay = document.querySelector(".mobile-overlay");
const menuButton = document.querySelector(".menu-button");
const mobileMenuButton = document.querySelector(".mobile-menu-button");
const headerElement = document.querySelector(".header");

if (mobileOverlay && menuButton && mobileMenuButton) {
  function isMenuOpen() {
    return mobileOverlay.classList.contains("is-open");
  }

  function closeMenu() {
    mobileOverlay.classList.remove("is-open");
    menuButton.classList.remove("is-open");
    menuButton.setAttribute("aria-expanded", "false");
  }

  function openMenu() {
    mobileOverlay.classList.add("is-open");
    menuButton.classList.add("is-open");
    menuButton.setAttribute("aria-expanded", "true");
  }

  function toggleMenu() {
    if (isMenuOpen()) {closeMenu();} else {openMenu();}
  }

  mobileMenuButton.addEventListener("click", toggleMenu);

  document.addEventListener("click", (event) => {
    if (!isMenuOpen()) {return;}
    const isClickInsideMenu = mobileOverlay.contains(event.target) || menuButton.contains(event.target);
    const clickedMenuLink = event.target instanceof Element && event.target.closest(".mobile-overlay a");
    if (!isClickInsideMenu || clickedMenuLink) {closeMenu();}
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 820) {closeMenu();}
  });

  if (headerElement) {
    let prevScroll = window.scrollY;
    const hideThreshold = 100;
    let scrollTicking = false;

    function onScroll() {
      const curScroll = window.scrollY;
      if (curScroll < hideThreshold) {
        headerElement.classList.remove("is-hidden");
      } else if (prevScroll > curScroll) {
        headerElement.classList.remove("is-hidden");
      } else {
        headerElement.classList.add("is-hidden");
      }
      prevScroll = curScroll;

      if (isMenuOpen()) {closeMenu();}
    }

    window.addEventListener("scroll", () => {
      if (scrollTicking) {return;}
      scrollTicking = true;
      requestAnimationFrame(() => {
        onScroll();
        scrollTicking = false;
      });
    }, { passive: true });
  }
}
