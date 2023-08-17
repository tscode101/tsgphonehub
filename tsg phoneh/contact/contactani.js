const animatedSection = document.getElementById("contus");
const animatedElement = animatedSection.querySelector(".moving-text");
function checkifVisible(e) {
  const rect = e.getBoundingClientRect();
  return rect.top <= window.innerHeight && rect.bottom >= 0;
}

function updateContentVisibility() {
  if (checkifVisible(animatedElement)) {
    animatedElement.style.display = "block";
  } else {
    animatedElement.style.display = "none";
  }
}
window.addEventListener("scroll", updateContentVisibility);
window.addEventListener("resize", updateContentVisibility);

updateContentVisibility();

// re
const animatedText = document.querySelector(".moving-text");
const animationContainer = document.querySelector(".contus");

// const observer = new IntersectionObserver(
//   (entries) => {
//     entries.forEach((entry) => {
//       observer.observe(animationContainer);
//       const animatedText = document.querySelector(".moving-text");
//       const originalWhiteSpace =
//         window.getComputedStyle(animatedText).whiteSpace;
//     });
//   },
//   { threshold: 0.5 }
// );
animatedText.addEventListener("animationstart", () => {
  animatedText.style.whiteSpace = "nowrap";
});
animatedText.addEventListener("animationend", () => {
  animatedText.style.whiteSpace = originalWhiteSpace; // Revert to the original wrapping
});
export { animatedElement, animatedSection, animatedText };
