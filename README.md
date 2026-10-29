# 🚍 Linus Transit - Sistem Navigasi & Peta Rute Bus Kampus Universitas Sumatera Utara (USU)

**Linus Transit** adalah aplikasi web interaktif navigasi transportasi bus kampus digital untuk **Universitas Sumatera Utara (USU) - Kampus Padang Bulan, Medan**.

Aplikasi ini memetakan rute perjalanan bus kampus, titik perhentian halte/Zona Bus USU di seluruh fakultas, direktori halte interaktif, pemantauan simulasi armada bus GPS real-time, serta panduan tata tertib transportasi civitas akademika USU.

---

## 📍 Wilayah Cakupan: Kampus USU Padang Bulan, Medan
* **Koordinat Pusat Kampus:** `3.561676, 98.6563423`
* **Jalan Utama Sekitar:** Jl. Dr. Mansyur (Pintu 1 & Pintu 2), Jl. Jamin Ginting / Jl. Dr. Sumarsono (Pintu 3 & Pintu 4), Jl. Almamater, Jl. Tri Dharma, Jl. Prof. Maas, Jl. Universitas.
* **Fasilitas Utama:** Biro Rektorat & Auditorium USU, Rumah Sakit USU (RS USU), Perpustakaan Pusat & Danau USU, Gelanggang Mahasiswa & Stadion Mini, 15 Fakultas Terpadu.

---

## ✨ Fitur Utama

1. **🗺️ Peta Interaktif Kampus USU (Leaflet.js + Google Maps Satelit Hybrid & API Key Resmi)**
   - Peta digital detail berpusat di Kampus Padang Bulan dengan tampilan Google Satelit Hybrid foto udara nyata.
   - **Terhubung Google Maps Platform API Resmi** (dikonfigurasi aman via `config.js`, terintegrasi server tile Google Satelit Hybrid & Google Maps JavaScript SDK).
   - Pilihan layer satelit lengkap: Google Satelit Hybrid, Google Peta Jalan (Roadmap), Google Satelit Murni, Google Medan (Terrain), Esri Satellite, dan OpenStreetMap.
   - **8 Penanda Halte Resmi / Zona Bus USU Terverifikasi Google Maps** (Halte Linus Transit Pintu 1, Halte Linus Transit Gelanggang Mahasiswa, Halte Linus Transit Pintu 4, Halte FMIPA, Halte Fakultas Vokasi, Halte FEB, Halte FISIP, dan Halte Hukum).
   - Label nama halte tampil bergaya Google Maps langsung di atas peta satelit (dapat di-toggle dengan tombol label).
   - Link langsung *"Buka di Google Maps"* pada setiap popup halte untuk verifikasi titik koordinat.
   - Tab khusus **Direktori Halte Linus Transit** di sidebar dengan fitur pencarian instan dan tombol sorot ke peta.
   - Pintasan Cepat (*Quick Landmark Jump*) ke titik-titik krusial kampus.
   - Tombol toggle layer: Rute Linus Transit, Halte Bus, Label Halte, Pusatkan Kampus, Geolocation Saya.

2. **🧭 Perencana Rute Bus Kampus (Campus Trip Planner)**
   - Pengguna memilih halte asal dan tujuan di lingkungan kampus USU.
   - Algoritma pencari rute langsung maupun rute transit terpadu (via Hub Biro Rektor / Perpustakaan).
   - Menghitung estimasi waktu tempuh, jumlah transit halte, instruksi arah bertahap, dan visualisasi jalur polyline bersinar (*active route polyline highlight*).
   - Tarif: **100% Gratis Rp 0** untuk civitas akademika dengan menunjukkan KTM aktif.

3. **⏱️ Papan Jadwal Digital & Estimasi Tiba Armada (Digital Departure Board)**
   - Menampilkan armada yang sedang melintas di tiap halte lengkap dengan kode rute, terminus, perkiraan menit tiba (ETA), dan jadwal berikutnya.
   - **Pelacakan GPS Bus Kampus:** Disiapkan untuk integrasi perangkat GPS real-time bus kampus USU (status saat ini: standby dinonaktifkan sementara menunggu data GPS asli).

