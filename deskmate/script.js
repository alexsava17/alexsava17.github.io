"use strict";

// TO DO !!!
// Make manufacturing section buttons work
// Make testimonials section work

// Variables

// nav
const nav = document.querySelector(".nav");
const navLinks = document.querySelectorAll(".nav__link");
const navBtn = document.querySelector(".nav__btn");

// header
const headerLink = document.querySelector(".header__link");

// Lazy images
const lazyImgs = document.querySelectorAll(".section__features .lazy__img");

// Nav

// -- nav links
nav.addEventListener("click", function (e) {
  e.preventDefault();
  const clicked = e.target;
  if (Array.from(navLinks).includes(clicked)) {
    document
      .querySelector(clicked.getAttribute("href"))
      .scrollIntoView({ behavior: "smooth" });
  }
  if (clicked === document.querySelector(".logo__img")) {
    document
      .querySelector(".header__container")
      .scrollIntoView({ behavior: "smooth" });
  }
});

// -- sticky nav
const headerContainer = document.querySelector(".header__container");
const navObserver = new IntersectionObserver(
  function (entries) {
    const [entry] = entries;
    console.log(entry);
    if (!entry.isIntersecting) {
      nav.classList.add("nav--sticky");
    } else {
      nav.classList.remove("nav--sticky");
    }
  },
  {
    root: null,
    threshold: 0,
    rootMargin: `-${nav.getBoundingClientRect().height}px`,
  }
);
navObserver.observe(headerContainer);

// Header: link
headerLink.addEventListener("click", function (e) {
  e.preventDefault();
  document
    .querySelector(this.getAttribute("href"))
    .scrollIntoView({ behavior: "smooth" });
});

// Lazy loading images in section features
const observerFeatures = new IntersectionObserver(
  function (entries, observer) {
    const [entry] = entries;
    if (entry.isIntersecting) {
      entry.target.classList.remove("lazy__img");
      entry.target.src = entry.target.dataset.src;
      observer.unobserve(entry.target);
    }
  },
  {
    root: null,
    threshold: 0.1,
    rootMargin: "60px",
  }
);
document
  .querySelectorAll(".section__features .lazy__img")
  .forEach(function (img, i) {
    observerFeatures.observe(img);
  });

// Lazy loading images in gallery
let currImg = 1;
const observerGallery = new IntersectionObserver(
  function (entries, observer) {
    const [entry] = entries;
    if (!entry.isIntersecting) return;
    entry.target.querySelectorAll(".gallery__img").forEach((img, i) => {
      const timer = setTimeout(() => {
        // img.src = img.dataset.src;
        img.style.opacity = "100";
        img.addEventListener("transitionend", function () {
          if (img.style.opacity === "100") {
            img.style.opacity = 0;
            const timer = setTimeout(() => {
              currImg === 10 ? (currImg = 1) : currImg++;
              img.src = `img/desk${currImg}.jpeg`;
              clearTimeout(timer);
            }, 2000);
          } else if (img.style.opacity === "0") img.style.opacity = 100;
        });
        clearTimeout(timer);
      }, i * 500);
    });
    observer.unobserve(entry.target);
  },
  { root: null, threshold: 0 }
);
observerGallery.observe(document.querySelector(".section__gallery"));

// Header arrows
let currArrow = 0;
setInterval(function () {
  currArrow === 2 ? (currArrow = 0) : ++currArrow;
  document.querySelectorAll(".arrow").forEach((arrow, i) => {
    arrow.classList.remove("arrow__active");
    i === currArrow && arrow.classList.add("arrow__active");
  });
}, 400);

const hideArrows = function (e) {
  console.log(e);
  document.querySelector(".arrows__box").classList.add("hidden");
  window.removeEventListener("scroll", hideArrows);
};
window.addEventListener("scroll", hideArrows);

// Manufacturing
document
  .querySelector(".manufacturing__box")
  .addEventListener("click", function (e) {
    const btns = this.querySelectorAll(".manufacturing__btn");
    if (!Array.from(btns).includes(e.target)) return;
    btns.forEach((btn) => btn.classList.remove("btn__active"));

    const boxes = this.querySelectorAll(".manufacturing__content");
    boxes.forEach((box) => box.classList.add("hidden"));

    const nr = e.target.dataset.nr;
    e.target.classList.add("btn__active");
    document
      .getElementById(`manufacturing__box--${nr}`)
      .classList.remove("hidden");
  });

// Testimonials
const testimonialBtnPrev = document.querySelector(
  ".section__testimonials .btn--prev"
);
const testimonialBtnNext = document.querySelector(
  ".section__testimonials .btn--next"
);
const testimonials = document.querySelectorAll(
  ".section__testimonials .testimonial"
);
let currSlide = 0;

testimonialBtnNext.addEventListener("click", function (e) {
  currSlide === testimonials.length - 1 ? (currSlide = 0) : currSlide++;
  testimonials.forEach((t, i) => {
    t.style.transform = `translateX(${(i - currSlide) * 100}%)`;
    // t.style.opacity = i === currSlide ? "100" : "0";
  });
});

testimonialBtnPrev.addEventListener("click", function (e) {
  currSlide === 0 ? (currSlide = testimonials.length - 1) : currSlide--;
  testimonials.forEach((t, i) => {
    t.style.transform = `translateX(${(i - currSlide) * 100}%)`;
    // t.style.opacity = i === currSlide ? "100" : "0";
  });
});

// Form button
const inputEmail = document.getElementById("cta__input");

document.querySelector(".btn__cta").addEventListener("click", function (e) {
  if (document.querySelector(".notification"))
    document.querySelector(".notification").remove();
  e.preventDefault();
  console.log(inputEmail.value);
  if (
    !inputEmail.value ||
    !inputEmail.value.includes("@") ||
    !inputEmail.value.includes(".")
  )
    return;
  headerContainer.scrollIntoView({ behavior: "smooth" });
  const notification = document.createElement("div");
  notification.innerHTML = `We will be sending the whole catalogue to ${inputEmail.value} ASAP ✅`;
  notification.classList.add("notification");
  nav.after(notification);
  inputEmail.value = "";
});
