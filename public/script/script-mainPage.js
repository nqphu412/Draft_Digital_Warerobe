/////////////// Main page

// Retrieve current user's username
const currentUsername = sessionStorage.getItem("currentUser");
const usernameDisplay = document.getElementById("current-username-display");
usernameDisplay.textContent = `@${currentUsername}`;

// Grid for all garments
const itemData = {
  // Later, this one is exported from the data table item (1 user) or warerobe (when integrate many users)
  // Ignore index here, all in order that they are added
  // itemName: ["category", "color"]
  item1: ["top", "lightblue"],
  item2: ["bottom", "yellow"],
  item3: ["hat", "white"],
  item4: ["bottom", "white"],
  item5: ["footwear", "gray"],
  item6: ["footwear", "gray"],
  item7: ["footwear", "pink"],
  item8: ["top", "lightblue"],
  item9: ["footwear", "pink"],
  item10: ["top", "lightblue"],
  item11: ["top", "pink"],
  item12: ["accessory", "lightcoral"],
  item13: ["footwear", "pink"],
  item14: ["footwear", "lightcoral"],
  item15: ["bottom", "gray"],
  item16: ["accessory", "tan"],
  item17: ["accessory", "lightblue"],
  item18: ["bottom", "lightblue"],
  item19: ["bottom", "white"],
  item20: ["footwear", "lightcoral"],
  item21: ["accessory", "white"],
  item22: ["top", "white"],
  item23: ["bottom", "mediumaquamarine"],
  item24: ["footwear", "tan"],
  item25: ["top", "lightblue"],
  item26: ["footwear", "lightcoral"],
  item27: ["bottom", "mediumaquamarine"],
  item28: ["footwear", "yellow"],
  item29: ["accessory", "tan"],
  item30: ["top", "lightblue"],
  item31: ["bottom", "tan"],
  item32: ["accessory", "gray"],
};
let currentCategory = "allCategory";
let currentColor = "allColor";

const warerobe_grid = document.querySelector(".warerobe-grid");
if (warerobe_grid) showWarerobe(currentCategory, currentColor);

// Allows 1 button selected at a time
// Only items that in that category are shown
const categoryOptionButtons = document.querySelectorAll(".category-option");
categoryOptionButtons.forEach((categoryButton) => {
  categoryButton.addEventListener("click", () => {
    categoryOptionButtons.forEach((categoryBtn) =>
      categoryBtn.classList.remove("selected"),
    );
    categoryButton.classList.add("selected");
    showWarerobe(categoryButton.value, currentColor);
  });
});

// Filter warerobe based on color selected
const colorOptionDropbox = document.querySelector("#color-options");
if (colorOptionDropbox) {
  colorOptionDropbox.addEventListener("change", () => {
    showWarerobe(currentCategory, colorOptionDropbox.value);
  });
}

// Show warerobe based on current option of category and color
function showWarerobe(categoryType, colorType) {
  warerobe_grid.innerHTML = `
          <button class="upload-garment-button">
            <div>&#x21D1;</div>
            <div>Upload New Garment</div>
          </button>`;
  currentCategory = categoryType;
  currentColor = colorType;
  // console.log(currentCategory);

  function showSelectedItem(selectedItem, categoryType, colorType) {
    const eachItemDiv = document.createElement("div");
    eachItemDiv.classList.add("each-garment");
    eachItemDiv.style.backgroundColor = itemData[selectedItem][1]; // This line is only used to text color dropbox
    eachItemDiv.dataset.category = itemData[selectedItem];
    eachItemDiv.innerHTML = `
                <div>${selectedItem}</div>
                <div>Đây là ${itemData[selectedItem][0]}, ${itemData[selectedItem][1]}</div>`;
    warerobe_grid.appendChild(eachItemDiv);
  }

  for (const item in itemData) {
    if (categoryType === "allCategory") {
      if (colorType === "allColor")
        showSelectedItem(item, categoryType, colorType);
      else if (itemData[item].includes(colorType))
        showSelectedItem(item, categoryType, colorType);
    } else if (itemData[item].includes(categoryType)) {
      if (colorType === "allColor")
        showSelectedItem(item, categoryType, colorType);
      else if (itemData[item].includes(colorType))
        showSelectedItem(item, categoryType, colorType);
    }
  }
}

/////////////// Open - Close upload garment card
const uploadGarmentButton = document.querySelector(".upload-garment-button");
const closeUploadCardButton = document.querySelector(
  ".close-upload-card-button",
);

uploadGarmentButton.addEventListener("click", () => {
  const area1 = document.querySelector(".nav-bar");
  const area2 = document.querySelector(".filter-box");
  const area3 = document.querySelector(".content-container");
  const uploadCard = document.querySelector(".upload-card-container");

  area1.classList.add("blurred");
  area2.classList.add("blurred");
  area3.classList.add("blurred");
  uploadCard.classList.remove("hidden");
});

closeUploadCardButton.addEventListener("click", () => {
  const area1 = document.querySelector(".nav-bar");
  const area2 = document.querySelector(".filter-box");
  const area3 = document.querySelector(".content-container");
  const uploadCard = document.querySelector(".upload-card-container");

  area1.classList.remove("blurred");
  area2.classList.remove("blurred");
  area3.classList.remove("blurred");
  uploadCard.classList.add("hidden");
});
