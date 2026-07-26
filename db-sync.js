(function () {
  const endpoint = "api/storage.php";
  const storageKeys = new Set([
    "nomad_leads",
    "nomad_contacts",
    "nomad_site_settings",
    "nomad_site_settings_version",
    "nomad_formulas",
    "nomad_formulas_version",
    "nomad_videos",
    "nomad_faqs",
    "nomad_faqs_version",
    "nomad_users",
    "nomad_roles",
    "nomad_activity_log",
  ]);

  const originalSetItem = Storage.prototype.setItem;
  const originalRemoveItem = Storage.prototype.removeItem;

  function parseValue(value) {
    try {
      return JSON.parse(value);
    } catch {
      return value;
    }
  }

  function syncKey(key, value) {
    if (!storageKeys.has(key) || !window.fetch) return;
    fetch(`${endpoint}?action=save`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ key, value: parseValue(value) }),
      keepalive: true,
    }).catch(() => {});
  }

  function loadFromDatabase() {
    try {
      const request = new XMLHttpRequest();
      request.open("GET", `${endpoint}?action=load&t=${Date.now()}`, false);
      request.send(null);
      if (request.status < 200 || request.status >= 300) return;
      const payload = JSON.parse(request.responseText || "{}");
      if (!payload.ok || !payload.data) return;
      Object.entries(payload.data).forEach(([key, value]) => {
        if (storageKeys.has(key)) {
          originalSetItem.call(localStorage, key, typeof value === "string" ? value : JSON.stringify(value));
        }
      });
    } catch {
      window.nomadDatabaseOffline = true;
    }
  }

  Storage.prototype.setItem = function (key, value) {
    originalSetItem.call(this, key, value);
    if (this === localStorage) syncKey(key, value);
  };

  Storage.prototype.removeItem = function (key) {
    originalRemoveItem.call(this, key);
    if (this === localStorage) syncKey(key, null);
  };

  loadFromDatabase();
  storageKeys.forEach((key) => {
    const value = localStorage.getItem(key);
    if (value !== null) syncKey(key, value);
  });
})();
