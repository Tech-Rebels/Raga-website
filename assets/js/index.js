// hero section

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

// our flagship events - swiperJS
const swiper = new Swiper(".swiper-slider", {
  // Optional parameters
  centeredSlides: true,
  slidesPerView: 1,
  grabCursor: true,
  freeMode: false,
  loop: true,
  mousewheel: false,
  keyboard: {
    enabled: true,
  },
  // Enabled autoplay mode
  autoplay: {
    delay: 3000,
    disableOnInteraction: false,
  },
  // If we need pagination
  pagination: {
    el: ".swiper-pagination",
    dynamicBullets: false,
    clickable: true,
  },
  // If we need navigation
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  // Responsive breakpoints
  breakpoints: {
    640: {
      slidesPerView: 1.25,
      spaceBetween: 20,
    },
    1024: {
      slidesPerView: 2,
      spaceBetween: 20,
    },
  },
});


// types of events

document.addEventListener( 'DOMContentLoaded', function () {
  new Splide('#splide', {
    type: 'loop',
    perPage: 3,
    focus: 'center',
    autoplay: true,
    interval: 3000,
    flickMaxPages: 3,
    updateOnMove: true,
    pagination: false,
    padding: '10%',
    throttle: 300,
    breakpoints: {
      1440: {
        perPage: 3,
        padding: '30%'
      },
      1025: {
        perPage: 1,
        padding: '10%',
      },
      769: {
        perPage: 1,
        padding: '10%'
      }
    }
  }).mount();
});

// const swiper2 = new Swiper(".swiper-slider2", {
//   // Optional parameters
//   centeredSlides: true,
//   slidesPerView: 1,
//   grabCursor: true,
//   freeMode: false,
//   loop: true,
//   mousewheel: false,
//   keyboard: {
//     enabled: true,
//   },
//   // Enabled autoplay mode
//   autoplay: {
//     delay: 3000,
//     disableOnInteraction: false,
//   },
//   // If we need pagination
//   pagination: {
//     el: ".swiper-pagination",
//     dynamicBullets: false,
//     clickable: true,
//   },
//   // If we need navigation
//   navigation: {
//     nextEl: ".swiper-button-next",
//     prevEl: ".swiper-button-prev",
//   },
//   // Responsive breakpoints
//   breakpoints: {
//     640: {
//       slidesPerView: 1.25,
//       spaceBetween: 20,
//     },
//     1024: {
//       slidesPerView: 2,
//       spaceBetween: 20,
//     },
//   },
// });

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
document
  .getElementById("contact-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    var accessKeyInput = document.createElement("input");
    accessKeyInput.type = "hidden";
    accessKeyInput.name = "access_key";
    accessKeyInput.value = "7d7ec12f-c4cc-499b-9970-def376882506";

    event.target.appendChild(accessKeyInput);

    var formData = new FormData(event.target);
    var object = {};
    formData.forEach(function (value, key) {
      object[key] = value;
    });
    var json = JSON.stringify(object);

    event.target.removeChild(accessKeyInput);

    fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: json,
      headers: {
        "Content-Type": "application/json",
      },
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
