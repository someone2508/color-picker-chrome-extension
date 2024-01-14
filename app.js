const colorPickerBtn = document.querySelector("#color-picker");
const clearAll = document.querySelector(".clear-all");
const colorList = document.querySelector(".all-colors");

// ["#djiwjd, #dejdie, #cecekc, #dhiehdi"]
let pickedColors = JSON.parse(localStorage.getItem("picked-colors") || "[]");

function copyColor(spanElem) {
  spanElem.innerText = "Copied!";

  let color = spanElem.dataset.color;
  console.log(color);
  navigator.clipboard.writeText(color);

  setTimeout(() => (spanElem.innerText = spanElem.dataset.color), 1000);
}

const listColors = () => {
  if (!pickedColors.length) return;

  colorList.innerHTML = pickedColors
    .map((color) => {
      return `<li class="color">
        <span class="rect" style="background: ${color}; border: 1px solid black"></span>
        <span data-color=${color}>${color}</span>
    </li>`;
    })
    .join("");

  document.querySelector(".picked-colors").classList.remove("hide");

  // add code to copy color on click of the button! PENDING!

  document.querySelectorAll(".color").forEach((li) => {
    li.addEventListener("click", (e) =>
      copyColor(e.currentTarget.lastElementChild)
    );
  });
};

listColors();

const activateEyeDroper = async () => {
  console.log("activateEyeDroper is called1");
  document.body.style.display = "none";

  const eyeDropper = new EyeDropper();
  const { sRGBHex } = await eyeDropper.open();

  console.log(pickedColors);

  // 1) store the color in the list
  if (!pickedColors.includes(sRGBHex)) {
    pickedColors.push(sRGBHex);
    localStorage.setItem("picked-colors", JSON.stringify(pickedColors));
    listColors();
  }
  // 2) copy this color in the clipboard
  navigator.clipboard.writeText(sRGBHex);

  document.body.style.display = "block";
};

function clearAllColors() {
  pickedColors = [];
  localStorage.setItem("picked-colors", JSON.stringify(pickedColors));
  document.querySelector(".picked-colors").classList.add("hide");
}

clearAll.addEventListener("click", clearAllColors);
colorPickerBtn.addEventListener("click", activateEyeDroper);
