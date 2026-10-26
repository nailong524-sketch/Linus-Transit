/**
 * Linus Transit - Dataset Transportasi Bus Kampus & Kemacetan Lalu Lintas
 * Wilayah: Universitas Sumatera Utara (USU), Kampus Padang Bulan, Medan
 * Koordinat Pusat: 3.561676, 98.6563423
 * Diverifikasi akurat sesuai Google Maps & Rute Aktif Kampus USU
 */

const TRANSINFO_DATA = {
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
      "name": "Halte Hukum & FIB USU",
      "type": "bus",
      "modeLabel": "Halte 3 • Klaster Humaniora & Pintu Sumber",
      "lat": 3.5582,
      "lng": 98.6604,
      "address": "Jl. Universitas (Area Fakultas Hukum & Fakultas Ilmu Budaya, Pintu Sumber)",
      "facilities": [
        "Gedung FH USU",
        "Gedung FIB USU",
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
      "lat": 3.55645,
      "lng": 98.6572,
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
      "lat": 3.5577,
      "lng": 98.65635,
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
      "lat": 3.55906,
      "lng": 98.6546,
      "address": "Jl. Bioteknologi (Depan Parkir Unit 2 FMIPA & Program Doktor Matematika USU)",
      "facilities": [
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
      "name": "Halte Fakultas Vokasi & Bioteknologi",
      "type": "bus",
      "modeLabel": "Halte 7 • Fakultas Vokasi & Riset Bioteknologi",
      "lat": 3.5582,
      "lng": 98.65398,
      "address": "Jl. Bioteknologi / Gedung Vokasi",
      "facilities": [
        "Gedung Vokasi USU",
        "Laboratorium Bioteknologi",
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
      "lat": 3.5638,
      "lng": 98.65295,
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
      distanceKm: "3.9 km (Loop Utama)",
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
        [3.5582, 98.6604],
        [3.5574, 98.66044],
        [3.5566, 98.66048],
        [3.5564, 98.66],
        [3.55642, 98.6588],
        [3.55645, 98.658],
        [3.55645, 98.6572],
        [3.55642, 98.6566],
        [3.5564, 98.65615],
        [3.5571, 98.65625],
        [3.5577, 98.65635],
        [3.5582, 98.65615],
        [3.5586, 98.6559],
        [3.55906, 98.65588],
        [3.55906, 98.655],
        [3.55906, 98.6546],
        [3.55906, 98.65403],
        [3.5586, 98.654],
        [3.5582, 98.65398],
        [3.5586, 98.654],
        [3.55906, 98.65403],
        [3.55905, 98.65299],
        [3.56068, 98.65302],
        [3.56181, 98.65305],
        [3.56309, 98.65301],
        [3.5638, 98.65295],
        [3.5644, 98.65315],
        [3.5644, 98.6538],
        [3.5642, 98.6555],
        [3.5646, 98.656],
        [3.5651, 98.6566],
        [3.56545, 98.6573],
        [3.5657, 98.6582],
        [3.56578, 98.6592],
        [3.5658, 98.66018],
        [3.56645, 98.6602],
        [3.56733, 98.66008]
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
        [3.5638, 98.65295],
        [3.56309, 98.65301],
        [3.56181, 98.65305],
        [3.56068, 98.65302],
        [3.55905, 98.65299],
        [3.55906, 98.65403],
        [3.55906, 98.6546],
        [3.55906, 98.65403],
        [3.5582, 98.65398],
        [3.55905, 98.65299],
        [3.56181, 98.65305],
        [3.5638, 98.65295],
        [3.5644, 98.65315],
        [3.5642, 98.6555],
        [3.5651, 98.6566],
        [3.5658, 98.66018],
        [3.56645, 98.6602],
        [3.56733, 98.66008]
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
        [3.5582, 98.6604],
        [3.5574, 98.66044],
        [3.5566, 98.66048],
        [3.5564, 98.66],
        [3.55642, 98.6588],
        [3.55645, 98.658],
        [3.55645, 98.6572],
        [3.55642, 98.6566],
        [3.5564, 98.65615],
        [3.5571, 98.65625],
        [3.5577, 98.65635],
        [3.55765, 98.6556],
        [3.5576, 98.6548],
        [3.5577, 98.654],
        [3.5582, 98.65398],
        [3.55905, 98.65299],
        [3.56068, 98.65302],
        [3.56181, 98.65305],
        [3.56309, 98.65301],
        [3.5638, 98.65295],
        [3.5644, 98.65315],
        [3.5642, 98.6555],
        [3.5651, 98.6566],
        [3.5658, 98.66018],
        [3.56645, 98.6602],
        [3.56733, 98.66008]
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
        [3.5577, 98.65635],
        [3.5582, 98.65615],
        [3.5586, 98.6559],
        [3.55906, 98.65588],
        [3.55906, 98.655],
        [3.55906, 98.6546],
        [3.55906, 98.65403],
        [3.5582, 98.65398],
        [3.55905, 98.65299],
        [3.56068, 98.65302],
        [3.56181, 98.65305],
        [3.56309, 98.65301],
        [3.5638, 98.65295],
        [3.56309, 98.65301],
        [3.56181, 98.65305],
        [3.56068, 98.65302],
        [3.55905, 98.65299],
        [3.55906, 98.65403],
        [3.5582, 98.65398],
        [3.5577, 98.654],
        [3.5576, 98.6548],
        [3.55765, 98.6556],
        [3.5571, 98.65625],
        [3.5577, 98.65635]
      ]
    }
  ],

  // Data Pantauan Kepadatan Lalu Lintas di Kawasan USU & Gerbang Masuk
  trafficSegments: [
    {
      id: "TRF-01",
      roadName: "Jl. Dr. Mansyur (Gerbang Utama Pintu 1 USU)",
      status: "congested",
      statusLabel: "Padat Antrean",
      speedKmH: 12,
      color: "#ef4444",
      description: "Antrean masuk kendaraan jam kuliah di Gerbang Pintu 1 Jl. Dr. Mansyur.",
      lengthKm: "0.8 km",
      delayMinutes: "+8 mnt",
      coords: [
        [3.56780, 98.65700],
        [3.56710, 98.65820],
        [3.56733, 98.66008],
        [3.56630, 98.66200]
      ]
    },
    {
      id: "TRF-02",
      roadName: "Jl. Universitas (Pintu 1 - Gelanggang - Pintu Sumber)",
      status: "moderate",
      statusLabel: "Ramai Teratur",
      speedKmH: 22,
      color: "#eab308",
      description: "Jalur utama Linus Transit melintas di depan Gelanggang Mahasiswa & FIB menuju Pintu Sumber.",
      lengthKm: "1.2 km",
      delayMinutes: "+2 mnt",
      coords: [
        [3.56733, 98.66008],
        [3.56645, 98.66020],
        [3.56465, 98.66022],
        [3.55820, 98.66040],
        [3.55660, 98.66050]
      ]
    },
    {
      id: "TRF-03",
      roadName: "Jl. Sivitas Akademika (Depan Auditorium USU)",
      status: "smooth",
      statusLabel: "Lancar Terkendali",
      speedKmH: 28,
      color: "#22c55e",
      description: "Zona hijau tertib penyeberangan mahasiswa di depan Auditorium & Biro Rektorat.",
      lengthKm: "0.6 km",
      delayMinutes: "0 mnt",
      coords: [
        [3.56580, 98.65900],
        [3.56460, 98.65600],
        [3.56380, 98.65380]
      ]
    },
    {
      id: "TRF-04",
      roadName: "Jl. Bioteknologi & Tri Dharma (FMIPA - Vokasi)",
      status: "smooth",
      statusLabel: "Lancar Asri",
      speedKmH: 25,
      color: "#22c55e",
      description: "Sirkulasi kendaraan di klaster sains, laboratorium FMIPA, dan Gedung Vokasi.",
      lengthKm: "0.7 km",
      delayMinutes: "0 mnt",
      coords: [
        [3.56180, 98.65500],
        [3.55906, 98.65460],
        [3.55820, 98.65398]
      ]
    },
    {
      id: "TRF-05",
      roadName: "Jl. Prof. Hanafiah & Dr. A. Sofian (FEB - FISIP)",
      status: "smooth",
      statusLabel: "Lancar Asri",
      speedKmH: 26,
      color: "#22c55e",
      description: "Kawasan rindang depan Fakultas Ekonomi dan Bisnis (FEB) & FISIP USU.",
      lengthKm: "0.7 km",
      delayMinutes: "0 mnt",
      coords: [
        [3.55838, 98.65612],
        [3.55770, 98.65635],
        [3.55640, 98.65611],
        [3.55645, 98.65720]
      ]
    },
    {
      id: "TRF-06",
      roadName: "Jl. Almamater (Pusat Fakultas Teknik - GKB)",
      status: "smooth",
      statusLabel: "Bebas Hambatan",
      speedKmH: 28,
      color: "#22c55e",
      description: "Jalur sirkulasi internal Fakultas Teknik dan Gedung Kuliah Bersama.",
      lengthKm: "0.6 km",
      delayMinutes: "0 mnt",
      coords: [
        [3.56460, 98.65600],
        [3.56180, 98.65500],
        [3.55950, 98.65600]
      ]
    }
  ],

  // Simulasi Posisi Armada Linus Transit & E-Shuttle Real-Time di Kampus USU
  liveVehicles: [
    {
      id: "BUS-LIN01",
      routeId: "LIN-01",
      label: "Linus Transit-01 (Isuzu ELF Biru USU)",
      type: "bus",
      speed: "24 km/h",
      status: "Aktif Melayani",
      occupancy: "65% (Tersedia Kursi)",
      nextStop: "Halte Linus Transit Gelanggang Mahasiswa",
      etaToNext: 2,
      currentCoordIndex: 1,
      currentCoord: [3.56645, 98.66020]
    },
    {
      id: "BUS-LIN02",
      routeId: "LIN-01",
      label: "Linus Transit-02 (Hino Dutro Kuning Emas)",
      type: "bus",
      speed: "20 km/h",
      status: "Aktif Melayani",
      occupancy: "80% (Sisa 4 Kursi)",
      nextStop: "Halte FISIP USU",
      etaToNext: 3,
      currentCoordIndex: 8,
      currentCoord: [3.55645, 98.65720]
    },
    {
      id: "BUS-LIN03",
      routeId: "LIN-02",
      label: "Linus Transit-03 (Klaster Sains Hijau)",
      type: "bus",
      speed: "18 km/h",
      status: "Aktif Melayani",
      occupancy: "50% (Banyak Kursi Kosong)",
      nextStop: "Halte Linus Transit Pintu 4",
      etaToNext: 2,
      currentCoordIndex: 5,
      currentCoord: [3.56380, 98.65295]
    },
    {
      id: "BUS-LIN04",
      routeId: "LIN-03",
      label: "Linus Transit-04 (Klaster Sosiohumaniora Ungu)",
      type: "bus",
      speed: "25 km/h",
      status: "Aktif Melayani",
      occupancy: "70%",
      nextStop: "Halte Hukum & FIB USU",
      etaToNext: 1,
      currentCoordIndex: 2,
      currentCoord: [3.55820, 98.66040]
    },
    {
      id: "EV-SHUTTLE01",
      routeId: "EV-USU",
      label: "E-Shuttle 01 (Mobil Listrik Wuling EV Mini)",
      type: "angkot",
      speed: "16 km/h",
      status: "Eco Shuttle Aktif",
      occupancy: "60% (Kapasitas 10 Org)",
      nextStop: "Halte FMIPA USU",
      etaToNext: 3,
      currentCoordIndex: 7,
      currentCoord: [3.55906, 98.65460]
    }
  ],

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
      type: "warning",
      tag: "INFO GERBANG",
      text: "Pintu 1 Jl. Dr. Mansyur terpantau padat antrean mahasiswa jam masuk kuliah.",
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
    else if (route.id === "LIN-03") destName = "Halte FISIP & Halte Hukum & FIB";
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
