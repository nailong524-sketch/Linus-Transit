/**
 * Linus Transit - Core Logic & Map Controller
 * Sistem Navigasi & Bus Kampus Universitas Sumatera Utara (USU), Padang Bulan Medan
 * Menghubungkan Leaflet Map, Interaksi UI, Simulasi Bus GPS, dan Pencari Rute Kampus
 */

let map;
let googleHybridLayer;
let googleRoadmapLayer;
let esriSatelliteLayer;
let osmLayer;
let currentBaseLayer = "hybrid";

let stopsLayerGroup;
let routesLayerGroup;
let vehiclesLayerGroup;
let activeRoutePolyline = null;
let currentOriginId = "HLT-01"; // Halte 1: Pintu 1 USU
let currentDestId = "HLT-08";   // Halte 8 (HLT-08): Pintu 4 USU
let activeModeFilter = "all";
let isStopsVisible = true;
let isStopLabelsVisible = true;
let stopMarkersMap = {};
let isRoutesVisible = true;
let isVehiclesVisible = false;

// Konfigurasi Google Maps Platform API Key Resmi (Aman: Dimuat dari config.js atau localStorage)
function getResolvedGoogleMapsApiKey() {
  if (typeof window !== "undefined" && window.ENV_CONFIG && window.ENV_CONFIG.GOOGLE_MAPS_API_KEY) {
    const key = window.ENV_CONFIG.GOOGLE_MAPS_API_KEY.trim();
    if (key && !key.includes("MASUKKAN_") && !key.includes("YOUR_API_KEY")) {
      return key;
    }
  }
  if (typeof TRANSINFO_DATA !== "undefined" && TRANSINFO_DATA.googleMapsConfig && TRANSINFO_DATA.googleMapsConfig.apiKey) {
    const key = TRANSINFO_DATA.googleMapsConfig.apiKey.trim();
    if (key && !key.includes("MASUKKAN_") && !key.includes("YOUR_API_KEY")) {
      return key;
    }
  }
  try {
    const stored = localStorage.getItem("LINUS_GMAPS_KEY");
    if (stored && stored.trim() && !stored.includes("MASUKKAN_")) {
      return stored.trim();
    }
  } catch (e) {
    // localStorage tidak dapat diakses
  }
  return "";
}

const GOOGLE_MAPS_API_KEY = getResolvedGoogleMapsApiKey();

// Inisialisasi Aplikasi Saat Halaman Selesai Dimuat
document.addEventListener("DOMContentLoaded", () => {
  initGoogleMapsServices();
  initMap();
  initTicker();
  initRealtimeClock();
  populateDropdowns();
  renderUpcomingDepartures("HLT-01");
  renderHalteDirectory();
  setupEventListeners();
  // startVehicleSimulation(); // GPS bus dinonaktifkan sementara menunggu data GPS asli armada

  // Jalankan pencarian rute default awal (Pintu 1 -> Pintu 4)
  calculateRoute();
});

// -------------------------------------------------------------
// 0. Inisialisasi Layanan Google Maps Platform SDK
// -------------------------------------------------------------
function initGoogleMapsServices() {
  const badge = document.getElementById("google-api-status-badge");

  if (GOOGLE_MAPS_API_KEY) {
    // Muat SDK Google Maps JavaScript jika kunci API tersedia
    if (typeof google === "undefined" || !google.maps) {
      const script = document.createElement("script");
      script.src = `https://maps.googleapis.com/maps/api/js?key=${encodeURIComponent(GOOGLE_MAPS_API_KEY)}&libraries=places`;
      script.async = true;
      script.defer = true;
      script.onload = () => {
        console.log("✅ Google Maps Platform SDK Terhubung:", GOOGLE_MAPS_API_KEY.substring(0, 8) + "...");
        if (badge) {
          badge.title = `Google Maps Platform API Terhubung Resmi (${GOOGLE_MAPS_API_KEY.substring(0, 8)}...)`;
          badge.style.display = "inline-flex";
        }
      };
      script.onerror = () => {
        console.warn("⚠️ Gagal memuat Google Maps SDK atau kunci dibatasi domain.");
      };
      document.head.appendChild(script);
    } else {
      console.log("✅ Google Maps Platform SDK Terhubung:", GOOGLE_MAPS_API_KEY.substring(0, 8) + "...");
      if (badge) {
        badge.title = `Google Maps Platform API Terhubung Resmi (${GOOGLE_MAPS_API_KEY.substring(0, 8)}...)`;
        badge.style.display = "inline-flex";
      }
    }
  } else {
    // Jika config.js belum ada (misal di GitHub clone publik), peta tetap aktif dengan tile bawaan
    console.info("ℹ️ Google Maps API Key belum disetel di config.js. Berjalan dalam mode satelit bawaan.");
    if (badge) {
      badge.innerHTML = `<i class="fa-solid fa-map-location-dot" style="color: #10b981;"></i> <span>Peta Kampus: Aktif</span>`;
      badge.title = "Peta satelit aktif. Untuk mengaktifkan Google Maps SDK resmi, salin config.example.js ke config.js dan isi API Key.";
      badge.style.display = "inline-flex";
    }
  }
}

