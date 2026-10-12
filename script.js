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

document.querySelectorAll(".test-drive-cta").forEach((link) => {
  link.addEventListener("click", () => {
    appointmentForm.querySelector('[name="vehicle"]').value = link.dataset.model;
  });
});

function getToday() {
  const today = new Date();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");

  return `${today.getFullYear()}-${month}-${day}`;
}

document.querySelectorAll('input[type="date"]').forEach((input) => {
  input.min = getToday();
});

document.querySelectorAll("[data-demo-form]").forEach((form) => {
  const formMessage = form.querySelector('[role="status"]');

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    if (!form.reportValidity()) {
      return;
    }

    const formData = new FormData(form);
    const firstName = formData.get("name").trim().split(/\s+/)[0];
    const details = [
      formData.get("vehicle"),
      formData.get("service"),
      formData.get("topic")
    ].filter(Boolean);
    const preferredDate = formData.get("date");

    if (preferredDate) {
      details.push(new Date(`${preferredDate}T12:00:00`).toLocaleDateString(undefined, {
        dateStyle: "medium"
      }));
    }

    const requestDetails = details.length ? ` for ${details.join(" / ")}` : "";
    const confirmationNote = form.dataset.demoForm.includes("request")
      ? "Nothing was sent or stored, and no appointment was booked."
      : "Nothing was sent or stored.";

    formMessage.textContent = `Thanks, ${firstName}. Your ${form.dataset.demoForm}${requestDetails} is noted for this demo. ${confirmationNote}`;
    formMessage.classList.remove("is-error");
    formMessage.classList.add("is-success");
    form.reset();
  });
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
