(function () {

  // =========================
  // CONFIGURACIÓN
  // =========================
  const ADS_CONFIG = {
    provider: "monetag",
    format: "popunder",
    zoneId: "10476753",
    maxPerSession: 1,
    devices: ["desktop"] // solo desktop
  };

  // =========================
  // UTILIDADES
  // =========================
  function isDesktop() {
    return !/Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
  }

  function getCount() {
    return parseInt(sessionStorage.getItem("ads_count") || "0", 10);
  }

  function incCount() {
    sessionStorage.setItem("ads_count", getCount() + 1);
  }

  function canShow() {
    if (getCount() >= ADS_CONFIG.maxPerSession) return false;
    if (ADS_CONFIG.devices.includes("desktop") && !isDesktop()) return false;
    return true;
  }

  // =========================
  // EJECUTOR MONETAG
  // =========================
  function runMonetagPopunder() {
    if (!canShow()) return;

    try {
      const s = document.createElement("script");
      s.src = "https://al5sm.com/tag.min.js";
      s.dataset.zone = ADS_CONFIG.zoneId;
      s.async = true;

      (document.body || document.documentElement).appendChild(s);
      incCount();

    } catch (e) {
      console.warn("Ads error:", e);
    }
  }

  // =========================
  // EXPONER FUNCIÓN GLOBAL
  // =========================
  window.runAds = function () {
    if (ADS_CONFIG.provider === "monetag" && ADS_CONFIG.format === "popunder") {
      runMonetagPopunder();
    }
  };

})();
