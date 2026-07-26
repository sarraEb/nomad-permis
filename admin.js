const storageKey = "nomad_leads";
const contactsStorageKey = "nomad_contacts";
const siteSettingsKey = "nomad_site_settings";
const siteSettingsVersionKey = "nomad_site_settings_version";
const siteSettingsVersion = "2026-07-26-contact-separated";
const formulasStorageKey = "nomad_formulas";
const formulasVersionKey = "nomad_formulas_version";
const formulasVersion = "2026-07-20-client-validated";
const videosStorageKey = "nomad_videos";
const faqsStorageKey = "nomad_faqs";
const faqsVersionKey = "nomad_faqs_version";
const faqsVersion = "2026-07-20-client-validated";
const usersStorageKey = "nomad_users";
const rolesStorageKey = "nomad_roles";
const activityStorageKey = "nomad_activity_log";
const authKey = "nomad_admin_auth";
const currentUserKey = "nomad_admin_user";

const leadsBody = document.querySelector("#leads-body");
const emptyState = document.querySelector("#empty-state");
const leadsPagination = document.querySelector("#leads-pagination");
const searchInput = document.querySelector("#lead-search");
const statusFilter = document.querySelector("#status-filter");
const exportButton = document.querySelector("#export-leads");
const contactsBody = document.querySelector("#contacts-body");
const contactsEmptyState = document.querySelector("#contacts-empty-state");
const contactsPagination = document.querySelector("#contacts-pagination");
const contactSearchInput = document.querySelector("#contact-search");
const contactStatusFilter = document.querySelector("#contact-status-filter");
const exportContactsButton = document.querySelector("#export-contacts");
const loginForm = document.querySelector("#admin-login-form");
const loginError = document.querySelector("#login-error");
const logoutButton = document.querySelector("#logout-admin");
const sidebarLogoutButton = document.querySelector("#logout-admin-sidebar");
const googleSettingsForm = document.querySelector("#google-settings-form");
const googleSettingsStatus = document.querySelector("#google-settings-status");
const videoForm = document.querySelector("#video-form");
const videosBody = document.querySelector("#videos-body");
const videosEmptyState = document.querySelector("#videos-empty-state");
const videosPagination = document.querySelector("#videos-pagination");
const videoSearchInput = document.querySelector("#video-search");
const videoLinkFilter = document.querySelector("#video-link-filter");
const videoUploadMeta = document.querySelector("#video-upload-meta");
const formulasForm = document.querySelector("#formulas-form");
const formulasStatus = document.querySelector("#formulas-status");
const addFormulaButton = document.querySelector("#add-formula");
const siteSettingsForm = document.querySelector("#site-settings-form");
const siteSettingsStatus = document.querySelector("#site-settings-status");
const faqForm = document.querySelector("#faq-form");
const faqStatus = document.querySelector("#faq-status");
const faqSubmitButton = document.querySelector("#faq-submit-button");
const cancelFaqEditButton = document.querySelector("#cancel-faq-edit");
const faqsBody = document.querySelector("#faqs-body");
const faqsEmptyState = document.querySelector("#faqs-empty-state");
const faqsPagination = document.querySelector("#faqs-pagination");
const faqSearchInput = document.querySelector("#faq-search");
const faqStatusFilter = document.querySelector("#faq-status-filter");
const userForm = document.querySelector("#user-form");
const userStatus = document.querySelector("#user-status");
const userSubmitButton = document.querySelector("#user-submit-button");
const cancelUserEditButton = document.querySelector("#cancel-user-edit");
const usersBody = document.querySelector("#users-body");
const usersEmptyState = document.querySelector("#users-empty-state");
const usersPagination = document.querySelector("#users-pagination");
const userSearchInput = document.querySelector("#user-search");
const userRoleFilter = document.querySelector("#user-role-filter");
const userStatusFilter = document.querySelector("#user-status-filter");
const roleForm = document.querySelector("#role-form");
const roleStatus = document.querySelector("#role-status");
const rolesBody = document.querySelector("#roles-body");
const rolesEmptyState = document.querySelector("#roles-empty-state");
const cancelRoleEditButton = document.querySelector("#cancel-role-edit");
const roleSubmitButton = document.querySelector("#role-submit-button");
const historyBody = document.querySelector("#history-body");
const historyEmptyState = document.querySelector("#history-empty-state");
const historyPagination = document.querySelector("#history-pagination");
const historySearchInput = document.querySelector("#history-search");
const historyActionFilter = document.querySelector("#history-action-filter");
const clearHistoryButton = document.querySelector("#clear-history");
const leadDetailModal = document.querySelector("#lead-detail-modal");
const leadDetailContent = document.querySelector("#lead-detail-content");
const replyModal = document.querySelector("#reply-modal");
const replyForm = document.querySelector("#reply-form");
const replyClientCard = document.querySelector("#reply-client-card");
const replyToInput = document.querySelector("#reply-to");
const replySubjectInput = document.querySelector("#reply-subject");
const replyMessageInput = document.querySelector("#reply-message");
const adminNavLinks = document.querySelectorAll(".admin-nav a[data-admin-link]");
const adminPages = document.querySelectorAll("[data-admin-page]");
const pageSize = 6;
const paginationState = {
  leads: 1,
  contacts: 1,
  videos: 1,
  faqs: 1,
  users: 1,
  history: 1,
};

const defaultUsers = [
  {
    id: "USER-ADMIN",
    name: "Administrateur NOMAD",
    username: "admin",
    password: "nomad2026",
    role: "Administrateur",
    active: true,
    createdAt: new Date("2026-01-01T00:00:00.000Z").toISOString(),
  },
];

const permissionOptions = [
  { key: "dashboard.access", label: "Acceder au dashboard" },
  { key: "demandes.view", label: "Voir les demandes" },
  { key: "demandes.manage", label: "Modifier le statut des demandes" },
  { key: "demandes.reply", label: "Repondre aux demandes" },
  { key: "demandes.delete", label: "Supprimer les demandes" },
  { key: "demandes.export", label: "Exporter les demandes" },
  { key: "contacts.view", label: "Voir les messages contact" },
  { key: "contacts.manage", label: "Modifier le statut des contacts" },
  { key: "contacts.reply", label: "Repondre aux contacts" },
  { key: "contacts.delete", label: "Supprimer les contacts" },
  { key: "contacts.export", label: "Exporter les contacts" },
  { key: "google.manage", label: "Configurer Google" },
  { key: "videos.view", label: "Voir les videos" },
  { key: "videos.add", label: "Ajouter / uploader une video" },
  { key: "videos.preview", label: "Previsualiser une video" },
  { key: "videos.validate", label: "Valider / publier une video" },
  { key: "videos.delete", label: "Supprimer une video" },
  { key: "formules.view", label: "Voir les formules" },
  { key: "formules.add", label: "Ajouter une formule" },
  { key: "formules.edit", label: "Modifier une formule" },
  { key: "formules.delete", label: "Supprimer une formule" },
  { key: "formules.recommend", label: "Choisir la formule recommandee" },
  { key: "site.manage", label: "Modifier les coordonnees du site" },
  { key: "faq.view", label: "Voir la FAQ" },
  { key: "faq.add", label: "Ajouter une question FAQ" },
  { key: "faq.edit", label: "Modifier une question FAQ" },
  { key: "faq.toggle", label: "Activer / desactiver une FAQ" },
  { key: "faq.delete", label: "Supprimer une question FAQ" },
  { key: "users.view", label: "Voir les utilisateurs" },
  { key: "users.add", label: "Ajouter un utilisateur" },
  { key: "users.edit", label: "Modifier un utilisateur" },
  { key: "users.toggle", label: "Activer / desactiver un utilisateur" },
  { key: "users.delete", label: "Supprimer un utilisateur" },
  { key: "roles.view", label: "Voir les roles" },
  { key: "roles.manage", label: "Ajouter / modifier / supprimer les roles" },
  { key: "history.view", label: "Voir l'historique" },
  { key: "history.clear", label: "Vider l'historique" },
];

const allPermissionKeys = permissionOptions.map((permission) => permission.key);

const defaultRoles = [
  { id: "ROLE-ADMIN", name: "Administrateur", permissions: [...allPermissionKeys], protected: true, createdAt: new Date("2026-01-01T00:00:00.000Z").toISOString() },
  { id: "ROLE-MANAGER", name: "Gestionnaire", permissions: ["dashboard.access", "demandes.view", "demandes.manage", "demandes.reply", "contacts.view", "contacts.manage", "contacts.reply", "videos.view", "videos.add", "videos.preview", "videos.validate", "formules.view", "formules.add", "formules.edit", "faq.view", "faq.add", "faq.edit", "faq.toggle"], protected: true, createdAt: new Date("2026-01-01T00:00:00.000Z").toISOString() },
  { id: "ROLE-READONLY", name: "Lecture seule", permissions: ["dashboard.access", "demandes.view", "contacts.view", "videos.view", "formules.view", "faq.view", "history.view"], protected: true, createdAt: new Date("2026-01-01T00:00:00.000Z").toISOString() },
];

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
  contactIntro: "Une question sur NOMAD, votre dossier ou l'organisation de votre sejour ? Envoyez-nous un message, l'equipe vous repond rapidement.",
  contactButton: "Envoyer mon message",
  contactMessagePlaceholder: "Votre message, votre question ou vos disponibilites...",
};

