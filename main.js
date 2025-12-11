// js/main.js
// Single-file site script: nav, reveals, projects, modal, and nav-active-on-scroll.

document.addEventListener("DOMContentLoaded", () => {
  const body = document.body;
  const headerNav = document.querySelector(".header-nav");
  const navToggle = document.querySelector(".nav-toggle");
  const navLinks = document.querySelectorAll(".nav-link");
  const sections = document.querySelectorAll("section[id]");

  /* --------------------
     Mobile nav toggle
     -------------------- */
  if (navToggle && headerNav) {
    navToggle.addEventListener("click", () => {
      headerNav.classList.toggle("open");
      body.classList.toggle("header-nav-open");
    });
  }

  // Close mobile nav when a link is clicked
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      if (headerNav && headerNav.classList.contains("open")) {
        headerNav.classList.remove("open");
        body.classList.remove("header-nav-open");
      }
    });
  });

  /* --------------------
     IntersectionObserver: reveals + skill-bar fill
     -------------------- */
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
  } else {
    // fallback
    document.querySelectorAll(".reveal").forEach((el) => el.classList.add("visible"));
  }

  /* --------------------
     Contact form (demo)
     -------------------- */
  const contactForm = document.getElementById("contactForm");
  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();
      alert("Thank you! This is a demo form. Your message would be sent in a live version.");
      contactForm.reset();
    });
  }

  /* --------------------
     Projects page init
     -------------------- */
  initProjectsPage();

  /* --------------------
     Nav link activation on scroll
     -------------------- */
  function activateNavLink() {
    const scrollY = window.pageYOffset;
    sections.forEach((section) => {
      const sectionTop = section.offsetTop - window.innerHeight / 3;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute("id");
      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        navLinks.forEach((link) => {
          link.classList.remove("active");
          const href = link.getAttribute("href") || "";
          if (href.includes("#" + sectionId) || href.includes(sectionId)) {
            link.classList.add("active");
          }
        });
      }
    });
  }

  // update on load + scroll
  activateNavLink();
  window.addEventListener("scroll", activateNavLink);
});

/* =========================
   Projects page interactions
   ========================= */
