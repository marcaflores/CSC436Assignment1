console.log("Static Foundations loaded");

// Runs immediately (this script has no "defer"), before <body> paints,
// so a saved light-mode preference applies with no dark-then-light flash.
// Dark mode is the default: no attribute is set unless "light" was saved.
if (localStorage.getItem("theme") === "light") {
  document.documentElement.setAttribute("data-theme", "light");
}

document.addEventListener("DOMContentLoaded", function () {
  var themeToggle = document.getElementById("theme-toggle");

  if (themeToggle) {
    var isLight = document.documentElement.getAttribute("data-theme") === "light";
    themeToggle.setAttribute("aria-pressed", String(isLight));

    themeToggle.addEventListener("click", function () {
      isLight = document.documentElement.getAttribute("data-theme") === "light";

      if (isLight) {
        document.documentElement.removeAttribute("data-theme");
        localStorage.setItem("theme", "dark");
      } else {
        document.documentElement.setAttribute("data-theme", "light");
        localStorage.setItem("theme", "light");
      }

      themeToggle.setAttribute("aria-pressed", String(!isLight));
    });
  }

  document.querySelectorAll("[data-carousel]").forEach(function (carousel) {
    var track = carousel.querySelector(".carousel-track");
    var slides = Array.from(track.children);
    var prevBtn = carousel.querySelector(".carousel-prev");
    var nextBtn = carousel.querySelector(".carousel-next");
    var dotsContainer = carousel.querySelector(".carousel-dots");
    var index = 0;

    if (slides.length <= 1) {
      if (slides[0]) {
        slides[0].classList.add("is-active");
      }
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
      slides.forEach(function (slide, i) {
        slide.classList.toggle("is-active", i === index);
      });
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