const defaultFaqs = [
  {
    id: "FAQ-1",
    question: "Puis-je venir de Paris ou d'une autre ville ?",
    answer: "Oui. NOMAD accompagne les candidats venant de toute la France et organise leur déplacement selon la formule choisie.",
    active: true,
    createdAt: new Date("2026-01-01T00:00:00.000Z").toISOString(),
  },
  {
    id: "FAQ-2",
    question: "En combien de temps mon séjour peut-il être organisé ?",
    answer: "Après l'étude de votre dossier, notre équipe peut organiser votre séjour très rapidement selon vos disponibilités et le nombre d'heures prévu.",
    active: true,
    createdAt: new Date("2026-01-01T00:00:00.000Z").toISOString(),
  },
  {
    id: "FAQ-3",
    question: "Comment déterminez-vous mon nombre d'heures ?",
    answer: "Nous analysons votre expérience, votre dernier CEPC, le temps écoulé depuis votre dernière conduite et, si nécessaire, votre évaluation préalable.",
    active: true,
    createdAt: new Date("2026-01-01T00:00:00.000Z").toISOString(),
  },
  {
    id: "FAQ-4",
    question: "Que comprennent les formules NOMAD ?",
    answer: "Toutes nos formules comprennent la gestion administrative, la conduite, la présentation à l'examen et le train aller-retour. L'hébergement, les repas et le coaching varient selon la formule choisie.",
    active: true,
    createdAt: new Date("2026-01-01T00:00:00.000Z").toISOString(),
  },
  {
    id: "FAQ-5",
    question: "Mon code et mon numéro NEPH doivent-ils être valides ?",
    answer: "Oui. Votre code de la route et votre numéro NEPH doivent être valides pour permettre votre présentation à l'examen.",
    active: true,
    createdAt: new Date("2026-01-01T00:00:00.000Z").toISOString(),
  },
  {
    id: "FAQ-6",
    question: "Puis-je payer en plusieurs fois ?",
    answer: "Oui. Le paiement est possible par virement ou en quatre fois avec Alma.",
    active: true,
    createdAt: new Date("2026-01-01T00:00:00.000Z").toISOString(),
  },
  {
    id: "FAQ-7",
    question: "Que se passe-t-il après un échec ?",
    answer: "Nous analysons votre CEPC et vous proposons une nouvelle organisation adaptée. Avec au moins 24 points sur 31, la Journée NOMAD peut notamment être envisagée.",
    active: true,
    createdAt: new Date("2026-01-01T00:00:00.000Z").toISOString(),
  },
];

function isAuthenticated() {
  return sessionStorage.getItem(authKey) === "true";
}

function getAdminPage() {
  const page = new URLSearchParams(window.location.search).get("page") || "demandes";
  return ["demandes", "contacts", "google", "videos", "formules", "coordonnees", "faq", "users", "roles", "history"].includes(page) ? page : "demandes";
}

function applyAdminPage() {
  const currentPage = getAdminPage();
  adminPages.forEach((page) => {
    page.classList.toggle("is-active", page.dataset.adminPage === currentPage);
  });
  adminNavLinks.forEach((link) => {
    link.classList.toggle("active", link.dataset.adminLink === currentPage);
  });
}

function getCurrentUser() {
  try {
    return JSON.parse(sessionStorage.getItem(currentUserKey)) || null;
  } catch {
    return null;
  }
}

function setAuthenticated(value) {
  if (value) {
    sessionStorage.setItem(authKey, "true");
    document.body.classList.add("is-authenticated");
    renderLeads();
    renderContacts();
    renderVideos();
    renderFaqs();
    renderUsers();
    renderRoles();
    renderActivityLog();
    populateSettingsForms();
    applyAdminPage();
    return;
  }
  sessionStorage.removeItem(authKey);
  sessionStorage.removeItem(currentUserKey);
  document.body.classList.remove("is-authenticated");
}

function readLeads() {
  try {
    return JSON.parse(localStorage.getItem(storageKey)) || [];
  } catch {
    return [];
  }
}

function writeLeads(leads) {
  localStorage.setItem(storageKey, JSON.stringify(leads));
}

function readContacts() {
  const storedContacts = (() => {
    try {
      return JSON.parse(localStorage.getItem(contactsStorageKey)) || [];
    } catch {
      return [];
    }
  })();
  const legacyContacts = readLeads()
    .filter((lead) => String(lead.plan || "").toLowerCase() === "contact")
    .map((lead) => ({ ...lead, source: "legacy" }));
  return [...storedContacts, ...legacyContacts];
}

function writeContacts(contacts) {
  localStorage.setItem(contactsStorageKey, JSON.stringify(contacts.filter((contact) => contact.source !== "legacy")));
}

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

function writeSiteSettings(settings) {
  localStorage.setItem(siteSettingsKey, JSON.stringify(settings));
  localStorage.setItem(siteSettingsVersionKey, siteSettingsVersion);
}

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

function writeFormulas(formulas) {
  localStorage.setItem(formulasStorageKey, JSON.stringify(formulas));
  localStorage.setItem(formulasVersionKey, formulasVersion);
}

function readVideos() {
  try {
    return JSON.parse(localStorage.getItem(videosStorageKey)) || [];
  } catch {
    return [];
  }
}

