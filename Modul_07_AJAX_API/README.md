# Praktikum Modul 07 — AJAX dan Konsumsi API

**Nama:** Radita Putri Nuraini  
**NIM:** 103122400056  
**Mata Kuliah:** Perancangan dan Pemrograman Web

## 1. Deskripsi

Praktikum Modul 07 membahas penerapan AJAX dan konsumsi API menggunakan XMLHttpRequest, Fetch API, React, dan Axios.

Praktikum terdiri dari dua proyek:
- **Soal 01:** Portal Informasi Praktikum menggunakan XMLHttpRequest dan Fetch API.
- **Soal 02:** Aplikasi Registrasi Peserta menggunakan React dan Axios.

## 2. Struktur Pengerjaan

```text
latihan-praktikan/
├── soal-01/
│   ├── index.html
│   ├── app.js
│   └── pengumuman.txt
└── soal-02/
    ├── index.html
    └── app.jsx
```

Dokumentasi screenshot tersedia pada folder `dokumentasi`.

## 3. Cara Menjalankan

1. Pastikan Node.js versi 18 atau lebih baru sudah terpasang.
2. Buka folder paket praktikum yang berisi `JALANKAN.bat`.
3. Jalankan file `JALANKAN.bat` atau perintah `node server.cjs`.
4. Biarkan terminal tetap berjalan.
5. Buka aplikasi melalui browser menggunakan alamat berikut:

**Soal 01**
`http://127.0.0.1:3007/latihan-praktikan/soal-01/`

**Soal 02**
`http://127.0.0.1:3007/latihan-praktikan/soal-02/`

## 4. Implementasi Program

### Soal 01 — AJAX dan Fetch API

Implementasi yang dilakukan:
- Menggunakan XMLHttpRequest secara asynchronous untuk mengambil isi `pengumuman.txt`.
- Memeriksa `readyState` dan status HTTP.
- Menggunakan Fetch API untuk mengambil data dari Mock lokal dan JSONPlaceholder.
- Memeriksa `response.ok` sebelum membaca JSON.
- Menampilkan maksimal tiga peserta beserta email, sumber data, dan jumlah data.
- Menampilkan loading dan pesan error.
- Mempertahankan catatan, hitungan, dan waktu awal selama request berlangsung.

### Soal 02 — React dan Axios

Implementasi yang dilakukan:
- Menggunakan React untuk membangun antarmuka aplikasi.
- Menggunakan `useState` untuk mengelola data peserta, loading, error, input formulir, dan status pengiriman.
- Menggunakan `useEffect` untuk mengambil data saat halaman dibuka dan ketika skenario berubah.
- Menggunakan Axios GET untuk mengambil daftar peserta.
- Menggunakan Axios POST untuk simulasi pendaftaran peserta.
- Menambahkan validasi nama dan email.
- Menangani kondisi berhasil, data kosong, HTTP error, dan timeout.
- Mencegah respons request sebelumnya menimpa hasil pilihan skenario terbaru.

## 5. Laporan Hasil Pengujian

### A. Pengujian Soal 01

| No. | Skenario Pengujian | Hasil Aktual | Status |
|---|---|---|---|
| 1 | Memuat pengumuman menggunakan XMLHttpRequest | Pengumuman berhasil ditampilkan. | Berhasil |
| 2 | Mengubah isi `pengumuman.txt` dan memuat ulang | Isi pengumuman terbaru berhasil ditampilkan. | Berhasil |
| 3 | Mengakses file yang tidak ditemukan | Aplikasi menampilkan HTTP 404. | Berhasil |
| 4 | Mengambil data dari Mock lokal | Tiga peserta beserta email berhasil ditampilkan. | Berhasil |
| 5 | Mengetik catatan dan menambah hitungan saat request berlangsung | Catatan tetap ada, hitungan bertambah menjadi 3, dan waktu awal tidak berubah. | Berhasil |
| 6 | Mengambil data dari JSONPlaceholder | Tiga peserta beserta email berhasil ditampilkan. | Berhasil |

### B. Pengujian Soal 02

| No. | Skenario Pengujian | Hasil Aktual | Status |
|---|---|---|---|
| 1 | GET otomatis saat halaman dibuka | Tiga peserta berhasil ditampilkan. | Berhasil |
| 2 | Memilih skenario Data kosong | Daftar peserta kosong dan pesan data kosong ditampilkan. | Berhasil |
| 3 | Memilih skenario Error HTTP | Aplikasi menampilkan HTTP 503. | Berhasil |
| 4 | Memilih skenario Timeout | Aplikasi menampilkan pesan timeout. | Berhasil |
| 5 | Kembali dari Timeout ke Berhasil | Tiga peserta berhasil ditampilkan kembali. | Berhasil |
| 6 | Mengganti skenario ketika request berlangsung | Hasil akhir mengikuti skenario terbaru. | Berhasil |
| 7 | Mengirim data Rina Praktikan | HTTP 201, ID 101, data sesuai input, dan simulated bernilai true. | Berhasil |
| 8 | Mengirim formulir dengan nama kosong | Pengiriman ditolak dengan pesan validasi nama. | Berhasil |
| 9 | Mengirim formulir dengan format email tidak valid | Pengiriman ditolak dengan pesan validasi email. | Berhasil |
| 10 | Memuat ulang daftar setelah POST | Daftar GET tetap berisi tiga peserta awal. | Berhasil |

## 6. Penjelasan Alur Request

### XMLHttpRequest

Event klik pada tombol Muat pengumuman memicu request GET asynchronous ke file `pengumuman.txt`. Setelah request selesai, aplikasi memeriksa `readyState` dan status HTTP. Jika berhasil, isi `responseText` ditampilkan pada elemen `pre`. Jika gagal, aplikasi menampilkan pesan kesalahan.

### Fetch API

Event klik pada tombol Ambil peserta memicu request berdasarkan sumber data yang dipilih. Fetch mengambil data dari API lokal atau JSONPlaceholder. Respons diperiksa melalui `response.ok`, kemudian diubah menjadi JSON dan ditampilkan pada halaman tanpa memuat ulang seluruh halaman.

### Axios dan React

Axios GET digunakan untuk mengambil daftar peserta, sedangkan Axios POST digunakan untuk mengirim data pendaftaran. `useState` mengelola perubahan data dan status antarmuka. `useEffect` menjalankan request GET ketika komponen pertama kali ditampilkan dan ketika pilihan skenario berubah. Cleanup effect menggunakan penanda aktif untuk mencegah respons lama memperbarui tampilan terbaru.

## 7. Hasil Pengujian POST

Data yang dikirim:

- Nama: Rina Praktikan
- Email: rina@example.com

Hasil respons:

- HTTP Status: 201
- ID: 101
- Simulated: true
- Pesan: Simulasi berhasil, data tidak disimpan.

Data hasil POST ditampilkan terpisah dari daftar GET dan tidak ditambahkan ke daftar peserta karena proses POST hanya merupakan simulasi.

## 8. Dokumentasi

Bukti pengujian kedua proyek disimpan dalam folder `dokumentasi` dengan format JPEG, meliputi:
- Tampilan awal kedua aplikasi.
- Pengujian pengumuman dan Fetch API.
- Pengujian kondisi data kosong, HTTP error, dan timeout.
- Bukti pengiriman POST.
- Bukti validasi formulir.
- Bukti bahwa data POST tidak tersimpan ke daftar GET.

## 9. Teknologi yang Digunakan

- HTML
- JavaScript
- XMLHttpRequest
- Fetch API
- React
- Axios
- Node.js