4. **📖 Panduan & Tata Tertib Linus Transit USU**
   - Ketentuan gratis dengan Kartu Tanda Mahasiswa (KTM).
   - Tata cara pintu masuk: **Mahasiswa Pria naik melalui pintu depan**, **Mahasiswi Wanita naik melalui pintu belakang**.
   - Jam operasional: **Senin – Jumat pukul 07.00 – 17.00 WIB**.
   - Inisiatif USU Green Campus bebas emisi.

---

## 🚌 8 Halte Resmi Linus Transit USU (Urutan Rute 1 s.d 8)

1. **Halte 1 (`HLT-01`):** Halte Linus Transit Pintu 1 (Jl. Universitas / Gerbang Utama Jl. Dr. Mansyur)
2. **Halte 2 (`HLT-02`):** Halte Linus Transit Gelanggang Mahasiswa (Jl. Universitas)
3. **Halte 3 (`HLT-03`):** Halte Hukum (Jl. Universitas / Pintu Sumber)
4. **Halte 4 (`HLT-04`):** Halte FISIP USU (Jl. Dr. A. Sofian)
5. **Halte 5 (`HLT-05`):** Halte FEB USU (Jl. Prof. Hanafiah / Depan Anwar Karim)
6. **Halte 6 (`HLT-06`):** Halte FMIPA USU (Jl. Bioteknologi / Depan Parkir Unit 2 FMIPA & Program Doktor Matematika USU)
7. **Halte 7 (`HLT-07`):** Halte Fakultas Vokasi (Jl. Tri Dharma / Depan Kompleks Fakultas Vokasi USU)
8. **Halte 8 (`HLT-08`):** Halte Linus Transit Pintu 4 (Jl. Tri Dharma / Depan Parkiran Stadion Mini USU)

---

## 🚌 Rute Koridor Linus Transit

| Koridor | Nama Rute | Klaster yang Dilayani | Warna Indikator |
| :--- | :--- | :--- | :--- |
| **LIN-1** | Linus Transit Koridor 1 | Lingkar Penuh Berurutan (Pintu 1 – Gelanggang – Hukum – FISIP – FEB – FMIPA – Vokasi – Pintu 4) | Biru Langit (`#0284c7`) |
| **LIN-2** | Linus Transit Koridor 2 | Klaster Sains & Teknologi (Pintu 1 – Gelanggang – FMIPA – Vokasi – Pintu 4) | Hijau Emerald (`#10b981`) |
| **LIN-3** | Linus Transit Koridor 3 | Klaster Sosio-Humaniora (Pintu 1 – Gelanggang – Hukum – FISIP – FEB – Vokasi – Pintu 4) | Ungu Violet (`#8b5cf6`) |
| **EV-USU**| USU E-Shuttle | Mobil Listrik Eco Kampus (FEB – FMIPA – Vokasi – Pintu 4) | Cyan Cerah (`#06b6d4`) |

---

## 🔐 Konfigurasi Kunci API (Aman untuk GitHub)

Demi menjaga keamanan kunci API dan mencegah peringatan kebocoran rahasia dari GitHub Secret Scanning, kunci API tidak dimasukkan langsung ke repositori publik:

1. **Salin template konfigurasi:**
   ```bash
   cp config.example.js config.js
   ```
2. **Masukkan Google Maps Platform API Key:**
   Buka file `config.js` dan masukkan API Key Anda:
   ```javascript
   window.ENV_CONFIG = {
     GOOGLE_MAPS_API_KEY: "AIzaSy..."
   };
   ```
3. **Keamanan Otomatis:**
   File `config.js` sudah didaftarkan pada `.gitignore` sehingga tidak akan ikut ter-upload saat melakukan `git push` ke GitHub. Jika `config.js` tidak diisi, website tetap dapat berjalan dengan peta satelit & peta dasar bawaan.

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