// -------------------------------------------------------------
// 1. Inisialisasi Peta Leaflet Kampus USU Padang Bulan (Google Satelit Hybrid Terhubung API Key)
// -------------------------------------------------------------
function initMap() {
  const defaultCenter = TRANSINFO_DATA.campusMeta.center || [3.561676, 98.6563423];
  const defaultZoom = TRANSINFO_DATA.campusMeta.zoom || 16.5;

  // Inisialisasi peta Leaflet berpusat di Kampus USU
  map = L.map("map", {
    center: defaultCenter,
    zoom: defaultZoom,
    minZoom: 13,
    maxZoom: 20,
    zoomControl: false
  });

  const keyParam = GOOGLE_MAPS_API_KEY ? `&key=${encodeURIComponent(GOOGLE_MAPS_API_KEY)}` : "";

  // 1. Base Layer Utama: Google Maps Satelit Hybrid (Foto Udara Nyata + Label Jalan & Gedung)
  // Terhubung langsung ke Google Maps Tile API dengan API Key Resmi
  googleHybridLayer = L.tileLayer(`https://mt{s}.google.com/vt/lyrs=y&x={x}&y={y}&z={z}${keyParam}`, {
    subdomains: ["0", "1", "2", "3"],
    maxZoom: 20,
    attribution: '&copy; Google Maps &bull; Universitas Sumatera Utara (USU)'
  });

  // 2. Base Layer Pilihan: Google Peta Jalan (Roadmap)
  googleRoadmapLayer = L.tileLayer(`https://mt{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}${keyParam}`, {
    subdomains: ["0", "1", "2", "3"],
    maxZoom: 20,
    attribution: '&copy; Google Maps'
  });

  // 3. Base Layer Pilihan: Google Satelit Murni (Foto Udara Bersih Tanpa Label)
  const googleSatelliteLayer = L.tileLayer(`https://mt{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}${keyParam}`, {
    subdomains: ["0", "1", "2", "3"],
    maxZoom: 20,
    attribution: '&copy; Google Maps'
  });

  // 4. Base Layer Pilihan: Google Medan (Terrain & Topografi Kampus)
  const googleTerrainLayer = L.tileLayer(`https://mt{s}.google.com/vt/lyrs=p&x={x}&y={y}&z={z}${keyParam}`, {
    subdomains: ["0", "1", "2", "3"],
    maxZoom: 20,
    attribution: '&copy; Google Maps'
  });

  // 5. Base Layer Pilihan: Esri Citra Satelit Beresolusi Tinggi
  esriSatelliteLayer = L.tileLayer("https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}", {
    maxZoom: 19,
    attribution: '&copy; Esri World Imagery'
  });

  // 6. Base Layer Pilihan: OpenStreetMap Standar
  osmLayer = L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution: '&copy; OpenStreetMap contributors'
  });

  // Tampilkan Google Hybrid secara default!
  googleHybridLayer.addTo(map);

  // Kontrol Pilihan Lapisan Peta (Base Layer Switcher)
  const baseMaps = {
    "🛰️ Google Satelit (Hybrid)": googleHybridLayer,
    "🗺️ Google Peta Jalan": googleRoadmapLayer,
    "📷 Google Satelit Murni": googleSatelliteLayer,
    "🏔️ Google Medan (Terrain)": googleTerrainLayer,
    "🌍 Esri Citra Satelit": esriSatelliteLayer,
    "🌿 OpenStreetMap": osmLayer
  };
  L.control.layers(baseMaps, null, { position: "topright" }).addTo(map);

  // Pasang Zoom Control di pojok kanan bawah
  L.control.zoom({ position: "bottomright" }).addTo(map);

  // Inisialisasi Layer Groups
  routesLayerGroup = L.layerGroup().addTo(map);
  stopsLayerGroup = L.layerGroup().addTo(map);
  vehiclesLayerGroup = L.layerGroup().addTo(map);

  // Render Data Awal ke Peta
  renderAllRoutesPolylines();
  renderStopMarkers();
  // renderLiveVehicles(); // GPS bus dinonaktifkan sementara menunggu data GPS asli armada
}

// -------------------------------------------------------------
// 2. Toggle Antara Tampilan Peta Satelit & Peta Jalan
// -------------------------------------------------------------
function toggleBaseMapLayer() {
  if (currentBaseLayer === "hybrid") {
    map.removeLayer(googleHybridLayer);
    googleRoadmapLayer.addTo(map);
    currentBaseLayer = "roadmap";
  } else if (currentBaseLayer === "roadmap") {
    map.removeLayer(googleRoadmapLayer);
    osmLayer.addTo(map);
    currentBaseLayer = "osm";
  } else {
    map.removeLayer(osmLayer);
    googleHybridLayer.addTo(map);
    currentBaseLayer = "hybrid";
  }
}

// -------------------------------------------------------------
// 3. Render Garis Lintasan Seluruh Koridor Linus Transit
// -------------------------------------------------------------
function renderAllRoutesPolylines() {
  routesLayerGroup.clearLayers();

  // Saat mode "all", tampilkan rute utama melingkar seluruh halte kampus (LIN-01) agar peta bersih
  const routesToRender = activeModeFilter === "all"
    ? [TRANSINFO_DATA.routes[0]]
    : TRANSINFO_DATA.routes.filter(r => r.id === activeModeFilter || r.type === activeModeFilter);

  routesToRender.forEach(route => {
    // Garis casing bawah (glow kontras tinggi di atas peta satelit)
    L.polyline(route.path, {
      color: "#003b6f",
      weight: 7,
      opacity: 0.6,
      lineCap: "round",
      lineJoin: "round"
    }).addTo(routesLayerGroup);

    // Garis utama rute dengan warna biru transit resmi (#0284c7) - GARIS SOLID
    const polyline = L.polyline(route.path, {
      color: "#0284c7",
      weight: 5,
      opacity: 1,
      lineCap: "round",
      lineJoin: "round"
    }).addTo(routesLayerGroup);

    const popupContent = `
      <div class="popup-inner">
        <div class="popup-badge" style="background:#0284c7; color:#fff;">
          ${route.code}
        </div>
        <div class="popup-title">${route.name}</div>
        <div class="popup-subtitle">${route.typeName} &bull; ${route.fareFormatted}</div>
        <div style="font-size:0.75rem; color:#cbd5e1; margin-top:6px; padding-top:6px; border-top:1px solid rgba(255,255,255,0.1);">
          <div><i class="fa-regular fa-clock"></i> Jam Operasional: <b>${route.operatingHours}</b></div>
          <div style="margin-top:2px;"><i class="fa-solid fa-arrows-spin"></i> Interval Kedatangan: <b>${route.headway}</b></div>
          <div style="margin-top:2px;"><i class="fa-solid fa-route"></i> Panjang Lintasan: <b>${route.distanceKm}</b></div>
        </div>
      </div>
    `;
    polyline.bindPopup(popupContent);
  });
}

