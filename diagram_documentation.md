# 📊 Panduan Lengkap Diagram & Notasi (Mermaid & PlantUML)

Dokumen ini berisi kumpulan contoh diagram dan notasi data yang didukung oleh Mermaid dan PlantUML, lengkap dengan penjelasan detail fungsinya.

---

## 🏗️ 1. Diagram UML Dasar

### A. Sequence Diagram (Mermaid)
Digunakan untuk memvisualisasikan urutan interaksi antar objek dalam rentang waktu tertentu.

```mermaid
sequenceDiagram
    participant U as User
    participant A as App
    participant S as Server
    
    U->>A: Buka Aplikasi
    A->>S: Request Data Hadits
    S-->>A: Kirim JSON Data
    A-->>U: Tampilkan Hadits
```

### B. Class Diagram (Mermaid)
Menjelaskan struktur sistem dengan menunjukkan kelas, atribut, metode, dan hubungan antar objek.

```mermaid
classDiagram
    class Hadith {
        +int number
        +string arab
        +string id
        +fetch()
    }
    class Book {
        +string name
        +int available
    }
    Hadith --> Book : belongs to
```

### C. Use Case Diagram (PlantUML)
Menggambarkan interaksi antara aktor (pengguna) dengan sistem.

```plantuml
@startuml
left to right direction
actor Pengguna
rectangle "Sistem IbadahKu" {
  Pengguna -- (Baca Al-Quran)
  Pengguna -- (Lihat Jadwal Salat)
  Pengguna -- (Cari Hadits)
}
@enduml
```

### D. Activity Diagram (PlantUML - Legacy & New)
Menggambarkan alur kerja (workflow) atau aliran kontrol dalam sistem.

```plantuml
@startuml
start
:User buka menu Hadits;
if (Internet tersedia?) then (ya)
  :Fetch dari API;
else (tidak)
  :Load Fallback Lokal;
endif
:Tampilkan Hadits;
stop
@enduml
```

---

## 🛠️ 2. Diagram Teknis & Arsitektur

### A. Component & Deployment Diagram (PlantUML)
**Component**: Menunjukkan unit kode pembentuk sistem.
**Deployment**: Menunjukkan konfigurasi fisik perangkat keras dan perangkat lunak.

```plantuml
@startuml
package "Mobile App" {
  [Next.js UI] -- [Capacitor Engine]
}
node "Handset" {
  [Android OS]
}
@enduml
```

### B. Network Diagram (nwdiag - PlantUML)
Digunakan untuk memetakan infrastruktur jaringan.

```plantuml
@nwdiag
{
  network DMZ {
    address = "210.x.x.x/24"
    web01 [address = "210.x.x.1"];
    web02 [address = "210.x.x.2"];
  }
  network Internal {
    web01;
    web02;
    db01 [address = "172.x.x.1"];
  }
}
```

### C. Entity Relationship Diagram (Mermaid)
Menunjukkan hubungan antar entitas dalam database (IE Notation).

```mermaid
erDiagram
    USER ||--o{ BOOKMARK : creates
    USER {
        string username
        string email
    }
    BOOKMARK {
        int content_id
        string type
    }
```

---

## 🎨 3. Visualisasi Data & Mockup

### A. JSON & YAML Representation
Data terstruktur untuk pertukaran informasi.

**JSON:**
```json
{
  "book": "Bukhari",
  "number": 1,
  "content": "Innamal a'malu binniyat..."
}
```

**YAML:**
```yaml
app: IbadahKu
version: 1.0.0
features:
  - Quran
  - Hadith
  - Prayer Times
```

### B. UI Mockups (Salt - PlantUML)
Membuat kerangka layar (wireframe) GUI dengan cepat.

```plantuml
@startsalt
{
  [X] Checkbox
  "Input Text "
  ^Dropdown^
  [Button]
  {
    ( ) Radio 1
    (X) Radio 2
  }
}
@endsalt
```

### C. MindMap & WBS (Mermaid)
**Mindmap**: Pemetaan pikiran/ide.
**WBS**: Work Breakdown Structure (Struktur Kerja).

```mermaid
mindmap
  root((IbadahKu))
    Fitur
      Quran
      Hadits
      Zakat
    Teknologi
      Next.js
      Tailwind
      Capacitor
```

---

## 📅 4. Manajemen Proyek & Kronologi

### A. Gantt Chart (Mermaid)
Visualisasi jadwal proyek dan dependensi tugas.

```mermaid
gantt
    title Jadwal Pengembangan App
    dateFormat  YYYY-MM-DD
    section UI Design
    Design Hero Section   :a1, 2026-03-01, 3d
    Design Dashboard      :after a1, 5d
    section Backend
    Integrasi API Hadits  :2026-03-05, 4d
```

### B. Timeline / Chronology (Mermaid)
Menunjukkan urutan peristiwa berdasarkan waktu.

```mermaid
timeline
    title Sejarah Update
    2025 : Rilis Alpha
    2026 : Perbaikan Bug API : Penambahan Fitur Hadits
```

---

## 🔢 5. Notasi Matematika & Diagram Khusus

### A. Mathematics (LaTeX/AsciiMath)
Digunakan untuk rumus zakat atau perhitungan ilmiah lainnya.

$$
Zakat = 2.5\% \times (Harta - Hutang)
$$

### B. Regex Diagram
PlantUML dapat merepresentasikan logika regex melalui diagram State.

```plantuml
@startuml
[*] --> Start
Start --> Uppercase : [A-Z]
Start --> Lowercase : [a-z]
Uppercase --> [*]
Lowercase --> [*]
@enduml
```

### C. Ditaa Diagram
Diagram ASCII yang dirender menjadi gambar grafis.

```plantuml
@startditaa
+--------+   +-------+
|  User  |---|  API  |
+--------+   +-------+
```

---

## 📝 Penjelasan Detail Diagram

1.  **Sequence**: Fokus pada **waktu**. Siapa memanggil siapa dan kapan.
2.  **State**: Fokus pada **status**. Perubahan dari "Loading" ke "Success/Error".
3.  **Salt (GUI)**: Sangat berguna untuk diskusi desain awal tanpa harus coding UI.
4.  **nwdiag**: Penting bagi tim DevOps untuk memahami topologi server.
5.  **Ditaa**: Cocok untuk sketsa cepat bergaya retro namun rapi.
6.  **SDL & Archimate**: Standar industri tinggi untuk spesifikasi telekomunikasi dan arsitektur enterprise besar.
7.  **Timing Diagram**: Fokus pada perubahan pulse/signal (biasanya untuk hardware/IoT).

---
*Dibuat oleh Assistant untuk IbadahKu Project*
