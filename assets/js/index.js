// founder gradient
document.addEventListener("DOMContentLoaded", () => {
  const interBubble = document.querySelector(".g-interactive");
  let curX = 0;
  let curY = 0;
  let tgX = 0;
  let tgY = 0;

  function move() {
    curX += (tgX - curX) / 20;
    curY += (tgY - curY) / 20;
    interBubble.style.transform = `translate(${Math.round(
      curX
    )}px, ${Math.round(curY)}px)`;
    requestAnimationFrame(move);
  }

  window.addEventListener("mousemove", (event) => {
    tgX = event.clientX;
    tgY = event.clientY;
  });

  move();
});

// horizontal scroll
gsap.registerPlugin(ScrollTrigger);

let horizontalSection = document.querySelector(".horizontal");
// console.log(horizontalSection.scrollWidth);
gsap.to(".horizontal", {
  x: () => horizontalSection.scrollWidth * -1,
  xPercent: 100,
  scrollTrigger: {
    trigger: ".horizontal",
    start: "center center",
    end: "+=2000px",
    pin: "#horizontal-scoll",
    scrub: true,
    invalidateOnRefresh: true,
  },
});
// flagship event tilt
( function( $ ) {
	"use strict";
  $(".card").tilt({
    maxTilt: 15,
    perspective: 1400,
    easing: "cubic-bezier(.03,.98,.52,.99)",
    speed: 1200,
    glare: true,
    maxGlare: 0.2,
    scale: 1.04
  });
  
}( jQuery ) );

// contact button
var magnets = document.querySelectorAll(".magnetic");
var strength = 50;

magnets.forEach((magnet) => {
  magnet.addEventListener("mousemove", moveMagnet);
  magnet.addEventListener("mouseout", function (event) {
    TweenMax.to(event.currentTarget, 1, { x: 0, y: 0, ease: Power4.easeOut });
  });
});

function moveMagnet(event) {
  var magnetButton = event.currentTarget;
  var bounding = magnetButton.getBoundingClientRect();

  TweenMax.to(magnetButton, 1, {
    x:
      ((event.clientX - bounding.left) / magnetButton.offsetWidth - 0.5) *
      strength,
    y:
      ((event.clientY - bounding.top) / magnetButton.offsetHeight - 0.5) *
      strength,
    ease: Power4.easeOut,
  });
}

// contact form
document.getElementById("contact-form").addEventListener("submit", function (event) {
  event.preventDefault();

  var accessKeyInput = document.createElement("input");
  accessKeyInput.type = "hidden";
  accessKeyInput.name = "access_key";
  accessKeyInput.value = "7d7ec12f-c4cc-499b-9970-def376882506";

  event.target.appendChild(accessKeyInput);

  var formData = new FormData(event.target);
  event.target.removeChild(accessKeyInput);

  fetch("https://api.web3forms.com/submit", {
    method: "POST",
    body: formData,
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.success) {
        alert("Hooray! Your message has been sent successfully.");
      } else {
        alert("Uh-oh! A little glitch. Please!, Retry later");
      }
    })
    .catch(() => {
      alert("Uh-oh! A little glitch. Please!, Retry later");
    });
});