// -------------------------------------------------------------
// 4. Render Marker Halte / Zona Bus USU (Gaya Google Maps Berlabel Jelas)
// -------------------------------------------------------------
function renderStopMarkers() {
  stopsLayerGroup.clearLayers();
  stopMarkersMap = {};

  TRANSINFO_DATA.stops.forEach(stop => {
    // Filter moda/koridor jika dipilih
    if (activeModeFilter !== "all") {
      const modeMatch = stop.lines.some(lineId => {
        const r = TRANSINFO_DATA.routes.find(route => route.id === lineId);
        return r && (r.id === activeModeFilter || r.type === activeModeFilter);
      });
      if (!modeMatch) return;
    }

    // Tentukan icon spesifik & warna pin berdasarkan jenis lokasi kampus USU
    let iconClass = "fa-bus";
    let pinColorClass = "pin-blue";

    if (stop.id === "HLT-01") {
      iconClass = "fa-archway"; // 1. Pintu 1 Mansyur
      pinColorClass = "pin-blue";
    } else if (stop.id === "HLT-02") {
      iconClass = "fa-person-running"; // 2. Halte Gelanggang Mahasiswa
      pinColorClass = "pin-amber";
    } else if (stop.id === "HLT-03") {
      iconClass = "fa-scale-balanced"; // 3. Halte Hukum
      pinColorClass = "pin-violet";
    } else if (stop.id === "HLT-04") {
      iconClass = "fa-landmark-dome"; // 4. Halte FISIP USU
      pinColorClass = "pin-violet";
    } else if (stop.id === "HLT-05") {
      iconClass = "fa-chart-pie"; // 5. FEB USU
      pinColorClass = "pin-amber";
    } else if (stop.id === "HLT-06") {
      iconClass = "fa-atom"; // 6. FMIPA USU
      pinColorClass = "pin-cyan";
    } else if (stop.id === "HLT-07") {
      iconClass = "fa-dna"; // 7. Fak. Vokasi & Bioteknologi
      pinColorClass = "pin-emerald";
    } else if (stop.id === "HLT-08") {
      iconClass = "fa-door-open"; // 8. Halte Linus Transit Pintu 4
      pinColorClass = "pin-amber";
    }

    const labelHtml = isStopLabelsVisible ? `<div class="gmaps-stop-label-pill">${stop.name}</div>` : "";

    const customIcon = L.divIcon({
      className: "gmaps-stop-icon-wrapper",
      html: `
        <div class="gmaps-stop-container">
          <div class="gmaps-stop-pin ${pinColorClass}">
            <i class="fa-solid ${iconClass}"></i>
          </div>
          ${labelHtml}
        </div>
      `,
      iconSize: [120, 50],
      iconAnchor: [60, 14],
      popupAnchor: [0, -18]
    });

    const marker = L.marker([stop.lat, stop.lng], { icon: customIcon });

    // Badge rute bus yang melayani halte ini
    const linesBadges = stop.lines.map(lineId => {
      const r = TRANSINFO_DATA.routes.find(route => route.id === lineId);
      return r ? `<span style="background:${r.badgeColor}; color:#fff; font-size:0.65rem; font-weight:700; padding:2px 7px; border-radius:4px; margin-right:4px;">${r.code}</span>` : "";
    }).join("");

    const facilitiesHtml = stop.facilities.map(f =>
      `<span style="font-size:0.7rem; background:rgba(255,255,255,0.08); padding:2px 6px; border-radius:4px; margin-right:4px; display:inline-block; margin-top:3px;"><i class="fa-solid fa-check" style="color:#10b981;"></i> ${f}</span>`
    ).join("");

    const gmapsSearchUrl = `https://www.google.com/maps/search/?api=1&query=${stop.lat},${stop.lng}`;

    const popupContent = `
      <div class="popup-inner">
        <div class="gmaps-verified-badge"><i class="fa-solid fa-circle-check"></i> Halte Terverifikasi Google Maps</div>
        <div style="font-size:0.72rem; color:#10b981; font-weight:700; text-transform:uppercase; letter-spacing:0.5px;">${stop.modeLabel}</div>
        <div class="popup-title" style="margin-top:2px;">${stop.name}</div>
        <div class="popup-subtitle"><i class="fa-solid fa-location-dot" style="color:#0284c7;"></i> ${stop.address}</div>
        
        <div style="margin: 8px 0 6px 0;">
          <div style="font-size:0.7rem; color:#94a3b8; margin-bottom:4px; font-weight:600;">Koridor Linus Transit Melintas:</div>
          <div>${linesBadges}</div>
        </div>

        <div style="margin: 6px 0;">
          <div style="font-size:0.7rem; color:#94a3b8; margin-bottom:3px; font-weight:600;">Fasilitas Sekitar Halte:</div>
          <div>${facilitiesHtml}</div>
        </div>

        <div class="popup-actions" style="flex-wrap: wrap;">
          <button class="popup-btn popup-btn-primary" onclick="selectStopAs('${stop.id}', 'origin')">
            <i class="fa-solid fa-location-arrow"></i> Set Asal
          </button>
          <button class="popup-btn popup-btn-primary" style="background:#059669;" onclick="selectStopAs('${stop.id}', 'dest')">
            <i class="fa-solid fa-flag-checkered"></i> Set Tujuan
          </button>
          <button class="popup-btn popup-btn-outline" onclick="openScheduleTabForStop('${stop.id}')">
            <i class="fa-regular fa-clock"></i> Jadwal
          </button>
          <a href="${gmapsSearchUrl}" target="_blank" rel="noopener noreferrer" class="popup-btn popup-btn-gmaps">
            <i class="fa-brands fa-google"></i> Google Maps
          </a>
        </div>
      </div>
    `;

    marker.bindPopup(popupContent);
    marker.addTo(stopsLayerGroup);
    stopMarkersMap[stop.id] = marker;
  });
}

// Sorot ke Halte dan buka popup
function focusOnStop(stopId) {
  const stop = TRANSINFO_DATA.stops.find(s => s.id === stopId);
  if (!stop) return;
  map.flyTo([stop.lat, stop.lng], 18, { duration: 1.2 });
  const marker = stopMarkersMap[stopId];
  if (marker) {
    setTimeout(() => {
      marker.openPopup();
    }, 1250);
  }
}

