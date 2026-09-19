(function () {
  const key = "nomad_cookie_choice";
  const duration = 183 * 24 * 60 * 60 * 1000;

  function readChoice() {
    try {
      const choice = JSON.parse(localStorage.getItem(key) || "null");
      if (choice && typeof choice.external === "boolean" && Date.now() - choice.updatedAt < duration) return choice;
    } catch { /* Storage can be unavailable in private browsing. */ }
    return null;
  }

  let choice = readChoice();
  window.nomadCookieConsent = {
    allows(category) { return category === "necessary" || (category === "external" && choice?.external === true); },
    open() { document.querySelector("#cookie-panel")?.removeAttribute("hidden"); },
  };

  document.addEventListener("DOMContentLoaded", () => {
    const settings = document.createElement("button");
    settings.type = "button";
    settings.className = "cookie-settings";
    settings.textContent = "Gestion des cookies";
    document.body.append(settings);

    const panel = document.createElement("section");
    panel.id = "cookie-panel";
    panel.className = "cookie-panel";
    panel.setAttribute("role", "dialog");
    panel.setAttribute("aria-labelledby", "cookie-title");
    panel.hidden = Boolean(choice);
    panel.innerHTML = `
      <h2 id="cookie-title">Vos choix de confidentialité</h2>
      <p>Le site utilise un stockage nécessaire à son fonctionnement. Avec votre accord, il peut aussi charger les avis Google, qui peuvent utiliser des traceurs. Vous pouvez refuser sans perdre l'accès au site.</p>
      <p><a href="gestion-cookies.html">Lire la politique de gestion des cookies</a></p>
      <div class="cookie-panel__details" hidden>
        <p><strong>Nécessaires :</strong> fonctionnement des formulaires et mémorisation de votre choix. Toujours actifs.</p>
        <label><input type="checkbox" id="cookie-external">Autoriser les services externes (avis Google)</label>
      </div>
      <div class="cookie-panel__actions">
        <button type="button" data-cookie-action="reject">Tout refuser</button>
        <button type="button" data-cookie-action="accept">Tout accepter</button>
        <button type="button" data-cookie-action="customize">Personnaliser</button>
        <button type="button" data-cookie-action="save" hidden>Enregistrer mon choix</button>
      </div>
    `;
    document.body.append(panel);
    const checkbox = panel.querySelector("#cookie-external");
    checkbox.checked = choice?.external === true;

    function save(external) {
      const previouslyAllowed = choice?.external === true;
      choice = { external, updatedAt: Date.now() };
      try { localStorage.setItem(key, JSON.stringify(choice)); } catch { /* Keep the choice for this page. */ }
      panel.hidden = true;
      window.dispatchEvent(new CustomEvent("nomad:cookie-choice", { detail: choice }));
      if (previouslyAllowed && !external) window.location.reload();
    }

    settings.addEventListener("click", () => {
      checkbox.checked = choice?.external === true;
      panel.hidden = false;
      panel.querySelector("[data-cookie-action='reject']").focus();
    });
    panel.addEventListener("click", (event) => {
      const action = event.target.closest("[data-cookie-action]")?.dataset.cookieAction;
      if (action === "accept") save(true);
      if (action === "reject") save(false);
      if (action === "customize") {
        panel.querySelector(".cookie-panel__details").hidden = false;
        panel.querySelector("[data-cookie-action='save']").hidden = false;
        checkbox.focus();
      }
      if (action === "save") save(checkbox.checked);
    });
  });
})();
