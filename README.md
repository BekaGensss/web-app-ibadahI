# 🌙 IbadahKu - Aplikasi Islami Modern

**IbadahKu** adalah aplikasi Islami modern yang dirancang untuk menemani ibadah harian Anda dengan antarmuka yang elegan, responsif, dan kaya fitur. Dibangun menggunakan teknologi web terbaru (Next.js) dan dikemas sebagai aplikasi Android menggunakan Capacitor JS.

![IbadahKu Preview](public/logo-premium.png)

## ✨ Fitur Utama

- **📖 Al-Qur'an Digital**: Baca Al-Qur'an lengkap dengan terjemahan Bahasa Indonesia dan audio murottal per ayat.
- **🕒 Jadwal Salat Otomatis**: Dilengkapi dengan waktu hitung mundur dan notifikasi adzan yang akurat berdasarkan lokasi Anda.
- **🕌 Notifikasi Adzan**: Pengingat waktu salat yang tetap berfungsi bahkan dalam mode background.
- **📚 Hadits Harian**: Hadits pilihan setiap hari dari berbagai kitab klasik (Bukhari, Muslim, Abu Daud, dll) dengan data fallback lokal.
- **🤲 Doa & Dzikir**: Kumpulan doa harian dan dzikir pagi/petang untuk ketenangan hati.
- **📿 Tasbih Digital**: Alat bantu hitung dzikir yang intuitif dengan getaran feedback.
- **💰 Kalkulator Zakat**: Hitung zakat mal dan zakat fitrah Anda dengan mudah dan akurat.
- **📅 Kalender Hijriah**: Pantau tanggal-tanggal penting Islam sepanjang tahun.
- **🧭 Arah Kiblat**: Kompas penentu arah kiblat yang presisi berbasis sensor perangkat.
- **🌗 Mode Tampilan**: Dukungan penuh untuk mode Gelap (Dark Mode) dan Terang (Light Mode) yang nyaman di mata.

## 🚀 Teknologi yang Digunakan

- **Framework**: [Next.js 15+](https://nextjs.org/) (App Router)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Icon**: [Lucide React](https://lucide.dev/)
- **Mobile Integration**: [Capacitor JS](https://capacitorjs.com/)
- **Runtime**: [Node.js](https://nodejs.org/)

## 🛠️ Cara Instalasi & Pengembangan

### Prasyarat
- Node.js (v18+)
- Android Studio (untuk build APK)

### Langkah-langkah
1. **Clone Repository**
   ```bash
   git clone https://github.com/BekaGensss/web-app-ibadahI.git
   cd web-app-ibadahI
   ```

2. **Instal Dependensi**
   ```bash
   npm install
   ```

3. **Jalankan Mode Development**
   ```bash
   npm run dev
   ```

4. **Build untuk Produksi**
   ```bash
   npm run build
   npx cap sync android
   ```

## 📱 Build APK (Android)

Untuk membuat file `.apk`, pastikan Anda sudah melakukan langkah build di atas, kemudian:
```bash
cd android
./gradlew assembleDebug
```
File APK akan tersedia di folder `android/app/build/outputs/apk/debug/`.

## 📄 Lisensi

Proyek ini dikembangkan oleh **DEV BK**. Semua hak cipta dilindungi.

---
Dikembangkan dengan ❤️ untuk Ummat.
*@2026 DEV BK, IbadahKu*
