// Toggle main menu
document.getElementById("hamburger").onclick = () => {
  document.getElementById("menu").classList.toggle("active");
};

// Toggle dropdowns
document.querySelectorAll(".dropdown-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    btn.nextElementSibling.classList.toggle("active");
  });
});