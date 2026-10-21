/**
 * LinUS - Core Logic & Map Controller
 * Sistem Navigasi & Bus Kampus Universitas Sumatera Utara (USU), Padang Bulan Medan
 * Menghubungkan Leaflet Map, Interaksi UI, Simulasi Bus GPS, dan Pencari Rute Kampus
 */

let map;
let googleHybridLayer;
let googleRoadmapLayer;
let esriSatelliteLayer;
let osmLayer;
let currentBaseLayer = "hybrid";

let trafficLayerGroup;
let stopsLayerGroup;
let routesLayerGroup;
let vehiclesLayerGroup;
let activeRoutePolyline = null;
let currentOriginId = "HLT-01"; // Pintu 1 USU
let currentDestId = "HLT-10";   // Fakultas Teknik (FT USU / Jl. Almamater)
let activeModeFilter = "all";
let isTrafficVisible = true;
let isStopsVisible = true;
let isRoutesVisible = true;
let isVehiclesVisible = true;

// Inisialisasi Aplikasi Saat Halaman Selesai Dimuat
document.addEventListener("DOMContentLoaded", () => {
  initMap();
  initTicker();
  initRealtimeClock();
  populateDropdowns();
  renderTrafficPanel();
  renderUpcomingDepartures("HLT-01");
  setupEventListeners();
  startVehicleSimulation();
  
  // Jalankan pencarian rute default awal (Pintu 1 -> Fakultas Teknik)
  calculateRoute();
});

