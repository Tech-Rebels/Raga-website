// for Navbar
var navigation = new TimelineLite({paused:true, reversed:true});
navigation.to("#navigationWrap", 0.5, {opacity: 1, display: 'block'})
          .to(".navbar", 0.3, {opacity: 0}, "-=0.1")
          .to(".close", 0.3, {display: "block", opacity: 1}, "-=0.1")
          .from(".menu", 0.5, {opacity: 0, y: 30})
          .from(".social", 0.5, {opacity: 0});

$(".navbar, .close").click (function() {
  navigation.reversed() ? navigation.play() : navigation.reverse();
})
// for navbar cross movement and visibility change
document.addEventListener('DOMContentLoaded', () => {
    let interBubble = document.querySelector('.interactive');
    let navLinks = document.querySelectorAll('#navigationWrap .nav-link');
    let interactive = document.querySelector('#navigationWrap .interactive');

    if (interBubble) {
        let curX = 0;
        let curY = 0;
        let tgX = 0;
        let tgY = 0;

        function move() {
            curX += (tgX - curX) / 1.5;
            curY += (tgY - curY) / 1.5;
            interBubble.style.transform = `translate(${Math.round(curX)}px, ${Math.round(curY)}px)`;
            requestAnimationFrame(move);
        }
        window.addEventListener('mousemove', (event) => {
            tgX = event.clientX;
            tgY = event.clientY;
        });
        move();
    }

    if (navLinks && interactive) {
        navLinks.forEach(navLink => {
            navLink.addEventListener('mouseover', () => {
                interactive.style.display = 'none';
            });
            navLink.addEventListener('mouseout', () => {
                interactive.style.display = 'block';
            });
        });
    }
});
