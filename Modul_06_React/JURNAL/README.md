# Aplikasi Manajemen Peserta Praktikum

## Deskripsi
Aplikasi Manajemen Peserta Praktikum merupakan aplikasi berbasis React yang digunakan untuk mengelola data peserta praktikum, meliputi nama, NIM, kelas, dan status kehadiran.

## Teknologi
- React
- Vite
- JavaScript
- HTML
- CSS

## Fitur Aplikasi
- Menampilkan ringkasan total peserta, jumlah peserta hadir, dan jumlah peserta belum hadir.
- Menambahkan peserta praktikum.
- Memvalidasi nama peserta minimal 3 karakter.
- Memvalidasi NIM yang terdiri dari tepat 8 digit.
- Mencegah penambahan peserta dengan NIM duplikat.
- Mengedit data peserta.
- Menghapus data peserta.
- Mengubah status kehadiran peserta.
- Mencari peserta berdasarkan nama atau NIM.
- Memfilter peserta berdasarkan kelas.
- Menampilkan pesan ketika hasil pencarian kosong.
- Memperbarui ringkasan jumlah peserta secara otomatis.

## Persyaratan
Pastikan Node.js dan npm telah terpasang di komputer.

## Cara Instalasi
Buka terminal pada folder proyek, kemudian jalankan:

```bash
npm install
```

## Cara Menjalankan Aplikasi
Jalankan perintah:

```bash
npm run dev
```

Buka alamat lokal yang ditampilkan pada terminal di browser.

## Build Produksi
Untuk memeriksa dan membangun aplikasi untuk produksi, jalankan:

```bash
npm run build
```

Build aplikasi telah berhasil dijalankan tanpa error.

## Dokumentasi

Screenshot hasil pengujian aplikasi disimpan dalam folder `dokumentasi`, meliputi:

- `tampilan awal.jpeg` — tampilan awal aplikasi.
- `tampilan tambah.jpeg` — hasil penambahan peserta.
- `tampilan edit.jpeg` — hasil pengeditan peserta.
- `tampilan cari.jpeg` — hasil pencarian peserta.
- `tampilan kosong.jpeg` — kondisi ketika pencarian tidak menemukan peserta.