function initProjectsPage() {
  const projectsGrid = document.getElementById("projectsGrid");
  if (!projectsGrid) return; // not on projects page

  const chips = Array.from(document.querySelectorAll(".chip"));
  const searchInput = document.getElementById("projectSearch");
  const sortSelect = document.getElementById("projectSort");
  const cards = Array.from(projectsGrid.querySelectorAll(".project-card"));

  // default state
  let currentFilter = "all";
  let currentSearch = "";
  let currentSort = "newest";

  // Modal elements (may be null if modal not present)
  const modalBackdrop = document.getElementById("projectModal");
  const modalClose = modalBackdrop?.querySelector(".modal-close");
  const modalTitle = modalBackdrop?.querySelector(".modal-title");
  const modalOverview = modalBackdrop?.querySelector(".modal-overview");
  const modalChallenge = modalBackdrop?.querySelector(".modal-challenge");
  const modalApproach = modalBackdrop?.querySelector(".modal-approach");
  const modalResults = modalBackdrop?.querySelector(".modal-results");
  const modalTechList = modalBackdrop?.querySelector("#modalTechList");
  const modalTimelineText = modalBackdrop?.querySelector(".modal-timeline-text");
  const modalMetricsList = modalBackdrop?.querySelector("#modalMetricsList");
  const modalGallery = modalBackdrop?.querySelector("#modalGallery");
  const modalGithubLink = modalBackdrop?.querySelector(".modal-github-link");
  const modalDemoLink = modalBackdrop?.querySelector(".modal-demo-link");
  const modalPdfLink = modalBackdrop?.querySelector(".modal-pdf-link");

  // projectData (if you want to customize details for the modal)
  const projectData = {
    "1": {
      title: "Data Cleaning Pipeline",
      overview:
        "An end-to-end data cleaning pipeline for messy sales data, transforming inconsistent raw files into analysis-ready tables.",
      challenge:
        "The sales team received CSV exports from multiple sources, each with different schemas, date formats, and missing values. Manual cleaning was slow and error-prone.",
      approach:
        "Designed a Python + SQL pipeline to standardize column names, normalize date formats, handle duplicates, and validate business rules. Integrated logging to track rows changed at each step.",
      results:
        "Reduced manual cleaning time from hours to minutes. Improved data quality and consistency, enabling reliable dashboards and reporting.",
      tech: ["Python", "SQL", "Pandas", "Jupyter Notebook"],
      timeline: "2–3 weeks (design, implementation, and testing).",
      metrics: [
        "90% reduction in manual cleaning time.",
        "Eliminated common data errors (invalid dates, missing required fields).",
        "Enabled daily refresh of cleaned datasets."
      ],
      gallery: [
        "assets/project-1-1.jpg",
        "assets/project-1-2.jpg",
        "assets/project-1-3.jpg"
      ],
      github: "#",
      demo: "#",
      pdf: "#"
    },
    "2": {
      title: "Interactive Dashboard",
      overview:
        "A Power BI dashboard to monitor KPIs, trends, and segment-level performance with interactive visuals.",
      challenge:
        "Stakeholders relied on static Excel reports with limited drill-down capabilities, making it difficult to explore data quickly.",
      approach:
        "Modeled data in Power BI, created relationships, and built a dashboard with slicers, bookmarks, and custom visuals. Focused on clean layout and intuitive navigation.",
      results:
        "Gave decision-makers a single interactive view of key metrics. Simplified performance tracking across regions, products, and time.",
      tech: ["Power BI", "Excel", "DAX", "Power Query"],
      timeline: "2 weeks including iteration based on feedback.",
      metrics: [
        "Decreased reporting preparation time for stakeholders.",
        "Enabled self-service exploration of KPIs.",
        "Improved visibility into low-performing segments."
      ],
      gallery: [
        "assets/project-2-1.jpg",
        "assets/project-2-2.jpg",
        "assets/project-2-3.jpg"
      ],
      github: "#",
      demo: "#",
      pdf: "#"
    },
    "3": {
      title: "SQL Reporting Automation",
      overview:
        "Automated recurring SQL-based reports that previously required manual query execution and Excel formatting.",
      challenge:
        "Weekly and monthly reports were generated by manually running queries and copy-pasting results, which was time-consuming and prone to mistakes.",
      approach:
        "Wrote parameterized SQL queries and scheduled scripts to export results to CSV. Combined this with a template-based Excel report for quick refresh.",
      results:
        "Freed up time for analysis instead of manual report creation and reduced error risk.",
      tech: ["SQL", "Python", "Task Scheduler / Cron", "Excel"],
      timeline: "1–2 weeks including testing and documentation.",
      metrics: [
        "Saved several hours per reporting cycle.",
        "Improved consistency and reliability of reports.",
        "Enabled faster sharing of updated numbers."
      ],
      gallery: [
        "assets/project-3-1.jpg",
        "assets/project-3-2.jpg",
        "assets/project-3-3.jpg"
      ],
      github: "#",
      demo: "#",
      pdf: "#"
    }
  };

  /* --------------------
     Filtering & Sorting
     -------------------- */
  function applyFilters() {
    const filtered = cards
      .filter((card) => {
        // Filter by chip tag
        if (currentFilter && currentFilter !== "all") {
          const tags = (card.dataset.tags || "").toLowerCase();
          if (!tags.includes(currentFilter.toLowerCase())) return false;
        }

        // Search
        if (currentSearch && currentSearch.trim() !== "") {
          const q = currentSearch.toLowerCase();
          const title = card.querySelector(".project-title").textContent.toLowerCase();
          const summary = card.querySelector(".project-summary").textContent.toLowerCase();
          if (!title.includes(q) && !summary.includes(q)) return false;
        }

        return true;
      })
      .sort((a, b) => {
        const dateA = new Date(a.dataset.date || 0);
        const dateB = new Date(b.dataset.date || 0);
        if (currentSort === "newest") return dateB - dateA;
        return dateB - dateA;
      });

    // Rebuild grid with filtered cards
    projectsGrid.innerHTML = "";
    filtered.forEach((c) => projectsGrid.appendChild(c));
  }

  // Chip clicks
  chips.forEach((chip) => {
    chip.addEventListener("click", () => {
      chips.forEach((c) => c.classList.remove("chip-active"));
      chip.classList.add("chip-active");
      currentFilter = chip.dataset.filter ? chip.dataset.filter : chip.textContent.trim().toLowerCase();
      applyFilters();
    });
  });

  // Search
  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      currentSearch = e.target.value;
      applyFilters();
    });
  }

  // Sort
  if (sortSelect) {
    sortSelect.addEventListener("change", (e) => {
      currentSort = e.target.value;
      applyFilters();
    });
  }

  // Initial render
  applyFilters();

  /* --------------------
     Modal logic for "View Project"
     -------------------- */
  const viewButtons = Array.from(document.querySelectorAll(".project-view-btn"));
  viewButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const card = btn.closest(".project-card");
      if (!card || !modalBackdrop) return;
      const id = card.dataset.id;
      const data = projectData[id];
      if (!data) return;

      // Fill modal content (guard each field)
      if (modalTitle) modalTitle.textContent = data.title || "";
      if (modalOverview) modalOverview.textContent = data.overview || "";
      if (modalChallenge) modalChallenge.textContent = data.challenge || "";
      if (modalApproach) modalApproach.textContent = data.approach || "";
      if (modalResults) modalResults.textContent = data.results || "";
      if (modalTimelineText) modalTimelineText.textContent = data.timeline || "";

      if (modalTechList) {
        modalTechList.innerHTML = "";
        (data.tech || []).forEach((t) => {
          const li = document.createElement("li");
          li.textContent = t;
          modalTechList.appendChild(li);
        });
      }

      if (modalMetricsList) {
        modalMetricsList.innerHTML = "";
        (data.metrics || []).forEach((m) => {
          const li = document.createElement("li");
          li.textContent = m;
          modalMetricsList.appendChild(li);
        });
      }

      if (modalGallery) {
        modalGallery.innerHTML = "";
        (data.gallery || []).forEach((src) => {
          const img = document.createElement("img");
          img.src = src;
          img.alt = (data.title || "Project") + " screenshot";
          modalGallery.appendChild(img);
        });
      }

      if (modalGithubLink) modalGithubLink.href = data.github || "#";
      if (modalDemoLink) modalDemoLink.href = data.demo || "#";
      if (modalPdfLink) modalPdfLink.href = data.pdf || "#";

      // Open modal
      modalBackdrop.classList.add("active");
      modalBackdrop.setAttribute("aria-hidden", "false");
      document.body.style.overflow = "hidden";
    });
  });

  function closeModal() {
    if (!modalBackdrop) return;
    modalBackdrop.classList.remove("active");
    modalBackdrop.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  }

  if (modalClose) modalClose.addEventListener("click", closeModal);
  if (modalBackdrop) {
    modalBackdrop.addEventListener("click", (e) => {
      if (e.target === modalBackdrop) closeModal();
    });
  }
}
// Delegated chip handler — fallback if direct handlers fail
(function () {
  const bar = document.querySelector('.projects-filter-bar');
  const projectsGrid = document.getElementById('projectsGrid');
  if (!bar || !projectsGrid) return;

  bar.addEventListener('click', (e) => {
    const chip = e.target.closest('.chip');
    if (!chip) return;

    // visually toggle active
    bar.querySelectorAll('.chip').forEach(c => c.classList.remove('chip-active'));
    chip.classList.add('chip-active');

    // compute filter value
    const filter = chip.dataset.filter
      ? chip.dataset.filter.toLowerCase()
      : chip.textContent.trim().toLowerCase();

    // filter cards
    Array.from(projectsGrid.querySelectorAll('.project-card')).forEach(card => {
      const tags = (card.dataset.tags || '').toLowerCase();
      const tagList = tags.split(',').map(t => t.trim());
      const show = (filter === 'all') || tagList.includes(filter);
      card.style.display = show ? '' : 'none';
    });
  });
})();
