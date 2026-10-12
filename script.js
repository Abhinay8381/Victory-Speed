const menuToggle = document.querySelector(".menu-toggle");
const navigation = document.querySelector(".primary-navigation");

function setMenuOpen(isOpen) {
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
  navigation.classList.toggle("is-open", isOpen);
}

menuToggle.addEventListener("click", () => {
  setMenuOpen(menuToggle.getAttribute("aria-expanded") !== "true");
});

navigation.addEventListener("click", (event) => {
  if (event.target.closest("a")) {
    setMenuOpen(false);
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && navigation.classList.contains("is-open")) {
    setMenuOpen(false);
    menuToggle.focus();
  }
});

document.querySelector("#current-year").textContent = new Date().getFullYear();

const appointmentForm = document.querySelector("#appointment-form");
const formMessage = document.querySelector("#form-message");

document.querySelectorAll(".test-drive-cta").forEach((link) => {
  link.addEventListener("click", () => {
    appointmentForm.elements.namedItem("model").value = link.dataset.model;
  });
});

appointmentForm.addEventListener("submit", (event) => {
  event.preventDefault();

  if (!appointmentForm.reportValidity()) {
    return;
  }

  const formData = new FormData(appointmentForm);
  const firstName = formData.get("name").trim().split(/\s+/)[0];
  const model = formData.get("model");

  formMessage.textContent = `Thanks, ${firstName}. Your interest in the ${model} is noted for this demo. No details have been sent or stored.`;
  formMessage.classList.add("is-success");
  appointmentForm.reset();
});

const revealItems = document.querySelectorAll("[data-reveal]");

if (revealItems.length && "IntersectionObserver" in window) {
  document.documentElement.classList.add("motion-ready");
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  revealItems.forEach((item) => revealObserver.observe(item));
}
