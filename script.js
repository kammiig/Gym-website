const navToggle = document.querySelector(".nav-toggle");
const siteNav = document.querySelector(".site-nav");
const navLinks = document.querySelectorAll(".site-nav a");
const contactForm = document.querySelector(".contact-form");
const formStatus = document.querySelector(".form-status");
const appointmentTrigger = document.querySelector(".appointment-trigger");
const appointmentModal = document.querySelector("#appointment-modal");
const appointmentForm = document.querySelector(".appointment-form");
const appointmentStatus = document.querySelector(".appointment-status");
const modalCloseControls = document.querySelectorAll("[data-close-modal]");

const closeAppointmentModal = () => {
  if (appointmentModal.open) {
    appointmentModal.close();
  }
  document.body.classList.remove("modal-open");
  appointmentTrigger.focus();
};

const openAppointmentModal = () => {
  siteNav.classList.remove("is-open");
  navToggle.setAttribute("aria-expanded", "false");
  navToggle.setAttribute("aria-label", "Open menu");
  appointmentStatus.textContent = "";
  appointmentModal.showModal();
  document.body.classList.add("modal-open");
  appointmentForm.querySelector("input").focus();
};

navToggle.addEventListener("click", () => {
  const isOpen = siteNav.classList.toggle("is-open");
  navToggle.setAttribute("aria-expanded", String(isOpen));
  navToggle.setAttribute("aria-label", isOpen ? "Close menu" : "Open menu");
});

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    siteNav.classList.remove("is-open");
    navToggle.setAttribute("aria-expanded", "false");
    navToggle.setAttribute("aria-label", "Open menu");
  });
});

appointmentTrigger.addEventListener("click", openAppointmentModal);

modalCloseControls.forEach((control) => {
  control.addEventListener("click", closeAppointmentModal);
});

appointmentModal.addEventListener("click", (event) => {
  if (event.target === appointmentModal) {
    closeAppointmentModal();
  }
});

appointmentModal.addEventListener("close", () => {
  document.body.classList.remove("modal-open");
});

contactForm.addEventListener("submit", (event) => {
  event.preventDefault();
  formStatus.textContent = "Thanks. We will contact you shortly.";
  contactForm.reset();
});

appointmentForm.addEventListener("submit", (event) => {
  event.preventDefault();
  appointmentStatus.textContent = "Appointment request sent. We will confirm your slot soon.";
  appointmentForm.reset();
});
