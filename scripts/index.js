// ===========================
// HAMBURGER MENU TOGGLE
// ===========================
const hamburger = document.getElementById("hamburger");
const menu = document.getElementById("menu");

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("open");
  menu.classList.toggle("active");
});

// Close menu when clicking outside
document.addEventListener("click", (e) => {
  if (!hamburger.contains(e.target) && !menu.contains(e.target)) {
    hamburger.classList.remove("open");
    menu.classList.remove("active");
  }
});

// Keyboard support for hamburger
hamburger.addEventListener("keydown", (e) => {
  if (e.key === "Enter" || e.key === " ") {
    e.preventDefault();
    hamburger.click();
  }
});

// ===========================
// DROPDOWN MENUS
// ===========================
const dropdownBtns = document.querySelectorAll(".dropdown-btn");

dropdownBtns.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    e.stopPropagation();
    const group = btn.closest(".dropdown-group");
    const dropdown = group.querySelector(".dropdown");
    const isOpen = dropdown.classList.contains("active");

    // Close all dropdowns first
    document.querySelectorAll(".dropdown.active").forEach((d) => d.classList.remove("active"));
    document.querySelectorAll(".dropdown-btn[aria-expanded='true']").forEach((b) => b.setAttribute("aria-expanded", "false"));

    // Toggle this one
    if (!isOpen) {
      dropdown.classList.add("active");
      btn.setAttribute("aria-expanded", "true");
    }
  });
});

// Close dropdowns when clicking outside
document.addEventListener("click", () => {
  document.querySelectorAll(".dropdown.active").forEach((d) => d.classList.remove("active"));
  document.querySelectorAll(".dropdown-btn").forEach((b) => b.setAttribute("aria-expanded", "false"));
});

// ===========================
// SCROLL REVEAL ANIMATION
// ===========================
const revealEls = document.querySelectorAll(
  ".feature-card, .step, .stat, .cta-inner"
);

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);

revealEls.forEach((el, i) => {
  el.style.opacity = "0";
  el.style.transform = "translateY(24px)";
  el.style.transition = `opacity 0.55s ease ${i * 0.07}s, transform 0.55s ease ${i * 0.07}s`;
  revealObserver.observe(el);
});

// ===========================
// ANIMATED STAT COUNTERS
// ===========================
function parseStatValue(text) {
  const match = text.match(/^(\D*)([\d.]+)(\D*)$/);
  if (!match) return null;
  return { prefix: match[1], number: parseFloat(match[2]), suffix: match[3] };
}

function animateCounter(el, target, prefix, suffix, duration = 1600) {
  let start = null;
  const step = (timestamp) => {
    if (!start) start = timestamp;
    const progress = Math.min((timestamp - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
    const current = Math.floor(eased * target);
    el.textContent = prefix + current.toLocaleString() + suffix;
    if (progress < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}

const statNumbers = document.querySelectorAll(".stat-number");
const statObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const parsed = parseStatValue(el.textContent.replace(/,/g, "").replace("+", "").replace("$", "").replace("%", ""));
        if (parsed) {
          const originalText = el.textContent;
          const hasPlus = originalText.includes("+");
          const hasDollar = originalText.includes("$");
          const prefix = hasDollar ? "$" : "";
          const suffix = (hasPlus ? "+" : "") + (originalText.includes("%") ? "%" : (originalText.includes("K") ? "K" : ""));
          animateCounter(el, parsed.number, prefix, suffix);
        }
        statObserver.unobserve(el);
      }
    });
  },
  { threshold: 0.5 }
);

statNumbers.forEach((el) => statObserver.observe(el));