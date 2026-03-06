/*
Profile image carousel: when the profile image is clicked, change to the next image.
*/
const profilePhotoElement = document.getElementById("showing-profile-photo");
const pcPhotoElement = document.getElementById("showing-pc-photo");
const mobilePhotoElement = document.getElementById("showing-mobile-photo");
const photoElements = [profilePhotoElement, pcPhotoElement, mobilePhotoElement].filter(Boolean);

if (photoElements.length > 0) {
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

  photoElements.forEach((photoElement) => {
    const carousel = createCarousel(photoElement, 1);
    photoElement.addEventListener("click", carousel.next);
  });
}