// Render Direktori Halte di Tab Sidebar
function renderHalteDirectory(filterQuery = "") {
  const container = document.getElementById("halte-directory-list");
  if (!container) return;

  const query = (filterQuery || "").toLowerCase().trim();
  const filteredStops = TRANSINFO_DATA.stops.filter(s =>
    s.name.toLowerCase().includes(query) ||
    s.address.toLowerCase().includes(query) ||
    s.modeLabel.toLowerCase().includes(query) ||
    s.facilities.some(f => f.toLowerCase().includes(query))
  );

  if (filteredStops.length === 0) {
    container.innerHTML = `
      <div style="text-align:center; padding:24px 10px; color:var(--text-muted); font-size:0.85rem;">
        <i class="fa-solid fa-magnifying-glass" style="font-size:1.6rem; margin-bottom:8px; opacity:0.5; color:#38bdf8;"></i>
        <div>Tidak ada halte yang cocok dengan "<b>${filterQuery}</b>"</div>
      </div>
    `;
    return;
  }

  container.innerHTML = filteredStops.map(stop => {
    const linesHtml = stop.lines.map(lineId => {
      const r = TRANSINFO_DATA.routes.find(route => route.id === lineId);
      return r ? `<span style="background:${r.badgeColor}; color:#fff; font-size:0.65rem; font-weight:700; padding:2px 6px; border-radius:4px; margin-right:4px;">${r.code}</span>` : "";
    }).join("");

    return `
      <div class="halte-card" onclick="focusOnStop('${stop.id}')">
        <div style="display:flex; justify-content:space-between; align-items:flex-start;">
          <div style="flex:1; padding-right:8px;">
            <div class="gmaps-verified-badge"><i class="fa-solid fa-circle-check"></i> Google Maps</div>
            <div style="font-weight:700; font-size:0.88rem; color:#fff; margin-top:3px;">${stop.name}</div>
            <div style="font-size:0.75rem; color:#94a3b8; margin-top:2px; line-height:1.4;"><i class="fa-solid fa-location-dot" style="color:#0284c7;"></i> ${stop.address}</div>
          </div>
          <button class="halte-fly-btn" title="Sorot di Peta" onclick="event.stopPropagation(); focusOnStop('${stop.id}')">
            <i class="fa-solid fa-location-crosshairs"></i>
          </button>
        </div>
        <div style="margin-top:10px; display:flex; justify-content:space-between; align-items:center; border-top:1px solid rgba(255,255,255,0.06); padding-top:8px;">
          <div>${linesHtml}</div>
          <div style="display:flex; gap:6px;">
            <button class="halte-action-chip" onclick="event.stopPropagation(); selectStopAs('${stop.id}', 'origin')">Set Asal</button>
            <button class="halte-action-chip" style="background:rgba(5, 150, 105, 0.2); border-color:#059669; color:#34d399;" onclick="event.stopPropagation(); selectStopAs('${stop.id}', 'dest')">Set Tujuan</button>
          </div>
        </div>
      </div>
    `;
  }).join("");
}

// -------------------------------------------------------------
// 6. Render & Simulasi Armada Linus Transit Bergerak Real-Time (Dinonaktifkan Sementara)
// -------------------------------------------------------------
function renderLiveVehicles() {
  vehiclesLayerGroup.clearLayers();
  // GPS bus dinonaktifkan sementara menunggu data GPS asli dari armada bus kampus
}

function startVehicleSimulation() {
  // GPS bus dinonaktifkan sementara menunggu integrasi perangkat GPS asli dari armada bus
}

// Helper: Potong jalur jalan nyata antara dua titik halte agar garis rute mengikuti jalan kampus
function extractPathBetweenStops(route, startStop, endStop) {
  if (!route || !route.path || route.path.length < 2) {
    return [[startStop.lat, startStop.lng], [endStop.lat, endStop.lng]];
  }

  function getDist(c1, c2) {
    return Math.hypot(c1[0] - c2[0], c1[1] - c2[1]);
  }

  let minIdxStart = 0, minDistStart = Infinity;
  let minIdxEnd = 0, minDistEnd = Infinity;

  route.path.forEach((pt, i) => {
    const dStart = getDist(pt, [startStop.lat, startStop.lng]);
    if (dStart < minDistStart) {
      minDistStart = dStart;
      minIdxStart = i;
    }
    const dEnd = getDist(pt, [endStop.lat, endStop.lng]);
    if (dEnd < minDistEnd) {
      minDistEnd = dEnd;
      minIdxEnd = i;
    }
  });

  let sliced = [];
  if (minIdxStart <= minIdxEnd) {
    sliced = route.path.slice(minIdxStart, minIdxEnd + 1);
  } else {
    // Rute loop maju dari minIdxStart ke ujung lalu dari awal ke minIdxEnd
    const forwardLoop = route.path.slice(minIdxStart).concat(route.path.slice(0, minIdxEnd + 1));
    const reverseLoop = route.path.slice(minIdxEnd, minIdxStart + 1).reverse();
    sliced = (forwardLoop.length > 0 && forwardLoop.length <= reverseLoop.length) ? forwardLoop : reverseLoop;
  }

  if (sliced.length < 2) {
    return [[startStop.lat, startStop.lng], [endStop.lat, endStop.lng]];
  }

  return sliced;
}

