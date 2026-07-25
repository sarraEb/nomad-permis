const menuToggle = document.querySelector(".menu-toggle");
const nav = document.querySelector(".nav");

menuToggle?.addEventListener("click", () => {
  const isOpen = nav.classList.toggle("is-open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
});

nav?.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    nav.classList.remove("is-open");
    menuToggle?.setAttribute("aria-expanded", "false");
  });
});

document.querySelectorAll(".faq-item button").forEach((button) => {
  button.addEventListener("click", () => {
    const item = button.closest(".faq-item");
    const isOpen = item.classList.toggle("is-open");
    button.setAttribute("aria-expanded", String(isOpen));
    button.querySelector("span").textContent = isOpen ? "−" : "+";
  });
});

document.addEventListener("click", (event) => {
  const button = event.target.closest(".faq-item button");
  if (!button) return;
  const item = button.closest(".faq-item");
  const isOpen = item.classList.toggle("is-open");
  button.setAttribute("aria-expanded", String(isOpen));
  button.querySelector("span").textContent = isOpen ? "−" : "+";
});

const siteSettingsKey = "nomad_site_settings";
const siteSettingsVersionKey = "nomad_site_settings_version";
const siteSettingsVersion = "2026-07-20-client-copy";
const formulasStorageKey = "nomad_formulas";
const formulasVersionKey = "nomad_formulas_version";
const formulasVersion = "2026-07-20-client-validated";
const videosStorageKey = "nomad_videos";
const faqsStorageKey = "nomad_faqs";
const faqsVersionKey = "nomad_faqs_version";
const faqsVersion = "2026-07-20-client-validated";
const contactsStorageKey = "nomad_contacts";
const defaultFormulas = [
  {
    key: "journee",
    title: "La Journée NOMAD",
    description: "Une journée pensée pour aller à l'essentiel.",
    price: "799",
    features: ["Gestion administrative de A à Z", "Train aller-retour", "1 heure de conduite incluse", "Présentation à l'examen", "Panier régional"],
    recommended: false,
    active: true,
    badge: "",
    note: "",
    ctaLabel: "Vérifier mon éligibilité",
  },
  {
    key: "access",
    title: "NOMAD ACCESS",
    description: "Le choix malin pour aller vite et bien.",
    price: "1099",
    features: ["Gestion administrative de A à Z", "Livret de formation personnalisé", "3 à 8 heures de conduite", "Présentation à l'examen", "Train aller-retour", "Hôtel 3 étoiles : 0 à 1 nuitée", "Petit déjeuner inclus dans la limite de 10 €", "Options : dîner 19 €/jour ; coaching permis 150 €"],
    recommended: false,
    active: true,
    badge: "",
    note: "à partir de",
    ctaLabel: "Étudier cette formule",
  },
  {
    key: "confort",
    title: "NOMAD CONFORT",
    description: "L'expérience NOMAD sans compromis.",
    price: "1799",
    features: ["Gestion administrative de A à Z", "Livret de formation personnalisé", "9 à 20 heures de conduite", "Présentation à l'examen", "Train aller-retour", "Hôtel 3 étoiles : 2 à 5 nuitées", "Petits déjeuners inclus dans la limite de 10 €/jour", "Panier régional", "Options : dîner 19 €/jour ; coaching permis 150 €"],
    recommended: true,
    active: true,
    badge: "Recommande",
    note: "à partir de",
    ctaLabel: "Étudier cette formule",
  },
  {
    key: "ultimate",
    title: "NOMAD ULTIMATE",
    description: "L'expérience NOMAD dans sa forme la plus exclusive.",
    price: "2499",
    features: ["Gestion administrative de A à Z", "Évaluation préalable", "Livret de formation personnalisé", "21 à 35 heures de conduite", "Présentation à l'examen", "Train aller-retour", "Hôtel 3 étoiles : 5 à 8 nuitées", "Petits déjeuners inclus dans la limite de 10 €/jour", "Dîners inclus dans la limite de 25 €/jour", "2 heures de coaching permis", "Panier régional"],
    recommended: false,
    active: true,
    badge: "",
    note: "à partir de",
    ctaLabel: "Étudier cette formule",
  },
];
const defaultSiteSettings = {
  googleApiKey: "",
  googlePlaceId: "",
  googlePlaceQuery: "Auto-école de Témis",
  phone: "+33 3 81 81 81 81",
  email: "contact@nomad-votre-permis.fr",
  address: "Immeuble de l'Étang, Entrée C, Chemin de l'Étang, Châtillon-le-Duc",
  contactEyebrow: "Contact",
  contactTitle: "Prêt à faire avancer votre permis ?",
  contactIntro: "Transmettez-nous quelques informations. Notre équipe étudiera votre situation et vous proposera la formule NOMAD la plus adaptée.",
  contactButton: "Vérifier mon éligibilité",
  contactMessagePlaceholder: "Votre situation, vos disponibilites, vos questions...",
};

