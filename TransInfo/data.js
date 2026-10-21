/**
 * LinUS - Dataset Transportasi Bus Kampus & Kemacetan Lalu Lintas
 * Wilayah: Universitas Sumatera Utara (USU), Kampus Padang Bulan, Medan
 * Koordinat Pusat: 3.561676, 98.6563423
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

  // Titik Halte / Zona Bus USU (Tepat Sesuai Peta Google Maps USU)
  stops: [
    {
      id: "HLT-01",
      name: "Halte Pintu 1 USU (Jl. Dr. Mansyur - Gerbang Utama)",
      type: "bus",
      modeLabel: "Gerbang Utama Jl. Dr. Mansyur",
      lat: 3.56685,
      lng: 98.65914,
      address: "Jl. Dr. Mansyur No. 9, Pintu Masuk 1 USU",
      facilities: ["Pos Satpam Utama", "Papan Rute LinUS", "Jalur Pedestrian", "Drop-Off Penumpang"],
      lines: ["LIN-01", "LIN-02"]
    },
    {
      id: "HLT-02",
      name: "Halte Auditorium & Biro Rektor USU",
      type: "bus",
      modeLabel: "Auditorium & Sentral Rektorat",
      lat: 3.56460,
      lng: 98.65600,
      address: "Jl. Sivitas Akademika / Depan Auditorium USU",
      facilities: ["Auditorium Kampus", "Taman Rektorat", "Kanopi Teduh", "Akses Difabel", "Wi-Fi Eduroam"],
      lines: ["LIN-01", "LIN-02", "LIN-03", "EV-USU"]
    },
    {
      id: "HLT-03",
      name: "Halte Rumah Sakit USU (RS USU)",
      type: "bus",
      modeLabel: "Layanan Kesehatan & RS Pendidikan",
      lat: 3.56580,
      lng: 98.65180,
      address: "Jl. Dr. Mansyur No. 66 (Depan Gedung RS USU)",
      facilities: ["Drop-Off IGD 24 Jam", "Ruang Tunggu Ber-AC", "Farmasi", "Integrasi Angkot Medan"],
      lines: ["LIN-01", "LIN-02"]
    },
    {
      id: "HLT-04",
      name: "Halte Fakultas Kedokteran (FK USU)",
      type: "bus",
      modeLabel: "Klaster Kedokteran",
      lat: 3.56540,
      lng: 98.65820,
      address: "Jl. Dr. Mansyur / Kompleks FK USU",
      facilities: ["Kanopi Halte", "Lampu Penerangan", "Akses Lab Biomedik", "Rambu Zona Bus USU"],
      lines: ["LIN-01", "LIN-02"]
    },
    {
      id: "HLT-05",
      name: "Halte FKG & Pintu 2 USU",
      type: "bus",
      modeLabel: "Fakultas Kedokteran Gigi & Pintu 2",
      lat: 3.56360,
      lng: 98.65980,
      address: "Jl. Alumni / Area FKG USU",
      facilities: ["RS Gigi & Mulut", "Kantin Mahasiswa", "Area Parkir", "Pos Satpam"],
      lines: ["LIN-01", "LIN-03"]
    },
    {
      id: "HLT-06",
      name: "Halte Perpustakaan Pusat & Pendopo (Gedung Pancasila)",
      type: "bus",
      modeLabel: "Pusat Literasi & Danau USU",
      lat: 3.56120,
      lng: 98.65840,
      address: "Jl. Perpustakaan, Depan Gedung Pancasila & Danau",
      facilities: ["Gedung Pancasila (Pendopo)", "Perpustakaan Pusat", "Pemandangan Danau", "Wi-Fi Eduroam"],
      lines: ["LIN-01", "LIN-02", "LIN-03", "EV-USU"]
    },
    {
      id: "HLT-07",
      name: "Halte POLMED & Gelanggang Mahasiswa",
      type: "bus",
      modeLabel: "Politeknik Negeri Medan & Olahraga",
      lat: 3.56380,
      lng: 98.65380,
      address: "Jl. Politeknik / Jl. Sivitas Akademika",
      facilities: ["Gedung POLMED", "Stadion Mini USU", "Gelanggang Olahraga", "Kantin Mahasiswa"],
      lines: ["LIN-01", "LIN-02"]
    },
    {
      id: "HLT-08",
      name: "Halte Fakultas Farmasi & Fasilkom-TI",
      type: "bus",
      modeLabel: "Fakultas Farmasi & Komputer (TI)",
      lat: 3.56080,
      lng: 98.65370,
      address: "Jl. Tri Dharma, Depan Gedung Fakultas Farmasi",
      facilities: ["Masjid As-Syifa' Farmasi", "Lab Komputer TI", "Charging Station", "Taman Diskusi"],
      lines: ["LIN-02", "EV-USU"]
    },
    {
      id: "HLT-09",
      name: "Halte Fakultas Vokasi & Bioteknologi",
      type: "bus",
      modeLabel: "Fakultas Vokasi & Riset Bioteknologi",
      lat: 3.55850,
      lng: 98.65420,
      address: "Jl. Bioteknologi / Gedung Vokasi",
      facilities: ["Gedung Vokasi USU", "Laboratorium Bioteknologi", "Kantin Sehat"],
      lines: ["LIN-02", "LIN-03"]
    },
    {
      id: "HLT-10",
      name: "Halte Fakultas Teknik (FT USU / Jl. Almamater)",
      type: "bus",
      modeLabel: "Klaster Teknik & Magister Sipil",
      lat: 3.56168,
      lng: 98.65634,
      address: "Jl. Almamater (Pusat Kampus USU)",
      facilities: ["Magister Teknik Sipil", "Gedung Kuliah Bersama (GKB)", "Bengkel & Lab", "Halte Baja"],
      lines: ["LIN-01", "LIN-02", "EV-USU"]
    },
    {
      id: "HLT-11",
      name: "Halte Pertanian & Kehutanan",
      type: "bus",
      modeLabel: "Fakultas Pertanian & Magister Kehutanan",
      lat: 3.55740,
      lng: 98.65300,
      address: "Jl. Bioteknologi Ujung / Magister Kehutanan",
      facilities: ["Greenhouse Pertanian", "Kebun Percobaan", "Pepohonan Rindang"],
      lines: ["LIN-02", "EV-USU"]
    },
    {
      id: "HLT-12",
      name: "Halte Fakultas Ekonomi dan Bisnis (FEB USU)",
      type: "bus",
      modeLabel: "Fakultas Ekonomi dan Bisnis",
      lat: 3.55800,
      lng: 98.65850,
      address: "Jl. Prof. T.M. Hanafiah / Dekat FISIP B",
      facilities: ["Plaza FEB", "Gedung B FISIP", "ATM Center", "Kafe Mahasiswa"],
      lines: ["LIN-01", "LIN-03"]
    },
    {
      id: "HLT-13",
      name: "Halte Fakultas Hukum & Ilmu Sosial (FH USU)",
      type: "bus",
      modeLabel: "Fakultas Hukum & Ilmu Sejarah",
      lat: 3.55840,
      lng: 98.66030,
      address: "Jl. Universitas / Jl. Abdul Hakim",
      facilities: ["Gedung Peradilan Semu FH", "Gedung Pascasarjana", "Kantin Asri"],
      lines: ["LIN-01", "LIN-03"]
    },
    {
      id: "HLT-14",
      name: "Halte FISIP & FIB USU",
      type: "bus",
      modeLabel: "FISIP, Pascasarjana & Budaya",
      lat: 3.55920,
      lng: 98.65760,
      address: "Jl. Almamater / Gedung Pascasarjana FISIP",
      facilities: ["Gedung Pascasarjana FISIP", "Taman Diskusi", "Jalur Pedestrian Rindang"],
      lines: ["LIN-01", "LIN-03"]
    },
    {
      id: "HLT-15",
      name: "Halte Pintu 4 USU (Akses Pajus & Jamin Ginting)",
      type: "bus",
      modeLabel: "Pintu 4 USU & Pajus Padang Bulan",
      lat: 3.56380,
      lng: 98.65150,
      address: "Jl. Tri Dharma Barat / Pintu 4 USU",
      facilities: ["Gerbang Pintu 4", "Dekat Pajus Padang Bulan", "Pangkalan Ojek Online", "Akses Angkot"],
      lines: ["LIN-01", "LIN-03", "EV-USU"]
    }
  ],

  // Rute Transportasi Bus Kampus LinUS USU (Tepat Mengikuti Jalanan Kampus)
  routes: [
    {
      id: "LIN-01",
      code: "LIN-1",
      name: "LinUS Koridor 1 (Lingkar Utama Kampus USU)",
      type: "bus",
      typeName: "Bus LinUS Reguler",
      badgeColor: "#0284c7", // Sky blue
      fare: 0,
      fareFormatted: "Gratis Rp 0 (Tunjukkan KTM)",
      operatingHours: "07.00 - 17.00 WIB",
      headway: "5 - 8 Menit",
      distanceKm: "4.2 km (Loop Utama)",
      estimatedDurationMinutes: 15,
      stopIds: ["HLT-01", "HLT-04", "HLT-02", "HLT-07", "HLT-15", "HLT-08", "HLT-10", "HLT-14", "HLT-12", "HLT-13", "HLT-06", "HLT-05", "HLT-01"],
      path: [
        [3.56685, 98.65914], // Pintu 1 Mansyur
        [3.56540, 98.65820], // FK USU
        [3.56460, 98.65600], // Auditorium & Sivitas Akademika
        [3.56380, 98.65380], // POLMED & Gelanggang
        [3.56380, 98.65150], // Pintu 4 USU
        [3.56080, 98.65370], // Farmasi & Tri Dharma
        [3.55930, 98.65640], // Simpang Bioteknologi
        [3.56168, 98.65634], // FT USU / Jl. Almamater
        [3.55920, 98.65760], // Pascasarjana FISIP
        [3.55800, 98.65850], // FEB USU
        [3.55840, 98.66030], // FH USU / Jl. Universitas
        [3.56120, 98.65840], // Perpustakaan & Pendopo
        [3.56360, 98.65980], // FKG & Alumni
        [3.56685, 98.65914]  // Kembali ke Pintu 1
      ]
    },
    {
      id: "LIN-02",
      code: "LIN-2",
      name: "LinUS Koridor 2 (Klaster Sains, Medis & Teknologi)",
      type: "bus",
      typeName: "Bus LinUS Sains & Medis",
      badgeColor: "#10b981", // Emerald green
      fare: 0,
      fareFormatted: "Gratis Rp 0 (Tunjukkan KTM)",
      operatingHours: "07.00 - 17.00 WIB",
      headway: "7 - 10 Menit",
      distanceKm: "3.6 km",
      estimatedDurationMinutes: 13,
      stopIds: ["HLT-03", "HLT-01", "HLT-04", "HLT-02", "HLT-07", "HLT-08", "HLT-09", "HLT-10", "HLT-11"],
      path: [
        [3.56580, 98.65180], // RS USU (Mansyur)
        [3.56685, 98.65914], // Pintu 1 Mansyur
        [3.56540, 98.65820], // FK USU
        [3.56460, 98.65600], // Auditorium USU
        [3.56380, 98.65380], // POLMED
        [3.56080, 98.65370], // Farmasi
        [3.55850, 98.65420], // Vokasi & Bioteknologi
        [3.55740, 98.65300], // Kehutanan & Pertanian
        [3.55930, 98.65640], // Bioteknologi - Almamater
        [3.56168, 98.65634], // FT USU
        [3.56460, 98.65600]  // Kembali ke Auditorium
      ]
    },
    {
      id: "LIN-03",
      code: "LIN-3",
      name: "LinUS Koridor 3 (Klaster Sosio-Humaniora & Pajus)",
      type: "bus",
      typeName: "Bus LinUS Sosiohumaniora",
      badgeColor: "#8b5cf6", // Purple / Violet
      fare: 0,
      fareFormatted: "Gratis Rp 0 (Tunjukkan KTM)",
      operatingHours: "07.00 - 17.00 WIB",
      headway: "8 - 12 Menit",
      distanceKm: "3.4 km",
      estimatedDurationMinutes: 12,
      stopIds: ["HLT-05", "HLT-06", "HLT-13", "HLT-12", "HLT-14", "HLT-09", "HLT-15", "HLT-02"],
      path: [
        [3.56360, 98.65980], // FKG & Alumni
        [3.56120, 98.65840], // Pendopo & Perpustakaan
        [3.55840, 98.66030], // FH & Abdul Hakim
        [3.55800, 98.65850], // FEB USU
        [3.55920, 98.65760], // FISIP B
        [3.55850, 98.65420], // Bioteknologi & Vokasi
        [3.56080, 98.65370], // Farmasi
        [3.56380, 98.65150], // Pintu 4 USU
        [3.56460, 98.65600], // Auditorium & Rektorat
        [3.56360, 98.65980]  // Kembali ke FKG
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
      distanceKm: "2.6 km",
      stopIds: ["HLT-02", "HLT-10", "HLT-06", "HLT-08", "HLT-09", "HLT-11"],
      path: [
        [3.56460, 98.65600], // Auditorium USU
        [3.56280, 98.65620], // Simpang Alumni
        [3.56168, 98.65634], // FT USU / Magister Sipil
        [3.56120, 98.65840], // Perpustakaan & Pendopo
        [3.55920, 98.65760], // Pascasarjana FISIP
        [3.55850, 98.65420], // Bioteknologi & Vokasi
        [3.55740, 98.65300], // Kehutanan
        [3.56080, 98.65370], // Farmasi & Tri Dharma
        [3.56460, 98.65600]  // Kembali ke Auditorium
      ]
    }
  ],

  // Data Pantauan Kepadatan Lalu Lintas di Kawasan USU & Gerbang Masuk
  trafficSegments: [
    {
      id: "TRF-01",
      roadName: "Jl. Dr. Mansyur (Pintu 1 & Pintu 2 USU)",
      status: "congested",
      statusLabel: "Padat Antrean",
      speedKmH: 12,
      color: "#ef4444",
      description: "Antrean kendaraan jam kuliah dan aktivitas lalu lintas Jl. Dr. Mansyur.",
      lengthKm: "0.9 km",
      delayMinutes: "+8 mnt",
      coords: [
        [3.56720, 98.65500],
        [3.56685, 98.65914],
        [3.56630, 98.66080],
        [3.56580, 98.66300]
      ]
    },
    {
      id: "TRF-02",
      roadName: "Jl. Almamater (Depan Magister Teknik Sipil - FT)",
      status: "moderate",
      statusLabel: "Ramai Lancar",
      speedKmH: 22,
      color: "#eab308",
      description: "Aktivitas penyeberangan mahasiswa dan sirkulasi bus LinUS di jalan utama kampus.",
      lengthKm: "0.8 km",
      delayMinutes: "+2 mnt",
      coords: [
        [3.56460, 98.65600],
        [3.56280, 98.65620],
        [3.56168, 98.65634],
        [3.55930, 98.65640]
      ]
    },
    {
      id: "TRF-03",
      roadName: "Jl. Sivitas Akademika (Depan Auditorium USU)",
      status: "smooth",
      statusLabel: "Lancar Terkendali",
      speedKmH: 28,
      color: "#22c55e",
      description: "Kawasan tertib zona hijau pejalan kaki dan lintasan Bus LinUS kampus berjalan lancar.",
      lengthKm: "0.6 km",
      delayMinutes: "0 mnt",
      coords: [
        [3.56540, 98.65820],
        [3.56460, 98.65600],
        [3.56380, 98.65380]
      ]
    },
    {
      id: "TRF-04",
      roadName: "Jl. Tri Dharma (Farmasi - POLMED - Pintu 4)",
      status: "moderate",
      statusLabel: "Ramai Lancar",
      speedKmH: 20,
      color: "#eab308",
      description: "Arus lalu lintas mahasiswa POLMED dan Fakultas Farmasi menuju Pintu 4 USU.",
      lengthKm: "0.9 km",
      delayMinutes: "+3 mnt",
      coords: [
        [3.56380, 98.65150],
        [3.56380, 98.65380],
        [3.56080, 98.65370],
        [3.55850, 98.65420]
      ]
    },
    {
      id: "TRF-05",
      roadName: "Jl. Perpustakaan & Pendopo (Gedung Pancasila)",
      status: "smooth",
      statusLabel: "Lancar Asri",
      speedKmH: 25,
      color: "#22c55e",
      description: "Jalur lingkar danau dan perpustakaan rindang teduh dengan sirkulasi tertib.",
      lengthKm: "0.7 km",
      delayMinutes: "0 mnt",
      coords: [
        [3.56360, 98.65980],
        [3.56120, 98.65840],
        [3.55920, 98.65760],
        [3.55800, 98.65850]
      ]
    },
    {
      id: "TRF-06",
      roadName: "Jl. Bioteknologi (Klaster Vokasi & Pertanian)",
      status: "smooth",
      statusLabel: "Bebas Hambatan",
      speedKmH: 30,
      color: "#22c55e",
      description: "Kawasan riset kampus, pepohonan rindang dengan sirkulasi kendaraan sangat teratur.",
      lengthKm: "0.8 km",
      delayMinutes: "0 mnt",
      coords: [
        [3.55850, 98.65420],
        [3.55930, 98.65640],
        [3.55800, 98.65850]
      ]
    }
  ],

  // Simulasi Posisi Armada Bus LinUS & E-Shuttle Real-Time di Kampus USU
  liveVehicles: [
    {
      id: "BUS-LIN01",
      routeId: "LIN-01",
      label: "LinUS-01 (Isuzu ELF Biru USU)",
      type: "bus",
      speed: "24 km/h",
      status: "Aktif Melayani",
      occupancy: "65% (Tersedia Kursi)",
      nextStop: "Halte Auditorium & Biro Rektor",
      etaToNext: 2,
      currentCoordIndex: 2,
      currentCoord: [3.56460, 98.65600]
    },
    {
      id: "BUS-LIN02",
      routeId: "LIN-01",
      label: "LinUS-02 (Hino Dutro Kuning Emas)",
      type: "bus",
      speed: "20 km/h",
      status: "Aktif Melayani",
      occupancy: "80% (Sisa 4 Kursi)",
      nextStop: "Halte Fakultas Teknik (FT USU)",
      etaToNext: 3,
      currentCoordIndex: 7,
      currentCoord: [3.56168, 98.65634]
    },
    {
      id: "BUS-LIN03",
      routeId: "LIN-02",
      label: "LinUS-03 (Klaster Sains Hijau)",
      type: "bus",
      speed: "18 km/h",
      status: "Aktif Melayani",
      occupancy: "50% (Banyak Kursi Kosong)",
      nextStop: "Halte Fakultas Farmasi & Fasilkom",
      etaToNext: 2,
      currentCoordIndex: 5,
      currentCoord: [3.56080, 98.65370]
    },
    {
      id: "BUS-LIN04",
      routeId: "LIN-03",
      label: "LinUS-04 (Klaster Sosiohumaniora Ungu)",
      type: "bus",
      speed: "25 km/h",
      status: "Aktif Melayani",
      occupancy: "70%",
      nextStop: "Halte FEB & Gedung B FISIP",
      etaToNext: 1,
      currentCoordIndex: 3,
      currentCoord: [3.55800, 98.65850]
    },
    {
      id: "EV-SHUTTLE01",
      routeId: "EV-USU",
      label: "E-Shuttle 01 (Mobil Listrik Wuling EV Mini)",
      type: "angkot",
      speed: "16 km/h",
      status: "Eco Shuttle Aktif",
      occupancy: "60% (Kapasitas 10 Org)",
      nextStop: "Halte Perpustakaan & Pendopo",
      etaToNext: 3,
      currentCoordIndex: 3,
      currentCoord: [3.56120, 98.65840]
    }
  ],

  // Live Peringatan / Info Bus Kampus USU
  alerts: [
    {
      type: "info",
      tag: "GRATIS CIVITAS",
      text: "Layanan Bus LinUS (Lintas USU) gratis 100% untuk mahasiswa & dosen dengan menunjukkan KTM aktif.",
      time: "Baru saja"
    },
    {
      type: "warning",
      tag: "INFO GERBANG",
      text: "Pintu 1 Jl. Dr. Mansyur terpantau padat antrean. Mahasiswa disarankan menggunakan akses Pintu 4 atau Pintu 2.",
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
      text: "E-Shuttle Listrik beroperasi di rute Auditorium - Perpustakaan - Farmasi - Fakultas Teknik.",
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
    if (route.id === "LIN-01") destName = "Pintu 1 & Auditorium USU";
    else if (route.id === "LIN-02") destName = "RS USU & Klaster Sains";
    else if (route.id === "LIN-03") destName = "FEB & Pendopo Pancasila";
    else if (route.id === "EV-USU") destName = "Perpustakaan - Fak. Teknik";

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