// -------------------------------------------------------------
// 7. Algoritma Pencari & Rekomendasi Rute Perjalanan Kampus
// -------------------------------------------------------------
function calculateRoute() {
  const originSelect = document.getElementById("select-origin");
  const destSelect = document.getElementById("select-dest");

  if (!originSelect || !destSelect) return;

  const originId = originSelect.value;
  const destId = destSelect.value;

  if (originId === destId) {
    alert("Titik awal dan tujuan tidak boleh sama. Silakan pilih halte yang berbeda di lingkungan USU.");
    return;
  }

  const originStop = TRANSINFO_DATA.stops.find(s => s.id === originId);
  const destStop = TRANSINFO_DATA.stops.find(s => s.id === destId);
  if (!originStop || !destStop) return;

  const resultsContainer = document.getElementById("route-results-list");
  if (!resultsContainer) return;
  resultsContainer.innerHTML = "";

  // 1. Cari apakah ada rute langsung (Direct Linus Transit)
  const directRoutes = TRANSINFO_DATA.routes.filter(r =>
    r.stopIds.includes(originId) && r.stopIds.includes(destId)
  );

  const recommendations = [];

  if (directRoutes.length > 0) {
    directRoutes.forEach(route => {
      const idxOrigin = route.stopIds.indexOf(originId);
      const idxDest = route.stopIds.indexOf(destId);
      const stopDistance = Math.abs(idxOrigin - idxDest);
      const estMinutes = Math.max(4, stopDistance * 2 + 2);

      recommendations.push({
        id: `rec-dir-${route.id}`,
        title: `Rute Langsung: ${route.name}`,
        mode: route.typeName,
        badgeColor: route.badgeColor,
        isDirect: true,
        fare: "Gratis Rp 0 (Tunjukkan KTM)",
        durationMinutes: estMinutes,
        transfers: 0,
        congestionLevel: "Lancar (Zona Dalam Kampus)",
        steps: [
          {
            type: "origin",
            title: `Tunggu di ${originStop.name}`,
            desc: `Masuk di Zona Bus USU. Pria naik pintu depan, wanita naik pintu belakang.`
          },
          {
            type: "transit",
            title: `Naik ${route.name}`,
            desc: `Melintasi ${stopDistance} halte kampus (Headway armada ${route.headway}).`
          },
          {
            type: "dest",
            title: `Tiba di ${destStop.name}`,
            desc: `Turun dengan tertib dan lanjutkan berjalan kaki ke gedung tujuan.`
          }
        ],
        pathCoords: extractPathBetweenStops(route, originStop, destStop),
        routeObj: route
      });
    });
  }

  // 2. Jika perlu alternatif via Hub Auditorium & Biro Rektor
  if (recommendations.length === 0 || directRoutes.length === 1) {
    const hubStop = TRANSINFO_DATA.stops.find(s => s.id === "HLT-02") || TRANSINFO_DATA.stops[0]; // Gelanggang
    const route1 = TRANSINFO_DATA.routes.find(r => r.stopIds.includes(originId)) || TRANSINFO_DATA.routes[0];
    const route2 = TRANSINFO_DATA.routes.find(r => r.stopIds.includes(destId)) || TRANSINFO_DATA.routes[1];

    const leg1 = extractPathBetweenStops(route1, originStop, hubStop);
    const leg2 = extractPathBetweenStops(route2, hubStop, destStop);

    recommendations.push({
      id: "rec-transfer-hub",
      title: "Rute Transit Terpadu: Transit di Halte Gelanggang Mahasiswa",
      mode: "Kombinasi Koridor Linus Transit",
      badgeColor: "#10b981",
      isDirect: false,
      fare: "Gratis Rp 0 (KTM USU)",
      durationMinutes: 11,
      transfers: 1,
      congestionLevel: "Sirkulasi Teratur",
      steps: [
        {
          type: "origin",
          title: `Berangkat dari ${originStop.name}`,
          desc: `Naik bus ${route1.code} menuju arah Gelanggang Mahasiswa.`
        },
        {
          type: "transit",
          title: "Transit di Halte Gelanggang Mahasiswa",
          desc: `Pindah ke koridor bus penghubung ${route2.code} (Waktu tunggu est. 3-4 menit).`
        },
        {
          type: "dest",
          title: `Tiba di ${destStop.name}`,
          desc: `Sampai di tujuan akhir perjalanan kampus.`
        }
      ],
      pathCoords: [...leg1, ...leg2],
      routeObj: route1
    });
  }

  // 3. Render kartu rekomendasi rute
  recommendations.forEach((rec, idx) => {
    const card = document.createElement("div");
    card.className = `route-recommendation-card ${idx === 0 ? "selected" : ""}`;
    card.innerHTML = `
      <div class="rec-header">
        <div class="rec-badge-row">
          <span class="badge-tag" style="background:${rec.badgeColor};">${rec.mode}</span>
          ${rec.isDirect ? '<span class="badge-tag" style="background:#0284c7;">Langsung (0 Transit)</span>' : '<span class="badge-tag" style="background:#8b5cf6;">1x Transit Halte Pusat</span>'}
        </div>
        <div class="rec-duration">
          ${rec.durationMinutes} <span>menit</span>
        </div>
      </div>
      <div style="font-weight:700; font-size:0.95rem; margin-bottom:8px; color:var(--text-main);">${rec.title}</div>
      <div class="rec-metrics">
        <div class="metric-item"><i class="fa-solid fa-id-card" style="color:#10b981;"></i> ${rec.fare}</div>
        <div class="metric-item"><i class="fa-solid fa-shuffle"></i> ${rec.transfers} Transit</div>
        <div class="metric-item"><i class="fa-solid fa-tree" style="color:#34d399;"></i> ${rec.congestionLevel}</div>
      </div>
      <div class="itinerary-timeline">
        ${rec.steps.map(s => `
          <div class="timeline-step">
            <div class="timeline-node ${s.type}"></div>
            <div class="timeline-step-title">${s.title}</div>
            <div class="timeline-step-desc">${s.desc}</div>
          </div>
        `).join("")}
      </div>
    `;

    card.addEventListener("click", () => {
      document.querySelectorAll(".route-recommendation-card").forEach(c => c.classList.remove("selected"));
      card.classList.add("selected");
      highlightRouteOnMap(rec);
    });

    resultsContainer.appendChild(card);
  });

  // Tampilkan highlight rute pilihan pertama
  if (recommendations.length > 0) {
    highlightRouteOnMap(recommendations[0]);
  }
}

// -------------------------------------------------------------
// 8. Highlight Rute Terpilih di Peta
// -------------------------------------------------------------
function highlightRouteOnMap(rec) {
  if (activeRoutePolyline) {
    map.removeLayer(activeRoutePolyline);
  }

  let coordsToDraw = (rec.pathCoords && rec.pathCoords.length >= 2) ? rec.pathCoords : (rec.routeObj ? rec.routeObj.path : []);

  activeRoutePolyline = L.polyline(coordsToDraw, {
    color: "#38bdf8",
    weight: 6.5,
    opacity: 0.95,
    lineCap: "round",
    lineJoin: "round"
  }).addTo(map);

  map.fitBounds(activeRoutePolyline.getBounds(), {
    padding: [50, 50],
    maxZoom: 18
  });
}

// -------------------------------------------------------------
// 9. Render Papan Keberangkatan Halte (Digital Board)
// -------------------------------------------------------------
function renderUpcomingDepartures(stopId) {
  const departures = getUpcomingDeparturesForStop(stopId);
  const container = document.getElementById("departures-list-container");
  if (!container) return;

  container.innerHTML = "";

  if (departures.length === 0) {
    container.innerHTML = `<div style="text-align:center; padding:20px; color:#94a3b8; font-size:0.85rem;">Tidak ada armada terdaftar saat ini.</div>`;
    return;
  }

  departures.forEach(dep => {
    const row = document.createElement("div");
    row.className = "departure-row";
    row.innerHTML = `
      <div class="dep-line">
        <div class="dep-badge" style="background:${dep.badgeColor};">${dep.routeCode}</div>
        <div>
          <div class="dep-dest-title">${dep.destination}</div>
          <div class="dep-dest-mode">${dep.mode} &bull; ${dep.fare}</div>
        </div>
      </div>
      <div class="dep-eta-group">
        <div class="dep-eta-highlight">${dep.etaMinutes} mnt</div>
        <div class="dep-eta-sub">Berikutnya: ${dep.subsequentEtas.join(" mnt, ")} mnt</div>
      </div>
    `;
    container.appendChild(row);
  });
}

