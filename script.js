const mobileOverlay = document.getElementsByClassName("mobile-overlay")[0];
const menuButton = document.getElementsByClassName("menu-button")[0];
const headerElement = document.getElementsByClassName("header")[0];

/*
Menu bar scroll effect: when scrolling down, the header hides; when scrolling up, the header shows.
This effect is only applied after scrolling down 100px from the top.
*/
let prevScroll = window.scrollY;
const hideThreshold = 100;

function closeMenu() {
  mobileOverlay.style.height = "0";
  mobileOverlay.style.opacity = "0";
  menuButton.className = "menu-button";
  menuButton.setAttribute("aria-expanded", "false");
}

function onScroll() {
  const curScroll = window.scrollY;
  if (curScroll < hideThreshold) {
    headerElement.style.top = "0";
    prevScroll = curScroll;
  } else {
    if (prevScroll > curScroll) {
      headerElement.style.top = "0";
    } else {
      headerElement.style.top = "-25vh";
    }
    prevScroll = curScroll;
  }
  // Auto close menu when scrolling
  if (mobileOverlay.style.height === "auto") {
    closeMenu();
  }
}

let scrollTicking = false;
window.addEventListener("scroll", () => {
  if (scrollTicking) {
    return;
  }
  scrollTicking = true;
  requestAnimationFrame(() => {
    onScroll();
    scrollTicking = false;
  });
}, { passive: true });

/*
Toggle menu mobile: when the menu button is clicked, toggle the mobile menu.
When the mobile menu is open, change the menu button to a cross.
When clicking outside the mobile menu, close the mobile menu.
*/
function toggleMenu() {
  if (mobileOverlay.style.height === "auto") {
    closeMenu();
  } else {
    menuButton.className = "on-click-menu-button";
    mobileOverlay.style.height = "auto";
    mobileOverlay.style.opacity = "1";
    menuButton.setAttribute("aria-expanded", "true");
  }
}

const mobileMenu = document.getElementsByClassName("mobile-menu-button")[0];
mobileMenu.addEventListener("click", toggleMenu)

// Close menu when clicking outside the menu
document.addEventListener("click", (event) => {
  if (mobileOverlay.style.height === "auto") {
    const isClickInside = mobileOverlay.contains(event.target) || menuButton.contains(event.target);
    if (!isClickInside) {
      closeMenu();
    }
  }
})

/*
Corner case: auto close menu when screen is resized to be smaller than 860px.
This only happens when the menu is open and the screen is resized to be larger than 860px.
*/
window.addEventListener("resize", () => {
  const curWidth = window.innerWidth;
  if (curWidth > 860) {
    closeMenu();
  }
})

/*
Profile image carousel: when the profile image is clicked, change to the next image.
*/
const pcPhotoElement = document.getElementById("showing-pc-photo");
const mobilePhotoElement = document.getElementById("showing-mobile-photo");

if (pcPhotoElement || mobilePhotoElement) {
  const totalImgNum = 3; // only change this number when adding more images

  function createCarousel(imgElement, index) {
    const updateImage = (newIndex) => {
      index = newIndex;
      imgElement.setAttribute("src", `./images/profile/profile-${index}.webp`);
      return index;
    };
    return {
      next: () => updateImage(index % totalImgNum + 1),
    };
  }

  if (pcPhotoElement) {
    const pcCarousel = createCarousel(pcPhotoElement, 1);
    pcPhotoElement.addEventListener("click", pcCarousel.next);
  }

  if (mobilePhotoElement) {
    const mobileCarousel = createCarousel(mobilePhotoElement, 1);
    mobilePhotoElement.addEventListener("click", mobileCarousel.next);
  }
}
