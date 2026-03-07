/*----------------
Mobile menu toggle and header hide/show on scroll.
-----------------*/
const mobileOverlay = document.querySelector(".mobile-overlay");
const menuButton = document.querySelector(".menu-button");
const mobileMenuButton = document.querySelector(".mobile-menu-button");
const headerElement = document.querySelector(".header");

if (mobileOverlay && menuButton && mobileMenuButton) {
  let menuOpen = false;

  function closeMenu() {
    if (!menuOpen) {return;}
    menuOpen = false;
    mobileOverlay.classList.remove("is-open");
    menuButton.classList.remove("is-open");
    menuButton.setAttribute("aria-expanded", "false");
  }

  function openMenu() {
    if (menuOpen) {return;}
    menuOpen = true;
    mobileOverlay.classList.add("is-open");
    menuButton.classList.add("is-open");
    menuButton.setAttribute("aria-expanded", "true");
  }

  function toggleMenu() {
    if (menuOpen) {closeMenu();} else {openMenu();}
  }

  mobileMenuButton.addEventListener("click", toggleMenu);

  // Close the menu when clicking outside of it or on a link inside it.
  document.addEventListener("click", (event) => {
    if (!menuOpen) {return;}
    const isClickInsideMenu = mobileOverlay.contains(event.target) || menuButton.contains(event.target);
    const clickedMenuLink = event.target instanceof Element && event.target.closest(".mobile-overlay a");
    if (!isClickInsideMenu || clickedMenuLink) {closeMenu();}
  });

  // Corner case: Close the menu when the viewport is resized to desktop size.
  const desktopMediaQuery = window.matchMedia("(min-width: 821px)");
  desktopMediaQuery.addEventListener("change", (event) => {
    if (event.matches) {closeMenu();}
  });

  // Hide the header when scrolling down, show it when scrolling up.
  if (headerElement) {
    let prevScroll = window.scrollY;
    const hideThreshold = 100;
    let scrollTicking = false;
    let headerHidden = headerElement.classList.contains("is-hidden");

    function onScroll() {
      const curScroll = window.scrollY;
      const shouldHideHeader = curScroll >= hideThreshold && prevScroll <= curScroll;

      if (shouldHideHeader !== headerHidden) {
        headerHidden = shouldHideHeader;
        headerElement.classList.toggle("is-hidden", shouldHideHeader);
      }

      if (menuOpen) {closeMenu();}
      prevScroll = curScroll;
    }

    // Use requestAnimationFrame to throttle the scroll event handler for better performance.
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

/*----------------
Profile image carousel: when the profile image is clicked, change to the next image.
-----------------*/
const profilePhotoElement = document.getElementById("showing-profile-photo");

if (profilePhotoElement) {
  const totalImgNum = 3; // only change this number when adding more images
  const imagePaths = Array.from({ length: totalImgNum }, (_, index) => `./images/profile/profile-${index + 1}.webp`);
  let currentIndex = 0;

  profilePhotoElement.addEventListener("click", () => {
    currentIndex = (currentIndex + 1) % totalImgNum;
    profilePhotoElement.src = imagePaths[currentIndex];
  });
}