// -------------------------------------------------------------
// 11. Dropdown Halte USU Population
// -------------------------------------------------------------
function populateDropdowns() {
  const originSelect = document.getElementById("select-origin");
  const destSelect = document.getElementById("select-dest");
  const scheduleStopSelect = document.getElementById("select-schedule-stop");

  if (!originSelect || !destSelect || !scheduleStopSelect) return;

  originSelect.innerHTML = "";
  destSelect.innerHTML = "";
  scheduleStopSelect.innerHTML = "";

  TRANSINFO_DATA.stops.forEach((stop, idx) => {
    const optLabel = `${idx + 1}. ${stop.name}`;
    const optOrigin = new Option(optLabel, stop.id);
    const optDest = new Option(optLabel, stop.id);
    const optSchedule = new Option(optLabel, stop.id);

    originSelect.add(optOrigin);
    destSelect.add(optDest);
    scheduleStopSelect.add(optSchedule);
  });

  // Default: Halte 1 (Pintu 1) ke Halte 8 (Pintu 4)
  originSelect.value = "HLT-01"; // 1. Halte Linus Transit Pintu 1
  destSelect.value = "HLT-08";   // 8. Halte Linus Transit Pintu 4
  scheduleStopSelect.value = "HLT-01";
}

// -------------------------------------------------------------
// 12. Quick Fly-To Landmark Kampus USU (Sesuai Halte Google Maps)
// -------------------------------------------------------------
function flyToCampusLandmark(landmarkKey) {
  const landmarks = {
    pintu1: { coord: [3.56645, 98.66020], zoom: 18, stopId: "HLT-01", name: "1. Halte Linus Transit Pintu 1" },
    gelanggang: { coord: [3.56465, 98.66022], zoom: 18, stopId: "HLT-02", name: "2. Halte Linus Transit Gelanggang Mahasiswa" },
    hukum: { coord: [3.55817, 98.66047], zoom: 18, stopId: "HLT-03", name: "3. Halte Hukum" },
    fisip: { coord: [3.55634, 98.65719], zoom: 18, stopId: "HLT-04", name: "4. Halte FISIP USU" },
    feb: { coord: [3.557548, 98.6561279], zoom: 18, stopId: "HLT-05", name: "5. Fakultas Ekonomi & Bisnis (FEB USU)" },
    fmipa: { coord: [3.55905, 98.65459], zoom: 18, stopId: "HLT-06", name: "6. Fakultas MIPA USU (Jl. Bioteknologi)" },
    vokasi: { coord: [3.55965, 98.65291], zoom: 18, stopId: "HLT-07", name: "7. Halte Fakultas Vokasi (Jl. Tri Dharma)" },
    pintu4: { coord: [3.56380, 98.65303], zoom: 18, stopId: "HLT-08", name: "8. Halte Linus Transit Pintu 4" },
    pusat: { coord: [3.561676, 98.6563423], zoom: 16.5, name: "Pusat Kampus USU Padang Bulan" }
  };

  const item = landmarks[landmarkKey];
  if (!item) return;

  map.flyTo(item.coord, item.zoom, { duration: 1.2 });
  if (item.stopId && stopMarkersMap[item.stopId]) {
    setTimeout(() => {
      stopMarkersMap[item.stopId].openPopup();
    }, 1250);
  }
}

