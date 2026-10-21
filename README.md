# 🚍 LinUS - Sistem Navigasi & Peta Rute Bus Kampus Universitas Sumatera Utara (USU)

**LinUS (Lintas USU)** adalah aplikasi web interaktif navigasi transportasi bus kampus digital untuk **Universitas Sumatera Utara (USU) - Kampus Padang Bulan, Medan**.

Aplikasi ini memetakan rute perjalanan bus kampus, titik perhentian halte/Zona Bus USU di seluruh fakultas, pemantauan simulasi armada bus GPS real-time, kondisi kepadatan gerbang masuk luar & jalan internal, serta panduan tata tertib transportasi civitas akademika USU.

---

## 📍 Wilayah Cakupan: Kampus USU Padang Bulan, Medan
* **Koordinat Pusat Kampus:** `3.561676, 98.6563423`
* **Jalan Utama Sekitar:** Jl. Dr. Mansyur (Pintu 1 & Pintu 2), Jl. Jamin Ginting / Jl. Dr. Sumarsono (Pintu 3 & Pintu 4), Jl. Almamater, Jl. Tri Dharma, Jl. Prof. Maas, Jl. Universitas.
* **Fasilitas Utama:** Biro Rektorat & Auditorium USU, Rumah Sakit USU (RS USU), Perpustakaan Pusat & Danau USU, Gelanggang Mahasiswa & Stadion Mini, 15 Fakultas Terpadu.

---

## ✨ Fitur Utama

1. **🗺️ Peta Interaktif Kampus USU (Leaflet.js + OpenStreetMap & CartoDB)**
   - Peta digital detail berpusat di Kampus Padang Bulan dengan batas perimeter visual area kampus.
   - 15 Penanda Halte resmi / Zona Bus USU (Pintu 1, Biro Rektor, RS USU, FK, FKG Pintu 2, Perpustakaan, Gelanggang, Fasilkom-TI, Farmasi, Fakultas Teknik, Pertanian, FEB, FH/FISIP, FIB, Pintu 3/4 Ginting).
   - Pintasan Cepat (*Quick Landmark Jump*) ke titik-titik krusial kampus (Biro Rektor, Fak. Teknik, RS USU, Perpustakaan & Danau, Pintu 1 Mansyur, dll.).
   - Tombol toggle layer: Rute Bus LinUS, Halte Bus, Pantauan Kepadatan Jalan, Pusatkan Kampus, Geolocation Saya.

2. **🧭 Perencana Rute Bus Kampus (Campus Trip Planner)**
   - Pengguna memilih halte asal dan tujuan di lingkungan kampus USU.
   - Algoritma pencari rute langsung maupun rute transit terpadu (via Hub Biro Rektor / Perpustakaan).
   - Menghitung estimasi waktu tempuh, jumlah transit halte, instruksi arah bertahap, dan visualisasi jalur polyline bersinar (*active route polyline highlight*).
   - Tarif: **100% Gratis Rp 0** untuk civitas akademika dengan menunjukkan KTM aktif.

3. **🚦 Pantauan Kondisi Jalan & Gerbang Masuk Kampus**
   - **🟢 Hijau (Lancar Terkendali):** Kecepatan > 25 km/jam, jalur hijau internal kampus dan pedestrian.
   - **🟡 Kuning (Ramai Lancar):** Kecepatan 15 – 25 km/jam, aktivitas penyeberangan mahasiswa (Jl. Almamater FT, dll.).
   - **🔴 Merah (Padat Antrean):** Kecepatan < 15 km/jam, antrean jam sibuk di gerbang luar (Pintu 1 Jl. Dr. Mansyur & Pintu 4 Jl. Jamin Ginting).
   - Ticker berita peringatan lalu lintas kampus secara berkala.

4. **⏱️ Papan Jadwal Digital & Estimasi Tiba Armada (Digital Departure Board)**
   - Menampilkan armada yang sedang melintas di tiap halte lengkap dengan kode rute, terminus, perkiraan menit tiba (ETA), dan jadwal berikutnya.
   - **Simulasi GPS Bus Kampus Real-Time:** Menampilkan armada LinUS-01, LinUS-02, LinUS-03, LinUS-04, dan E-Shuttle Listrik bergerak di rute lintasan masing-masing secara dinamis.

5. **📖 Panduan & Tata Tertib Bus LinUS USU**
   - Ketentuan gratis dengan Kartu Tanda Mahasiswa (KTM).
   - Tata cara pintu masuk: **Mahasiswa Pria naik melalui pintu depan**, **Mahasiswi Wanita naik melalui pintu belakang**.
   - Jam operasional: **Senin – Jumat pukul 07.00 – 17.00 WIB**.
   - Inisiatif USU Green Campus bebas emisi.

---

## 🚌 Rute Koridor Bus LinUS

| Koridor | Nama Rute | Klaster yang Dilayani | Warna Indikator |
| :--- | :--- | :--- | :--- |
| **LIN-1** | LinUS Koridor 1 | Lingkar Utama Kampus (Pintu 1 – Biro Rektor – RS USU – FT – FEB – FIB – Pintu 2) | Biru Langit (`#0284c7`) |
| **LIN-2** | LinUS Koridor 2 | Klaster Sains, Medis & Teknologi (RS USU – FK – Fasilkom-TI – FMIPA – FT – Pertanian) | Hijau Emerald (`#10b981`) |
| **LIN-3** | LinUS Koridor 3 | Klaster Sosio-Humaniora & Gerbang (FKG – FIB – FISIP – FH – FEB – Pintu 3/4 Ginting) | Ungu Violet (`#8b5cf6`) |
| **EV-USU**| USU E-Shuttle | Mobil Listrik Eco Kampus (Biro Rektor – Perpustakaan – Fasilkom-TI – FT – Pintu 4) | Cyan Cerah (`#06b6d4`) |

---

## 🚀 Cara Menjalankan Website

Aplikasi ini dibangun menggunakan standar **HTML5, CSS3 murni, dan Vanilla JavaScript**, tanpa memerlukan compiler atau server backend rumit.

### Opsi 1: Buka File Langsung
1. Buka folder proyek di komputer Anda.
2. Klik ganda file `index.html`.
3. Buka di Google Chrome, Microsoft Edge, Mozilla Firefox, dll.

### Opsi 2: Menggunakan Live Server di VS Code
1. Buka folder proyek di VS Code.
2. Klik kanan pada `index.html` -> Pilih **"Open with Live Server"**.
3. Website akan berjalan di `http://127.0.0.1:5500`.

---

*Dikembangkan untuk mendukung kemudahan mobilitas civitas akademika Universitas Sumatera Utara (USU) secara efisien, teratur, dan ramah lingkungan.*