const defaultFaqs = [
  {
    question: "Puis-je venir de Paris ou d'une autre ville ?",
    answer: "Oui. NOMAD accompagne les candidats venant de toute la France et organise leur déplacement selon la formule choisie.",
    active: true,
  },
  {
    question: "En combien de temps mon séjour peut-il être organisé ?",
    answer: "Après l'étude de votre dossier, notre équipe peut organiser votre séjour très rapidement selon vos disponibilités et le nombre d'heures prévu.",
    active: true,
  },
  {
    question: "Comment déterminez-vous mon nombre d'heures ?",
    answer: "Nous analysons votre expérience, votre dernier CEPC, le temps écoulé depuis votre dernière conduite et, si nécessaire, votre évaluation préalable.",
    active: true,
  },
  {
    question: "Que comprennent les formules NOMAD ?",
    answer: "Toutes nos formules comprennent la gestion administrative, la conduite, la présentation à l'examen et le train aller-retour. L'hébergement, les repas et le coaching varient selon la formule choisie.",
    active: true,
  },
  {
    question: "Mon code et mon numéro NEPH doivent-ils être valides ?",
    answer: "Oui. Votre code de la route et votre numéro NEPH doivent être valides pour permettre votre présentation à l'examen.",
    active: true,
  },
  {
    question: "Puis-je payer en plusieurs fois ?",
    answer: "Oui. Le paiement est possible par virement ou en quatre fois avec Alma.",
    active: true,
  },
  {
    question: "Que se passe-t-il après un échec ?",
    answer: "Nous analysons votre CEPC et vous proposons une nouvelle organisation adaptée. Avec au moins 24 points sur 31, la Journée NOMAD peut notamment être envisagée.",
    active: true,
  },
];

function readSiteSettings() {
  try {
    const stored = JSON.parse(localStorage.getItem(siteSettingsKey)) || {};
    if (localStorage.getItem(siteSettingsVersionKey) !== siteSettingsVersion) {
      const migrated = {
        ...defaultSiteSettings,
        ...stored,
        contactTitle: defaultSiteSettings.contactTitle,
        contactIntro: defaultSiteSettings.contactIntro,
        contactButton: defaultSiteSettings.contactButton,
        contactMessagePlaceholder: defaultSiteSettings.contactMessagePlaceholder,
      };
      localStorage.setItem(siteSettingsKey, JSON.stringify(migrated));
      localStorage.setItem(siteSettingsVersionKey, siteSettingsVersion);
      return migrated;
    }
    return { ...defaultSiteSettings, ...stored };
  } catch {
    return { ...defaultSiteSettings };
  }
}

const siteSettings = readSiteSettings();
function readFormulas() {
  try {
    if (localStorage.getItem(formulasVersionKey) !== formulasVersion) {
      localStorage.setItem(formulasStorageKey, JSON.stringify(defaultFormulas));
      localStorage.setItem(formulasVersionKey, formulasVersion);
      return defaultFormulas.map((formula) => ({ ...formula }));
    }
    const stored = JSON.parse(localStorage.getItem(formulasStorageKey)) || [];
    if (stored.length) {
      return stored.map((item) => ({ ...(defaultFormulas.find((formula) => formula.key === item.key) || {}), ...item }));
    }
    return defaultFormulas.map((formula) => ({ ...formula }));
  } catch {
    return defaultFormulas.map((formula) => ({ ...formula }));
  }
}
const formulas = readFormulas();
let pricingSlideIndex = Math.max(0, formulas.findIndex((formula) => formula.recommended) - 1);

function readFaqs() {
  try {
    if (localStorage.getItem(faqsVersionKey) !== faqsVersion) {
      localStorage.setItem(faqsStorageKey, JSON.stringify(defaultFaqs));
      localStorage.setItem(faqsVersionKey, faqsVersion);
      return defaultFaqs.map((faq) => ({ ...faq }));
    }
    return JSON.parse(localStorage.getItem(faqsStorageKey)) || defaultFaqs.map((faq) => ({ ...faq }));
  } catch {
    return defaultFaqs.map((faq) => ({ ...faq }));
  }
}

