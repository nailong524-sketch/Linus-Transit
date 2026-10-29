# 🚍 Linus Transit - Sistem Navigasi & Peta Rute Bus Kampus Universitas Sumatera Utara (USU)

[![Website Status](https://img.shields.io/badge/Website-Online-10b981?style=for-the-badge&logo=vercel)](https://linus-usu.vercel.app/)
[![PWA Ready](https://img.shields.io/badge/PWA-Ready-0284c7?style=for-the-badge&logo=pwa)](https://linus-usu.vercel.app/)
[![Google Maps](https://img.shields.io/badge/Google%20Maps-Integrated-ea4335?style=for-the-badge&logo=google-maps)](https://linus-usu.vercel.app/)
[![USU Medan](https://img.shields.io/badge/Universitas%20Sumatera%20Utara-Kampus%20Padang%20Bulan-059669?style=for-the-badge)](https://usu.ac.id)

**Linus Transit** adalah aplikasi web interaktif navigasi dan peta transportasi bus kampus digital untuk **Universitas Sumatera Utara (USU) - Kampus Padang Bulan, Medan**.

Aplikasi ini dirancang responsif dan ringan agar dapat diakses oleh siapa saja dengan lancar melalui **Smartphone (Android & iOS)**, **Tablet**, maupun **Laptop / Komputer** dari mana saja melalui jaringan internet.

---

## 🌐 Tautan Resmi (Live Deployment)

Website resmi Linus Transit telah online dan dapat diakses langsung oleh civitas akademika serta masyarakat umum melalui:

🔗 **[https://linus-usu.vercel.app/](https://linus-usu.vercel.app/)**

---

## 📱 Aksesibilitas Multi-Platform & Instalasi PWA

### 1. Akses Melalui HP / Smartphone (Android & iOS)
- Buka browser HP Anda (**Google Chrome**, **Safari**, atau **Firefox**).
- Kunjungi tautan: **`https://linus-usu.vercel.app/`**
- Atau **Scan QR Code** instan yang tersedia langsung pada modal *"Buka di HP"* di bagian atas antarmuka aplikasi.

### 2. Memasang Aplikasi ke Layar Utama HP (Progressive Web App / PWA)
Linus Transit dirancang dengan standar **PWA** modern (`manifest.json` dan `sw.js` Network-First Online Priority), sehingga dapat diinstal layaknya aplikasi Play Store atau App Store:
- **Android (Google Chrome):**
  1. Buka [https://linus-usu.vercel.app/](https://linus-usu.vercel.app/) di Google Chrome.
  2. Ketuk tombol menu titik tiga (**⋮**) di sudut kanan atas.
  3. Pilih **"Tambahkan ke Layar Utama"** atau **"Instal Aplikasi"**.
  4. Ikon **Linus Transit** akan otomatis muncul di layar utama HP Anda dan selalu berstatus ONLINE.
- **iPhone / iPad (Safari):**
  1. Buka [https://linus-usu.vercel.app/](https://linus-usu.vercel.app/) di browser Safari.
  2. Ketuk tombol **Bagikan (Share / ikon kotak dengan panah ke atas)** di bilah bawah browser.
  3. Gulir ke bawah dan pilih **"Tambah ke Layar Utama" (Add to Home Screen)**.
  4. Ketuk **Tambah**.

### 3. Akses Melalui Laptop / Komputer
Buka browser desktop pilihan Anda (Google Chrome, Microsoft Edge, Mozilla Firefox, Brave, Safari, Opera) dan arahkan ke [https://linus-usu.vercel.app/](https://linus-usu.vercel.app/). Tampilan aplikasi secara otomatis menyesuaikan dengan layar besar, lengkap dengan panel navigasi samping (sidebar), perencana perjalanan, dan peta satelit interaktif layar penuh.

---

## 📍 Wilayah Cakupan: Kampus USU Padang Bulan, Medan

* **Koordinat Pusat Kampus:** `3.561676, 98.6563423`
* **Gerbang Utama & Akses Jalan:**
  * Pintu 1 & Pintu 2 (Jl. Dr. Mansyur)
  * Pintu 3 & Pintu 4 (Jl. Jamin Ginting / Jl. Dr. Sumarsono)
  * Jl. Almamater, Jl. Tri Dharma, Jl. Prof. Maas, Jl. Bioteknologi, Jl. Universitas
* **Landmark Penting Kampus:** Biro Rektorat USU, Auditorium USU, Rumah Sakit USU (RS USU), Gelanggang Mahasiswa, Stadion Mini USU, Perpustakaan Pusat & Danau USU, Kompleks 15 Fakultas Terpadu.

---

## 🚏 8 Halte Resmi Linus Transit USU (Urutan Rute 1 s.d 8)

| No | Kode Halte | Nama Halte Resmi | Lokasi Jalan & Fasilitas Terdekat |
| :-: | :--- | :--- | :--- |
| **1** | `HLT-01` | **Halte Linus Transit Pintu 1** | Jl. Universitas / Gerbang Utama Jl. Dr. Mansyur (Akses RS USU & F. Kedokteran Gigi) |
| **2** | `HLT-02` | **Halte Linus Transit Gelanggang Mahasiswa** | Jl. Universitas (Pusat Kegiatan Mahasiswa, Bank, & Kuliner Mahasiswa) |
| **3** | `HLT-03` | **Halte Hukum** | Jl. Universitas / Akses Pintu Sumber (Fakultas Hukum USU) |
| **4** | `HLT-04` | **Halte FISIP USU** | Jl. Dr. A. Sofian (Fakultas Ilmu Sosial dan Ilmu Politik) |
| **5** | `HLT-05` | **Halte FEB USU** | Jl. Prof. Hanafiah / Depan Gedung Anwar Karim (Fakultas Ekonomi dan Bisnis) |
| **6** | `HLT-06` | **Halte FMIPA USU** | Jl. Bioteknologi / Depan Parkir Unit 2 FMIPA & Program Doktor Matematika |
| **7** | `HLT-07` | **Halte Fakultas Vokasi** | Jl. Tri Dharma / Depan Kompleks Fakultas Vokasi USU |
| **8** | `HLT-08` | **Halte Linus Transit Pintu 4** | Jl. Tri Dharma / Depan Parkiran Stadion Mini & Gerbang Jl. Jamin Ginting |

---

## 🚌 Koridor Rute Linus Transit

| Koridor | Nama Rute | Klaster yang Dilayani | Indikator |
| :---: | :--- | :--- | :---: |
| **LIN-1** | **Linus Transit Koridor 1** | Lingkar Penuh Berurutan (Pintu 1 – Gelanggang – Hukum – FISIP – FEB – FMIPA – Vokasi – Pintu 4) | 🔵 Biru Langit (`#0284c7`) |
| **LIN-2** | **Linus Transit Koridor 2** | Klaster Sains & Teknologi (Pintu 1 – Gelanggang – FMIPA – Vokasi – Pintu 4) | 🟢 Hijau Emerald (`#10b981`) |
| **LIN-3** | **Linus Transit Koridor 3** | Klaster Sosio-Humaniora (Pintu 1 – Gelanggang – Hukum – FISIP – FEB – Vokasi – Pintu 4) | 🟣 Ungu Violet (`#8b5cf6`) |
| **EV-USU**| **USU E-Shuttle** | Mobil Listrik Eco Kampus (FEB – FMIPA – Vokasi – Pintu 4) | 🔷 Cyan Cerah (`#06b6d4`) |

---

## ✨ Fitur-Fitur Utama

1. **🗺️ Peta Interaktif Kampus USU Beresolusi Tinggi (Leaflet.js + Google Maps Tile API)**
   - Peta digital berpusat di Kampus USU Padang Bulan dengan tampilan Google Satelit Hybrid foto udara nyata.
   - Pilihan layer satelit lengkap: **Google Satelit Hybrid**, **Google Peta Jalan (Roadmap)**, **Google Satelit Murni**, **Google Terrain**, **Esri Satellite**, dan **OpenStreetMap**.
   - 8 Penanda Halte Resmi terverifikasi titik koordinat Google Maps dengan popup informasi fasilitas & tautan langsung *"Buka di Google Maps"*.
   - Toggle tombol kontrol cepat: Rute Koridor, Penanda Halte, Label Nama Halte, Pusatkan Kampus, dan Lokasi Saya (GPS Geolocation).

2. **🧭 Perencana Rute Bus Kampus (Campus Trip Planner)**
   - Pilih halte keberangkatan dan halte tujuan di lingkungan kampus USU.
   - Algoritma pencarian menghitung jalur optimal langsung maupun rute transit terpadu.
   - Menampilkan perkiraan durasi perjalanan, jumlah perhentian halte, instruksi arah bertahap, dan visualisasi sorot polyline bercahaya (*glow polyline highlight*).
   - Tarif: **100% Gratis Rp 0** dengan menunjukkan Kartu Tanda Mahasiswa (KTM) / Kartu Civitas Akademika USU.

3. **⏱️ Papan Jadwal Digital & Estimasi Tiba Armada (Departure Board)**
   - Menampilkan armada yang sedang melintas di tiap halte, kode koridor, tujuan akhir, perkiraan menit tiba (ETA), dan jadwal berikutnya.
   - Jam digital sinkron real-time WIB dan indikator status operasional armada bus.

4. **📖 Panduan & Tata Tertib Linus Transit USU**
   - Ketentuan gratis dengan Kartu Tanda Mahasiswa (KTM).
   - Tata cara pintu masuk: **Mahasiswa Pria naik melalui pintu depan**, **Mahasiswi Wanita naik melalui pintu belakang**.
   - Jam operasional: **Senin – Jumat pukul 07.00 – 17.00 WIB**.
   - Mendukung inisiatif USU Green Campus ramah lingkungan dan bebas polusi kendaraan pribadi.

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

## 🚀 Cara Menjalankan Secara Lokal di Komputer

Aplikasi ini dibangun menggunakan arsitektur web modern murni (**HTML5, CSS3 murni, dan Vanilla JavaScript**) tanpa memerlukan compiler atau server backend yang rumit.

### Opsi 1: Menjalankan dengan Python Server
```bash
python -m http.server 3000
```
Buka browser di: `http://localhost:3000`

### Opsi 2: Menggunakan Live Server di VS Code
1. Buka folder proyek di VS Code.
2. Klik kanan pada file `index.html` -> Pilih **"Open with Live Server"**.
3. Website akan otomatis terbuka di browser pada alamat `http://127.0.0.1:5500`.

### Opsi 3: Buka Langsung File HTML
Klik ganda file `index.html` untuk langsung membukanya di browser Google Chrome, Edge, atau Firefox.

---

## ☁️ Deployment Otomatis ke Vercel

Proyek ini telah dikonfigurasi dengan `vercel.json` dan terhubung langsung ke repositori GitHub. Setiap pembaruan kode pada branch `main` akan di-build dan di-deploy secara otomatis ke domain produksi:

👉 **[https://linus-usu.vercel.app/](https://linus-usu.vercel.app/)**

---

*Dikembangkan untuk mendukung kemudahan mobilitas civitas akademika Universitas Sumatera Utara (USU) secara efisien, teratur, dan ramah lingkungan.*
