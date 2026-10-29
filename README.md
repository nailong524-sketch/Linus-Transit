# 🚍 Linus Transit - Campus Bus Navigation & Route Map System for the University of North Sumatra (USU)

*Linus Transit* is an interactive web-based application designed for campus bus navigation at the *University of North Sumatra (USU) – Padang Bulan Campus, Medan*.

The application maps campus bus routes and designated bus stops/zones across all faculties. It features an interactive directory of bus stops, real-time simulated GPS fleet tracking, and a guide to transportation policies for the USU academic community.

---

## 📍 Coverage Area: USU Padang Bulan Campus, Medan
* *Campus Center Coordinates:* 3.561676, 98.6563423
* *Surrounding Main Roads:* Jl. Dr. Mansyur (Gate 1 & Gate 2), Jl. Jamin Ginting / Jl. Dr. Sumarsono (Gate 3 & Gate 4), Jl. Almamater, Jl. Tri Dharma, Jl. Prof. Maas, and Jl. Universitas.
* *Key Facilities:* Rectorate Building & USU Auditorium, USU Hospital (RS USU), Central Library & USU Lake, Student Center & Mini Stadium, and 15 integrated faculties.

---

## ✨ Key Features

1. *🗺️ Interactive USU Campus Map (Leaflet.js + Google Satellite Hybrid & Official API Key)*
   - A detailed digital map centered on the Padang Bulan Campus, featuring a Google Satellite Hybrid view with real aerial imagery.
   - *Integrated with the Official Google Maps Platform API* (securely configured via `config.js`, utilizing Google Satellite Hybrid tile servers and the Google Maps JavaScript SDK).
   - Comprehensive map layer options, including: Google Satellite Hybrid, Google Roadmap, Google Satellite, Google Terrain, Esri Satellite, and OpenStreetMap.
   - - *8 Official USU Bus Stop/Zone Markers Verified on Google Maps* (Linus Transit Gate 1, Student Center, Gate 4, Faculty of Mathematics and Natural Sciences (FMIPA), Vocational Faculty, Faculty of Economics and Business (FEB), Faculty of Social and Political Sciences (FISIP), and Faculty of Law).
   - Stop labels are displayed in a Google Maps-style format directly over the satellite map (can be toggled on/off via a label button).
   - "Open in Google Maps" direct link included in each stop's popup for coordinate verification.
   - Dedicated *Linus Transit Stop Directory* tab in the sidebar, featuring instant search and a "highlight on map" function.
   - Quick Landmark Jump shortcuts to key campus locations.
   - Layer toggle buttons: Linus Transit Routes, Bus Stops, Stop Labels, Center on Campus, and My Geolocation.

2. *🧭 Campus Trip Planner*
   - Users select their origin and destination stops within the USU campus area.
   - Route-finding algorithm supports both direct and transit-based routes (via the Rectorate Bureau/Library Hub).
   - Calculates estimated travel time, number of transit stops, step-by-step directions, and provides a glowing polyline visualization of the active route.
   - Fare: *100% Free (IDR 0)* for the academic community upon presentation of a valid student ID (KTM).

3. *⏱️ Digital Departure Board & Estimated Time of Arrival (ETA)*
   - Displays buses currently passing through each stop, including route codes, terminal destinations, estimated arrival time (ETA) in minutes, and upcoming schedules.
   - *Campus Bus GPS Tracking:* Prepared for integration with real-time GPS devices on USU campus buses (current status: standby/temporarily disabled, pending live GPS data).
4. *📖 Linus Transit USU: Guidelines & Rules*
   - Free of charge with a valid Student ID Card (KTM).
   - Boarding procedure: *Male students must board through the front door; female students must board through the rear door*.
   - Operational hours: *Monday – Friday, 07:00 – 17:00 WIB*.
   - Part of the USU Green Campus zero-emissions initiative.
   - ## 🚌 8 Official Linus Transit USU Stops (Route Sequence 1–8)

1. *Stop 1 (HLT-01):* Linus Transit Stop – Gate 1 (Jl. Universitas / Main Gate, Jl. Dr. Mansyur)
2. *Stop 2 (HLT-02):* Linus Transit Stop – Student Center (Jl. Universitas)
3. *Stop 3 (HLT-03):* Law Faculty Stop (Jl. Universitas / "Pintu Sumber" Gate)
4. *Stop 4 (HLT-04):* FISIP USU Stop (Jl. Dr. A. Sofian)
5. *Stop 5 (HLT-05):* FEB USU Stop (Jl. Prof. Hanafiah / In front of Anwar Karim Building)
6. *Stop 6 (HLT-06):* FMIPA USU Stop (Jl. Bioteknologi / In front of FMIPA Unit 2 Parking & Doctoral Program in Mathematics)
7. *Stop 7 (HLT-07):* Vocational Faculty Stop (Jl. Tri Dharma / In front of the Vocational Faculty complex)
8. *Stop 8 (HLT-08):* Linus Transit Stop – Gate 4 (Jl. Tri Dharma / In front of the USU Mini Stadium parking area)

---

## 🚌 Linus Transit Corridor Routes

| Corridor | Route Name | Areas Served | Indicator Color |
| :--- | :--- | :--- | :--- |
| *LIN-1* | Linus Transit Corridor 1 | Full Sequential Loop (Gate 1 – Student Center – Law – FISIP – FEB – FMIPA – Vocational Faculty – Gate 4) | Sky Blue (#0284c7) |
| *LIN-2* | Linus Transit Corridor 2 | Science & Technology Cluster (Gate 1 – Student Center – Faculty of Mathematics & Natural Sciences – Vocational School – Gate 4) | Emerald Green (#10b981) |
| *LIN-3* | Linus Transit Corridor 3 | Socio-Humanities Cluster (Gate 1 – Student Center – Faculty of Law – Faculty of Social & Political Sciences – Faculty of Economics & Business – Vocational School – Gate 4) | Violet Purple (#8b5cf6) |
| *EV-USU*| USU E-Shuttle | Eco-Campus Electric Vehicle (Faculty of Economics & Business – Faculty of Mathematics & Natural Sciences – Vocational School – Gate 4) | Bright Cyan (#06b6d4) |

## 🚀 How to Run the Website

This application is built using *HTML5, pure CSS3, and Vanilla JavaScript* standards, requiring no compilers or complex backend servers.

### Option 1: Open the File Directly
1. Locate the project folder on your computer.
2. Double-click the `index.html` file.
3. Open it using Google Chrome, Microsoft Edge, Mozilla Firefox, etc.

### Option 2: Use Live Server in VS Code
1. Open the project folder in VS Code.
2. Right-click on `index.html` and select *"Open with Live Server"*.
3. The website will run at http://127.0.0.1:5500.

---

Developed to facilitate the mobility of the academic community at the University of North Sumatra (USU) in an efficient, organized, and eco-friendly manner.
