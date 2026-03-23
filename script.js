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

/*----------------
Tooltips: lazy-load tooltip dependencies after idle time or first interaction.
-----------------*/
let tooltipLoaderPromise;
let tooltipsInitialized = false;

// Returns a promise that resolves when the script is loaded, or rejects if it fails to load.
function loadScript(src) {
  return new Promise((resolve, reject) => {
    const existingScript = document.querySelector(`script[src="${src}"]`);
    if (existingScript) {
      existingScript.addEventListener("load", resolve, { once: true });
      existingScript.addEventListener("error", reject, { once: true });
      if (existingScript.dataset.loaded === "true") {
        resolve();
      }
      return;
    }
    const script = document.createElement("script");
    script.src = src;
    script.defer = true;
    script.addEventListener("load", () => {
      script.dataset.loaded = "true";
      resolve();
    }, { once: true });
    script.addEventListener("error", reject, { once: true });
    document.head.appendChild(script);
  });
}

// Loads Popper.js and Tippy.js sequentially, then initializes tooltips.
// Current popper.js version: https://unpkg.com/@popperjs/core@2.11.8/dist/umd/popper.min.js
// Current tippy.js version: https://unpkg.com/tippy.js@6/dist/tippy-bundle.umd.js
function loadTooltipDependencies() {
  if (!tooltipLoaderPromise) {
    tooltipLoaderPromise = loadScript("vendor/popper.min.js")
      .then(() => loadScript("vendor/tippy-bundle.umd.min.js"))
      .then(() => {
        initializeTooltips();
      })
      .catch(() => {
        tooltipLoaderPromise = null;
      });
  }
  return tooltipLoaderPromise;
}

// Initializes tooltips on the page. This function is called after the tooltip libraries are loaded.
function initializeTooltips() {
  if (tooltipsInitialized) {return;}

  const tippyInstance = window.tippy;
  if (typeof tippyInstance !== "function") {return;}

  tooltipsInitialized = true;
  tippyInstance.setDefaultProps({
    zIndex: 1,
    animation: false,
    allowHTML: false,
    interactive: false,
    touch: ["hold", 200], // Show tooltip on long press for touch devices, with a delay of 200ms
  });
  tippyInstance("#navbar-misc", {
    content: "My theses and other materials 📄",
    placement: "bottom",
    zIndex: 11, // Ensure it appears above the header (header has z-index: 10)
    touch: false,
  });
  tippyInstance("#past-topics-link", {
    content: "<strong>2020 – 2023:</strong> Neural Network Verification <br> <strong>2016 – 2020:</strong> Pure Mathematics",
    allowHTML: true,
  });
  tippyInstance("#showing-profile-photo", {
    content: "Click to see more photos 😊",
  });
  tippyInstance("#zhihu-link", {
    content: "My writings in liberal arts 🌟",
    touch: true,
  });
  tippyInstance("#demo-link", {
    content: "Lower your device's volume first in a public space 🔊",
  });
  if (document.querySelector(".publications-list")) {
    tippyInstance.delegate(".publications-list", {
      target: ".paper-tldr", // Better performance by delegating to the container instead of initializing on each element
    });
  }
}

// List of events that indicate user interaction and should trigger tooltip loading. Use passive listeners for better performance.
const tooltipInteractionEvents = ["pointerover", "focusin", "touchstart"];

function scheduleTooltipLoad() {
  if ("requestIdleCallback" in window) {
    window.requestIdleCallback(() => {
      loadTooltipDependencies();
    }, { timeout: 1500 });
    return;
  }

  window.setTimeout(() => {
    loadTooltipDependencies();
  }, 800);
}

tooltipInteractionEvents.forEach((eventName) => {
  window.addEventListener(eventName, loadTooltipDependencies, { once: true, passive: true });
});

window.addEventListener("load", scheduleTooltipLoad, { once: true });
