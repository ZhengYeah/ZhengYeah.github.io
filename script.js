const mobileOverlay = document.getElementsByClassName("mobile-overlay")[0];
const menuButton = document.getElementsByClassName("menu-button")[0];
const headerElement = document.getElementsByClassName("header")[0];

/*
Menu bar scroll effect: when scrolling down, the header hides; when scrolling up, the header shows.
This effect is only applied after scrolling down 100px from the top.
*/
let prevScroll = window.scrollY;
const hideThreshold = 100;

window.addEventListener("scroll", () => {
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
    mobileOverlay.style.height = "0";
    mobileOverlay.style.opacity = "0";
    menuButton.className = "menu-button";
  }
})

/*
Toggle menu mobile: when the menu button is clicked, toggle the mobile menu.
When the mobile menu is open, change the menu button to a cross.
When clicking outside the mobile menu, close the mobile menu.
*/
function toggleMenu() {
  if (mobileOverlay.style.height === "auto") {
    menuButton.className = "menu-button";
    mobileOverlay.style.height = "0";
    mobileOverlay.style.opacity = "0";
    menuButton.setAttribute("aria-expanded", "false");
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
      mobileOverlay.style.height = "0";
      mobileOverlay.style.opacity = "0";
      menuButton.className = "menu-button";
      menuButton.setAttribute("aria-expanded", "false");
    }
  }
})

/*
Corner case: auto close menu when screen is resized to be smaller than 860px.
This only happens when the menu is open and the screen is resized to be larger than 860px.
*/
window.addEventListener("resize", () => {
  const curWidth = window.screen.availWidth;
  if (curWidth > 860) {
    mobileOverlay.style.height = "0";
    mobileOverlay.style.opacity = "0";
    menuButton.className = "menu-button";
    menuButton.setAttribute("aria-expanded", "false");
  }
})

/*
Profile image carousel: when the profile image is clicked, change to the next image.
*/
if (document.getElementById("showing-profile")) {
  const totalImgNum = 3; // only change this number when adding more images

  function createCarousel(imgElement, index) {
    const updateImage = (newIndex) => {
      index = newIndex;
      imgElement.setAttribute("src", `./images/profile/profile-${index}.jpg`);
      return index;
    };
    return {
      next: () => updateImage(index % totalImgNum + 1),
      prev: () => updateImage((index - 2 + totalImgNum) % totalImgNum + 1)
    };
  }

  const pcCarousel = createCarousel(document.getElementById("showing-profile"), 1);
  const mobileCarousel = createCarousel(document.getElementById("showing-mobile-profile"), 1);

  document.getElementById("showing-profile").addEventListener("click", pcCarousel.next);
  document.getElementById("showing-mobile-profile").addEventListener("click", mobileCarousel.next);
  document.getElementById("profile-left-button").addEventListener("click", mobileCarousel.prev);
  document.getElementById("profile-right-button").addEventListener("click", mobileCarousel.next);
}
