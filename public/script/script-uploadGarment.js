/////////////// Open - Close upload garment card
const uploadGarmentButton = document.querySelector(".upload-garment-button");
const closeUploadCardButton = document.querySelector(
  ".close-upload-card-button",
);
const uploadCard = document.querySelector(".upload-card-container");
const areaToBlur = document.querySelectorAll(
  ".nav-bar, .filter-box, .content-container",
);

// Open the upload card
uploadGarmentButton.addEventListener("click", () => {
  areaToBlur.forEach((area) => {
    area.classList.add("blurred");
  });
  uploadCard.classList.remove("hidden");
});

// Close the upload card
closeUploadCardButton.addEventListener("click", () => {
  areaToBlur.forEach((area) => {
    area.classList.remove("blurred");
  });
  uploadCard.classList.add("hidden");
});

/////////////// Upload new garment
const uploadForm = document.querySelector(".upload-form");
uploadForm.addEventListener("submit", async (event) => {
  event.preventDefault();
});
