import { slideSource } from "./imageData.js";

("use strict");

const timestep = 4000;
// set slider height in style.css variable

let actualSlide = 0;
const slide = document.querySelector(".slide");
const nextSlideButton = document.querySelector(".next");
const prevSlideButton = document.querySelector(".previous");
const actualImage = document.querySelector(".image");
const actualText = document.querySelector(".text");
const actualNumber = document.querySelector(".number");
const actualCircle = document.querySelectorAll(".circle");

const displaySlide = (n) => {
  slide.classList.remove("animate");
  actualImage.setAttribute("src", slideSource.fileName[n]);
  actualImage.setAttribute("alt", slideSource.text[n]);
  actualText.textContent = slideSource.text[n];
  actualNumber.textContent = slideSource.numbers[n];
  changeCircleClassList(n);
  void slide.offsetWidth; // ezzel működik csak az animáció
  slide.classList.add("animate");
  actualSlide = n;
};

const changeActualSlide = (n) => {
  actualSlide = actualSlide + n;

  if (actualSlide == -1) {
    // biztosítjuk a körkörösséget
    actualSlide = 3;
  }

  if (actualSlide == 4) {
    actualSlide = 0;
  }

  displaySlide(actualSlide);
};

const changeCircleClassList = (n) => {
  for (let i = 0; i < actualCircle.length; i++) {
    actualCircle[i].classList.remove("active");
  }
  actualCircle[n].classList.add("active");
};

const addEventListeneres = () => {
  nextSlideButton.addEventListener("click", () => changeActualSlide(+1));
  prevSlideButton.addEventListener("click", () => changeActualSlide(-1));

  actualCircle.forEach((item, index) =>
    item.addEventListener("click", () => displaySlide(index))
  );
};

const changeSlideTimer = () => {
  setInterval(() => {
    changeActualSlide(+1);
  }, timestep);
};

const start = () => {
  addEventListeneres();
  displaySlide(actualSlide);
  changeSlideTimer();
};

start();
