(function () {
  // Loader hide — guard against deferred script running after window.load already fired
  function hideLoader() {
    setTimeout(() => document.getElementById("loader").classList.add("hidden"), 600);
  }
  if (document.readyState === "complete") {
    hideLoader();
  } else {
    window.addEventListener("load", hideLoader);
  }

  // Scroll progress bar
  const progressBar = document.createElement("div");
  progressBar.style.cssText = "position:fixed;top:0;left:0;height:2px;width:0%;z-index:10001;background:linear-gradient(90deg,#3b82f6,#60a5fa,#818cf8);pointer-events:none;transition:width 0.1s linear;";
  document.body.appendChild(progressBar);
  window.addEventListener("scroll", function () {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    progressBar.style.width = (docHeight > 0 ? (scrollTop / docHeight) * 100 : 0) + "%";
  }, { passive: true });

  // Scroll reveal
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("scroll-show");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  document.querySelectorAll('.scroll-hidden-up, .scroll-hidden-left, .scroll-hidden-right')
    .forEach((el) => observer.observe(el));

  // Mobile menu
  const mobileBtn = document.getElementById("mobileMenuBtn");
  const navLinks = document.getElementById("navLinks");
  if (mobileBtn && navLinks) {
    mobileBtn.addEventListener("click", () => {
      navLinks.classList.toggle("active");
      mobileBtn.classList.toggle("active");
    });
    navLinks.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => {
        navLinks.classList.remove("active");
        mobileBtn.classList.remove("active");
      });
    });
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        navLinks.classList.remove("active");
        mobileBtn.classList.remove("active");
      }
    });
    document.addEventListener("click", (e) => {
      if (!navLinks.contains(e.target) && !mobileBtn.contains(e.target)) {
        navLinks.classList.remove("active");
        mobileBtn.classList.remove("active");
      }
    });
  }

  // Skip custom cursor on touch/mobile
  if (window.matchMedia("(pointer: coarse)").matches || window.innerWidth <= 768) return;

  const cursorDot = document.createElement("div");
  cursorDot.classList.add("cursor-dot");
  document.body.appendChild(cursorDot);

  const cursorGlow = document.createElement("div");
  cursorGlow.classList.add("cursor-glow");
  document.body.appendChild(cursorGlow);

  let rafPending = false;
  document.addEventListener("mousemove", function (e) {
    if (rafPending) return;
    rafPending = true;
    requestAnimationFrame(() => {
      cursorDot.style.transform = `translate3d(${e.clientX - 3}px, ${e.clientY - 3}px, 0)`;
      cursorGlow.style.transform = `translate3d(${e.clientX - 250}px, ${e.clientY - 250}px, 0)`;
      rafPending = false;
    });
  });

  document.body.addEventListener('mouseover', function (e) {
    if (e.target && e.target.closest('a, button, .launch-card')) {
      cursorDot.classList.add('active');
    }
  });

  document.body.addEventListener('mouseout', function (e) {
    if (e.target && e.target.closest('a, button, .launch-card')) {
      cursorDot.classList.remove('active');
    }
  });

  document.querySelectorAll('.card, .hero-panel, .contact-panel, .trust-strip, .nav-header, .button')
    .forEach(el => {
      el.addEventListener('mouseenter', () => cursorGlow.style.opacity = '0');
      el.addEventListener('mouseleave', () => cursorGlow.style.opacity = '1');
    });
})();