// -------------------------------------------------------------
// 1. Inisialisasi Peta Leaflet Kampus USU Padang Bulan (Google Satelit Hybrid)
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

  // 1. Base Layer Utama: Google Maps Satelit Hybrid (Foto Udara Nyata + Label Jalan & Gedung)
  // Ini adalah tampilan persis seperti screenshot Google Maps Universitas Sumatera Utara yang dikirim pengguna
  googleHybridLayer = L.tileLayer("https://mt{s}.google.com/vt/lyrs=y&x={x}&y={y}&z={z}", {
    subdomains: ["0", "1", "2", "3"],
    maxZoom: 20,
    attribution: '&copy; Google Maps &bull; Universitas Sumatera Utara (USU)'
  });

  // 2. Base Layer Pilihan: Google Peta Jalan (Roadmap)
  googleRoadmapLayer = L.tileLayer("https://mt{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}", {
    subdomains: ["0", "1", "2", "3"],
    maxZoom: 20,
    attribution: '&copy; Google Maps'
  });

  // 3. Base Layer Pilihan: Esri Citra Satelit Beresolusi Tinggi
  esriSatelliteLayer = L.tileLayer("https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}", {
    maxZoom: 19,
    attribution: '&copy; Esri World Imagery'
  });

  // 4. Base Layer Pilihan: OpenStreetMap Standar
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
    "🌍 Esri Citra Satelit": esriSatelliteLayer,
    "🌿 OpenStreetMap": osmLayer
  };
  L.control.layers(baseMaps, null, { position: "topright" }).addTo(map);

  // Pasang Zoom Control di pojok kanan bawah
  L.control.zoom({ position: "bottomright" }).addTo(map);

  // Inisialisasi Layer Groups
  routesLayerGroup = L.layerGroup().addTo(map);
  trafficLayerGroup = L.layerGroup().addTo(map);
  stopsLayerGroup = L.layerGroup().addTo(map);
  vehiclesLayerGroup = L.layerGroup().addTo(map);

  // Render Data Awal ke Peta
  renderAllRoutesPolylines();
  renderTrafficPolylines();
  renderStopMarkers();
  renderLiveVehicles();
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
// 3. Render Garis Lintasan Seluruh Koridor Bus LinUS
// -------------------------------------------------------------
function renderAllRoutesPolylines() {
  routesLayerGroup.clearLayers();

  TRANSINFO_DATA.routes.forEach(route => {
    // Cek jika filter aktif
    if (activeModeFilter !== "all") {
      const match = route.id === activeModeFilter || route.type === activeModeFilter;
      if (!match) return;
    }

    // Garis casing bawah (glow kontras tinggi di atas peta satelit)
    L.polyline(route.path, {
      color: "#000000",
      weight: 7,
      opacity: 0.5,
      lineCap: "round",
      lineJoin: "round"
    }).addTo(routesLayerGroup);

    // Garis utama rute dengan warna koridor
    const polyline = L.polyline(route.path, {
      color: route.badgeColor,
      weight: 4.5,
      opacity: 0.95,
      dashArray: "8, 6",
      lineCap: "round",
      lineJoin: "round"
    }).addTo(routesLayerGroup);

    const popupContent = `
      <div class="popup-inner">
        <div class="popup-badge" style="background:${route.badgeColor}; color:#fff;">
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
// 4. Render Layer Kemacetan Jalan di Lingkungan Kampus & Gerbang
// -------------------------------------------------------------
function renderTrafficPolylines() {
  trafficLayerGroup.clearLayers();

  TRANSINFO_DATA.trafficSegments.forEach(segment => {
    // Garis halo/glow hitam tebal untuk kontras di atas foto satelit
    L.polyline(segment.coords, {
      color: "#000000",
      weight: 9,
      opacity: 0.6,
      lineCap: "round",
      lineJoin: "round"
    }).addTo(trafficLayerGroup);

    // Garis status utama
    const polyline = L.polyline(segment.coords, {
      color: segment.color,
      weight: 5,
      opacity: 1,
      dashArray: segment.status === "congested" ? "7, 5" : null,
      lineCap: "round",
      lineJoin: "round"
    }).addTo(trafficLayerGroup);

    const popupContent = `
      <div class="popup-inner">
        <div class="popup-badge" style="background:${segment.color}; color:#fff;">
          ${segment.statusLabel.toUpperCase()}
        </div>
        <div class="popup-title">${segment.roadName}</div>
        <div class="popup-subtitle">${segment.description}</div>
        <div style="font-size:0.75rem; color:#cbd5e1; display:flex; justify-content:space-between; margin-top:6px; padding-top:6px; border-top:1px solid rgba(255,255,255,0.1);">
          <span><i class="fa-solid fa-gauge-high"></i> Kecepatan: <b>${segment.speedKmH} km/h</b></span>
          <span><i class="fa-regular fa-clock"></i> Tunda: <b>${segment.delayMinutes}</b></span>
        </div>
      </div>
    `;
    polyline.bindPopup(popupContent);
  });
}

// -------------------------------------------------------------
// 5. Render Marker Halte / Zona Bus USU
// -------------------------------------------------------------
function renderStopMarkers() {
  stopsLayerGroup.clearLayers();

  TRANSINFO_DATA.stops.forEach(stop => {
    // Filter moda/koridor jika dipilih
    if (activeModeFilter !== "all") {
      const modeMatch = stop.lines.some(lineId => {
        const r = TRANSINFO_DATA.routes.find(route => route.id === lineId);
        return r && (r.id === activeModeFilter || r.type === activeModeFilter);
      });
      if (!modeMatch) return;
    }

    // Tentukan icon spesifik berdasarkan jenis lokasi kampus
    let iconClass = "fa-bus";
    let markerColorClass = "stop-marker-bus";

    if (stop.id === "HLT-02") {
      iconClass = "fa-building-columns"; // Auditorium & Biro Rektor
      markerColorClass = "stop-marker-rektorat";
    } else if (stop.id === "HLT-03") {
      iconClass = "fa-hospital"; // RS USU
      markerColorClass = "stop-marker-hospital";
    } else if (stop.id === "HLT-06") {
      iconClass = "fa-book-open"; // Perpustakaan & Pendopo
      markerColorClass = "stop-marker-library";
    } else if (stop.id === "HLT-07") {
      iconClass = "fa-graduation-cap"; // POLMED
      markerColorClass = "stop-marker-sports";
    } else if (stop.id === "HLT-08") {
      iconClass = "fa-capsules"; // Farmasi
      markerColorClass = "stop-marker-tech";
    } else if (stop.id === "HLT-10") {
      iconClass = "fa-gear"; // Fakultas Teknik / Magister Sipil
      markerColorClass = "stop-marker-eng";
    } else if (stop.id === "HLT-12") {
      iconClass = "fa-chart-pie"; // FEB
      markerColorClass = "stop-marker-bus";
    } else if (stop.id === "HLT-13") {
      iconClass = "fa-scale-balanced"; // Hukum
      markerColorClass = "stop-marker-gate";
    } else if (stop.id === "HLT-01" || stop.id === "HLT-05" || stop.id === "HLT-15") {
      iconClass = "fa-archway"; // Gerbang Masuk
      markerColorClass = "stop-marker-gate";
    }

    const customIcon = L.divIcon({
      className: "custom-stop-marker-wrapper",
      html: `
        <div class="custom-stop-marker ${markerColorClass}" style="width:30px; height:30px;">
          <i class="fa-solid ${iconClass}"></i>
        </div>
      `,
      iconSize: [30, 30],
      iconAnchor: [15, 15],
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

    const popupContent = `
      <div class="popup-inner">
        <div style="font-size:0.72rem; color:#10b981; font-weight:700; text-transform:uppercase; letter-spacing:0.5px;">${stop.modeLabel}</div>
        <div class="popup-title" style="margin-top:2px;">${stop.name}</div>
        <div class="popup-subtitle"><i class="fa-solid fa-location-dot" style="color:#0284c7;"></i> ${stop.address}</div>
        
        <div style="margin: 8px 0 6px 0;">
          <div style="font-size:0.7rem; color:#94a3b8; margin-bottom:4px; font-weight:600;">Koridor Bus LinUS Melintas:</div>
          <div>${linesBadges}</div>
        </div>

        <div style="margin: 6px 0;">
          <div style="font-size:0.7rem; color:#94a3b8; margin-bottom:3px; font-weight:600;">Fasilitas Sekitar Halte:</div>
          <div>${facilitiesHtml}</div>
        </div>

        <div class="popup-actions">
          <button class="popup-btn popup-btn-primary" onclick="selectStopAs('${stop.id}', 'origin')">
            <i class="fa-solid fa-location-arrow"></i> Set Asal
          </button>
          <button class="popup-btn popup-btn-primary" style="background:#059669;" onclick="selectStopAs('${stop.id}', 'dest')">
            <i class="fa-solid fa-flag-checkered"></i> Set Tujuan
          </button>
          <button class="popup-btn popup-btn-outline" onclick="openScheduleTabForStop('${stop.id}')">
            <i class="fa-regular fa-clock"></i> Jadwal Bus
          </button>
        </div>
      </div>
    `;

    marker.bindPopup(popupContent);
    marker.addTo(stopsLayerGroup);
  });
}

// -------------------------------------------------------------
// 6. Render & Simulasi Armada Bus LinUS Bergerak Real-Time
// -------------------------------------------------------------
function renderLiveVehicles() {
  vehiclesLayerGroup.clearLayers();

  TRANSINFO_DATA.liveVehicles.forEach(vehicle => {
    let icon = "fa-bus";
    let bgGradient = "linear-gradient(135deg, #0284c7, #0369a1)";

    if (vehicle.type === "angkot") {
      icon = "fa-bolt"; // Mobil listrik / EV
      bgGradient = "linear-gradient(135deg, #06b6d4, #0891b2)";
    } else if (vehicle.routeId === "LIN-02") {
      bgGradient = "linear-gradient(135deg, #10b981, #059669)";
    } else if (vehicle.routeId === "LIN-03") {
      bgGradient = "linear-gradient(135deg, #8b5cf6, #6d28d9)";
    }

    const customVehicleIcon = L.divIcon({
      className: "custom-vehicle-marker-wrapper",
      html: `
        <div class="custom-vehicle-marker" style="width:34px; height:34px; background:${bgGradient}; border:2px solid #ffffff; box-shadow:0 0 14px rgba(56, 189, 248, 0.9);" title="${vehicle.label}">
          <i class="fa-solid ${icon}"></i>
        </div>
      `,
      iconSize: [34, 34],
      iconAnchor: [17, 17],
      popupAnchor: [0, -20]
    });

    const marker = L.marker(vehicle.currentCoord, { icon: customVehicleIcon });

    const popupContent = `
      <div class="popup-inner">
        <div class="popup-badge" style="background:#059669; color:#fff;">
          <i class="fa-solid fa-tower-broadcast"></i> GPS BUS KAMPUS AKTIF
        </div>
        <div class="popup-title">${vehicle.label}</div>
        <div class="popup-subtitle">Koridor: ${vehicle.routeId} &bull; Kecepatan: ${vehicle.speed}</div>
        
        <div style="background:rgba(255,255,255,0.05); padding:10px; border-radius:8px; font-size:0.75rem; margin:8px 0; border:1px solid rgba(255,255,255,0.08);">
          <div style="color:#94a3b8;">Menuju Pemberhentian:</div>
          <div style="font-weight:700; color:#38bdf8; font-size:0.85rem; margin-top:2px;">
            <i class="fa-solid fa-arrow-right"></i> ${vehicle.nextStop}
          </div>
          <div style="color:#4ade80; margin-top:5px;">
            <i class="fa-regular fa-clock"></i> Estimasi Tiba (ETA): <b>${vehicle.etaToNext} menit</b>
          </div>
          <div style="color:#cbd5e1; margin-top:3px;">
            <i class="fa-solid fa-users"></i> Kapasitas Penumpang: <b>${vehicle.occupancy}</b>
          </div>
        </div>
        <div style="font-size:0.7rem; color:#94a3b8; font-style:italic;">
          * Bus LinUS USU gratis untuk seluruh civitas akademika.
        </div>
      </div>
    `;

    marker.bindPopup(popupContent);
    marker.addTo(vehiclesLayerGroup);
    vehicle._marker = marker;
  });
}

function startVehicleSimulation() {
  // Menggerakkan posisi bus di sepanjang koordinat rute kampusnya secara berkala
  setInterval(() => {
    TRANSINFO_DATA.liveVehicles.forEach(vehicle => {
      const route = TRANSINFO_DATA.routes.find(r => r.id === vehicle.routeId);
      if (!route || !route.path || route.path.length === 0) return;

      // Geser index koordinat rute
      vehicle.currentCoordIndex = (vehicle.currentCoordIndex + 1) % route.path.length;
      const targetCoord = route.path[vehicle.currentCoordIndex];

      // Berikan pergerakan halus dengan sedikit variasi realistis
      const deltaLat = (Math.random() - 0.5) * 0.00015;
      const deltaLng = (Math.random() - 0.5) * 0.00015;
      vehicle.currentCoord = [targetCoord[0] + deltaLat, targetCoord[1] + deltaLng];

      // Perbarui estimasi ETA ke halte berikutnya
      vehicle.etaToNext = Math.max(1, (vehicle.etaToNext - 1) <= 0 ? 4 : vehicle.etaToNext - 1);

      if (vehicle._marker) {
        vehicle._marker.setLatLng(vehicle.currentCoord);
      }
    });
  }, 4000);
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

  // 1. Cari apakah ada rute langsung (Direct Bus LinUS)
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
        pathCoords: [
          [originStop.lat, originStop.lng],
          [destStop.lat, destStop.lng]
        ],
        routeObj: route
      });
    });
  }

  // 2. Jika perlu alternatif via Hub Auditorium & Biro Rektor
  if (recommendations.length === 0 || directRoutes.length === 1) {
    const hubStop = TRANSINFO_DATA.stops.find(s => s.id === "HLT-02") || TRANSINFO_DATA.stops[1]; // Auditorium
    const route1 = TRANSINFO_DATA.routes.find(r => r.stopIds.includes(originId)) || TRANSINFO_DATA.routes[0];
    const route2 = TRANSINFO_DATA.routes.find(r => r.stopIds.includes(destId)) || TRANSINFO_DATA.routes[1];

    recommendations.push({
      id: "rec-transfer-hub",
      title: "Rute Transit Terpadu: Transit di Halte Auditorium USU",
      mode: "Kombinasi Koridor LinUS",
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
          desc: `Naik bus ${route1.code} menuju arah Auditorium & Rektorat.`
        },
        {
          type: "transit",
          title: "Transit di Halte Auditorium & Biro Rektor USU",
          desc: `Pindah ke koridor bus penghubung ${route2.code} (Waktu tunggu est. 3-4 menit).`
        },
        {
          type: "dest",
          title: `Tiba di ${destStop.name}`,
          desc: `Sampai di tujuan akhir perjalanan kampus.`
        }
      ],
      pathCoords: [
        [originStop.lat, originStop.lng],
        [hubStop.lat, hubStop.lng],
        [destStop.lat, destStop.lng]
      ],
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

  let coordsToDraw = rec.pathCoords;
  if (rec.routeObj && rec.routeObj.path) {
    coordsToDraw = rec.routeObj.path;
  }

  activeRoutePolyline = L.polyline(coordsToDraw, {
    color: "#38bdf8",
    weight: 6.5,
    opacity: 0.95,
    dashArray: "10, 8"
  }).addTo(map);

  map.fitBounds(activeRoutePolyline.getBounds(), {
    padding: [50, 50],
    maxZoom: 18
  });
}

// -------------------------------------------------------------
// 9. Render Panel Pantauan Lalu Lintas Kampus
// -------------------------------------------------------------
function renderTrafficPanel() {
  const container = document.getElementById("traffic-hotspots-list");
  if (!container) return;

  container.innerHTML = "";

  TRANSINFO_DATA.trafficSegments.forEach(segment => {
    const card = document.createElement("div");
    card.className = "hotspot-card";
    card.innerHTML = `
      <div class="hotspot-info">
        <div class="hotspot-title">${segment.roadName}</div>
        <div class="hotspot-cause"><i class="fa-solid fa-triangle-exclamation"></i> ${segment.description}</div>
      </div>
      <div class="hotspot-meta">
        <span class="hotspot-badge" style="background:${segment.color}; color:#fff;">${segment.statusLabel}</span>
        <div class="hotspot-speed"><i class="fa-solid fa-gauge-high"></i> ${segment.speedKmH} km/h</div>
      </div>
    `;

    // Klik untuk fokus ke jalan tersebut
    card.addEventListener("click", () => {
      const bounds = L.latLngBounds(segment.coords);
      map.fitBounds(bounds, { padding: [80, 80] });

      trafficLayerGroup.eachLayer(layer => {
        if (layer.getLatLngs && layer.getPopup) {
          const latLngs = layer.getLatLngs();
          if (latLngs.length > 0 && Math.abs(latLngs[0].lat - segment.coords[0][0]) < 0.001) {
            layer.openPopup();
          }
        }
      });
    });

    container.appendChild(card);
  });
}

// -------------------------------------------------------------
// 10. Render Papan Keberangkatan Halte (Digital Board)
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

  TRANSINFO_DATA.stops.forEach((stop) => {
    const optOrigin = new Option(`${stop.name}`, stop.id);
    const optDest = new Option(`${stop.name}`, stop.id);
    const optSchedule = new Option(`${stop.name}`, stop.id);

    originSelect.add(optOrigin);
    destSelect.add(optDest);
    scheduleStopSelect.add(optSchedule);
  });

  // Default: Pintu 1 Mansyur ke Fakultas Teknik (Magister Sipil / Jl. Almamater)
  originSelect.value = "HLT-01"; // Pintu 1
  destSelect.value = "HLT-10";   // Fakultas Teknik
  scheduleStopSelect.value = "HLT-01";
}

// -------------------------------------------------------------
// 12. Quick Fly-To Landmark Kampus USU (Sesuai Peta Referensi)
// -------------------------------------------------------------
function flyToCampusLandmark(landmarkKey) {
  const landmarks = {
    rektorat: { coord: [3.56460, 98.65600], zoom: 17.5, name: "Auditorium & Biro Rektor USU" },
    teknik: { coord: [3.56168, 98.65634], zoom: 18, name: "Fakultas Teknik (FT USU / Jl. Almamater)" },
    rsusu: { coord: [3.56580, 98.65180], zoom: 17, name: "Rumah Sakit USU (RS USU)" },
    perpus: { coord: [3.56120, 98.65840], zoom: 17.5, name: "Perpustakaan Pusat & Pendopo (Gedung Pancasila)" },
    pintu1: { coord: [3.56685, 98.65914], zoom: 17, name: "Pintu 1 USU (Jl. Dr. Mansyur)" },
    feb: { coord: [3.55800, 98.65850], zoom: 17.5, name: "Fakultas Ekonomi dan Bisnis (FEB USU)" },
    fasilkom: { coord: [3.56080, 98.65370], zoom: 17.5, name: "Fakultas Farmasi & Tri Dharma" },
    polmed: { coord: [3.56380, 98.65380], zoom: 17.5, name: "POLMED (Politeknik Negeri Medan)" },
    pintu4: { coord: [3.56380, 98.65150], zoom: 17, name: "Pintu 4 USU (Akses Pajus & Jamin Ginting)" },
    pusat: { coord: [3.561676, 98.6563423], zoom: 16.5, name: "Pusat Kampus USU Padang Bulan" }
  };

  const item = landmarks[landmarkKey];
  if (!item) return;

  map.flyTo(item.coord, item.zoom, { duration: 1.2 });
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

  // Toggle Layer Kemacetan (Tombol Mengambang)
  const btnToggleTraffic = document.getElementById("tool-toggle-traffic");
  if (btnToggleTraffic) {
    btnToggleTraffic.addEventListener("click", () => {
      isTrafficVisible = !isTrafficVisible;
      if (isTrafficVisible) {
        map.addLayer(trafficLayerGroup);
        btnToggleTraffic.classList.add("active");
      } else {
        map.removeLayer(trafficLayerGroup);
        btnToggleTraffic.classList.remove("active");
      }
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

  // Toggle Layer Rute LinUS
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
      (reg) => console.log('LinUS PWA Service Worker aktif:', reg.scope),
      (err) => console.log('Gagal mendaftarkan Service Worker:', err)
    );
  });
}

// -------------------------------------------------------------
// 14. Helper Fungsi Terbuka untuk Popup & Komponen
// -------------------------------------------------------------
function selectStopAs(stopId, role) {
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
