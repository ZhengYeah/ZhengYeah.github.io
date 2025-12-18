const mobileOverlay = document.getElementsByClassName("mobile-overlay")[0];
const menuButton = document.getElementsByClassName("menu-button")[0];

/*
Menu bar scroll effect: when scrolling down, the header hides; when scrolling up, the header shows.
This effect is only applied after scrolling down 100px from the top.
*/
let prevScroll = window.scrollY;
const hideThreshold = 100;

window.addEventListener("scroll", () => {
    let curScroll = window.scrollY;
    const headerElement = document.getElementsByClassName("header")[0];
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
    // auto close menu when scrolling
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
    } else {
        menuButton.className = "on-click-menu-button";
        mobileOverlay.style.height = "auto";
        mobileOverlay.style.opacity = "1";
    }
}
const mobileMenu = document.getElementsByClassName("mobile-menu-button")[0];
mobileMenu.addEventListener("click", toggleMenu)

// close menu when clicking outside the menu
document.addEventListener("click", (event) => {
    if (mobileOverlay.style.height === "auto") {
        const isClickInside = mobileOverlay.contains(event.target) || menuButton.contains(event.target);
        if (!isClickInside) {
            mobileOverlay.style.height = "0";
            mobileOverlay.style.opacity = "0";
            menuButton.className = "menu-button";
        }
    }
})

/*
Corner case: auto close menu when screen is resized to be smaller than 860px.
This only happens when the menu is open and the screen is resized to be larger than 860px.
*/
window.addEventListener("resize", () => {
    let curWidth = window.screen.availWidth;
    if (curWidth > 860) {
        mobileOverlay.style.height = "0";
        mobileOverlay.style.opacity = "0";
        menuButton.className = "menu-button";
    }
})

/*
Profile image carousel: when the profile image is clicked, change to the next image.
*/
// if not home page, do not run the profile image carousel script
if (!document.getElementById("showing-profile")) {
    // do nothing
} else {
    const totalImgNum = 3; // only change this number when adding more images

// change profile image when clicked (PC)
    const showingImg = document.getElementById("showing-profile");
    let i = 1;
    showingImg.addEventListener("click", () => {
        i = i % totalImgNum + 1;
        let imgPath = "./images/profile/profile-" + i + ".jpg";
        showingImg.setAttribute("src", imgPath);
    })

// change profile image when the img and buttons are clicked (mobile)
    const showingMobileImg = document.getElementById("showing-mobile-profile");
    let j = 1;
    showingMobileImg.addEventListener("click", () => {
        j = j % totalImgNum + 1;
        let imgPath = "./images/profile/profile-" + j + ".jpg";
        showingMobileImg.setAttribute("src", imgPath);
    })
// left and right buttons for mobile
    const leftButton = document.getElementById("profile-left-button");
    const rightButton = document.getElementById("profile-right-button");
    leftButton.addEventListener("click", () => {
        j = (j - 2 + totalImgNum) % totalImgNum + 1;
        let imgPath = "./images/profile/profile-" + j + ".jpg";
        showingMobileImg.setAttribute("src", imgPath);
    })
    rightButton.addEventListener("click", () => {
        j = j % totalImgNum + 1;
        let imgPath = "./images/profile/profile-" + j + ".jpg";
        showingMobileImg.setAttribute("src", imgPath);
    })
}

