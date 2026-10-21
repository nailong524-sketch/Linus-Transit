# 🚦 TransInfo - Aplikasi Transportasi Umum & Pemantau Kemacetan

**TransInfo** adalah prototipe aplikasi web interaktif modern yang dirancang untuk menjawab permasalahan ketergantungan kendaraan pribadi dan minimnya keterbukaan informasi transportasi publik. 

Aplikasi ini menyajikan visualisasi rute transit terpadu (TransJakarta, MRT, Mikrotrans/Angkot, KRL), estimasi waktu tempuh, jadwal kedatangan armada (ETA), serta pemantauan kondisi kemacetan jalan dengan indikator warna visual (*traffic color coding*).

---

## ✨ Fitur Utama

1. **🗺️ Peta Interaktif Multimoda (Leaflet.js + OpenStreetMap)**
   - Peta digital dengan navigasi mulus, penanda halte/stasiun kategori visual (*Bus, MRT, Angkot/Mikrotrans, Kereta*).
   - Menampilkan detail fasilitas halte (Musholla, Mesin Tap-In, Ramah Difabel, Skybridge).
   - Fitur *Pusatkan ke Lokasi Saya* (Geolocation).

2. **🧭 Perencana Perjalanan & Rekomendasi Rute (Trip Planner)**
   - Pengguna memilih titik keberangkatan dan tujuan (atau memilih langsung dari klik pada peta).
   - Fitur tukar arah (*Swap origin-destination*).
   - Filter moda: *Semua Moda, Bus TransJakarta, MRT Bebas Macet, Mikrotrans Feeder*.
   - Menghitung waktu tempuh estimasi, biaya tarif perjalanan, jumlah transit, serta instruksi bertahap (*step-by-step transit itinerary*).
   - Menyorot rute terpilih di atas peta secara visual (*polyline path highlight*).

3. **🚦 Pemantauan Kemacetan Real-Time (Color-Coded Traffic Layer)**
   - **🟢 Hijau (Lancar):** Kecepatan > 35 km/jam, arus bebas hambatan.
   - **🟡 Kuning (Padat Merayap):** Kecepatan 15 – 35 km/jam, antrean lampu merah / simpang.
   - **🔴 Merah (Macet Total):** Kecepatan < 15 km/jam, hambatan proyek drainase / insiden kendaraan.
   - Ticker berita peringatan lalu lintas berjalan (*Live Traffic Alerts*).
   - Daftar ruas titik macet (*Hotspots*) lengkap dengan penyebab keterlambatan dan tombol langsung zoom ke jalan tersebut.

4. **⏱️ Papan Jadwal Digital & Estimasi Tiba (Digital Arrival Board)**
   - Menampilkan armada yang sedang mendekati halte tertentu lengkap dengan kode rute, nama terminus, perkiraan menit tiba (ETA), dan jadwal berikutnya.
   - Simulasi pergerakan armada GPS secara langsung di peta (*Live GPS Radar Tracker*).

5. **💳 Panduan Tarif & Integrasi Multimoda**
   - Ringkasan tarif per moda dan integrasi JakLingko.
   - Petunjuk metode pembayaran non-tunai (Kartu Uang Elektronik & QRIS).

---

## 📁 Struktur Berkas

```
TransInfo/
├── index.html       # Struktur antarmuka web, sidebar tab, header, & kontainer peta
├── style.css        # Tata letak responsif modern, tema dark dashboard, & animasi
├── data.js          # Dataset halte, rute transit, data kemacetan jalan, & armada live
├── app.js           # Logika Leaflet map, algoritma pencari rute, & simulasi GPS
└── README.md        # Panduan dokumentasi lengkap & langkah pengembangan
```

---

## 🚀 Cara Menjalankan Website

Aplikasi ini dibuat menggunakan standar **HTML5, CSS3, dan Vanilla JavaScript murni**, sehingga **tidak memerlukan instalasi compiler atau dependensi tambahan**.

### Metode 1: Menggunakan Browser Langsung
1. Buka folder proyek di File Explorer komputer Anda.
2. Klik ganda (*double-click*) file `index.html`.
3. Website akan langsung terbuka di peramban favorit Anda (Google Chrome, Microsoft Edge, Mozilla Firefox, dll.).

### Metode 2: Menggunakan Visual Studio Code (VS Code)
1. Buka folder `TransInfo` di VS Code: `File` -> `Open Folder...`.
2. Jika memiliki ekstensi **Live Server**, klik kanan pada `index.html` dan pilih **"Open with Live Server"**.
3. Website akan terbuka di alamat lokal `http://127.0.0.1:5500`.

---

## 🛠️ Panduan Integrasi Masa Depan (Versi Lanjutan)

Ketika ingin mengembangkan aplikasi ini menjadi sistem produksi skala besar:

| Kebutuhan | Rekomendasi Solusi / Teknologi |
| :--- | :--- |
| **Data Kemacetan Riil** | Mengintegrasikan API pihak ketiga seperti *TomTom Traffic API*, *Google Directions & Traffic Layer API*, atau *HERE Maps*. |
| **Routing Jalan Dinamis** | Menggunakan *OpenRouteService API* atau *OSRM (Open Source Routing Machine)* untuk menghitung rute belokan demi belokan otomatis. |
| **GPS Armada Nyata** | Menghubungkan protokol pelacak kendaraan seperti *Traccar GPS Gateway* atau data GTFS-Realtime dari operator bus kota. |
| **Backend & Database** | *Node.js (Express / NestJS)* atau *Python (FastAPI)* dengan database *PostgreSQL + PostGIS* untuk query spasial titik terdekat. |

---

*Dibuat untuk mempermudah mobilitas masyarakat dan mendorong pemanfaatan transportasi publik yang efisien dan ramah lingkungan.*