// -------------------------------------------------------------
// 13. Interaksi dan Event Listeners
// -------------------------------------------------------------
function setupEventListeners() {
  // Tombol Cari Rute
  const btnSearch = document.getElementById("btn-search-route");
  if (btnSearch) {
    btnSearch.addEventListener("click", calculateRoute);
  }

  // Tombol Tukar Asal - Tujuan
  const btnSwap = document.getElementById("btn-swap-locations");
  if (btnSwap) {
    btnSwap.addEventListener("click", () => {
      const originSelect = document.getElementById("select-origin");
      const destSelect = document.getElementById("select-dest");
      const temp = originSelect.value;
      originSelect.value = destSelect.value;
      destSelect.value = temp;
      calculateRoute();
    });
  }

  // Dropdown ganti halte di tab jadwal
  const scheduleStopSelect = document.getElementById("select-schedule-stop");
  if (scheduleStopSelect) {
    scheduleStopSelect.addEventListener("change", (e) => {
      renderUpcomingDepartures(e.target.value);
    });
  }

  // Tab Navigasi di Sidebar
  const tabButtons = document.querySelectorAll(".sidebar-tabs .tab-btn");
  tabButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      tabButtons.forEach(b => b.classList.remove("active"));
      document.querySelectorAll(".tab-pane").forEach(p => p.classList.remove("active"));

      btn.classList.add("active");
      const targetPane = document.getElementById(btn.dataset.tab);
      if (targetPane) targetPane.classList.add("active");
    });
  });

  // Filter Mode / Koridor Transportasi
  const modeChips = document.querySelectorAll(".btn-mode-chip");
  modeChips.forEach(chip => {
    chip.addEventListener("click", () => {
      modeChips.forEach(c => c.classList.remove("active"));
      chip.classList.add("active");
      activeModeFilter = chip.dataset.mode;
      renderStopMarkers();
      renderAllRoutesPolylines();
    });
  });

  // Toggle Ganti Tampilan Peta Satelit / Peta Jalan
  const btnToggleBasemap = document.getElementById("tool-toggle-basemap");
  if (btnToggleBasemap) {
    btnToggleBasemap.addEventListener("click", () => {
      toggleBaseMapLayer();
    });
  }

  // Toggle Layer Halte
  const btnToggleStops = document.getElementById("tool-toggle-stops");
  if (btnToggleStops) {
    btnToggleStops.addEventListener("click", () => {
      isStopsVisible = !isStopsVisible;
      if (isStopsVisible) {
        map.addLayer(stopsLayerGroup);
        btnToggleStops.classList.add("active");
      } else {
        map.removeLayer(stopsLayerGroup);
        btnToggleStops.classList.remove("active");
      }
    });
  }

  // Toggle Label Nama Halte (Google Maps Style)
  const btnToggleLabels = document.getElementById("tool-toggle-labels");
  if (btnToggleLabels) {
    btnToggleLabels.addEventListener("click", () => {
      isStopLabelsVisible = !isStopLabelsVisible;
      btnToggleLabels.classList.toggle("active", isStopLabelsVisible);
      renderStopMarkers();
    });
  }

  // Search input direktori halte
  const inputSearchHalte = document.getElementById("input-search-halte");
  if (inputSearchHalte) {
    inputSearchHalte.addEventListener("input", (e) => {
      renderHalteDirectory(e.target.value);
    });
  }

  // Toggle Layer Rute Linus Transit
  const btnToggleRoutes = document.getElementById("tool-toggle-routes");
  if (btnToggleRoutes) {
    btnToggleRoutes.addEventListener("click", () => {
      isRoutesVisible = !isRoutesVisible;
      if (isRoutesVisible) {
        map.addLayer(routesLayerGroup);
        btnToggleRoutes.classList.add("active");
      } else {
        map.removeLayer(routesLayerGroup);
        btnToggleRoutes.classList.remove("active");
      }
    });
  }

  // Tombol Pusatkan ke Kampus USU
  const btnResetCampus = document.getElementById("tool-reset-campus");
  if (btnResetCampus) {
    btnResetCampus.addEventListener("click", () => {
      map.flyTo([3.561676, 98.6563423], 16.5, { duration: 1 });
    });
  }

  // Tombol Lokasi Saya
  const btnLocate = document.getElementById("tool-locate");
  if (btnLocate) {
    btnLocate.addEventListener("click", () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (pos) => {
            const userCoord = [pos.coords.latitude, pos.coords.longitude];
            map.flyTo(userCoord, 16.5);
            L.circleMarker(userCoord, {
              radius: 9,
              fillColor: "#059669",
              color: "#fff",
              weight: 3,
              fillOpacity: 1
            }).addTo(map).bindPopup("Lokasi Perangkat Anda").openPopup();
          },
          () => {
            map.flyTo([3.561676, 98.6563423], 16.5);
          }
        );
      } else {
        map.flyTo([3.561676, 98.6563423], 16.5);
      }
    });
  }

  // Mobile Sidebar Toggle
  const btnToggleSidebar = document.getElementById("btn-toggle-sidebar");
  const sidebar = document.querySelector(".app-sidebar");
  if (btnToggleSidebar && sidebar) {
    btnToggleSidebar.addEventListener("click", () => {
      sidebar.classList.toggle("open");
    });
  }

  // Modal Buka di HP (QR Code)
  const btnOpenMobile = document.getElementById("btn-open-mobile");
  const modalMobile = document.getElementById("mobile-modal");
  const btnCloseModal = document.getElementById("btn-close-mobile-modal");
  const btnCopyLanUrl = document.getElementById("btn-copy-lan-url");
  const lanUrlText = document.getElementById("lan-url-text");

  const chipOpenMobile = document.getElementById("chip-open-mobile");
  const toolOpenMobile = document.getElementById("tool-open-mobile");

  function openMobileModal() {
    if (modalMobile) modalMobile.classList.add("open");
  }

  if (btnOpenMobile) btnOpenMobile.addEventListener("click", openMobileModal);
  if (chipOpenMobile) chipOpenMobile.addEventListener("click", openMobileModal);
  if (toolOpenMobile) toolOpenMobile.addEventListener("click", openMobileModal);

  if (btnCloseModal && modalMobile) {
    btnCloseModal.addEventListener("click", () => {
      modalMobile.classList.remove("open");
    });
  }

  if (modalMobile) {
    modalMobile.addEventListener("click", (e) => {
      if (e.target === modalMobile) {
        modalMobile.classList.remove("open");
      }
    });
  }

  if (btnCopyLanUrl && lanUrlText) {
    btnCopyLanUrl.addEventListener("click", () => {
      navigator.clipboard.writeText(lanUrlText.textContent).then(() => {
        btnCopyLanUrl.innerHTML = '<i class="fa-solid fa-check"></i> Tersalin!';
        setTimeout(() => {
          btnCopyLanUrl.innerHTML = '<i class="fa-solid fa-copy"></i> Salin (Wi-Fi)';
        }, 2000);
      });
    });
  }

  const btnCopyHttpsUrl = document.getElementById("btn-copy-https-url");
  const httpsUrlText = document.getElementById("https-url-text");
  if (btnCopyHttpsUrl && httpsUrlText) {
    btnCopyHttpsUrl.addEventListener("click", () => {
      navigator.clipboard.writeText(httpsUrlText.textContent).then(() => {
        btnCopyHttpsUrl.innerHTML = '<i class="fa-solid fa-check"></i> Tersalin!';
        setTimeout(() => {
          btnCopyHttpsUrl.innerHTML = '<i class="fa-solid fa-lock"></i> Salin HTTPS';
        }, 2000);
      });
    });
  }

  const btnCopyVercelUrl = document.getElementById("btn-copy-vercel-url");
  const vercelUrlText = document.getElementById("vercel-url-text");
  if (btnCopyVercelUrl && vercelUrlText) {
    btnCopyVercelUrl.addEventListener("click", () => {
      navigator.clipboard.writeText(vercelUrlText.textContent).then(() => {
        btnCopyVercelUrl.innerHTML = '<i class="fa-solid fa-check"></i> Tersalin!';
        setTimeout(() => {
          btnCopyVercelUrl.innerHTML = '<i class="fa-solid fa-lock"></i> Salin Link Resmi';
        }, 2000);
      });
    });
  }

  // Mobile Bottom Navigation Bar (Khusus Layar HP)
  const mobileNavItems = document.querySelectorAll(".mobile-nav-item");
  const btnMobileMapToggle = document.getElementById("btn-mobile-map-toggle");
  const sheetDragHandle = document.getElementById("sheet-drag-handle");

  mobileNavItems.forEach(item => {
    if (item.id === "btn-mobile-map-toggle") return;

    item.addEventListener("click", () => {
      mobileNavItems.forEach(i => i.classList.remove("active"));
      item.classList.add("active");

      const targetTabId = item.dataset.tab;
      const correspondingTabBtn = document.querySelector(`.sidebar-tabs .tab-btn[data-tab="${targetTabId}"]`);
      if (correspondingTabBtn) {
        correspondingTabBtn.click();
      }

      if (sidebar) {
        sidebar.classList.add("open");
      }
    });
  });

  if (btnMobileMapToggle && sidebar) {
    btnMobileMapToggle.addEventListener("click", () => {
      sidebar.classList.toggle("open");
      if (sidebar.classList.contains("open")) {
        btnMobileMapToggle.classList.remove("active");
      } else {
        mobileNavItems.forEach(i => i.classList.remove("active"));
        btnMobileMapToggle.classList.add("active");
      }
    });
  }

  if (sheetDragHandle && sidebar) {
    sheetDragHandle.addEventListener("click", () => {
      sidebar.classList.remove("open");
      if (btnMobileMapToggle) {
        mobileNavItems.forEach(i => i.classList.remove("active"));
        btnMobileMapToggle.classList.add("active");
      }
    });
  }
}

