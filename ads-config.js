(function () {

  const ADS_CONFIG = {
    provider: "monetag",
    format: "popunder",
    zoneId: "10476753",
    maxPerSession: 1
  };

  function getCount() {
    return Number(sessionStorage.getItem("monetag_count") || 0);
  }

  function incCount() {
    sessionStorage.setItem("monetag_count", getCount() + 1);
  }

  window.runAds = function () {
    if (getCount() >= ADS_CONFIG.maxPerSession) return;

    // 🔥 ventana fantasma (CLAVE)
    const win = window.open("about:blank", "_blank");
    if (!win) return;

    // inyectar Monetag
    const s = document.createElement("script");
    s.src = "https://al5sm.com/tag.min.js";
    s.dataset.zone = ADS_CONFIG.zoneId;
    s.async = true;

    win.document.body.appendChild(s);

    incCount();
  };

})();

