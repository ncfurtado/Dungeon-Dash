document.getElementById("hamburger").onclick = () => {
  document.getElementById("menu").classList.toggle("active");
};

document.querySelectorAll(".dropdown-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    btn.nextElementSibling.classList.toggle("active");
  });
});