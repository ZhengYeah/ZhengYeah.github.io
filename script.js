const mobileOverlay = document.getElementsByClassName("mobile-overlay")[0];
const menuButton = document.getElementsByClassName("menu-button")[0];

let prevScroll = window.scrollY;
window.addEventListener("scroll", () => {
    let curScroll = window.scrollY;
    const headerElement = document.getElementsByClassName("header")[0];
    if (prevScroll > curScroll) {
        headerElement.style.top = "0";
    } else {
        headerElement.style.top = "-25vh";
    }
    prevScroll = curScroll;
    if (mobileOverlay.style.height === "auto") {
        mobileOverlay.style.height = "0";
        mobileOverlay.style.opacity = "0";
        menuButton.className = "menu-button";
    }
})

function toggleMenu() {
    if (mobileOverlay.style.height === "auto") {
        menuButton.className = "menu-button";
        mobileOverlay.style.height = "0";
        mobileOverlay.style.opacity = "0";
    } else {
        menuButton.className = "on-click-menu-button";
        mobileOverlay.style.height = "auto";
        mobileOverlay.style.opacity = "1";
    }
}

const mobileMenu = document.getElementsByClassName("mobile-menu-button")[0];
mobileMenu.addEventListener("click", toggleMenu)

window.addEventListener("resize", () => {
    let curWidth = window.screen.availWidth;
    if (curWidth > 1000) {
        mobileOverlay.style.height = "0";
        mobileOverlay.style.opacity = "0";
        menuButton.className = "menu-button";
    }
})