// menu bar scroll effect
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

// toggle menu mobile
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

// auto close menu when screen is resized to be smaller than 860px
window.addEventListener("resize", () => {
    let curWidth = window.screen.availWidth;
    if (curWidth > 860) {
        mobileOverlay.style.height = "0";
        mobileOverlay.style.opacity = "0";
        menuButton.className = "menu-button";
    }
})

// change profile image when clicked
const totalImgNum = 4;
const showingImg = document.getElementById("showing-profile");
let i = 1;
showingImg.addEventListener("click", () => {
    i = i % totalImgNum + 1;
    let imgPath = "./images/profile/profile-" + i + ".jpg";
    showingImg.setAttribute("src", imgPath);
})

const showingMobileImg = document.getElementById("showing-mobile-profile");
let j = 1;
showingMobileImg.addEventListener("click", () => {
    j = j % totalImgNum + 1;
    let imgPath = "./images/profile/profile-" + j + ".jpg";
    showingMobileImg.setAttribute("src", imgPath);
})
