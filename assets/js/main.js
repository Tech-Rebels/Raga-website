// for loader
document.addEventListener("DOMContentLoaded", function () {
  const loader = document.querySelector(".loader");
  const loaderBar = document.querySelector(".loader-bar");

  let loaderHeight = 0;
  let targetHeight = 55; // Target height for the loader bar
  const animationDuration = 3000; // Animation duration in milliseconds
  const frameDuration = 2000 / 80; // Targeting 60 frames per second

  let startTime = null;

  function animateLoader(timestamp) {
    if (!startTime) {
      startTime = timestamp;
    }

    const progress = timestamp - startTime;
    const percentageProgress = progress / animationDuration;
    loaderHeight = percentageProgress * targetHeight;

    if (loaderHeight >= targetHeight) {
      loaderHeight = targetHeight;
    }

    loaderBar.style.height = loaderHeight + "vh";

    if (progress < animationDuration) {
      requestAnimationFrame(animateLoader);
    } else {
      loader.style.display = "none";
      document.body.classList.add("loaded");
    }
  }

  requestAnimationFrame(animateLoader);
});

// for Navbar
var navigation = new TimelineLite({ paused: true, reversed: true });
navigation
  .to("#navigationWrap", 0.5, { opacity: 1, display: "block" })
  .to(".navbar", 0.3, { opacity: 0 }, "-=0.1")
  .to(".close", 0.3, { display: "block", opacity: 1 }, "-=0.1")
  .from(".menu", 0.5, { opacity: 0, y: 30 })
  .from(".social", 0.5, { opacity: 0 });

var isAnimating = false; // Flag to track animation state

$(".navbar, .close").click(function () {
  if (!isAnimating) {
    // Check if animation is already in progress
    isAnimating = true; // Set flag to true to prevent multiple clicks during animation
    if (navigation.reversed()) {
      navigation.play().eventCallback("onComplete", function () {
        isAnimating = false; // Reset flag after animation completes
      });
    } else {
      navigation.reverse().eventCallback("onReverseComplete", function () {
        isAnimating = false; // Reset flag after animation completes
      });
    }
  }
});

// for navbar cross movement and visibility change
document.addEventListener("DOMContentLoaded", () => {
  let interBubble = document.querySelector(".interactive");
  let navLinks = document.querySelectorAll("#navigationWrap .nav-link");
  let interactive = document.querySelector("#navigationWrap .interactive");

  if (interBubble) {
    let curX = 0;
    let curY = 0;
    let tgX = 0;
    let tgY = 0;

    function move() {
      curX += (tgX - curX) / 1.5;
      curY += (tgY - curY) / 1.5;
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
  }

  if (navLinks && interactive) {
    navLinks.forEach((navLink) => {
      navLink.addEventListener("mouseover", () => {
        interactive.style.display = "none";
      });
      navLink.addEventListener("mouseout", () => {
        interactive.style.display = "block";
      });
    });
  }
});

// for about count
$(document).ready(function () {
  var section2Top = $(".about").offset().top - $(window).height() / 2;

  $(window).on("scroll", function () {
    var scrollTop = $(window).scrollTop();
    // Check if the user has scrolled to section 2
    if (scrollTop > section2Top) {
      $(".counter").each(function () {
        var $this = $(this);
        var countTo = parseInt($this.attr("data-countto"));
        var countDuration = parseInt($this.attr("data-duration"));
        $({ countNum: $this.text() }).animate(
          {
            countNum: countTo,
          },
          {
            duration: countDuration,
            easing: "linear",
            step: function () {
              $this.text(Math.floor(this.countNum));
            },
            complete: function () {
              $this.text(this.countNum);
            },
          }
        );
      });

      // Unbind scroll event to prevent multiple animations
      $(window).off("scroll");
    }
  });
});


$(function () {
  var f = $('body'); //document.getElementById("body");
  var contentHeight = f.scrollHeight;
  var declaredHeight = $(f).height();

  var contentWidth = f.scrollWidth;
  var declaredWidth = $(f).width();
  if (contentHeight > declaredHeight) {
      console.log("invalid height");
  }
  if (contentWidth > declaredWidth) {
      console.log("invalid width");
  }
});