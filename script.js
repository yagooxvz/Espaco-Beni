(function () {
  "use strict";

  // ===== Ano no footer =====
  var anoEl = document.getElementById("ano");
  if (anoEl) {
    anoEl.textContent = new Date().getFullYear();
  }

  // ===== Menu mobile =====
  var navToggle = document.getElementById("navToggle");
  var navMenu = document.getElementById("navMenu");

  if (navToggle && navMenu) {
    navToggle.addEventListener("click", function () {
      navMenu.classList.toggle("active");
      navToggle.classList.toggle("active");
      document.body.style.overflow = navMenu.classList.contains("active")
        ? "hidden"
        : "";
    });

    navMenu.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        navMenu.classList.remove("active");
        navToggle.classList.remove("active");
        document.body.style.overflow = "";
      });
    });
  }

  // ===== Galeria (carrossel + thumbnails + lightbox) =====
  var track = document.getElementById("galeriaTrack");
  var prevBtn = document.getElementById("galeriaPrev");
  var nextBtn = document.getElementById("galeriaNext");
  var dotsContainer = document.getElementById("galeriaDots");
  var thumbsContainer = document.getElementById("galeriaThumbs");
  var lightbox = document.getElementById("lightbox");
  var lightboxImg = document.getElementById("lightboxImg");
  var lightboxClose = document.getElementById("lightboxClose");

  if (track && prevBtn && nextBtn) {
    var items = track.querySelectorAll(".galeria-item");
    var total = items.length;
    var current = 0;
    var autoplayInterval;

    function goToSlide(index) {
      if (index < 0) index = total - 1;
      if (index >= total) index = 0;
      current = index;
      track.style.transform = "translateX(-" + current * 100 + "%)";
      updateDots();
      updateThumbs();
    }

    function updateDots() {
      if (!dotsContainer) return;
      var dots = dotsContainer.querySelectorAll(".galeria-dot");
      dots.forEach(function (dot, i) {
        dot.classList.toggle("active", i === current);
      });
    }

    function updateThumbs() {
      if (!thumbsContainer) return;
      var thumbs = thumbsContainer.querySelectorAll(".galeria-thumb");
      thumbs.forEach(function (thumb, i) {
        thumb.classList.toggle("active", i === current);
      });
    }

    function createDots() {
      if (!dotsContainer || total <= 0) return;
      dotsContainer.innerHTML = "";
      for (var i = 0; i < total; i++) {
        var dot = document.createElement("button");
        dot.type = "button";
        dot.className = "galeria-dot" + (i === 0 ? " active" : "");
        dot.setAttribute("aria-label", "Ir para imagem " + (i + 1));
        dot.addEventListener(
          "click",
          (function (idx) {
            return function () {
              goToSlide(idx);
              resetAutoplay();
            };
          })(i)
        );
        dotsContainer.appendChild(dot);
      }
    }

    function createThumbs() {
      if (!thumbsContainer || total <= 0) return;
      thumbsContainer.innerHTML = "";
      for (var i = 0; i < total; i++) {
        var img = items[i].querySelector("img");
        if (!img) continue;
        var thumb = document.createElement("button");
        thumb.type = "button";
        thumb.className = "galeria-thumb" + (i === 0 ? " active" : "");
        thumb.innerHTML = '<img src="' + img.src + '" alt="' + img.alt + '">';
        thumb.addEventListener(
          "click",
          (function (idx) {
            return function () {
              goToSlide(idx);
              resetAutoplay();
            };
          })(i)
        );
        thumbsContainer.appendChild(thumb);
      }
    }

    function openLightbox() {
      var img = items[current].querySelector("img");
      if (img && lightbox && lightboxImg) {
        lightboxImg.src = img.src;
        lightboxImg.alt = img.alt;
        lightbox.classList.add("active");
        lightbox.setAttribute("aria-hidden", "false");
        document.body.style.overflow = "hidden";
      }
    }

    function closeLightbox() {
      if (lightbox) {
        lightbox.classList.remove("active");
        lightbox.setAttribute("aria-hidden", "true");
        document.body.style.overflow = "";
      }
    }

    function startAutoplay() {
      autoplayInterval = setInterval(function () {
        goToSlide(current + 1);
      }, 5000);
    }

    function resetAutoplay() {
      clearInterval(autoplayInterval);
      startAutoplay();
    }

    items.forEach(function (item, i) {
      var img = item.querySelector("img");
      if (img) {
        img.addEventListener("click", openLightbox);
      }
    });

    if (lightbox) {
      lightbox.addEventListener("click", function (e) {
        if (e.target === lightbox) closeLightbox();
      });
    }

    if (lightboxClose) {
      lightboxClose.addEventListener("click", closeLightbox);
    }

    if (lightboxImg) {
      lightboxImg.addEventListener("click", function (e) {
        e.stopPropagation();
      });
    }

    prevBtn.addEventListener("click", function () {
      goToSlide(current - 1);
      resetAutoplay();
    });

    nextBtn.addEventListener("click", function () {
      goToSlide(current + 1);
      resetAutoplay();
    });

    document.addEventListener("keydown", function (e) {
      if (lightbox && lightbox.classList.contains("active")) {
        if (e.key === "Escape") closeLightbox();
      }
    });

    createDots();
    createThumbs();
    startAutoplay();
  }

  // ===== Formulário de contato =====
  var form = document.getElementById("contatoForm");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var nome = document.getElementById("nome").value;
      var telefone = document.getElementById("telefone").value;
      var mensagem = document.getElementById("mensagem").value;

      var numeroWhatsApp = "5511999999999";
      var texto = "Olá! Me chamo " + encodeURIComponent(nome);
      if (mensagem) texto += ". " + encodeURIComponent(mensagem);
      var urlWhatsApp =
        "https://wa.me/" + numeroWhatsApp + "?text=" + encodeURIComponent(texto);

      alert(
        "Obrigado pelo contato! Você pode nos enviar uma mensagem pelo WhatsApp."
      );
      window.open(urlWhatsApp, "_blank");

      form.reset();
    });
  }

  // ===== Header scroll =====
  var header = document.querySelector(".header");
  if (header) {
    window.addEventListener("scroll", function () {
      if (window.scrollY > 80) {
        header.style.boxShadow = "0 2px 20px rgba(125, 91, 140, 0.12)";
      } else {
        header.style.boxShadow = "none";
      }
    });
  }
})();
