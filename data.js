/**
 * Linus Transit - Dataset Transportasi Bus Kampus USU
 * Wilayah: Universitas Sumatera Utara (USU), Kampus Padang Bulan, Medan
 * Koordinat Pusat: 3.561676, 98.6563423
 * Diverifikasi akurat sesuai Google Maps & Rute Aktif Kampus USU
 */

const TRANSINFO_DATA = {
  // Konfigurasi Google Maps Platform API Resmi
  googleMapsConfig: {
    apiKey: (typeof window !== "undefined" && window.ENV_CONFIG && window.ENV_CONFIG.GOOGLE_MAPS_API_KEY && !window.ENV_CONFIG.GOOGLE_MAPS_API_KEY.includes("MASUKKAN"))
      ? window.ENV_CONFIG.GOOGLE_MAPS_API_KEY.trim()
      : "",
    status: "active",
    libraries: ["places", "geometry"],
    version: "weekly"
  },

  // Koordinat Kampus USU Padang Bulan
  campusMeta: {
    name: "Universitas Sumatera Utara (USU)",
    campusArea: "Kampus Padang Bulan, Medan Baru, Kota Medan",
    center: [3.561676, 98.6563423],
    zoom: 16.5,
    operatingHours: "Senin - Jumat: 07.00 - 17.00 WIB",
    farePolicy: "Gratis Rp 0 (Wajib Tunjukkan KTM / Kartu Civitas Akademika)"
  },

  // Titik Halte / Zona Bus USU (8 Halte Aktif Terverifikasi)
  stops: [
    {
      "id": "HLT-01",
      "name": "Halte Linus Transit Pintu 1",
      "type": "bus",
      "modeLabel": "Halte 1 • Gerbang Utama Jl. Universitas",
      "lat": 3.56645,
      "lng": 98.6602,
      "address": "Jl. Universitas (Samping Bank BTN & PT PAS, Gerbang Pintu 1 USU)",
      "facilities": [
        "Papan Informasi Linus Transit",
        "Bank BTN USU",
        "SCORA FK USU",
        "Links-USU",
        "Pos Satpam Utama"
      ],
      "lines": [
        "LIN-01",
        "LIN-02",
        "LIN-03"
      ]
    },
    {
      "id": "HLT-02",
      "name": "Halte Linus Transit Gelanggang Mahasiswa",
      "type": "bus",
      "modeLabel": "Halte 2 • Pusat Kegiatan & Gelanggang Olahraga",
      "lat": 3.56465,
      "lng": 98.66022,
      "address": "Jl. Universitas (Depan Gelanggang Mahasiswa USU)",
      "facilities": [
        "Gelanggang Mahasiswa",
        "Stadion Olahraga",
        "Kantin & Gazebo",
        "Pohon Rindang"
      ],
      "lines": [
        "LIN-01",
        "LIN-02",
        "LIN-03"
      ]
    },
    {
      "id": "HLT-03",
      "name": "Halte Hukum",
      "type": "bus",
      "modeLabel": "Halte 3 • Fakultas Hukum USU",
      "lat": 3.55817,
      "lng": 98.66047,
      "address": "Jl. Universitas (Depan Kompleks Fakultas Hukum USU, Pintu Sumber)",
      "facilities": [
        "Titik Halte Resmi Google Maps",
        "Gedung FH USU",
        "Akses Pintu Sumber",
        "Taman Sastra",
        "Pos Pengamanan"
      ],
      "lines": [
        "LIN-01",
        "LIN-03"
      ]
    },
    {
      "id": "HLT-04",
      "name": "Halte FISIP USU",
      "type": "bus",
      "modeLabel": "Halte 4 • Fakultas Ilmu Sosial & Ilmu Politik",
      "lat": 3.55634,
      "lng": 98.65719,
      "address": "Jl. Dr. A. Sofian (Depan Gedung Fakultas Ilmu Sosial & Ilmu Politik USU)",
      "facilities": [
        "Gedung FISIP USU",
        "Tax Center FISIP",
        "Taman Diskusi",
        "Jalur Pedestrian Rindang"
      ],
      "lines": [
        "LIN-01",
        "LIN-03"
      ]
    },
    {
      "id": "HLT-05",
      "name": "Halte FEB USU (Fakultas Ekonomi dan Bisnis)",
      "type": "bus",
      "modeLabel": "Halte 5 • Fakultas Ekonomi dan Bisnis",
      "lat": 3.557548,
      "lng": 98.6561279,
      "address": "Jl. Prof. Hanafiah (Depan Gedung Fakultas Ekonomi & Bisnis / Anwar Karim Building)",
      "facilities": [
        "Plaza Utama FEB",
        "Gedung Anwar Karim",
        "Kantin FEB",
        "ATM Center",
        "Kanopi Pejalan Kaki"
      ],
      "lines": [
        "LIN-01",
        "LIN-03",
        "EV-USU"
      ]
    },
    {
      "id": "HLT-06",
      "name": "Halte FMIPA USU",
      "type": "bus",
      "modeLabel": "Halte 6 • Fakultas MIPA & Klaster Sains",
      "lat": 3.55905,
      "lng": 98.65459,
      "address": "Jl. Bioteknologi (Depan Parkir Unit 2 FMIPA & Program Doktor Matematika USU)",
      "facilities": [
        "Titik Halte Resmi Google Maps",
        "Papan Halte FMIPA",
        "Parkir Mobil Unit 2 FMIPA",
        "Gedung S3 Matematika & Fisika",
        "Pohon Rindang",
        "Wi-Fi Eduroam"
      ],
      "lines": [
        "LIN-01",
        "LIN-02",
        "EV-USU"
      ]
    },
    {
      "id": "HLT-07",
      "name": "Halte Fakultas Vokasi",
      "type": "bus",
      "modeLabel": "Halte 7 • Fakultas Vokasi (Jl. Tri Dharma)",
      "lat": 3.55965,
      "lng": 98.65291,
      "address": "Jl. Tri Dharma (Shelter Bus Resmi Depan Kompleks Fakultas Vokasi USU)",
      "facilities": [
        "Shelter Bus Kanopi Resmi USU (Jl. Tri Dharma)",
        "Gedung Fakultas Vokasi",
        "Akses Jalur Pedestrian Barat",
        "Kantin Sehat"
      ],
      "lines": [
        "LIN-01",
        "LIN-02",
        "LIN-03",
        "EV-USU"
      ]
    },
    {
      "id": "HLT-08",
      "name": "Halte Linus Transit Pintu 4",
      "type": "bus",
      "modeLabel": "Halte 8 • Pintu 4 USU & Parkiran Stadion Mini",
      "lat": 3.56380,
      "lng": 98.65303,
      "address": "Jl. Tri Dharma (Depan Parkiran Stadion Mini USU / Akses Pintu 4)",
      "facilities": [
        "Akses Pintu 4 USU",
        "Parkiran Stadion Mini USU",
        "Shelter Bus",
        "Papan Informasi Linus Transit",
        "Kantin Mahasiswa"
      ],
      "lines": [
        "LIN-01",
        "LIN-02",
        "LIN-03",
        "EV-USU"
      ]
    }
  ],

  // Rute Transportasi Bus Kampus Linus Transit USU (Tepat Mengikuti Jalanan Kampus Berdasarkan Data Jalan Nyata)
  routes: [
    {
      id: "LIN-01",
      code: "LIN-1",
      name: "Linus Transit Koridor 1 (Lingkar Utama Kampus USU)",
      type: "bus",
      typeName: "Linus Transit Reguler",
      badgeColor: "#0284c7", // Sky blue
      fare: 0,
      fareFormatted: "Gratis Rp 0 (Tunjukkan KTM)",
      operatingHours: "07.00 - 17.00 WIB",
      headway: "5 - 8 Menit",
      distanceKm: "3.9 km (Loop Utama Kampus USU)",
      estimatedDurationMinutes: 12,
      stopIds: [
        "HLT-01", "HLT-02", "HLT-03", "HLT-04", "HLT-05", "HLT-06", "HLT-07", "HLT-08", "HLT-01"
      ],
      path: [
        [3.56733, 98.66008],
        [3.56685, 98.66014],
        [3.56645, 98.6602],
        [3.5658, 98.66018],
        [3.56465, 98.66022],
        [3.5638, 98.66024],
        [3.5628, 98.66026],
        [3.5615, 98.66028],
        [3.56, 98.66032],
        [3.559, 98.66036],
        [3.55817, 98.66047],
        [3.5574, 98.66044],
        [3.5566, 98.66048],
        [3.55645, 98.6602],
        [3.55645, 98.6588],
        [3.55645, 98.658],
        [3.55634, 98.65719],
        [3.55645, 98.6566],
        [3.55645, 98.6561279],
        [3.557, 98.6561279],
        [3.557548, 98.6561279],
        [3.5582, 98.65615],
        [3.55906, 98.65612],
        [3.55906, 98.655],
        [3.55905, 98.65459],
        [3.55905, 98.65299],
        [3.55965, 98.65291],
        [3.56068, 98.65302],
        [3.56181, 98.65305],
        [3.56309, 98.65301],
        [3.56380, 98.65303],
        [3.56440, 98.65315],
        [3.56509, 98.65319],
        [3.56635, 98.65326],
        [3.56718, 98.65329],
        [3.56738, 98.65330],
        [3.56738, 98.65349],
        [3.56735, 98.65487],
        [3.56735, 98.65592],
        [3.56734, 98.65755],
        [3.56734, 98.65848],
        [3.56734, 98.65900],
        [3.56733, 98.66008],
        [3.56685, 98.66014],
        [3.56645, 98.66020]
      ]
    },
    {
      id: "LIN-02",
      code: "LIN-2",
      name: "Linus Transit Koridor 2 (Klaster Sains & Teknologi)",
      type: "bus",
      typeName: "Linus Transit Sains & Teknologi",
      badgeColor: "#0284c7", // Linus Transit Blue
      fare: 0,
      fareFormatted: "Gratis Rp 0 (Tunjukkan KTM)",
      operatingHours: "07.00 - 17.00 WIB",
      headway: "7 - 10 Menit",
      distanceKm: "3.2 km",
      estimatedDurationMinutes: 11,
      stopIds: [
        "HLT-01", "HLT-02", "HLT-06", "HLT-07", "HLT-08", "HLT-01"
      ],
      path: [
        [3.56733, 98.66008],
        [3.56685, 98.66014],
        [3.56645, 98.6602],
        [3.5658, 98.66018],
        [3.5652, 98.6602],
        [3.56465, 98.66022],
        [3.5638, 98.6593],
        [3.563, 98.6584],
        [3.563, 98.6572],
        [3.5634, 98.6562],
        [3.5642, 98.6555],
        [3.5644, 98.6538],
        [3.5644, 98.65315],
        [3.56380, 98.65303],
        [3.56309, 98.65301],
        [3.56181, 98.65305],
        [3.56068, 98.65302],
        [3.55965, 98.65291],
        [3.55905, 98.65299],
        [3.55905, 98.65459],
        [3.55905, 98.65299],
        [3.56181, 98.65305],
        [3.56380, 98.65303],
        [3.56440, 98.65315],
        [3.56509, 98.65319],
        [3.56635, 98.65326],
        [3.56718, 98.65329],
        [3.56738, 98.65330],
        [3.56738, 98.65349],
        [3.56735, 98.65487],
        [3.56735, 98.65592],
        [3.56734, 98.65755],
        [3.56734, 98.65848],
        [3.56734, 98.65900],
        [3.56733, 98.66008],
        [3.56685, 98.66014],
        [3.56645, 98.66020]
      ]
    },
    {
      id: "LIN-03",
      code: "LIN-3",
      name: "Linus Transit Koridor 3 (Klaster Sosio-Humaniora)",
      type: "bus",
      typeName: "Linus Transit Sosiohumaniora",
      badgeColor: "#0284c7", // Linus Transit Blue
      fare: 0,
      fareFormatted: "Gratis Rp 0 (Tunjukkan KTM)",
      operatingHours: "07.00 - 17.00 WIB",
      headway: "8 - 12 Menit",
      distanceKm: "3.3 km",
      estimatedDurationMinutes: 11,
      stopIds: [
        "HLT-01", "HLT-02", "HLT-03", "HLT-04", "HLT-05", "HLT-07", "HLT-08", "HLT-01"
      ],
      path: [
        [3.56733, 98.66008],
        [3.56645, 98.6602],
        [3.5658, 98.66018],
        [3.56465, 98.66022],
        [3.5638, 98.66024],
        [3.5628, 98.66026],
        [3.5615, 98.66028],
        [3.56, 98.66032],
        [3.559, 98.66036],
        [3.55817, 98.66047],
        [3.5574, 98.66044],
        [3.5566, 98.66048],
        [3.5564, 98.66],
        [3.55642, 98.6588],
        [3.55645, 98.658],
        [3.55634, 98.65719],
        [3.55642, 98.6566],
        [3.5564, 98.65615],
        [3.5571, 98.65625],
        [3.557548, 98.6561279],
        [3.55765, 98.6556],
        [3.5576, 98.6548],
        [3.557548, 98.65295],
        [3.55905, 98.65299],
        [3.55965, 98.65291],
        [3.56068, 98.65302],
        [3.56181, 98.65305],
        [3.56309, 98.65301],
        [3.56380, 98.65303],
        [3.56440, 98.65315],
        [3.56509, 98.65319],
        [3.56635, 98.65326],
        [3.56718, 98.65329],
        [3.56738, 98.65330],
        [3.56738, 98.65349],
        [3.56735, 98.65487],
        [3.56735, 98.65592],
        [3.56734, 98.65755],
        [3.56734, 98.65848],
        [3.56734, 98.65900],
        [3.56733, 98.66008],
        [3.56685, 98.66014],
        [3.56645, 98.66020]
      ]
    },
    {
      id: "EV-USU",
      code: "EV-USU",
      name: "USU Green Campus E-Shuttle (Mobil Listrik)",
      type: "angkot",
      typeName: "Mobil Listrik Ramah Lingkungan",
      badgeColor: "#06b6d4", // Cyan
      fare: 0,
      fareFormatted: "Gratis Rp 0 (Zero Emission)",
      operatingHours: "08.00 - 16.00 WIB",
      headway: "8 - 10 Menit",
      distanceKm: "2.4 km",
      stopIds: ["HLT-05", "HLT-06", "HLT-07", "HLT-08", "HLT-05"],
      path: [
        [3.557548, 98.6561279],
        [3.5582, 98.65615],
        [3.5586, 98.6559],
        [3.55906, 98.65588],
        [3.55906, 98.655],
        [3.55905, 98.65459],
        [3.55905, 98.65299],
        [3.55965, 98.65291],
        [3.56068, 98.65302],
        [3.56181, 98.65305],
        [3.56309, 98.65301],
        [3.56380, 98.65303],
        [3.56309, 98.65301],
        [3.56181, 98.65305],
        [3.56068, 98.65302],
        [3.55965, 98.65291],
        [3.55905, 98.65299],
        [3.55905, 98.65459],
        [3.55906, 98.655],
        [3.55906, 98.65588],
        [3.5582, 98.65615],
        [3.557548, 98.6561279]
      ]
    }
  ],

  // Posisi Armada GPS Bus Kampus USU (Dinonaktifkan sementara menunggu data GPS asli)
  liveVehicles: [],

  // Live Peringatan / Info Bus Kampus USU
  alerts: [
    {
      type: "info",
      tag: "GRATIS CIVITAS",
      text: "Layanan Linus Transit gratis 100% untuk mahasiswa & dosen dengan menunjukkan KTM aktif.",
      time: "Baru saja"
    },
    {
      type: "info",
      tag: "RUTE AKTIF",
      text: "Operasional Linus Transit berpusat pada 8 halte berurutan (1. Pintu 1, 2. Gelanggang, 3. Hukum & FIB, 4. FISIP, 5. FEB, 6. FMIPA, 7. Vokasi, 8. Pintu 4).",
      time: "3 menit lalu"
    },
    {
      type: "info",
      tag: "INFO OPERASIONAL",
      text: "Seluruh armada bus Linus Transit dan E-Shuttle beroperasi aktif mengitari 8 halte kampus.",
      time: "8 menit lalu"
    },
    {
      type: "alert",
      tag: "TATA TERTIB",
      text: "Pemberitahuan: Penumpang pria naik melalui pintu depan, penumpang wanita naik melalui pintu belakang bus.",
      time: "15 menit lalu"
    },
    {
      type: "info",
      tag: "GREEN CAMPUS",
      text: "E-Shuttle Listrik beroperasi di rute Pintu 4 - FMIPA - Vokasi - FEB.",
      time: "25 menit lalu"
    }
  ]
};