function writeVideos(videos) {
  localStorage.setItem(videosStorageKey, JSON.stringify(videos));
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

async function saveVideoBlob(id, file) {
  const db = await openVideoDb();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction("videos", "readwrite");
    transaction.objectStore("videos").put(file, id);
    transaction.oncomplete = () => {
      db.close();
      resolve();
    };
    transaction.onerror = () => {
      db.close();
      reject(transaction.error);
    };
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

async function deleteVideoBlob(id) {
  if (!id) return;
  const db = await openVideoDb();
  return new Promise((resolve) => {
    const transaction = db.transaction("videos", "readwrite");
    transaction.objectStore("videos").delete(id);
    transaction.oncomplete = () => {
      db.close();
      resolve();
    };
    transaction.onerror = () => {
      db.close();
      resolve();
    };
  });
}

function formatVideoDuration(seconds) {
  if (!Number.isFinite(seconds) || seconds <= 0) return "Duree non disponible";
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.round(seconds % 60).toString().padStart(2, "0");
  return `${minutes} min ${remainingSeconds}`;
}

function loadVideoMetadata(file) {
  return new Promise((resolve, reject) => {
    const video = document.createElement("video");
    const url = URL.createObjectURL(file);
    video.preload = "metadata";
    video.muted = true;
    video.playsInline = true;

    const cleanup = () => URL.revokeObjectURL(url);

    video.addEventListener("loadedmetadata", () => {
      const duration = formatVideoDuration(video.duration);
      const seekTo = Math.min(0.8, Math.max(0.1, (video.duration || 1) * 0.08));
      video.currentTime = seekTo;

      video.addEventListener("seeked", () => {
        let poster = "assets/hero-driving.png";
        try {
          const canvas = document.createElement("canvas");
          canvas.width = video.videoWidth || 1280;
          canvas.height = video.videoHeight || 720;
          canvas.getContext("2d").drawImage(video, 0, 0, canvas.width, canvas.height);
          poster = canvas.toDataURL("image/jpeg", 0.78);
        } catch {
          poster = "assets/hero-driving.png";
        }
        cleanup();
        resolve({ duration, poster });
      }, { once: true });
    }, { once: true });

    video.addEventListener("error", () => {
      cleanup();
      reject(new Error("Video illisible"));
    }, { once: true });

    video.src = url;
  });
}

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

function writeFaqs(faqs) {
  localStorage.setItem(faqsStorageKey, JSON.stringify(faqs));
  localStorage.setItem(faqsVersionKey, faqsVersion);
}

function readUsers() {
  try {
    const stored = JSON.parse(localStorage.getItem(usersStorageKey)) || [];
    return stored.length ? stored : defaultUsers.map((user) => ({ ...user }));
  } catch {
    return defaultUsers.map((user) => ({ ...user }));
  }
}

function writeUsers(users) {
  localStorage.setItem(usersStorageKey, JSON.stringify(users));
}

function expandLegacyPermissions(permissions = []) {
  const legacyMap = {
    "demandes.manage": ["demandes.manage", "demandes.reply", "demandes.delete", "demandes.export"],
    "contacts.manage": ["contacts.view", "contacts.manage", "contacts.reply", "contacts.delete", "contacts.export"],
    "videos.manage": ["videos.view", "videos.add", "videos.preview", "videos.validate", "videos.delete"],
    "formules.manage": ["formules.view", "formules.add", "formules.edit", "formules.delete", "formules.recommend"],
    "faq.manage": ["faq.view", "faq.add", "faq.edit", "faq.toggle", "faq.delete"],
    "users.manage": ["users.view", "users.add", "users.edit", "users.toggle", "users.delete", "roles.view", "roles.manage"],
  };
  return [...new Set(permissions.flatMap((permission) => legacyMap[permission] || permission))];
}

function readRoles() {
  try {
    const stored = JSON.parse(localStorage.getItem(rolesStorageKey)) || [];
    if (!stored.length) return defaultRoles.map((role) => ({ ...role, permissions: [...role.permissions] }));
    return stored.map((role) => ({
      ...role,
      permissions: role.id === "ROLE-ADMIN"
        ? [...allPermissionKeys]
        : expandLegacyPermissions(Array.isArray(role.permissions) ? role.permissions : []),
    }));
  } catch {
    return defaultRoles.map((role) => ({ ...role, permissions: [...role.permissions] }));
  }
}

function writeRoles(roles) {
  localStorage.setItem(rolesStorageKey, JSON.stringify(roles));
}

function readActivityLog() {
  try {
    return JSON.parse(localStorage.getItem(activityStorageKey)) || [];
  } catch {
    return [];
  }
}

function writeActivityLog(entries) {
  localStorage.setItem(activityStorageKey, JSON.stringify(entries.slice(0, 150)));
}

function logActivity(action, details = "") {
  const currentUser = getCurrentUser();
  const entries = readActivityLog();
  entries.unshift({
    id: `LOG-${Date.now()}`,
    createdAt: new Date().toISOString(),
    user: currentUser?.username || "system",
    action,
    details,
  });
  writeActivityLog(entries);
  renderActivityLog();
}

function formatDate(value) {
  return new Intl.DateTimeFormat("fr-FR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(value));
}

function formatPrice(price) {
  return `${Number(price || 0).toLocaleString("fr-FR")} EUR`;
}

function escapeHtml(value) {
  return String(value || "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function previewText(value, maxLength = 95) {
  const text = String(value || "-").replace(/\s+/g, " ").trim();
  if (text.length <= maxLength) return text;
  return `${text.slice(0, maxLength).trim()}...`;
}

function buildReplyMailto(item, subject) {
  const email = String(item.email || "").trim();
  if (!email) return "#";
  const body = [
    `Bonjour ${item.name || ""},`,
    "",
    "Nous revenons vers vous suite a votre demande NOMAD.",
    "",
    "Cordialement,",
    "L'equipe NOMAD",
  ].join("\n");
  return `mailto:${encodeURIComponent(email)}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

function buildMailtoHref(to, subject, body) {
  return `mailto:${encodeURIComponent(to)}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

function buildWebmailHref(provider, to, subject, body) {
  const encodedTo = encodeURIComponent(to);
  const encodedSubject = encodeURIComponent(subject);
  const encodedBody = encodeURIComponent(body);
  if (provider === "gmail") {
    return `https://mail.google.com/mail/?view=cm&fs=1&to=${encodedTo}&su=${encodedSubject}&body=${encodedBody}`;
  }
  if (provider === "outlook") {
    return `https://outlook.office.com/mail/deeplink/compose?to=${encodedTo}&subject=${encodedSubject}&body=${encodedBody}`;
  }
  return buildMailtoHref(to, subject, body);
}

function openLocalMailClient(to, subject, body) {
  const link = document.createElement("a");
  link.href = buildMailtoHref(to, subject, body);
  link.style.display = "none";
  document.body.appendChild(link);
  link.click();
  link.remove();
}

function getReplyPayload() {
  const to = replyToInput?.value.trim();
  const subject = replySubjectInput?.value.trim();
  const message = replyMessageInput?.value.trim();
  if (!to || !subject || !message) return null;
  return { to, subject, message };
}

function logReplyDraft() {
  const type = replyForm?.dataset.replyType || "lead";
  const id = replyForm?.dataset.replyId || "";
  logActivity("Reponse client", `${type === "contact" ? "Contact" : "Demande"} ${id} : brouillon ouvert`);
}

function openReplyComposer(type, id) {
  const item = type === "contact"
    ? readContacts().find((contact) => contact.id === id)
    : readLeads().find((lead) => lead.id === id);
  if (!item || !replyModal || !replyForm || !replyToInput || !replySubjectInput || !replyMessageInput) return;

  const isContact = type === "contact";
  const subject = isContact
    ? "Votre message NOMAD"
    : `Votre demande NOMAD - ${item.plan || "Formule"}`;
  const context = isContact
    ? `Message initial : ${item.message || "-"}`
    : `Formule : ${item.plan || "-"}\nPrix : ${formatPrice(item.price)}\nMessage initial : ${item.message || "-"}`;
  const body = [
    `Bonjour ${item.name || ""},`,
    "",
    "Nous revenons vers vous suite a votre demande NOMAD.",
    "",
    context,
    "",
    "Cordialement,",
    "L'equipe NOMAD",
  ].join("\n");

  replyForm.dataset.replyType = type;
  replyForm.dataset.replyId = id;
  replyToInput.value = item.email || "";
  replySubjectInput.value = subject;
  replyMessageInput.value = body;
  if (replyClientCard) {
    replyClientCard.innerHTML = `
      <strong>${escapeHtml(item.name || "Client")}</strong>
      <span>${escapeHtml(item.phone || "Telephone non precise")} - ${escapeHtml(item.city || "Ville non precisee")}</span>
      <small>${escapeHtml(isContact ? "Contact" : (item.plan || "Demande"))}</small>
    `;
  }
  replyModal.classList.add("is-open");
  replyModal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
  replyMessageInput.focus();
}

function closeReplyComposer() {
  if (!replyModal || !replyForm) return;
  replyModal.classList.remove("is-open");
  replyModal.setAttribute("aria-hidden", "true");
  replyForm.reset();
  replyForm.dataset.replyType = "";
  replyForm.dataset.replyId = "";
  document.body.style.overflow = "";
}

function statusClass(status) {
  if (status === "Traite") return "done";
  if (status === "En cours") return "progress";
  if (status === "Publiee") return "done";
  if (status === "Masquee") return "progress";
  return "";
}

function videoStatus(video) {
  return video.status || "En attente";
}

function getFilteredLeads() {
  const query = searchInput.value.trim().toLowerCase();
  const status = statusFilter.value;

  return readLeads().filter((lead) => {
    if (String(lead.plan || "").toLowerCase() === "contact") return false;
    const matchesStatus = status === "all" || lead.status === status;
    const haystack = [
      lead.name,
      lead.email,
      lead.phone,
      lead.city,
      lead.gearbox,
      lead.hours,
      lead.lastExam,
      lead.plan,
      lead.message,
    ].join(" ").toLowerCase();
    return matchesStatus && (!query || haystack.includes(query));
  });
}

function getFilteredContacts() {
  const query = (contactSearchInput?.value || "").trim().toLowerCase();
  const status = contactStatusFilter?.value || "all";

  return readContacts().filter((contact) => {
    const matchesStatus = status === "all" || contact.status === status;
    const haystack = [
      contact.name,
      contact.email,
      contact.phone,
      contact.city,
      contact.message,
    ].join(" ").toLowerCase();
    return matchesStatus && (!query || haystack.includes(query));
  });
}

function getFilteredVideos() {
  const query = (videoSearchInput?.value || "").trim().toLowerCase();
  const statusFilter = videoLinkFilter?.value || "all";

  return readVideos().filter((video) => {
    const status = videoStatus(video);
    const matchesStatus =
      statusFilter === "all" ||
      (statusFilter === "pending" && status === "En attente") ||
      (statusFilter === "published" && status === "Publiee") ||
      (statusFilter === "hidden" && status === "Masquee");
    const haystack = [
      video.firstName,
      video.title,
      video.journey,
      video.duration,
      video.fileName,
      video.subtitles,
    ].join(" ").toLowerCase();
    return matchesStatus && (!query || haystack.includes(query));
  });
}

function getFilteredFaqs() {
  const query = (faqSearchInput?.value || "").trim().toLowerCase();
  const status = faqStatusFilter?.value || "all";

  return readFaqs().filter((faq) => {
    const matchesStatus = status === "all" || (status === "active" && faq.active) || (status === "inactive" && !faq.active);
    const haystack = [faq.question, faq.answer].join(" ").toLowerCase();
    return matchesStatus && (!query || haystack.includes(query));
  });
}

function getFilteredUsers() {
  const query = (userSearchInput?.value || "").trim().toLowerCase();
  const role = userRoleFilter?.value || "all";
  const status = userStatusFilter?.value || "all";

  return readUsers().filter((user) => {
    const matchesRole = role === "all" || user.role === role;
    const matchesStatus = status === "all" || (status === "active" && user.active) || (status === "inactive" && !user.active);
    const haystack = [user.name, user.username, user.role].join(" ").toLowerCase();
    return matchesRole && matchesStatus && (!query || haystack.includes(query));
  });
}

function getFilteredActivityLog() {
  const query = (historySearchInput?.value || "").trim().toLowerCase();
  const action = historyActionFilter?.value || "all";

  return readActivityLog().filter((entry) => {
    const matchesAction = action === "all" || String(entry.action || "").includes(action);
    const haystack = [entry.user, entry.action, entry.details].join(" ").toLowerCase();
    return matchesAction && (!query || haystack.includes(query));
  });
}

function renderStats(leads) {
  document.querySelector("#stat-total").textContent = leads.length;
  document.querySelector("#stat-new").textContent = leads.filter((lead) => lead.status === "Nouveau").length;
  document.querySelector("#stat-progress").textContent = leads.filter((lead) => lead.status === "En cours").length;
  document.querySelector("#stat-done").textContent = leads.filter((lead) => lead.status === "Traite").length;
}

function renderContactStats(contacts) {
  document.querySelector("#contact-stat-total").textContent = contacts.length;
  document.querySelector("#contact-stat-new").textContent = contacts.filter((contact) => contact.status === "Nouveau").length;
  document.querySelector("#contact-stat-progress").textContent = contacts.filter((contact) => contact.status === "En cours").length;
  document.querySelector("#contact-stat-done").textContent = contacts.filter((contact) => contact.status === "Traite").length;
}

function renderLeadDetails(lead) {
  return `
    <div><span>ID demande</span><strong>${escapeHtml(lead.id)}</strong></div>
    <div><span>Date complete</span><strong>${formatDate(lead.createdAt)}</strong></div>
    <div><span>Statut</span><strong>${escapeHtml(lead.status)}</strong></div>
    <div><span>Nom complet</span><strong>${escapeHtml(lead.name)}</strong></div>
    <div><span>Ville</span><strong>${escapeHtml(lead.city || "Non precisee")}</strong></div>
    <div><span>Telephone</span><strong>${escapeHtml(lead.phone)}</strong></div>
    <div><span>Email</span><strong>${escapeHtml(lead.email)}</strong></div>
    <div><span>Boite</span><strong>${escapeHtml(lead.gearbox || "Non precisee")}</strong></div>
    <div><span>Heures deja realisees</span><strong>${escapeHtml(lead.hours || "Non precisees")}</strong></div>
    <div><span>Dernier examen</span><strong>${escapeHtml(lead.lastExam || "Non precise")}</strong></div>
    <div><span>Formule choisie</span><strong>${escapeHtml(lead.plan)}</strong></div>
    <div><span>Prix</span><strong>${formatPrice(lead.price)}</strong></div>
    <div class="admin-detail-card__full"><span>Message complet</span><p>${escapeHtml(lead.message || "-")}</p></div>
  `;
}

function renderContactDetails(contact) {
  return `
    <div><span>ID contact</span><strong>${escapeHtml(contact.id)}</strong></div>
    <div><span>Date complete</span><strong>${formatDate(contact.createdAt)}</strong></div>
    <div><span>Statut</span><strong>${escapeHtml(contact.status)}</strong></div>
    <div><span>Nom complet</span><strong>${escapeHtml(contact.name)}</strong></div>
    <div><span>Ville</span><strong>${escapeHtml(contact.city || "Non precisee")}</strong></div>
    <div><span>Telephone</span><strong>${escapeHtml(contact.phone || "Non precise")}</strong></div>
    <div><span>Email</span><strong>${escapeHtml(contact.email || "Non precise")}</strong></div>
    <div class="admin-detail-card__full"><span>Message complet</span><p>${escapeHtml(contact.message || "-")}</p></div>
  `;
}

function openLeadDetails(id) {
  const lead = readLeads().find((item) => item.id === id);
  if (!lead || !leadDetailModal || !leadDetailContent) return;
  leadDetailModal.querySelector("#lead-detail-title").textContent = "Details de la demande";
  leadDetailModal.querySelector(".admin-detail-modal__header span").textContent = "Demande NOMAD";
  leadDetailContent.innerHTML = renderLeadDetails(lead);
  leadDetailModal.classList.add("is-open");
  leadDetailModal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}

function openContactDetails(id) {
  const contact = readContacts().find((item) => item.id === id);
  if (!contact || !leadDetailModal || !leadDetailContent) return;
  leadDetailModal.querySelector("#lead-detail-title").textContent = "Message complet";
  leadDetailModal.querySelector(".admin-detail-modal__header span").textContent = "Contact NOMAD";
  leadDetailContent.innerHTML = renderContactDetails(contact);
  leadDetailModal.classList.add("is-open");
  leadDetailModal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}

function closeLeadDetails() {
  if (!leadDetailModal) return;
  leadDetailModal.classList.remove("is-open");
  leadDetailModal.setAttribute("aria-hidden", "true");
  if (leadDetailContent) {
    leadDetailContent.classList.remove("is-video-preview");
    leadDetailContent.innerHTML = "";
  }
  document.body.style.overflow = "";
}

async function openVideoPreview(id) {
  const video = readVideos().find((item) => item.id === id);
  if (!video || !leadDetailModal || !leadDetailContent) return;
  const blob = await readVideoBlob(video.videoBlobId);
  const previewUrl = blob ? URL.createObjectURL(blob) : video.url;
  leadDetailContent.classList.add("is-video-preview");
  if (!previewUrl) {
    leadDetailContent.innerHTML = `<p>Video indisponible dans ce navigateur.</p>`;
  } else {
    leadDetailContent.innerHTML = `
      <div class="admin-video-preview">
        <video controls playsinline poster="${escapeHtml(video.poster || "")}" src="${escapeHtml(previewUrl)}"></video>
        <div>
          <strong>${escapeHtml(video.firstName)} - ${escapeHtml(video.title)}</strong>
          <span>${escapeHtml(video.journey)}</span>
          <small>${escapeHtml(video.duration)} ${video.fileName ? `- ${escapeHtml(video.fileName)}` : ""}</small>
        </div>
      </div>
    `;
  }
  leadDetailModal.querySelector("#lead-detail-title").textContent = "Apercu de la video";
  leadDetailModal.querySelector(".admin-detail-modal__header span").textContent = "Temoignage video";
  leadDetailModal.classList.add("is-open");
  leadDetailModal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}

function updateVideoStatus(id, status) {
  const videos = readVideos().map((video) => video.id === id ? { ...video, status } : video);
  writeVideos(videos);
  logActivity("Statut video", `Video ${id} : ${status}`);
  renderVideos();
}

function paginateItems(items, key, paginationElement) {
  const totalPages = Math.max(1, Math.ceil(items.length / pageSize));
  paginationState[key] = Math.min(Math.max(1, paginationState[key] || 1), totalPages);
  const currentPage = paginationState[key];
  const start = (currentPage - 1) * pageSize;

  if (paginationElement) {
    paginationElement.style.display = items.length > pageSize ? "flex" : "none";
    paginationElement.innerHTML = `
      <button type="button" data-pagination="${key}" data-page="${currentPage - 1}" ${currentPage === 1 ? "disabled" : ""}>Precedent</button>
      <span>Page ${currentPage} / ${totalPages}</span>
      <button type="button" data-pagination="${key}" data-page="${currentPage + 1}" ${currentPage === totalPages ? "disabled" : ""}>Suivant</button>
    `;
  }

  return items.slice(start, start + pageSize);
}

function renderLeads() {
  const allLeads = readLeads().filter((lead) => String(lead.plan || "").toLowerCase() !== "contact");
  const leads = getFilteredLeads();
  renderStats(allLeads);

  if (!leadsBody || !emptyState) return;
  emptyState.style.display = leads.length ? "none" : "block";
  const pageLeads = paginateItems(leads, "leads", leadsPagination);
  leadsBody.innerHTML = pageLeads.map((lead) => `
    <tr>
      <td class="date-cell">${formatDate(lead.createdAt)}</td>
      <td class="client-cell">
        <strong>${escapeHtml(lead.name)}</strong>
        <small>${escapeHtml(lead.city || "Ville non precisee")}</small>
      </td>
      <td class="contact-cell">
        <a href="tel:${escapeHtml(lead.phone)}">${escapeHtml(lead.phone)}</a>
        <a href="mailto:${escapeHtml(lead.email)}">${escapeHtml(lead.email)}</a>
      </td>
      <td class="plan-cell">
        <strong>${escapeHtml(lead.plan)}</strong>
        <small>${formatPrice(lead.price)}</small>
      </td>
      <td class="message-cell">
        <span>${escapeHtml(previewText(lead.message))}</span>
        ${String(lead.message || "").trim().length > 95 ? `<button type="button" class="message-more" data-action="details" data-id="${lead.id}">Lire le message <span aria-hidden="true">&rarr;</span></button>` : ""}
      </td>
      <td class="status-cell"><span class="status-pill ${statusClass(lead.status)}">${escapeHtml(lead.status)}</span></td>
      <td>
        <div class="table-actions">
          <button type="button" data-action="progress" data-id="${lead.id}">En cours</button>
          <button type="button" data-action="done" data-id="${lead.id}">Traite</button>
          <button type="button" data-action="details" data-id="${lead.id}">D&eacute;tails</button>
          <button type="button" data-action="reply" data-id="${lead.id}">R&eacute;pondre</button>
          <button type="button" data-action="delete" data-id="${lead.id}">Supprimer</button>
        </div>
      </td>
    </tr>
  `).join("");
}

function renderContacts() {
  const allContacts = readContacts();
  const contacts = getFilteredContacts();
  renderContactStats(allContacts);

  if (!contactsBody || !contactsEmptyState) return;
  contactsEmptyState.style.display = contacts.length ? "none" : "block";
  const pageContacts = paginateItems(contacts, "contacts", contactsPagination);
  contactsBody.innerHTML = pageContacts.map((contact) => `
    <tr>
      <td class="date-cell">${formatDate(contact.createdAt)}</td>
      <td class="client-cell"><strong>${escapeHtml(contact.name)}</strong><small>${escapeHtml(contact.city || "Ville non precisee")}</small></td>
      <td class="contact-cell">
        <a href="tel:${escapeHtml(contact.phone || "")}">${escapeHtml(contact.phone || "Telephone non precise")}</a>
        <a href="mailto:${escapeHtml(contact.email || "")}">${escapeHtml(contact.email || "Email non precise")}</a>
      </td>
      <td class="message-cell">
        <span>${escapeHtml(previewText(contact.message, 110))}</span>
        ${String(contact.message || "").trim().length > 110 ? `<button type="button" class="message-more" data-contact-action="details" data-id="${contact.id}">Lire le message <span aria-hidden="true">&rarr;</span></button>` : ""}
      </td>
      <td class="status-cell"><span class="status-pill ${statusClass(contact.status)}">${escapeHtml(contact.status)}</span></td>
      <td>
        <div class="table-actions">
          <button type="button" data-contact-action="progress" data-id="${contact.id}">En cours</button>
          <button type="button" data-contact-action="done" data-id="${contact.id}">Traite</button>
          <button type="button" data-contact-action="details" data-id="${contact.id}">D&eacute;tails</button>
          <button type="button" data-contact-action="reply" data-id="${contact.id}">R&eacute;pondre</button>
          <button type="button" data-contact-action="delete" data-id="${contact.id}">Supprimer</button>
        </div>
      </td>
    </tr>
  `).join("");
}

function renderVideos() {
  const videos = getFilteredVideos();
  if (!videosBody || !videosEmptyState) return;
  videosEmptyState.style.display = videos.length ? "none" : "block";
  const pageVideos = paginateItems(videos, "videos", videosPagination);
  videosBody.innerHTML = pageVideos.map((video) => `
    <tr>
      <td><strong>${escapeHtml(video.firstName)}</strong><br><small>${escapeHtml(video.title)}</small></td>
      <td>${escapeHtml(video.journey)}</td>
      <td>${escapeHtml(video.duration)}<br><small>${escapeHtml(video.fileName || "")}</small></td>
      <td>${video.url ? `<a href="${escapeHtml(video.url)}" target="_blank" rel="noopener">Voir</a>` : (video.videoBlobId ? "Uploadee" : "-")}</td>
      <td><span class="status-pill ${statusClass(videoStatus(video))}">${escapeHtml(videoStatus(video))}</span></td>
      <td>
        <div class="table-actions">
          <button type="button" data-video-action="view" data-id="${video.id}">Voir</button>
          <button type="button" data-video-action="publish" data-id="${video.id}">Valider</button>
          <button type="button" data-video-action="hide" data-id="${video.id}">Masquer</button>
          <button type="button" data-video-action="delete" data-id="${video.id}">Supprimer</button>
        </div>
      </td>
    </tr>
  `).join("");
}

function renderFaqs() {
  const faqs = getFilteredFaqs();
  if (!faqsBody || !faqsEmptyState) return;
  faqsEmptyState.style.display = faqs.length ? "none" : "block";
  const pageFaqs = paginateItems(faqs, "faqs", faqsPagination);
  faqsBody.innerHTML = pageFaqs.map((faq) => `
    <tr>
      <td><strong>${escapeHtml(faq.question)}</strong></td>
      <td>${escapeHtml(faq.answer)}</td>
      <td><span class="status-pill ${faq.active ? "done" : ""}">${faq.active ? "Active" : "Desactivee"}</span></td>
      <td>
        <div class="table-actions">
          <button type="button" data-faq-action="edit" data-id="${faq.id}">Modifier</button>
          <button type="button" data-faq-action="toggle" data-id="${faq.id}">${faq.active ? "Desactiver" : "Activer"}</button>
          <button type="button" data-faq-action="delete" data-id="${faq.id}">Supprimer</button>
        </div>
      </td>
    </tr>
  `).join("");
}

function renderUsers() {
  const users = getFilteredUsers();
  if (!usersBody || !usersEmptyState) return;
  usersEmptyState.style.display = users.length ? "none" : "block";
  const pageUsers = paginateItems(users, "users", usersPagination);
  usersBody.innerHTML = pageUsers.map((user) => `
    <tr>
      <td><strong>${escapeHtml(user.name)}</strong><br><small>Ajoute le ${formatDate(user.createdAt)}</small></td>
      <td>${escapeHtml(user.username)}</td>
      <td>${escapeHtml(user.role)}</td>
      <td><span class="status-pill ${user.active ? "done" : ""}">${user.active ? "Actif" : "Desactive"}</span></td>
      <td>
        <div class="table-actions">
          <button type="button" data-user-action="edit" data-id="${user.id}">Modifier</button>
          <button type="button" data-user-action="toggle" data-id="${user.id}">${user.active ? "Desactiver" : "Activer"}</button>
          <button type="button" data-user-action="delete" data-id="${user.id}">Supprimer</button>
        </div>
      </td>
    </tr>
  `).join("");
}

function renderRoleOptions() {
  const roles = readRoles();
  if (userForm?.role) {
    const current = userForm.role.value;
    userForm.role.innerHTML = roles.map((role) => `<option value="${escapeHtml(role.name)}">${escapeHtml(role.name)}</option>`).join("");
    if (roles.some((role) => role.name === current)) userForm.role.value = current;
  }
  if (userRoleFilter) {
    const current = userRoleFilter.value;
    userRoleFilter.innerHTML = `<option value="all">Tous les roles</option>${roles.map((role) => `<option value="${escapeHtml(role.name)}">${escapeHtml(role.name)}</option>`).join("")}`;
    userRoleFilter.value = roles.some((role) => role.name === current) ? current : "all";
  }
}

function renderRoles() {
  const roles = readRoles();
  if (!rolesBody || !rolesEmptyState) return;
  rolesEmptyState.style.display = roles.length ? "none" : "block";
  rolesBody.innerHTML = roles.map((role) => {
    const labels = role.permissions
      .map((key) => permissionOptions.find((permission) => permission.key === key)?.label || key)
      .join(", ");
    return `
      <tr>
        <td><strong>${escapeHtml(role.name)}</strong>${role.protected ? "<br><small>Role systeme</small>" : ""}</td>
        <td>${escapeHtml(labels || "Aucune permission")}</td>
        <td>
          <div class="table-actions">
            <button type="button" data-role-action="edit" data-id="${role.id}">Modifier</button>
            <button type="button" data-role-action="delete" data-id="${role.id}">Supprimer</button>
          </div>
        </td>
      </tr>
    `;
  }).join("");
  renderRoleOptions();
}

function renderActivityLog() {
  const entries = getFilteredActivityLog();
  if (!historyBody || !historyEmptyState) return;
  historyEmptyState.style.display = entries.length ? "none" : "block";
  const pageEntries = paginateItems(entries, "history", historyPagination);
  historyBody.innerHTML = pageEntries.map((entry) => `
    <tr>
      <td>${formatDate(entry.createdAt)}</td>
      <td><strong>${escapeHtml(entry.user)}</strong></td>
      <td>${escapeHtml(entry.action)}</td>
      <td>${escapeHtml(entry.details || "-")}</td>
    </tr>
  `).join("");
}

function renderFormulaEditors() {
  if (!formulasForm) return;
  formulasForm.querySelectorAll("fieldset").forEach((fieldset) => fieldset.remove());
  const submitButton = formulasForm.querySelector("button[type='submit']");
  readFormulas().forEach((formula) => {
    submitButton?.insertAdjacentHTML("beforebegin", `
      <fieldset class="formula-editor-card" data-formula-key="${escapeHtml(formula.key)}">
        <legend>${escapeHtml(formula.title || "Nouvelle formule")}</legend>
        <div class="formula-card-summary">
          <div>
            <span class="formula-card-kicker">${formula.recommended ? "Recommandee" : formula.active === false ? "Masquee" : "Active"}</span>
            <h3>${escapeHtml(formula.title || "Nouvelle formule")}</h3>
            <p>${escapeHtml(formula.description || "")}</p>
          </div>
          <div class="formula-card-side">
            <strong>${escapeHtml(formula.note || "a partir de")} ${escapeHtml(formula.price || "0")} EUR</strong>
            <button type="button" class="btn btn--outline btn--small" data-formula-toggle="${escapeHtml(formula.key)}">Modifier</button>
            <button type="button" class="admin-delete-link" data-formula-delete="${escapeHtml(formula.key)}">Supprimer</button>
          </div>
        </div>
        <div class="formula-fields">
        <label>Titre <input name="${escapeHtml(formula.key)}Title" type="text"></label>
        <label>Description <input name="${escapeHtml(formula.key)}Description" type="text"></label>
        <label>Prix <input name="${escapeHtml(formula.key)}Price" type="number" min="0" step="10"></label>
        <label>Badge <input name="${escapeHtml(formula.key)}Badge" type="text" placeholder="ex: Recommande"></label>
        <label>Note <input name="${escapeHtml(formula.key)}Note" type="text" placeholder="Texte sous le prix"></label>
        <label>Texte bouton <input name="${escapeHtml(formula.key)}CtaLabel" type="text" placeholder="Étudier cette formule"></label>
        <label class="admin-form__full">Avantages <textarea name="${escapeHtml(formula.key)}Features" rows="4"></textarea></label>
        <label class="admin-checkbox"><input name="recommended" type="radio" value="${escapeHtml(formula.key)}"> Recommandee</label>
        <label class="admin-checkbox"><input name="${escapeHtml(formula.key)}Active" type="checkbox"> Afficher sur le site</label>
        </div>
      </fieldset>
    `);
  });
}

function populateSettingsForms() {
  const settings = readSiteSettings();
  if (googleSettingsForm) {
    googleSettingsForm.googleApiKey.value = settings.googleApiKey;
    googleSettingsForm.googlePlaceId.value = settings.googlePlaceId;
    googleSettingsForm.googlePlaceQuery.value = settings.googlePlaceQuery;
  }
  if (siteSettingsForm) {
    siteSettingsForm.phone.value = settings.phone;
    siteSettingsForm.email.value = settings.email;
    siteSettingsForm.address.value = settings.address;
    siteSettingsForm.contactEyebrow.value = settings.contactEyebrow;
    siteSettingsForm.contactTitle.value = settings.contactTitle;
    siteSettingsForm.contactIntro.value = settings.contactIntro;
    siteSettingsForm.contactButton.value = settings.contactButton;
    siteSettingsForm.contactMessagePlaceholder.value = settings.contactMessagePlaceholder;
  }
  if (formulasForm) {
    renderFormulaEditors();
    readFormulas().forEach((formula) => {
      formulasForm[`${formula.key}Title`].value = formula.title;
      formulasForm[`${formula.key}Description`].value = formula.description;
      formulasForm[`${formula.key}Price`].value = formula.price;
      formulasForm[`${formula.key}Badge`].value = formula.badge || "";
      formulasForm[`${formula.key}Note`].value = formula.note || "";
      formulasForm[`${formula.key}CtaLabel`].value = formula.ctaLabel || "Étudier cette formule";
      formulasForm[`${formula.key}Active`].checked = formula.active !== false;
      formulasForm[`${formula.key}Features`].value = formula.features.join("\n");
      if (formula.recommended) {
        formulasForm.recommended.value = formula.key;
      }
    });
  }
  renderRoleOptions();
  renderRoles();
}

function updateLeadStatus(id, status) {
  const leads = readLeads().map((lead) => lead.id === id ? { ...lead, status } : lead);
  writeLeads(leads);
  logActivity("Statut demande", `Demande ${id} passee en ${status}`);
  renderLeads();
}

function deleteLead(id) {
  const leads = readLeads().filter((lead) => lead.id !== id);
  writeLeads(leads);
  logActivity("Suppression demande", `Demande ${id} supprimee`);
  renderLeads();
}

function updateContactStatus(id, status) {
  const contacts = readContacts().map((contact) => contact.id === id ? { ...contact, status } : contact);
  writeContacts(contacts);
  logActivity("Statut contact", `Contact ${id} passe en ${status}`);
  renderContacts();
}

function deleteContact(id) {
  const contacts = readContacts().filter((contact) => contact.id !== id);
  writeContacts(contacts);
  logActivity("Suppression contact", `Contact ${id} supprime`);
  renderContacts();
}

function exportCsv() {
  const leads = readLeads();
  const header = ["Date", "Nom", "Telephone", "Email", "Ville", "Boite", "Heures", "Dernier examen", "Formule", "Prix", "Statut", "Message"];
  const rows = leads.map((lead) => [
    formatDate(lead.createdAt),
    lead.name,
    lead.phone,
    lead.email,
    lead.city,
    lead.gearbox,
    lead.hours,
    lead.lastExam,
    lead.plan,
    formatPrice(lead.price),
    lead.status,
    lead.message,
  ]);
  const csv = [header, ...rows]
    .map((row) => row.map((cell) => `"${String(cell || "").replaceAll('"', '""')}"`).join(";"))
    .join("\n");

  const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "nomad-demandes.csv";
  link.click();
  URL.revokeObjectURL(url);
  logActivity("Export CSV", `${leads.length} demande(s) exportee(s)`);
}

function exportContactsCsv() {
  const contacts = readContacts();
  const header = ["Date", "Nom", "Telephone", "Email", "Ville", "Statut", "Message"];
  const rows = contacts.map((contact) => [
    formatDate(contact.createdAt),
    contact.name,
    contact.phone,
    contact.email,
    contact.city,
    contact.status,
    contact.message,
  ]);
  const csv = [header, ...rows]
    .map((row) => row.map((cell) => `"${String(cell || "").replaceAll('"', '""')}"`).join(";"))
    .join("\n");

  const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "nomad-contacts.csv";
  link.click();
  URL.revokeObjectURL(url);
  logActivity("Export contacts", `${contacts.length} contact(s) exporte(s)`);
}

function addUser(formData) {
  const username = String(formData.get("username") || "").trim();
  const editingId = String(formData.get("editingId") || "").trim();
  const users = readUsers();
  if (users.some((user) => user.id !== editingId && user.username.toLowerCase() === username.toLowerCase())) {
    if (userStatus) userStatus.textContent = "Cet identifiant existe deja.";
    return;
  }
  if (editingId) {
    const existing = users.find((user) => user.id === editingId);
    if (!existing) return;
    const password = String(formData.get("password") || "");
    const updated = users.map((user) => user.id === editingId ? {
      ...user,
      name: String(formData.get("name") || "").trim(),
      username,
      password: password || user.password,
      role: String(formData.get("role") || "Gestionnaire"),
      updatedAt: new Date().toISOString(),
    } : user);
    writeUsers(updated);
    logActivity("Modification utilisateur", `Utilisateur ${existing.username} modifie`);
    if (userStatus) userStatus.textContent = "Utilisateur modifie.";
    resetUserEditor();
    renderUsers();
    return;
  }
  users.unshift({
    id: `USER-${Date.now()}`,
    name: String(formData.get("name") || "").trim(),
    username,
    password: String(formData.get("password") || ""),
    role: String(formData.get("role") || "Gestionnaire"),
    active: true,
    createdAt: new Date().toISOString(),
  });
  writeUsers(users);
  logActivity("Ajout utilisateur", `Utilisateur ${username} ajoute`);
  if (userStatus) userStatus.textContent = "Utilisateur ajoute.";
  resetUserEditor();
  renderUsers();
}

function startUserEdit(id) {
  const user = readUsers().find((item) => item.id === id);
  if (!user || !userForm) return;
  userForm.editingId.value = user.id;
  userForm.name.value = user.name || "";
  userForm.username.value = user.username || "";
  userForm.password.value = "";
  userForm.password.required = false;
  userForm.password.placeholder = "Laisser vide pour garder l'actuel";
  userForm.role.value = user.role || "Gestionnaire";
  if (userSubmitButton) userSubmitButton.textContent = "Enregistrer les modifications";
  if (cancelUserEditButton) cancelUserEditButton.hidden = false;
  if (userStatus) userStatus.textContent = `Modification de ${user.username}`;
  userForm.scrollIntoView({ behavior: "smooth", block: "center" });
}

function resetUserEditor() {
  if (!userForm) return;
  userForm.reset();
  userForm.editingId.value = "";
  userForm.password.required = true;
  userForm.password.placeholder = "Minimum 6 caracteres";
  if (userSubmitButton) userSubmitButton.textContent = "Ajouter l'utilisateur";
  if (cancelUserEditButton) cancelUserEditButton.hidden = true;
}

function getSelectedRolePermissions() {
  if (!roleForm) return [];
  return Array.from(roleForm.querySelectorAll('input[name="permissions"]:checked')).map((input) => input.value);
}

function resetRoleEditor() {
  if (!roleForm) return;
  roleForm.reset();
  roleForm.elements.editingId.value = "";
  if (roleSubmitButton) roleSubmitButton.textContent = "Ajouter le role";
  if (cancelRoleEditButton) cancelRoleEditButton.hidden = true;
}

function addRole(formData) {
  const roles = readRoles();
  const name = String(formData.get("name") || "").trim();
  const editingId = String(formData.get("editingId") || "").trim();
  const permissions = getSelectedRolePermissions();
  if (!permissions.length) {
    if (roleStatus) roleStatus.textContent = "Choisissez au moins une action autorisee.";
    return;
  }
  if (roles.some((role) => role.id !== editingId && role.name.toLowerCase() === name.toLowerCase())) {
    if (roleStatus) roleStatus.textContent = "Ce role existe deja.";
    return;
  }
  if (editingId) {
    const existing = roles.find((role) => role.id === editingId);
    if (!existing) return;
    const updatedRoles = roles.map((role) => role.id === editingId ? {
      ...role,
      name,
      permissions,
      updatedAt: new Date().toISOString(),
    } : role);
    writeRoles(updatedRoles);
    if (existing.name !== name) {
      writeUsers(readUsers().map((user) => user.role === existing.name ? { ...user, role: name } : user));
    }
    logActivity("Modification role", `Role ${existing.name} modifie`);
    if (roleStatus) roleStatus.textContent = "Role modifie.";
    resetRoleEditor();
    renderRoles();
    renderUsers();
    return;
  }
  roles.unshift({
    id: `ROLE-${Date.now()}`,
    name,
    permissions,
    protected: false,
    createdAt: new Date().toISOString(),
  });
  writeRoles(roles);
  logActivity("Ajout role", `Role ${name} ajoute`);
  if (roleStatus) roleStatus.textContent = "Role ajoute.";
  resetRoleEditor();
  renderRoles();
}

function startRoleEdit(id) {
  const role = readRoles().find((item) => item.id === id);
  if (!role || !roleForm) return;
  roleForm.elements.editingId.value = role.id;
  roleForm.elements.name.value = role.name || "";
  roleForm.querySelectorAll('input[name="permissions"]').forEach((input) => {
    input.checked = role.permissions.includes(input.value);
  });
  if (roleSubmitButton) roleSubmitButton.textContent = "Enregistrer le role";
  if (cancelRoleEditButton) cancelRoleEditButton.hidden = false;
  if (roleStatus) roleStatus.textContent = `Modification du role ${role.name}`;
  roleForm.scrollIntoView({ behavior: "smooth", block: "center" });
}

function deleteRole(id) {
  const roles = readRoles();
  const role = roles.find((item) => item.id === id);
  if (!role) return;
  if (role.protected) {
    if (roleStatus) roleStatus.textContent = "Impossible de supprimer un role systeme.";
    return;
  }
  if (readUsers().some((user) => user.role === role.name)) {
    if (roleStatus) roleStatus.textContent = "Impossible de supprimer un role utilise par un utilisateur.";
    return;
  }
  writeRoles(roles.filter((item) => item.id !== id));
  logActivity("Suppression role", `Role ${role.name} supprime`);
  if (roleStatus) roleStatus.textContent = "Role supprime.";
  renderRoles();
}

function toggleUser(id) {
  const users = readUsers();
  const user = users.find((item) => item.id === id);
  if (!user) return;
  const activeAdmins = users.filter((item) => item.active && item.role === "Administrateur");
  if (user.active && user.role === "Administrateur" && activeAdmins.length === 1) {
    if (userStatus) userStatus.textContent = "Impossible de desactiver le dernier administrateur actif.";
    return;
  }
  const updated = users.map((item) => item.id === id ? { ...item, active: !item.active } : item);
  writeUsers(updated);
  logActivity(user.active ? "Desactivation utilisateur" : "Activation utilisateur", `Utilisateur ${user.username}`);
  renderUsers();
}

function deleteUser(id) {
  const users = readUsers();
  const user = users.find((item) => item.id === id);
  if (!user) return;
  const remainingAdmins = users.filter((item) => item.id !== id && item.active && item.role === "Administrateur");
  if (user.role === "Administrateur" && !remainingAdmins.length) {
    if (userStatus) userStatus.textContent = "Impossible de supprimer le dernier administrateur actif.";
    return;
  }
  writeUsers(users.filter((item) => item.id !== id));
  logActivity("Suppression utilisateur", `Utilisateur ${user.username} supprime`);
  renderUsers();
}

function createFormulaKey(title) {
  const base = String(title || "formule")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "") || "formule";
  const keys = readFormulas().map((formula) => formula.key);
  let key = base;
  let index = 2;
  while (keys.includes(key)) {
    key = `${base}-${index}`;
    index += 1;
  }
  return key;
}

function addFormula() {
  const formulas = readFormulas();
  const title = `Nouvelle formule ${formulas.length + 1}`;
  const key = createFormulaKey(title);
  formulas.push({
    key,
    title,
    description: "Description de la formule.",
    price: "0",
    features: ["Nouvel avantage"],
    recommended: false,
    active: true,
    badge: "",
    note: "",
    ctaLabel: "Étudier cette formule",
  });
  writeFormulas(formulas);
  logActivity("Ajout formule", `Formule ${title} ajoutee`);
  populateSettingsForms();
}

function deleteFormula(key) {
  const formulas = readFormulas();
  if (formulas.length <= 1) {
    if (formulasStatus) formulasStatus.textContent = "Impossible de supprimer la derniere formule.";
    return;
  }
  const formula = formulas.find((item) => item.key === key);
  const remaining = formulas.filter((item) => item.key !== key);
  if (!remaining.some((item) => item.recommended) && remaining[0]) {
    remaining[0].recommended = true;
  }
  writeFormulas(remaining);
  logActivity("Suppression formule", `Formule ${formula?.title || key} supprimee`);
  populateSettingsForms();
}

function addFaq(formData) {
  const faqs = readFaqs();
  const question = String(formData.get("question") || "").trim();
  const editingId = String(formData.get("editingId") || faqForm?.dataset.editingId || "").trim();
  if (editingId) {
    const existing = faqs.find((faq) => faq.id === editingId);
    writeFaqs(faqs.map((faq) => faq.id === editingId ? {
      ...faq,
      question,
      answer: String(formData.get("answer") || "").trim(),
      active: formData.has("active"),
      updatedAt: new Date().toISOString(),
    } : faq));
    logActivity("Modification FAQ", existing?.question || question);
    if (faqStatus) faqStatus.textContent = "Question modifiee.";
    resetFaqEditor();
    renderFaqs();
    return;
  }
  faqs.unshift({
    id: `FAQ-${Date.now()}`,
    question,
    answer: String(formData.get("answer") || "").trim(),
    active: formData.has("active"),
    createdAt: new Date().toISOString(),
  });
  writeFaqs(faqs);
  paginationState.faqs = 1;
  logActivity("Ajout FAQ", question);
  if (faqStatus) faqStatus.textContent = "Question ajoutee.";
  resetFaqEditor();
  renderFaqs();
}

function startFaqEdit(id) {
  const faq = readFaqs().find((item) => item.id === id);
  if (!faq || !faqForm) return;
  const questionField = faqForm.querySelector('[name="question"]');
  const answerField = faqForm.querySelector('[name="answer"]');
  const activeField = faqForm.querySelector('[name="active"]');
  const editingField = faqForm.querySelector('[name="editingId"]');
  faqForm.dataset.editingId = faq.id;
  if (editingField) editingField.value = faq.id;
  if (questionField) questionField.value = faq.question || "";
  if (answerField) answerField.value = faq.answer || "";
  if (activeField) activeField.checked = faq.active !== false;
  faqForm.classList.add("is-editing");
  if (faqSubmitButton) faqSubmitButton.textContent = "Enregistrer la question";
  if (cancelFaqEditButton) cancelFaqEditButton.hidden = false;
  if (faqStatus) faqStatus.textContent = "Modification de la question.";
  questionField?.focus();
  faqForm.scrollIntoView({ behavior: "smooth", block: "center" });
}

function resetFaqEditor() {
  if (!faqForm) return;
  faqForm.reset();
  const editingField = faqForm.querySelector('[name="editingId"]');
  const activeField = faqForm.querySelector('[name="active"]');
  delete faqForm.dataset.editingId;
  if (editingField) editingField.value = "";
  if (activeField) activeField.checked = true;
  faqForm.classList.remove("is-editing");
  if (faqSubmitButton) faqSubmitButton.textContent = "Ajouter la question";
  if (cancelFaqEditButton) cancelFaqEditButton.hidden = true;
}

function toggleFaq(id) {
  const faqs = readFaqs();
  const faq = faqs.find((item) => item.id === id);
  if (!faq) return;
  writeFaqs(faqs.map((item) => item.id === id ? { ...item, active: !item.active } : item));
  logActivity(faq.active ? "Desactivation FAQ" : "Activation FAQ", faq.question);
  renderFaqs();
}

function deleteFaq(id) {
  const faqs = readFaqs();
  const faq = faqs.find((item) => item.id === id);
  writeFaqs(faqs.filter((item) => item.id !== id));
  logActivity("Suppression FAQ", faq?.question || id);
  renderFaqs();
}

function renderPaginatedList(key) {
  if (key === "leads") renderLeads();
  if (key === "contacts") renderContacts();
  if (key === "videos") renderVideos();
  if (key === "faqs") renderFaqs();
  if (key === "users") renderUsers();
  if (key === "history") renderActivityLog();
}

function handlePaginationClick(event) {
  const button = event.target.closest("button[data-pagination]");
  if (!button) return;
  const key = button.dataset.pagination;
  paginationState[key] = Number(button.dataset.page) || 1;
  renderPaginatedList(key);
}

leadsBody?.addEventListener("click", (event) => {
  const button = event.target.closest("button[data-action]");
  if (!button) return;
  const { action, id } = button.dataset;
  if (action === "details") {
    openLeadDetails(id);
    return;
  }
  if (action === "reply") {
    openReplyComposer("lead", id);
    return;
  }
  if (action === "progress") updateLeadStatus(id, "En cours");
  if (action === "done") updateLeadStatus(id, "Traite");
  if (action === "delete") deleteLead(id);
});

contactsBody?.addEventListener("click", (event) => {
  const button = event.target.closest("button[data-contact-action]");
  if (!button) return;
  const { contactAction, id } = button.dataset;
  if (contactAction === "details") {
    openContactDetails(id);
    return;
  }
  if (contactAction === "reply") {
    openReplyComposer("contact", id);
    return;
  }
  if (contactAction === "progress") updateContactStatus(id, "En cours");
  if (contactAction === "done") updateContactStatus(id, "Traite");
  if (contactAction === "delete") deleteContact(id);
});

replyForm?.addEventListener("submit", (event) => {
  event.preventDefault();
  const payload = getReplyPayload();
  if (!payload) return;
  logReplyDraft();
  openLocalMailClient(payload.to, payload.subject, payload.message);
  closeReplyComposer();
});

replyForm?.addEventListener("click", (event) => {
  const button = event.target.closest("button[data-mail-provider]");
  if (!button) return;
  const payload = getReplyPayload();
  if (!payload) return;
  logReplyDraft();
  if (button.dataset.mailProvider === "local") {
    openLocalMailClient(payload.to, payload.subject, payload.message);
  } else {
    window.open(buildWebmailHref(button.dataset.mailProvider, payload.to, payload.subject, payload.message), "_blank", "noopener");
  }
  closeReplyComposer();
});

googleSettingsForm?.addEventListener("submit", (event) => {
  event.preventDefault();
  const formData = new FormData(googleSettingsForm);
  writeSiteSettings({
    ...readSiteSettings(),
    googleApiKey: String(formData.get("googleApiKey") || "").trim(),
    googlePlaceId: String(formData.get("googlePlaceId") || "").trim(),
    googlePlaceQuery: String(formData.get("googlePlaceQuery") || "").trim() || defaultSiteSettings.googlePlaceQuery,
  });
  logActivity("Configuration Google", "Reglages Google Places enregistres");
  if (googleSettingsStatus) googleSettingsStatus.textContent = "Configuration Google enregistrée.";
});

videoForm?.querySelector("input[name='videoFile']")?.addEventListener("change", (event) => {
  const file = event.currentTarget.files?.[0];
  if (!videoUploadMeta) return;
  if (!file) {
    videoUploadMeta.textContent = "Aucune video selectionnee.";
    return;
  }
  const sizeMb = (file.size / 1024 / 1024).toFixed(1);
  videoUploadMeta.textContent = `${file.name} - ${sizeMb} Mo. La duree et l'apercu seront calcules automatiquement.`;
});

videoForm?.addEventListener("submit", async (event) => {
  event.preventDefault();
  const formData = new FormData(videoForm);
  const file = formData.get("videoFile");
  if (!(file instanceof File) || !file.size) {
    if (videoUploadMeta) videoUploadMeta.textContent = "Veuillez choisir une video a uploader.";
    return;
  }

  const submitButton = videoForm.querySelector("button[type='submit']");
  if (submitButton) {
    submitButton.disabled = true;
    submitButton.textContent = "Ajout en cours...";
  }

  let media;
  try {
    media = await loadVideoMetadata(file);
  } catch {
    if (videoUploadMeta) videoUploadMeta.textContent = "Impossible de lire cette video. Essayez un fichier MP4/WebM valide.";
    if (submitButton) {
      submitButton.disabled = false;
      submitButton.textContent = "Ajouter la video";
    }
    return;
  }

  const videoBlobId = `VIDEO-FILE-${Date.now()}`;
  await saveVideoBlob(videoBlobId, file);
  const videos = readVideos();
  videos.unshift({
    id: `VIDEO-${Date.now()}`,
    firstName: formData.get("firstName"),
    journey: formData.get("journey"),
    title: formData.get("title"),
    duration: media.duration,
    poster: media.poster,
    url: "",
    videoBlobId,
    fileName: file.name,
    status: "En attente",
    subtitles: `Temoignage video ${formData.get("journey")}.`,
    createdAt: new Date().toISOString(),
  });
  writeVideos(videos);
  logActivity("Ajout video", `${formData.get("firstName")} - ${formData.get("title")}`);
  videoForm.reset();
  if (videoUploadMeta) videoUploadMeta.textContent = "Aucune video selectionnee.";
  if (submitButton) {
    submitButton.disabled = false;
    submitButton.textContent = "Ajouter la video";
  }
  renderVideos();
});

videosBody?.addEventListener("click", async (event) => {
  const button = event.target.closest("button[data-video-action]");
  if (!button) return;
  if (button.dataset.videoAction === "view") {
    openVideoPreview(button.dataset.id);
    return;
  }
  if (button.dataset.videoAction === "publish") {
    updateVideoStatus(button.dataset.id, "Publiee");
    return;
  }
  if (button.dataset.videoAction === "hide") {
    updateVideoStatus(button.dataset.id, "Masquee");
    return;
  }
  const removed = readVideos().find((video) => video.id === button.dataset.id);
  const videos = readVideos().filter((video) => video.id !== button.dataset.id);
  writeVideos(videos);
  await deleteVideoBlob(removed?.videoBlobId);
  logActivity("Suppression video", `Video ${button.dataset.id} supprimee`);
  renderVideos();
});

siteSettingsForm?.addEventListener("submit", (event) => {
  event.preventDefault();
  const formData = new FormData(siteSettingsForm);
  writeSiteSettings({
    ...readSiteSettings(),
    phone: String(formData.get("phone") || defaultSiteSettings.phone),
    email: String(formData.get("email") || defaultSiteSettings.email),
    address: String(formData.get("address") || defaultSiteSettings.address),
    contactEyebrow: String(formData.get("contactEyebrow") || defaultSiteSettings.contactEyebrow),
    contactTitle: String(formData.get("contactTitle") || defaultSiteSettings.contactTitle),
    contactIntro: String(formData.get("contactIntro") || defaultSiteSettings.contactIntro),
    contactButton: String(formData.get("contactButton") || defaultSiteSettings.contactButton),
    contactMessagePlaceholder: String(formData.get("contactMessagePlaceholder") || defaultSiteSettings.contactMessagePlaceholder),
  });
  logActivity("Coordonnees", "Informations de contact enregistrees");
  if (siteSettingsStatus) siteSettingsStatus.textContent = "Réglages du site enregistrés.";
});

formulasForm?.addEventListener("submit", (event) => {
  event.preventDefault();
  const formData = new FormData(formulasForm);
  const existingFormulas = readFormulas();
  const recommended = String(formData.get("recommended") || existingFormulas[0]?.key || "");
  const formulas = existingFormulas.map((formula) => ({
    key: formula.key,
    title: String(formData.get(`${formula.key}Title`) || formula.title),
    description: String(formData.get(`${formula.key}Description`) || formula.description),
    price: String(formData.get(`${formula.key}Price`) || formula.price),
    badge: String(formData.get(`${formula.key}Badge`) || "").trim(),
    note: String(formData.get(`${formula.key}Note`) || "").trim(),
    ctaLabel: String(formData.get(`${formula.key}CtaLabel`) || "Étudier cette formule").trim(),
    active: formData.has(`${formula.key}Active`),
    features: String(formData.get(`${formula.key}Features`) || "")
      .split("\n")
      .map((item) => item.trim())
      .filter(Boolean),
    recommended: formula.key === recommended,
  }));
  writeFormulas(formulas);
  logActivity("Formules", `Formules enregistrees, recommandee : ${recommended}`);
  if (formulasStatus) formulasStatus.textContent = "Formules enregistrées.";
});

addFormulaButton?.addEventListener("click", addFormula);
formulasForm?.addEventListener("click", (event) => {
  const toggleButton = event.target.closest("button[data-formula-toggle]");
  if (toggleButton) {
    const card = toggleButton.closest(".formula-editor-card");
    const shouldOpen = !card?.classList.contains("is-editing");
    formulasForm.querySelectorAll(".formula-editor-card").forEach((item) => {
      item.classList.remove("is-editing");
      const button = item.querySelector("button[data-formula-toggle]");
      if (button) button.textContent = "Modifier";
    });
    if (card && shouldOpen) {
      card.classList.add("is-editing");
      toggleButton.textContent = "Fermer";
    }
    return;
  }
  const button = event.target.closest("button[data-formula-delete]");
  if (!button) return;
  deleteFormula(button.dataset.formulaDelete);
});

loginForm?.addEventListener("submit", (event) => {
  event.preventDefault();
  const formData = new FormData(loginForm);
  const username = String(formData.get("username") || "").trim();
  const password = String(formData.get("password") || "");
  const matchedUser = readUsers().find((user) => user.active && user.username === username && user.password === password);

  if (matchedUser) {
    if (loginError) loginError.textContent = "";
    sessionStorage.setItem(currentUserKey, JSON.stringify({
      id: matchedUser.id,
      username: matchedUser.username,
      name: matchedUser.name,
      role: matchedUser.role,
    }));
    loginForm.reset();
    setAuthenticated(true);
    logActivity("Connexion", `Connexion de ${matchedUser.username}`);
    return;
  }

  if (loginError) {
    loginError.textContent = "Identifiant ou mot de passe incorrect.";
  }
});

logoutButton?.addEventListener("click", () => {
  logActivity("Deconnexion", "Session admin fermee");
  setAuthenticated(false);
});
sidebarLogoutButton?.addEventListener("click", () => {
  logActivity("Deconnexion", "Session admin fermee");
  setAuthenticated(false);
});

searchInput?.addEventListener("input", () => {
  paginationState.leads = 1;
  renderLeads();
});
statusFilter?.addEventListener("change", () => {
  paginationState.leads = 1;
  renderLeads();
});
exportButton?.addEventListener("click", exportCsv);
exportContactsButton?.addEventListener("click", exportContactsCsv);
leadsPagination?.addEventListener("click", handlePaginationClick);
contactsPagination?.addEventListener("click", handlePaginationClick);
videosPagination?.addEventListener("click", handlePaginationClick);
faqsPagination?.addEventListener("click", handlePaginationClick);
usersPagination?.addEventListener("click", handlePaginationClick);
historyPagination?.addEventListener("click", handlePaginationClick);
[videoSearchInput, videoLinkFilter].forEach((control) => {
  control?.addEventListener("input", () => {
    paginationState.videos = 1;
    renderVideos();
  });
  control?.addEventListener("change", () => {
    paginationState.videos = 1;
    renderVideos();
  });
});
[contactSearchInput, contactStatusFilter].forEach((control) => {
  control?.addEventListener("input", () => {
    paginationState.contacts = 1;
    renderContacts();
  });
  control?.addEventListener("change", () => {
    paginationState.contacts = 1;
    renderContacts();
  });
});
[userSearchInput, userRoleFilter, userStatusFilter].forEach((control) => {
  control?.addEventListener("input", () => {
    paginationState.users = 1;
    renderUsers();
  });
  control?.addEventListener("change", () => {
    paginationState.users = 1;
    renderUsers();
  });
});
[faqSearchInput, faqStatusFilter].forEach((control) => {
  control?.addEventListener("input", () => {
    paginationState.faqs = 1;
    renderFaqs();
  });
  control?.addEventListener("change", () => {
    paginationState.faqs = 1;
    renderFaqs();
  });
});
[historySearchInput, historyActionFilter].forEach((control) => {
  control?.addEventListener("input", () => {
    paginationState.history = 1;
    renderActivityLog();
  });
  control?.addEventListener("change", () => {
    paginationState.history = 1;
    renderActivityLog();
  });
});
faqForm?.addEventListener("submit", (event) => {
  event.preventDefault();
  addFaq(new FormData(faqForm));
});
faqsBody?.addEventListener("click", (event) => {
  const button = event.target.closest("button[data-faq-action]");
  if (!button) return;
  if (button.dataset.faqAction === "edit") startFaqEdit(button.dataset.id);
  if (button.dataset.faqAction === "toggle") toggleFaq(button.dataset.id);
  if (button.dataset.faqAction === "delete") deleteFaq(button.dataset.id);
});
cancelFaqEditButton?.addEventListener("click", () => {
  resetFaqEditor();
  if (faqStatus) faqStatus.textContent = "Modification annulee.";
});
userForm?.addEventListener("submit", (event) => {
  event.preventDefault();
  addUser(new FormData(userForm));
});
usersBody?.addEventListener("click", (event) => {
  const button = event.target.closest("button[data-user-action]");
  if (!button) return;
  if (button.dataset.userAction === "edit") startUserEdit(button.dataset.id);
  if (button.dataset.userAction === "toggle") toggleUser(button.dataset.id);
  if (button.dataset.userAction === "delete") deleteUser(button.dataset.id);
});
cancelUserEditButton?.addEventListener("click", () => {
  resetUserEditor();
  if (userStatus) userStatus.textContent = "Modification annulee.";
});
roleForm?.addEventListener("submit", (event) => {
  event.preventDefault();
  addRole(new FormData(roleForm));
});
rolesBody?.addEventListener("click", (event) => {
  const button = event.target.closest("button[data-role-action]");
  if (!button) return;
  if (button.dataset.roleAction === "edit") startRoleEdit(button.dataset.id);
  if (button.dataset.roleAction === "delete") deleteRole(button.dataset.id);
});
cancelRoleEditButton?.addEventListener("click", () => {
  resetRoleEditor();
  if (roleStatus) roleStatus.textContent = "Modification annulee.";
});
clearHistoryButton?.addEventListener("click", () => {
  const currentUser = getCurrentUser()?.username || "system";
  writeActivityLog([{
    id: `LOG-${Date.now()}`,
    createdAt: new Date().toISOString(),
    user: currentUser,
    action: "Historique",
    details: "Historique vide par l'administrateur",
  }]);
  renderActivityLog();
});
adminNavLinks.forEach((link) => {
  link.addEventListener("click", () => {
    adminNavLinks.forEach((item) => item.classList.remove("active"));
    link.classList.add("active");
  });
});
document.querySelectorAll("[data-lead-detail-close]").forEach((button) => {
  button.addEventListener("click", closeLeadDetails);
});
document.querySelectorAll("[data-reply-close]").forEach((button) => {
  button.addEventListener("click", closeReplyComposer);
});
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && leadDetailModal?.classList.contains("is-open")) {
    closeLeadDetails();
  }
  if (event.key === "Escape" && replyModal?.classList.contains("is-open")) {
    closeReplyComposer();
  }
});
applyAdminPage();

setAuthenticated(isAuthenticated());