function readStoredVideos() {
  try {
    return JSON.parse(localStorage.getItem(videosStorageKey)) || [];
  } catch {
    return [];
  }
}

function readPublishedVideos() {
  return readStoredVideos().filter((video) => video.status === "Publiee");
}

function openVideoDb() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open("nomad_media", 1);
    request.onupgradeneeded = () => {
      request.result.createObjectStore("videos");
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

async function readVideoBlob(id) {
  if (!id) return null;
  const db = await openVideoDb();
  return new Promise((resolve) => {
    const transaction = db.transaction("videos", "readonly");
    const request = transaction.objectStore("videos").get(id);
    request.onsuccess = () => resolve(request.result || null);
    request.onerror = () => resolve(null);
    transaction.oncomplete = () => db.close();
    transaction.onerror = () => db.close();
  });
}

async function hydrateStoredVideos(storedVideos) {
  return Promise.all(storedVideos.map(async (video) => {
    if (!video.videoBlobId) return video;
    const blob = await readVideoBlob(video.videoBlobId);
    return {
      ...video,
      url: blob ? URL.createObjectURL(blob) : video.url,
    };
  }));
}

const defaultVideos = [
  {
    firstName: "Laura",
    journey: "Permis accéléré en province",
    title: "Le parcours de Laura",
    duration: "2 min 12",
    poster: "assets/hero-driving.png",
    subtitles: "Laura raconte son passage en province, son organisation et son examen.",
    url: "",
  },
  {
    firstName: "Marc",
    journey: "Stage intensif avec accompagnement",
    title: "L'expérience de Marc",
    duration: "1 min 40",
    poster: "assets/hero-driving.png",
    subtitles: "Marc explique comment NOMAD l'a aidé à reprendre confiance rapidement.",
    url: "",
  },
  {
    firstName: "Sophie",
    journey: "Nouvelle chance après un premier échec",
    title: "Le témoignage de Sophie",
    duration: "1 min 45",
    poster: "assets/hero-driving.png",
    subtitles: "Sophie partage son expérience avant et après son passage à l'examen.",
    url: "",
  },
];
let publishedVideos = readPublishedVideos();
let videos = publishedVideos.length ? publishedVideos : defaultVideos;

let activeVideo = 1;
const track = document.querySelector(".video-track");
const dots = document.querySelector(".carousel-dots");

applySiteSettings();

function renderCarousel() {
  if (!track || !dots) return;

  const ordered = [-1, 0, 1].map((offset) => {
    const index = (activeVideo + offset + videos.length) % videos.length;
    return { ...videos[index], index, active: offset === 0 };
  });

  track.innerHTML = ordered.map((video) => `
    <article class="video-card ${video.active ? "is-active" : ""}" style="--poster: url('${escapeHtml(video.poster)}')">
      <button class="video-play" type="button" data-video-url="${escapeHtml(video.url)}" aria-label="Lire le témoignage vidéo de ${escapeHtml(video.firstName)}">
        <span class="play" aria-hidden="true">▶</span>
      </button>
      <div class="video-card__body">
        <span class="video-name">${escapeHtml(video.firstName)}</span>
        <h3>${escapeHtml(video.title)}</h3>
        <p>${escapeHtml(video.journey)}</p>
        <small><i class="fa-regular fa-clock" aria-hidden="true"></i> ${escapeHtml(video.duration)}</small>
        <em>${escapeHtml(video.subtitles)}</em>
      </div>
    </article>
  `).join("");

  dots.innerHTML = videos.map((_, index) => `
    <button type="button" class="${index === activeVideo ? "is-active" : ""}" aria-label="Afficher la vidéo ${index + 1}" data-dot="${index}"></button>
  `).join("");
}

document.querySelectorAll("[data-carousel]").forEach((button) => {
  button.addEventListener("click", () => {
    const direction = button.dataset.carousel === "next" ? 1 : -1;
    activeVideo = (activeVideo + direction + videos.length) % videos.length;
    renderCarousel();
  });
});

dots?.addEventListener("click", (event) => {
  const button = event.target.closest("[data-dot]");
  if (!button) return;
  activeVideo = Number(button.dataset.dot);
  renderCarousel();
});

renderCarousel();

if (publishedVideos.length) {
  hydrateStoredVideos(publishedVideos).then((hydratedVideos) => {
    videos = hydratedVideos;
    activeVideo = Math.min(activeVideo, Math.max(0, videos.length - 1));
    renderCarousel();
  });
}

track?.addEventListener("click", (event) => {
  const button = event.target.closest(".video-play");
  if (!button) return;
  const url = button.dataset.videoUrl;
  if (url) {
    window.open(url, "_blank", "noopener");
  }
});

document.querySelector(".hero-video")?.addEventListener("click", (event) => {
  const url = event.currentTarget.dataset.heroVideoUrl;
  if (url) {
    window.open(url, "_blank", "noopener");
  }
});

const reviewsGrid = document.querySelector("#reviews-grid");
const googleReviewsConfig = {
  apiKey: siteSettings.googleApiKey || reviewsGrid?.dataset.googleApiKey?.trim() || "",
  placeId: siteSettings.googlePlaceId || reviewsGrid?.dataset.googlePlaceId?.trim() || "",
  query: siteSettings.googlePlaceQuery || reviewsGrid?.dataset.googlePlaceQuery?.trim() || "Auto-école de Témis",
};
const googleFallbackPlace = {
  name: "AUTO ECOLE ECAMEL BESANCON TEMIS",
  rating: 4.6,
  user_ratings_total: 70,
  reviews: [],
  url: "https://www.google.com/maps/search/?api=1&query=AUTO%20ECOLE%20ECAMEL%20BESANCON%20TEMIS",
};

function escapeHtml(value) {
  return String(value || "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function formatEuroValue(value) {
  return `${Number(value || 0).toLocaleString("fr-FR")} €`;
}

function formatFormulaPrice(formula) {
  const prefix = String(formula.note || "").toLowerCase().includes("partir") ? "à partir de " : "";
  return `${prefix}${formatEuroValue(formula.price)}`;
}

function renderFormulaCard(formula) {
  const buttonClass = formula.recommended ? "btn--primary" : "btn--outline";
  const visibleFeatures = (formula.features || []).slice(0, 5);
  return `
    <article class="price-card ${formula.recommended ? "price-card--featured" : ""}" data-formula-key="${escapeHtml(formula.key)}">
      ${formula.recommended || formula.badge ? `
        <div class="recommended">${escapeHtml(formula.badge || "Recommande")}</div>
        ${formula.recommended ? `<div class="star" aria-hidden="true"><i class="fa-solid fa-star"></i></div>` : ""}
      ` : ""}
      <h3>${escapeHtml(formula.title)}</h3>
      <p>${escapeHtml(formula.description)}</p>
      <ul class="check-list check-list--plain">
        ${visibleFeatures.map((feature) => `<li>${escapeHtml(feature)}</li>`).join("")}
      </ul>
      <strong class="price">${formatFormulaPrice(formula)}</strong>
      ${formula.note && !String(formula.note).toLowerCase().includes("partir") ? `<small class="price-note">${escapeHtml(formula.note)}</small>` : ""}
      <a class="btn ${buttonClass} js-plan-select" href="#inscription" data-plan="${escapeHtml(formula.title)}" data-price="${escapeHtml(formula.price)}">${escapeHtml(formula.ctaLabel || "Étudier cette formule")}</a>
    </article>
  `;
}

function renderFaqs() {
  const faqList = document.querySelector("#faq-list");
  if (!faqList) return;
  const faqs = readFaqs().filter((faq) => faq.active !== false);
  faqList.innerHTML = faqs.map((faq) => `
    <article class="faq-item">
      <button type="button" aria-expanded="false">${escapeHtml(faq.question)}<span>+</span></button>
      <p>${escapeHtml(faq.answer)}</p>
    </article>
  `).join("");
}

function getPricingWindow(activeFormulas) {
  if (activeFormulas.length <= 3) return activeFormulas;
  return Array.from({ length: 3 }, (_, offset) => activeFormulas[(pricingSlideIndex + offset) % activeFormulas.length]);
}

function renderPricingDots(activeFormulas) {
  const dots = document.querySelector("#pricing-dots");
  if (!dots) return;
  if (activeFormulas.length <= 3) {
    dots.innerHTML = "";
    return;
  }
  dots.innerHTML = activeFormulas.map((_, index) => `
    <span class="${index === pricingSlideIndex ? "is-active" : ""}"></span>
  `).join("");
}

function renderPricingSlider(activeFormulas) {
  const pricingGrid = document.querySelector("#pricing-grid");
  if (!pricingGrid) return;
  if (pricingSlideIndex >= activeFormulas.length) pricingSlideIndex = 0;
  const visibleFormulas = getPricingWindow(activeFormulas);
  pricingGrid.innerHTML = visibleFormulas.map(renderFormulaCard).join("");
  pricingGrid.dataset.count = String(visibleFormulas.length);
  document.querySelectorAll("[data-pricing-action]").forEach((button) => {
    button.hidden = activeFormulas.length <= 3;
  });
  renderPricingDots(activeFormulas);
}

function applySiteSettings() {
  const activeFormulas = formulas.filter((formula) => formula.active !== false);
  renderPricingSlider(activeFormulas);
  const pricingGrid = document.querySelector("#pricing-grid");
  if (pricingGrid && false) {
    pricingGrid.innerHTML = activeFormulas.map(renderFormulaCard).join("");
  }
  document.querySelectorAll(".pricing-static-placeholder").forEach((card, index) => {
    const formula = activeFormulas[index];
    if (!formula) {
      card.hidden = true;
      return;
    }
    card.hidden = false;
    card.classList.toggle("price-card--featured", Boolean(formula.recommended));
    card.dataset.formulaKey = formula.key;
    card.querySelector(".recommended")?.remove();
    card.querySelector(".star")?.remove();
    card.querySelector(".price-note")?.remove();
    if (formula.recommended || formula.badge) {
      card.insertAdjacentHTML("afterbegin", `
        <div class="recommended">Recommandé</div>
        ${formula.recommended ? `<div class="star" aria-hidden="true"><i class="fa-solid fa-star"></i></div>` : ""}
      `);
      card.querySelector(".recommended").textContent = formula.badge || "Recommande";
    }
    const titleElement = card.querySelector("h3");
    const descriptionElement = card.querySelector("p");
    const listElement = card.querySelector(".check-list");
    const priceElement = card.querySelector(".price");
    const button = card.querySelector(".js-plan-select");
    if (titleElement) titleElement.textContent = formula.title;
    if (descriptionElement) descriptionElement.textContent = formula.description;
    if (listElement) {
      listElement.innerHTML = formula.features.map((feature) => `<li>${escapeHtml(feature)}</li>`).join("");
    }
    if (priceElement) {
      priceElement.textContent = formatFormulaPrice(formula);
      if (formula.note && !String(formula.note).toLowerCase().includes("partir")) {
        priceElement.insertAdjacentHTML("afterend", `<small class="price-note">${escapeHtml(formula.note)}</small>`);
      }
    }
    if (button) {
      button.dataset.plan = formula.title;
      button.dataset.price = formula.price;
      button.textContent = formula.ctaLabel || "Étudier cette formule";
      button.classList.toggle("btn--primary", Boolean(formula.recommended));
      button.classList.toggle("btn--outline", !formula.recommended);
    }
  });

  const planSelect = document.querySelector("#selected-plan");
  if (planSelect) {
    planSelect.innerHTML = activeFormulas.map((formula) => `
      <option value="${escapeHtml(formula.title)}" data-price="${escapeHtml(formula.price)}">${escapeHtml(formula.title)} - ${formatFormulaPrice(formula)}</option>
    `).join("");
  }

  document.querySelectorAll("[data-site-phone]").forEach((element) => {
    element.textContent = siteSettings.phone;
  });
  document.querySelectorAll("[data-site-email]").forEach((element) => {
    element.textContent = siteSettings.email;
  });
  document.querySelectorAll("[data-site-address]").forEach((element) => {
    element.textContent = siteSettings.address;
  });
  const contactInfo = document.querySelector(".contact-info");
  const contactEyebrow = contactInfo?.querySelector(".eyebrow");
  const contactTitle = contactInfo?.querySelector("h2");
  const contactIntro = contactTitle?.nextElementSibling;
  const contactMessage = document.querySelector("[data-contact-message-placeholder]") || document.querySelector(".contact-form textarea[name='message']");
  const contactButton = document.querySelector("[data-contact-button]");
  const contactSubmitButton = document.querySelector(".contact-form button[type='submit']");
  if (contactEyebrow) contactEyebrow.textContent = siteSettings.contactEyebrow;
  if (contactTitle) contactTitle.textContent = siteSettings.contactTitle;
  if (contactIntro) contactIntro.textContent = siteSettings.contactIntro;
  if (contactMessage) contactMessage.setAttribute("placeholder", siteSettings.contactMessagePlaceholder);
  if (contactButton) contactButton.textContent = siteSettings.contactButton;
  if (!contactButton && contactSubmitButton) contactSubmitButton.innerHTML = `${escapeHtml(siteSettings.contactButton)} <span aria-hidden="true">→</span>`;
  renderFaqs();
}

function renderStars(rating) {
  const value = Math.max(0, Math.min(5, Math.round(Number(rating) || 0)));
  return "★★★★★".slice(0, value);
}

function renderRatingCard(place) {
  const averageLabel = Number(place.rating || 0).toFixed(1).replace(".", ",");
  const totalLabel = Number(place.user_ratings_total || 0).toLocaleString("fr-FR");
  const reviewsUrl = place.url || `https://www.google.com/search?q=${encodeURIComponent(`${place.name || googleReviewsConfig.query} avis Google`)}`;
  return `
    <article class="rating-card" aria-label="Note moyenne Google">
      <span class="laurel laurel--left" aria-hidden="true"></span>
      <span class="google">G</span>
      <h3>${escapeHtml(place.name || googleReviewsConfig.query)}</h3>
      <small>Note moyenne</small>
      <strong>${averageLabel}/5</strong>
      <span class="stars">${renderStars(place.rating)}</span>
      <small>${totalLabel} avis</small>
      <a class="google-reviews-link" href="${escapeHtml(reviewsUrl)}" target="_blank" rel="noopener">Voir tous les avis Google</a>
      <span class="laurel laurel--right" aria-hidden="true"></span>
    </article>
  `;
}

function renderGoogleReviewsState(message) {
  if (!reviewsGrid) return;
  const isLoading = message.toLowerCase().includes("chargement");
  reviewsGrid.innerHTML = `
    <article class="testimonial-card testimonial-card--empty">
      <div class="testimonial-copy">
        <i class="fa-solid ${isLoading ? "fa-spinner fa-spin" : "fa-circle-info"}" aria-hidden="true"></i>
        <p>${escapeHtml(message)}</p>
      </div>
    </article>
    ${isLoading ? "" : renderRatingCard(googleFallbackPlace)}
  `;
}

function renderGoogleReviews(place) {
  if (!reviewsGrid) return;
  const reviews = (place.reviews || [])
    .filter((review) => review.text && review.author_name)
    .slice(0, 3);

  const cards = reviews.map((review) => {
    const author = escapeHtml(review.author_name);
    const photo = review.profile_photo_url
      ? `<img src="${escapeHtml(review.profile_photo_url)}" alt="Photo Google de ${author}">`
      : `<span>${escapeHtml(author.slice(0, 2).toUpperCase())}</span>`;

    return `
      <article class="testimonial-card">
        <div class="avatar">${photo}</div>
        <div class="testimonial-copy">
          <i class="fa-solid fa-quote-left" aria-hidden="true"></i>
          <p>${escapeHtml(review.text)}</p>
          <div>
            <strong>${author}</strong>
            <span class="stars">${renderStars(review.rating)}</span>
          </div>
          <small class="review-source">Avis Google ${review.relative_time_description ? `- ${escapeHtml(review.relative_time_description)}` : ""}</small>
        </div>
      </article>
    `;
  }).join("");

  reviewsGrid.innerHTML = `
    ${cards || `
      <article class="testimonial-card testimonial-card--empty">
        <div class="testimonial-copy">
          <i class="fa-solid fa-quote-left" aria-hidden="true"></i>
          <p>Google n'a renvoyé aucun avis textuel pour cet établissement.</p>
        </div>
      </article>
    `}
    ${renderRatingCard(place)}
  `;
}

function getPlaceDetails(service, request) {
  return new Promise((resolve, reject) => {
    service.getDetails(request, (place, status) => {
      if (status !== google.maps.places.PlacesServiceStatus.OK || !place) {
        reject(new Error(status));
        return;
      }
      resolve(place);
    });
  });
}

function findPlaceId(service, query) {
  return new Promise((resolve, reject) => {
    service.findPlaceFromQuery({
      query,
      fields: ["place_id"],
    }, (results, status) => {
      if (status !== google.maps.places.PlacesServiceStatus.OK || !results?.[0]?.place_id) {
        reject(new Error(status));
        return;
      }
      resolve(results[0].place_id);
    });
  });
}

function loadGooglePlaces(apiKey) {
  return new Promise((resolve, reject) => {
    if (window.google?.maps?.places) {
      resolve();
      return;
    }

    const callbackName = `initGooglePlacesReviews${Date.now()}`;
    const previousAuthFailure = window.gm_authFailure;
    let settled = false;
    const cleanup = () => {
      delete window[callbackName];
      window.gm_authFailure = previousAuthFailure;
    };
    const timeout = window.setTimeout(() => {
      if (settled) return;
      settled = true;
      cleanup();
      reject(new Error("Google Places ne repond pas. Verifiez la cle API, le referer localhost et l'activation de Places API."));
    }, 8000);
    window[callbackName] = () => {
      if (settled) return;
      settled = true;
      window.clearTimeout(timeout);
      cleanup();
      resolve();
    };
    window.gm_authFailure = () => {
      if (settled) return;
      settled = true;
      window.clearTimeout(timeout);
      cleanup();
      reject(new Error("Cle Google Maps refusee ou non autorisee pour ce domaine."));
    };

    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=${encodeURIComponent(apiKey)}&libraries=places&callback=${callbackName}`;
    script.async = true;
    script.defer = true;
    script.onerror = () => {
      if (settled) return;
      settled = true;
      window.clearTimeout(timeout);
      cleanup();
      reject(new Error("Impossible de charger Google Places."));
    };
    document.head.appendChild(script);
  });
}

async function renderPublicReviews() {
  if (!reviewsGrid) return;
  if (!googleReviewsConfig.apiKey) {
    renderGoogleReviewsState("Avis Google à connecter depuis le dashboard admin.");
    return;
  }

  renderGoogleReviewsState("Chargement des avis Google...");

  try {
    await loadGooglePlaces(googleReviewsConfig.apiKey);
    const service = new google.maps.places.PlacesService(document.createElement("div"));
    const placeId = googleReviewsConfig.placeId || await findPlaceId(service, googleReviewsConfig.query);
    const place = await getPlaceDetails(service, {
      placeId,
      fields: ["name", "rating", "user_ratings_total", "reviews", "url"],
    });
    renderGoogleReviews(place);
  } catch (error) {
    console.warn(error);
    renderGoogleReviewsState("Les avis Google détaillés sont en cours de connexion. La note vérifiée est affichée ci-contre.");
  }
}

renderPublicReviews();

const storageKey = "nomad_leads";
const modal = document.querySelector("#inscription");
const leadForm = document.querySelector("#lead-form");
const contactForm = document.querySelector("#contact-form");
const planSelect = document.querySelector("#selected-plan");
const priceInput = document.querySelector("#selected-price");
const formStatus = document.querySelector("#form-status");
const contactStatus = document.querySelector("#contact-status");

function getPlanPrice(plan) {
  const option = planSelect?.querySelector(`option[value="${CSS.escape(plan)}"]`);
  return option?.dataset.price || "";
}

function formatPrice(price) {
  if (!price) return "";
  return `${Number(price).toLocaleString("fr-FR")} EUR`;
}

function updateSelectedPrice() {
  if (!planSelect || !priceInput) return;
  const option = planSelect.selectedOptions[0];
  priceInput.value = formatPrice(option?.dataset.price || "");
}

function openLeadModal(plan, price, message = "") {
  if (!modal || !planSelect) return;
  if (formStatus) formStatus.textContent = "";
  planSelect.value = plan;
  if (planSelect.value !== plan) {
    planSelect.selectedIndex = 0;
  }
  if (priceInput) priceInput.value = formatPrice(price || getPlanPrice(planSelect.value));
  const messageField = leadForm?.querySelector("textarea[name='message']");
  if (messageField && message) {
    messageField.value = message;
  }
  modal.classList.add("is-open");
  modal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
  leadForm?.querySelector("input[name='name']")?.focus();
}

function closeLeadModal() {
  if (!modal) return;
  modal.classList.remove("is-open");
  modal.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}

function readLeads() {
  try {
    return JSON.parse(localStorage.getItem(storageKey)) || [];
  } catch {
    return [];
  }
}

function saveLead(lead) {
  const leads = readLeads();
  leads.unshift(lead);
  localStorage.setItem(storageKey, JSON.stringify(leads));
}

function readContacts() {
  try {
    return JSON.parse(localStorage.getItem(contactsStorageKey)) || [];
  } catch {
    return [];
  }
}

function saveContact(contact) {
  const contacts = readContacts();
  contacts.unshift(contact);
  localStorage.setItem(contactsStorageKey, JSON.stringify(contacts));
}

async function sendSubmissionEmail(payload) {
  const response = await fetch("send-mail.php", {
    method: "POST",
    body: new URLSearchParams(payload),
  });
  const result = await response.json().catch(() => ({}));
  if (!response.ok || !result.ok) {
    throw new Error(result.message || "Email non envoye.");
  }
  return result;
}

document.addEventListener("click", (event) => {
  const pricingButton = event.target.closest("[data-pricing-action]");
  if (pricingButton) {
    const activeFormulas = formulas.filter((formula) => formula.active !== false);
    if (activeFormulas.length > 3) {
      const direction = pricingButton.dataset.pricingAction === "next" ? 1 : -1;
      pricingSlideIndex = (pricingSlideIndex + direction + activeFormulas.length) % activeFormulas.length;
      renderPricingSlider(activeFormulas);
    }
    return;
  }

  const planButton = event.target.closest(".js-plan-select");
  if (planButton) {
    event.preventDefault();
    openLeadModal(planButton.dataset.plan, planButton.dataset.price);
  }
});

document.querySelectorAll(".js-eligibility").forEach((button) => {
  button.addEventListener("click", (event) => {
    event.preventDefault();
    const formula = formulas.find((item) => item.key === "journee" && item.active !== false)
      || formulas.find((item) => item.active !== false)
      || defaultFormulas[0];
    openLeadModal(formula.title, formula.price, "Je souhaite vérifier mon éligibilité.");
  });
});

planSelect?.addEventListener("change", updateSelectedPrice);
updateSelectedPrice();

document.querySelectorAll("[data-modal-close]").forEach((button) => {
  button.addEventListener("click", closeLeadModal);
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && modal?.classList.contains("is-open")) {
    closeLeadModal();
  }
});

leadForm?.addEventListener("submit", async (event) => {
  event.preventDefault();
  const formData = new FormData(leadForm);
  const plan = formData.get("plan");
  const price = getPlanPrice(plan);
  const lead = {
    id: `NOMAD-${Date.now()}`,
    createdAt: new Date().toISOString(),
    status: "Nouveau",
    plan,
    price,
    name: formData.get("name"),
    phone: formData.get("phone"),
    email: formData.get("email"),
    city: formData.get("city"),
    gearbox: formData.get("gearbox"),
    hours: formData.get("hours"),
    lastExam: formData.get("lastExam"),
    message: formData.get("message"),
  };
  saveLead(lead);
  if (formStatus) {
    formStatus.textContent = "Demande enregistree. Envoi du mail en cours...";
  }
  try {
    await sendSubmissionEmail({ type: "formula", ...lead, price: formatPrice(price) });
    if (formStatus) {
      formStatus.textContent = "Demande envoyee par mail et disponible dans le dashboard admin.";
    }
  } catch {
    if (formStatus) {
      formStatus.textContent = "Demande disponible dans le dashboard admin. Email non envoye: verifiez la configuration mail de WAMP.";
    }
  }
  leadForm.reset();
  planSelect.value = plan;
  updateSelectedPrice();
  setTimeout(closeLeadModal, 1800);
});

contactForm?.addEventListener("submit", async (event) => {
  event.preventDefault();
  const formData = new FormData(contactForm);
  const contact = {
    id: `CONTACT-${Date.now()}`,
    createdAt: new Date().toISOString(),
    status: "Nouveau",
    name: formData.get("name"),
    phone: formData.get("phone"),
    email: formData.get("email"),
    city: formData.get("city"),
    gearbox: formData.get("gearbox"),
    hours: formData.get("hours"),
    lastExam: formData.get("lastExam"),
    message: formData.get("message"),
  };
  saveContact(contact);
  if (contactStatus) {
    contactStatus.textContent = "Message enregistre. Envoi du mail en cours...";
  }
  try {
    await sendSubmissionEmail({ type: "contact", ...contact });
    if (contactStatus) {
      contactStatus.textContent = "Message envoye par mail et disponible dans le dashboard admin.";
    }
  } catch {
    if (contactStatus) {
      contactStatus.textContent = "Message disponible dans le dashboard admin. Email non envoye: verifiez la configuration mail de WAMP.";
    }
  }
  contactForm.reset();
});
