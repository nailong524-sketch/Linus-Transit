# 🚍 Linus Transit - Campus Bus Navigation System & Route Map of Universitas Sumatera Utara (USU)

[![Website Status](https://img.shields.io/badge/Website-Online-10b981?style=for-the-badge&logo=vercel)](https://linus-usu.vercel.app/)
[![PWA Ready](https://img.shields.io/badge/PWA-Ready-0284c7?style=for-the-badge&logo=pwa)](https://linus-usu.vercel.app/)
[![Google Maps](https://img.shields.io/badge/Google%20Maps-Integrated-ea4335?style=for-the-badge&logo=google-maps)](https://linus-usu.vercel.app/)
[![USU Medan](https://img.shields.io/badge/Universitas%20Sumatera%20Utara-Padang%20Bulan%20Campus-059669?style=for-the-badge)](https://usu.ac.id)

**Linus Transit** is an interactive web-based campus bus navigation and digital transportation mapping application for **Universitas Sumatera Utara (USU) - Padang Bulan Campus, Medan, Indonesia**.

The application is designed to be responsive and lightweight, allowing anyone to access it smoothly using **smartphones (Android and iOS)**, **tablets**, and **laptops or desktop computers** from anywhere with an internet connection.

---

## 🌐 Official Link (Live Deployment)

The official Linus Transit website is now online and can be accessed directly by the university community and the general public through the following link:

🔗 **[https://linus-usu.vercel.app/](https://linus-usu.vercel.app/)**

---

## 📱 Multi-Platform Accessibility & PWA Installation

### 1. Accessing the Application via Smartphone (Android & iOS)

- Open your smartphone browser (**Google Chrome**, **Safari**, or **Firefox**).
- Visit: **`https://linus-usu.vercel.app/`**
- Alternatively, **scan the QR code** available in the *"Open on Mobile"* modal at the top of the application interface.

### 2. Installing the Application on Your Smartphone's Home Screen (Progressive Web App / PWA)

Linus Transit is designed according to modern **PWA** standards (`manifest.json` and `sw.js` with a Network-First, Online-Priority strategy), allowing it to be installed like an application from the Google Play Store or Apple App Store.

- **Android (Google Chrome):**
  1. Open [https://linus-usu.vercel.app/](https://linus-usu.vercel.app/) in Google Chrome.
  2. Tap the three-dot menu (**⋮**) in the upper-right corner.
  3. Select **"Add to Home screen"** or **"Install app"**.
  4. The **Linus Transit** icon will appear on your smartphone's home screen, providing quick access to the application.

- **iPhone / iPad (Safari):**
  1. Open [https://linus-usu.vercel.app/](https://linus-usu.vercel.app/) in Safari.
  2. Tap the **Share** button (the square icon with an upward arrow) at the bottom of the browser.
  3. Scroll down and select **"Add to Home Screen"**.
  4. Tap **"Add"**.

### 3. Accessing the Application via Laptop / Desktop Computer

Open your preferred desktop browser (Google Chrome, Microsoft Edge, Mozilla Firefox, Brave, Safari, or Opera) and navigate to [https://linus-usu.vercel.app/](https://linus-usu.vercel.app/).

The application automatically adapts to larger screens, featuring a side navigation panel (sidebar), a trip planner, and a full-screen interactive satellite map.

---

## 📍 Coverage Area: USU Padang Bulan Campus, Medan

- **Campus Center Coordinates:** `3.561676, 98.6563423`
- **Main Gates & Road Access:**
  - Gates 1 & 2 (Jl. Dr. Mansyur)
  - Gates 3 & 4 (Jl. Jamin Ginting / Jl. Dr. Sumarsono)
  - Jl. Almamater, Jl. Tri Dharma, Jl. Prof. Maas, Jl. Bioteknologi, and Jl. Universitas
- **Important Campus Landmarks:** USU Rectorate Building, USU Auditorium, USU Hospital (RS USU), Student Center, USU Mini Stadium, Central Library & USU Lake, and the integrated complex of 15 faculties.

---

## 🚏 8 Official Linus Transit Bus Stops at USU (Route Sequence 1–8)

| No. | Bus Stop Code | Official Bus Stop Name | Road Location & Nearby Facilities |
| :---: | :--- | :--- | :--- |
| **1** | `HLT-01` | **Linus Transit Gate 1 Stop** | Jl. Universitas / Main Entrance on Jl. Dr. Mansyur (Access to USU Hospital & Faculty of Dentistry) |
| **2** | `HLT-02` | **Linus Transit Student Center Stop** | Jl. Universitas (Student Activity Center, Banks & Student Food Outlets) |
| **3** | `HLT-03` | **Faculty of Law Stop** | Jl. Universitas / Pintu Sumber Access (USU Faculty of Law) |
| **4** | `HLT-04` | **USU FISIP Stop** | Jl. Dr. A. Sofian (Faculty of Social and Political Sciences) |
| **5** | `HLT-05` | **USU FEB Stop** | Jl. Prof. Hanafiah / In Front of Anwar Karim Building (Faculty of Economics and Business) |
| **6** | `HLT-06` | **USU FMIPA Stop** | Jl. Bioteknologi / In Front of FMIPA Parking Area, Unit 2 & Doctoral Mathematics Program |
| **7** | `HLT-07` | **Faculty of Vocational Studies Stop** | Jl. Tri Dharma / In Front of the USU Faculty of Vocational Studies Complex |
| **8** | `HLT-08` | **Linus Transit Gate 4 Stop** | Jl. Tri Dharma / In Front of the Mini Stadium Parking Area & Gate on Jl. Jamin Ginting |

---

## 🚌 Linus Transit Bus Corridors

| Corridor | Route Name | Service Area | Indicator |
| :---: | :--- | :--- | :---: |
| **LIN-1** | **Linus Transit Corridor 1** | Complete Circular Route (Gate 1 – Student Center – Law – FISIP – FEB – FMIPA – Vocational Studies – Gate 4) | 🔵 Sky Blue (`#0284c7`) |
| **LIN-2** | **Linus Transit Corridor 2** | Science & Technology Cluster (Gate 1 – Student Center – FMIPA – Vocational Studies – Gate 4) | 🟢 Emerald Green (`#10b981`) |
| **LIN-3** | **Linus Transit Corridor 3** | Social Sciences & Humanities Cluster (Gate 1 – Student Center – Law – FISIP – FEB – Vocational Studies – Gate 4) | 🟣 Violet Purple (`#8b5cf6`) |
| **EV-USU** | **USU E-Shuttle** | Eco-Friendly Electric Campus Shuttle (FEB – FMIPA – Vocational Studies – Gate 4) | 🔷 Bright Cyan (`#06b6d4`) |

---

## ✨ Key Features

### 1. 🗺️ High-Resolution Interactive USU Campus Map (Leaflet.js + Google Maps Tile API)

- A digital map centered on USU Padang Bulan Campus, featuring real aerial imagery through Google Satellite Hybrid view.
- Multiple map layers are available: **Google Satellite Hybrid**, **Google Roadmap**, **Google Satellite**, **Google Terrain**, **Esri Satellite**, and **OpenStreetMap**.
- Eight official bus stop markers with Google Maps-verified coordinates, facility information popups, and direct **"Open in Google Maps"** links.
- Quick-access control buttons for bus corridors, bus stop markers, bus stop labels, campus recentering, and **My Location (GPS Geolocation)**.

### 2. 🧭 Campus Bus Route Planner (Campus Trip Planner)

- Select your departure bus stop and destination bus stop within the USU campus.
- A route-search algorithm calculates the optimal direct route or an integrated transfer route.
- Displays estimated travel time, the number of bus stops, step-by-step directions, and a glowing highlighted route polyline (*glow polyline highlight*).
- **Fare: 100% Free (IDR 0)** for passengers presenting a Student Identity Card (KTM) or USU Academic Community Identification Card.

### 3. ⏱️ Digital Departure Board & Fleet Arrival Estimates

- Displays buses currently operating along each route, corridor codes, final destinations, estimated arrival times (ETA), and upcoming departure schedules.
- Features a digital clock synchronized with Western Indonesian Time (WIB) and operational status indicators for the bus fleet.

### 4. 📖 Linus Transit USU Guidelines & Regulations

- Free transportation for eligible passengers presenting a Student Identity Card (KTM).
- Boarding procedures: **Male students board through the front door**, while **female students board through the rear door**.
- Operating hours: **Monday–Friday, 7:00 AM–5:00 PM WIB**.
- Supports the USU Green Campus initiative by promoting environmentally friendly transportation and reducing pollution caused by private vehicles.

---

## 🚀 How to Run the Application Locally on Your Computer

This application is built using a modern, lightweight web architecture (**HTML5, pure CSS3, and Vanilla JavaScript**) without requiring a compiler or a complex backend server.

### Option 1: Run Using Python's HTTP Server

```bash
python -m http.server 3000
```

Open your browser and visit:

`http://localhost:3000`

### Option 2: Use Live Server in VS Code

1. Open the project folder in VS Code.
2. Right-click the `index.html` file and select **"Open with Live Server"**.
3. The website will automatically open in your browser at `http://127.0.0.1:5500`.

### Option 3: Open the HTML File Directly

Double-click `index.html` to open it directly in Google Chrome, Microsoft Edge, or Firefox.

---

## ☁️ Automatic Deployment to Vercel

The project has been configured with `vercel.json` and is directly connected to a GitHub repository. Every code update pushed to the `main` branch will be automatically built and deployed to the production domain:

👉 **[https://linus-usu.vercel.app/](https://linus-usu.vercel.app/)**

---

*Developed to support efficient, organized, and environmentally friendly mobility for the Universitas Sumatera Utara (USU) academic community.*
