# Dairy Farm Attendance System (Mobile App)

## Overview

This project is a **mobile-based attendance system** for dairy farms to track milk delivery to subscribed households using **QR code scanning**. It helps delivery staff mark attendance easily via a **Progressive Web App (PWA) or a Native Mobile App**, eliminating manual record-keeping and reducing errors.

## Features

✅ **QR Code-Based Attendance Marking**

✅ **Mobile App for Delivery Staff (PWA or Native)**

✅ **Google Sheets as a Free Database (Initial MVP)**

✅ **Offline Mode (Syncs Later When Online)**

✅ **Automated Reports & Analytics**

✅ **Push Notifications for Skipped Deliveries (Future Feature)**

✅ **GPS Tracking & Time Logs for Fraud Prevention**

✅ **Multilingual UI for Ease of Use**

✅ **Potential AI-powered Image Verification for Authenticity**

## Workflow

1. **Customer Gets a QR Code**: A unique QR code is placed at each house.
2. **Delivery Staff Scans QR Code**: Using the mobile app, the staff scans the QR code.
3. **Attendance is Logged in Google Sheets**: The app updates delivery status automatically.
4. **Admin Views Reports**: Attendance logs are analyzed for delivery trends & billing.
5. **GPS Location & Timestamp is Stored**: Ensures delivery legitimacy and prevents fraud.

## Technology Stack

### **Phase 1: MVP (Progressive Web App - PWA)**

* **Frontend:** React.js / Next.js
* **QR Scanner:** `react-qr-reader`
* **Backend:** Google Apps Script (Handles attendance updates)
* **Database:** Google Sheets (via Google Sheets API)
* **Hosting:** Free on Vercel / Netlify

### **Phase 2: Native Mobile App**

* **Frontend:** React Native / Flutter
* **QR Scanner:** `react-native-qrcode-scanner`
* **Backend:** Google Firebase Functions (Real-time updates)
* **Database:** Supabase / Firebase Firestore / PostgreSQL
* **Offline Mode:** Stores data locally when the network is unavailable
* **Push Notifications:** Firebase Cloud Messaging (FCM)

## Setup Instructions

### **1. Generate QR Codes**

* Use a free QR code generator (e.g., qr-code-generator.com).
* Encode each QR with a **unique customer ID** linked to the Google Sheet.
* Print and place the QR codes securely (e.g., milk box or letterbox).

### **2. Set Up Google Sheets as a Database**

* Create a Google Sheet with columns:
  * `Customer ID`
  * `Name`
  * `Address`
  * `Subscription Type`
  * `Attendance Logs`
  * `GPS Location`
  * `Timestamp`
* Enable **Google Sheets API** for read/write access.

### **3. Deploy the Web App (PWA)**

* Clone the repository and install dependencies:
  ```sh
  git clone https://github.com/muzammil-13/dairy-attendance-system
  cd dairy-attendance-system
  npm install
  npm run dev
  ```
* Deploy to **Vercel / Netlify** for free hosting.

### **4. Future Upgrade: Native Mobile App**

* Build with React Native or Flutter for Android/iOS.
* Implement **Offline Sync** and **Push Notifications**.
* Transition from Google Sheets to a scalable database like Firebase Firestore or Supabase.

## Future Enhancements

* **AI-powered Demand Forecasting**
* **Customer Dashboard for Delivery History**
* **Automated Monthly Billing System**
* **Fraud Prevention via Image Verification**
* **Advanced Analytics & Insights for Dairy Farms**

## Business Model (Optional for Monetization)

* **Freemium Model:** Basic features free, premium analytics & automation paid.
* **Subscription-Based Model:** Monthly pricing for advanced tracking & billing.
* **White-Label Solution:** Custom version for dairy farms as a SaaS.

## License

This project is open-source and free to use. Contributions are welcome!

