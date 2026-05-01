const contactForm = document.querySelector("#contactForm");
const formMessage = document.querySelector("#formMessage");
const serviceTabs = document.querySelectorAll(".service-tab");
const serviceModal = document.querySelector("#serviceModal");
const serviceModalClose = document.querySelector("#serviceModalClose");
const serviceModalTitle = document.querySelector("#serviceModalTitle");
const serviceModalDescription = document.querySelector("#serviceModalDescription");
const serviceModalProject = document.querySelector("#serviceModalProject");
const serviceModalProjectTitle = document.querySelector("#serviceModalProjectTitle");
const serviceModalProjectDesc = document.querySelector("#serviceModalProjectDesc");
const serviceModalThumb = document.querySelector("#serviceModalThumb");

const serviceProjectMap = {
  "ui-ai": {
    title: "FinTrack Mobile Banking",
    desc: "A mobile-first interface redesign focused on clarity and speed.",
    thumbClass: "thumb-one",
  },
  "ux-metrics": {
    title: "HealthHub Patient Portal",
    desc: "User-tested portal flows with measurable improvements in completion.",
    thumbClass: "thumb-two",
  },
  pm: {
    title: "CareSync Dashboard",
    desc: "Cross-team project delivery for a data-heavy product dashboard.",
    thumbClass: "thumb-six",
  },
  branding: {
    title: "Nova eCommerce Redesign",
    desc: "Visual identity refresh paired with a conversion-ready store UI.",
    thumbClass: "thumb-three",
  },
};

if (contactForm && formMessage) {
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();
    formMessage.textContent =
      "Thanks! Your message has been sent. I will contact you shortly.";
    contactForm.reset();
  });
}

if (
  serviceTabs.length &&
  serviceModal &&
  serviceModalClose &&
  serviceModalTitle &&
  serviceModalDescription &&
  serviceModalProject &&
  serviceModalProjectTitle &&
  serviceModalProjectDesc &&
  serviceModalThumb
) {
  const thumbClasses = Object.values(serviceProjectMap).map(
    (project) => project.thumbClass
  );

  const openServiceModal = (tab) => {
    serviceTabs.forEach((item) => item.classList.remove("active"));
    tab.classList.add("active");

    const title = tab.dataset.title || "Service";
    const description = tab.dataset.description || "";
    const serviceId = tab.dataset.serviceId || "";
    const project = serviceProjectMap[serviceId];

    serviceModalTitle.textContent = title;
    serviceModalDescription.textContent = description;

    if (project) {
      serviceModalProjectTitle.textContent = project.title;
      serviceModalProjectDesc.textContent = project.desc;
      serviceModalThumb.classList.remove(...thumbClasses);
      serviceModalThumb.classList.add(project.thumbClass);
      serviceModalProject.href = "work.html";
    }

    serviceModal.classList.add("open");
    serviceModal.setAttribute("aria-hidden", "false");
  };

  const closeServiceModal = () => {
    serviceModal.classList.remove("open");
    serviceModal.setAttribute("aria-hidden", "true");
  };

  serviceTabs.forEach((tab) => {
    tab.addEventListener("click", () => openServiceModal(tab));
  });

  serviceModalClose.addEventListener("click", closeServiceModal);

  serviceModal.addEventListener("click", (event) => {
    if (event.target === serviceModal) {
      closeServiceModal();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && serviceModal.classList.contains("open")) {
      closeServiceModal();
    }
  });
}