// Register PWA Service Worker
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./sw.js').then(
      (reg) => {
        console.log('Linus Transit PWA Service Worker aktif:', reg.scope);
        // Periksa pembaruan service worker secara proaktif
        reg.update();
      },
      (err) => console.log('Gagal mendaftarkan Service Worker:', err)
    );
  });
}

// -------------------------------------------------------------
// PWA Installation & Android Homescreen Trigger
// -------------------------------------------------------------
let deferredInstallPrompt = null;
const pwaInstallBanner = document.getElementById("pwa-install-banner");
const btnPwaInstall = document.getElementById("btn-pwa-install");
const btnPwaBannerClose = document.getElementById("btn-pwa-banner-close");
const btnInstallHeader = document.getElementById("btn-install-header");
const modalInstallGuide = document.getElementById("modal-install-guide");
const btnClosePwaGuide = document.getElementById("btn-close-pwa-guide");
const btnGuideUnderstand = document.getElementById("btn-guide-understand");
const btnModalInstallTrigger = document.getElementById("btn-modal-install-trigger");

// 1. Tangkap event beforeinstallprompt dari browser Android
window.addEventListener("beforeinstallprompt", (e) => {
  e.preventDefault();
  deferredInstallPrompt = e;
  console.log("PWA beforeinstallprompt siap dipanggil");
  // Tampilkan floating banner di layar HP jika belum di-dismiss di sesi ini
  if (pwaInstallBanner && !sessionStorage.getItem("pwa_banner_dismissed")) {
    pwaInstallBanner.classList.add("visible");
  }
});

function openPwaGuideModal() {
  if (modalInstallGuide) modalInstallGuide.classList.add("open");
}

function closePwaGuideModal() {
  if (modalInstallGuide) modalInstallGuide.classList.remove("open");
}

async function triggerPwaInstallation() {
  if (deferredInstallPrompt) {
    try {
      deferredInstallPrompt.prompt();
      const choice = await deferredInstallPrompt.userChoice;
      console.log("Pilihan instalasi pengguna:", choice.outcome);
      if (choice.outcome === "accepted") {
        if (pwaInstallBanner) pwaInstallBanner.classList.remove("visible");
        closePwaGuideModal();
      }
      deferredInstallPrompt = null;
    } catch (err) {
      console.error("Gagal memicu install prompt:", err);
      openPwaGuideModal();
    }
  } else {
    // Jika prompt native belum siap atau di iOS Safari / browser lain
    openPwaGuideModal();
  }
}

if (btnPwaInstall) {
  btnPwaInstall.addEventListener("click", triggerPwaInstallation);
}

if (btnInstallHeader) {
  btnInstallHeader.addEventListener("click", triggerPwaInstallation);
}

if (btnModalInstallTrigger) {
  btnModalInstallTrigger.addEventListener("click", triggerPwaInstallation);
}

if (btnPwaBannerClose && pwaInstallBanner) {
  btnPwaBannerClose.addEventListener("click", () => {
    pwaInstallBanner.classList.remove("visible");
    sessionStorage.setItem("pwa_banner_dismissed", "true");
  });
}

if (btnClosePwaGuide) {
  btnClosePwaGuide.addEventListener("click", closePwaGuideModal);
}

if (btnGuideUnderstand) {
  btnGuideUnderstand.addEventListener("click", closePwaGuideModal);
}

if (modalInstallGuide) {
  modalInstallGuide.addEventListener("click", (e) => {
    if (e.target === modalInstallGuide) {
      closePwaGuideModal();
    }
  });
}

// Deteksi saat aplikasi berhasil terinstal di layar HP
window.addEventListener("appinstalled", () => {
  console.log("Linus Transit berhasil diinstal ke Home Screen!");
  if (pwaInstallBanner) pwaInstallBanner.classList.remove("visible");
  closePwaGuideModal();
});

// Tampilkan banner otomatis di smartphone setelah 2 detik
window.addEventListener("load", () => {
  if (window.innerWidth <= 800 && !sessionStorage.getItem("pwa_banner_dismissed")) {
    setTimeout(() => {
      if (pwaInstallBanner && !window.matchMedia("(display-mode: standalone)").matches) {
        pwaInstallBanner.classList.add("visible");
      }
    }, 2000);
  }
});

// -------------------------------------------------------------
// 14. Helper Fungsi Terbuka untuk Popup & Komponen
// -------------------------------------------------------------
function selectStopAs(stopId, role) {
  const plannerTabBtn = document.querySelector('[data-tab="pane-planner"]');
  if (plannerTabBtn) plannerTabBtn.click();

  if (role === "origin") {
    document.getElementById("select-origin").value = stopId;
  } else {
    document.getElementById("select-dest").value = stopId;
  }
  calculateRoute();
  map.closePopup();
}

function openScheduleTabForStop(stopId) {
  const schedTabBtn = document.querySelector('[data-tab="pane-schedule"]');
  if (schedTabBtn) schedTabBtn.click();

  const schedSelect = document.getElementById("select-schedule-stop");
  if (schedSelect) {
    schedSelect.value = stopId;
    renderUpcomingDepartures(stopId);
  }
  map.closePopup();
}

// -------------------------------------------------------------
// 15. Jam Real-Time & Ticker Bar Berita Bus Kampus USU
// -------------------------------------------------------------
function initRealtimeClock() {
  const clockEl = document.getElementById("realtime-clock");
  if (!clockEl) return;

  function update() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    const seconds = String(now.getSeconds()).padStart(2, "0");
    clockEl.innerHTML = `<i class="fa-regular fa-clock"></i> ${hours}:${minutes}:${seconds} WIB`;
  }
  update();
  setInterval(update, 1000);
}

function initTicker() {
  const tickerContainer = document.getElementById("ticker-track");
  if (!tickerContainer) return;

  tickerContainer.innerHTML = TRANSINFO_DATA.alerts.map(a => `
    <div class="ticker-item">
      <span class="ticker-tag">${a.tag}</span>
      <span>${a.text}</span>
      <span style="color:#64748b;">(${a.time})</span>
      <span style="color:#475569; margin: 0 10px;">&bull;</span>
    </div>
  `).join("");
}