// Jadwal Keberangkatan Dinamis / Mock Departures Generator untuk Halte USU
function getUpcomingDeparturesForStop(stopId) {
  const stop = TRANSINFO_DATA.stops.find(s => s.id === stopId);
  if (!stop) return [];

  const departures = [];
  stop.lines.forEach((lineId, idx) => {
    const route = TRANSINFO_DATA.routes.find(r => r.id === lineId);
    if (!route) return;

    const eta1 = (idx * 2) + 2;
    const eta2 = eta1 + 6;
    const eta3 = eta2 + 8;

    let destName = "Putaran Kampus USU";
    if (route.id === "LIN-01") destName = "Halte Linus Transit Pintu 1 & Pintu 4";
    else if (route.id === "LIN-02") destName = "Halte Linus Transit Pintu 4 & Vokasi";
    else if (route.id === "LIN-03") destName = "Halte FISIP & Halte Hukum";
    else if (route.id === "EV-USU") destName = "Halte Linus Transit Pintu 4 - FMIPA";

    departures.push({
      routeCode: route.code,
      routeName: route.name,
      mode: route.typeName,
      badgeColor: route.badgeColor,
      destination: destName,
      etaMinutes: eta1,
      subsequentEtas: [eta2, eta3],
      status: eta1 <= 2 ? "Mendekat" : "Sesuai Jadwal",
      fare: "Gratis Rp 0"
    });
  });

  return departures;
}
