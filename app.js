console.log("Static Foundations loaded");

document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll("[data-carousel]").forEach(function (carousel) {
    var track = carousel.querySelector(".carousel-track");
    var slides = Array.from(track.children);
    var prevBtn = carousel.querySelector(".carousel-prev");
    var nextBtn = carousel.querySelector(".carousel-next");
    var dotsContainer = carousel.querySelector(".carousel-dots");
    var index = 0;

    if (slides.length <= 1) {
      prevBtn.hidden = true;
      nextBtn.hidden = true;
      return;
    }

    var dots = slides.map(function (_, i) {
      var dot = document.createElement("button");
      dot.type = "button";
      dot.className = "carousel-dot";
      dot.setAttribute("aria-label", "Go to image " + (i + 1));
      dot.addEventListener("click", function () {
        goTo(i);
      });
      dotsContainer.appendChild(dot);
      return dot;
    });

    function update() {
      track.style.transform = "translateX(" + index * -100 + "%)";
      dots.forEach(function (dot, i) {
        dot.classList.toggle("active", i === index);
      });
    }

    function goTo(i) {
      index = (i + slides.length) % slides.length;
      update();
    }

    prevBtn.addEventListener("click", function () {
      goTo(index - 1);
    });

    nextBtn.addEventListener("click", function () {
      goTo(index + 1);
    });

    update();
  });

  var revealTargets = document.querySelectorAll(".reveal");

  if ("IntersectionObserver" in window && revealTargets.length) {
    var revealObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    revealTargets.forEach(function (target) {
      revealObserver.observe(target);
    });
  } else {
    revealTargets.forEach(function (target) {
      target.classList.add("is-visible");
    });
  }
});
